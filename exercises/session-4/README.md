# Session 4: Session Start — Context-Aware Development

## Objective
Master the /StartSession workflow with different focus modes and optimize your daily development patterns.

## Exercises

### Exercise 1: Baseline Session (3 min)
```bash
time claude StartSession
```
- How long does startup take?
- What context is loaded?
- What does the session plan recommend?

### Exercise 2: Focus Mode Comparison (5 min)
Try different focus modes and observe how recommendations change:

```bash
claude StartSession focus="feature"
# → Note: What does AI recommend?

claude StartSession focus="bug"
# → Note: How do recommendations change?

claude StartSession focus="maintenance"
# → Note: What does maintenance focus surface?
```

### Exercise 3: MCP Configuration Tuning (5 min)
- Open `.claude/settings.json`
- Add repository/team filters to reduce noise
- Set `maxItems` to limit context
- Re-run StartSession and time the improvement

### Exercise 4: Context Switching (4 min)
If you have multiple projects:
```bash
cd ~/project-1
claude StartSession
# → Observe project-1 context

cd ~/this-project
claude StartSession
# → Observe this project's context — should be different!
```

### Exercise 5: Inspect Generated Files (3 min)
After a StartSession, examine:
- `docs/planning/session-state.json` — Session metadata
- `docs/planning/session-plan-*.md` — Today's work plan
- `docs/planning/CURRENT-STATE.md` — Project status

## Discussion Questions
1. What context from StartSession is most useful for your daily work?
2. What information is missing that you wish was included?
3. Which focus mode matches your typical development day?

## Expected Outcomes
✅ Understand how StartSession loads context
✅ Experience different focus modes
✅ Optimized MCP configuration for faster startup
✅ Comfortable with context switching between projects
