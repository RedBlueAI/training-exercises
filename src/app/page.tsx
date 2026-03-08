import Link from 'next/link';

const sessions = [
  {
    number: 3,
    title: 'Environment Setup & Configuration',
    description: 'Install Claude Code, create CLAUDE.md, configure MCP servers, run your first AI-enhanced session.',
    exercises: [
      'Install Claude Workflow System plugin',
      'Create and customize CLAUDE.md for this project',
      'Configure GitHub MCP server',
      'Run your first /StartSession',
    ],
    status: 'setup',
    icon: '🔧',
  },
  {
    number: 4,
    title: 'Session Start — Context-Aware Development',
    description: 'Master the /StartSession workflow with different focus modes and MCP integrations.',
    exercises: [
      'Practice StartSession with different focus modes',
      'Optimize MCP configuration for faster startup',
      'Context switching between projects',
      'Inspect session plans and state files',
    ],
    status: 'workflow',
    icon: '🚀',
  },
  {
    number: 5,
    title: 'Assisted Coding Fundamentals',
    description: 'Use the three coding modes (Refactor, Recommend, Brainstorm) on real code in this project.',
    exercises: [
      '🔧 Refactor: Clean up the legacy service request handler',
      '🧭 Implement: Build the AI Triage feature with Groq',
      '💡 Brainstorm: Debug the intermittent scheduling bug',
    ],
    status: 'code',
    icon: '💻',
    highlight: true,
  },
  {
    number: 6,
    title: 'Session End & Quality Gates',
    description: 'Close the development loop with /EndSession, code review, and security audits.',
    exercises: [
      'Make code changes and commit properly',
      'Run /ReviewCode on your changes',
      'Run /RunSecurityAudit',
      'Execute /EndSession with quality gates',
    ],
    status: 'quality',
    icon: '✅',
  },
  {
    number: 7,
    title: 'PRD Validation & Technical Feasibility',
    description: 'Validate a sample PRD using the planning workflow commands.',
    exercises: [
      '/PRDIntake — Import the sample PRD',
      '/PRDValidate — Score completeness and find gaps',
      '/PRDEnrich — Add technical context from codebase',
      '/PRDFeasibility — Assess implementation effort',
    ],
    status: 'planning',
    icon: '📋',
  },
  {
    number: 8,
    title: 'Work Breakdown & Cycle Planning',
    description: 'Break down validated PRDs into work items and plan a development cycle.',
    exercises: [
      '/Breakdown — Create sized work items',
      '/CyclePlan — Plan a 2-week cycle with capacity',
      'Review and adjust scope',
      'Practice cycle commitment',
    ],
    status: 'planning',
    icon: '📊',
  },
  {
    number: 10,
    title: 'Security, Quality & Governance',
    description: 'Hunt for deliberately planted security vulnerabilities in this codebase.',
    exercises: [
      'Run /RunSecurityAudit on the full codebase',
      'Find SQL injection vulnerabilities',
      'Identify hardcoded secrets and auth bypasses',
      'Document findings and recommended fixes',
    ],
    status: 'security',
    icon: '🔒',
    highlight: true,
  },
];

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    setup: 'bg-blue-100 text-blue-800',
    workflow: 'bg-purple-100 text-purple-800',
    code: 'bg-green-100 text-green-800',
    quality: 'bg-amber-100 text-amber-800',
    planning: 'bg-indigo-100 text-indigo-800',
    security: 'bg-red-100 text-red-800',
  };
  const labels: Record<string, string> = {
    setup: 'Setup',
    workflow: 'Workflow',
    code: 'Coding',
    quality: 'Quality',
    planning: 'Planning',
    security: 'Security',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function Home() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          🏗️ AI Tool Assistance System — Training Exercises
        </h1>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Welcome to the hands-on exercise hub. Each session below links to exercises
          you&apos;ll complete during the training program. Start with Session 3 (your environment
          setup) and progress through the sessions in order.
        </p>
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>📌 Note:</strong> Sessions 1-2 are philosophy and roles — no code exercises.
            Session 9 is the PO track. Session 11 is metrics/KPIs. Session 12 is the capstone demo.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sessions.map((session) => (
          <div
            key={session.number}
            className={`bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow ${
              session.highlight ? 'ring-2 ring-blue-200' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{session.icon}</span>
                <h2 className="text-lg font-semibold text-slate-900">
                  Session {session.number}
                </h2>
              </div>
              {getStatusBadge(session.status)}
            </div>
            <h3 className="text-base font-medium text-slate-700 mb-2">
              {session.title}
            </h3>
            <p className="text-sm text-slate-600 mb-4">{session.description}</p>
            <ul className="space-y-1 mb-4">
              {session.exercises.map((exercise, i) => (
                <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="text-slate-500 mt-0.5">•</span>
                  {exercise}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-400">
              📁 <code className="bg-slate-100 px-1 rounded">exercises/session-{session.number}/</code>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-slate-100 rounded-lg">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">📚 Ebooks &amp; Guides</h2>
        <p className="text-sm text-slate-600 mb-4">
          Reference docs for Session 3 (environment setup). Links open the documents on GitHub.
        </p>
        <ul className="space-y-2 mb-6">
          <li>
            <a
              href="https://github.com/RedBlueAI/training-exercises/blob/main/docs/ebooks/session%203/claude_md-best-practices.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              CLAUDE.md best practices
            </a>
          </li>
          <li>
            <a
              href="https://github.com/RedBlueAI/training-exercises/blob/main/docs/ebooks/session%203/setting-up-mcp.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              Setting up MCP
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-12 p-6 bg-slate-100 rounded-lg">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">🗺️ Application Pages</h2>
        <p className="text-sm text-slate-600 mb-4">
          This training app simulates a field service management dashboard. Explore these pages as part of your exercises:
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: '/dashboard', icon: '📊', label: 'Dashboard' },
            { href: '/service-requests', icon: '🔧', label: 'Service Requests' },
            { href: '/technicians', icon: '👷', label: 'Technicians' },
            { href: '/ai-triage', icon: '🤖', label: 'AI Triage' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <span className="text-lg">{item.icon}</span>
              <span className="ml-2 font-medium text-slate-700">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
