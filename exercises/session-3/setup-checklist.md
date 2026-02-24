# Setup Checklist

Run through these checks to verify your environment is ready:

- [ ] `git --version` → v2.x+
- [ ] `node --version` → v18+
- [ ] `claude --version` → Latest
- [ ] `npm install` → No errors
- [ ] `npm run dev` → App loads at http://localhost:3000
- [ ] Dashboard page shows service requests and technicians
- [ ] Claude Workflow plugin installed
- [ ] `claude claude-workflow:setup` completed
- [ ] `.claude/commands/` directory has 29+ files
- [ ] `.claude/agents/` directory has 10+ files
- [ ] `CLAUDE.md` exists and is customized
- [ ] GitHub MCP configured in `.claude/settings.json`
- [ ] `claude claude-workflow:status` shows "Full Setup"
- [ ] `/StartSession` runs without errors
- [ ] `docs/planning/session-state.json` exists after first session
