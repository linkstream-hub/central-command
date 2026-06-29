# APT Central Command — Audit Recovery Implementation Plan
# Version: 2.0 — 2026-06-28
# Live status: SESSION_STATE.md
# Canonical source: this file

---

## PROGRAM DEFINITION

```yaml
type: Incident-grade forensic recovery
status: ACTIVE — Phase 0 in progress
freeze: ACTIVE — no features until all Phase 0–5 gates green
principle: Assume nothing. Prove everything. Fix only what was diagnosed.
law: Architecture names are not evidence. Only observed behavior counts.
```

---

## ROOT CAUSE STATEMENT

Prior lead dev = AI agent without merge gate. Result:
- All architectural vocabulary present (FSM, EventBus, RBAC, outbox, compliance)
- Implementations unverified under integration conditions
- Tests written by same agent that wrote code = circular validation
- GAS migration moved data and routes without proving identical results
- 138 WOs in FSM-dead state in production

Phase 3 = first real proof core loop functions. Everything before = stopping active damage.

---

## AGENT ROLES

```yaml
Claude Code: lead / gate / sole Task Card creator / sole merge authority
  - Creates every Task Card; no agent self-tasks
  - Runs ag-plan-reviewer on every auth/schema/cross-system plan before issuing
  - Issues "Clear to merge" only with full Evidence Package
  - Never implements; never rubber-stamps

AG: backend executor
  - /api/**, /domain/**, /lib/dal/**, /lib/schema/**, migrations, n8n
  - RED test before any code; tsc + vitest clean before posting diff
  - Never touches /app/**, never self-merges

Codex: frontend executor
  - /app/** only; shadcn/ui for all new components
  - Never touches /api/**, /domain/**, /lib/schema/**

omp: bounded single-file scout
  - Log analysis, single-file test generation, targeted lookups only
```

---

## CORE DISCIPLINE

```yaml
Karpathy:
  - State root cause, not symptom
  - State exact files before touching anything
  - Minimum code that solves the problem
  - One fix, run once, verify

Pocock TDD:
  - RED test before any production code
  - GREEN = minimal implementation only
  - REFACTOR only after GREEN + full suite passes

Evidence standard:
  - CI link + output
  - DB query result with row counts
  - Playwright run / screenshot
  - Sentry: 0 new errors 24h post-deploy
  - Rollback drill log (timed, < 5 min)
  - NOT: prose, "tests pass", "should work", "looks good"

Pre-specified evidence values (required in Task Card BEFORE work starts):
  - DB query: exact SQL + expected result (e.g., "SELECT status, count(*) → open=142, complete=1240")
  - Playwright: exact test name + assertion count expected to pass
  - Sentry: exact query + expected count = 0
  - Without pre-specified expectation, evidence cannot be verified — it's just a screenshot
```

---

## BANNED PHRASES (automatic BLOCK same as failed gate)

"should work" / "likely" / "probably" / "I assume" / "tests pass" (no output) / "looks good" / "I think" / "appears to" / "this will handle" / "done" (no artifact) / "fixed" (no reproduction proof) / "verified" (no command/log/link) / "no impact" (no scope analysis)

---

## RISK TIERS (set by CC on Task Card creation — agent cannot self-downgrade)

```yaml
Tier 0: doc-only
  card: 3 fields (what, why, file allowed)
  CI: markdown lint only
  evidence: diff only
  ag-plan-reviewer: no
  omp-scout: no
  red-team: no

Tier 1: low-risk, single-domain, no schema/auth
  card: standard minus red-team/omp
  CI: typecheck + targeted unit tests
  evidence: CI link + brief manual verification
  ag-plan-reviewer: no
  omp-scout: no
  red-team: no

Tier 2: standard (multi-file, API changes, non-auth)
  card: full
  CI: full suite
  evidence: full package
  complexity budget: <= 150 LOC changed
  ag-plan-reviewer: no
  omp-scout: no
  red-team: no

Tier 3: high-risk (auth, schema, data mutations, compliance, workflow)
  card: full + pre-specified evidence values + complexity budget
  CI: full suite + security scan + contract check
  evidence: full package
  complexity budget: any oversize requires CC explicit approval
  ag-plan-reviewer: YES
  omp-scout: YES (pre-merge bounded audit)
  red-team: YES (for auth/schema/compliance — non-implementing agent finds gaps)
  fresh CC context: recommended (prevents session drift)
```

---

## PHASE 0 — FOUNDATIONAL SETUP
_Trigger: Plan approval. No code changes except emergency fixes._
_Goal: Stop active damage. Measure baseline. Make correct decisions._

```yaml
gates:
  - Rollback procedure tested and proven (< 5 min, timed log required)
  - Foundational docs complete and verified current:
      KNOWN_ISSUES, SYSTEM_OF_RECORD, ENVIRONMENT_MAP, AUTH_MODEL,
      ACTIVE_WORKFLOWS, DEPLOYMENT, OWNER_MANUAL, RUNBOOK,
      AGENT_PLAYBOOK, RISK_REGISTER
  - Production fingerprint documented:
      deployed commit SHA, actual Next.js version, package-lock state,
      env var presence (no values), DB migration version
  - Data integrity snapshot (docs/DATA_INTEGRITY_AUDIT.md):
      WO count by status, 138 FSM-dead WOs classified,
      oldest dead WO age, dispatcher-visible corrupt records
  - Compliance engine divergence audit (A-003):
      compliance.ts vs GAS output compared on last 90d shifts;
      any dollar divergence reported to Brandon before Phase 1
  - Clerk vs Lucia decision documented (docs/AUTH_DECISION.md):
      migration risk, rollback path, cost, owner impact — decided in Phase 0
  - Shift-Left tools integrated:
      Auth (Clerk/Lucia — decided above)
      Timekeeping vendor (Deputy — decided)
      UploadThing (S171 — in progress)
      Cloudflare Email Routing (WF-006 — DONE: f0af7347)
  - shadcn/ui adopted for all new Codex components
  - Agent governance files current: AGENTS.md, CLAUDE.md, AG.md, AGENT_PLAYBOOK.md
  - Baselines measured: Sentry errors/day + 7-day uptime
  - Task Card format enforced for all AG/Codex tasks
  - Assumption Ledger seeded (docs/ASSUMPTION_LEDGER.md): all HIGH-risk assumptions OPEN
  - Evidence Register seeded (docs/EVIDENCE_REGISTER.md): initial claims entered
  - docs/AUTH_DECISION.md created with explicit Clerk vs Lucia verdict
  - PROJECT_STATUS.md template created; CC commits to updating on every gate change
```

---

## PHASE 1 — SECURITY & AUTH HARDENING
_Trigger: All Phase 0 gates confirmed._
_Goal: Zero exploitable auth surface. No client-readable secrets._

```yaml
gates:
  - Zero secrets in client bundles/page source (NEXT_PUBLIC_ sweep complete)
  - API keys scoped and enforced at route level (401 bad key, 403 wrong route)
  - DEV bypass requires dual guards (env check + DEV_BYPASS_SECRET)
  - Any previously client-exposed secret rotated (not just removed from code)
  - next-auth REMOVED from codebase — Clerk replaces it entirely (GAP-03)
  - SyncQueue migrated: localStorage → IndexedDB via Dexie.js (GAP-01)
  - Field auth token rotation on each verified request, sliding expiry (GAP-02)
  - NEXT_PUBLIC_VAPID_PUBLIC_KEY exempted from NEXT_PUBLIC_ sweep with doc note (GAP-04)
  - GOOGLE_AI_API_KEY verified present in all deployment contexts (GAP-07)
  - Preview builds cannot write to production DB (verified, not assumed)
  - Assumption A-001 (staff localStorage) confirmed or rejected
  - Assumption A-002 (Gemini key) confirmed or rejected
  - Assumption A-006 (Cloudflare routing) confirmed or rejected
  - ESLint no-empty-catch enforced; all catch blocks audited → structured log + Sentry capture
  - PROJECT_STATUS.md live — Brandon has plain-English dashboard from Phase 1
  - Shared Zod contracts in lib/contracts/ for all AG/Codex API seams established
```

---

## PHASE 2 — CI/CD SAFETY & PIPELINE INTEGRITY
_Trigger: All Phase 1 gates confirmed._
_Goal: No schema drift. No phantom versions. No manual migration risk._

```yaml
gates:
  - Next.js pinned to stable 15.x; full test suite passes
  - @ducanh2912/next-pwa verified compatible with Next.js 15 OR migrated to @serwist/next (GAP-05)
  - Atomic migrations: prod DB migrates on prod deploy; preview builds isolated
  - CI/CD blocks merge on failing unit/integration tests
  - Staff auth replacement (Clerk or patched stable auth) executed based on Phase 0 decision
  - GAS removed from staff auth path entirely
  - Staff permissions migrated GAS → Neon with parity report:
      record count match, permission equivalence verified, edge cases documented
  - Field session: HTTP-Only cookies, sliding expiry, absolute max lifetime,
      server-side revocation, logout invalidates token, disabled tech loses access immediately
  - Migration parity report created (docs/MIGRATION_PARITY_REPORT.md)
  - Behavioral parity checklist complete for every library replacement:
      enumerate all flows old system supported → Playwright/manual verify each with new system →
      old library removed ONLY after every flow confirmed with evidence
```

---

## PHASE 3 — CORE DISPATCH LOOP PROOF
_Trigger: All Phase 2 gates confirmed._
_Goal: First real evidence the business workflow functions end-to-end._

```yaml
pre_phase_required:
  - 138 FSM-dead WOs — per-WO classification table required BEFORE script:
      script first generates: WO ID | old state | proposed new state | business justification
      (not all 138 have same correct target — some revert to Scheduled, some to Cancelled)
      CC reviews every row; Brandon approves the table; THEN pg_dump backup; THEN script runs;
      post-run query confirms 0 FSM-dead records remain
  - Failure Mode Inventory documented before running 10 jobs:
      job created but n8n never sees event (outbox unpolled),
      tech assigned but notification never sent (push broken),
      job completed but compliance audit trail missing,
      tech session expired mid-job,
      Neon connection lost during status transition,
      GAS timeout during fallback period

gates:
  - Core loop E2E Playwright test passes in CI:
      intake → WO created → dispatch → assign → clock in → job complete → clock out
  - 10 manual jobs completed without GAS fallback:
      includes edge cases: reschedule, cancel, reassignment, clock-in without assignment,
      upload failure, invalid transition attempt
  - Failure drills completed: n8n down, GAS disabled, Gemini key missing,
      expired tech session, duplicate status update, bad job transition
  - Push notifications working: subscribe → Neon → send verified (GAP-04)
  - /api/health live and monitored by UptimeRobot
  - Synthetic heartbeat deployed: full core loop every 15 min via cron job;
      /api/health/synthetic-last-run endpoint; UptimeRobot alerts if endpoint stale;
      catches monitoring-stack failures (e.g., Sentry not initializing)
  - Assumption A-005 (push subscriptions) confirmed
  - Phase Report 3 (docs/PHASE_REPORTS/phase-3-summary.md) reviewed and approved by Brandon
```

---

## PHASE 4 — EVENT DURABILITY & CODEBASE CLEANUP
_Trigger: All Phase 3 gates confirmed._
_Goal: Events survive restarts. Dead code eliminated with evidence._

```yaml
gates:
  - domain_events outbox in Neon; written in same DB transaction as business action
  - Vercel cron outbox poller consuming pending events with:
      lock timestamp to prevent double-processing,
      retry policy (max N attempts),
      dead-letter state on exhaustion,
      n8n acknowledgement contract defined,
      idempotency keys on all events,
      /ops shows pending/failed/dead event counts
  - Events survive n8n restart: chaos drill documented
  - Ghost flags and orphaned routes removed:
      each deletion backed by Codegraph evidence + runtime log evidence
  - Code.js (GAS) reduced to <= 200 lines or fully eliminated
  - GAS call path count = 0 (verified by grep + Codegraph)
  - All dead code deletions: Codegraph evidence + test evidence + runtime log evidence
```

---

## PHASE 5 — OWNER ENABLEMENT & AUXILIARY TOOLING
_Trigger: All Phase 4 gates confirmed._
_Goal: Brandon can monitor and manage without dev assistance._

```yaml
gates:
  - /ops dashboard live: pending events, failed events, Sentry health, uptime
  - Deferred tools evaluated with evidence (not opinion):
      Inngest/Trigger.dev vs Vercel cron (current) — benchmark decision
      Metabase for analytics — cost/value decision
      Crater/Stripe for billing — scope decision
      Unleash for feature flags — replace ghost flags decision
  - HuggingFace NER evaluated for email parsing if Gemini failure rate > X% (measure first)
  - Owner runbook proven: Brandon completes health check in < 10 min unassisted
  - Owner signs off: stability confirmed, runbook confirmed, rollback confirmed
  - Phase Report 5 (docs/PHASE_REPORTS/phase-5-summary.md) signed by Brandon
  - Feature resumption gate: all Phase 0–5 gates green → controlled growth behind feature flags
```

---

## INTER-AGENT PROTOCOL

```yaml
AG/Codex seam (highest risk — contract drift = runtime silent failure):
  - lib/contracts/ holds shared Zod schemas (single source of truth for all API shapes)
  - AG defines contract in Task Card and updates lib/contracts/ as first commit
  - Codex posts written acknowledgment before any consumption:
      "I read contract at [path]. My expected request: [example]. My expected response: [example].
       Any mismatch = [CONTRACT BREACH] comment on this Task Card."
  - CC does not issue "Clear to merge" until both agents have written acknowledgments

Cross-agent questions (on every Task Card):
  - Format: FROM / TO / QUESTION / REQUIRED EVIDENCE / ANSWER
  - Written answers required — not emoji acknowledgments
  - No merge until all questions closed

omp pre-merge scout (Tier 3 only):
  - Before CC reviews: omp runs Codegraph on deleted/modified symbols,
    targeted scope-violation grep, checks for cross-domain boundary breaches
  - Output: one structured line per finding → PASS / FLAG / BLOCK
  - CC reviews omp output before issuing verdict

Red-team pass (Tier 3 auth/schema/compliance only):
  - Non-implementing agent explicitly tasked: "find gaps, NOT verify correctness"
  - Must name minimum 3 failure scenarios before CC issues "Clear to merge"
  - If implementing agent is AG → Codex runs red-team (and vice versa)
  - omp can run red-team if Codex is not domain-relevant

Simple CI/enforcement scripts (< 50 LOC, single purpose, no new abstraction):
  - Acceptable as enforcement layer — e.g., banned-phrases grep check,
    assumption deadline checker, stale evidence scanner
  - Application-layer custom code still requires OSS-first justification
```

---

## EVIDENCE REGISTER PROTOCOL

```yaml
Each entry requires:
  - re_validate_by: date (30-day default, shorter if schema/auth changes)
  - invalidation_triggers: what event makes this evidence stale
    (e.g., "any change to auth.ts invalidates A-001 evidence")

Monthly audit (CC):
  - Scan Evidence Register for stale entries (past re_validate_by date)
  - Stale entry = Task Card to refresh evidence before phase gate can close
  - "Evidence was valid when captured" is not same as "evidence is valid now"
```

---

## PERMANENT MAINTENANCE CADENCE

```yaml
weekly:
  - AG posts diff + evidence to CC for review
  - CC posts Phase Report update if gate status changed
  - Open assumptions reviewed: any new HIGH-risk assumptions?

monthly:
  - Metrics vs baselines: uptime, Sentry errors/day, test coverage, custom code line count
  - RISK_REGISTER reviewed: any risks closed or escalated?
  - Evidence Register: any stale entries?

quarterly:
  - Architecture review: is the system simpler or more complex than last quarter?
  - Dead code audit: Codegraph-driven, evidence-backed
  - Agent governance review: CLAUDE.md, AGENTS.md, AGENT_PLAYBOOK.md current?
  - Dependency audit: any beta deps, phantom versions, unverified community packages?
```

---

## BRANDON GATE APPROVAL QUESTIONS
_Ask these before approving any phase closure:_

```
1. What was broken before this phase?
2. What changed?
3. Show me the proof it works (not "tests pass" — the actual evidence)
4. What still doesn't work?
5. What risk was reduced?
6. What risk remains?
7. Can we roll back? How fast? Was it tested?
8. Are we allowed to start the next phase?
```

If answer to #3 is prose, that is NOT sufficient. Demand evidence links.

---

## TASK CARD TEMPLATE

```markdown
## Task Card [ID]

**Task:** [one sentence]
**Business reason:** [operational impact]
**User-visible outcome:** [what Brandon/dispatcher/tech sees change]
**Phase:** [0–5]
**Approved by:** Claude Code + Brandon

**Files allowed to change:** [explicit list]
**Files forbidden to change:** [explicit list]
**Database changes:** [none | migration name + delta]
**API changes:** [none | endpoint + contract delta]
**Auth changes:** [none | exact flow change]
**n8n/GAS changes:** [none | what workflow changes]
**New dependency:** [none | package + justification]

**Assumptions declared:**
| Assumption | Evidence Needed | Risk if Wrong |
|---|---|---|

**Failure modes:**
| Failure Mode | Guard/Detection | Recoverable? |
|---|---|---|

**Cross-agent questions:** [tag any agent whose domain is touched — must reply before CC approves]

**Tier:** [0 | 1 | 2 | 3]
**Complexity budget:** [<= 150 LOC for Tier 1-2 | Tier 3: state expected LOC; >150 requires CC explicit approval]
**Pre-specified evidence values:**
  - DB query: [exact SQL + expected row counts]
  - Tests: [exact test names + assertion count]
  - Sentry: [query + expected count]
**omp scout required:** [yes — Tier 3 only | no]
**red-team pass required:** [yes — Tier 3 auth/schema/compliance only | no]

**RED test criteria:** [exact behavior a test must fail on before code written]
**GREEN verification:** [exact conditions that prove it works]
**Rollback plan:** [exact steps + timing]
**Definition of done:** [binary — not "probably working"]

**ag-plan-reviewer required:** [yes if touches auth/schema/cross-system | no otherwise]
```

---

## NON-NEGOTIABLE RULES

```yaml
- No production code without approved Task Card
- No merge without "Clear to merge" from Claude Code
- No "Clear to merge" without full Evidence Package
- No phase advance without Brandon sign-off on Phase Report
- No feature work during freeze
- No agent approves own work
- No TODO/FIXME/HACK in shipped code
- No NEXT_PUBLIC_ on server-only values
- No hardcoded secrets anywhere
- No schema migration without rollback/forward-fix strategy
- No claim without evidence (banned phrases = automatic BLOCK)
- No assumption implementation without ASSUMPTION_LEDGER entry
- No dead code deletion without Codegraph + test + runtime evidence
- No empty catch blocks (ESLint enforced; all catch → structured log + Sentry capture)
- No new abstraction until that concrete case has run in production 30 days with zero incidents
- No library replacement without behavioral parity checklist (every flow old system supported, verified with new)
- No application-layer custom code without proving OSS alternative is unsuitable
  (Exception: CI/enforcement-layer scripts <50 LOC, single purpose, no new abstraction = acceptable)
```
