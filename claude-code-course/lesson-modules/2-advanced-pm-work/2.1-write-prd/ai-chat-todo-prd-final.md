# TaskFlow AI Voice Chat Interface for Task Management

**PRD Version:** 3.0 -- Balanced Approach (Voice + Visual as Equal Partners)
**Author:** Product Management, TaskFlow
**Last Updated:** 2026-02-23
**Status:** Draft for Review
**Stakeholders:** Head of Product, CTO, Engineering Leads, Design, Customer Success

---

## Description: What is it?

TaskFlow AI Voice Chat is a hybrid split-screen interface that combines a real-time AI voice conversation panel with a synchronized visual task list. Users can speak naturally to create, update, query, and organize tasks while seeing every change reflected instantly in the task list beside it -- and vice versa. Clicking, dragging, or editing a task in the visual list is immediately acknowledged and reflected in the voice conversation context.

This is not a voice assistant bolted onto a task list, nor a task list with a microphone icon. It is a single, unified experience where voice and visual are co-equal interaction modes. Users choose whichever feels right in the moment -- talking during a walk, clicking at a desk, or seamlessly alternating between both -- and the system keeps everything in perfect sync.

**V1 Scope:** Single-turn voice commands (English, web only) for task creation, task updates (status, priority, assignee, due date), and simple queries ("What's due this week?", "Show my high-priority tasks"). The visual task list supports all existing TaskFlow interactions. Both panels share a single real-time state.

**Strategic Context:** This is Phase 1 of TaskFlow's three-phase AI roadmap:

```json
{
  "ai_roadmap": {
    "phase_1": {
      "name": "AI Input Layer",
      "focus": "Voice + natural language commands for task management",
      "timeline": "Q1-Q2 2026",
      "rationale": "Better input leads to better output -- nail the input layer first"
    },
    "phase_2": {
      "name": "AI Output Layer",
      "focus": "Intelligent summaries, auto-prioritization, smart suggestions",
      "timeline": "Q3-Q4 2026",
      "rationale": "Rich input data from Phase 1 enables smarter AI outputs"
    },
    "phase_3": {
      "name": "Proactive AI Assistant",
      "focus": "Anticipatory task creation, risk alerts, workflow optimization",
      "timeline": "2027",
      "rationale": "With input + output mastered, AI can act autonomously"
    }
  }
}
```

---

## Problem: What problem is this solving?

### Primary Problem

Task management feels like overhead, not real work. Users spend more time formatting, clicking through forms, and maintaining task hygiene than they do on the tasks themselves. The result: 45% of TaskFlow users skip creating tasks entirely because it is "too much work," leading to lost context, missed deadlines, and teams flying blind.

### Supporting Problems

| # | Problem | Evidence | Impact |
|---|---------|----------|--------|
| 1 | **High friction task creation** | "Writing a good task takes 5 minutes. Sometimes I just don't bother and keep it in my head." -- PM, user interview | 45% of users skip task creation; teams lose visibility |
| 2 | **Voice is an untapped input channel** | "I can articulate things way better when I'm talking than when I'm typing. Typing makes me overthink." -- PM, user interview | Ideas lost between conception and capture; slower throughput |
| 3 | **Good ideas lost in transit** | "I have my best ideas walking or driving. By the time I get to my desk, I've forgotten half of them." -- Designer, user interview | Innovation and planning quality degrade; rework increases |
| 4 | **Context switching tax** | Users report 8+ browser tabs open; 10 minutes lost per context switch to find and update the right task | 73% of users say they spend "too much time" on task management overhead |
| 5 | **No seamless modality switching** | Users forced to choose: voice tools (Siri, Alexa) with no visual feedback, or visual tools with no voice input | Awkward workflows; users default to lowest-friction option even when it is suboptimal |

### The Input Layer Thesis

Most competitors are racing to build AI *outputs* -- summaries, auto-prioritization, smart suggestions. TaskFlow takes the contrarian bet: **better input leads to better output**. If users can capture tasks faster and more completely through natural voice input, the downstream data quality improves, making every future AI feature (Phase 2 and 3) dramatically more effective. Owning the input layer is the strategic foundation.

---

## Why: How do we know this is a real problem and worth solving?

### Quantitative Evidence

| Data Point | Source | Significance |
|------------|--------|--------------|
| 45% of users skip creating tasks because it is "too much work" | Survey of 500 TaskFlow users (Dec 2024) | Nearly half our users are not capturing work properly -- core product failure |
| 62% want voice input for task creation | Same survey | Strong demand signal; majority of user base wants this |
| 73% say they spend "too much time" on task management overhead | Same survey | The core job-to-be-done (manage tasks) feels burdensome |
| 58% want AI to auto-fill task details | Same survey | Users want less friction, not more features |
| 23% of churned customers cite "missing features" as primary reason | Churn analysis | Direct revenue impact from feature gaps |
| 3% monthly churn rate (target: 2%) | Business metrics | Reducing churn by 1 point worth ~$504K ARR annually |
| 81% would pay extra for AI features ($7/user/month average) | Willingness-to-pay survey | Clear monetization path; expansion revenue opportunity |

### Qualitative Evidence

**From 20 in-depth user interviews (45-60 minutes each):**

- "I wish I could just talk to my phone and create tasks while I'm walking. That would be amazing." -- Engineering Manager
- "If I could just speak my tasks into existence while doing dishes or whatever, I'd be so much more productive." -- Marketing Manager
- "I spend more time managing my task list than actually doing the work. Something's wrong with that." -- Engineering Manager

### Competitive Urgency

| Competitor | AI Feature Status | Gap Risk |
|------------|------------------|----------|
| Asana | Launched AI task creation + summaries (Nov 2024) | Losing deals to "has AI" messaging |
| Linear | Adding AI-powered issue creation and triage | Encroaching on our eng manager persona |
| Notion | AI-powered page summaries and Q&A | Expanding into project management |
| ClickUp | Voice commands for task creation | Direct feature overlap threat |

**Risk of inaction:** Without AI features, TaskFlow loses competitive positioning in every new deal evaluation. 23% of churn is already attributed to "missing features" -- this will accelerate as competitors ship more AI capabilities.

### Strategic Fit

| Q1 Company Goal | How This Feature Contributes |
|-----------------|------------------------------|
| Reach $6M ARR (from $4.2M) | AI features drive expansion revenue ($7/user/month willingness-to-pay) and reduce churn |
| Launch AI-powered features | This IS the flagship AI launch -- Phase 1 of the AI roadmap |
| Reduce churn from 3% to 2% | Addresses "missing features" churn driver; increases task engagement and stickiness |

---

## Success: How do we know if we've solved this problem?

### Primary Success Metrics

| Metric | Current Baseline | Target (90 days post-launch) | Measurement Method |
|--------|-----------------|-----------------------------|--------------------|
| Voice feature adoption rate | N/A (new feature) | 30% of weekly active users try voice at least once | Product analytics: unique users triggering voice input / WAU |
| Weekly voice-active users | N/A | 15% of WAU use voice 2+ times per week | Product analytics: repeat voice usage per user per week |
| Tasks created per user per week | 4.2 tasks/user/week | 5.5 tasks/user/week (+31%) | Product analytics: total tasks created / active users |
| Task creation time (voice) | N/A | Under 15 seconds per task via voice | Product analytics: timestamp from voice activation to task saved |
| Task creation time (manual) | ~5 minutes per well-formed task | No regression (maintain current) | Product analytics: form open to task saved |

### Secondary Success Metrics

| Metric | Current Baseline | Target (90 days post-launch) | Measurement Method |
|--------|-----------------|-----------------------------|--------------------|
| Monthly churn rate | 3.0% | 2.5% (en route to 2.0% goal) | Revenue analytics |
| NPS score | 42 | 48 | Quarterly NPS survey |
| Voice command success rate | N/A | 85%+ commands correctly interpreted | Product analytics: successful actions / total voice commands |
| Feature-attributed expansion revenue | $0 | $50K MRR from AI tier upsells | Billing analytics tied to AI feature flag |
| Support tickets related to voice | N/A | < 2% of total support volume | Support ticket tagging |

### Qualitative Success Indicators

- Users describe the voice experience as "natural" and "fast" in feedback surveys
- Customer Success reports customers citing voice chat as a reason to stay or upgrade
- Prospective customers mention TaskFlow's voice feature in competitive evaluations
- Internal dogfooding: TaskFlow team members voluntarily use voice for their own task management

### Failure Criteria

| Signal | Threshold | Response |
|--------|-----------|----------|
| Adoption below 10% after 90 days | < 10% WAU trial | Conduct user research on barriers; consider UX redesign |
| Voice command accuracy below 70% | < 70% success rate | Pause rollout; invest in speech-to-intent model improvements |
| Increased churn correlated with feature | Churn increases in voice-exposed cohort | Immediate investigation; potential feature rollback |
| Net negative NPS impact | NPS drops 5+ points in exposed cohort | Halt rollout; gather qualitative feedback |

---

## Audience: Who are we building for?

### Primary Personas

| Persona | Role | Company Profile | Key Pain Point | Voice Use Case | Priority |
|---------|------|----------------|----------------|----------------|----------|
| **Priya the PM** | Product Manager | 50-200 person tech company, 3+ time zones | Coordinates cross-functional work; spends 30% of day on task overhead | Quick-capture tasks from meetings, hallway conversations, and commute | P0 |
| **Marcus the Eng Manager** | Engineering Manager | Distributed engineering team, 8-15 direct reports | Sprint planning and daily standup follow-ups consume entire mornings | Rapid task updates: "Mark AUTH-142 as done, assign AUTH-143 to Sarah" | P0 |
| **Dana the Marketing Lead** | Marketing Team Lead | Growth-stage company, campaigns across channels | Campaign tasks scattered; approvals bottlenecked | Voice queries: "What's blocking the Q2 launch campaign?" and quick task creation for action items | P1 |

### User Segmentation by Voice Affinity

| Segment | Description | Estimated % of Users | Voice Adoption Likelihood | Design Implications |
|---------|-------------|---------------------|--------------------------|---------------------|
| **Verbal Processors** | Think better out loud; prefer speaking to typing | ~25% | Very High | Optimize for conversational flow; allow longer utterances |
| **Efficiency Seekers** | Want fastest path to task completion regardless of modality | ~40% | High | Optimize for speed; single-turn commands; minimal confirmation steps |
| **Visual Organizers** | Prefer seeing and manipulating task lists directly | ~25% | Medium | Ensure visual list remains fully functional; voice is additive, not required |
| **Keyboard Loyalists** | Strongly prefer typed input; skeptical of voice | ~10% | Low | Never force voice; ensure zero degradation of existing non-voice experience |

### Who We Are NOT Building For (V1)

| Excluded Segment | Reason | Future Consideration |
|------------------|--------|---------------------|
| Non-English speakers | V1 English-only to ensure quality; multilingual in V2 | Phase 2 (Q3 2026) |
| Mobile-only users | V1 is web-only; mobile adds hardware/OS complexity | V1.5 or Phase 2 |
| Enterprise users needing compliance/audit trails for voice | Requires voice data retention policies and legal review | Phase 2 with enterprise security review |
| Users who need multi-turn complex workflows | V1 supports single-turn commands only | Phase 2: multi-turn conversations |

---

## What: Roughly, what does this look like in the product?

### Layout: The Split-Screen Hybrid

The core interface is a **side-by-side layout** within the existing TaskFlow workspace:

```
+------------------------------------------------------------------+
|  TaskFlow Navigation Bar                                         |
+-------------------------------+----------------------------------+
|                               |                                  |
|   VOICE CONVERSATION PANEL    |      VISUAL TASK LIST            |
|   (Left, ~40% width)         |      (Right, ~60% width)         |
|                               |                                  |
|   [Mic Button - Push/Toggle]  |   [Standard TaskFlow list view]  |
|                               |                                  |
|   Conversation transcript:    |   Tasks with inline editing:    |
|   - User said: "..."          |   [ ] Design voice UI mockups   |
|   - TaskFlow: "Created task"  |       Due: Mar 15 | @Dana       |
|   - User said: "..."          |   [x] Write PRD for voice chat  |
|   - TaskFlow: "Updated..."    |       Due: Mar 1  | @Priya      |
|                               |   [ ] Set up speech-to-text API |
|   [Voice waveform animation]  |       Due: Mar 10 | @Marcus     |
|                               |                                  |
|   Quick command suggestions:  |   Filters | Sort | Group        |
|   "Create a task..."          |                                  |
|   "What's due today?"         |                                  |
|   "Update status of..."       |                                  |
|                               |                                  |
+-------------------------------+----------------------------------+
```

### Interaction Model

**Principle:** Voice and visual are equal partners. Every action in one panel is immediately reflected in the other.

| User Action | Voice Panel Response | Visual Panel Response |
|-------------|---------------------|----------------------|
| Says: "Create a task called Design voice UI, assign to Dana, due March 15" | Shows transcript; confirms: "Created 'Design voice UI', assigned to Dana, due March 15th" | New task appears in list with smooth animation; fields pre-populated |
| Clicks a task checkbox in visual list | Acknowledges in transcript: "Marked 'Write PRD' as complete" | Checkbox fills; task moves to completed section |
| Says: "What's due this week?" | Shows transcript; reads back: "You have 3 tasks due this week: ..." | Visual list auto-filters to show this week's tasks; filter chip appears |
| Drags a task to reorder in visual list | Transcript notes: "Moved 'Set up API' above 'Design mockups'" | Task reorders with drag animation |
| Says: "Change priority of AUTH-143 to high" | Confirms: "Updated AUTH-143 priority to high" | Priority badge on AUTH-143 changes to red/high with pulse animation |

### V1 Supported Voice Commands

```json
{
  "voice_commands_v1": {
    "task_creation": {
      "examples": [
        "Create a task called [title]",
        "Add a new task: [title], assign to [person], due [date]",
        "New task: [title] with high priority"
      ],
      "fields_supported": ["title", "assignee", "due_date", "priority", "project"],
      "ai_behavior": "Extracts structured fields from natural speech; asks one clarifying question if title is ambiguous"
    },
    "task_updates": {
      "examples": [
        "Mark [task] as done",
        "Change the priority of [task] to [level]",
        "Reassign [task] to [person]",
        "Move the due date of [task] to [date]",
        "Add a comment to [task]: [comment]"
      ],
      "fields_supported": ["status", "priority", "assignee", "due_date", "comments"],
      "ai_behavior": "Matches task by title or ID; confirms before destructive updates"
    },
    "queries": {
      "examples": [
        "What's due this week?",
        "Show my high-priority tasks",
        "What tasks are assigned to [person]?",
        "How many open tasks in [project]?"
      ],
      "ai_behavior": "Filters visual list to match query; reads summary aloud; shows count"
    }
  }
}
```

### Key UX Details

**Voice Activation:**
- Push-to-talk button (spacebar shortcut) for discrete commands
- Toggle mode for hands-free operation (e.g., during a walking meeting)
- Visual waveform shows active listening state
- Clear "listening" vs. "processing" vs. "idle" states

**Real-Time Sync:**
- Changes from either panel propagate within 200ms
- Visual panel highlights the task being discussed in voice (soft glow/outline)
- Conversation transcript is scrollable and persistent for the session
- Filter state set by voice is shown as removable chips in the visual panel

**Graceful Degradation:**
- If voice recognition fails, transcript shows "I didn't catch that -- could you try again?" with a retry button
- Users can always fall back to clicking/typing without interrupting the voice session
- If microphone access is denied, the voice panel shows a gentle prompt with setup instructions; visual list works normally

**Panel Flexibility:**
- Panels are resizable (drag the divider)
- Voice panel can be collapsed to a floating mic button for users who want full-width list view
- Voice panel can be expanded to full-width for users who prefer a conversational interface

### Non-Goals for V1

| Excluded from V1 | Rationale |
|-------------------|-----------|
| Multi-turn conversations (follow-ups, back-and-forth) | Complexity too high for V1; single-turn commands cover 80% of use cases |
| Voice output / text-to-speech responses | Focus on input first; visual confirmation is sufficient for V1 |
| Multilingual support | English-first to ensure high accuracy; multilingual in Phase 2 |
| Mobile / native app | Web-first reduces variables; mobile in V1.5 |
| Voice-based project creation or workflow automation | Too complex; stick to task-level operations |
| Offline voice processing | Requires on-device models; not feasible for V1 |

---

## How: What is the experiment plan?

### Rollout Strategy: Phased with Feature Flags

| Phase | Audience | Duration | Purpose | Success Gate to Proceed |
|-------|----------|----------|---------|------------------------|
| **Alpha** | Internal TaskFlow team (45 people) | 2 weeks | Dogfooding; catch critical bugs; validate core flows | No P0 bugs; 70%+ voice command accuracy; positive internal sentiment |
| **Closed Beta** | 50 hand-selected customers (power users, vocal feedback givers) | 4 weeks | Real-world validation; gather qualitative feedback; stress test accuracy | 80%+ voice accuracy; 40%+ weekly retention among beta users; NPS of beta cohort >= 45 |
| **Open Beta** | All Pro and Enterprise customers (opt-in) | 4 weeks | Scale validation; monitor infrastructure; measure adoption | 25%+ opt-in rate; no infrastructure degradation; support ticket volume manageable |
| **General Availability** | All customers (default on for Pro/Enterprise, available for Starter) | Ongoing | Full launch; marketing push; monetization | Meets primary success metrics at 90-day mark |

### Experiment Design

**A/B Test During Open Beta:**

| Parameter | Details |
|-----------|---------|
| Hypothesis | Users exposed to the balanced voice + visual interface will create 25%+ more tasks per week than the control group |
| Control group | Standard TaskFlow interface (no voice panel) |
| Treatment group | Balanced split-screen interface with voice enabled |
| Sample size | 2,000 users per group (sufficient for 95% confidence, 80% power to detect 15% difference) |
| Duration | 4 weeks |
| Primary metric | Tasks created per user per week |
| Secondary metrics | Session duration, feature breadth (number of distinct voice commands used), retention (7-day and 30-day), NPS |
| Segmentation | Analyze by persona (PM vs. Eng Manager vs. Marketing), company size, and tenure |

### Data Collection Plan

| Data Type | What We Collect | What We Do NOT Collect | Storage |
|-----------|----------------|----------------------|---------|
| Voice command transcripts | Transcribed text of commands | Raw audio files (privacy) | Encrypted, 90-day retention, user-deletable |
| Command success/failure | Whether the intended action was completed | N/A | Product analytics pipeline |
| Panel interaction patterns | Which panel users interact with, switching frequency | Keystroke-level logging | Aggregated analytics only |
| User feedback | In-app feedback widget responses; beta survey results | N/A | Customer feedback tool |

### Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Voice accuracy below threshold | Medium | High | Use established speech-to-text provider (e.g., Deepgram, Whisper API); constrained command grammar improves accuracy; fallback to text input always available |
| Privacy concerns about microphone access | Medium | Medium | Clear permission flow; no raw audio storage; transparency page; opt-in only |
| Low adoption due to social stigma (talking to computer) | Medium | Medium | Toggle mode for private use; keyboard shortcut for discrete activation; emphasize balanced approach (voice is optional) |
| Infrastructure cost of real-time voice processing | Low | Medium | Rate limiting per user; efficient streaming architecture; monitor cost per voice minute closely |
| Scope creep into multi-turn conversations | High | Medium | Strict V1 scope document; multi-turn explicitly deferred to Phase 2; product review gates |

---

## When: When does it ship and what are the milestones?

### High-Level Timeline

| Milestone | Target Date | Duration | Key Deliverables | Owner |
|-----------|-------------|----------|-------------------|-------|
| **PRD Finalized** | 2026-03-07 | 1 week | Approved PRD; technical feasibility confirmed; design brief | Product |
| **Design Sprint** | 2026-03-21 | 2 weeks | Wireframes for split-screen layout; interaction design for voice panel; usability test with 5 users | Design |
| **Technical Spike** | 2026-03-28 | 1 week (parallel with design) | Speech-to-text provider selected; real-time sync architecture validated; latency benchmarks | Engineering |
| **Sprint 1: Core Voice Pipeline** | 2026-04-11 | 2 weeks | Mic activation, speech-to-text integration, basic command parsing, transcript display | Engineering |
| **Sprint 2: Task Actions + Sync** | 2026-04-25 | 2 weeks | Voice commands create/update tasks; visual list reflects changes in real-time; bi-directional sync | Engineering |
| **Sprint 3: Query Support + Polish** | 2026-05-09 | 2 weeks | Voice queries filter visual list; error handling; UX polish; accessibility review | Engineering + Design |
| **Alpha (Internal Dogfooding)** | 2026-05-23 | 2 weeks | Internal testing; bug fixes; accuracy tuning | Engineering + Product |
| **Closed Beta** | 2026-06-20 | 4 weeks | 50 customer beta; feedback collection; iteration | Product + Customer Success |
| **Open Beta + A/B Test** | 2026-07-18 | 4 weeks | Broader opt-in rollout; A/B experiment running; infrastructure monitoring | Product + Engineering |
| **GA Launch** | 2026-08-15 | -- | Full availability; marketing launch; monetization (AI tier) | All Teams |

### Resource Requirements

```json
{
  "team_allocation": {
    "engineering": {
      "frontend": "2 engineers (voice panel UI, split-screen layout, real-time sync)",
      "backend": "2 engineers (speech-to-text integration, command parsing, API layer)",
      "infrastructure": "1 engineer (part-time, streaming architecture, latency optimization)"
    },
    "design": {
      "product_designer": "1 designer (interaction design, visual design, usability testing)",
      "content_designer": "0.5 designer (voice UX copy, error messages, onboarding)"
    },
    "product": {
      "product_manager": "1 PM (this feature owner)",
      "user_researcher": "0.5 researcher (beta feedback synthesis, usability studies)"
    },
    "other": {
      "customer_success": "1 CSM (beta customer management, feedback triage)",
      "marketing": "0.5 marketer (launch prep, positioning, competitive messaging)"
    },
    "total_headcount": "~8 people across 5 months"
  }
}
```

### Dependencies

| Dependency | Type | Status | Risk if Delayed |
|------------|------|--------|-----------------|
| Speech-to-text API provider contract | External vendor | Evaluation in progress | 2-week delay to Sprint 1 start |
| WebSocket infrastructure for real-time sync | Internal platform | Available, needs scaling review | 1-week delay if scaling issues found |
| Browser microphone API compatibility testing | Technical | Not started | Blocks alpha; 1 week to resolve |
| Legal review of voice data privacy policy | Legal/Compliance | Not started | Blocks closed beta launch |
| Design system update for voice panel components | Internal design | Scheduled for design sprint | Blocks Sprint 1 frontend work |

### Key Decision Points

| Date | Decision | Decision Maker | Inputs Needed |
|------|----------|----------------|---------------|
| 2026-03-07 | PRD approval and green-light to build | Head of Product | This PRD; engineering feasibility assessment; design brief |
| 2026-03-28 | Speech-to-text vendor selection | CTO + PM | Vendor benchmarks (accuracy, latency, cost); security review |
| 2026-05-23 | Alpha go/no-go for closed beta | Head of Product | Alpha metrics (accuracy, bugs, internal feedback) |
| 2026-06-20 | Closed beta go/no-go for open beta | Head of Product + CTO | Beta metrics (adoption, accuracy, retention, feedback) |
| 2026-07-18 | GA launch go/no-go | CEO + Head of Product + CTO | A/B test results; infrastructure readiness; legal sign-off |

---

## Appendix

### A. Glossary

| Term | Definition |
|------|-----------|
| Single-turn command | A complete voice instruction that does not require follow-up context (e.g., "Create a task called X") |
| Multi-turn conversation | A back-and-forth dialogue where context carries across exchanges (explicitly out of scope for V1) |
| Bi-directional sync | Changes in either the voice or visual panel are immediately reflected in the other |
| Voice command accuracy | Percentage of voice commands where the system correctly interprets the user's intended action |
| WAU | Weekly Active Users |

### B. Open Questions

| # | Question | Owner | Target Resolution Date |
|---|----------|-------|----------------------|
| 1 | Should voice transcript persist across sessions or reset each time? | Product + Design | Design sprint (2026-03-21) |
| 2 | What is the maximum acceptable latency from voice command to visual list update? | Engineering | Technical spike (2026-03-28) |
| 3 | Should the AI tier be a standalone plan or an add-on to existing plans? | Product + Revenue | Before open beta (2026-07-01) |
| 4 | How do we handle shared/collaborative voice sessions (e.g., during a team standup)? | Product + Design | Deferred to V2 scoping |
| 5 | What accessibility accommodations are needed for users who cannot use voice? | Design + Engineering | Design sprint (2026-03-21) |

### C. References

- TaskFlow Company Context Document
- User Research: Productivity & Task Management Pain Points (Dec 2024, 20 interviews + 500-user survey)
- Socratic Questioning Session Notes (feature refinement)
- Lenny Rachitsky PRD Template
- Competitive analysis: Asana AI, Linear AI, Notion AI, ClickUp Voice (internal competitive brief)
