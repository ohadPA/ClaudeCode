// chatbot.js - גרסת מרץ 2026
// מנוע התאמת כוונות משופר לארגז הכלים - עוזר חכם לוועד הבית

const { knowledgeBase } = require("./knowledge-base");

// ─── קידומות עבריות ─────────────────────────────────────────
const SINGLE_PREFIX_RE = /^[הבלמוכש]/;
const DOUBLE_PREFIX_RE = /^(שה|שב|של|שמ|שו|שכ|מה|מב|מל|כש|לה|לב|לכ)/;

// ─── מילים נרדפות עבריות ────────────────────────────────────
const SYNONYM_GROUPS = [
  ["ועד", "נציגות", "הוועד", "הנציגות", "ועד בית", "ועד הבית"],
  ["תחזוקה", "תחזוקת", "לתחזוקה", "תיקון", "תיקונים", "תחזוקתי"],
  ["אסיפה", "אסיפת", "כינוס", "כינוסים"],
  ["דייר", "דיירים", "בעל דירה", "בעלי דירות", "שוכר", "שוכרים"],
  ["תשלום", "תשלומים", "דמי", "אגרה", "גבייה", "לגבות"],
  ["ביטוח", "פוליסה", "ביטוחים", "מבוטח"],
  ["שכן", "שכנים", "דייר", "דיירים"],
  ["רכוש", "שטח", "שטחים", "רכוש משותף"],
  ["חברה", "חברת ניהול", "מתחזק", "מנהל"],
  ["תקנון", "חוק", "תקנות", "חוקים", "דין"],
  ["בניין", "הבניין", "מבנה", "בנין"],
  ["מעלית", "מעליות"],
  ["גגון", "גג", "גגות"],
  ["חניון", "חנייה", "חניה", "חניות"],
  ["ניקיון", "נקיון", "ניקוי"],
  ["קרן", "קרן שימור", "קרן הבניין", "חיסכון"],
  ["תקציב", "תקציבי", "תקציבים", "תקצוב"],
  ["ביקורת", "בדיקה", "בדיקות", "ביקורות"],
  ["חשמל", "חשמלי", "חשמלאי", "חשמלית"],
  ["מים", "אינסטלציה", "צנרת", "ביוב"],
  ["כיבוי", "כיבוי אש", "אש", "שריפה", "מצילות"],
  ["גנרטור", "גנרטורים", "חשמל חירום"],
  ["אסבסט", "חומרים מסוכנים"],
  ["בטיחות", "בטיחותי", "בטיחותיות", "בטוח"],
  ["נגישות", "נגיש", "נגישים", "נכים", "מוגבלים"],
  ["תמא", "תמ\"א 38", "התחדשות", "פינוי בינוי", "פינוי-בינוי"],
  ["פרוטוקול", "סיכום", "תיעוד", "רישום"],
  ["מניין", "קוורום", "רוב", "הצבעה"],
  ["ספק", "ספקים", "קבלן", "קבלנים", "נותן שירות"],
  ["ספר", "ספר החלטות", "תיק", "תיק מתקן", "תיק הבניין"],
];

// בניית מפת מילים נרדפות (כל מילה → קבוצתה)
const SYNONYM_MAP = new Map();
for (const group of SYNONYM_GROUPS) {
  for (const word of group) {
    SYNONYM_MAP.set(word, group);
  }
}

// ─── עיבוד טוקנים ───────────────────────────────────────────

function stripPrefix(word) {
  if (word.length >= 5 && DOUBLE_PREFIX_RE.test(word)) {
    return word.slice(2);
  }
  if (word.length >= 4 && SINGLE_PREFIX_RE.test(word)) {
    return word.slice(1);
  }
  return word;
}

function getWordForms(word) {
  const forms = new Set([word]);
  const stripped = stripPrefix(word);
  if (stripped !== word) forms.add(stripped);
  // הוסף צורות נרדפות
  const synonymGroup = SYNONYM_MAP.get(word) || SYNONYM_MAP.get(stripped);
  if (synonymGroup) {
    for (const syn of synonymGroup) forms.add(syn);
  }
  return forms;
}

function tokenize(input) {
  const normalized = input
    .replace(/["""״׳'`״]/g, "")
    .replace(/[.,;:!?\-–—()[\]{}<>\/\\@#$%^&*+=~|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  const rawTokens = normalized.split(" ").filter((w) => w.length > 1);
  const tokenSet = new Set();

  for (const word of rawTokens) {
    for (const form of getWordForms(word)) {
      tokenSet.add(form);
    }
  }
  return tokenSet;
}

// ─── ניקוד רשומה ────────────────────────────────────────────

function phraseMatchesInput(phrase, input, tokens) {
  if (input.includes(phrase)) return true;
  // בדוק כל מילה בביטוי
  const phraseWords = phrase.split(" ");
  return phraseWords.every((pw) => tokens.has(pw));
}

function scoreEntry(entry, input, tokens) {
  let score = 0;
  let keywordHits = 0;

  for (const keyword of entry.keywords) {
    if (keyword.includes(" ")) {
      // ביטוי רב-מילי
      if (phraseMatchesInput(keyword, input, tokens)) {
        score += 3;
        keywordHits++;
      }
    } else {
      // מילה בודדת
      if (tokens.has(keyword)) {
        score += 1.5;
        keywordHits++;
      } else {
        // התאמה חלקית
        for (const token of tokens) {
          if (token.length >= 3 && keyword.length >= 3) {
            if (token.includes(keyword) || keyword.includes(token)) {
              score += 0.5;
              break;
            }
          }
        }
      }
    }
  }

  // בדיקת regex
  for (const pattern of entry.patterns) {
    if (pattern.test(input)) {
      score += 3;
      keywordHits++;
    }
  }

  // בונוס להתאמות מרובות
  if (keywordHits >= 3) score += 2;
  else if (keywordHits >= 2) score += 0.5;

  return score;
}

// ─── הצעות להמשך ────────────────────────────────────────────

function buildSuggestions(bestEntry, allScored) {
  const suggestions = [];
  const bestCategory = bestEntry.category;

  // מצא רשומות קרובות מאותה קטגוריה או קטגוריות קשורות
  const candidates = allScored
    .filter((s) => s.entry.id !== bestEntry.id && s.score > 0)
    .sort((a, b) => b.score - a.score);

  // העדף אותה קטגוריה
  for (const c of candidates) {
    if (suggestions.length >= 3) break;
    if (c.entry.category === bestCategory) {
      const kw = c.entry.keywords.find((k) => !k.includes(" ")) || c.entry.keywords[0];
      if (kw && !suggestions.includes(kw)) suggestions.push(kw);
    }
  }

  // השלם מקטגוריות אחרות
  for (const c of candidates) {
    if (suggestions.length >= 3) break;
    const kw = c.entry.keywords.find((k) => !k.includes(" ")) || c.entry.keywords[0];
    if (kw && !suggestions.includes(kw)) suggestions.push(kw);
  }

  return suggestions.slice(0, 3);
}

// ─── תשובת ברירת מחדל ───────────────────────────────────────

function getFallbackResponse() {
  return `לא הצלחתי להבין את השאלה. אנסה לעזור אם תנסחו אחרת.

**הנה כמה דוגמאות לשאלות שאני יודע לענות עליהן:**

- **"מה תפקידי ועד הבית?"** - תפקידי הנציגות
- **"איך מזמנים אסיפת דיירים?"** - כל על אסיפות
- **"מהי קרן שימור?"** - ניהול כספי הבניין
- **"שכן לא משלם ועד"** - גבייה מסרבנים
- **"מה עושים עם רעש בלילה?"** - שעות מנוחה ומטרדים
- **"איזה ביטוח צריך לבניין?"** - ביטוח מבנה
- **"מה זה תמ"א 38?"** - התחדשות עירונית
- **"מה נחשב רכוש משותף?"** - הגדרת רכוש משותף
- **"תוחלת חיים של מעלית"** - מערכות הבניין

נסו אחת מהשאלות האלו, או שאלו בנושא אחר!`;
}

// ─── פונקציה ראשית ──────────────────────────────────────────

function getResponse(userMessage) {
  const input = userMessage.trim();

  if (!input) {
    return {
      response: "אנא כתבו את שאלתכם ואשמח לעזור!",
      intent: "empty",
      category: "מערכת",
      matchScore: 0,
      suggestions: []
    };
  }

  console.log(`[ארגז הכלים] קלט: "${input}"`);

  const tokens = tokenize(input);
  console.log(`[ארגז הכלים] טוקנים: [${[...tokens].join(", ")}]`);

  const scored = knowledgeBase.map((entry) => ({
    entry,
    score: scoreEntry(entry, input, tokens)
  }));

  scored.sort((a, b) => {
    if (Math.abs(b.score - a.score) > 0.001) return b.score - a.score;
    return a.entry.response.length - b.entry.response.length;
  });

  // לוג תוצאות מובילות
  const topResults = scored.filter((s) => s.score > 0).slice(0, 3);
  if (topResults.length > 0) {
    console.log(`[ארגז הכלים] תוצאות מובילות:`);
    for (const r of topResults) {
      console.log(`  [${r.entry.id}] ניקוד: ${r.score}`);
    }
  }

  const best = scored[0];
  const THRESHOLD = 2.0;

  if (best && best.score >= THRESHOLD) {
    console.log(`[ארגז הכלים] התאמה: "${best.entry.id}" (ניקוד: ${best.score})`);
    const suggestions = buildSuggestions(best.entry, scored);
    return {
      response: best.entry.response,
      intent: best.entry.id,
      category: best.entry.category,
      matchScore: best.score,
      suggestions
    };
  }

  console.log(`[ארגז הכלים] לא נמצאה התאמה - ברירת מחדל`);
  return {
    response: getFallbackResponse(),
    intent: "fallback",
    category: "ברירת מחדל",
    matchScore: best ? best.score : 0,
    suggestions: ["ועד הבית", "תחזוקה", "ביטוח"]
  };
}

module.exports = { getResponse };
