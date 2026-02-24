# AI Training Exercises

## Project Overview
Field service management dashboard for training AI-enhanced development workflows.
This is the hands-on training repository for a 12-session "AI Tool Assistance System" curriculum.

**Tech stack:** Next.js 14, TypeScript, Tailwind CSS, Groq AI (llama-3.1-8b-instant)

## Repository Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── page.tsx            # Exercise hub (home page)
│   ├── dashboard/          # Dashboard view
│   ├── service-requests/   # Service request list & detail
│   ├── technicians/        # Technician directory
│   ├── ai-triage/          # AI-powered triage (Groq integration)
│   └── api/                # API endpoints
├── components/             # React components
├── lib/                    # Utilities and business logic
│   ├── groq.ts             # Groq AI client
│   ├── legacy/             # ⚠️ Legacy code for refactoring exercises
│   ├── scheduling.ts       # ⚠️ Has an intentional bug for debugging exercise
│   └── utils.ts            # Shared utilities
├── types/                  # TypeScript type definitions
└── data/                   # Seed data (JSON)

.claude/
├── commands/               # 31 workflow commands (StartSession, EndSession, etc.)
├── agents/                 # 13 AI specialist agents
└── tasks/                  # 21 automation tasks

exercises/                  # Exercise instructions per session
docs/                       # Planning documents (session state, specs)
knowledge/                  # PRDs and architecture docs
```

## Claude Workflow System
This project uses the Claude Workflow System (v2.1.1) with the `nextjs-development` variant.

### Core Commands
- `/StartSession` — Initialize a development session (loads context)
- `/EndSession` — Close session, generate docs, trigger quality gates
- `/ImplementFeature` — Guided feature implementation
- `/RefactorCode` — Structured refactoring with safety checks
- `/ReviewCode` — AI-assisted code review
- `/RunSecurityAudit` — Security vulnerability scanning
- `/PRDIntake`, `/PRDValidate`, `/PRDEnrich`, `/PRDFeasibility` — PRD workflow
- `/Breakdown`, `/CyclePlan`, `/CycleCommit` — Sprint planning

### Variant Commands (Next.js)
- `/CreateComponent` — Scaffold React components
- `/CreateAPIRoute` — Scaffold API routes

## Development Guidelines

### Code Style
- TypeScript strict mode — no `any` types (except in legacy code that needs refactoring)
- Tailwind CSS for styling — no CSS modules
- Functional React components with hooks
- Use `const` over `let`, never `var`

### API Conventions
- All API routes return `{ success: boolean, data?: T, error?: string }`
- Use Zod for request validation
- Error responses include meaningful messages but NEVER stack traces in production

### Testing
- Jest for unit tests, React Testing Library for components
- Run: `npm test`

## Exercise Conventions

⚠️ **IMPORTANT:** Some code in this repository is intentionally buggy or insecure. This is exercise material!

- `exercises/session-N/` contains instructions for each session's exercises
- `src/lib/legacy/` contains deliberately messy code for refactoring exercises
- `src/lib/scheduling.ts` has an intentional bug for debugging exercises
- API routes have deliberate security vulnerabilities for security audit exercises
- **Don't "fix everything" before the relevant session** — the issues are the exercises!

## Environment Setup

```bash
npm install
cp .env.example .env.local
# Add your Groq API key to .env.local (free at https://console.groq.com)
npm run dev
```
