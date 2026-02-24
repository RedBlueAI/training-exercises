# Exercise 2: Implement the AI Triage Feature

## The Feature
Build an AI-powered service request triage system that automatically categorizes incoming requests.

**What it does:** Takes a free-text service request description and returns:
- Category (electrical, plumbing, HVAC, structural, safety, general)
- Priority (emergency, urgent, routine, low)
- Recommended skill level (junior, mid, senior, specialist)
- Suggested customer response message

**Why it's impressive:** This would traditionally require hundreds of regex patterns, keyword matching rules, and a complex priority matrix. With an LLM, it's ~30 lines of code.

## Prerequisites
1. Sign up at https://console.groq.com (free, no credit card)
2. Create an API key
3. Add to `.env.local`: `GROQ_API_KEY=gsk_...`

## What Already Exists
- `src/lib/groq.ts` — Groq client with `triageServiceRequest()` function (already implemented)
- `src/app/ai-triage/page.tsx` — UI page (already implemented)
- `src/app/api/ai/triage/route.ts` — API endpoint (already implemented)
- `src/types/index.ts` — TriageResult type definition

## Your Task
Use `/ImplementFeature` to review and enhance the existing implementation:

```bash
/ImplementFeature feature="Enhance AI triage with input validation, error handling, and response caching" stack=["api","ui"]
```

### Enhancements to Build
1. **Input validation** — Add Zod schema validation to the API route
2. **Response caching** — Cache identical descriptions to avoid redundant API calls
3. **Confidence scoring** — Ask the AI to include a confidence score (0-100)
4. **History tracking** — Store triage results for review
5. **Batch triage** — Allow triaging multiple requests at once

### Testing
```bash
# Start the dev server
npm run dev

# Visit http://localhost:3000/ai-triage
# Try the example requests
```

## Debrief Questions
- How did the /ImplementFeature command structure the work?
- What did AI recommend for the architecture?
- Where did you override AI suggestions?
