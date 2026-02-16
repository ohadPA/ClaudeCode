// server.js
// Lightweight HTTP server for the Lusha ChatBot POC.
// No external dependencies — uses Node.js built-in http and fs modules.

const http = require("http");
const fs = require("fs");
const path = require("path");
const { getResponse } = require("./chatbot");

const PORT = 3000;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

/**
 * Serve a static file from the public/ directory.
 */
function serveStaticFile(res, filePath) {
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

/**
 * Parse JSON body from a POST request.
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // API endpoint: POST /api/chat
  if (req.method === "POST" && req.url === "/api/chat") {
    try {
      const { message } = await parseBody(req);
      const result = getResponse(message || "");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: 'Invalid request. Send { "message": "your question" }' }));
    }
    return;
  }

  // Static file serving
  if (req.method === "GET") {
    let filePath = req.url === "/" ? "/index.html" : req.url;
    filePath = path.join(__dirname, "public", filePath);
    serveStaticFile(res, filePath);
    return;
  }

  res.writeHead(405, { "Content-Type": "text/plain" });
  res.end("Method Not Allowed");
});

server.listen(PORT, () => {
  console.log(`\n  Lusha ChatBot is running!`);
  console.log(`  Open http://localhost:${PORT} in your browser\n`);
});
