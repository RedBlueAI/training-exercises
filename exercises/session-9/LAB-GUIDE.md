# Session 9 Lab Guide

Step-by-step walk-through of the 60-minute facilitator flow. Use this alongside the Session 9 slides on Coda and the numbered prompt library.

## Before You Start

**Each participant should have ready:**

- Claude desktop open with web search and research tools enabled
- The Session 9 Prompts sub-page open in a browser tab (numbered prompt library)
- This repo cloned, with the `exercises/session-9/` folder open in a file viewer or editor
- A scratch document (Claude artifact, Notion page, or markdown file) to capture prompt outputs as you go

**Facilitator should have ready:**

- The Coda Session 9 Slides page visible (slides 1 to 4 for intro, slides 5 to 9 referenced during work)
- The pre-built `sample-prd-skeleton.md` open for the Drafting Chain walk-through (Block C)
- `knowledge/prd/real-time-technician-tracking.md` open for the Self-Validation hands-on (Block D)

## Intro Block (15 min)

Cover slides 1 to 4 from the Coda slides page. End on Slide 4 ("Why Session 9 Has No Commands") and transition with: "Sessions 7 and 8 have commands. We have prompts. Let's go."

No exercises in the intro block. Knowledge Checks #1 to #3 from the slides can be folded into the working block debriefs.

---

## Working Block (45 min)

### Block A — Frame the Problem (8 min, hands-on)

**Prompt:** #1 (Frame the Problem Space)

**Input:** `feature-brief-technician-tracking.md` (canonical, matches slides). Participants with a real feature can substitute their own.

**Steps:**

1. Open the feature brief. Read it once.
2. Copy Prompt #1 from the Coda Prompts sub-page.
3. Paste into Claude desktop. Replace `{one-paragraph description}` with the contents of the "The Request" section of the brief. Replace `{who asked for this, what business goal it serves, any constraints}` with the rest of the brief.
4. Send. Read the five-part response.
5. Capture the output in your scratch document.

**Debrief (1 to 2 minutes):**

- Did Prompt #1 surface solution-first thinking? In this brief, the phrasing "build real-time location tracking" is solution-first. The actual problem is dispatcher visibility and customer ETA accuracy. Prompt #1 should catch this.
- What alternative framings did it produce? Common ones: customer-facing ETA-only feature, dispatcher-facing routing optimization, technician-facing turn-by-turn nav.
- What questions should go back to the requester before scoping?

### Block B — Research (15 min, hands-on)

**Prompts:** #2 (Layered Research Query), then #3 (Cite-and-Verify Synthesis)

**Steps (Prompt #2, ~8 min):**

1. Copy Prompt #2 from the Coda Prompts sub-page.
2. Fill `{Problem area}` with a one-sentence statement from your Prompt #1 output (e.g., "Dispatchers lack real-time visibility into field technician location and ETA.")
3. Fill `{Target user role}` with the primary role (e.g., "Field service dispatcher at a small-to-mid-size HVAC or plumbing company.")
4. Send. Claude will run a layered web search.
5. Capture the three layers of findings plus the synthesis. Note any source URLs.

**Steps (Prompt #3, ~5 min):**

1. Copy Prompt #3.
2. Fill `{Topic}` with the same one-sentence statement.
3. Paste the findings from Prompt #2 into `{Findings to evaluate}`. Keep the source attribution for each.
4. Send. Claude scores credibility, flags single-source findings, and tells you which to keep and which to drop.
5. Capture the keep-list and the drop-list separately.

**Debrief (1 to 2 minutes):**

- What did Prompt #3 cut? Most participants are surprised when 2 to 4 of their findings get dropped for weak sourcing.
- What gaps did the synthesis reveal? (Usually: missing data on dispatcher workflow today, missing competitive analysis, missing regulatory/privacy constraints.)
- These gaps become open questions for the requester or further research.

### Block C — Drafting Chain (7 min, walk-through)

**Prompts:** #5 (Problem Statement), #6 (User Definition), #7 (Acceptance Criteria), #8 (Security Considerations)

**Mode:** Walk-through using the pre-built `sample-prd-skeleton.md` as an "answer key." Participants do not run these prompts live.

**Facilitator narration:**

1. Open `sample-prd-skeleton.md`. Scroll to the Problem Statement section.
2. Show that it includes: the problem in 2 to 3 sentences, quantified impact with numbers, target audience by named role, what good looks like, and what is out of scope. Each piece comes from the Block B research, not from imagination. Highlight one or two specific numbers and ask "where did this come from?" — answer: the research findings.
3. Scroll to User Definition. Show that primary role, secondary role, and explicit non-users are named. Show the accessibility callout.
4. Scroll to Acceptance Criteria. Show the GIVEN/WHEN/THEN format. Pick one criterion and ask "could two QA testers reach different verdicts on this?" — answer should be no. Show the "Explicitly NOT Required" block.
5. Scroll to Security Considerations. Show that all eight categories are addressed (authentication, authorization, data sensitivity, data handling, input validation, audit trail, threat model, incident response). Highlight that location data is PII, which triggers GDPR considerations.

**Key takeaway:** The four sections map 1:1 to Session 7's `/PRDValidate` rubric. Drafting against the rubric is how you make validation easy.

**Homework note:** Participants run Prompts #5 to #8 themselves on a real feature for homework. The walk-through showed them what good output looks like at each step.

### Block D — Self-Validate (10 min, hands-on)

**Prompt:** #9 (Self-Validation Against Session 7 Rubric)

**Input:** `knowledge/prd/real-time-technician-tracking.md` (the same incomplete PRD Session 7 validates).

**Steps:**

1. Open the PRD file. Read it once. (It is deliberately incomplete; do not read the gap list at the bottom yet.)
2. Copy Prompt #9 from the Coda Prompts sub-page.
3. Paste the full PRD content into `{paste full PRD: Problem Statement, User Definition, Acceptance Criteria, Security Considerations}`.
4. Send. Claude scores all four dimensions, lists issues per dimension, and returns a verdict.
5. Compare your output to the actual `/PRDValidate` output that Session 7 produces against the same PRD (your facilitator has this on hand).

**Debrief (2 to 3 minutes):**

- What was your initial overall score? Most participants score this PRD in the 50 to 65 range.
- Which dimension scored lowest? Security Considerations is almost always under 40 because the PRD has no security section.
- What top three fixes did Prompt #9 suggest?
- How did your score compare to the Tech Lead's `/PRDValidate` score? This is the calibration exercise.

**Why this matters:** If your self-score is 80 but the Tech Lead's score is 65, your self-check is too soft. The goal is to score within 5 points of the real rubric after 3 to 4 PRDs.

### Block E — Handoff + Homework Assignment (5 min, demo + setup)

**Prompt:** #10 (Final Pre-Handoff Review & Save)

**Demo (~2 min):**

1. Facilitator pastes the revised PRD into Prompt #10 (or shows a previous run if time-constrained).
2. Show the output: YAML frontmatter, suggested filename, structural check, and the Slack/email handoff message.
3. Save the markdown file. Show the Tech Lead-side command: `/PRDIntake file="knowledge/prd/{feature-slug}.md"`.

**Homework assignment (~3 min):**

Each participant picks one real feature they own. Before the next training session:

1. Run Prompts #1 through #10 end-to-end on that feature (including Prompt #4 if they have interview notes).
2. Save the PRD at `knowledge/prd/{feature-slug}.md` in this training repo OR in their real codebase.
3. Hand off to their Tech Lead with the Prompt #10-generated message.
4. Have the Tech Lead run `/PRDValidate` from Session 7's claude-workflow.
5. Compare their Prompt #9 self-validation score to the actual `/PRDValidate` score.
6. Be ready to share at Session 10: what surprised them in the research, where their self-score differed from the actual score, and which prompts they want to promote to Claude desktop skills.

---

## Facilitator Cheat Sheet

| What participants will get stuck on | What to say |
|---|---|
| "My initial idea wasn't solution-first" | Maybe not, but the brief still has assumptions worth testing. Prompt #1 is cheap insurance. |
| "Prompt #2 returned generic results" | Refine the `{Problem area}` and `{Target user role}`. More specific → better results. |
| "Prompt #3 dropped findings I liked" | Good. That's the discipline. If it's not in a credible source, you can't defend it in Session 7. |
| "Why aren't we doing #5 to #8 live?" | They are mechanical once research is in. We walk through them so you see the chain. You run the full chain as homework on your real feature. |
| "My Prompt #9 score is much lower than the Tech Lead's" | That's the calibration we want. Apply the fixes Prompt #9 surfaced and re-run. After 3 to 4 PRDs, your scores will track within 5 points. |
| "How long will this take on a real feature?" | First time: about 90 minutes end-to-end. By your fifth PRD: about 30. Speed comes from repetition. |

## Two Things to Avoid

1. **Do not let participants paste the entire `sample-prd-skeleton.md` as Prompt #9 input.** That is the answer key. The point of Self-Validation is to score an incomplete PRD; `real-time-technician-tracking.md` is the incomplete one.
2. **Do not run Prompts #5 to #8 hands-on in the 45-minute working block.** It will not fit. The drafting chain is a walk-through during the session and a homework exercise afterward.

## After the Session

Participants share homework results in the Session 9 Slack channel (or your team's equivalent). The calibration delta (self-score vs `/PRDValidate` score) is the most valuable data point — it tells the participant how to recalibrate their self-checking discipline.

The numbered prompts also live in `RedBlueAI/training-exercises/CLAUDE.md` references for ongoing use after training ends.
