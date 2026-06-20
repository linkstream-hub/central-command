# SESSION STATE
# Overwrite completely at session close. Never append. This is the handoff.

---

## SESSION: S157 CLOSE (2026-06-20)

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
branch:  main (all PRs merged — clean)
active-feature: none

merged-this-session:
  PR #3: refactor/c1-job-update-module — C1 JobUpdate deep module
  PR #4: chore/lean-agent-stack — GSD purge, skill installs, BottomNav fix
  PR #5: fix/remove-leaked-html-file — html.txt removed + gitignored

history-rewrite: COMPLETE
  - git filter-repo purged tech-pwa/html.txt from all 1019 commits
  - force pushed to main (force push re-locked after)
  - secret scanning alerts will auto-close within 24h

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
  branch-protection:
    require-pr:            ON
    require-status-checks: OFF — pending first CI run
    require-linear-history: ON
    allow-force-pushes:    OFF (re-locked)
    allow-deletions:       OFF
  DATABASE_URL: added to GitHub Actions secrets (Neon dev pooled)
  CI-status-check: add "CI" to required checks AFTER first Actions run on a PR
  PAT:    in Brandon's possession
  NOTE:   gh CLI authenticated as White-Jesus — NOT a member of linkstream-hub
          workaround: PRs created via Node.js + git credential fill token
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

cleanup-pending (Brandon):
  - Remove-Item C:\Users\Aldrick\aptcc3_dump.dump
  - Remove-Item C:\PTOW\1_APT_Central_Command\tech-pwa\.env.new-neon
  - Remove-Item C:\PTOW\1_APT_Central_Command\tech-pwa\drizzle.migrate-new.config.ts

auto-deploy-pending:
  - Install Vercel GitHub App on linkstream-hub org → enables push-triggered deploys
  - Until then: vercel deploy --prod from tech-pwa/ (VPN OFF)
```

---

## NEXT SESSION PRIORITIES

```yaml
1. NEXT-PR: Phase 18 — EventBusSideEffectExecutor (AG task)
   spec:     ADR-011 (Event Publishing Seam)
   approach: TDD-first — outbox tests before implementation
   file:     lib/side-effects/event-bus-executor.ts
   note:     zero changes to job-update.ts — port already designed for this swap

2. CI-GATE: After Phase 18 PR opens, first CI run fires
   action:   go to branch protection → add "CI" status check → save
   then:     enable "Require status checks to pass before merging"

3. C2 (deferred): delete lib/job-transitions.ts
   blocked:  resolveJobStatus() still called in legacy path — unblock in Phase 21

4. Vercel auto-deploy: install GitHub App on linkstream-hub org
```

---

## PHASE 17 — MERGED

```yaml
branch:   feat/phase-17-job-state-machine
pr:       #2 — MERGED

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

## C1 ARCHITECTURE REFACTOR — MERGED

```yaml
branch:   refactor/c1-job-update-module
pr:       #3 — MERGED

delivered:
  - job-update.ts — deep module, 6 files changed
  - route.ts PATCH shrinks 212L → 26L
  - 10 integration tests (real Neon DB)
  - SideEffectExecutor port wired (email-executor + fake-executor)

deferred-flags:
  F1 (Phase 18): Extract SideEffectExecutor interface to lib/side-effects/index.ts
  F2 (Phase 21): Add tenantName/address to SEND_CONFIRMATION effect type
```

---

## VPN — OPERATIONAL RULE

```yaml
rule:     VPN OFF before any CLI session (git, vercel, gh, node, claude, AG, omp, Codex)
reason:   Paris IP caused GitHub account flag + Vercel block
fix:      Toggle VPN off → do CLI work → toggle back on
```

---

## PHASE SEQUENCE — LOCKED

```yaml
phase-17:  MERGED PR #2
phase-18:  Event Publishing Seam (TDD-first) — NEXT
  adr:      ADR-011
  approach: TDD — outbox tests before outbox implementation
phase-19:  Observability — n8n errorWorkflow → Discord, Sentry tracesSampleRate
phase-20:  Auth Lint Rule — ESLint blocking useSession()/getSession() in wrong paths
phase-21:  GAS Cutover — shadow-writes → shadow-reads → cutover → archive → delete
```

---

## ARCHITECTURE LOCKED — S153

```yaml
domain-layer:    tech-pwa/src/domain/ — pure business logic, no Next.js imports
                 enforced by ESLint (ADR-014)
dal-injection:   domain/ accepts DAL interface → unit-testable
result-type:     Result<T,E> — no throws in domain logic
branded-ids:     JobId, TechId, PropertyId
discriminated-u: JobState discriminated union
zod-boundaries:  all API route inputs validated with Zod schemas
tdd-standard:    every phase from 17 onward ships tests-first — non-negotiable
fsm:             JOB_STATE_MACHINE (8 arcs) + createJobStateService factory
```

---

## GAS STATE

```yaml
Code.js:         v96
TechPWA.gs:      v102 (handleLogin DEPRECATED | handleChangePin still active)
DashboardAPI.gs: v43
migration:
  phase-15: MERGED
  phase-16: MERGED — prod LIVE
  phase-17: MERGED
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
neon-project:      ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream)
neon-dev-branch:   br-muddy-flower-ak85a9jc | compute: ep-holy-waterfall-akwxx49b
playwright:        globalSetup uses DATABASE_URL (not DATABASE_URL_TEST)
team:              Claude Code (lead/gate) → AG (co-lead builder) → omp (jr dev) → Codex (frontend)
shadow-sync:       clock events + job status already sync to Neon
graphify:          graphify update . → pipx binary (0.8.38) → graphify-out/
gh-cli:            authenticated as White-Jesus — NOT linkstream-hub member
                   workaround: node + git credential fill token for REST API PR creation
```
