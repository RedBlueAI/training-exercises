# Session 6: Workflow Integration & Agent-Driven Development

## Objective

Practice the complete engineering workflow using Claude Workflow System commands — from session start through PRD validation, feature implementation, discovery, testing, bug fixing, and code review. This session ties together Coda (requirements), Linear (task tracking), and Claude Code (execution).

---

## Section 1: Starting the Day — Feature Development

### 1.1 Start Your Session

```bash
/StartSession focus="feature"
```

**What to review after session starts:**

Claude pulls context from Coda and Linear automatically. Visually inspect the output:

- **Coda context** — Does it show the correct project document ("Field Service App - AI Training Exercises")? Are PRDs listed?
- **Linear context** — Are open issues loaded from the "Field Service - AI Training" project? Do priorities and statuses look correct?
- **Session state** — Confirm the session plan was written to `docs/planning/`

If integrations are not connected, run `/CheckMCPStatus` to diagnose.

---

### 1.2 PRD Feasibility Check

Validate the "Sortable Columns for Service Requests" feature from the Session 6 PRD before implementation.

```bash
/PRDFeasibility prd="session-6" team="1 FE" timeline="1 session"
```

**What this does:**
- Loads the enriched PRD from `/docs/planning/prds/`
- Cross-references complexity with your team composition
- Calculates resource requirements (person-days by role)
- Assesses integration touchpoints and their risk levels
- Identifies prerequisites (infrastructure, dependencies, knowledge gaps)
- Produces a recommendation: **PROCEED**, **DEFER**, or **REJECT** with conditions

**Review the output for:**
- Is the timeline realistic for the team size?
- Are there any RED risk items that would block you?
- What prerequisites need to be completed first?

---

### 1.3 Implement the Feature

Implement the sortable columns feature from the Session 6 PRD using the full feature workflow.

```bash
/ImplementFeature feature="Sortable columns for Service Requests table" stack=["api", "ui"]
```

**What this does:**
- Discovers requirements from PRDs and documentation
- Generates a feature specification
- Pauses for your approval before writing code
- Routes work to specialist agents:
  - `api-route-designer` — extends `GET /api/service-requests` with `sortBy` and `sortOrder` query params
  - `react-component-writer` — converts the Service Requests page from a server component to a client component with sortable table headers
  - `nextjs-specialist` — handles App Router patterns and data fetching strategy
- Updates Linear with progress

**Approval checkpoints** — the workflow pauses for you to confirm:
1. After specification generation
2. Before major file creation

---

### 1.4 New Discovery — Log a Backlog Feature

While working on the Service Requests table, you discover a related PRD for **Inline AI Priority Triage**. The current app has a standalone `/ai-triage` page, but the PRD calls for bringing AI triage *inline* to the Service Requests table so facility managers don't have to context-switch.

Review the PRD: [PRD: Inline AI Priority Triage for Service Requests](https://coda.io/d/_dk2U-31c43Y/PRD-Inline-AI-Priority-Triage-for-Service-Requests_sux_NnpB)

**What's new compared to the current code:**
- The Service Requests table (`/service-requests`) has no AI integration — it's a static table reading from seed data
- The PRD requires an **AI triage icon button** in each table row (new "Actions" column)
- Clicking the icon opens an **AI Triage Modal** with the request data pre-populated
- The modal calls the existing `POST /api/ai/triage` endpoint and shows a **side-by-side priority comparison** (current vs. AI-suggested)
- A new `PATCH /api/service-requests/[id]` endpoint is needed for one-click priority updates
- Post-update behavior: table refresh + success toast notification

**Log this as a new backlog item:**

```bash
/LogNewFeature title="Inline AI Priority Triage for Service Requests" type="feature" priority="high" description="Add AI triage icon button to each row in the Service Requests table. Clicking opens a modal showing current request data, triggers AI assessment via existing POST /api/ai/triage, displays side-by-side priority comparison (current vs AI-suggested), and allows one-click priority update via new PATCH /api/service-requests/[id] endpoint. See PRD: https://coda.io/d/_dk2U-31c43Y/PRD-Inline-AI-Priority-Triage-for-Service-Requests_sux_NnpB"
```

---

### 1.5 Lunch Break — End Session

Close your morning session before stepping away.

```bash
/EndSession message="Completed sortable columns feature. Logged inline AI triage to backlog. Resuming after lunch."
```

**What `/EndSession` does:**
- Updates Linear issues (marks completed work as Done, adds progress comments)
- Posts a project update to Linear if issues were completed
- Generates a session summary with commits, issues progressed, and handoff notes
- Writes/updates the following files — **review each one:**

| File | What to check |
|------|---------------|
| `docs/planning/session-summary-YYYY-MM-DD.md` | Does it accurately capture what you accomplished? |
| `docs/planning/CURRENT-STATE.md` | Is the project status up to date? |
| `docs/planning/session-state.json` | Status should be `"ended"`, tasks moved to `pendingTasks` |
| `docs/planning/session-plan-*.md` | Should be **deleted** (cleanup of temporary session files) |

---

### 1.6 Resume After Lunch

Start a new session to continue where you left off.

```bash
/StartSession focus="feature"
```

Verify that:
- The previous session's context is picked up (pending tasks, completed work)
- Linear and Coda integrations reconnect cleanly
- The session plan references carry-over work

---

### 1.7 Generate Tests

Create test specifications for the sortable columns feature you implemented in step 1.3.

```bash
/GenerateTests target="src/app/service-requests/page.tsx" types=["unit", "integration"] coverage=80
```

**What this does:**
- Loads the target file and its dependencies
- Routes to the `test-planner` agent
- Generates test **specifications** (not test code) covering:
  - **Unit tests** — individual sort functions, priority ordering logic, component rendering
  - **Integration tests** — API call with sort params returns correctly ordered data, table re-renders on sort click
  - **Edge cases** — unknown priority values sort to bottom, empty results, rapid sort toggling

**Also generate tests for the API route:**

```bash
/GenerateTests target="src/app/api/service-requests/route.ts" types=["unit", "integration"] coverage=90
```

---

## Section 2: Debug Session

### 2.1 Start Bug Fix Session

```bash
/StartSession focus="bug"
```

This tells the session manager to load bug-related context and prioritize open bugs from Linear.

---

### 2.2 Review Bug Documentation

The bug is documented in the Session 6 PRD under **"2. Bug Fix: Add Zod Validation to API Routes"**.

**Coda reference:** [PRD: Session 6 — Bug Fix section](https://coda.io/d/_dk2U-31c43Y/PRD-Session-6_sucfiFW5)

**The problem:** The project convention requires Zod for all input validation (`zod@^4.3.6` is installed), but no API route actually uses it:

| Route | Current State | What's Wrong |
|-------|--------------|--------------|
| `POST /api/service-requests` | No validation at all | Accepts empty titles, invalid categories/priorities |
| `GET /api/service-requests` | Params read without validation | Invalid values silently return empty results |
| `POST /api/ai/triage` | Manual `if` checks | Uses `typeof` checks instead of Zod schemas |

---

### 2.3 Create Bug Ticket in Linear

Log this as a bug in Linear using `/LogNewFeature` with `type="bug"`.

```bash
/LogNewFeature title="Add Zod Validation to API Routes" type="bug" priority="medium" description="API routes accept unvalidated input despite Zod being a project dependency and a documented architecture convention. POST /api/service-requests has no field validation (accepts empty titles, invalid categories). GET /api/service-requests query params are unvalidated (invalid values silently return empty results instead of 400). POST /api/ai/triage uses manual if-checks instead of Zod schemas. All three routes need Zod schemas with structured error responses. Reference: https://coda.io/d/_dk2U-31c43Y/PRD-Session-6_sucfiFW5"
```

This creates a Linear issue with:
- A structured description (Overview, Deliverables, Definition of Done sections)
- The "bug" label applied
- A link back to the Coda PRD as context

---

### 2.4 Run Code Review

Run a targeted code review on the affected API routes before making changes.

```bash
/ReviewCode files=["src/app/api/service-requests/route.ts", "src/app/api/ai/triage/route.ts"] focus=["security", "architecture"]
```

**What to look for in the review output:**
- **Critical findings** — the missing validation should surface as a security concern
- **Architecture findings** — deviation from the Zod convention documented in CLAUDE.md
- **Specific recommendations** — the reviewer agent should suggest Zod schemas similar to the reference schemas in the PRD

After reviewing findings, fix the issues or use `/FixBug` to let Claude implement the Zod schemas.

---

## Section 3: Agent-Driven Coding

*Coming soon — will cover multi-agent orchestration for complex feature implementation.*

---

## Debrief Questions

1. What did the automated review catch that you might have missed?
2. How useful is the session summary for handoff purposes?
3. What would you add to the quality gates for your team?
4. How did `/PRDFeasibility` change your approach to the feature?
5. Was the `/LogNewFeature` workflow faster than manually creating a Linear issue?

## Expected Outcomes

- Completed a full Start > Validate > Implement > Discover > End > Resume > Test workflow
- Used `/PRDFeasibility` to validate a feature before implementation
- Logged a new feature to the backlog from a Coda PRD discovery
- Generated session documentation automatically via `/EndSession`
- Ran a bug-focused session with Coda-driven bug documentation
- Created a Linear bug ticket directly from Claude Code
- Experienced code review quality gates on API routes
