# Session 11: Measuring Impact & ROI

## Objective
Quantify the real impact of AI-enhanced development workflows on your team's productivity, quality, and satisfaction.

## Exercise 1: Before/After Time Trial (15 min)

### The Task
You'll perform the SAME task twice — once without AI, once with AI — and measure the difference.

**Task: Add a "Priority Badge" component to the service request list page**

Requirements:
- Display a colored badge next to each service request showing its priority
- Emergency = red, Urgent = orange, Routine = blue, Low = gray
- Badge should show the priority text inside
- Add to `src/app/service-requests/page.tsx`

### Round 1: No AI (7 min)
- Close your AI assistant
- Write the component manually
- Track: time to complete, lines written, bugs encountered, times you looked up docs

### Round 2: With AI (5 min)
- Open your AI assistant
- Use `/ImplementFeature` or equivalent
- Track: time to complete, lines written, review needed, understanding level (1-5)

```bash
/ImplementFeature feature="Add priority badge component to service request list" stack=["ui"]
```

**If not using Claude Code:** Use your AI tool to implement the same feature. Track the same metrics.

### Round 3: Measure (3 min)
Fill out the ROI worksheet (`exercises/session-11/roi-worksheet.md`):
- Time saved (minutes)
- Quality delta (bugs found in review)
- Understanding score (can you explain every line?)
- Satisfaction score (which was more enjoyable?)

## Exercise 2: Team ROI Projection (10 min)

Using the worksheet, project your team's annual ROI:

1. **Time savings per developer per day** — extrapolate from your time trial
2. **Quality improvement** — fewer bugs in review, fewer production incidents
3. **Ramp-up acceleration** — how much faster do new team members become productive?
4. **Process automation** — hours saved on status reporting, documentation, sprint planning

### Formula
```
Annual ROI = (Hours Saved × Hourly Cost) + (Bug Reduction × Cost Per Bug) + (Faster Onboarding × New Hire Cost)
```

### Benchmarks (from industry data)
- Average AI-assisted time savings: 30-55% on routine coding tasks
- Code review time reduction: 20-40%
- Documentation automation: 60-80% time savings
- Bug detection improvement: 15-30% more bugs caught pre-production

## Debrief Questions
1. Was the time savings what you expected? More? Less?
2. Did you trust the AI output more or less than your manual work?
3. What tasks show the HIGHEST ROI for AI assistance on your team?
4. What tasks show NEGATIVE ROI (AI makes it slower or worse)?
5. How would you present this data to leadership?

## Expected Outcomes
✅ Concrete before/after measurements from a real task
✅ Personal ROI projection for your daily work
✅ Team-level ROI estimate for leadership presentations
✅ Understanding of where AI helps most vs. where it doesn't
