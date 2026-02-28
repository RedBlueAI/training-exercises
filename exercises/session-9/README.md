# Session 9: AI-Assisted Research & PRD Creation

## Objective
Learn to use AI tools to research a feature space and create a complete PRD from scratch — bridging the gap between a vague feature request and a validated, implementation-ready specification.

## Context
Sessions 7-8 taught you to VALIDATE and PLAN from an existing PRD. This session teaches you to CREATE the PRD itself — the upstream step that feeds everything else.

## Exercise: From Vague Request to Complete PRD

### The Scenario
Your PM drops this in Slack:

> "Customers keep asking about getting notifications when their service request status changes. Can we look into this? Maybe email or push notifications or something?"

That's it. That's all you get. Your job: turn this into a complete, validated PRD.

### Step 1: Research Phase (10 min)

Use AI to research the notification feature space:

```bash
/PRDIntake source="exercises/session-9/feature-request-brief.md"
```

**If not using Claude Code:** Open the feature request brief and use your AI tool to:
- Identify what notification systems exist in similar field service apps
- List technical approaches (email, push, SMS, in-app)
- Research user expectations for service status notifications
- Identify regulatory considerations (opt-in, unsubscribe, TCPA)

**Questions to answer:**
1. What notification channels make sense for field service customers?
2. What events should trigger notifications?
3. What are the delivery timing expectations?
4. What personalization is needed?

### Step 2: Draft the PRD (10 min)

Using your research, create a PRD. Start with the template:

```bash
# Use AI to draft the PRD based on your research
/PRDEnrich prd="notification-system" depth="deep"
```

**If not using Claude Code:** Use your AI tool to draft a PRD with these sections:
- Problem Statement
- User Stories (at least 3)
- Functional Requirements
- Non-Functional Requirements (performance, security, scalability)
- Acceptance Criteria (specific, measurable)
- Technical Considerations
- Out of Scope
- Open Questions

Save your PRD to `knowledge/prd/notification-system.md`.

### Step 3: Validate Your Own PRD (5 min)

Now validate the PRD you just created:

```bash
/PRDValidate prd="notification-system" checklist="all"
```

**If not using Claude Code:** Review your PRD against this checklist:
- [ ] Problem clearly stated with user impact?
- [ ] User stories cover all personas (customer, technician, dispatcher)?
- [ ] Acceptance criteria are specific and testable?
- [ ] Security considerations addressed (PII in notifications)?
- [ ] Performance requirements stated (delivery latency)?
- [ ] Edge cases identified (failed delivery, user opt-out)?
- [ ] Dependencies listed?
- [ ] Out of scope clearly defined?

### Step 4: Peer Review (5 min)

Swap PRDs with a partner. Use AI to review their PRD:

```bash
/PRDValidate prd="partner-notification-prd" checklist="all"
```

**If not using Claude Code:** Manually review against the same checklist. Note what they caught that you missed, and vice versa.

## Debrief Questions
1. What did AI research surface that you wouldn't have thought of?
2. Where did you override AI suggestions in the PRD?
3. How did validating your OWN PRD feel vs. validating someone else's (Sessions 7-8)?
4. What's the quality difference between an AI-drafted PRD and one written from scratch without AI?

## Expected Outcomes
✅ Created a complete PRD from a vague 2-sentence request
✅ Used AI for research, drafting, AND validation
✅ Experienced the full PRD lifecycle (request → research → draft → validate → review)
✅ Understand how AI accelerates the upstream product process
