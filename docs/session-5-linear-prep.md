# Session 5: Linear Prep Guide

> **Purpose:** Create the Linear project, labels, and issues needed so that `/StartSession` picks up Session 5 work items. Run these prompts in Claude Code sequentially.

---

## Step 1: Linear account (free)

If you do not already have a Linear workspace:

1. Sign up at [https://linear.app](https://linear.app) (free tier is sufficient).
2. Create or join a workspace and ensure you have a **team** where issues will live.
3. In your AI coding tool, connect and authenticate the **Linear MCP** (follow that product’s MCP documentation).

Skip this step if you already use Linear.

---

## Placeholders (use your own values)

Replace these tokens everywhere they appear in the prompts below and when you update `CLAUDE.md`:

| Placeholder | Meaning |
|-------------|---------|
| `{{TEAM_NAME}}` | Your Linear team name (as shown in Linear). |
| `{{PROJECT_NAME}}` | The Linear **project** name for this training (pick any clear name; use the same value in every step and in `CLAUDE.md`). |
| `{{PROJECT_DESCRIPTION}}` | Short description for the project (what this repo / curriculum is for). |

---

## Prerequisites

- Linear MCP server connected and authenticated
- You have chosen values for `{{TEAM_NAME}}`, `{{PROJECT_NAME}}`, and `{{PROJECT_DESCRIPTION}}`

**Note:** Issue **state** names (`Todo`, `In Progress`, etc.) must match your team’s workflow in Linear. If your team uses different state names, substitute the equivalent values in the API calls.

---

## Step 2: Discover Your Linear Environment

Run this prompt in Claude Code first to find your team and any existing project:

```
List my Linear teams and check if a project named "{{PROJECT_NAME}}" already exists.

Use mcp__linear__list_teams to find teams, then mcp__linear__list_projects 
to check for existing projects (match by name).

Report back the team name/key and any matching project names before creating anything.
```

---

## Step 3: Create Labels for Session 5

Run this prompt in Claude Code:

```
Create the following Linear issue labels for team "{{TEAM_NAME}}" if they 
don't already exist. Check existing labels first with mcp__linear__list_issue_labels.

Labels to create:
1. Name: "session-5"         Color: "#6B5CE7"  Description: "Session 5: Assisted Coding Fundamentals"
2. Name: "refactor"          Color: "#F59E0B"  Description: "Code refactoring task"
3. Name: "feature"           Color: "#10B981"  Description: "New feature implementation"
4. Name: "bug"               Color: "#EF4444"  Description: "Bug fix"
5. Name: "training-exercise" Color: "#8B5CF6"  Description: "AI Training curriculum exercise"

Use mcp__linear__create_issue_label for each. Skip any that already exist.
```

---

## Step 4: Create or Identify the Project

Run this prompt in Claude Code:

```
Create a Linear project for the training exercises if one doesn't already exist.

Use mcp__linear__save_project with:
- name: "{{PROJECT_NAME}}"
- description: "{{PROJECT_DESCRIPTION}}"
- addTeams: ["{{TEAM_NAME}}"]
- priority: 3 (Normal)
- state: "started"
- icon: ":wrench:"

If the project already exists, just report its name and ID so we can use it 
for the issues below.
```

---

## Step 5: Create the Session 5 Parent Issue

Run this prompt in Claude Code:

```
Create a parent issue in Linear to group all Session 5 exercises.

Use mcp__linear__save_issue with:
- title: "Session 5: Assisted Coding Fundamentals"
- team: "{{TEAM_NAME}}"
- project: "{{PROJECT_NAME}}"
- description: (use the markdown below)
- labels: ["session-5", "training-exercise"]
- priority: 2 (High)
- state: "In Progress"
- assignee: "me"

Description markdown:

## Session 5: Assisted Coding Fundamentals

**Duration:** 60 minutes | **Track:** Developer

### Objectives
- Master the three AI coding modes: Refactor, Implement, Brainstorm
- Use context-aware development with CLAUDE.md
- Apply effective prompting patterns for better AI output
- Practice the approve-verify-iterate cycle

### Exercises
1. **Refactor** — Clean up legacy service request handler
2. **Implement** — Enhance AI Triage feature with validation, caching, and batch processing
3. **Brainstorm** — Debug midnight-crossing scheduling bug

### Prerequisites
- Sessions 1-4 completed
- Claude Workflow System installed (Session 3)
- Groq API key configured

### Resources
- Lab instructions: `docs/session-5-lab-instructions.md`
- Exercise files: `exercises/session-5/`
- Slide deck: Session 5 Slides PDF

Report back the issue identifier (e.g., ABC-123) — we need it as the parent for sub-issues.
```

---

## Step 6: Create Exercise 1 Issue (Refactor)

Run this prompt in Claude Code (replace `{{PARENT_ID}}` with the ID from Step 5):

```
Create a Linear issue for Exercise 1 — the refactoring challenge.

Use mcp__linear__save_issue with:
- title: "Exercise 1: Refactor legacy service-request-handler"
- team: "{{TEAM_NAME}}"
- project: "{{PROJECT_NAME}}"
- parentId: "{{PARENT_ID}}"
- labels: ["session-5", "refactor", "training-exercise"]
- priority: 2 (High)
- estimate: 3
- assignee: "me"
- state: "Todo"
- description: (use the markdown below)

Description markdown:

## Refactor: Legacy Service Request Handler

**Target file:** `src/lib/legacy/service-request-handler.ts`
**Command:** `/RefactorCode target="src/lib/legacy/service-request-handler.ts" goal="modernize"`

### Known Issues to Address
1. `var` usage throughout — convert to `const`/`let`
2. Duplicated validation logic in `processNewRequest` and `updateRequest`
3. Callback-based error handling mixed with promises
4. No TypeScript types/interfaces (uses `any` everywhere)
5. Magic numbers: `86400000`, `3600000`, `14400000`, `259200000`
6. Hardcoded category and string literals
7. God function: `getRequestStats` with nested callback hell
8. Inconsistent error handling patterns

### Acceptance Criteria
- [ ] All `var` replaced with `const`/`let`
- [ ] TypeScript interfaces created for `ServiceRequest`, `RequestUpdate`, etc.
- [ ] Single shared `validateServiceRequest()` function
- [ ] All callbacks converted to `async/await`
- [ ] Named constants for all magic numbers
- [ ] `getRequestStats` broken into smaller functions
- [ ] Consistent error handling pattern throughout
- [ ] `/ReviewCode` passes with no Critical or High findings on refactored code

### Important
Do NOT fix the SQL injection or hardcoded API key — those are Session 10 security exercises.

Report back the issue identifier.
```

---

## Step 7: Create Exercise 2 Issue (Implement Feature)

Run this prompt in Claude Code (replace `{{PARENT_ID}}` with the ID from Step 5):

```
Create a Linear issue for Exercise 2 — implementing the AI Triage enhancements.

Use mcp__linear__save_issue with:
- title: "Exercise 2: Implement AI Triage enhancements"
- team: "{{TEAM_NAME}}"
- project: "{{PROJECT_NAME}}"
- parentId: "{{PARENT_ID}}"
- labels: ["session-5", "feature", "training-exercise"]
- priority: 2 (High)
- estimate: 5
- assignee: "me"
- state: "Todo"
- description: (use the markdown below)

Description markdown:

## Implement: Enhanced AI Triage Feature

**Command:** `/ImplementFeature feature="Enhanced AI Triage with validation, caching, confidence scoring, history, and batch processing" stack=["api", "ui"]`

### Existing Files
- `src/lib/groq.ts` — Basic Groq client with `triageServiceRequest()`
- `src/app/api/ai/triage/route.ts` — Basic POST handler
- `src/app/ai-triage/page.tsx` — Single-request UI

### Enhancements to Implement

**1. Input Validation (Zod)**
- Add Zod schema for triage request body
- Replace basic length check with schema validation
- Return structured validation errors

**2. Response Caching**
- In-memory Map with 5-minute TTL
- Cache key: normalized description string
- Avoid redundant Groq API calls for identical requests

**3. Confidence Scoring**
- Add `confidence: number` (0-1) to `TriageResult` type
- Include confidence in Groq prompt response format
- Display confidence badge in UI

**4. History Tracking**
- Store triage results in client-side state
- Display history panel in the UI
- Allow re-viewing past triage results

**5. Batch Processing**
- New endpoint: `POST /api/ai/triage/batch`
- Accepts `{ descriptions: string[] }` (max 10)
- Returns array of triage results
- Batch input mode in UI

### Acceptance Criteria
- [ ] Zod validation on triage endpoint with structured error responses
- [ ] Duplicate requests served from cache within TTL
- [ ] Confidence score visible in UI results
- [ ] History panel shows previous triage results
- [ ] Batch endpoint processes multiple requests
- [ ] `/ReviewCode` passes with no Critical findings

Report back the issue identifier.
```

---

## Step 8: Create Exercise 3 Issue (Bug Fix)

Run this prompt in Claude Code (replace `{{PARENT_ID}}` with the ID from Step 5):

```
Create a Linear issue for Exercise 3 — debugging the scheduling bug.

Use mcp__linear__save_issue with:
- title: "Exercise 3: Fix midnight-crossing scheduling bug"
- team: "{{TEAM_NAME}}"
- project: "{{PROJECT_NAME}}"
- parentId: "{{PARENT_ID}}"
- labels: ["session-5", "bug", "training-exercise"]
- priority: 2 (High)
- estimate: 2
- assignee: "me"
- state: "Todo"
- description: (use the markdown below)

Description markdown:

## Bug: Technicians incorrectly marked available during off-hours

**Target file:** `src/lib/scheduling.ts`
**Approach:** Brainstorm mode (natural conversation with AI)
**Severity:** High — causes ~10% scheduling failure rate

### Symptoms
- Technicians are sometimes scheduled for jobs outside their working hours
- Only affects time windows that cross midnight (e.g., 23:00-01:00)
- Normal daytime shifts (08:00-17:00) are not affected
- Estimated 10% of scheduling requests produce incorrect results

### Investigation Notes
- Bug is in the `isTechnicianAvailable()` function
- Related to how midnight-crossing time ranges are validated against working hours
- When `endHour < startHour`, the function incorrectly returns `true` (available)

### Acceptance Criteria
- [ ] Root cause identified and documented
- [ ] Fix handles midnight-crossing correctly
- [ ] Daytime scheduling unaffected by fix
- [ ] At least 2 alternative fix approaches considered (brainstorm)
- [ ] Chosen approach documented with rationale

Report back the issue identifier.
```

---

## Step 9: Set Up Issue Dependencies

Run this prompt in Claude Code (replace `{{EX1_ID}}`, `{{EX2_ID}}`, `{{EX3_ID}}` with the IDs from Steps 6–8):

```
Set up dependencies between the Session 5 exercise issues:

Exercise 2 is blocked by Exercise 1 (refactoring should happen before feature work).
Exercise 3 is independent (can be done in any order).

Use mcp__linear__save_issue to update:
- id: "{{EX2_ID}}", blockedBy: ["{{EX1_ID}}"]

This ensures /StartSession recommends Exercise 1 as the first task.
```

---

## Step 10: Verify Setup

Run this prompt in Claude Code:

```
Verify the Session 5 Linear setup is complete.

Use mcp__linear__list_issues with:
- project: "{{PROJECT_NAME}}"
- label: "session-5"
- assignee: "me"

Display all issues in a table showing: identifier, title, state, priority, 
labels, and any blockedBy relationships.

Confirm:
1. Parent issue exists with 3 sub-issues
2. All issues are assigned to me
3. Exercise 2 is blocked by Exercise 1
4. All issues have the session-5 label
```

---

## What /StartSession Will See

After completing the above, when a student runs `/StartSession focus="refactor"`, the session-management task will:

1. Query Linear for issues assigned to "me" in the configured project
2. Find the 3 Session 5 exercise issues
3. See that Exercise 1 has no blockers → recommend it as the first task
4. See that Exercise 2 is blocked by Exercise 1 → show it as upcoming
5. Display a session plan **similar to** the example below (issue keys and titles will match **your** workspace):

```
## Session Plan

| # | Issue | Title | State | Priority | Blocked By |
|---|-------|-------|-------|----------|------------|
| 1 | <YOUR-ISSUE-1> | Exercise 1: Refactor legacy service-request-handler | Todo | High | — |
| 2 | <YOUR-ISSUE-2> | Exercise 2: Implement AI Triage enhancements | Todo | High | <YOUR-ISSUE-1> |
| 3 | <YOUR-ISSUE-3> | Exercise 3: Fix midnight-crossing scheduling bug | Todo | High | — |

**Recommended first task:** <YOUR-ISSUE-1> — Exercise 1: Refactor legacy service-request-handler
```

`<YOUR-ISSUE-n>` stands for whatever identifiers Linear assigned (format varies by team).

---

## CLAUDE.md Integration

For `/StartSession` to query the correct Linear project, the student's `CLAUDE.md` must include the integration config. This should already be set up from Session 3, but verify it contains:

```markdown
## Integrations
| Service | Configuration |
|---------|--------------|
| Linear | Team: {{TEAM_NAME}}, Project: {{PROJECT_NAME}} |
```

If missing, students need to add this to their `CLAUDE.md` before running `/StartSession`, using the same `{{TEAM_NAME}}` and `{{PROJECT_NAME}}` values they used above.
