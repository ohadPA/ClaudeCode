MONDAY 10/7 - BUSY DAY

=== Meeting 1: Product sync w/ Sarah & Jordan (9am) ===

attendees: sarah (head of product), jordan (design), me
context: weekly product sync

- talked about Q4 priorities
- Sarah wants to push dark mode up in priority
  - "most requested feature by far"
  - engineering team asking for it (mike specifically)
  - might help with retention?

jordan showed initial mockups for dark mode
- looks good! really clean
- uses our existing color system
- question: what about user-uploaded images? contrast issues?
- jordan will investigate

ONBOARDING discussion:
sarah: "we need to hit 60% activation by end of Q1"
- current: 45% (not great)
- time to first task completion: 45 min (too slow)
- competitor linear: ~15 min

ideas discussed:
- template library (pre-built projects users can start with)
- better first-run experience
- video tutorials? (jordan says maybe not, users skip videos)
- interactive tour (jordan likes this)

ACTION ITEMS:
- me: research what competitors do for onboarding (asana, linear, clickup)
- jordan: wireframes for interactive tour concept
- sarah: talk to customer success about common activation blockers

also talked about mobile app progress
- on track for Q1 launch (good news!)
- alex (mobile PM) demoing beta next week

---

=== Meeting 2: Stakeholder check-in w/ Mike (CTO) (11:30am) ===

mike (cto) wants to discuss notifications system

CONTEXT:
notifications are messy right now
- too many emails (users complaining)
- not enough context in notifications
- mobile notifications not working great
- users miss important updates

Mike's perspective:
"engineering team is drowning in notifications"
- average engineer gets 40-50 notifications/day
- most are noise
- important stuff gets buried

discussed:
1. smart batching (group similar notifications)
   - mike: "like github does it - one email for multiple events"
   - me: makes sense, but need to define what gets batched

2. notification preferences need overhaul
   - current: binary (on/off per notification type)
   - need: granular (by project, by person, by urgency)

3. digest mode
   - batch non-urgent notifications
   - send once daily (or twice daily?)
   - mike: "i want morning digest, not constant interruptions"

4. timezone-aware notifications
   - don't notify at 2am!
   - respect working hours
   - mike mentioned they built this at his last company

TECHNICAL CONSIDERATIONS:
- notification service currently synchronous (slows down API)
- need to move to async queue (redis? kafka?)
- mike estimates 2 sprint effort
- need database schema changes (preferences table redesign)

CONCERNS from Mike:
- team is at capacity (mobile app work)
- this would push dark mode back
- suggests Q2 instead of Q1?

my take: notifications are important but dark mode is more visible
sarah might disagree - need to discuss priorities

ACTION:
- me: draft PRD for notification improvements
- me: talk to customer success - how many tickets are notification-related?
- me: competitive analysis (how do other tools handle this?)
- mike: technical spec if we decide to move forward

random note: mike mentioned engineer happiness survey results
- tools satisfaction: 7.2/10 (down from 7.8 last quarter)
- dark mode came up multiple times in comments
- performance issues mentioned (3 people)

---

=== Meeting 3: Planning session - Template Library (2pm) ===

brainstorming session for template library project
attendees: me, jordan (design), alex (mobile pm), jamie (eng lead)

BACKGROUND:
users take forever to get started
new user flow:
1. sign up
2. stare at empty workspace
3. ... now what?
4. manually create first project
5. manually create first tasks
6. finally start using product (45 min later!)

GOAL: get users to value faster

TEMPLATE LIBRARY CONCEPT:
pre-built project templates users can use
- "product launch"
- "sprint planning"
- "hiring pipeline"
- "content calendar"
- "bug tracking"
- etc.

discussion:

jordan: "we should show templates immediately after signup"
- modal: "choose a template to get started"
- can skip (create blank project)
- templates have real tasks, not just structure

me: "how many templates do we need?"
- jordan: "start with 5-7, expand later"
- too many = paradox of choice
- too few = not enough variety

alex: "mobile app should have templates too"
- consistent experience
- mobile users probably need templates more (smaller screen, harder to setup)

jamie (eng): "template data structure?"
- json files? database records?
- need versioning (templates evolve)
- need to support custom fields (templates might use them)

CONCERNS:
jamie: "templates are tricky"
- users customize templates
- template updates don't affect existing projects
- or DO they? (might be a feature!)

me: "privacy/security?"
- enterprise customers might want PRIVATE templates
- team-specific templates (not just global)
- sarah mentioned this before

COMPETITIVE RESEARCH NOTES:
- Asana has template library (huge! 100+ templates)
  - organized by category
  - some are "certified" by Asana
  - users can create/share templates
- notion has templates (inline, good UX)
- clickup has templates (overwhelming, too many options)
- linear: NO templates (interesting! they just have blank projects)

OPEN QUESTIONS:
1. template discovery - how do users find templates?
2. template customization - edit before creating project?
3. community templates - let users share?
4. template analytics - which templates are popular?

jamie's technical estimate: 3-4 sprints
- template storage system
- template rendering logic
- UI for browsing templates
- UI for creating from template
- versioning system (if we want updates)

alex: "can this wait until after mobile app ships?"
- team capacity issue again
- mobile app = Q1 priority
- this might be Q2

DECISION: need to prioritize with Sarah
- is template library Q1 or Q2?
- ties into activation OKR (important!)
- but team capacity is constrained

ACTION ITEMS:
- me: write one-pager on template library (scope, goals, timeline)
- me: gather data on activation drop-off (where do users abandon?)
- jordan: quick mockups of template selection UI
- jamie: more detailed technical estimate
- alex: check if mobile app needs template support at launch (or later?)

---

RANDOM NOTES / PARKING LOT:

- sarah wants to discuss API v2 roadmap next week
- customer success escalated enterprise customer asking about custom SSO
  (we have SAML but they want some other protocol? need to investigate)
- mike mentioned performance regression in search (looking into it)
- marketing wants to do a dark mode launch campaign (getting ahead of ourselves?)
- someone on slack mentioned competitor "motion" (haven't heard of them - need to check out)

personal reminder: need to review alex's mobile PRD by wednesday

UPCOMING THIS WEEK:
- tuesday: customer interview (enterprise admin from salesforce)
- wednesday: design review (dark mode final mockups)
- thursday: sprint planning
- friday: all-hands

data to pull:
- activation funnel breakdown (where are drop-offs?)
- notification ticket volume (last 3 months)
- feature request frequency (dark mode vs templates vs notifications)
- survey results (nps, user satisfaction)

---

PRIORITIES EMERGING:
1. mobile app (committed, Q1)
2. dark mode (highly requested, team morale, relatively quick)
3. activation/onboarding (OKR-critical, but what exactly?)
   - templates? interactive tour? both?
4. notifications (pain point, but complex, might be Q2)
5. enterprise features (sso variants, advanced permissions - ongoing)

need to get clarity from sarah on what's actually Q1 vs Q2

---

FOLLOW-UPS NEEDED:
✓ competitive research on onboarding (me)
- PRD for notifications (me)
- one-pager on template library (me)
- talk to customer success re: notifications & activation (me)
- review mobile PRD (me)
- wireframes for interactive tour (jordan)
- dark mode final mockups (jordan)
- technical spec for notifications (mike)
- technical estimate for templates (jamie)

busy week ahead!

---

# ACTION ITEMS SUMMARY - Monday 10/7

*Extracted and organized by Claude Code*

## By Owner

### You (Senior PM)

| # | Action Item | Meeting | Priority | Due Date |
|---|------------|---------|----------|----------|
| 1 | Research competitor onboarding (Asana, Linear, ClickUp) | Product Sync | 🔴 High | Wed 10/9 |
| 2 | Draft PRD for notification improvements | Stakeholder Check-in | 🔴 High | Fri 10/11 |
| 3 | Talk to Customer Success re: notification ticket volume | Stakeholder Check-in | 🟡 Medium | Thu 10/10 |
| 4 | Competitive analysis on notification systems | Stakeholder Check-in | 🟡 Medium | Tue 10/15 |
| 5 | Write one-pager on template library (scope, goals, timeline) | Template Planning | 🔴 High | Fri 10/11 |
| 6 | Gather data on activation drop-off points | Template Planning | 🟡 Medium | Fri 10/11 |
| 7 | Review Alex's mobile PRD | Parking Lot | 🟡 Medium | Wed 10/9 |
| 8 | Investigate competitor "Motion" and AI features | Parking Lot | 🟢 Low | Next week |

### Jordan (Head of Design)

| # | Action Item | Meeting | Priority | Due Date |
|---|------------|---------|----------|----------|
| 1 | Investigate dark mode contrast issues with user-uploaded images | Product Sync | 🟡 Medium | Wed 10/9 |
| 2 | Wireframes for interactive tour concept | Product Sync | 🔴 High | Mon 10/14 |
| 3 | Quick mockups of template selection UI | Template Planning | 🟡 Medium | Mon 10/14 |
| 4 | Dark mode final mockups (design review Wed) | Parking Lot | 🔴 High | Wed 10/9 |

### Sarah (Head of Product)

| # | Action Item | Meeting | Priority | Due Date |
|---|------------|---------|----------|----------|
| 1 | Talk to Customer Success about common activation blockers | Product Sync | 🔴 High | Fri 10/11 |
| 2 | Decide: template library Q1 or Q2? | Template Planning | 🔴 High | Fri 10/11 |
| 3 | Schedule API v2 roadmap discussion | Parking Lot | 🟢 Low | Next week |

### Mike (CTO)

| # | Action Item | Meeting | Priority | Due Date |
|---|------------|---------|----------|----------|
| 1 | Technical spec for notification system (if moving forward) | Stakeholder Check-in | 🟡 Medium | TBD |
| 2 | Investigate search performance regression | Parking Lot | 🟡 Medium | This week |

### Jamie (Engineering Lead)

| # | Action Item | Meeting | Priority | Due Date |
|---|------------|---------|----------|----------|
| 1 | More detailed technical estimate for template library | Template Planning | 🟡 Medium | Fri 10/11 |

### Alex (Mobile PM)

| # | Action Item | Meeting | Priority | Due Date |
|---|------------|---------|----------|----------|
| 1 | Check if mobile app needs template support at launch | Template Planning | 🟡 Medium | Fri 10/11 |
| 2 | Demo mobile app beta | Product Sync | 🔴 High | Next week |

---

## Key Decisions Needed

1. **Q1 vs Q2 prioritization** - Template library, notifications, dark mode (discuss with Sarah)
2. **Notification timeline** - Mike suggests Q2, but it's a real pain point
3. **Template library scope** - Web only first, or mobile too?

## Data to Pull This Week

- Activation funnel breakdown (drop-off points)
- Notification ticket volume (last 3 months)
- Feature request frequency (dark mode vs templates vs notifications)
- NPS and user satisfaction survey results
