# Exercise 1: Refactor the Legacy Service Request Handler

## Target File
`src/lib/legacy/service-request-handler.ts`

## The Problem
This file handles service request processing. It works, but it's a mess. Your job is to refactor it into clean, modern TypeScript.

## Known Issues (find them all!)
1. **Duplicated validation logic** — Validation for title, description, location, category, and priority is repeated in both `processNewRequest` and `updateRequest`
2. **Inconsistent error handling** — `processNewRequest` uses callbacks, `updateRequest` mixes promises and throws, `getRequestStats` uses callback hell
3. **Mixed async patterns** — Callbacks, Promises, and async/await all in the same file
4. **No TypeScript types** — Uses `any` for everything
5. **Magic numbers** — `86400000`, `900000 + 100000`, etc.
6. **Hardcoded strings** — Valid categories and priorities repeated as inline arrays
7. **God function** — `getRequestStats` does way too many things with deeply nested callbacks
8. **`var` usage** — Should be `const` or `let`

## Your Task

### Step 1: Analyze (5 min)
Read the file. Identify all issues. Choose a refactoring goal.

### Step 2: Plan (5 min)
```bash
/RefactorCode target="src/lib/legacy/service-request-handler.ts" goal="consolidate"
```
Review the AI's refactoring plan and risk assessment. Approve or modify.

### Step 3: Execute (5 min)
Let the refactoring proceed. Then verify:
- Does it compile? (`npm run build`)
- Are types properly defined?
- Is validation centralized?
- Is the callback hell eliminated?
- Are magic numbers extracted to constants?

## Refactoring Goals to Try
- `simplify` — Just reduce complexity and improve readability
- `consolidate` — Merge the duplicated validation logic
- `modernize` — Convert everything to async/await with proper TypeScript

### Step 4: Review (3 min)
```bash
/ReviewCode files=["src/lib/legacy/service-request-handler.ts"] focus=["architecture","security"]
```
- What issues does the review catch post-refactor?
- Are there any remaining problems?

## Debrief Questions
- What did AI identify that you missed?
- Where did you need to guide or correct the AI?
- How did CLAUDE.md context influence the refactoring approach?
