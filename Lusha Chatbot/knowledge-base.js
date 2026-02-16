// knowledge-base.js
// ~40 knowledge base entries for the Lusha chatbot across 11 categories.
// Each entry has: id, keywords (single/multi-word), patterns (regex), response (markdown).

const knowledgeBase = [
  // ─── Overview (4) ────────────────────────────────────────────
  {
    id: "what-is-lusha",
    keywords: ["lusha", "what", "about", "overview", "explain", "tell", "product"],
    patterns: [/what is lusha/i, /tell me about lusha/i, /lusha overview/i],
    response: `**Lusha** is a B2B sales intelligence platform that helps sales, marketing, and recruiting teams find accurate contact and company data.

**Key capabilities:**
- **Contact Data** — Direct phone numbers, verified email addresses
- **Company Intelligence** — Firmographics, technographics, funding data
- **Prospecting** — Build targeted lead lists with advanced filters
- **Buying Signals** — Job changes, intent data, company news
- **Integrations** — Seamlessly connects to your CRM and sales stack
- **API Access** — Programmatic access to enrich your own systems

Lusha is trusted by over 1 million sales professionals and 200,000+ companies worldwide.`,
  },
  {
    id: "company-info",
    keywords: ["company", "founded", "headquarters", "employees", "lusha", "who"],
    patterns: [/who (founded|created|made) lusha/i, /lusha (company|history)/i],
    response: `**About Lusha (the company):**

| Detail | Info |
|--------|------|
| Founded | 2016 |
| Headquarters | Boston, MA & Tel Aviv, Israel |
| Employees | 350+ |
| Customers | 200,000+ companies |
| Users | 1,000,000+ sales professionals |
| Funding | $245M+ raised |

Lusha was founded by Assaf Eisenstein and Yoni Tserruya with the mission of making B2B data accessible and accurate for every sales team.`,
  },
  {
    id: "how-it-works",
    keywords: ["how", "work", "works", "process", "use", "using"],
    patterns: [/how does lusha work/i, /how do i use lusha/i, /how to use/i],
    response: `**How Lusha Works:**

1. **Search** — Find prospects using filters like job title, company size, industry, location, and technology
2. **Enrich** — Get verified emails, direct dials, and company data for your targets
3. **Connect** — Export contacts to your CRM or reach out directly
4. **Track** — Monitor buying signals and job changes for timely outreach

**Ways to access Lusha:**
- **Web App** — Full prospecting platform at app.lusha.com
- **Browser Extension** — Enrich LinkedIn profiles and company pages in one click
- **API** — Integrate Lusha data into your own tools and workflows
- **CRM Integrations** — Auto-enrich records in Salesforce, HubSpot, and more`,
  },
  {
    id: "data-accuracy",
    keywords: ["accuracy", "accurate", "data", "quality", "reliable", "verified", "fresh"],
    patterns: [/how accurate/i, /data (quality|accuracy)/i, /is .* data reliable/i],
    response: `**Lusha Data Accuracy:**

- **Email accuracy:** 97%+ verified delivery rate
- **Phone accuracy:** 85%+ direct dial connect rate
- **Company data:** Updated in real-time from multiple sources
- **Freshness:** Data is continuously validated and refreshed

**How we maintain quality:**
- Crowdsourced verification from 1M+ community members
- AI-powered cross-referencing across multiple data sources
- Bounce detection and real-time email verification
- GDPR and CCPA compliant data collection practices`,
  },

  // ─── Contact Data (3) ───────────────────────────────────────
  {
    id: "contact-data",
    keywords: ["contact", "data", "information", "details", "find", "get"],
    patterns: [/contact (data|info|details)/i, /what data does lusha/i],
    response: `**Lusha Contact Data includes:**

- **Email addresses** — Verified business and personal emails
- **Phone numbers** — Direct dials and mobile numbers
- **Job title** — Current role and seniority level
- **Company** — Current employer with firmographic data
- **Location** — City, state, and country
- **Social profiles** — LinkedIn, Twitter, and more
- **Department** — Engineering, Sales, Marketing, etc.

All data is GDPR and CCPA compliant. Credits are consumed per contact reveal.`,
  },
  {
    id: "email-lookup",
    keywords: ["email", "emails", "address", "find", "lookup", "verify"],
    patterns: [/find.*(email|address)/i, /email (lookup|search|finder)/i],
    response: `**Email Lookup with Lusha:**

Lusha provides verified business email addresses with a 97%+ delivery rate.

**How to find emails:**
- **Browser Extension** — Click on any LinkedIn profile to reveal the email
- **Web App** — Search by name + company to find email addresses
- **API** — Use the Person Lookup endpoint for programmatic access
- **Bulk** — Upload a CSV of names/companies for batch enrichment

Each email reveal uses 1 credit. Emails are verified in real-time before delivery.`,
  },
  {
    id: "phone-lookup",
    keywords: ["phone", "number", "direct", "dial", "mobile", "call"],
    patterns: [/phone (number|lookup)/i, /direct dial/i, /find.*phone/i],
    response: `**Phone Lookup with Lusha:**

Lusha provides direct-dial phone numbers and mobile numbers for B2B contacts.

**Phone data features:**
- **Direct dials** — Reach prospects directly, bypassing gatekeepers
- **Mobile numbers** — Personal mobile when available
- **Accuracy** — 85%+ connect rate on direct dials
- **Global coverage** — Numbers for contacts in 100+ countries

Each phone reveal uses 1 credit. Phone numbers are verified before delivery.`,
  },

  // ─── Company Data (2) ──────────────────────────────────────
  {
    id: "company-data",
    keywords: ["company", "firmographic", "firmographics", "revenue", "size", "industry", "data"],
    patterns: [/company (data|intelligence|info)/i, /firmographic/i],
    response: `**Lusha Company Data includes:**

| Data Point | Details |
|------------|---------|
| Company Name | Legal and brand names |
| Industry | SIC/NAICS codes + categories |
| Employee Count | Exact and range-based |
| Revenue | Annual revenue estimates |
| Location | HQ + office locations |
| Founded | Year established |
| Funding | Total raised + rounds |
| Tech Stack | Technologies in use |

Company data is available via the web app, API, and browser extension.`,
  },
  {
    id: "technographics",
    keywords: ["technographic", "technographics", "tech", "stack", "technology", "technologies", "tools"],
    patterns: [/tech(nographic)?s?\s*(data|stack|intelligence)/i, /what (tech|tools|software)/i],
    response: `**Lusha Technographics:**

Lusha tracks 10,000+ technologies across companies, including:

- **Cloud & Infrastructure** — AWS, Azure, GCP, Kubernetes, Docker
- **CRM & Sales** — Salesforce, HubSpot, Pipedrive, Outreach
- **Marketing** — Marketo, Pardot, Google Analytics, Segment
- **Development** — React, Python, Java, Node.js, Go
- **Data & Analytics** — Snowflake, Databricks, Tableau, Looker
- **Security** — CrowdStrike, Okta, Palo Alto, Zscaler

Use technographics to find companies using (or not using) specific tools — great for competitive displacement campaigns.`,
  },

  // ─── Prospecting (4) ───────────────────────────────────────
  {
    id: "prospecting-overview",
    keywords: ["prospect", "prospecting", "find", "leads", "search", "build", "list"],
    patterns: [/prospect(ing)?/i, /(find|search|build).*(leads|list|prospects)/i],
    response: `**Lusha Prospecting:**

Build targeted lead lists with Lusha's advanced search filters:

- **Job Title & Seniority** — Target VP+, Directors, C-Suite, etc.
- **Company Size** — Filter by employee count ranges
- **Industry** — 150+ industry categories
- **Location** — Country, state, city-level targeting
- **Revenue** — Target companies by annual revenue
- **Technology** — Filter by tech stack
- **Funding** — Recently funded companies
- **Intent Signals** — Companies actively researching topics

Save searches, create lists, and export directly to your CRM.`,
  },
  {
    id: "prospect-filters",
    keywords: ["filter", "filters", "search", "criteria", "segment", "target"],
    patterns: [/(search|prospect|filter) (filters|criteria|options)/i],
    response: `**Lusha Prospecting Filters:**

| Filter | Example Values |
|--------|---------------|
| Job Title | VP of Sales, CTO, Director |
| Seniority | C-Suite, VP, Director, Manager |
| Department | Sales, Engineering, Marketing |
| Company Size | 1-50, 51-200, 201-500, 501-1000, 1000+ |
| Industry | SaaS, FinTech, HealthTech, etc. |
| Location | US, Europe, APAC, specific cities |
| Revenue | $1M-$10M, $10M-$50M, $50M+ |
| Technologies | Salesforce, AWS, React, etc. |
| Funding Stage | Seed, Series A/B/C, IPO |
| Hiring Signals | Actively hiring specific roles |

Combine filters to build your ideal customer profile (ICP).`,
  },
  {
    id: "browser-extension",
    keywords: ["extension", "browser", "chrome", "plugin", "linkedin", "addon"],
    patterns: [/browser extension/i, /chrome (extension|plugin)/i, /linkedin.*(extension|enrich)/i],
    response: `**Lusha Browser Extension:**

The Lusha Chrome extension lets you enrich profiles directly from LinkedIn and company websites.

**Features:**
- **One-click reveal** — Get email + phone from any LinkedIn profile
- **Company insights** — See firmographics on company pages
- **CRM integration** — Push contacts to Salesforce/HubSpot directly
- **List building** — Add prospects to Lusha lists from LinkedIn
- **Credit tracking** — See remaining credits in the extension

**Supported platforms:**
- LinkedIn (profiles + Sales Navigator)
- Company websites
- Gmail sidebar

Install from the Chrome Web Store — works with all Lusha plans.`,
  },
  {
    id: "lists",
    keywords: ["list", "lists", "export", "csv", "download", "save"],
    patterns: [/(create|build|export|manage).*list/i, /csv (export|download)/i],
    response: `**Lusha Lists:**

Organize your prospects into lists for targeted outreach:

- **Create lists** — Save prospects from search results or the browser extension
- **Bulk enrichment** — Upload a CSV and enrich all contacts at once
- **Export** — Download lists as CSV or push to your CRM
- **Share** — Collaborate with team members on shared lists
- **Auto-update** — Lists stay fresh as contact data changes

**Export options:**
- CSV download (all fields)
- Salesforce push (contacts + accounts)
- HubSpot push (contacts + companies)
- API access for custom integrations`,
  },

  // ─── Buying Signals (3) ────────────────────────────────────
  {
    id: "buying-signals",
    keywords: ["buying", "signals", "trigger", "triggers", "alert", "alerts", "notification"],
    patterns: [/buying signal/i, /trigger event/i, /sales (trigger|signal|alert)/i],
    response: `**Lusha Buying Signals:**

Get notified when prospects show buying intent:

- **Job changes** — Key contacts move to new companies
- **Funding rounds** — Companies raise new capital
- **Hiring sprees** — Rapid headcount growth signals investment
- **Tech adoption** — New technology purchases or evaluations
- **Company news** — Acquisitions, expansions, product launches
- **Intent data** — Prospects researching topics related to your solution

Set up alerts for your target accounts and ICP to time your outreach perfectly.`,
  },
  {
    id: "job-changes",
    keywords: ["job", "change", "changes", "move", "moved", "new", "role", "champion"],
    patterns: [/job change/i, /(new role|new job|changed (job|role))/i, /champion track/i],
    response: `**Job Change Alerts:**

Track when your prospects, champions, and target contacts change jobs:

- **Champion tracking** — Know when your internal champions move to new companies (warm intro opportunity!)
- **Prospect alerts** — Get notified when target personas join companies in your ICP
- **Automatic updates** — Lusha continuously monitors and updates contact data
- **CRM sync** — Updates flow to your CRM automatically

Job changes are one of the strongest buying signals — new leaders often bring their preferred vendors with them.`,
  },
  {
    id: "intent-data",
    keywords: ["intent", "data", "research", "researching", "interest", "topic"],
    patterns: [/intent data/i, /buyer intent/i, /(who is|companies) researching/i],
    response: `**Lusha Intent Data:**

Identify companies actively researching topics related to your product:

- **Topic monitoring** — Track 10,000+ B2B intent topics
- **Surge detection** — Alerts when research activity spikes above baseline
- **Account scoring** — Prioritize accounts by intent strength
- **CRM integration** — Intent signals flow to your CRM records

**Example use case:**
If you sell cybersecurity software, get alerted when target companies start researching "endpoint security", "zero trust", or "SOC automation".

Combine intent data with Lusha's contact data to reach the right person at the right time.`,
  },

  // ─── Integrations (4) ──────────────────────────────────────
  {
    id: "integrations-overview",
    keywords: ["integration", "integrations", "connect", "sync", "tools", "stack"],
    patterns: [/\bintegrations?\b/i, /what .* integrate/i, /connect.*crm/i],
    response: `**Lusha Integrations:**

Lusha connects with your existing sales and marketing stack:

| Category | Integrations |
|----------|-------------|
| CRM | Salesforce, HubSpot, Pipedrive, Zoho, MS Dynamics |
| Sales Engagement | Outreach, SalesLoft, Apollo |
| Marketing | Marketo, Pardot, Mailchimp |
| Communication | Gmail, Outlook, LinkedIn |
| Data | Snowflake, BigQuery, Zapier |
| API | REST API for custom integrations |

All integrations support bi-directional sync and automatic enrichment.`,
  },
  {
    id: "salesforce",
    keywords: ["salesforce", "sfdc", "sf"],
    patterns: [/salesforce/i, /sfdc/i],
    response: `**Lusha + Salesforce Integration:**

- **Auto-enrich** — Automatically enrich new leads and contacts in Salesforce
- **Deduplicate** — Prevent duplicate records with smart matching
- **One-click push** — Send contacts from Lusha to Salesforce instantly
- **Field mapping** — Map Lusha fields to your custom Salesforce fields
- **Account matching** — Link contacts to existing Salesforce accounts
- **Activity logging** — Track Lusha enrichment activity in Salesforce

Supports Salesforce Lightning and Classic. Available on Pro and Premium plans.`,
  },
  {
    id: "hubspot",
    keywords: ["hubspot", "hs"],
    patterns: [/hubspot/i],
    response: `**Lusha + HubSpot Integration:**

- **Auto-enrich** — Enrich HubSpot contacts and companies automatically
- **One-click push** — Export prospects from Lusha to HubSpot
- **Workflow triggers** — Use Lusha data in HubSpot workflows
- **Property mapping** — Map Lusha fields to HubSpot properties
- **List sync** — Sync Lusha lists to HubSpot static lists
- **Deal enrichment** — Enrich company data on deal records

Supports HubSpot Free, Starter, Professional, and Enterprise. Available on all Lusha plans.`,
  },
  {
    id: "crm-enrichment",
    keywords: ["enrich", "enrichment", "crm", "auto", "automatic", "bulk"],
    patterns: [/crm enrichment/i, /auto.?enrich/i, /bulk enrich/i],
    response: `**CRM Enrichment with Lusha:**

Keep your CRM data fresh and complete automatically:

- **New record enrichment** — Auto-enrich leads as they enter your CRM
- **Existing data refresh** — Update stale records on a schedule
- **Bulk enrichment** — Enrich thousands of records at once
- **Gap filling** — Fill in missing phone, email, title, and company data
- **Data decay prevention** — Automatically flag and update outdated info

**Enrichment fields:** Email, phone, title, seniority, department, company size, industry, revenue, tech stack, location, LinkedIn URL.`,
  },

  // ─── API (5) ───────────────────────────────────────────────
  {
    id: "api-overview",
    keywords: ["api", "rest", "endpoint", "endpoints", "developer", "programmatic"],
    patterns: [/api (overview|docs|documentation)/i, /lusha api/i, /rest api/i],
    response: `**Lusha API Overview:**

The Lusha REST API gives you programmatic access to Lusha's data:

**Endpoints:**
- **Person Lookup** — \`POST /v2/person/lookup\` — Find contact data by name + company
- **Company Lookup** — \`GET /v2/company/lookup\` — Get firmographics by domain
- **Contact Search** — \`POST /v2/contacts/search\` — Search contacts with filters
- **Contact Enrich** — \`POST /v2/contact/enrich\` — Enrich by email
- **Company Search** — \`POST /v2/companies/search\` — Search companies with filters
- **Webhooks** — \`POST /v2/webhooks\` — Set up event notifications

**Authentication:** Bearer token via API key
**Rate limits:** Vary by plan (1,000-10,000 requests/min)
**Base URL:** \`https://api.lusha.com\`

Ask me for a **code example** for any endpoint! (e.g., "Show me Python code for person lookup")`,
  },
  {
    id: "person-api",
    keywords: ["person", "api", "lookup", "endpoint", "contact"],
    patterns: [/person (api|endpoint|lookup)/i, /\/v2\/person/i],
    response: `**Person Lookup API** — \`POST /v2/person/lookup\`

Look up contact data by name and company.

**Request fields:**
- \`firstName\` (required) — First name
- \`lastName\` (required) — Last name
- \`company\` (required) — Company name or domain
- \`linkedinUrl\` (optional) — LinkedIn profile URL

**Response fields:**
- \`fullName\`, \`title\`, \`seniority\`, \`department\`
- \`emails[]\` — Array of verified emails
- \`phones[]\` — Array of phone numbers
- \`social\` — LinkedIn, Twitter URLs
- \`company\` — Firmographic data

**Cost:** 1 credit per successful lookup

Ask me for **code examples** — I can show curl, Python, or Node.js!`,
  },
  {
    id: "company-api",
    keywords: ["company", "api", "lookup", "domain", "firmographic"],
    patterns: [/company (api|endpoint)/i, /\/v2\/company/i, /company lookup api/i],
    response: `**Company Lookup API** — \`GET /v2/company/lookup\`

Get company firmographics by domain.

**Request params:**
- \`domain\` (required) — Company website domain (e.g., "techcorp.io")

**Response fields:**
- \`name\`, \`domain\`, \`industry\`
- \`employeeCount\`, \`revenue\`
- \`founded\`, \`hq\`, \`locations[]\`
- \`funding\` — Total raised + rounds
- \`technologies[]\` — Tech stack
- \`socialProfiles\` — LinkedIn, Twitter

**Cost:** 1 credit per lookup

Ask me for **code examples** — I can show curl, Python, or Node.js!`,
  },
  {
    id: "prospecting-api",
    keywords: ["prospecting", "search", "api", "contacts", "filter"],
    patterns: [/prospecting api/i, /contact search api/i, /search.*api.*contacts/i],
    response: `**Contact Search API** — \`POST /v2/contacts/search\`

Search for contacts using the same filters as the Lusha web app.

**Filter options:**
- \`jobTitle\` — Array of titles
- \`seniority\` — C-Suite, VP, Director, Manager, etc.
- \`department\` — Sales, Engineering, Marketing, etc.
- \`companySize\` — Employee count ranges
- \`industry\` — Industry categories
- \`location\` — Geography filter
- \`technologies\` — Tech stack filter
- \`limit\` — Results per page (max 100)

**Response:** Array of contacts with full data

**Cost:** 1 credit per contact in results

Ask me for **code examples** — I can show curl, Python, or Node.js!`,
  },
  {
    id: "api-webhooks",
    keywords: ["webhook", "webhooks", "event", "events", "notify", "notification", "callback"],
    patterns: [/webhook/i, /api.*event/i, /callback url/i],
    response: `**Lusha Webhooks** — \`POST /v2/webhooks\`

Receive real-time notifications for Lusha events:

**Available events:**
- \`contact.enriched\` — Contact enrichment completed
- \`list.completed\` — Bulk list processing done
- \`credit.low\` — Credit balance below threshold
- \`data.updated\` — Contact data has changed
- \`export.ready\` — Export file ready for download

**Webhook payload includes:**
- Event type and timestamp
- Full resource data (contact, list, etc.)
- HMAC signature for verification

**Security:** All webhooks are signed with your secret key for payload verification.

Ask me for a **code example** to set up webhooks!`,
  },

  // ─── Pricing (2) ───────────────────────────────────────────
  {
    id: "pricing",
    keywords: ["pricing", "price", "plan", "plans", "cost", "subscription", "tier"],
    patterns: [/pric(e|ing)/i, /how much/i, /plans?\b/i, /cost/i],
    response: `**Lusha Pricing Plans:**

| Plan | Monthly Price | Credits/Month | Key Features |
|------|--------------|---------------|--------------|
| **Free** | $0 | 50 | Basic search, browser extension, 1 user |
| **Pro** | $49/user | 500 | CRM integration, list export, team management |
| **Premium** | $79/user | 1,000 | Intent data, job changes, API access, bulk enrich |
| **Enterprise** | Custom | Custom | Dedicated CSM, SLA, SSO, custom integrations |

**All plans include:**
- Email & phone reveals
- Browser extension
- Prospecting search
- GDPR compliance tools

Annual billing saves 25%. Free trial available on Pro and Premium.`,
  },
  {
    id: "credits",
    keywords: ["credit", "credits", "usage", "reveal", "reveals", "limit", "quota"],
    patterns: [/credits?/i, /how many (reveals|lookups)/i, /credit (usage|balance|limit)/i],
    response: `**Lusha Credits:**

Credits are consumed when you reveal contact data:

| Action | Credit Cost |
|--------|------------|
| Email reveal | 1 credit |
| Phone reveal | 1 credit |
| Email + Phone | 1 credit |
| Company lookup | 1 credit |
| API call (per result) | 1 credit |
| Bulk enrichment | 1 credit/contact |

**Credit details:**
- Credits refresh monthly on your billing date
- Unused credits do **not** roll over
- Credit usage is tracked per user and per team
- Admins can set per-user credit limits
- Low-credit alerts available via email or webhook

Check your credit balance anytime in the Lusha dashboard or via the API.`,
  },

  // ─── Security (2) ─────────────────────────────────────────
  {
    id: "compliance",
    keywords: ["compliance", "gdpr", "ccpa", "soc", "iso", "security", "audit"],
    patterns: [/compliance/i, /gdpr/i, /ccpa/i, /soc\s?2/i, /security/i],
    response: `**Lusha Security & Compliance:**

| Standard | Status |
|----------|--------|
| GDPR | Fully compliant |
| CCPA | Fully compliant |
| SOC 2 Type II | Certified |
| ISO 27001 | Certified |

**Security measures:**
- AES-256 encryption at rest, TLS 1.3 in transit
- SSO via SAML 2.0 and OAuth 2.0 (Enterprise)
- Role-based access controls (RBAC)
- Audit logging for all data access
- Annual third-party penetration testing
- Data Processing Agreement (DPA) available

Lusha is a member of the **EU-US Data Privacy Framework**.`,
  },
  {
    id: "data-privacy",
    keywords: ["privacy", "opt", "out", "delete", "rights", "consent", "do not sell"],
    patterns: [/data privacy/i, /opt.?out/i, /delete my data/i, /right to/i],
    response: `**Lusha Data Privacy:**

Lusha is committed to data privacy and individual rights:

- **Opt-out portal** — Anyone can request removal from Lusha's database at lusha.com/opt-out
- **Right to access** — Request a copy of your data
- **Right to delete** — Request complete data deletion
- **Do Not Sell** — CCPA "Do Not Sell" opt-out honored
- **Consent management** — Lusha only processes data with lawful basis
- **Data minimization** — Only business-relevant data is collected
- **Retention limits** — Data is periodically reviewed and purged

For privacy requests, contact privacy@lusha.com.`,
  },

  // ─── Code Snippet Triggers (4) ────────────────────────────
  {
    id: "code-person-lookup",
    keywords: ["code", "snippet", "example", "person", "lookup", "api"],
    patterns: [/code.*(person|contact)\s*(lookup|search|find)/i, /(person|contact)\s*(lookup|search).*code/i],
    response: "__CODE_SNIPPET__:personLookup",
  },
  {
    id: "code-company-lookup",
    keywords: ["code", "snippet", "example", "company", "lookup", "domain"],
    patterns: [/code.*company\s*(lookup|search|find)/i, /company\s*(lookup|search).*code/i],
    response: "__CODE_SNIPPET__:companyLookup",
  },
  {
    id: "code-prospecting",
    keywords: ["code", "snippet", "example", "prospecting", "contact", "search", "filter"],
    patterns: [/code.*prospect/i, /code.*contact.*search/i, /prospect.*code/i],
    response: "__CODE_SNIPPET__:contactSearch",
  },
  {
    id: "code-webhook",
    keywords: ["code", "snippet", "example", "webhook", "event", "setup"],
    patterns: [/code.*webhook/i, /webhook.*code/i, /webhook.*example/i],
    response: "__CODE_SNIPPET__:webhookSetup",
  },

  // ─── Greetings (3) ────────────────────────────────────────
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "greetings", "morning", "afternoon", "evening"],
    patterns: [/^(hi|hello|hey|howdy|sup|good\s*(morning|afternoon|evening))\b/i],
    response: `Hey there! I'm the **Lusha Assistant**. I can help you with:

- **Product info** — What Lusha does and how it works
- **Pricing & credits** — Plans and credit usage
- **Demo lookups** — Try "Look up Sarah Chen" or "Look up TechCorp"
- **API code examples** — Try "Show me API code for person lookup"
- **Integrations** — Salesforce, HubSpot, and more
- **Buying signals** — Intent data, job changes

What would you like to know?`,
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank", "thx", "ty", "appreciate"],
    patterns: [/thank/i, /\bthx\b/i, /\bty\b/i],
    response: "You're welcome! Let me know if you have any other questions about Lusha. I'm here to help!",
  },
  {
    id: "bye",
    keywords: ["bye", "goodbye", "see", "later", "cya"],
    patterns: [/\b(bye|goodbye|see ya|cya|later)\b/i],
    response: "Goodbye! Feel free to come back anytime you need help with Lusha. Happy prospecting! 🎯",
  },
];

module.exports = { knowledgeBase };
