// knowledge-base.js
// Structured TaskFlow product knowledge for the chatbot.
// Each entry has: id, category, keywords (for matching), question patterns, and a response.

const knowledgeBase = [
  // --- PRODUCT OVERVIEW ---
  {
    id: "what-is-taskflow",
    category: "overview",
    keywords: ["what", "taskflow", "about", "overview", "introduction", "tell me"],
    patterns: [/what is taskflow/i, /tell me about taskflow/i, /what does taskflow do/i, /overview/i],
    response: `**TaskFlow** is a project management SaaS built specifically for remote teams.

Think **"Asana meets Linear"** — beautiful like Linear, functional like Asana, but designed for how remote teams actually work.

**Core value:** Context-rich task management and async collaboration at 50% lower cost than competitors.

**Key differentiators:**
- Async-first design (no real-time coordination required)
- Context over status (every task answers: What? Why? Who? When? How?)
- Sub-second page loads with keyboard shortcuts everywhere
- Beautiful, opinionated UI with escape hatches

Would you like to know about our **features**, **pricing**, or **integrations**?`
  },
  {
    id: "company-info",
    category: "overview",
    keywords: ["company", "founded", "team", "employees", "headquarters", "funding", "series"],
    patterns: [/company/i, /who (made|built|founded)/i, /funding/i, /how big/i, /team size/i],
    response: `**TaskFlow Company Info:**
- **Founded:** 2021 in San Francisco, CA
- **Stage:** Series B ($20M raised total)
- **Team:** 50 employees
- **Investors:** Y Combinator, Sequoia Capital, Andreessen Horowitz

**Mission:** Empower remote teams to collaborate seamlessly through intelligent project management.

**Vision:** Become the default project management tool for modern remote-first companies.`
  },

  // --- FEATURES ---
  {
    id: "features-overview",
    category: "features",
    keywords: ["features", "capabilities", "can do", "functionality", "what can"],
    patterns: [/features/i, /what can (it|taskflow) do/i, /capabilities/i, /functionality/i],
    response: `**TaskFlow Core Features:**

1. **Task Management** — Rich descriptions (markdown), assignees, priorities, due dates, subtasks, custom fields, and context cards
2. **Projects & Views** — List, Board (Kanban), Calendar, Timeline (Gantt), saved views, templates
3. **Collaboration** — Threaded comments, @mentions, emoji reactions, AI comment summaries, decision tracking
4. **Notifications** — Email, in-app, Slack, mobile. Smart batching, timezone-aware delivery
5. **Integrations** — Slack, GitHub, Figma, Google Drive, Calendar sync (two-way)
6. **Reporting** — Velocity charts, cycle time, burndown, custom reports, predictive analytics

Which feature would you like to learn more about?`
  },
  {
    id: "task-management",
    category: "features",
    keywords: ["task", "tasks", "create task", "assign", "subtask", "custom field", "priority", "due date"],
    patterns: [/task management/i, /create (a )?task/i, /how (do|to) .*(task|assign)/i, /subtask/i, /custom field/i],
    response: `**Task Management in TaskFlow:**

You can create tasks with:
- **Rich descriptions** — Full markdown support with embeds and code blocks
- **Assignees** — Assign to one or more team members
- **Priorities** — Urgent, High, Medium, Low
- **Due dates** — With calendar integration
- **Tags & labels** — Organize however you like
- **Subtasks** — Break complex work into smaller pieces
- **Custom fields** — Text, number, select, date — whatever your workflow needs
- **Attachments** — Files, links, and context

**What makes us different:** Every task has a built-in **Context Card** — space for "why," background info, and decisions. No more "what's this task about?" questions.`
  },
  {
    id: "views",
    category: "features",
    keywords: ["view", "views", "board", "kanban", "list", "calendar", "timeline", "gantt"],
    patterns: [/views?/i, /board/i, /kanban/i, /list view/i, /calendar/i, /timeline/i, /gantt/i],
    response: `**Project Views in TaskFlow:**

- **List View** — Classic task list, sortable and filterable
- **Board View** — Kanban-style drag-and-drop columns
- **Calendar View** — Tasks plotted on a calendar by due date
- **Timeline View** — Gantt-style view for project planning

**Special features:**
- **View Memory** — TaskFlow remembers your preferred view per project
- **Smart Filters** — Natural language filtering (e.g., "My tasks due this week")
- **Saved Views** — Create custom filtered views and share with your team
- **Project Status** — Auto-calculated from task completion`
  },
  {
    id: "collaboration",
    category: "features",
    keywords: ["collaborate", "collaboration", "comment", "mention", "discuss", "team", "async"],
    patterns: [/collaborat/i, /comment/i, /mention/i, /@mention/i, /discuss/i, /async/i],
    response: `**Collaboration in TaskFlow:**

- **Threaded comments** — Organized discussions on every task
- **@mentions** — Tag team members to loop them in
- **Emoji reactions** — Quick acknowledgements
- **Subscribe** — Follow task updates you care about
- **Activity feed** — See what's happening across your projects

**What makes us different:**
- **AI Comment Summaries** — Long threads get auto-summarized so you can catch up fast
- **Decision Tracking** — Mark any comment as a "Decision" — findable and searchable later
- **Context Preservation** — Every update includes full context

80% of teams use comments daily — it's our most-engaged feature.`
  },
  {
    id: "keyboard-shortcuts",
    category: "features",
    keywords: ["keyboard", "shortcut", "shortcuts", "hotkey", "cmd", "ctrl"],
    patterns: [/keyboard/i, /shortcut/i, /hotkey/i],
    response: `**Keyboard Shortcuts in TaskFlow:**

TaskFlow is built for speed — you can do everything without touching your mouse:
- **Cmd+K** — Command palette (search anything)
- **j/k** — Navigate up/down through tasks
- **c** — Create new task
- **Cmd+Shift+C** — Add comment
- **Tab** — Indent / create subtask
- **1-4** — Set priority
- And many more...

Press **?** anywhere in TaskFlow to see the full shortcut list.`
  },

  // --- PRICING ---
  {
    id: "pricing",
    category: "pricing",
    keywords: ["price", "pricing", "cost", "plan", "plans", "free", "pro", "enterprise", "how much", "pay"],
    patterns: [/pric/i, /cost/i, /how much/i, /plans?/i, /free/i, /pay/i, /subscription/i],
    response: `**TaskFlow Pricing:**

| Plan | Price | Highlights |
|------|-------|------------|
| **Free** | $0 | Up to 10 users, unlimited tasks/projects, basic integrations, 7-day history |
| **Pro** | $12/user/month | Unlimited users & history, advanced integrations, custom fields, priority support, advanced reporting |
| **Enterprise** | Custom | SSO (SAML/OAuth), advanced permissions, audit logs, dedicated support, SLA guarantees |

**How we compare:**
- Asana Pro: $13.49/user/mo — TaskFlow is **11% cheaper**
- Monday.com: $10/user/mo — TaskFlow offers **more features**
- Linear: $12/user/mo — TaskFlow is **better for cross-functional teams**

Want to start with our Free plan or learn about Enterprise?`
  },

  // --- INTEGRATIONS ---
  {
    id: "integrations",
    category: "integrations",
    keywords: ["integration", "integrations", "connect", "slack", "github", "figma", "google", "calendar"],
    patterns: [/integrat/i, /connect/i, /slack/i, /github/i, /figma/i, /google drive/i, /calendar/i],
    response: `**TaskFlow Integrations:**

- **Slack** — Post updates, create tasks from Slack, get notifications in channels
- **GitHub** — Link PRs to tasks, auto-update task status when PRs merge
- **Figma** — Embed designs directly in tasks, link design files
- **Google Drive** — Attach docs, preview files in-app
- **Calendar** — Sync due dates with Google Calendar and Outlook

**What makes us different:**
- **Two-way sync** — Changes in TaskFlow update your connected tools and vice versa
- **Context flow** — Integrations automatically pull in relevant context

All integrations are available on the **Pro** plan. Slack basic integration is included in Free.`
  },

  // --- GETTING STARTED ---
  {
    id: "getting-started",
    category: "onboarding",
    keywords: ["start", "get started", "begin", "setup", "onboard", "new", "sign up", "signup"],
    patterns: [/get(ting)? started/i, /how (do|to) (I )?(start|begin|setup|sign up)/i, /onboard/i, /new user/i],
    response: `**Getting Started with TaskFlow:**

1. **Sign up** at taskflow.com — free, no credit card required
2. **Create your workspace** — name it after your team or company
3. **Invite your team** — send email invites or share a link
4. **Create your first project** — use a template or start from scratch
5. **Add tasks** — start tracking your work immediately

**Pro tips:**
- Use a **project template** to get started fast (we have templates for sprints, product launches, marketing campaigns, and more)
- Set up **Slack integration** first — it's the quickest way to get your team engaged
- Try **keyboard shortcuts** (press ? for the full list) — power users love them

**Median time to first task:** 15 minutes (our target). You'll be productive from day one.`
  },

  // --- SUPPORT ---
  {
    id: "support",
    category: "support",
    keywords: ["help", "support", "contact", "issue", "problem", "bug", "broken"],
    patterns: [/help/i, /support/i, /contact/i, /issue/i, /problem/i, /bug/i, /broken/i, /not working/i],
    response: `**TaskFlow Support:**

- **Free plan:** Community support (forums + knowledge base)
- **Pro plan:** Priority email support (< 4 hour response time)
- **Enterprise plan:** Dedicated support manager + SLA guarantees

**Self-service resources:**
- Help Center: help.taskflow.com
- Community Forum: community.taskflow.com
- Status Page: status.taskflow.com

**Contact us:**
- Email: support@taskflow.com
- In-app: Click the ? icon in the bottom-right corner

If you're experiencing a critical issue, our Pro and Enterprise support teams are available 24/5.`
  },

  // --- SECURITY ---
  {
    id: "security",
    category: "security",
    keywords: ["security", "secure", "sso", "saml", "oauth", "permission", "audit", "compliance", "gdpr", "soc"],
    patterns: [/secur/i, /sso/i, /saml/i, /oauth/i, /permission/i, /audit/i, /compliance/i, /gdpr/i, /soc ?2/i],
    response: `**TaskFlow Security & Compliance:**

**Enterprise features:**
- **SSO** — SAML 2.0 and OAuth integration
- **Advanced Permissions** — Role-based access control (RBAC)
- **Audit Logs** — Complete trail of who did what, when
- **Bulk User Management** — Add/remove users at scale

**Infrastructure:**
- Hosted on AWS with encryption at rest and in transit
- SOC 2 Type II compliant
- GDPR compliant
- 99.9% uptime SLA (Enterprise plan)
- Regular penetration testing

**Data:**
- Your data is yours — full export available anytime
- Data residency options available for Enterprise

These features are available on our **Enterprise plan**. Contact sales@taskflow.com for details.`
  },

  // --- COMPARISONS ---
  {
    id: "vs-asana",
    category: "comparison",
    keywords: ["asana", "compare", "comparison", "vs", "versus", "alternative", "better"],
    patterns: [/asana/i, /vs/i, /compar/i, /alternative/i, /better than/i, /switch from/i],
    response: `**TaskFlow vs Competitors:**

**vs Asana:**
- TaskFlow is simpler and 50% cheaper
- Better async-first design for remote teams
- Context cards (Asana lacks built-in context)

**vs Linear:**
- TaskFlow is better for cross-functional teams (not just engineering)
- More PM-friendly features and reporting

**vs Monday.com:**
- TaskFlow is faster and less overwhelming
- Opinionated workflow vs. too many options

**vs ClickUp:**
- TaskFlow is focused and polished vs. feature-bloated
- Much faster performance

**vs Jira:**
- TaskFlow is simpler, faster, more modern
- Built for startups, not enterprise bureaucracy

**vs Trello:**
- TaskFlow scales better as your team grows
- Rich task context, reporting, and integrations

Need help migrating from another tool? We offer free migration assistance for Pro and Enterprise plans.`
  },

  // --- MOBILE ---
  {
    id: "mobile",
    category: "features",
    keywords: ["mobile", "ios", "android", "phone", "app", "responsive"],
    patterns: [/mobile/i, /ios/i, /android/i, /phone/i, /app/i],
    response: `**TaskFlow Mobile:**

**Current:** TaskFlow has a fully responsive mobile web experience — works great on any phone or tablet browser.

**Coming soon (Q1 2025):**
- Native **iOS** app
- Native **Android** app
- Built with React Native for a fast, native experience
- Full feature parity with desktop

35% of our users already access TaskFlow from mobile web — the native apps will make that experience significantly better.`
  },

  // --- REPORTING ---
  {
    id: "reporting",
    category: "features",
    keywords: ["report", "reporting", "analytics", "dashboard", "velocity", "burndown", "metrics"],
    patterns: [/report/i, /analytics/i, /dashboard/i, /velocity/i, /burndown/i, /metrics/i],
    response: `**TaskFlow Reporting & Analytics:**

- **Team Velocity** — Tasks completed over time (trend charts)
- **Cycle Time** — How long tasks take from start to finish
- **Burndown Charts** — Track sprint progress visually
- **Custom Reports** — Filter by any field, save and share
- **CSV Export** — Get your data out anytime

**What makes us different:**
- **Automatic Insights** — "Team velocity decreased 20% this sprint — investigate"
- **Predictive Analytics** — "At current pace, this project will finish 3 days late"
- **Workload View** — See who's overloaded and who has capacity

Available on **Pro** and **Enterprise** plans.`
  },

  // --- ROADMAP ---
  {
    id: "roadmap",
    category: "overview",
    keywords: ["roadmap", "upcoming", "planned", "future", "coming soon", "next", "dark mode", "time tracking"],
    patterns: [/roadmap/i, /upcoming/i, /planned/i, /coming soon/i, /future/i, /dark mode/i, /time tracking/i],
    response: `**TaskFlow Product Roadmap:**

**In Progress (Q4 2024 - Q1 2025):**
- Native mobile apps (iOS & Android)
- SSO integration (SAML, OAuth)
- Advanced permissions (RBAC)
- Audit logs
- Improved onboarding & templates

**Planned (Q2-Q3 2025):**
- Dark mode
- Time tracking
- Resource management & capacity planning
- Custom workflows & automations
- API v2

**Exploring:**
- AI features (smart task suggestions, auto-categorization)
- Whiteboarding
- Goals & OKRs
- Portfolio management

We ship updates every two weeks. Follow our changelog at taskflow.com/changelog.`
  },

  // --- FALLBACK / GREETING ---
  {
    id: "greeting",
    category: "greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy"],
    patterns: [/^(hello|hi|hey|howdy|good (morning|afternoon|evening))[\s!.]*$/i],
    response: `Hello! Welcome to **TaskFlow** support. I'm here to help you with anything about our product.

Here are some things I can help with:
- **Features** — What TaskFlow can do
- **Pricing** — Plans and costs
- **Getting started** — How to set up your workspace
- **Integrations** — Slack, GitHub, Figma, and more
- **Security** — SSO, permissions, compliance
- **Comparisons** — How we stack up vs Asana, Linear, etc.

What would you like to know?`
  },
  {
    id: "thanks",
    category: "greeting",
    keywords: ["thank", "thanks", "thx", "appreciate"],
    patterns: [/thank/i, /thx/i, /appreciate/i],
    response: `You're welcome! If you have any other questions about TaskFlow, I'm here to help.

**Quick links:**
- Sign up free: taskflow.com
- Help center: help.taskflow.com
- Contact sales: sales@taskflow.com`
  },
  {
    id: "bye",
    category: "greeting",
    keywords: ["bye", "goodbye", "see you", "later", "quit", "exit"],
    patterns: [/bye/i, /goodbye/i, /see you/i, /later/i, /^(quit|exit)$/i],
    response: `Goodbye! Thanks for chatting with TaskFlow support. If you need anything else, we're always here. Have a great day!`
  }
];

module.exports = { knowledgeBase };
