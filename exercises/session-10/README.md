# Session 10: Security, Quality & Governance

## Objective
Hunt for deliberately planted security vulnerabilities in this codebase.

## The Challenge
This application has **7 known security vulnerabilities** hidden throughout the code. Your job is to find them all using AI-assisted security auditing and manual review.

## Exercise: Vulnerability Hunt

### Step 1: Full Security Audit (5 min)
```bash
/RunSecurityAudit scope="full" createIssues=true
```
Document what the automated audit finds.

### Step 2: Manual Review (10 min)
The automated audit might not catch everything. Manually review:
- `src/app/api/` — All API routes
- `src/app/service-requests/[id]/page.tsx` — Detail page rendering
- `src/lib/legacy/service-request-handler.ts` — Legacy code
- `src/app/api/ai/triage/route.ts` — AI endpoint

### Step 3: Document Findings
For each vulnerability found, document:
1. **Location** — File and line number
2. **Type** — SQL injection, XSS, auth bypass, etc.
3. **Severity** — Critical, High, Medium, Low
4. **Impact** — What an attacker could do
5. **Fix** — How to remediate

## Vulnerability Checklist

Find all 7:

- [ ] **SQL Injection** — User input concatenated into queries
- [ ] **XSS (Cross-Site Scripting)** — Unsanitized HTML rendering
- [ ] **Missing Authentication** — API routes with no auth checks
- [ ] **Hardcoded Secrets** — API keys in source code
- [ ] **Sensitive Data Exposure** — Database credentials, stack traces
- [ ] **Missing Rate Limiting** — Endpoints vulnerable to abuse
- [ ] **Verbose Error Messages** — Stack traces exposed to clients

## Hints (use only if stuck)
See `vulnerability-hunt.md` for detailed hints.

## Debrief Questions
1. What did the automated audit catch vs. miss?
2. Which vulnerability types are hardest to detect automatically?
3. How would you integrate these checks into your CI/CD pipeline?
4. What governance policies would prevent these issues?
