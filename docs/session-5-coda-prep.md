# Session 5: Coda Prep Guide

> **Purpose:** Create the Coda pages needed so that `/StartSession` can load PRD context and session documentation for Session 5. Run these prompts in Claude Code sequentially.

---

## Step 1: Coda account (free)

If you do not already have Coda:

1. Sign up at [https://coda.io](https://coda.io) (free tier is sufficient).
2. Create a **document** you will use for this training curriculum (empty or with a title you recognize). The Coda MCP cannot create new documents—only pages inside an existing document—so the document must exist first.
3. In your AI coding tool, connect and authenticate the **Coda MCP** (follow that product’s MCP documentation).

Skip this step if you already use Coda and have a document for this repo.

---

## Placeholders (use your own values)

Replace these tokens everywhere they appear in the prompts below and when you update `CLAUDE.md`:

| Placeholder | Meaning |
|-------------|---------|
| `{{DOC_ID}}` | Your Coda **document** ID (from the doc URL or from listing documents via MCP). |
| `{{PARENT_PAGE_ID}}` | The **page** ID returned after you create the Session 5 overview page (Step 4). |
| `{{CODA_DOC_SEARCH_QUERY_1}}` | First search string to find your document (e.g. part of the doc title). |
| `{{CODA_DOC_SEARCH_QUERY_2}}` | Second search string if the first returns nothing (optional alternate). |
| `{{PRD_PAGE_TITLE}}` | Exact **title** for the PRD context page in Coda (use the same string in Step 8 verification and in `CLAUDE.md`). |

---

## Prerequisites

- Coda MCP server connected and authenticated
- A Coda document exists for this training (create one at coda.io if needed)
- You have chosen values for the placeholders above

---

## Step 2: Discover Your Coda Environment

Run this prompt in Claude Code first to find your document:

```
List my Coda documents and check if a document matching my training setup exists.

Use mcp__coda__coda_list_documents with query "{{CODA_DOC_SEARCH_QUERY_1}}" first.
If nothing useful is found, try query "{{CODA_DOC_SEARCH_QUERY_2}}".

Report back the document name and ID. If no matching document exists, 
create one manually in Coda (coda.io), then re-run this prompt.
```

> **Note:** Coda MCP cannot create new documents — only pages within existing documents. If no document exists, create one manually at coda.io first, then re-run the discovery prompt.

---

## Step 3: Check Existing Pages

Run this prompt in Claude Code:

```
List all pages in my Coda document "{{DOC_ID}}" to see what already exists.

Use mcp__coda__coda_list_pages with docId: "{{DOC_ID}}".

Report the page names and IDs. I need to know if any Session 5 content 
already exists before creating new pages.
```

---

## Step 4: Create the Session 5 Overview Page

Run this prompt in Claude Code:

```
Create a page in Coda for the Session 5 overview.

Use mcp__coda__coda_create_page with:
- docId: "{{DOC_ID}}"
- name: "Session 5: Assisted Coding Fundamentals"
- content: (use the markdown below)

Page content:

# Session 5: Assisted Coding Fundamentals

**Date:** [Insert session date]
**Duration:** 60 minutes
**Track:** Developer
**Instructor:** [Insert name]

## Session Objectives

By the end of this session, participants will be able to:
1. Apply the three AI coding modes (Refactor, Implement, Brainstorm) to real code
2. Use `/RefactorCode` to systematically improve legacy code with safety checks
3. Use `/ImplementFeature` to build new functionality with specification-first workflow
4. Apply structured brainstorming to debug complex issues
5. Use `/ReviewCode` to verify AI-generated changes before committing

## The Three Modes

| Mode | Command | When to Use |
|------|---------|-------------|
| Refactor | `/RefactorCode` | Improving existing code — readability, patterns, modernization |
| Implement | `/ImplementFeature` | Building new features — architecture guidance, step-by-step delivery |
| Brainstorm | Natural conversation | Debugging, exploring trade-offs, creative problem-solving |

## Exercises Overview

### Exercise 1: Refactor Challenge (20 min)
- **Target:** `src/lib/legacy/service-request-handler.ts`
- **Goal:** Modernize legacy code with 8 known issues
- **Key skill:** Approve-verify-iterate cycle with AI

### Exercise 2: Implement Feature (20 min)
- **Target:** AI Triage feature enhancement
- **Goal:** Add validation, caching, confidence scoring, history, batch processing
- **Key skill:** Specification-first development with approval checkpoints

### Exercise 3: Brainstorm Debug (15 min)
- **Target:** `src/lib/scheduling.ts` midnight-crossing bug
- **Goal:** Find and fix a subtle timezone bug using structured AI conversation
- **Key skill:** Effective prompting — context, specificity, open-ended questions

## Key Concepts

### Context-Aware Development
`CLAUDE.md` transforms generic AI into YOUR coding partner. It contains project patterns, conventions, and architecture decisions that guide every AI interaction.

### The Approval Checkpoint
AI proposes a plan → You review → You approve or push back → AI executes. You are always in control.

### When AI Gets It Wrong
- **Hallucination** — invents APIs that don't exist
- **Context confusion** — mixes patterns from different projects
- **Over-engineering** — adds unnecessary complexity
- **Recovery:** Push back, ask for alternatives, request explanations, iterate

## Resources
- Lab instructions: `docs/session-5-lab-instructions.md`
- Exercise files: `exercises/session-5/`
- Code readiness: `docs/session-5-code-readiness-and-outcomes.md`

Report back the page ID — we need it as the parent for sub-pages.
```

---

## Step 5: Create the Exercise 1 Detail Page

Run this prompt in Claude Code (replace `{{PARENT_PAGE_ID}}` with the ID from Step 4):

```
Create a sub-page in Coda for Exercise 1 details.

Use mcp__coda__coda_create_page with:
- docId: "{{DOC_ID}}"
- name: "Exercise 1: Refactor Legacy Code"
- parentPageId: "{{PARENT_PAGE_ID}}"
- content: (use the markdown below)

Page content:

# Exercise 1: Refactor Legacy Service Request Handler

## Overview
- **Duration:** 20 minutes
- **File:** `src/lib/legacy/service-request-handler.ts`
- **Command:** `/RefactorCode target="src/lib/legacy/service-request-handler.ts" goal="modernize"`
- **Linear Issue:** [Link to Exercise 1 issue]

## The Legacy Code

This file contains 296 lines of intentionally problematic code simulating a real-world legacy module. It processes service requests for a field service management system.

### 8 Issues to Fix

| # | Issue | Example | Risk |
|---|-------|---------|------|
| 1 | `var` instead of `const`/`let` | `var VALID_CATEGORIES = [...]` | Low |
| 2 | Duplicated validation | Same checks in `processNewRequest` and `updateRequest` | Medium |
| 3 | Mixed async patterns | Callbacks alongside promises and throws | High |
| 4 | No TypeScript types | `any` used for all parameters and returns | Medium |
| 5 | Magic numbers | `86400000` (ms in a day), `3600000` (ms in hour) | Low |
| 6 | Hardcoded strings | Category list, email subjects, emergency prefix | Low |
| 7 | God function | `getRequestStats` — 60 lines, 5 nesting levels | High |
| 8 | Inconsistent errors | Some callback, some throw, some promise reject | Medium |

### Step-by-Step Walkthrough

1. **Read the code manually** (2-3 min) — identify top 3 issues yourself
2. **Run** `/RefactorCode` with `goal="modernize"` 
3. **Review the AI's plan** at the approval checkpoint
4. **Push back** if the plan misses duplicated validation or callback conversion
5. **Execute** the approved refactoring
6. **Verify** with `/ReviewCode files=["src/lib/legacy/service-request-handler.ts"] focus=["architecture", "security"]`

### Expected Result
- TypeScript interfaces for all data types
- Shared validation function replacing duplicated blocks
- All async/await, no callbacks
- Named constants for magic numbers
- Broken-up god function
- Consistent error handling

### Do NOT Fix
- SQL injection in `searchRequests` (Session 10)
- Hardcoded `INTERNAL_API_KEY` (Session 10)
- Missing auth on admin endpoint (Session 10)

Report back the page ID.
```

---

## Step 6: Create the Exercise 2 Detail Page

Run this prompt in Claude Code:

```
Create a sub-page in Coda for Exercise 2 details.

Use mcp__coda__coda_create_page with:
- docId: "{{DOC_ID}}"
- name: "Exercise 2: Implement AI Triage"
- parentPageId: "{{PARENT_PAGE_ID}}"
- content: (use the markdown below)

Page content:

# Exercise 2: Implement AI Triage Enhancements

## Overview
- **Duration:** 20 minutes
- **Command:** `/ImplementFeature feature="Enhanced AI Triage with validation, caching, confidence scoring, history, and batch processing" stack=["api", "ui"]`
- **Linear Issue:** [Link to Exercise 2 issue]

## Current State

| File | What Exists |
|------|-------------|
| `src/lib/groq.ts` | Basic `triageServiceRequest()` — calls Groq Llama 3.1, returns parsed JSON |
| `src/app/api/ai/triage/route.ts` | POST handler with basic length check, no Zod |
| `src/app/ai-triage/page.tsx` | Single-request form, basic result display |

## 5 Enhancements to Build

### 1. Zod Input Validation
Replace the basic `typeof` and length checks with a Zod schema. Return structured validation errors matching project conventions.

### 2. Response Caching
Add an in-memory cache (Map with TTL) to avoid redundant Groq API calls. Key on normalized description string. 5-minute TTL.

### 3. Confidence Scoring  
Add `confidence: number` (0 to 1) to the `TriageResult` type. Update the Groq prompt to include confidence in its response. Display as a badge/bar in the UI.

### 4. History Tracking
Store past triage results in React state. Show a history panel listing previous results. Allow clicking to re-view.

### 5. Batch Processing
New API endpoint accepting array of descriptions. Process up to 10 at once. Add batch input mode to the UI.

## Approval Checkpoints
1. **After specification** — review the spec before any code is written
2. **Before new files** — approve new API routes and components

## Prerequisites
- Groq API key in `.env.local` (get free key at console.groq.com)
- `npm install` completed (zod already in package.json)

Report back the page ID.
```

---

## Step 7: Create the Exercise 3 Detail Page

Run this prompt in Claude Code:

```
Create a sub-page in Coda for Exercise 3 details.

Use mcp__coda__coda_create_page with:
- docId: "{{DOC_ID}}"
- name: "Exercise 3: Debug Scheduling Bug"
- parentPageId: "{{PARENT_PAGE_ID}}"
- content: (use the markdown below)

Page content:

# Exercise 3: Debug Midnight-Crossing Scheduling Bug

## Overview
- **Duration:** 15 minutes
- **Approach:** Brainstorm mode (natural conversation, no workflow command)
- **File:** `src/lib/scheduling.ts`
- **Linear Issue:** [Link to Exercise 3 issue]

## The Problem

Technicians are sometimes incorrectly marked as "available" when they should be off-duty. This causes approximately 10% of scheduling requests to produce incorrect results.

### Symptoms
- Only affects time windows that cross midnight (e.g., requests for 23:00-01:00)
- Daytime shifts (08:00-17:00) work correctly
- The `isTechnicianAvailable()` function returns `true` when it should return `false`

## Brainstorm Approach

This exercise uses **natural conversation** instead of a workflow command. The goal is to practice the prompting framework:

1. **Context** — What system, what function, what file
2. **Goal** — Find and fix the bug
3. **Constraints** — Don't break daytime scheduling
4. **Format** — Step-by-step reasoning, multiple fix options

### Starter Prompt
```
I'm investigating a bug in our technician scheduling system 
(src/lib/scheduling.ts). The isTechnicianAvailable() function 
has a ~10% failure rate where technicians are incorrectly 
marked as available when they should be off-duty.

Symptoms: Only happens with midnight-crossing time windows. 
Can you analyze the logic and walk me through where it fails?
```

### Follow-Up Prompt
```
Show me 3 different ways to fix this, with trade-offs for 
readability, edge cases, and testability.
```

## What You Should Discover
- The bug is in how `endHour < startHour` is handled
- The function returns `true` (available) when it should return `false` (off-duty)
- Multiple valid fix approaches exist — the conversation should surface at least 2-3

## Learning Objective
Practice the "rubber duck that talks back" approach. Structure helps even in freeform conversation.

Report back the page ID.
```

---

## Step 8: Create the PRD Context Page

This page provides the product context that `/StartSession` loads via the `context-loader` task:

Run this prompt in Claude Code:

```
Create a page in Coda with the PRD context for this training app.

Use mcp__coda__coda_create_page with:
- docId: "{{DOC_ID}}"
- name: "{{PRD_PAGE_TITLE}}"
- content: (use the markdown below)

Page content:

# Field Service Dashboard — Product Requirements

## Product Overview
A web-based field service management platform that enables dispatchers to manage service requests, track technician availability, and leverage AI for automatic request triage and classification.

## Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 3.4
- **Database:** SQLite (better-sqlite3) for local development
- **AI:** Groq SDK with Llama 3.1-8b-instant
- **Validation:** Zod

## Core Features

### 1. Service Request Management
- Create, view, and update service requests
- Categories: plumbing, electrical, HVAC, general, emergency
- Priority levels: low, medium, high, critical
- Status tracking through lifecycle

### 2. Technician Directory
- Skill-based technician profiles
- Availability tracking with working hours
- Assignment management

### 3. AI-Powered Triage (Session 5 Focus)
- Automatic categorization of incoming requests
- Priority and skill-level recommendation
- AI-generated reasoning and customer response suggestions
- **Planned enhancements:** Zod validation, caching, confidence scoring, history, batch processing

### 4. Dashboard & Analytics
- KPI overview: open requests, technician utilization
- Status breakdowns and trends

## Architecture Conventions
- Functional React components with TypeScript
- Zod for all input validation (never joi or manual checks)
- API errors return `{ success: false, error: ErrorCode }` format
- Database queries use explicit select
- File structure: `/lib/` for business logic, `/components/` for UI, `/app/api/` for routes

## Current Known Issues
- Legacy service request handler needs modernization (Session 5, Exercise 1)
- Scheduling bug with midnight-crossing time windows (Session 5, Exercise 3)
- Security vulnerabilities planted for Session 10 exercises (DO NOT FIX in Session 5)

Report back the page ID.
```

---

## Step 9: Verify Setup

Run this prompt in Claude Code:

```
Verify the Session 5 Coda setup is complete.

Use mcp__coda__coda_list_pages with docId: "{{DOC_ID}}".

List all pages and confirm:
1. "Session 5: Assisted Coding Fundamentals" parent page exists
2. Three exercise sub-pages exist under it
3. A page titled "{{PRD_PAGE_TITLE}}" exists

Then use mcp__coda__coda_peek_page to preview the Session 5 parent page 
and confirm content looks correct.
```

---

## What /StartSession Will See

After completing the above, when `/StartSession` runs, the `context-loader` task will:

1. Query Coda for the configured document and page
2. Load the PRD context from the page whose title matches `{{PRD_PAGE_TITLE}}` in your `CLAUDE.md`
3. Use it to inform the session plan alongside Linear issues

The session summary will include project context from Coda alongside the active issues from Linear, giving the AI awareness of the training app’s product context, conventions, and Session 5 exercises.

---

## CLAUDE.md Integration

For `/StartSession` to query the correct Coda document, the student's `CLAUDE.md` must include:

```markdown
## Integrations
| Service | Configuration |
|---------|--------------|
| Coda | Document: {{DOC_ID}}, Page: {{PRD_PAGE_TITLE}} |
```

This should already be configured from Session 3. If missing, students need to add it before running `/StartSession`, using the same `{{DOC_ID}}` and `{{PRD_PAGE_TITLE}}` values they used above.
