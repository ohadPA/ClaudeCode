// server.js - גרסת מרץ 2026
// שרת HTTP לארגז הכלים - עוזר חכם לוועד הבית

const http = require("http");
const fs   = require("fs");
const path = require("path");

const { getResponse } = require("./chatbot");

const PORT       = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
};

function log(msg) {
  const now = new Date().toLocaleTimeString("he-IL", {
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });
  console.log(`[${now}] ${msg}`);
}

const server = http.createServer((req, res) => {
  const method = req.method.toUpperCase();
  const url    = req.url.split("?")[0];

  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // ── POST /api/chat ───────────────────────────────────────
  if (method === "POST" && url === "/api/chat") {
    let body = "";
    req.on("data", (chunk) => { body += chunk.toString("utf8"); });
    req.on("end", () => {
      try {
        const { message } = JSON.parse(body);
        if (typeof message !== "string") {
          res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
          return res.end(JSON.stringify({ error: "שדה 'message' חסר או לא תקין" }));
        }
        const result = getResponse(message);
        log(`צ'אט | "${message.slice(0, 40)}" → ${result.intent} (${result.matchScore})`);
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(result));
      } catch (err) {
        log(`שגיאה: ${err.message}`);
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: "שגיאה בעיבוד הבקשה" }));
      }
    });
    return;
  }

  // ── GET קבצים סטטיים ────────────────────────────────────
  if (method === "GET") {
    const safePath = path.normalize(url).replace(/^(\.\.[\/\\])+/, "");
    let filePath = path.join(PUBLIC_DIR, safePath === "/" ? "index.html" : safePath);
    if (!path.extname(filePath)) filePath = path.join(filePath, "index.html");

    const ext      = path.extname(filePath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || "application/octet-stream";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end("404 - הדף לא נמצא");
        }
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("500 - שגיאת שרת פנימית");
      }
      res.writeHead(200, { "Content-Type": mimeType });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("404 - הדף לא נמצא");
});

server.listen(PORT, () => {
  console.log("");
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║                                                  ║");
  console.log("║    ארגז הכלים - עוזר חכם לוועד הבית            ║");
  console.log("║    גרסת מרץ 2026                                 ║");
  console.log("║                                                  ║");
  console.log("╠══════════════════════════════════════════════════╣");
  console.log(`║    http://localhost:${PORT}                          ║`);
  console.log("║    Ctrl+C לעצירה                                 ║");
  console.log("╚══════════════════════════════════════════════════╝");
  console.log("");
  log("השרת הופעל בהצלחה");
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n שגיאה: הפורט ${PORT} תפוס. נסו: PORT=3002 npm start\n`);
  } else {
    console.error("שגיאת שרת:", err.message);
  }
  process.exit(1);
});
