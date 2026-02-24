# Code Review Scenario

## Context
A junior developer submitted this PR that adds a "search" feature to service requests. Review it using `/ReviewCode`.

## The Changes (simulated)
They modified `src/app/api/service-requests/route.ts` to add search:

```typescript
// They added this to the GET handler:
const search = searchParams.get('search');
if (search) {
  query += ` WHERE title LIKE '%${search}%'`;
}
```

## Your Review Should Check

### Functionality
- Does the search actually work?
- What happens with special characters in the search query?
- Is the search case-sensitive?

### Security
- Is this vulnerable to SQL injection? (Spoiler: yes)
- How would you fix it?

### Code Quality
- Is this consistent with the project's patterns?
- Should this use parameterized queries?
- What about input validation?

### Testing
- How would you test this?
- What edge cases should be covered?

## Practice
1. Run `/ReviewCode` and see if Claude catches the SQL injection
2. Ask Claude to suggest a secure implementation
3. Implement the fix and re-review
