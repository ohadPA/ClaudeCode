// chatbot.js
// Intent matching engine for the TaskFlow chatbot.
// Scores user messages against the knowledge base using keyword + pattern matching.

const { knowledgeBase } = require("./knowledge-base");

/**
 * Normalize and tokenize user input into lowercase words.
 */
function tokenize(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s@]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

/**
 * Score a knowledge base entry against the user's message.
 * Returns a numeric score (higher = better match).
 *
 * Scoring logic:
 * - Each matching keyword: +1 point
 * - Each matching regex pattern: +3 points (patterns are more specific)
 * - Bonus for exact phrase matches in the original input
 */
function scoreEntry(entry, input, tokens) {
  let score = 0;

  // Keyword matching
  for (const keyword of entry.keywords) {
    if (tokens.includes(keyword)) {
      score += 1;
    }
    // Multi-word keyword check
    if (keyword.includes(" ") && input.toLowerCase().includes(keyword)) {
      score += 2;
    }
  }

  // Pattern matching (regex) — weighted higher because patterns are intentional
  for (const pattern of entry.patterns) {
    if (pattern.test(input)) {
      score += 3;
    }
  }

  return score;
}

/**
 * Find the best matching response for a user message.
 * Returns the response string.
 */
function getResponse(userMessage) {
  const input = userMessage.trim();
  if (!input) {
    return "Please type a message and I'll do my best to help!";
  }

  const tokens = tokenize(input);

  // Score all entries
  const scored = knowledgeBase.map((entry) => ({
    entry,
    score: scoreEntry(entry, input, tokens),
  }));

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];

  // Minimum threshold — if the best score is too low, return fallback
  if (best.score < 2) {
    return getFallbackResponse(input);
  }

  return best.entry.response;
}

/**
 * Generate a helpful fallback when no good match is found.
 */
function getFallbackResponse(input) {
  return `I'm not sure I understood that. Here are some topics I can help with:

- **"What is TaskFlow?"** — Product overview
- **"Features"** — What TaskFlow can do
- **"Pricing"** — Plans and costs
- **"Get started"** — Setting up your workspace
- **"Integrations"** — Slack, GitHub, Figma, etc.
- **"Security"** — SSO, permissions, compliance
- **"Compare to Asana"** — How we stack up
- **"Mobile"** — Mobile app info
- **"Reporting"** — Analytics and dashboards
- **"Roadmap"** — What's coming next
- **"Support"** — How to get help

Try asking one of these, or rephrase your question!`;
}

module.exports = { getResponse };
