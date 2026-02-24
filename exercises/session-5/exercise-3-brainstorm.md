# Exercise 3: Brainstorm — Debug the Scheduling Bug

## The Problem
The technician scheduling module (`src/lib/scheduling.ts`) has an intermittent bug.

**Symptoms:**
- Works correctly in single-threaded tests
- Fails approximately 10% of the time in production
- Technicians are sometimes marked "available" when they should be off-duty
- The bug is more frequent for technicians in timezones far from the server

## Your Task
Use **Brainstorm Mode** (natural conversation with Claude) to identify and fix the bug.

### Step 1: Read the Code (3 min)
Open `src/lib/scheduling.ts` and read through the `isTechnicianAvailable()` function.

### Step 2: Brainstorm with Claude (5 min)
Start a conversation. Here are good prompts to try:

❌ **Too vague:** "Fix the bug in scheduling.ts"

✅ **Good:** "The `isTechnicianAvailable()` function in `src/lib/scheduling.ts` fails intermittently — about 10% of the time, technicians are marked available when they should be off-duty. The issue seems related to timezone handling. Can you walk through what happens when a request spans midnight in the technician's local timezone?"

✅ **Even better:** "Show me 3 different scenarios where `isTechnicianAvailable()` could return the wrong result, with specific timezone and time values."

### Step 3: Identify the Root Cause
The bug is in the midnight-crossing logic. Think about:
- What happens when `endHour < startHour`?
- What does the code ACTUALLY do vs. what it SHOULD do?
- How does the `convertToTimezone` function interact with the hour comparison?

### Step 4: Fix and Verify (4 min)
Implement the fix. Consider:
- Should times that cross midnight be split into two checks?
- Should the working hours check handle day boundaries differently?
- What about DST transitions?

## Hints (don't peek until you've tried!)

<details>
<summary>Hint 1: Where to look</summary>
Focus on the `if (endHour < startHour)` block inside `isTechnicianAvailable()`.
</details>

<details>
<summary>Hint 2: The actual bug</summary>
When `endHour < startHour` (midnight crossing), the code returns `true` — meaning "available." But if working hours are 8-17 and the request is 23:00-01:00, the technician should be OFF DUTY, not available.
</details>

<details>
<summary>Hint 3: The fix concept</summary>
The midnight crossing check should return `false` (off duty) when BOTH the start time and end time fall outside working hours. The current code assumes midnight crossing always means the technician is working a night shift.
</details>

## Debrief Questions
- Did brainstorming with AI help you find the bug faster?
- What prompting techniques worked best for debugging?
- How would you prevent this type of bug in the future?
