// chatbot.js
// Three-tier intent engine for the Lusha chatbot.
// Priority: 1) Lookup intent  2) Code snippet intent  3) Knowledge-base scoring

const { knowledgeBase } = require("./knowledge-base");
const { lookupPerson, lookupCompany } = require("./synthetic-data");
const { generateSnippet, generateAllSnippets } = require("./code-snippets");

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

// ─── Tier 1: Lookup Intent ──────────────────────────────────

const LOOKUP_PATTERNS = [
  /look\s*up\s+(.+)/i,
  /find\s+(?:info|information|data|details)?\s*(?:on|about|for)\s+(.+)/i,
  /who\s+is\s+(.+)/i,
  /enrich\s+(.+)/i,
  /search\s+(?:for\s+)?(.+?)(?:\s+(?:on|in)\s+lusha)?$/i,
];

const PERSON_HINTS = /person|contact|people|employee|vp|cto|ceo|director|manager|engineer|head|chief|officer|sr|senior/i;
const COMPANY_HINTS = /company|companies|org|business|firm|corp|inc|startup|employer/i;

/**
 * Detect and handle lookup intent.
 * Returns formatted result or null if not a lookup.
 */
function handleLookup(input) {
  let query = null;

  for (const pattern of LOOKUP_PATTERNS) {
    const match = input.match(pattern);
    if (match) {
      query = match[1].trim().replace(/[?.!]+$/, "").trim();
      break;
    }
  }

  if (!query) return null;

  // Determine if user wants person or company lookup
  const wantsPerson = PERSON_HINTS.test(input);
  const wantsCompany = COMPANY_HINTS.test(input);

  // Strip hint words from query for cleaner matching
  const cleanQuery = query
    .replace(/\b(person|contact|company|companies|org|business|firm)\b/gi, "")
    .trim();

  const searchTerm = cleanQuery || query;

  // Try both lookups, prefer based on hints
  const people = lookupPerson(searchTerm);
  const companies = lookupCompany(searchTerm);

  // If explicit hint, show only that type
  if (wantsCompany && !wantsPerson && companies.length > 0) {
    return formatCompanyResults(companies);
  }
  if (wantsPerson && !wantsCompany && people.length > 0) {
    return formatPersonResults(people);
  }

  // No explicit hint — show whatever matched
  const parts = [];
  if (people.length > 0) parts.push(formatPersonResults(people));
  if (companies.length > 0) parts.push(formatCompanyResults(companies));

  if (parts.length > 0) return parts.join("\n\n---\n\n");

  return `No results found for **"${searchTerm}"**. Try searching for one of our demo profiles:\n\n**People:** Sarah Chen, Marcus Johnson, Emily Rodriguez, James Mitchell, Priya Sharma, David Kim, Lisa Thompson, Ahmed Hassan, Rachel Foster, Tom Bradley\n\n**Companies:** TechCorp, DataStream, CloudScale, FinEdge, NovaTech AI, GreenWave, RetailPulse, CyberShield, MedTech Solutions, SwiftLogistics`;
}

function formatPersonResults(people) {
  if (people.length === 1) {
    const p = people[0];
    return `**Contact Found — ${p.name}**

| Field | Details |
|-------|---------|
| Name | ${p.name} |
| Title | ${p.title} |
| Company | ${p.company} |
| Email | ${p.email} |
| Phone | ${p.phone} |
| LinkedIn | ${p.linkedin} |
| Location | ${p.location} |
| Seniority | ${p.seniority} |
| Department | ${p.department} |

*This is synthetic demo data for demonstration purposes.*`;
  }

  let result = `**Found ${people.length} contacts:**\n\n| Name | Title | Company | Email |\n|------|-------|---------|-------|\n`;
  for (const p of people) {
    result += `| ${p.name} | ${p.title} | ${p.company} | ${p.email} |\n`;
  }
  result += "\n*This is synthetic demo data for demonstration purposes.*";
  return result;
}

function formatCompanyResults(companies) {
  if (companies.length === 1) {
    const c = companies[0];
    return `**Company Found — ${c.name}**

| Field | Details |
|-------|---------|
| Company | ${c.name} |
| Industry | ${c.industry} |
| Size | ${c.size} employees |
| Revenue | ${c.revenue} |
| Founded | ${c.founded} |
| HQ | ${c.hq} |
| Website | ${c.website} |
| Tech Stack | ${c.techStack.join(", ")} |
| Funding | ${c.funding} |
| Intent Signals | ${c.intentSignals.join("; ")} |

*This is synthetic demo data for demonstration purposes.*`;
  }

  let result = `**Found ${companies.length} companies:**\n\n| Company | Industry | Size | Revenue |\n|---------|----------|------|---------|\n`;
  for (const c of companies) {
    result += `| ${c.name} | ${c.industry} | ${c.size} | ${c.revenue} |\n`;
  }
  result += "\n*This is synthetic demo data for demonstration purposes.*";
  return result;
}

// ─── Tier 2: Code Snippet Intent ────────────────────────────

const CODE_TRIGGERS = /\b(code|snippet|example|sample|curl|python|node\.?js?|javascript|how to call|api call|show me)\b/i;
const LANGUAGE_MAP = {
  curl: "curl",
  python: "python",
  py: "python",
  node: "node",
  nodejs: "node",
  "node.js": "node",
  javascript: "node",
  js: "node",
};

const ENDPOINT_MAP = [
  { pattern: /person\s*(lookup|search|find|enrich|api)/i, type: "personLookup" },
  { pattern: /company\s*(lookup|search|find|api)/i, type: "companyLookup" },
  { pattern: /(contact\s*search|prospecting|prospect|find contacts)/i, type: "contactSearch" },
  { pattern: /(contact\s*enrich|enrich\s*contact|email\s*enrich)/i, type: "contactEnrich" },
  { pattern: /(company\s*search|search\s*companies|find\s*companies)/i, type: "companySearch" },
  { pattern: /webhook/i, type: "webhookSetup" },
];

/**
 * Detect and handle code snippet intent.
 * Returns formatted code blocks or null.
 */
function handleCodeSnippet(input) {
  if (!CODE_TRIGGERS.test(input)) return null;

  // Detect language preference
  let language = null;
  const lowerInput = input.toLowerCase();
  for (const [keyword, lang] of Object.entries(LANGUAGE_MAP)) {
    if (lowerInput.includes(keyword)) {
      language = lang;
      break;
    }
  }

  // Detect endpoint type
  let endpointType = null;
  for (const { pattern, type } of ENDPOINT_MAP) {
    if (pattern.test(input)) {
      endpointType = type;
      break;
    }
  }

  // If we matched an endpoint, generate snippets
  if (endpointType) {
    if (language) {
      return generateSnippet(endpointType, language);
    }
    return generateAllSnippets(endpointType);
  }

  // If code/snippet was mentioned but no clear endpoint, return null to let KB handle
  return null;
}

// ─── Tier 3: Knowledge Base Scoring ─────────────────────────

/**
 * Score a knowledge base entry against user input.
 */
function scoreEntry(entry, input, tokens) {
  let score = 0;

  for (const keyword of entry.keywords) {
    if (tokens.includes(keyword)) {
      score += 1;
    }
    if (keyword.includes(" ") && input.toLowerCase().includes(keyword)) {
      score += 2;
    }
  }

  for (const pattern of entry.patterns) {
    if (pattern.test(input)) {
      score += 3;
    }
  }

  return score;
}

// ─── Main Response Function ─────────────────────────────────

/**
 * Process a user message through the three-tier intent engine.
 * Returns { response, intent } where intent describes how the message was resolved.
 */
function getResponse(userMessage) {
  const input = userMessage.trim();
  if (!input) {
    return {
      response: "Please type a message and I'll do my best to help!",
      intent: "empty",
      intentCategory: "system",
    };
  }

  // Tier 1: Lookup intent
  const lookupResult = handleLookup(input);
  if (lookupResult) {
    const isCompany = lookupResult.includes("**Company Found") || lookupResult.includes("companies:**");
    const isPerson = lookupResult.includes("**Contact Found") || lookupResult.includes("contacts:**");
    const noResults = lookupResult.includes("No results found");
    return {
      response: lookupResult,
      intent: noResults ? "lookup_no_results" : isPerson && isCompany ? "lookup_both" : isCompany ? "lookup_company" : "lookup_person",
      intentCategory: "lookup",
    };
  }

  // Tier 2: Code snippet intent
  const codeResult = handleCodeSnippet(input);
  if (codeResult) {
    return {
      response: codeResult,
      intent: "code_snippet",
      intentCategory: "code",
    };
  }

  // Tier 3: Knowledge base scoring
  const tokens = tokenize(input);
  const scored = knowledgeBase.map((entry) => ({
    entry,
    score: scoreEntry(entry, input, tokens),
  }));

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];

  if (best.score >= 2) {
    // Handle code snippet triggers from KB
    if (best.entry.response.startsWith("__CODE_SNIPPET__:")) {
      const type = best.entry.response.split(":")[1];
      return {
        response: generateAllSnippets(type),
        intent: "code_snippet",
        intentCategory: "code",
        matchedEntry: best.entry.id,
        matchScore: best.score,
      };
    }
    return {
      response: best.entry.response,
      intent: best.entry.id,
      intentCategory: "knowledge_base",
      matchScore: best.score,
    };
  }

  // Tier 4: Fallback
  return {
    response: getFallbackResponse(),
    intent: "fallback",
    intentCategory: "fallback",
  };
}

function getFallbackResponse() {
  return `I'm not sure I understood that. Here are some things I can help with:

**Learn about Lusha:**
- **"What is Lusha?"** — Product overview
- **"Pricing"** — Plans and credits
- **"How does Lusha work?"** — Getting started

**Demo lookups:**
- **"Look up Sarah Chen"** — Demo person lookup
- **"Look up TechCorp"** — Demo company lookup

**API & Code:**
- **"API overview"** — Available endpoints
- **"Show me Python code for person lookup"** — Code examples

**Features:**
- **"Integrations"** — CRM & sales tool connections
- **"Buying signals"** — Intent data & job changes
- **"Browser extension"** — Chrome extension info

Try one of these, or rephrase your question!`;
}

module.exports = { getResponse };
