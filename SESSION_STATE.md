# SESSION_STATE.md — APT Central Command
# READ THIS FIRST. Every session. Every agent.
# Last updated: 2026-06-28

---

## FEATURE FREEZE — ACTIVE

**No new features. No UI redesigns. No new n8n workflows. No schema changes outside approved recovery scope. No speculative refactors.**

All agents acknowledge freeze. Any non-recovery work is BLOCKED pending all Phase 0–5 gates verified.

Emergency production fixes only, with explicit Claude Code approval.

---

## CURRENT STATE

```yaml
branch: main
phase: PHASE_0 — Foundational Setup
program: Audit Recovery (6-phase gated program)
status: IN_PROGRESS — TC-PURGE-001 + TC-AUDIT-002 MERGED (638b944f, 2026-06-28)
freeze: ACTIVE
last_commit: 638b944f
```

---

## SYSTEM BASELINES (Measured 2026-06-26)

```yaml
tests:
  count: 203
  files: 24
  pass_rate: 100%
  duration: 34.02s

coverage:
  statements: 79.43%
  branches: 81.20%
  functions: 77.58%
  lines: 84.13%

next_js_version: "16.2.6"  # PHANTOM — must pin to 15.x (Phase 2)
typescript: clean  # 0 errors at last merge

vercel_runtime_errors_7d:
  current_deployment: ~0 active errors (clean since 2026-06-25)
  historical_storm: 4,000+ errors from bad deployment dpl_B2nqjhvZyHxRiZNbJAtqnD3Bp58j
    root_cause: NeonDbError password authentication failed — wrong DATABASE_URL during infra migration 2026-06-21→23
    status: RESOLVED (deployment retired)
  active_issues:
    - "Missing Google AI API Key" on /api/webhooks/n8n/gmail (count=4, 2026-06-24, deployment dpl_7M6sAPwsY2t5XWjni1HSrXqNXw5s)
    - "Vercel timeout 300s" on /api/gas (count=1, 2026-06-25) — GAS instability; Cloudflare Email Routing now handles inbound (WF-006 done)

uptime_7d: NOT_YET_MEASURED  # UptimeRobot not yet configured (Phase 3 gate)
rollback_proven: NOT_YET_PROVEN  # Phase 0 gate — must do rollback drill before Phase 1

known_gas_call_paths:
  - src/auth.ts → fetchStaffPermissions() → NEXT_PUBLIC_DASHBOARD_API_URL
  - src/app/api/gas/route.ts → NEXT_PUBLIC_DASHBOARD_API_URL
  - src/app/api/comms/[jobId]/route.ts:53 → NEXT_PUBLIC_DASHBOARD_API_URL

critical_vulns:
  - NEXT_PUBLIC_ variables pervasive: 200 symbols across 68 files (requires rigorous scrubbing)
  - NEXT_PUBLIC_DASHBOARD_API_URL exposed in server-only context (Sentinels/worker.js proxy)
  - localStorage tech session (apt_tech_session in tech-pwa/src/lib/auth.ts) — XSS-exploitable
  - Single DEV_BYPASS_AUTH guard (NODE_ENV + VERCEL_ENV only)
  - Phantom Next.js 16.2.6 — unverified package ecosystem
  - Migration not gated (build = next build only; db:migrate runs manually)
  - n8n owns event memory (not outbox-consumed)
  - INTAKE_COMMS_ENABLED ghost flag (zero code gates)
  - 138 WOs FSM-dead in prod

deployment:
  platform: Vercel (linkstream-hub/central-command)
  db: Neon Postgres
  auto_deploy: LIVE (merge to main → READY ~90s)
  vercel_cli_deploy: works for forced deploys
  migrations: manual (must fix in Phase 2)

env_notes:
  - VPN must be OFF for CLI sessions
  - GITHUB_TOKEN must be unset before gh commands
  - NEVER answer YES to vercel env pull (wipes .env.local)
  - NEXT_PUBLIC_DASHBOARD_API_URL is server-only — must rename (Phase 1)
```

---

## 6-PHASE RECOVERY PROGRAM

**Canonical plan:** `C:\PTOW\1_APT_Central_Command\IMPLEMENTATION_PLAN.md`

Each phase gates the next. No phase begins until prior phase gates are ALL confirmed true.

### Phase 0 — Foundational Setup & Tool Integrations
_Dependency trigger: Plan approval (DONE). No code changes except emergency fixes._

Gates:
- [x] Rollback procedure tested and proven (< 5 mins) — DONE 2026-06-29 (sub-second, Vercel Instant Rollback)
- [x] Foundational docs created and approved — DONE (KNOWN_ISSUES, SYSTEM_OF_RECORD, ENVIRONMENT_MAP, AUTH_MODEL, ACTIVE_WORKFLOWS, DEPLOYMENT, OWNER_MANUAL, RUNBOOK, AGENT_PLAYBOOK, RISK_REGISTER, ASSUMPTION_LEDGER, EVIDENCE_REGISTER, DATA_INTEGRITY_AUDIT)
- [x] Shift-Left tools: UploadThing MERGED (PR #25, 2319af8f) · Cloudflare Email (WF-006, f0af7347) · Auth (Clerk/Deputy — decision pending docs/AUTH_DECISION.md)
- [x] shadcn/ui adopted for all new Codex components — enforced in CODEX_FRONTEND_BRIEF.md
- [x] Agent governance files updated — TC-AUDIT-002 MERGED (638b944f): AGENTS.md, CLAUDE.md, AG.md, CODEX_FRONTEND_BRIEF.md, AGENT_PLAYBOOK, GATES.md, CORE_PROJECT_FILES.md
- [ ] Baselines measured: Sentry errors/day + 7-day uptime — PENDING
- [x] Task Card format enforced — .github/pull_request_template.md + AGENT_PLAYBOOK.md protocol live
- [x] PROJECT_STATUS.md created — MERGED (638b944f)
- [x] docs/AUTH_DECISION.md — Clerk selected — DONE 2026-06-29

### Phase 1 — Security & Auth Hardening
_Dependency trigger: All Phase 0 gates confirmed._

Gates:
- [ ] Zero secrets in client bundles/page source (NEXT_PUBLIC_ removed)
- [ ] API keys scoped and enforced at route level (401 bad key, 403 wrong route)
- [ ] DEV bypass requires dual guards (env check + DEV_BYPASS_SECRET)
- [ ] SyncQueue migrated from localStorage → IndexedDB (Dexie.js) — GAP-01
- [ ] Field auth token rotation on each verified request — GAP-02
- [ ] next-auth REMOVED (not just Clerk added alongside) — GAP-03
- [ ] NEXT_PUBLIC_VAPID_PUBLIC_KEY exempted from NEXT_PUBLIC_ sweep (VAPID public key is spec-public) + documented — GAP-04
- [ ] Gemini API key env var verified present in all deployment contexts — GAP-07
- [ ] ESLint no-empty-catch enforced; all catch blocks audited → structured log + Sentry capture
- [ ] lib/contracts/ Zod schemas established for all AG/Codex API seams
- [ ] PROJECT_STATUS.md live — Brandon dashboard active from Phase 1

### Phase 2 — CI/CD Safety & Pipeline Integrity
_Dependency trigger: All Phase 1 gates confirmed._

Gates:
- [ ] Next.js pinned to stable 15.x; full test suite passes
- [ ] Atomic migrations: prod DB migrates on prod deploy; preview builds isolated
- [ ] CI/CD blocks merge on failing unit/integration/E2E tests
- [ ] @ducanh2912/next-pwa verified compatible with Next.js 15 (or migrated to @serwist/next) — GAP-05
- [ ] Behavioral parity checklist complete for every library replacement (all old flows verified with new)

### Phase 3 — Core Dispatch Loop Proof
_Dependency trigger: All Phase 2 gates confirmed._

Gates:
- [ ] Core loop E2E Playwright test passes in CI (intake → WO → dispatch → assign → clock in/out → completion)
- [ ] 10 manual jobs completed successfully without GAS fallback
- [ ] /api/health live and monitored by UptimeRobot
- [ ] Push notifications Task Card complete — subscribe → Neon → send working — GAP-04
- [ ] 138 FSM-dead WOs: per-WO classification table (old→new state→justification) CC-reviewed + Brandon-approved before script runs; post-run query confirms 0 FSM-dead
- [ ] Synthetic heartbeat deployed: full core loop every 15 min; /api/health/synthetic-last-run monitored by UptimeRobot

### Phase 4 — Event Durability & Codebase Cleanup
_Dependency trigger: All Phase 3 gates confirmed._

Gates:
- [ ] domain_events outbox in Neon; events survive infrastructure restarts
- [ ] Vercel cron outbox poller consuming pending events (Task Card required) — GAP outbox-poller
- [ ] Ghost flags and orphaned routes completely removed
- [ ] Code.js reduced to <= 200 lines

### Phase 5 — Owner Enablement & Auxiliary Tooling
_Dependency trigger: All Phase 4 gates confirmed._

Gates:
- [ ] /ops dashboard live
- [ ] Deferred auxiliary tools evaluated (Inngest/Trigger.dev, Metabase, Crater/Stripe, Unleash)
- [ ] Owner signs off on stability and runbooks
- [ ] Feature resumption gate: all prior gates green → controlled feature growth behind feature flags

---

## TASK CARD TEMPLATE (Required for every AG/Codex task)

```markdown
Task:
Business reason:
User-visible outcome:
Files allowed to change:
Files forbidden to change:
Database changes:
API changes:
Auth changes:
n8n/GAS changes:
New dependency:
RED test criteria:
GREEN verification:
Rollback plan:
Definition of done:
Assumptions:
Evidence required:
```

Incomplete Task Card = BLOCKED. No exceptions.

---

## OPEN ITEMS (from fix/s171-field-fixes — Phase 3 candidates)

These were in-progress before freeze. Slot into Phase 3 after Phase 0-2 gates pass:
- Camera upload route fix (A)
- Push subscribe → Neon (B)
- normalizeLegacyStatus() edge cases (P0.2)
- Lapham Apple Mail forward detection (uncommitted, diagnosed)

---

## AGENT BOUNDARIES

```
Claude Code: lead / gate / reviewer / sole Task Card creator / sole merge authority
AG: backend executor — API, domain, DB, n8n (inside approved Task Cards only)
Codex: frontend only — /app/** pages/components/CSS; uses shadcn/ui for all new components
omp: bounded single-file scout tasks only; never cross-domain
```

No agent approves own work. No merge without explicit "Clear to merge" from Claude Code.

---

## RULES (always active)

- No GAS new code ever
- No AI attribution in commits/PRs
- No client-side secrets
- No JavaScript-readable session tokens
- No migration without env gating
- No feature work until all Phase 0-5 gates green
- Karpathy: state root cause, state exact files, minimal change, run once, verify
- Pocock TDD: RED → GREEN → REFACTOR; no prod code without failing test first
