# Session 7: PRD Validation & Technical Feasibility

**Duration:** 60 minutes
**Audience:** Tech Leads, Senior Engineers, Product Owners
**Prerequisites:** Sessions 3-6 complete. Workflow plugin installed and `/StartSession` works in this repo.

## Objective

Run the full AI-enhanced PRD pipeline on a real (deliberately incomplete) PRD: import, validate, enrich, assess feasibility, and produce a defensible PROCEED, DEFER, or REJECT recommendation.

The exercises below match the slide deck one to one. Each slide that says "Exercise NX" maps to a section here.

## The Sample PRD

The PRD for this session is `knowledge/prd/real-time-technician-tracking.md`. It is intentionally incomplete: missing security considerations, vague acceptance criteria, no performance requirements, no privacy section, no edge-case handling.

Do not pre-read the gap list at the bottom of the PRD before running validation. Discovering them via `/PRDValidate` is the point.

The same PRD carries into Session 8's breakdown and cycle planning, so leave it in `enriched` or `feasibility-assessed` state when you finish.

---

## Setup (1 min)

Run before starting any exercises:

```
/StartSession focus="planning"
```

If `/StartSession` fails, stop and ask the instructor for help. Do not continue.

---

# Concept 1: PRD Intake

## Exercise 1A: Local file intake (5 min)

**What you're doing:** Importing the sample PRD into the workflow system. This creates a Linear Initiative, normalizes the markdown, and stores a tracking copy under `docs/planning/prds/`.

**Run:**
```
/PRDIntake file="knowledge/prd/real-time-technician-tracking.md"
```

**What to look for:**
- A new Linear Initiative was created (or you got a clear note that Linear MCP is not configured).
- The PRD now has frontmatter showing `status: imported` and an `initiative` ID.
- A copy was written to `docs/planning/prds/real-time-technician-tracking.md`.

**Reflection:**
1. What did the command do that you'd otherwise do manually?
2. Open the imported PRD. What does the new frontmatter look like?
3. If Linear isn't configured for your project, what fallback did the command take?

## Exercise 1B: Link to existing Initiative (optional, 3 min)

**Skip if:** you don't have a real Linear Initiative ID handy. Otherwise, this shows the practical case where the PO has already created an Initiative and engineering is attaching the PRD to it.

**Run:**
```
/PRDIntake file="knowledge/prd/real-time-technician-tracking.md" initiative="INI-42"
```

Replace `INI-42` with a real Initiative ID from your team.

**Reflection:**
- When would your team use this in practice vs. letting the workflow create the Initiative?
- What happens if the Initiative ID doesn't exist?

---

# Concept 2: PRD Validation

## Exercise 2A: Full validation (5 min)

**What you're doing:** Running the full validation checklist and reading the report carefully. The validator scores four dimensions and generates targeted questions for the PO.

**Run:**
```
/PRDValidate prd="real-time-technician-tracking" checklist="all"
```

**What to look for:**
- Overall completeness score (0-100)
- Per-dimension scores: Problem Statement, User Definition, Acceptance Criteria, Security Considerations
- A list of generated questions for the PO
- A list of identified gaps

**Discussion questions:**
1. What was the overall score?
2. Which dimension scored lowest? Why?
3. List three of the questions the validator generated. Are they questions you would actually ask the PO?
4. Did it flag anything you would have missed in a manual review?

**Expected gaps the validator should surface** (do not look until after you run the command):
- Security: location data is PII, no threat model, no consent flow specified.
- Acceptance criteria: every feature is described in prose without testable conditions.
- Performance: no update frequency, concurrent user count, or latency target.
- Privacy: no data retention policy, no opt-out mechanism, no compliance review.
- Edge cases: no handling for offline devices, dead batteries, technician declining tracking.

If the validator missed any of those, that is itself useful feedback. Note which ones.

## Exercise 2B: Focused validation, compare (3 min)

**What you're doing:** Running validation on a single dimension to see how the focused output differs.

**Run:**
```
/PRDValidate prd="real-time-technician-tracking" checklist="implementability"
```

**Reflection:**
- How does the focused output differ from the `all` run?
- When would you use a focused run in practice? (Hint: mid-PRD-drafting iteration.)

---

# Concept 3: PRD Enrichment

## Exercise 3A: Standard enrichment (5 min)

**What you're doing:** Letting the `technical-analyst` agent scan the actual codebase and add technical context to the PRD.

**Run:**
```
/PRDEnrich prd="real-time-technician-tracking" depth="standard"
```

**What to look for:**
- **Technical Notes** — patterns this codebase already has that are reusable
- **Risk Flags** — HIGH / MEDIUM / LOW with specific code references
- **Dependency Map** — internal services, external APIs, infrastructure
- **Complexity Estimate** — T-shirt size with rationale and uncertainty rating

**Discussion questions:**
1. What did enrichment surface about this codebase that you didn't know going in?
2. Are any of the risks actually mitigated by code that already exists?
3. Did it flag a dependency you hadn't considered (e.g., infrastructure, auth, an existing service)?

## Exercise 3B: Deep enrichment, compare (optional, 5 min)

**What you're doing:** Running deep enrichment for comparison. Deep adds cross-service impact analysis and performance modeling, so it's slower but more thorough.

**Run:**
```
/PRDEnrich prd="real-time-technician-tracking" depth="deep"
```

**Reflection:**
- What did `deep` surface that `standard` didn't?
- For what kind of initiative would `deep` be worth the extra time?

---

# Concept 4: Technical Feasibility

## Exercise 4A: Initial feasibility (5 min)

**What you're doing:** Generating the feasibility report with a concrete team and timeline. We'll use the same team makeup that Session 8 uses, so the output flows into next session's cycle planning.

**Run:**
```
/PRDFeasibility prd="real-time-technician-tracking" team="2 BE, 1 FE" timeline="2 weeks"
```

**What to look for:**
- Resource requirement in person-days, broken down by role
- RED / AMBER / GREEN risk ratings
- Prerequisites list (infrastructure, access, knowledge gaps)
- Recommendation: PROCEED, DEFER, or REJECT
- Conditions attached to the recommendation

**Discussion questions:**
1. What is the resource requirement, by role?
2. What did the report rate as RED?
3. What prerequisites does it list?
4. What is the recommendation?
5. What conditions are attached?

## Exercise 4B: Try a different team composition (3 min)

**What you're doing:** Re-running feasibility with a different team to see how the recommendation shifts.

**Run:**
```
/PRDFeasibility prd="real-time-technician-tracking" team="1 BE, 1 FE, 1 QA" timeline="2 weeks"
```

**Reflection:**
- How did the recommendation change?
- What does this tell you about how to negotiate scope with stakeholders?
- Which team composition would you actually pitch for this work?

---

# Concept 5: Make the Call

## Exercise 5A: Write the recommendation (3 min)

**What you're doing:** Synthesizing everything you've gathered into a 3-5 sentence stakeholder response. This is the deliverable of the planning workflow.

You are the Tech Lead. You have the validation report, the enrichment report, and the feasibility recommendation. The PM is asking: do we ship this in the next cycle?

**Write a 3-5 sentence response covering:**
1. Your recommendation (PROCEED, DEFER, or REJECT).
2. The top 1-2 conditions or risks the team should know.
3. What needs to happen before this can move to Session 8's breakdown.

**Sharing:** Bring your write-up to the group debrief. We'll read 2-3 in the room.

This is the moment the workflow stops being a tool and becomes a decision. The commands gave you data. Your judgment turned it into a recommendation.

---

# Concept 6: Multi-Initiative Sequencing (optional)

## Exercise 6A: Sequence multiple initiatives (5 min, advanced)

**Skip if:** your project only has one PRD in `docs/planning/prds/`. This exercise needs at least two PRDs that have both been through `/PRDFeasibility`.

**What you're doing:** Letting the workflow recommend an implementation order for multiple initiatives.

**Run** (if you have multiple PRDs):
```
/PRDSequence initiatives="real-time-technician-tracking, field-service-dashboard" weights="balanced"
```

Then try the four weighting strategies:
- `weights="risk"` — de-risk early, easy wins first
- `weights="value"` — highest business impact first
- `weights="dependencies"` — topological order, unblock the dependency tree
- `weights="balanced"` — equal weighting (default)

**Reflection:**
- How did the recommended order shift across the four strategies?
- Which strategy matches your team's actual prioritization style?
- What kinds of initiatives would you NOT trust the algorithm with? Why?

---

## Group Debrief Questions

Bring your answers to the group discussion:

1. How accurate was the validation scoring vs. how you'd have rated this PRD manually?
2. Did enrichment surface things you wouldn't have thought of? Specifically, what?
3. Would you trust the feasibility estimate enough to commit scope to a stakeholder? Why or why not?
4. What threshold score would you set as a team policy for "PRD ready to enter breakdown"? 80%? 85%?
5. Where in your team's actual process today would these commands plug in? Sprint planning? Backlog grooming? PRD review?

---

## Hand-off to Session 8

Session 8 (Work Breakdown & Cycle Planning) picks up exactly where this leaves off. The same PRD is broken down into work items, sized at 4-8 hours each, and planned into a capacity-aware 2-week cycle. The feasibility report you produced in Exercise 4A is the input to `/Breakdown`.

Make sure the PRD is in `status: enriched` (or `feasibility-assessed`) before you finish. `/Breakdown` checks the PRD's status before running and will ask you to complete enrichment first if it's not there.

---

## A Note on Linear/Coda Sync

What gets pushed back automatically vs. what stays local:

| Step | Linear write-back | Coda write-back |
| --- | --- | --- |
| `/PRDIntake` | Yes (creates Initiative) | Reads only |
| `/PRDValidate` | No (local report only) | No |
| `/PRDEnrich` | No (local report only) | No |
| `/PRDFeasibility` | No (local report only) | No |
| `/Breakdown` (Session 8) | Yes (creates Work Items) | No |
| `/CycleCommit` (Session 8) | Yes (creates Cycle) | No |

**What this means for you:** the validation, enrichment, and feasibility reports live in `docs/planning/prds/` only. They don't auto-push to Linear or Coda. If your team needs visibility outside the repo, link the local reports in your PR description or paste them into the Initiative comments manually.

A roadmap item is to make this round-trip automatic (push scores back to Linear, append summaries to a Coda sibling page). For now, plan for the manual step.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `/PRDIntake` fails with "Linear MCP not configured" | Linear integration not set up | Run `/SetupProjectMeta` and configure Linear, or proceed with Linear creation skipped. |
| `/PRDValidate` says PRD not found | Slug mismatch | Check `docs/planning/prds/` for the actual filename written by Intake; pass that exact slug. |
| `/PRDEnrich` says PRD must be `validated` | Validation step not run | Run `/PRDValidate` first. Each command checks the PRD's status field before running and will ask you to complete the prerequisite. |
| `/PRDFeasibility` says PRD must be `enriched` | Enrichment step not run | Run `/PRDEnrich` first. The feasibility report leans on the enrichment output, so running out of order produces a degraded result. |
| `/PRDSequence` says missing feasibility data | One of the initiatives hasn't been through `/PRDFeasibility` | Run feasibility on each initiative first. |

If you hit something not in this table, capture the error and bring it to the next session. That's signal worth feeding back into the workflow.
