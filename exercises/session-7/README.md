# Session 7: PRD Validation & Technical Feasibility

## Objective
Practice the PRD validation workflow using a sample PRD for this project.

## Sample PRD
The file `../../knowledge/prd/real-time-technician-tracking.md` contains a deliberately incomplete PRD for a "Real-Time Technician Tracking" feature.

## Exercises

### Exercise 1: PRD Intake (3 min)
```bash
/PRDIntake source="knowledge/prd/real-time-technician-tracking.md"
```
Observe how the command imports and parses the PRD.

### Exercise 2: PRD Validation (10 min)
```bash
/PRDValidate prd="real-time-technician-tracking" checklist="all"
```
Review the validation score and findings:
- What sections are complete?
- What's missing or vague?
- What score did it receive?

**Expected gaps to find:**
- Missing security considerations
- Vague acceptance criteria
- No performance requirements
- Unclear edge cases
- Missing data privacy section

### Exercise 3: PRD Enrichment (5 min)
```bash
/PRDEnrich prd="real-time-technician-tracking" depth="standard"
```
AI analyzes the codebase and adds technical context:
- What technology recommendations did it make?
- How did it assess the current architecture?
- What integration points did it identify?

### Exercise 4: Technical Feasibility (5 min)
```bash
/PRDFeasibility prd="real-time-technician-tracking" team="2 BE, 1 FE"
```
Review the feasibility assessment:
- Complexity estimate
- Risk factors
- Timeline recommendations
- Resource requirements

## Debrief Questions
1. How accurate was the validation scoring?
2. Did enrichment identify things you wouldn't have thought of?
3. Would you trust the feasibility estimate for sprint planning?
