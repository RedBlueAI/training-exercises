# Session 6: Session End & Quality Gates

## Objective
Practice the complete session workflow — make changes, review, audit, and properly close the session.

## Exercise: Complete Session Workflow

### Step 1: Start a Session (2 min)
```bash
claude StartSession focus="feature"
```

### Step 2: Make a Code Change (5 min)
Pick one of these small tasks:
- Add a "last updated" timestamp display to the service request detail page
- Add a search/filter bar to the service requests list page
- Create a new API endpoint for technician availability

### Step 3: Commit Your Changes (2 min)
```bash
git add .
git commit -m "feat: [describe your change]"
```

### Step 4: Run Code Review (3 min)
```bash
/ReviewCode files=["src/app/service-requests/page.tsx"] focus=["architecture","security"]
```
Review the findings. Fix any critical or high issues.

### Step 5: Run Security Audit (3 min)
```bash
/RunSecurityAudit scope="changed"
```
Document any findings — you'll compare these with Session 10's full audit.

### Step 6: End Session (3 min)
```bash
/EndSession message="Completed [your change]. Ready for review." codeReview=true
```
Review the generated files:
- `docs/planning/session-summary-*.md` — Session summary
- `docs/planning/CURRENT-STATE.md` — Updated project state
- `docs/planning/session-state.json` — Session metadata

## Debrief Questions
1. What did the automated review catch that you might have missed?
2. How useful is the session summary for handoff purposes?
3. What would you add to the quality gates for your team?

## Expected Outcomes
✅ Completed a full Start → Code → Review → Audit → End workflow
✅ Generated session documentation automatically
✅ Experienced quality gates in practice
✅ Understand the value of structured session closure
