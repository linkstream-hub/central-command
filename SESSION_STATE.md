# SESSION STATE
# Overwrite completely at session close. Never append. This is the handoff.

---

## SESSION: S153 (ACTIVE → 2026-06-18)

---

## SYSTEM STATE

```yaml
status:     LIVE
url:        https://dispatch.aptmaintenanceinc.com
test-creds: badge=1 PIN=1234
sandbox:    http://localhost:4141 (Docker — dev Neon branch)
```

---

## GIT STATE

```yaml
branch:  main (fix/dashboard-stats-semantics merged PR #2670 → main)
active:  main
vercel:  BLOCKED — White-Jesus GitHub account flagged
         RESOLUTION: Linkstream infra restructure (new GitHub + Vercel under Linkstream entity)
         interim workaround: vercel deploy CLI (answer NO to env pull prompt)
```

---

## INFRA RESTRUCTURE — NEXT IMMEDIATE ACTION

```yaml
entity:   Linkstream (formed 2026-06-18)
status:   NOT YET STARTED — execute before Phase 17

sequence:
  1. GitHub: new account + org under Linkstream → transfer central-command repo
  2. Neon:   new free account under Linkstream (sentinel pattern removed = free tier OK)
  3. Railway: new account → redeploy n8n only
              export: tools/n8n/workflows/ (already done)
              re-create 5 credentials: Gmail, Neon Postgres, Gemini API Key, Resend, CC API Key
              update N8N_API_URL in: Vercel env, ~/.claude.json MCP, .env.local, n8n memory
  4. Vercel: new account under Linkstream → connect new GitHub org → restore auto-deploy
  5. Brandon action: APT GCP project → Gemini API key → swap n8n credential (zero code changes)

resource-controls (before any Railway deploy):
  - 600MB hard memory limit per service
  - n8n errorWorkflow wired before first workflow activation
  - No 24/7 DB polling — max hourly, business hours only
```

---

## PHASE SEQUENCE — LOCKED 2026-06-18

```yaml
# Architectural decisions from S153 grilling session. Non-negotiable.

pre-phase-17:
  - design-an-interface on JobStateService  (parallel subagents, before any code)
  - codebase-design on domain/job/ module   (deep-module principle, narrow index.ts API)
  - request-refactor-plan for GAS exit      (files GitHub issue, tiny commits, replaces Phase 21 monolith)
  - install eslint-plugin-import            (needed for ADR-014 domain boundary rule)

phase-17:  Job State Machine Seam (TDD-first)
  branch:   feat/phase-17-job-state-machine
  adr:      ADR-010 + ADR-014
  approach: RED-GREEN-REFACTOR — job-state.test.ts written before job-state.ts exists
  location: tech-pwa/src/domain/job/job-state.ts  (ADR-014 domain boundary)
  port:     open-fsm VALID_TRANSITIONS map + test suite (do not rebuild from scratch)
  patterns: Beveren FSM — typed transition events, Result<T,E>, DAL injection, test fixtures
  tasks:
    1. eslint-plugin-import + domain boundary rule (ADR-014)
    2. domain/job/ directory + index.ts narrow API
    3. RED: write job-state.test.ts from ADR-010 transition table spec
    4. GREEN: implement job-state.ts (port open-fsm)
    5. REFACTOR: wire 3 API routes to seam (PATCH /jobs/:id, POST /clock-in, POST /job/complete)
    6. tsc --noEmit → diff → post to Claude Code → STOP
    7. test sprint → post results → STOP
    8. merge only after Claude Code clear

phase-18:  Event Publishing Seam (TDD-first)
  adr:      ADR-011
  approach: TDD — outbox tests before outbox implementation
  ref:      inbox-zero intake architecture (email dedup + routing patterns)

phase-19:  Observability
  tasks:    n8n errorWorkflow → Discord #n8n-execution
            Sentry tracesSampleRate → 0.5 + source maps on deploy
            Discord server structure (see infra restructure plan)

phase-20:  Auth Lint Rule
  tasks:    ESLint rule blocking useSession() in /app/jobs/** paths
            ESLint rule blocking getSession() in /app/live/** paths

phase-21:  GAS Cutover
  approach: request-refactor-plan GitHub issue (tiny commits, not monolithic sprint)
            shadow-writes → shadow-reads → cutover → 30-day archive → delete
```

---

## ARCHITECTURE LOCKED — S153

```yaml
domain-layer:    tech-pwa/src/domain/ — pure business logic, no Next.js imports
                 enforced by ESLint (ADR-014)
                 narrow public API via index.ts (Pocock deep-module principle)
dal-injection:   domain/ accepts DAL interface, not concrete imports → unit-testable
result-type:     Result<T,E> — no throws in domain logic, callers pattern-match
branded-ids:     JobId, TechId, PropertyId — compiler catches wrong-ID bugs
discriminated-u: JobState discriminated union — invalid states unrepresentable
zod-boundaries:  all API route inputs validated with Zod schemas
tdd-standard:    every phase from 17 onward ships tests-first — non-negotiable
adrs:            ADR-010 amended (domain/ location), ADR-014 added (boundary rule)
```

---

## POCOCK SKILLS — INSTALLED + READY

```yaml
installed:  2026-06-18 via npx skills@latest add mattpocock/skills (34 skills, 71 agents)
use-before-phase-17:
  - design-an-interface  → JobStateService interface (parallel subagents)
  - codebase-design      → domain/job/ module shape
  - request-refactor-plan → GAS exit GitHub issue
use-per-phase:
  - tdd                  → red-green-refactor each phase
  - domain-modeling      → ADR + glossary as we go
  - grilling             → stress-test plans before building
  - setup-pre-commit     → Husky + lint-staged + tsc hook
```

---

## GAS STATE

```yaml
Code.js:         v96
TechPWA.gs:      v102 (handleLogin DEPRECATED | handleChangePin still active)
DashboardAPI.gs: v43
migration:
  phase-15: MERGED c33f74c PR #2635
  phase-16: MERGED af1a359 PR #2651 — prod LIVE
  phase-17: JOB STATE MACHINE SEAM (TDD-first) — see phase sequence above
            PREVIOUS scope (TechPWA.gs cutover) → moved to Phase 21 via request-refactor-plan
catalog:   docs/GAS_MIGRATION_SCOPE.md
hard-blockers:
  - Gmail OAuth for workorder@ in GCP (Brandon action) — gates Code.js email polling
  - TOM redesign (separate project) — gates time-off functions in TechPWA.gs
```

---

## VERCEL DEPLOY

```yaml
interim:  vercel deploy CLI — answer NO to env pull (wipes .env.local with prod values)
fix:      Linkstream GitHub → Linkstream Vercel → auto-deploy restored
warning:  NEVER answer Yes to env pull prompt
```

---

## LOCAL DEV STATE

```yaml
sandbox:    Docker at localhost:4141 — working
env-local:  DATABASE_URL:              neon dev POOLED — ep-holy-waterfall-akwxx49b
            DATABASE_URL_UNPOOLED:     neon dev UNPOOLED — ep-holy-waterfall-akwxx49b
            DATABASE_URL_PREVIEW:      neon preview POOLED — ep-holy-glade-aktl2mly
            AUTH_SECRET:               locally generated (dev only)
            NEXTAUTH_URL:              http://localhost:4141
            NEXT_PUBLIC_SANDBOX_MODE:  false (.env.local) / true (.env.sandbox)
            N8N_COMPLIANCE_WEBHOOK_URL: set in Vercel Prod+Preview
            N8N_FLAG_GATE_WEBHOOK_URL:  set
            DASHBOARD_API_KEY:         verify matches GAS Script Properties
```

---

## KEY ARCHITECTURAL FACTS

```yaml
neon-write-path:   WRITE_PATH_NEON_ONLY=true | Sheets = read-only archive
auth-tech:         badge + SHA-256 PIN → UUID session_token in Neon | 26 active techs have pinHash
auth-staff:        Google OAuth next-auth v5 (@aptmaintenanceinc.com only)
neon-project:      lively-cell-80446221 (moving to Linkstream account)
neon-dev-branch:   br-muddy-flower-ak85a9jc | compute: ep-holy-waterfall-akwxx49b
playwright:        globalSetup uses DATABASE_URL (not DATABASE_URL_TEST); rate-limit bypass in NODE_ENV=test
team:              Claude Code (lead/gate) → AG (co-lead builder, GSD) → omp (jr dev, bounded tasks) → Codex
shadow-sync:       clock events + job status already sync to Neon — Phase 17 does NOT flip (now Job State Machine)
graphify:          graphify update . → pipx binary (0.8.38) → graphify-out/ — 20,660 nodes current
```
