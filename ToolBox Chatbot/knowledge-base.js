// knowledge-base.js - גרסת מרץ 2026
// מאגר הידע של ארגז הכלים - עוזר חכם לוועד הבית
// מקור: מדריך לבעלי דירות לניהול ולתחזוקה של הבניין עתיר המערכות (מאי 2022)
// הרשות הממשלתית להתחדשות עירונית
// כ-200 רשומות, מפוצל ל-7 קבצי מקטע

const ch1 = require("./kb-ch-1");
const ch2 = require("./kb-ch-2");
const ch3 = require("./kb-ch-3");
const ch4 = require("./kb-ch-4");
const ch5 = require("./kb-ch-5");
const ch6 = require("./kb-ch-6");
const ch7 = require("./kb-ch-7");
const ch8 = require("./kb-ch-8");

const knowledgeBase = [
  ...ch1,
  ...ch2,
  ...ch3,
  ...ch4,
  ...ch5,
  ...ch6,
  ...ch7,
  ...ch8,
];

module.exports = { knowledgeBase };
