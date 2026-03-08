# 🔌 MCP Setup Guidelines

### Integration Setup Guide — Claude Code (CLI)

**AI-Enhanced Development Training Program** · **RedBlue AI Consulting** · Last verified: March 2026

---

## 📑 Table of Contents

| # | Section | What It Covers |
|---|---------|----------------|
| **Part 1** | [Training Session Integrations](#part-1--training-session-integrations) | Linear, Coda, GitHub — the three tools you need for class |
| **Part 2** | [Alternative Project Management Tools](#part-2--alternative-project-management-tools) | Jira, Asana, Monday.com, Shortcut, Azure DevOps, ClickUp, Trello, Notion |
| **Part 3** | [Alternative Documentation Tools](#part-3--alternative-documentation-tools) | Confluence, Google Docs, SharePoint, Notion, GitBook, Slab, Outline, Slite, Docusaurus |
| **Part 4** | [Alternative Code Management Tools](#part-4--alternative-code-management-tools) | GitHub MCP, GitLab, Bitbucket, Azure DevOps Repos, Gitea, Sourcegraph, Perforce |
| **Appendix** | [Quick Reference Matrices](#appendix--quick-reference-matrices) | Side-by-side comparison of all 25 tools |

---

## Introduction

This guide documents how to connect **Claude Code** (the CLI tool) to three categories of external systems using the **Model Context Protocol (MCP)**, CLI tools, or REST API fallbacks:

| Category | What It Connects | Examples |
|----------|-----------------|----------|
| 🗂️ **Project Management** | Track issues, manage sprints, plan work | Linear, Jira, Asana, Monday.com |
| 📚 **Documentation & Knowledge** | Read, write, and search team docs | Coda, Confluence, Google Docs, Notion |
| 💻 **Code Management** | Repos, pull requests, code search | GitHub, GitLab, Bitbucket, Sourcegraph |

### Platform Coverage

| Platform | Tooling Approach | Key Differences |
|----------|-----------------|-----------------|
| 🍎 **macOS (native)** | Homebrew-based, macOS Keychain for secrets | `/opt/homebrew/bin/` install paths |
| 🪟 **Windows WSL2 (Ubuntu)** | Binary installs, browser delegation via `wslu` | `~/.local/bin/` paths, plaintext token files |

> 📖 **Official Documentation**
> [Connect Claude Code to tools via MCP](https://docs.anthropic.com/en/docs/claude-code/mcp) — Anthropic's complete guide to MCP server configuration, transport types, authentication, and scope levels.

---

# Part 1 · Training Session Integrations

These are the integrations currently configured and in active use for the training program.

---

## 1 · 🟣 Linear

Linear is available through **two independent methods**. Both can be active simultaneously.

### Method A: Claude Code Plugin (Recommended)

Installs Linear as a local Claude Code plugin via the official marketplace. Tools appear as `mcp__linear-server__*`.

#### Setup Steps (All Platforms)

```bash
# 1. Open Claude Code in your terminal
claude

# 2. Install the Linear plugin from the marketplace
claude plugin install linear

# Or from within a Claude Code session:
/install linear
```

#### OAuth Flow

On first use, Claude Code initiates an OAuth flow automatically:

| Step | What Happens |
|:----:|-------------|
| 1 | Browser window opens to `https://mcp.linear.app/mcp` |
| 2 | Log in with your Linear account |
| 3 | Authorize the Claude Code application |
| 4 | Browser redirects back — token saved automatically |

#### Where Config Is Stored

| Item | Location |
|------|----------|
| Plugin config | `~/.claude/plugins/marketplaces/claude-plugins-official/external_plugins/linear/.mcp.json` |
| OAuth tokens | `~/.claude/.credentials.json` (under `mcpOAuth` section) |

Plugin `.mcp.json` contents:

```json
{
  "linear": {
    "type": "http",
    "url": "https://mcp.linear.app/mcp"
  }
}
```

> 💡 **No manual token management needed** — OAuth tokens are managed automatically in `~/.claude/.credentials.json`.

#### WSL2-Specific Notes

| Issue | Solution |
|-------|----------|
| Browser doesn't open automatically | Copy the URL from the terminal → paste into your Windows browser |
| Browser delegation not working | Install `wslu`: `sudo apt install wslu` |
| Redirect callback | Handled by the CLI process running in WSL — no extra port forwarding needed |

#### Verification

From within Claude Code, Linear tools (`list_issues`, `save_issue`, `get_project`, etc.) should appear in the deferred tools list. Run `/mcp` to check connectivity.

---

### Method B: claude.ai Managed Integration

Tools appear as `mcp__claude_ai_Linear__*`.

#### Setup Steps (All Platforms)

| Step | Action |
|:----:|--------|
| 1 | Go to **claude.ai/settings** in your browser |
| 2 | Navigate to **Integrations** (or Connectors) |
| 3 | Find **Linear** and click **Connect** |
| 4 | Authorize via OAuth in the Linear login flow |
| 5 | Integration syncs automatically to Claude Code |

#### How It Syncs

When you authenticate Claude Code with `claude login`, your account includes the scope `user:mcp_servers`. This makes **all claude.ai-managed integrations automatically available** in Claude Code sessions — no local configuration needed.

#### Disabling Cloud-Synced Integrations

```bash
ENABLE_CLAUDEAI_MCP_SERVERS=false claude
```

> ⚠️ **Duplicate Tools Are Normal**
> If both methods are active, you may see both `mcp__linear-server__*` and `mcp__claude_ai_Linear__*`. They access the same Linear workspace. To remove duplicates, disable one:
> - Disable plugin: `claude plugin disable linear`
> - Disable cloud: Remove Linear from **claude.ai/settings > Integrations**

---

## 2 · 📄 Coda

Coda is available **only as a managed integration** through claude.ai. There is no local plugin or config file.

Tools appear as `mcp__coda__*`.

### Setup Steps (All Platforms)

| Step | Action |
|:----:|--------|
| 1 | Go to **claude.ai/settings** in your browser |
| 2 | Navigate to **Integrations** (or Connectors) |
| 3 | Find **Coda** and click **Connect** |
| 4 | Redirected to Coda's OAuth authorization page |
| 5 | Log in with your Coda account and authorize Claude |
| 6 | Integration syncs automatically to Claude Code via `user:mcp_servers` scope |

### How It Works

| Aspect | Detail |
|--------|--------|
| Local config files | **None** — entirely managed through your claude.ai account |
| Discovery | When Claude Code starts, it checks your claude.ai account for enabled integrations |
| Tool availability | Coda tools become available as deferred tools |

### Available Coda Tools

| Tool | Purpose |
|------|---------|
| `coda_list_documents` | List accessible Coda docs |
| `coda_list_pages` | List pages within a doc |
| `coda_get_page_content` | Read page content |
| `coda_peek_page` | Quick preview of page |
| `coda_create_page` | Create a new page |
| `coda_append_page_content` | Add content to a page |
| `coda_replace_page_content` | Replace page content |
| `coda_list_tables` | List tables in a doc |
| `coda_list_rows` | List rows in a table |
| `coda_get_row` | Get a specific row |
| `coda_update_row` | Update a row |
| `coda_upsert_rows` | Insert or update rows |
| `coda_delete_row` / `coda_delete_rows` | Delete rows |
| `coda_list_columns` | List table columns |
| `coda_resolve_link` | Resolve a Coda URL |
| `coda_push_button` | Trigger a Coda button |

---

## 3 · 🐙 GitHub

**GitHub is NOT an MCP integration.** It uses the GitHub CLI (`gh`), which Claude Code calls directly via Bash commands.

> 💡 **Why CLI Instead of MCP?**
> A GitHub MCP plugin exists in the Claude Code marketplace, but the `gh` CLI already works excellently and doesn't require managing a separate Personal Access Token. The CLI is the recommended approach.

### macOS Installation

```bash
# 1. Install via Homebrew
brew install gh

# 2. Authenticate
gh auth login
# → Select GitHub.com
# → Select HTTPS as preferred protocol
# → Authenticate via browser (recommended)

# 3. Verify
gh auth status
```

| Detail | Value |
|--------|-------|
| Install path | `/opt/homebrew/bin/gh` |
| Token storage | macOS Keychain (system keyring) |
| Update command | `brew upgrade gh` |

### Windows WSL2 Installation

```bash
# Option A: Install from GitHub releases (recommended for WSL)
GH_VERSION="2.76.0"
curl -Lo gh.tar.gz \
  "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_amd64.tar.gz"
tar xzf gh.tar.gz
cp gh_${GH_VERSION}_linux_amd64/bin/gh ~/.local/bin/gh
chmod +x ~/.local/bin/gh
rm -rf gh.tar.gz gh_${GH_VERSION}_linux_amd64

# Option B: Via apt (may be older version)
sudo apt install gh

# Ensure ~/.local/bin is on your PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Authenticate
gh auth login
# → Select GitHub.com → HTTPS → Browser auth

# Verify
gh auth status
```

| Detail | Value |
|--------|-------|
| Install path | `~/.local/bin/gh` (standalone ELF binary) |
| Token storage | `~/.config/gh/hosts.yml` (**plaintext** — protect permissions!) |
| Token type | OAuth token (`gho_****`) |
| Token scopes | `gist`, `read:org`, `repo` |
| Update | Re-download the latest release binary manually |

> ⚠️ **WSL2 Security Warning**
> Unlike macOS, WSL2 does **NOT** use a system keyring by default. The OAuth token is stored in plaintext. Set restrictive permissions:
> ```bash
> chmod 600 ~/.config/gh/hosts.yml
> ```

### How Claude Code Uses It (All Platforms)

Claude Code calls `gh` commands directly via the Bash tool — no MCP configuration needed:

| Command | Purpose |
|---------|---------|
| `gh pr create` | Create pull requests |
| `gh pr view` | View PR details |
| `gh issue list` | List issues |
| `gh api repos/owner/repo/...` | Raw GitHub API calls |
| `gh auth status` | Check authentication |

### Optional: GitHub MCP Plugin (Not Required)

If you want structured MCP tool access in addition to the CLI:

```bash
# Install the plugin
claude plugin install github

# Set a PAT before starting Claude Code
export GITHUB_PERSONAL_ACCESS_TOKEN="ghp_your_token_here"
claude
```

---

## 4 · 📋 Training Configuration Summary

### Integration Sources

| Integration | Source | Tool Prefix | Config Location |
|-------------|--------|-------------|-----------------|
| Linear (plugin) | Claude Code plugin marketplace | `mcp__linear-server__*` | `~/.claude/plugins/.../linear/.mcp.json` |
| Linear (cloud) | claude.ai Integrations | `mcp__claude_ai_Linear__*` | claude.ai account (no local file) |
| Coda | claude.ai Integrations | `mcp__coda__*` | claude.ai account (no local file) |
| GitHub | `gh` CLI | N/A (Bash tool) | macOS: Keychain / WSL: `~/.config/gh/hosts.yml` |

### Key Config Files

| File | Scope | Contains |
|------|-------|----------|
| `.mcp.json` (project root) | Project | Supabase, project-specific MCP servers |
| `~/.claude/mcp.json` | Global (all projects) | Global MCP server configs |
| `~/.claude/.credentials.json` | Global | OAuth tokens for all MCP servers |
| `~/.claude/settings.json` | Global | Plugin enablement, thinking mode, effort level |
| `~/.claude/settings.local.json` | Global | Permission rules |

### Platform-Specific Files

| File | macOS | WSL2 |
|------|-------|------|
| `gh` OAuth token | macOS Keychain | `~/.config/gh/hosts.yml` (plaintext!) |
| `gh` binary | `/opt/homebrew/bin/gh` | `~/.local/bin/gh` |
| Claude Code binary | Homebrew-managed | `~/.local/bin/claude` (symlink) |
| Claude Code versions | Homebrew-managed | `~/.local/share/claude/versions/` |

### Authentication Flow

```
Claude Code starts
├── Reads ~/.claude/mcp.json (global MCP servers)
├── Reads .mcp.json (project MCP servers)
├── Checks installed plugins (~/.claude/plugins/)
├── Syncs claude.ai integrations (if logged in with user:mcp_servers scope)
│   ├── Linear (cloud)
│   ├── Coda
│   ├── Vercel
│   └── (any other claude.ai integrations)
└── All tools become available as deferred tools
```

---

## 5 · 🔧 Troubleshooting

### Common Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| **"MCP server needs authentication"** | OAuth token expired or never completed | Re-run `claude` and attempt to use the tool — re-triggers OAuth flow |
| **Linear tools not appearing** | Plugin not installed or cloud integration disconnected | Check: `claude plugin list` / Check: claude.ai/settings > Integrations / Run `/mcp` |
| **Coda tools not appearing** | Not logged in or integration disabled | `claude login` / Check claude.ai integration / Confirm `ENABLE_CLAUDEAI_MCP_SERVERS` is not `false` |
| **Duplicate Linear tools** | Both plugin and cloud integration active | Normal — disable one if desired (see Linear section above) |

### GitHub CLI Issues

| Platform | Problem | Fix |
|----------|---------|-----|
| 🍎 macOS | Auth check fails | `gh auth status` → `gh auth login` → Verify `which gh` shows `/opt/homebrew/bin/gh` |
| 🪟 WSL2 | Auth check fails | `gh auth status` → `gh auth login` → Verify `which gh` shows `~/.local/bin/gh` |
| 🪟 WSL2 | Browser doesn't open during auth | Install `wslu`: `sudo apt install wslu` |
| 🪟 WSL2 | Token file permissions | `ls -la ~/.config/gh/hosts.yml` — should be `600` |

### WSL2-Specific Issues

| Problem | Fix |
|---------|-----|
| **Browser not opening for OAuth** | `sudo apt install wslu` → Test: `wslview https://google.com` → If still failing: `export BROWSER=wslview` → Add to `~/.bashrc` |
| **`/mcp` shows "Failed to reconnect"** | Normal for auth refresh — run `/mcp` again (often succeeds on retry). If persistent, restart Claude Code session. Check `~/.claude/.credentials.json` has valid tokens. |

---

# Part 2 · Alternative Project Management Tools

> 💡 **Coverage as of March 2026:** 7 out of 8 major PM tools have official MCP servers. The only exception is Trello (community MCP only).

---

## 6 · 🔵 Jira (Atlassian)

| Detail | Value |
|--------|-------|
| **Integration type** | Official MCP (Atlassian Rovo MCP Server) |
| **Transport** | SSE (migrating to HTTP by June 2026) |
| **Auth** | OAuth 2.1 (browser flow, auto-registration) |
| **Setup effort** | 🟢 Low |

### Setup for Claude Code

```bash
# Current endpoint (SSE transport)
claude mcp add --transport sse atlassian https://mcp.atlassian.com/v1/sse

# New endpoint (HTTP transport — transitioning before June 30, 2026)
claude mcp add --transport http atlassian https://mcp.atlassian.com/v1/mcp
```

Authentication triggers automatically via browser-based OAuth 2.1 on first use. No manual app creation required.

**Capabilities:** Search, create, and update Jira issues. Also covers Confluence pages and Compass services within the same MCP server.

**Community Alternative:** `sooperset/mcp-atlassian` — Python-based, supports self-hosted Jira Server/Data Center via API tokens. Install: `pip install mcp-atlassian`.

**CLI Fallback:** No official Jira CLI. Use the REST API via `curl`: `https://your-domain.atlassian.net/rest/api/3/`

---

## 7 · 🟠 Asana

| Detail | Value |
|--------|-------|
| **Integration type** | Official MCP (Asana-hosted) |
| **Transport** | SSE (V1 deprecated) / HTTP (V2 current) |
| **Auth** | OAuth (requires Asana developer console app) |
| **Setup effort** | 🟡 Medium |

> ⚠️ **Deprecation Warning**
> Asana MCP V1 (`/sse` endpoint) is deprecated and **will shut down on May 11, 2026**. Use V2.

### Setup for Claude Code

```bash
# V2 (current — use this)
claude mcp add --transport sse asana https://mcp.asana.com/sse
```

Requires creating an OAuth app in the Asana developer console first, then completing the OAuth flow from Claude Code.

**Capabilities:** Read, create, update, and search tasks. Manage projects, comment on tasks, interact with project sections.

**Community Alternative:** `roychri/mcp-server-asana` — Local npx-based option using a Personal Access Token.

**CLI Fallback:** No official Asana CLI. REST API: `https://app.asana.com/api/1.0/`

---

## 8 · 🟡 Monday.com

| Detail | Value |
|--------|-------|
| **Integration type** | Official MCP (hosted + local npx) |
| **Transport** | HTTP (hosted) / stdio (local) |
| **Auth** | OAuth (hosted) / API token (local) |
| **Setup effort** | 🟢 Low |

### Setup for Claude Code

```bash
# Option A: Hosted remote server
claude mcp add --transport http monday https://mcp.monday.com/mcp

# Option B: Local npx server
claude mcp add monday -- npx @mondaydotcomorg/monday-api-mcp@latest
```

For the local option, set `MONDAY_TOKEN` environment variable. Or add to `.mcp.json`:

```json
{
  "mcpServers": {
    "monday": {
      "command": "npx",
      "args": ["@mondaydotcomorg/monday-api-mcp@latest"],
      "env": {
        "MONDAY_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```

**Requirements:** Free "monday MCP" app must be installed from the monday.com marketplace (account admin required). Available on Pro, Max, Team, and Enterprise plans.

**Capabilities:** Create/update items, sprint summaries, cross-board reporting, CRM workflows.

---

## 9 · 🟤 Shortcut (formerly Clubhouse)

| Detail | Value |
|--------|-------|
| **Integration type** | Official MCP (local npx) |
| **Transport** | stdio |
| **Auth** | API Token |
| **Setup effort** | 🟢 Low |

### Setup for Claude Code

```bash
claude mcp add shortcut --transport stdio \
  -e SHORTCUT_API_TOKEN=$SHORTCUT_API_TOKEN \
  -- npx -y @shortcut/mcp@latest
```

Or add to `.mcp.json`:

```json
{
  "mcpServers": {
    "shortcut": {
      "command": "npx",
      "args": ["-y", "@shortcut/mcp@latest"],
      "env": {
        "SHORTCUT_API_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```

Generate your API token from **Shortcut Settings > API Tokens**.

**Capabilities:** View, create, and search stories, epics, objectives, and projects. Update story state, assignees, and labels.

---

## 10 · 🔷 Azure DevOps Boards

| Detail | Value |
|--------|-------|
| **Integration type** | Official MCP (Microsoft, local npx) |
| **Transport** | stdio |
| **Auth** | Azure default credentials (browser-based or PAT) |
| **Setup effort** | 🟢 Low |

### Setup for Claude Code

```bash
claude mcp add azure-devops -- npx -y @azure-devops/mcp <YOUR_ORG_NAME>
```

Replace `<YOUR_ORG_NAME>` with your Azure DevOps organization name. Data stays local — never leaves your network. Requirements: Node.js 20.0+, active Azure DevOps organization.

**Capabilities:** Work items (create, query, update), pull requests, builds and pipelines, test plans, projects and teams.

**CLI Fallback:** `az devops` CLI extension for Azure CLI.

---

## 11 · 🟢 ClickUp

| Detail | Value |
|--------|-------|
| **Integration type** | Official MCP (hosted) |
| **Transport** | HTTP |
| **Auth** | OAuth (browser flow) |
| **Setup effort** | 🟢 Low |

### Setup for Claude Code

```bash
claude mcp add --transport http clickup https://mcp.clickup.com/mcp
```

Authentication uses OAuth (browser-based flow).

**Capabilities:** Create/update/route tasks, time tracking, search tasks and Docs, generate status reports, collaborate via comments.

**Community Alternative:** `taazkareem/clickup-mcp-server` — self-hosted option.

---

## 12 · 🔵 Trello

| Detail | Value |
|--------|-------|
| **Integration type** | ⚠️ Community MCP only |
| **Transport** | stdio |
| **Auth** | API Key + Token |
| **Setup effort** | 🟡 Medium |

> ⚠️ **No Official MCP**
> As of March 2026, no official MCP server from Atlassian. The Atlassian Rovo MCP covers Jira and Confluence but **NOT** Trello.

### Setup for Claude Code

```json
{
  "mcpServers": {
    "trello": {
      "command": "npx",
      "args": ["-y", "mcp-server-trello"],
      "env": {
        "TRELLO_API_KEY": "<YOUR_API_KEY>",
        "TRELLO_TOKEN": "<YOUR_TOKEN>",
        "TRELLO_BOARD_ID": "<YOUR_BOARD_ID>"
      }
    }
  }
}
```

Get credentials from the **Trello Power-Up Admin**.

**Community Servers:** `delorenj/mcp-server-trello` · `MagnusNilsson/trello-mcp-server`

**CLI Fallback:** Trello has a well-documented REST API callable via `curl`.

---

## 13 · ⬛ Notion (as PM)

| Detail | Value |
|--------|-------|
| **Integration type** | Official MCP + Claude Code Plugin |
| **Transport** | HTTP (hosted) / stdio (local) |
| **Auth** | OAuth (hosted) / API key (local) |
| **Setup effort** | 🟢 Low |

### Setup for Claude Code

```bash
# Option A: Claude Code Plugin (recommended)
claude plugin add notion
# Bundles MCP server + Notion-specific slash commands and Skills

# Option B: Hosted MCP (OAuth)
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

**Option C: Local server (API key)**

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_TOKEN": "<YOUR_NOTION_API_KEY>"
      }
    }
  }
}
```

---

# Part 3 · Alternative Documentation Tools

---

## 14 · 🔵 Confluence (Atlassian)

| Detail | Value |
|--------|-------|
| **Integration type** | Official MCP (Atlassian Rovo — same server as Jira) |
| **Transport** | SSE (migrating to HTTP by June 2026) |
| **Auth** | OAuth 2.1 (auto-registration) |
| **Setup effort** | 🟢 Low |

### Setup for Claude Code

```bash
# Same server as Jira — one setup covers both
claude mcp add --transport sse atlassian https://mcp.atlassian.com/v1/sse
```

If you already set up Jira, Confluence tools are included automatically.

**Capabilities:** Read/write Confluence pages and spaces, search content. All actions respect user-level ACLs.

**Community Alternative:** `sooperset/mcp-atlassian` — supports Confluence Server/Data Center via API tokens.

---

## 15 · 📝 Google Docs

| Detail | Value |
|--------|-------|
| **Integration type** | ⚠️ Community MCP servers |
| **Transport** | stdio |
| **Auth** | OAuth 2.0 (Google Cloud Console credentials) |
| **Setup effort** | 🟡 Medium |

> ⚠️ **No Official MCP**
> As of March 2026, there is no official Google Docs-specific MCP server. Multiple mature community implementations are available.

### Setup for Claude Code

```json
{
  "mcpServers": {
    "google-workspace": {
      "command": "npx",
      "args": ["-y", "google-workspace-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "<YOUR_CLIENT_ID>",
        "GOOGLE_CLIENT_SECRET": "<YOUR_CLIENT_SECRET>"
      }
    }
  }
}
```

Requires creating OAuth credentials in Google Cloud Console with Docs, Drive, and Sheets API scopes enabled.

### Community Servers

| Server | Covers |
|--------|--------|
| `taylorwilsdon/google_workspace_mcp` | 12 Google services, 100+ tools |
| `a-bonus/google-docs-mcp` | Docs, Sheets, Drive |
| `ngs/google-mcp-server` | Calendar, Drive, Gmail, Sheets, Docs |

**REST API Fallback:**
- Google Docs API: `https://docs.googleapis.com/v1/documents/{documentId}`
- Google Drive API: `https://www.googleapis.com/drive/v3/`
- Auth via gcloud CLI: `gcloud auth application-default login`

---

## 16 · 🟦 SharePoint (Microsoft 365)

| Detail | Value |
|--------|-------|
| **Integration type** | Official (multiple options) |
| **Transport** | Varies by method |
| **Auth** | Microsoft Entra ID / Azure AD |
| **Setup effort** | 🔴 High |

### Three Setup Options

| Option | Best For | Requires |
|--------|----------|----------|
| **A: Claude M365 Connector** | Claude Team/Enterprise plans | Entra ID Global Admin setup |
| **B: PnP CLI for M365** | Broad M365 coverage (SharePoint, OneDrive, Teams, Planner) | npx |
| **C: Microsoft Agent 365 Tooling** | Enterprise-grade, Dataverse access | Azure tenant setup |

**Option B Setup:**

```json
{
  "mcpServers": {
    "m365": {
      "command": "npx",
      "args": ["-y", "@pnp/cli-microsoft365-mcp-server"]
    }
  }
}
```

**REST API Fallback:** Microsoft Graph API: `https://graph.microsoft.com/v1.0/sites/`

---

## 17 · ⬛ Notion (as Docs)

Same MCP server and plugin as Notion for PM (see section 13). The same setup covers both project management and documentation use cases. Notion's MCP provides search, read, create, update pages, manage databases, add content blocks, and comment.

---

## 18 · 📖 GitBook

| Detail | Value |
|--------|-------|
| **Integration type** | Official built-in MCP (zero configuration) |
| **Transport** | HTTP |
| **Auth** | None required for public sites |
| **Setup effort** | 🟢 Very Low |

### Setup for Claude Code

Every published GitBook site automatically includes an MCP endpoint. Append `/~gitbook/mcp` to any published site URL:

```json
{
  "mcpServers": {
    "gitbook-docs": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://your-docs-site.gitbook.io/~gitbook/mcp"]
    }
  }
}
```

No API key required for public sites. Private sites support authentication.

**Capabilities:** 12 tools for content operations, 6 AI-powered prompts, fuzzy search, markdown preservation, code block extraction.

---

## 19 · 📕 Slab

| Detail | Value |
|--------|-------|
| **Integration type** | ❌ No MCP available |
| **API Alternative** | GraphQL API |
| **Auth** | API Token (requires Slab Premium) |
| **Setup effort** | 🔴 High (custom integration) |

### REST API Usage

```bash
curl -X POST https://api.slab.com/v1/graphql \
  -H "Authorization: Bearer $SLAB_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ posts(first: 10) { edges { node { title content } } } }"}'
```

API token generated from **Slab Settings**. Requires Slab Premium.

---

## 20 · 📗 Outline

| Detail | Value |
|--------|-------|
| **Integration type** | Community MCP servers |
| **Transport** | stdio |
| **Auth** | API key |
| **Setup effort** | 🟢 Low |

### Setup for Claude Code

```json
{
  "mcpServers": {
    "outline": {
      "command": "npx",
      "args": ["-y", "mcp-outline"],
      "env": {
        "OUTLINE_API_URL": "https://your-outline-instance.com/api",
        "OUTLINE_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

API key obtained from: **Outline UI > Profile > Settings > API Keys**.

**Community Servers:** `Vortiago/mcp-outline` · `nbhansen/outline-mcp-server`

**REST API Fallback:** Full REST API at `https://your-instance.com/api`

---

## 21 · 📘 Slite

| Detail | Value |
|--------|-------|
| **Integration type** | Community MCP server |
| **Transport** | stdio |
| **Auth** | API key |
| **Setup effort** | 🟢 Low |

### Setup for Claude Code

```json
{
  "mcpServers": {
    "slite": {
      "command": "npx",
      "args": ["-y", "slite-mcp"],
      "env": {
        "SLITE_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

---

## 22 · 🦖 Docusaurus

| Detail | Value |
|--------|-------|
| **Integration type** | Community MCP / Filesystem |
| **Transport** | stdio |
| **Auth** | None for local projects |
| **Setup effort** | 🟢 Low |

For local projects, **no MCP is needed** — Claude Code reads `.md` and `.mdx` files directly from the filesystem. For deployed sites, use the WebFetch tool or the fetch MCP server.

---

# Part 4 · Alternative Code Management Tools

> 💡 **Coverage as of March 2026:** All 7 major code management tools have MCP servers. 5 are official, 1 is community-maintained (Bitbucket), and 1 is vendor-published but community-supported (Perforce).

---

## 23 · 🐙 GitHub (MCP)

| Detail | Value |
|--------|-------|
| **Integration type** | Official MCP (maintained by GitHub) |
| **Transport** | stdio (Docker or npx) |
| **Auth** | Personal Access Token |

### Setup for Claude Code

```bash
# Option A: Docker (recommended)
claude mcp add github \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_YOUR_TOKEN \
  -- docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server

# Option B: npx
claude mcp add github \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_YOUR_TOKEN \
  -- npx -y @github/mcp-server
```

> 💡 Claude Code already has excellent GitHub integration via the `gh` CLI. The MCP server adds structured tool access but is **not strictly required**.

---

## 24 · 🦊 GitLab

| Detail | Value |
|--------|-------|
| **Integration type** | Official MCP (built into GitLab 18.6+) |
| **Transport** | HTTP (recommended) / stdio via mcp-remote |
| **Auth** | Personal Access Token (Bearer) |

### Setup for Claude Code

```bash
# HTTP transport (direct connection to GitLab instance)
claude mcp add --transport http gitlab \
  https://gitlab.com/-/mcp \
  --header "Authorization: Bearer glpat-YOUR_TOKEN"
```

For self-hosted GitLab, replace `gitlab.com` with your instance URL. Requires GitLab 18.6+.

**Capabilities:** Access project info, retrieve issues and merge requests, interact with GitLab APIs, CI/CD operations.

**CLI Fallback:** `glab` — GitLab's official CLI tool for issues, MRs, pipelines.

---

## 25 · 🪣 Bitbucket (Atlassian)

| Detail | Value |
|--------|-------|
| **Integration type** | ⚠️ Community MCP only |
| **Transport** | stdio |
| **Auth** | Bitbucket App Password (being deprecated by June 2026 — migrate to Scoped API Tokens) |

### Setup for Claude Code

```json
{
  "mcpServers": {
    "bitbucket": {
      "command": "npx",
      "args": ["-y", "@aashari/mcp-server-atlassian-bitbucket"],
      "env": {
        "BITBUCKET_USERNAME": "<YOUR_USERNAME>",
        "BITBUCKET_APP_PASSWORD": "<YOUR_APP_PASSWORD>"
      }
    }
  }
}
```

> ⚠️ **No Official MCP** — The Atlassian Rovo MCP covers Jira and Confluence but **NOT** Bitbucket.

**CLI Fallback:** No official Bitbucket CLI. REST API: `https://api.bitbucket.org/2.0/`

---

## 26 · 🔷 Azure DevOps Repos

Same MCP server as Azure DevOps Boards (section 10). The single `@azure-devops/mcp` server covers work items, pull requests, builds, repos, and pipelines.

```bash
claude mcp add azure-devops -- npx -y @azure-devops/mcp <YOUR_ORG_NAME>
```

**CLI Fallback:** `az devops` CLI extension.

---

## 27 · 🍵 Gitea

| Detail | Value |
|--------|-------|
| **Integration type** | Official MCP (maintained by Gitea team) |
| **Transport** | stdio |
| **Auth** | Access Token |

### Setup for Claude Code

```bash
claude mcp add --transport stdio --scope user gitea \
  --env GITEA_ACCESS_TOKEN=your_token \
  --env GITEA_HOST=https://your-gitea.com \
  -- go run gitea.com/gitea/gitea-mcp@latest -t stdio
```

Or download a pre-built binary from releases. To get a token: log into Gitea > Settings > Applications > generate new token.

Also works with **Forgejo** (Gitea fork) via `raohwork/forgejo-mcp`.

**CLI Fallback:** `tea` — Gitea's official CLI for repos, issues, PRs.

---

## 28 · 🔍 Sourcegraph

| Detail | Value |
|--------|-------|
| **Integration type** | Official MCP (HTTP with OAuth DCR) |
| **Transport** | HTTP |
| **Auth** | OAuth (auto) or Access Token |

### Setup for Claude Code

```bash
# OAuth (auto-authenticates via Dynamic Client Registration)
claude mcp add --transport http sourcegraph \
  https://sourcegraph.example.com/.api/mcp

# With access token (for instances without OAuth DCR)
claude mcp add --transport http sourcegraph \
  https://sourcegraph.example.com/.api/mcp \
  --header "Authorization: token YOUR_ACCESS_TOKEN"
```

**Capabilities:** Code search (exact + semantic), file reading with line ranges, symbol definition lookup, cross-repository search. Particularly valuable for large codebases.

**CLI Fallback:** `src` — Sourcegraph's official CLI for code search and batch changes.

---

## 29 · 🔶 Perforce (Helix Core / P4)

| Detail | Value |
|--------|-------|
| **Integration type** | ⚠️ Community-supported (published by Perforce, not officially maintained) |
| **Transport** | stdio |
| **Auth** | P4 credentials (P4PORT, P4USER, P4CLIENT) |

### Setup for Claude Code

```bash
# Using Cocoon-AI community server (npm-based, easier)
npm install -g @cocoon-ai/mcp-perforce
claude mcp add perforce -- @cocoon-ai/mcp-perforce

# Using Perforce's p4mcp-server (Python, requires p4python)
claude mcp add perforce \
  --env P4PORT=ssl:perforce.example.com:1666 \
  --env P4USER=your_username \
  --env P4CLIENT=your_workspace \
  -- python -m p4mcp_server --readonly --allow-usage
```

> 💡 The `--readonly` flag is recommended for safety.

**CLI Fallback:** `p4` — Perforce's native command-line client.

---

# Appendix · Quick Reference Matrices

## 🗂️ Project Management Tools

| Tool | MCP Status | Type | Transport | Auth | Setup Effort |
|------|:----------:|------|-----------|------|:------------:|
| **Linear** | ✅ Official | Plugin + Cloud | HTTP | OAuth | 🟢 Low |
| **Jira** | ✅ Official | Remote (Atlassian) | SSE/HTTP | OAuth 2.1 | 🟢 Low |
| **Asana** | ✅ Official | Remote | SSE | OAuth | 🟡 Medium |
| **Monday.com** | ✅ Official | Remote + Local | HTTP/stdio | OAuth/Token | 🟢 Low |
| **Shortcut** | ✅ Official | Local (npx) | stdio | API Token | 🟢 Low |
| **Azure DevOps** | ✅ Official (Microsoft) | Local (npx) | stdio | Azure creds | 🟢 Low |
| **ClickUp** | ✅ Official | Remote | HTTP | OAuth | 🟢 Low |
| **Notion** | ✅ Official + Plugin | Both | HTTP/stdio | OAuth/Token | 🟢 Low |
| **Trello** | ⚠️ Community only | Local (npx) | stdio | API Key+Token | 🟡 Medium |

## 📚 Documentation Tools

| Tool | MCP Status | Type | Transport | Auth | Setup Effort |
|------|:----------:|------|-----------|------|:------------:|
| **Coda** | ✅ Official (claude.ai) | Cloud connector | N/A | OAuth | 🟢 Low |
| **Confluence** | ✅ Official (Atlassian) | Remote | SSE/HTTP | OAuth 2.1 | 🟢 Low |
| **Google Docs** | ⚠️ Community | Local (npx) | stdio | OAuth 2.0 | 🟡 Medium |
| **SharePoint** | ✅ Official (multiple) | Varies | Varies | Entra ID | 🔴 High |
| **Notion** | ✅ Official + Plugin | Both | HTTP/stdio | OAuth/Token | 🟢 Low |
| **GitBook** | ✅ Official (built-in) | Remote | HTTP | None (public) | 🟢 Very Low |
| **Slab** | ❌ None | N/A | N/A | API Token | 🔴 High (custom) |
| **Outline** | ⚠️ Community | Local (npx) | stdio | API Key | 🟢 Low |
| **Slite** | ⚠️ Community | Local (npx) | stdio | API Key | 🟢 Low |
| **Docusaurus** | ⚠️ Community/Filesystem | Local | stdio | None | 🟢 Low |

## 💻 Code Management Tools

| Tool | MCP Status | Type | Transport | Auth | CLI Fallback |
|------|:----------:|------|-----------|------|:------------:|
| **GitHub** | ✅ Official | Local (Docker/npx) | stdio | PAT | `gh` |
| **GitLab** | ✅ Official (18.6+) | Remote (built-in) | HTTP | PAT | `glab` |
| **Bitbucket** | ⚠️ Community only | Local (npx) | stdio | App Password | REST API |
| **Azure DevOps** | ✅ Official (Microsoft) | Local (npx) | stdio | Azure creds | `az devops` |
| **Gitea** | ✅ Official | Local (Go/binary) | stdio | Access Token | `tea` |
| **Sourcegraph** | ✅ Official | Remote | HTTP | OAuth/Token | `src` |
| **Perforce** | ⚠️ Community-supported | Local (Python) | stdio | P4 creds | `p4` |

---

## 📖 Official Documentation Quick Reference

| Resource | URL |
|----------|-----|
| **Claude Code Overview** | [docs.anthropic.com/en/docs/claude-code/overview](https://docs.anthropic.com/en/docs/claude-code/overview) |
| **MCP Setup & Configuration** | [docs.anthropic.com/en/docs/claude-code/mcp](https://docs.anthropic.com/en/docs/claude-code/mcp) |
| **CLAUDE.md & Memory** | [docs.anthropic.com/en/docs/claude-code/memory](https://docs.anthropic.com/en/docs/claude-code/memory) |
| **Installation & Setup** | [docs.anthropic.com/en/docs/claude-code/setup](https://docs.anthropic.com/en/docs/claude-code/setup) |
| **Agent SDK (MCP in code)** | [docs.anthropic.com/en/docs/claude-code/sdk](https://docs.anthropic.com/en/docs/claude-code/sdk) |

---

*Created by RedBlue AI Consulting · [red-blue.ai](https://red-blue.ai)*