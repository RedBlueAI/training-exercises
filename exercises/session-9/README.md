# Session 9: AI-Assisted Research & PRD Creation

**Duration:** 60 minutes (15 min intro + 45 min hands-on)
**Audience:** Product Owners, Product Managers
**Prerequisites:** Sessions 7 and 8 attended (you have seen the consumer side of the PRD pipeline). Claude desktop with research tools and MCP connectors enabled.

## Objective

Produce a complete, self-validated PRD from a vague stakeholder request using a numbered prompt library. The PRD you produce here is the same artifact Session 7 validates and Session 8 plans.

This session has no commands. The claude-workflow command set assumes the PRD already exists. Producing the PRD is conversational synthesis work, and the scaffolding for that is well-crafted prompts.

## Pipeline Context

```
Session 9 (today)        →   Session 7              →   Session 8
PO produces PRD              TL validates PRD           TL/SM/PM plans cycle
↓                             ↓                          ↓
knowledge/prd/{slug}.md      PROCEED/DEFER/REJECT       committed Linear cycle
```

Same artifact threads through all three sessions. Quality at handoff depends on the discipline applied in Session 9.

## The Prompts

Ten numbered prompts, copy-paste-ready, live on the Coda Session 9 Prompts sub-page. Each prompt has a placeholder block you fill in with your context, and produces output that feeds the next prompt in the chain.

| # | Name | Live in 60-min | Coverage |
|---|---|---|---|
| 1 | Frame the Problem Space | **Yes** | Strip solution-first framing |
| 2 | Layered Research Query | **Yes** | Three-layer source-cited research |
| 3 | Cite-and-Verify Synthesis | **Yes** | Separate signal from noise |
| 4 | Stakeholder Interview Synthesis | Homework (if notes exist) | Pattern extraction from interviews |
| 5 | Draft Problem Statement | Walk-through | Rubric Dimension 1 |
| 6 | Draft User Definition | Walk-through | Rubric Dimension 2 |
| 7 | Draft Acceptance Criteria | Walk-through | Rubric Dimension 3 |
| 8 | Draft Security Considerations | Walk-through | Rubric Dimension 4 |
| 9 | Self-Validation Against Session 7 Rubric | **Yes** | Catch your own gaps |
| 10 | Final Pre-Handoff Review & Save | Demo | Frontmatter, filename, handoff message |

## 60-Minute Session Flow

### Intro (15 min) — Slides 1 to 4 only

| Slide | Min | What |
|---|---|---|
| 1. Welcome & Agenda | 2 | Module 3 context, pipeline |
| 2. One Pipeline, Three Sessions | 4 | The artifact thread |
| 3. PO Problem We're Solving | 4 | Tech Lead quotes, AI-Enhanced workflow |
| 4. Why Session 9 Has No Commands | 5 | Transition into working block |

### Working Block (45 min)

| Block | Min | Prompts | Mode | Slide |
|---|---|---|---|---|
| A. Frame | 8 | #1 | Hands-on | 5 |
| B. Research | 15 | #2, #3 | Hands-on | 6 |
| C. Drafting chain | 7 | #5, #6, #7, #8 | Walk-through using `sample-prd-skeleton.md` answer keys | 7 |
| D. Self-Validate | 10 | #9 | Hands-on against `knowledge/prd/real-time-technician-tracking.md` | 8 |
| E. Handoff + homework | 5 | #10 | Demo + assign | 9 |

See `LAB-GUIDE.md` for the detailed step-by-step walk-through used during the session.

## The Canonical Example: Real-time Technician Tracking

The example threaded through Sessions 7, 8, and 9 is **Real-time Technician Tracking** in the field service domain.

- **Session 9 input:** `feature-brief-technician-tracking.md` (the vague stakeholder request)
- **Session 9 output (for Self-Validation Exercise):** `knowledge/prd/real-time-technician-tracking.md` (Session 7's existing PRD, deliberately incomplete)
- **Session 7 input:** the same `knowledge/prd/real-time-technician-tracking.md`
- **Session 8 input:** the same PRD after `/PRDEnrich` and `/PRDFeasibility`

Alternative brief: `feature-request-brief.md` (Service Status Notifications, the original Session 9 example) for participants who want a second scenario.

## Homework

Pick a real feature you own, run the full Prompts #1 to #10 chain, save the resulting PRD at `knowledge/prd/{feature-slug}.md` in your real codebase or in this training repo, and hand it off to your Tech Lead. Have them run `/PRDValidate`. Compare your Prompt #9 self-validation score to the Tech Lead's actual score. Bring the calibration delta to Session 10.

The homework is the work that does not fit a 60-minute container. The session teaches the disciplines; the homework builds the muscle.

## Files in This Folder

| File | Purpose |
|---|---|
| `README.md` | This file. Overview and 60-min flow. |
| `LAB-GUIDE.md` | Detailed facilitator and participant walk-through. |
| `feature-brief-technician-tracking.md` | The canonical stakeholder request (matches the slides example). |
| `feature-request-brief.md` | Alternative stakeholder request (Service Status Notifications, the original Session 9 example). |
| `sample-prd-skeleton.md` | Pre-built "answer key" outputs of Prompts #5 to #8 against the technician tracking brief, used for the Drafting Chain walk-through. |

The PRD used in Exercise 4 (Self-Validation) lives at the repo root in `knowledge/prd/real-time-technician-tracking.md`. It is the same incomplete PRD Session 7 validates.
