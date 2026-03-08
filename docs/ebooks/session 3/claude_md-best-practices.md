# 📘 CLAUDE.md Master Guide

### Best Practices for Creating a CLAUDE.md File

**AI-Enhanced Development Training Program** · **RedBlue AI Consulting** · March 2026

---

## 📑 Table of Contents

| # | Section | Key Question It Answers |
|---|---------|------------------------|
| 1 | [What is CLAUDE.md](#1--what-is-claudemd-and-why-it-matters) | Why does this file exist? |
| 2 | [Anatomy of an Effective CLAUDE.md](#2--anatomy-of-an-effective-claudemd) | What sections should it contain? |
| 3 | [Writing Each Section](#3--writing-each-section--detailed-guidance) | How do I write each part well? |
| 4 | [Formatting Best Practices](#4--formatting-best-practices) | How should I structure the file? |
| 5 | [What NOT to Put in CLAUDE.md](#5--what-not-to-put-in-claudemd) | What mistakes should I avoid? |
| 6 | [The Evolution Cycle](#6--the-evolution-cycle) | How does it stay current? |
| 7 | [Starter Template](#7--starter-template) | Can I just copy-paste something? |
| 8 | [Quality Checklist](#8--quality-checklist) | How do I know it's ready? |
| 9 | [Common Mistakes](#9--common-mistakes-and-how-to-fix-them) | What goes wrong most often? |
| 10 | [Key Principles](#10--key-principles-to-remember) | What are the guiding ideas? |

---

## 1 · What is CLAUDE.md and Why It Matters

### 🧬 The Core Concept

**CLAUDE.md is the single source of truth for how Claude Code interacts with your project.**

It is a Markdown file placed at the root of your repository that Claude reads automatically at the start of every session. Think of it as onboarding documentation that your AI pair programmer reads every single time it helps you code.

> 📖 **Official Documentation**
> [How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory) — Anthropic's guide to CLAUDE.md, auto memory, and the `/memory` command.

In the AI-Enhanced SDLC, **context preservation is the superpower** that separates workflow-driven development from vibe coding. CLAUDE.md is the mechanism that makes context preservation possible:

| Without CLAUDE.md | With CLAUDE.md |
|---|---|
| ❌ Every Claude session starts from zero | ✅ Claude arrives knowing your full project context |
| ❌ Generic code that doesn't match your patterns | ✅ Code that follows your conventions automatically |
| ❌ No awareness of architectural decisions | ✅ Respects your tech stack, schema, and rules |
| ❌ "Vibe coding" — paste and pray | ✅ Workflow-driven development with structure |

### 🔑 Key Behaviors to Understand

| Behavior | What It Means for You |
|----------|----------------------|
| **Auto-loaded every session** | Claude reads CLAUDE.md at startup — no action required from you |
| **Survives compaction** | After `/compact`, Claude re-reads CLAUDE.md from disk and re-injects it fresh |
| **Multiple file locations** | Project root, `.claude/CLAUDE.md`, `~/.claude/CLAUDE.md` for user-global rules |
| **Works with auto memory** | Claude also saves its own learnings automatically — CLAUDE.md is for *your* deliberate instructions |
| **Team-shareable via git** | Commit it to your repo so everyone gets the same AI context |

> 📖 **Official Documentation**
> [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview) — Full introduction to Claude Code surfaces, installation, and capabilities.

---

## 2 · Anatomy of an Effective CLAUDE.md

### 📐 The Eight Essential Sections

An effective CLAUDE.md has a specific structure. **Order matters** — Claude processes the file top-to-bottom, giving earlier sections more weight in its context window.

| # | Section | Purpose | Priority |
|:-:|---------|---------|:--------:|
| 1 | **Project Overview** | Orient Claude to what this project is and what matters now | 🔴 Critical |
| 2 | **Tech Stack** | Ensure code targets the right versions and libraries | 🔴 Critical |
| 3 | **Development Commands** | Let Claude run, build, test, and lint correctly | 🔴 Critical |
| 4 | **Architecture** | Map the codebase structure, schemas, and key patterns | 🔴 Critical |
| 5 | **Code Style Guidelines** | Shape every line of code Claude generates | 🟡 Important |
| 6 | **Critical Rules & Guardrails** | Prevent costly mistakes from production incidents | 🟡 Important |
| 7 | **MCP & Integrations** | Connect Claude to external tools with resilience rules | 🟢 Recommended |
| 8 | **Resources & References** | Point to deeper docs for on-demand context loading | 🟢 Recommended |

> 💡 **Start Minimal, Evolve Continuously**
> A generated CLAUDE.md works fine for your first session. Customize it over time as you discover your team's patterns. Start with the basics, evolve as you learn.

---

## 3 · Writing Each Section — Detailed Guidance

---

### 3.1 📋 Project Overview

This is the **first thing Claude reads**. It should orient the AI in two to three sentences, followed by a **Current Focus** line that tells Claude what matters right now.

#### Template

```markdown
# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

[Project Name] — [one-line description of what it does and who uses it].

**Current Focus**: [what the team is actively working on right now].
```

#### Why Current Focus Matters

Claude uses this to **prioritize**. If you say the current focus is a migration to a new auth system, Claude will be more careful around auth-related code and will default to the new patterns rather than legacy ones.

**Update this line at least weekly.**

> ⚠️ **Common Mistake**
> Writing a long project history in the overview. Keep it to 2–3 sentences. Claude doesn't need your project's biography — it needs a snapshot of what matters today.

---

### 3.2 🛠️ Tech Stack

List every major technology **with its version number**. Claude uses this to generate code that matches your actual dependencies, not generic examples from training data.

#### Template

```markdown
## Tech Stack

- **Runtime**: Node.js 20+ (or Bun 1.3+)
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4+
- **Database**: Supabase (PostgreSQL)
- **Testing**: Jest / Bun test runner
- **Hosting**: Vercel
```

#### Why Versions Matter

| Without Version | With Version |
|----------------|-------------|
| Claude may use `getServerSideProps` (Pages Router) | Claude uses `generateMetadata` (App Router) |
| Claude imports from `@next/font` (deprecated) | Claude uses `next/font` (current) |
| Claude uses `jest.fn()` in a Bun project | Claude uses `mock()` from Bun test |
| Claude generates React class components | Claude uses functional components with hooks (React 18+) |

Without version numbers, Claude may generate code using **deprecated APIs**. Specifying the version eliminates an entire class of errors.

---

### 3.3 ⌨️ Development Commands

Provide the **exact commands** to install, run, build, test, and lint. Include any environment-specific notes such as WSL2 workarounds or Docker requirements.

#### Template

```markdown
## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run test         # Run all tests
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```
```

#### What Makes Commands Effective

| ✅ Good Practice | ❌ Bad Practice |
|-----------------|----------------|
| Include inline comments explaining each command | List commands with no context |
| Note environment quirks (WSL2, Docker, etc.) | Assume all devs are on the same OS |
| Provide alternative commands for multiple runtimes | Only list one package manager |
| Include test subcommands (unit, integration, e2e) | Only list `npm test` with no granularity |

> 💡 **Multi-Runtime Teams**
> If your team uses both npm and Bun (or yarn), list both sets of commands with a clear label so Claude uses the right package manager for your project.

---

### 3.4 🏗️ Architecture

This section is the **backbone of context-aware code generation**. It tells Claude where things live, how components are organized, and what patterns to follow when creating new files.

#### What to Include

| Sub-Section | What to Document | Example |
|-------------|-----------------|---------|
| **Directory Structure** | Key directories with purpose annotations | `app/` → Pages, `components/ui/` → Atomic primitives |
| **Component Organization** | Philosophy and file grouping | Atomic design, feature-based, etc. |
| **Database Schema** | Schema names, table counts, ownership | `apps_crm` → 36 tables for contacts/companies |
| **Authentication** | Auth library and user table location | NextAuth.js with `next_auth.users(id)` |
| **Key Decisions** | Architectural choices with rationale | Server Components by default for perf + SEO |

#### Using Annotated Directory Trees

```markdown
### Directory Structure

app/                            → Pages (routing, page state)
components/sections/            → Full-width page sections (business logic)
components/ui/                  → Atomic primitives (forwardRef pattern)
components/layout/              → Header, Footer, navigation
lib/                            → Shared utilities, constants, API helpers
knowledge/                      → Long-lived reference documentation
```

#### 🔲 Using ASCII Box Diagrams for Critical Rules

For rules that Claude **must never violate**, ASCII box diagrams create a visual interrupt that Claude is less likely to skip during context processing:

```
┌─────────────────────────────────────────────────────────────┐
│  RULE TITLE — READ THIS FIRST                                │
├─────────────────────────────────────────────────────────────┤
│  ✅ DO this always                                           │
│  ❌ NEVER do that                                           │
│                                                              │
│  WHY: [incident or technical reason]                         │
└─────────────────────────────────────────────────────────────┘
```

**Use these boxes sparingly** — only for rules where violations have caused real production incidents. A good ratio is approximately **5–7 boxes per 400–500 lines**. Overusing them dilutes their impact.

---

### 3.5 🎨 Code Style Guidelines

Tell Claude **how your team writes code**. This section directly influences every line of generated output.

#### What to Include

| Aspect | What to Document | Example |
|--------|-----------------|---------|
| **Component patterns** | How components are structured | `forwardRef` with `cn()` utility |
| **Styling approach** | CSS strategy and conventions | Tailwind classes, mobile-first responsive |
| **File naming** | Naming rules per file type | PascalCase components, camelCase utilities |
| **TypeScript patterns** | Type preferences and strictness | `type` over `interface`, discriminated unions |
| **Import ordering** | How imports are organized | External → internal → types → styles |

#### The Impact of Code Style Rules — Before & After

| Without CLAUDE.md (Generic AI) | With CLAUDE.md (Context-Aware AI) |
|-------------------------------|----------------------------------|
| `if (!email \|\| !email.includes('@'))` | `const input = UserInputSchema.parse({ email })` |
| `throw new Error('Invalid email')` | `return { success: false, error: ErrorCode.VALIDATION_FAILED }` |
| Uses ad-hoc validation | Uses Zod (per CLAUDE.md pattern) |
| Throws generic errors | Returns typed error codes (per CLAUDE.md convention) |

> *The 10 minutes you spend maintaining CLAUDE.md saves hours of fixing inconsistent code.*

> 📖 **Official Documentation**
> [Prompting best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices) — Anthropic's guide to writing clear, effective instructions for Claude, including guidance on specificity and avoiding over-engineering.

---

### 3.6 🛡️ Critical Rules & Guardrails

This is the section that **prevents costly mistakes**. Document every hard-won lesson from production incidents, common pitfalls, and things Claude tends to get wrong.

#### Categories of Critical Rules

| Category | Example Rules |
|----------|-------------|
| 🗄️ **Database** | Which schema to use, deprecated tables, FK references, migration strategy |
| 🕐 **Date/Time** | Timezone-aware patterns, forbidden conversions, UTC handling |
| ⚡ **Performance** | Singleton clients, import patterns, retry wrappers, caching rules |
| 🔒 **Security** | Middleware separation, API route protection, auth session handling |
| 🚀 **Deployment** | Build cache behavior, environment variables, hosting-specific quirks |
| 🧪 **Testing** | Required coverage, test patterns, mock strategy |

#### The Incident-Driven Rule Pattern

The most effective critical rules **cite the real incident** that motivated them:

```
┌─────────────────────────────────────────────────────────────┐
│  DATE/TIME RULES — CHECK THESE FOR EVERY DATE/TIME FEATURE   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ❌ NEVER use date.toISOString().split('T')[0]              │
│     → Converts to UTC first, rolls back the date!           │
│                                                              │
│  ✅ ALWAYS use local date components for date strings:      │
│     `${d.getFullYear()}-${String(d.getMonth()+1)...}`       │
│                                                              │
│  Production incident: Client in UTC+2 saw "No available     │
│  times" because toISOString() sent Feb 24 instead of Feb 25 │
└─────────────────────────────────────────────────────────────┘
```

Including the incident gives Claude additional context about **why** the rule exists, making it less likely to rationalize an exception.

> ⚠️ **Anti-Pattern: Rules Without Reasons**
> Writing `NEVER use toISOString()` without explaining why gives Claude no context for edge cases. **Always include the why or the incident that created the rule.**

---

### 3.7 🔌 MCP & Integrations

If your project uses [MCP (Model Context Protocol)](https://docs.anthropic.com/en/docs/claude-code/mcp) servers to connect Claude to external tools, document the project IDs and resilience rules.

> 📖 **Official Documentation**
> [Connect Claude Code to tools via MCP](https://docs.anthropic.com/en/docs/claude-code/mcp) — How to configure MCP servers (HTTP, SSE, stdio), authentication, and scope levels.

#### What to Include

| Item | Why It Matters |
|------|---------------|
| Which MCP servers are configured | Claude knows what tools are available |
| Project IDs and filter parameters | Claude queries the right project, not a random one |
| Resilience rules | Claude doesn't hang when a tool goes offline |
| Scope boundaries | Claude knows which projects belong to this repo vs. others |

#### Template: MCP Section

```markdown
## MCP & Integrations

### Active MCP Servers
- **GitHub**: Code context, PRs, recent commits
- **Linear**: Ticket tracking, sprint context (Project: "Your Project Name")
- **Coda**: Documentation (Doc ID: XXXXXXXXXX)

### MCP Resilience - CRITICAL
- **NEVER wait or retry** if an MCP tool call hangs, times out, or is rejected.
- If an MCP is unresponsive, **skip it and continue work** using local context.
- After 1 failed MCP call, assume that MCP is unhealthy for the rest of the session.
- Inform the user briefly and continue.

### Scope Boundaries
- `ProjectA` — THIS codebase (use for all MCP queries)
- `ProjectB` — Separate repo (do NOT query from this codebase)
```

---

### 3.8 📚 Resources & References

Point Claude to deeper documentation so it can load additional context on demand when working on specific features.

#### Two Patterns

**Pattern A — Feature Guide Table:**

```markdown
## Feature Guides (loaded on demand)

| Feature | Guide |
|---------|-------|
| Auth System | `knowledge/architecture/auth-guide.md` |
| API Design | `knowledge/architecture/api-patterns.md` |
| Deployment | `knowledge/architecture/deploy-guide.md` |
| Troubleshooting | `knowledge/troubleshooting.md` |
```

**Pattern B — Knowledge Directory Pointer:**

```markdown
## Resources

**Local Documentation:**
- `/knowledge/` — Standards, guidelines, long-lived references
- `/knowledge/architecture/` — Implementation patterns and guides
- `/knowledge/prd/` — All Product Requirement Documents
- `/docs/planning/` — Session state, plans, summaries

**External References:**
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
```

Claude can then load the relevant guide on demand when working on that feature, keeping your CLAUDE.md lean.

---

## 4 · Formatting Best Practices

How you format CLAUDE.md **directly affects how well Claude processes it**. These formatting practices are distilled from real-world production use.

| Practice | Why It Works |
|----------|-------------|
| **Use `##` headers for major sections** | Claude processes Markdown headers as section delimiters with strong semantic weight |
| **Use `###` for subsections** | Provides hierarchy without going so deep that attention drops off |
| **Don't go deeper than `####`** | Claude's attention diminishes on deeply nested headers |
| **Use fenced code blocks for commands/patterns** | Signals to Claude that content is literal, not to be paraphrased |
| **Use tables for reference mappings** | Most scannable format for lookups (schema → table, feature → guide) |
| **Use ASCII box diagrams only for inviolable rules** | Creates a visual interrupt — overuse dilutes the signal |
| **Keep total length under 500 lines** | Longer files consume context tokens needed for actual coding |

### 📏 The 500-Line Ceiling

CLAUDE.md is loaded into every session context. A file that is too long consumes tokens that could be used for actual coding context. If your file exceeds 500 lines, extract detailed guides into separate files in a `knowledge/` directory and reference them from CLAUDE.md.

> 📖 **Official Documentation**
> From Anthropic's memory docs: *"Files over 200 lines consume more context and may reduce adherence."* Keep your CLAUDE.md focused and delegate depth to linked files.
>
> Source: [How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory)

### 📂 The Delegation Pattern

When a section needs more depth than CLAUDE.md should carry, use this format:

```markdown
📚 **Full guide:** `knowledge/architecture/funnel-guide.md`
```

This tells Claude that deeper documentation exists and it should load it when working on that feature.

---

## 5 · What NOT to Put in CLAUDE.md

Knowing what to **exclude** is as important as knowing what to include.

### 🚫 The Five Never-Include Rules

| # | Never Include | Why | Where It Belongs Instead |
|:-:|--------------|-----|-------------------------|
| 1 | **Secrets or API keys** | CLAUDE.md is committed to git — visible to all with repo access | MCP config (`.claude/mcp-settings.json`) or environment variables |
| 2 | **Sprint-specific tasks** | CLAUDE.md should contain durable info valid across sprints | Project management tool (Linear, Jira) loaded via MCP |
| 3 | **Full file contents** | Bloats context and creates maintenance burden when files change | Relative path references — let Claude read files on demand |
| 4 | **Personal preferences** | CLAUDE.md is a team document — individual prefs cause inconsistency | Personal config files or `~/.claude/CLAUDE.md` for user-global rules |
| 5 | **Overly detailed guides** | Exceeds the 500-line ceiling and wastes context tokens | `knowledge/` directory files referenced from CLAUDE.md |

> 📖 **Official Documentation**
> Claude Code supports **user-level CLAUDE.md** at `~/.claude/CLAUDE.md` for personal rules that apply across all projects.
>
> Source: [How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory)

---

## 6 · The Evolution Cycle

CLAUDE.md is a **living document**. It should evolve continuously based on real development experience.

### 🔄 When to Update

| Trigger | What to Update | Frequency |
|---------|---------------|-----------|
| **End of a coding session** reveals a new pattern or pitfall | Add a new code style rule or critical guardrail | After notable sessions |
| **Production incident** exposes a gap | Add an incident-driven critical rule with the ASCII box pattern | As incidents occur |
| **New library, tool, or convention** adopted | Update tech stack, add development commands | As adopted |
| **Sprint retrospective** identifies AI friction | Review and refine rules, remove stale entries | Every sprint |
| **New team member** hits onboarding friction | Clarify patterns that assumed tribal knowledge | As discovered |

### 🔁 The Session-Driven Update Pattern

When you end a structured coding session, review what you learned and propose CLAUDE.md updates:

```markdown
### CLAUDE.md Updates
- Added pattern: Always validate file uploads server-side
- Updated error format: Include correlation IDs for debugging
- Removed: Deprecated reference to apps_calendars schema
```

**Review these proposals critically** — not every session produces a pattern worth codifying. Only add rules that:

- Apply broadly across the project (not a one-time edge case)
- Will remain valid over time (not a temporary workaround)
- Are specific enough for Claude to act on ("Use 2-space indentation" > "format code nicely")

### 👥 Team Review of CLAUDE.md Changes

Treat CLAUDE.md changes like code changes — they go through **pull requests and peer review**. A poorly written rule can cause Claude to generate incorrect code across the entire team.

| Practice | Why It Matters |
|----------|---------------|
| CLAUDE.md changes go through PRs | Prevents one person from introducing a bad rule |
| Peer review of new rules | Catches ambiguous or overly broad instructions |
| Changelog comment on each PR | Creates a record of why rules were added or changed |
| Periodic team audit (quarterly) | Removes stale rules that no longer apply |

---

## 7 · Starter Template

Copy this to the root of your repository as `CLAUDE.md` and customize each section for your project.

```markdown
# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

[Project Name] — [one-sentence description].

**Current Focus**: [what matters this week/sprint].

## Tech Stack

- **Runtime**: [Node.js 20+ / Bun 1.x / Python 3.12+]
- **Framework**: [Next.js 15 / Django 5 / FastAPI]
- **Language**: [TypeScript 5.x / Python 3.12]
- **Styling**: [Tailwind CSS / CSS Modules / styled-components]
- **Database**: [PostgreSQL / Supabase / MongoDB]
- **Testing**: [Jest / Pytest / Bun test]
- **Hosting**: [Vercel / AWS / Railway]

## Development Commands

```bash
[package-manager] install          # Install dependencies
[package-manager] run dev          # Start dev server
[package-manager] run build        # Build for production
[package-manager] run test         # Run all tests
[package-manager] run lint         # Run linter
```

## Architecture

### Directory Structure

[annotated tree of key directories with purpose]

### Database

[schema approach, migration strategy, key tables]

### Authentication

[auth library, user table location, session strategy]

## Code Style Guidelines

### Component Patterns

[how components are structured in this project]

### Naming Conventions

[files, variables, branches, commits]

### TypeScript Patterns

[type vs interface, strict mode, utility types used]

## Critical Rules

[ASCII box diagrams for inviolable rules ONLY]
[Include the incident or reason for each rule]

## MCP & Integrations

[MCP servers, project IDs, filter parameters, resilience rules]

## AI Usage Guidelines

- When to use AI vs manual coding
- Security boundaries (what not to share with AI)
- Team conventions for AI-generated code review

## Resources

[links to knowledge/ docs, external references, Coda/Notion]
```

> 📖 **Official Documentation**
> [Set up Claude Code](https://docs.anthropic.com/en/docs/claude-code/setup) — Installation, prerequisites, and initial project configuration.

---

## 8 · Quality Checklist

Use this checklist to evaluate any CLAUDE.md before committing it to your repository.

| ✅ | Checkpoint |
|:--:|-----------|
| ⬜ | File is at the **repository root** and named exactly `CLAUDE.md` |
| ⬜ | **Project Overview** section exists with a `Current Focus` line |
| ⬜ | **Tech Stack** lists every major dependency with **version numbers** |
| ⬜ | **Development Commands** are copy-paste ready and tested |
| ⬜ | **Architecture** covers directory structure and database schema |
| ⬜ | **Code Style Guidelines** match the team's actual practices |
| ⬜ | **Critical Rules** cite the **incident or reason** for each rule |
| ⬜ | ASCII box diagrams are used **sparingly** (fewer than 8 per file) |
| ⬜ | **No API keys, tokens, or secrets** anywhere in the file |
| ⬜ | **No pasted file contents** — uses relative path references instead |
| ⬜ | Total file length is **under 500 lines** |
| ⬜ | Deeper documentation is **delegated** to a `knowledge/` directory |
| ⬜ | **MCP project IDs** and resilience rules are documented |
| ⬜ | File has been **peer-reviewed** via a pull request |

---

## 9 · Common Mistakes and How to Fix Them

| # | Mistake | Consequence | Fix |
|:-:|---------|-------------|-----|
| 1 | **No version numbers** in tech stack | Claude generates code for wrong API versions | Add explicit versions for every dependency |
| 2 | **Too many** critical rule boxes | Claude treats nothing as truly critical | Reserve boxes for production-incident rules only |
| 3 | **File exceeds 500 lines** | Consumes excessive context tokens | Extract details to `knowledge/` files |
| 4 | **Secrets in CLAUDE.md** | Credentials exposed in version control | Move to MCP config or env variables |
| 5 | **Stale Current Focus** | Claude prioritizes wrong areas of codebase | Update weekly or at sprint boundaries |
| 6 | **Rules without reasons** | Claude rationalizes exceptions | Always include the why or the incident |
| 7 | **No MCP resilience rules** | Claude hangs waiting for offline tools | Add explicit skip-and-continue behavior |
| 8 | **Personal preferences** mixed in | Inconsistent output across team members | Keep CLAUDE.md as a team document only |
| 9 | **No architecture section** | Claude guesses where files go | Document directory structure with annotations |
| 10 | **Generic style guidance** | Claude falls back to training defaults | Be specific: "Use Zod, not joi" > "Use a validator" |

---

## 10 · Key Principles to Remember

### 🧬 Principle 1: CLAUDE.md Is Your Project's AI DNA

Every convention, pattern, and guardrail you codify directly improves the quality of AI-generated code across your entire team. The file is not documentation for humans — it is **instructions for your AI pair programmer**.

### 📈 Principle 2: Start Minimal, Evolve Continuously

Your first CLAUDE.md will not be perfect. The best CLAUDE.md files are shaped by **months of real development experience**. Begin with the starter template, then refine based on what you actually encounter.

### 🔄 Principle 3: Context Preservation Is the Superpower

The 10 minutes you spend maintaining CLAUDE.md saves hours of fixing inconsistent code. **Vibe coding is junk food — workflow-driven development is the meal plan.**

### 👥 Principle 4: Treat It Like Code

Pull requests, peer review, and deliberate governance prevent a single developer from introducing a bad rule that affects the whole team. CLAUDE.md changes should receive the same scrutiny as any other code change.

### 🧠 Principle 5: AI Assists, Humans Decide

CLAUDE.md tells Claude **how to help**. It does not replace your judgment, your code review, or your accountability for what gets shipped. You are responsible for the code you deploy — "the AI wrote it" is not a valid post-mortem explanation.

---

## 📖 Official Documentation Quick Reference

| Resource | URL |
|----------|-----|
| **Claude Code Overview** | [docs.anthropic.com/en/docs/claude-code/overview](https://docs.anthropic.com/en/docs/claude-code/overview) |
| **CLAUDE.md & Memory** | [docs.anthropic.com/en/docs/claude-code/memory](https://docs.anthropic.com/en/docs/claude-code/memory) |
| **MCP Setup & Configuration** | [docs.anthropic.com/en/docs/claude-code/mcp](https://docs.anthropic.com/en/docs/claude-code/mcp) |
| **Installation & Setup** | [docs.anthropic.com/en/docs/claude-code/setup](https://docs.anthropic.com/en/docs/claude-code/setup) |
| **Prompting Best Practices** | [docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices) |
| **Agent SDK (Programmatic)** | [docs.anthropic.com/en/docs/claude-code/sdk](https://docs.anthropic.com/en/docs/claude-code/sdk) |

---

*Created by RedBlue AI Consulting · [red-blue.ai](https://red-blue.ai)*