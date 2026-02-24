# Implementation Map

## Application Architecture

```
┌─────────────────────────────────────────┐
│              Next.js App                 │
│                                          │
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │  Pages    │  │ API      │  │ Static ││
│  │  (SSR)    │  │ Routes   │  │ Assets ││
│  └────┬─────┘  └────┬─────┘  └────────┘│
│       │              │                   │
│  ┌────┴──────────────┴─────┐            │
│  │     Components          │            │
│  │  (React + TypeScript)   │            │
│  └────────────┬────────────┘            │
│               │                          │
│  ┌────────────┴────────────┐            │
│  │     Library Layer       │            │
│  │  ┌─────┐ ┌────┐ ┌────┐│            │
│  │  │Groq │ │ DB │ │Util││            │
│  │  └─────┘ └────┘ └────┘│            │
│  └─────────────────────────┘            │
└─────────────────────────────────────────┘
         │                    │
         ▼                    ▼
┌─────────────┐      ┌──────────────┐
│  Groq API   │      │   SQLite     │
│  (LLM)      │      │  (Local DB)  │
└─────────────┘      └──────────────┘
```

## Key Directories

| Directory | Purpose | Owner |
|-----------|---------|-------|
| `src/app/` | Pages and API routes | Full team |
| `src/components/` | Reusable React components | Frontend |
| `src/lib/` | Business logic and utilities | Backend |
| `src/lib/legacy/` | Legacy code (exercise material) | Session 5 |
| `src/types/` | TypeScript type definitions | Full team |
| `exercises/` | Training exercise instructions | Read-only |
| `knowledge/` | PRDs and architecture docs | Planning |
| `docs/` | Session state and specs | Auto-generated |

## Data Flow

1. **Service Requests:** JSON seed data → API routes → React pages
2. **AI Triage:** User input → API route → Groq API → Triage result → UI
3. **Technician Data:** JSON seed data → API routes → React pages
