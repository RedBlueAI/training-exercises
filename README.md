# 🏗️ Field Service — AI Training Exercises

Hands-on training repository for the **AI Tool Assistance System** curriculum.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/RedBlueAI/training-exercises.git
cd training-exercises

# Install dependencies
npm install

# Set up environment (for AI Triage feature)
cp .env.example .env.local
# Edit .env.local and add your Groq API key from https://console.groq.com

# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the exercise hub.

## Training Sessions

| Session | Topic | Type |
|---------|-------|------|
| 3 | Environment Setup & Configuration | 🔧 Setup |
| 4 | Session Start — Context-Aware Development | 🚀 Workflow |
| 5 | Assisted Coding Fundamentals | 💻 Coding |
| 6 | Session End & Quality Gates | ✅ Quality |
| 7 | PRD Validation & Technical Feasibility | 📋 Planning |
| 8 | Work Breakdown & Cycle Planning | 📊 Planning |
| 10 | Security, Quality & Governance | 🔒 Security |

Exercise instructions are in the `exercises/` directory, organized by session.

## Application

This is a **Field Service Management Dashboard** — a realistic application that engineers use for hands-on exercises. It includes:

- **Dashboard** — Overview of service requests and technician status
- **Service Requests** — List, view, and manage service requests
- **Technicians** — Technician directory with skills and availability
- **AI Triage** — AI-powered service request categorization (Groq/Llama 3.1)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** Groq (llama-3.1-8b-instant, free tier)

## ⚠️ Important Note

Some code in this repository is **intentionally buggy or insecure**. This is exercise material — don't fix issues before the relevant training session!

- `src/lib/legacy/` — Messy code for refactoring exercises (Session 5)
- `src/lib/scheduling.ts` — Has an intentional bug (Session 5)
- API routes — Have deliberate security issues (Session 10)
