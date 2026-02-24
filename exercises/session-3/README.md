# Session 3: Environment Setup & Configuration

## Objective
Get your development environment configured with the Claude Workflow System.

## Prerequisites
- Git installed (`git --version`)
- Node.js 18+ (`node --version`)
- Claude Code CLI (`claude --version`)
- This repo cloned

## Exercises

### Exercise 1: Verify the App Runs (5 min)
```bash
npm install
npm run dev
# Visit http://localhost:3000
```
Explore the dashboard, service requests, and technician pages.

### Exercise 2: Install the Claude Workflow System (5 min)
```bash
# Add the RedBlue workflows marketplace
claude plugin marketplace add https://github.com/RedBlueAI/claude-workflow-plugin.git

# Install the workflow plugin
claude plugin install claude-workflow@redblue-workflows

# Set up this project
claude claude-workflow:setup
```
Select "nextjs-development" variant when prompted.

### Exercise 3: Review and Customize CLAUDE.md (5 min)
- Open `CLAUDE.md` in the project root
- Compare the generated version with the pre-configured one
- Add any team-specific conventions you'd like to enforce

### Exercise 4: Configure GitHub MCP (3 min)
- Set up the GitHub MCP server with a personal repository
- Verify connection with `claude claude-workflow:status`

### Exercise 5: Run Your First Session (2 min)
```bash
claude StartSession
```
Observe what context gets loaded. Check the generated files in `docs/planning/`.

## Setup Checklist
See `setup-checklist.md` for a step-by-step verification list.

## Expected Outcome
✅ App runs locally on localhost:3000
✅ Claude Workflow System installed and configured
✅ CLAUDE.md customized for this project
✅ At least GitHub MCP connected
✅ One successful /StartSession completed
