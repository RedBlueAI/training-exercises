# Session 8: Work Breakdown & Cycle Planning

## Objective
Break down a validated PRD into work items and plan a development cycle.

## Prerequisites
Complete Session 7 exercises (PRD validated and enriched).

## Exercises

### Exercise 1: Work Breakdown (10 min)
```bash
/Breakdown prd="real-time-technician-tracking" targetSize="4-8h"
```
Review the generated work items:
- Are ticket sizes reasonable (4-8 hours)?
- Are dependencies identified correctly?
- Do acceptance criteria match the PRD?

### Exercise 2: Cycle Planning (10 min)
```bash
/CyclePlan duration="2w" team="Alice,Bob,Carol" capacity="80%" goal="Ship technician tracking MVP"
```
Review the cycle plan:
- Does scope match team capacity?
- Are critical path items identified?
- What got cut from the cycle?

### Exercise 3: Scope Adjustment (5 min)
Simulate a scope discussion:
- What if Bob is out for 3 days?
- What if we need to add a security review milestone?
- How does the plan adapt?

### Exercise 4: Cycle Commitment (3 min)
```bash
/CycleCommit cycle="training-exercise"
```
Review what gets created in Linear (or simulated).

## Debrief Questions
1. How does AI-assisted breakdown compare to manual estimation?
2. Is the capacity calculation realistic?
3. What would you change about the cycle plan for your team?
