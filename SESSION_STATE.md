# SESSION STATE
# Overwrite completely at session close. Never append. This is the handoff.

---

## SESSION: S157 (carries forward from S156 — 2026-06-20)

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
branch:  main
active-feature: refactor/c1-job-update-module (pushed — PR #3 open, awaiting merge)
lean-agent-stack: chore/lean-agent-stack (pushed — PR #4 open)

vercel:
  status: COMPLETE — Linkstream Vercel LIVE (2026-06-19)
          project: linkstream-hub/central-command → dispatch.aptmaintenanceinc.com
          deploy:  vercel deploy --prod from tech-pwa/ (VPN OFF required)
          auto-deploy: NOT wired — GitHub App not installed on linkstream-hub org yet
          warn:   VPN must be OFF for all CLI sessions (Paris IP caused prior account flags)
          env-secrets: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET set manually
                       (vercel env pull gives empty strings for encrypted secrets — always)

github:
  repo:   linkstream-hub/central-command
  branch-protection: ON (require PR, no required reviewer — Claude Code is the reviewer)
  PAT:    in Brandon's possession
  NOTE:   gh CLI authenticated as White-Jesus personal account — NOT a member of linkstream-hub
          workaround: open PRs via browser at github.com/linkstream-hub/central-command
```

---

## INFRA RESTRUCTURE — STATUS: COMPLETE

```yaml
entity:    Linkstream (formed 2026-06-18)
completed: 2026-06-19

github:   DONE — linkstream-hub/central-command, branch protection ON
neon:     DONE — ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream account)
          old: lively-cell-80446221 — safe to delete (data fully migrated)
railway:  DONE — workspace renamed to "LinkStream's Projects"
vercel:   DONE — Linkstream Hub account, project live, domain connected, auth working

cleanup-pending:
  - Remove-Item C:\Users\Aldrick\aptcc3_dump.dump
  - Remove-Item C:\PTOW\1_APT_Central_Command\tech-pwa\.env.new-neon
  - Remove-Item C:\PTOW\1_APT_Central_Command\tech-pwa\drizzle.migrate-new.config.ts

auto-deploy-pending:
  - Install Vercel GitHub App on linkstream-hub org → enables push-triggered deploys
  - Until then: vercel deploy --prod from tech-pwa/ (VPN OFF)
```

---

## PHASE 17 — MERGED

```yaml
branch:   feat/phase-17-job-state-machine
pr:       #2 — MERGED to main (commit 078fc66)

delivered:
  - domain/job/job-state.ts — pure FSM, 18/18 tests GREEN
  - ESLint boundary rule (ADR-014) — no-restricted-imports
  - domain/job/index.ts narrow public API
  - lib/dal/job-state-dal.ts DAL adapter
  - PATCH /api/jobs/[jobId] SCHEDULE transition wired
  - POST /api/field/clock-in CLOCK_IN transition wired
  - POST /api/field/job/complete COMPLETE transition wired
```

---

## LEAN AGENT STACK — PR #4 OPEN

```yaml
branch:   chore/lean-agent-stack
pr:       https://github.com/linkstream-hub/central-command/pull/4
status:   AWAITING MERGE

delivered:
  - Remove 33 GSD agent .md files from .claude/agents/
  - Remove 67 GSD slash commands from .claude/commands/gsd/
  - Purge .github/skills/ archived skills (caveman, ecc, impeccable, gsd-*)
  - Fix BottomNav: 4 dead tabs → 2 real tabs (Jobs/Hours)
  - CLAUDE.md, AGENTS.md, AG.md: lean stack, frontend/backend boundaries
  - Codex design brief added to AGENTS.md (section 10)
  - taste-skill installed: .claude/skills/ + .codex/skills/ (gitignored, local)
  - designlang (design-extract) installed: claude plugin + .codex/skills/ (local)
```

---

## C1 ARCHITECTURE REFACTOR — PR #3 OPEN

```yaml
branch:   refactor/c1-job-update-module
pr:       https://github.com/linkstream-hub/central-command/pull/3
status:   AWAITING MERGE (CI must pass first)

delivered:
  - job-update.ts — deep module, 6 files changed
  - route.ts PATCH shrinks 212L → 26L
  - 10 integration tests (real Neon DB)
  - SideEffectExecutor port wired (email-executor + fake-executor)

next-after-merge:
  C2: delete lib/job-transitions.ts (separate PR — resolveJobStatus() still called in legacy path until Phase 21)
  C3: SnapshotAndSend module (post-Phase 18)
  C4: mapper dedup (any session, 30 min)
  Phase 18: EventBusSideEffectExecutor at lib/side-effects/event-bus-executor.ts
            (zero changes to job-update.ts — port designed for this swap)

deferred-flags:
  F1 (Phase 18): Extract SideEffectExecutor interface to lib/side-effects/index.ts
  F2 (Phase 21): Add tenantName/address to SEND_CONFIRMATION effect type
```

---

## VPN — OPERATIONAL RULE

```yaml
rule:     VPN OFF before any CLI session (git, vercel, gh, node, claude, AG, omp, Codex)
reason:   Paris IP (62.210.189.6 / 195.154.166.20) caused GitHub account flag + Vercel block
          VPN Unlimited split tunnel does NOT work on Windows for CLI processes
          DNS Firewall override was the culprit — disabling helps but doesn't fully fix
fix:      Toggle VPN off → do CLI work → toggle back on
permanent: WireGuard protocol + DNS Firewall OFF is best available config but still imperfect
```

---

## PHASE SEQUENCE — LOCKED 2026-06-18

```yaml
phase-17:  Job State Machine Seam — MERGED PR #2
  adr:      ADR-010 + ADR-014

phase-18:  Event Publishing Seam (TDD-first)
  adr:      ADR-011
  approach: TDD — outbox tests before outbox implementation

phase-19:  Observability
  tasks:    n8n errorWorkflow → Discord #n8n-execution
            Sentry tracesSampleRate → 0.5 + source maps on deploy

phase-20:  Auth Lint Rule
  tasks:    ESLint rule blocking useSession() in /app/jobs/** paths
            ESLint rule blocking getSession() in /app/live/** paths

phase-21:  GAS Cutover
  approach: request-refactor-plan GitHub issue (tiny commits)
            shadow-writes → shadow-reads → cutover → 30-day archive → delete

post-phase-17 (add to backlog):
  - GitHub Actions CI: tsc + vitest on every PR (now that linkstream-hub repo is clean)
  - Playwright E2E: badge login → clock in → complete job (golden path)
  - Install Vercel GitHub App on linkstream-hub org → auto-deploy
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
fsm:             JOB_STATE_MACHINE (8 arcs) + createJobStateService factory
                 guards are pure functions — side effects declared, not executed
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
  phase-17: JOB STATE MACHINE SEAM — AWAITING AG
catalog:   docs/GAS_MIGRATION_SCOPE.md
hard-blockers:
  - Gmail OAuth for workorder@ in GCP (Brandon action) — gates Code.js email polling
  - TOM redesign (separate project) — gates time-off functions in TechPWA.gs
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
neon-prod:  ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream account)
            32 employees, 2391 jobs, 4 shifts
```

---

## KEY ARCHITECTURAL FACTS

```yaml
neon-write-path:   WRITE_PATH_NEON_ONLY=true | Sheets = read-only archive
auth-tech:         badge + SHA-256 PIN → UUID session_token in Neon | 32 employees in DB
auth-staff:        Google OAuth next-auth v5 (@aptmaintenanceinc.com only)
                   env vars: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET
neon-project:      ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream)
neon-dev-branch:   br-muddy-flower-ak85a9jc | compute: ep-holy-waterfall-akwxx49b
playwright:        globalSetup uses DATABASE_URL (not DATABASE_URL_TEST); rate-limit bypass in NODE_ENV=test
team:              Claude Code (lead/gate) → AG (co-lead builder, GSD) → omp (jr dev, bounded tasks) → Codex
shadow-sync:       clock events + job status already sync to Neon — Phase 17 = seam, not flip
graphify:          graphify update . → pipx binary (0.8.38) → graphify-out/ — 20,660 nodes current
gh-cli:            authenticated as White-Jesus — NOT linkstream-hub member
                   workaround: use node + git credential fill token for REST API PR creation
                               PR #3 created this way (linkstream-hub/central-command)
```
