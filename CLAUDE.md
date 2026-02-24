# Encompass Training Exercises

## Project Overview
Field service management dashboard for training AI-enhanced development workflows.
Tech stack: Next.js 14, TypeScript, Tailwind CSS, SQLite, Groq AI.

## Architecture
- `/src/app/` — Next.js App Router pages and API routes
- `/src/components/` — React components
- `/src/lib/` — Utilities, database, AI client
- `/exercises/` — Session-specific exercise instructions
- `/docs/` — Planning documents (session state, specs)
- `/knowledge/` — PRDs and architecture docs

## Development Guidelines
- Use TypeScript strict mode
- Tailwind for styling (no CSS modules)
- API routes return `{ success: boolean, data?: T, error?: string }`
- Use Zod for request validation
- All database access through lib/db.ts
- Error boundaries on all pages

## Testing
- Jest for unit tests
- React Testing Library for components
- Run: `npm test`

## Exercise Conventions
- Exercise files are in `/exercises/session-N/`
- Each exercise has a README with instructions
- Legacy/buggy code is intentional — it's exercise material!
- Don't "fix everything" before the relevant session

## AI Usage Guidelines
- Use /RefactorCode for cleanup exercises
- Use /ImplementFeature for new features
- Use /ReviewCode before committing
- Always verify AI-generated code compiles and passes tests
