# SESSION STATE
# Overwrite completely at session close. Never append. This is the handoff.

---

## SESSION: S170 (2026-06-25)

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
branch:  fix/s170-ci-isolation (OPEN — PR pending)
main-head: af4edddd (PR #22 merged 2026-06-25)

open-prs:
  fix/s170-ci-isolation: CI test isolation
    - ci.yml: vitest now runs --coverage; uses DATABASE_URL_TEST secret
    - e2e.yml: trigger changed workflow_dispatch → pull_request; uses DATABASE_URL_TEST
    STATUS: push + PR pending

production:
  deployed: af4edddd — PR #22 LIVE (auto-deploy ~90s after merge)
  status:   CURRENT
```

---

## INFRA STATE

```yaml
neon-prod:    ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream account)
neon-mcp:     org-icy-math-54327215 (accounts@linkstream.tech) — CORRECT account ✓
neon-proj:    purple-dust-72858226 — "APT Central Command"
neon-dev:     br-falling-hall-a6d1mszu ("dev" branch) — was br-muddy-flower-ak85a9jc (deleted)
migrations:   8 applied to prod (dispatch_sent_at DROPPED 2026-06-25 via Neon MCP)
n8n:          wif9XlVbK3M6a1C8 — 16 nodes, live
n8n-key:      rotated 2026-06-25 (new expiry unknown — check n8n dashboard)
vercel-mcp:   linkstream-hub ✓ (re-authed 2026-06-25)
gh-secrets:   DATABASE_URL_TEST set 2026-06-26 → dev branch (br-falling-hall-a6d1mszu)
```

---

## RESET SPRINT BACKLOG (post PR #22 merge)

```yaml
# Priority: IMMEDIATE → P0 → P1 → P2 → DEBT
# Owner: CC=Claude Code, AG=Antigravity, BOTH=co-lead together

IMMEDIATE:
  A. CameraUpload throws on every photo — OPEN (AG)
     fix: add /api/field/job/photo route + add 'uploadReceipt' to FIELD_POST_ROUTES
     file: tech-pwa/src/lib/syncQueue.ts:113, CameraUpload.tsx:43
     test: POST /api/field/job/photo with valid session → 200, file stored

  B. Push notifications never deliver — OPEN (AG)
     fix: /api/push/subscribe → write to Neon pushSubscriptions table (not GAS)
     files: tech-pwa/src/app/api/push/subscribe/route.ts
     test: POST /api/push/subscribe → SELECT from pushSubscriptions → 1 row

  C. DONE 2026-06-25 — dispatch_sent_at DROPPED from prod (Neon MCP)
  D. DONE 2026-06-25 — WO id=3194 Archived (dedup corruption anchor removed)

P0:
  1. n8n jobId — DONE 2026-06-25:
     - HTTP node → keypair mode (expressions now resolve correctly)
     - Skip Filter: SENT + DRAFT guards added
     - 2 corrupt jobs (3120, 3194) archived
     - Data recovery: job 3217 (1921 Francisco St, kitchen light) + job 3218 (3770 Shafter Ave, fence)
     - Corruption window audit complete — no additional missed inbound WOs
     n8n wif9XlVbK3M6a1C8 is now healthy.

  2. status_transitions: 138 WOs FSM-dead — PARTLY DONE 2026-06-25:
     DONE: 137 WOs migrated to 'Needs Info' via Neon MCP (zero legacy states in prod)
     OPEN (AG TDD): normalizeLegacyStatus() add 'PTE Required'→'Needs Info', 'Awaiting Approval'→'Needs Info', 'Needs Review'→'Needs Info'
     OPEN (AG TDD): intake route.ts — set status='Needs Info' not 'Needs Review'
     test RED first: normalizeLegacyStatus('PTE Required') returns 'Needs Info'
     test RED first: FSM transition from 'Needs Review' returns INVALID_TRANSITION (real DB)
     note: DB clean now — AG parts prevent re-accumulation of legacy states

  3. CI/test isolation — PARTLY DONE 2026-06-25:
     DONE: DATABASE_URL_TEST secret set in GitHub Actions → Neon dev branch (br-falling-hall-a6d1mszu)
     DONE: ci.yml updated — vitest run --coverage; uses DATABASE_URL_TEST
     DONE: e2e.yml updated — trigger pull_request; uses DATABASE_URL_TEST
     OPEN: PR merge for fix/s170-ci-isolation
     note: ci.yml still uses DATABASE_URL for build step (placeholder — OK)

P1:
  4. notifications: TechAssigned event (Phase 21) — OPEN (AG TDD)
     fix: add TechAssigned to WorkOrderEvent union in event-bus.ts
     fix: event-bus-executor.ts resolve techId from jobs.employeeId (not '')
     fix: wire email/push to tech on assignment
     test RED first: EventBus.publish({ type: 'TechAssigned' }) → 1 row in workflow_events

  5. scheduling time precision — OPEN (AG TDD)
     fix: job-update.ts:110 — store HH:MM or fix coercion
     test RED first: PATCH /api/jobs/[id] with scheduledTime='10:00' → DB ≠ 'morning'
     decision: new column for HH:MM OR more granular ArrivalWindow values

  6. Block 11 E2E re-enable — OPEN (AG)
     fix: remove fixme from tech-pwa.spec.ts Block 11 (phantom CF Worker dependency)
     fix: use badge+PIN login pattern from DISP-03

P2 (schedule with AG after P0+P1):
  7.  orgId scoping: add orgId WHERE clause to all schedule/job queries
  8.  ADR-004 schema: missing_fields + tenant_proposed_date columns
  9.  Delete 9 orphaned API routes
  10. 12 GAS-only actions → Neon routes
  11. Delete orphaned Lapham Extraction n8n node (pos [1264, 160], unconnected)
  12. n8n IF: Comms Enabled? hardcoded boolean false — edit n8n node to enable
  13. Remove INTAKE_COMMS_ENABLED from all docs (controls nothing in code)
  14. Billing stub page — build or remove from nav
```

---

## S170 AUDIT GROUND TRUTH (DO NOT DELETE)

```yaml
# Feature audit completed 2026-06-25. Full detail in project_s170_audit_complete.md (memory)
features:
  email_intake:        IMPROVED — n8n expression FIXED; SENT+DRAFT filter added; 2 missed WOs recovered
  comms_display:       PARTIAL — FIXED stakeholder (PR #22); 34 EMAIL-* WOs GAS-dependent
  comms_reply:         PARTIAL — email works; SMS/TECH blocked
  assignment:          PARTIAL — FIXED refetch (PR #22); time coercion still open (P1)
  scheduling:          PARTIAL — scheduledDate correct; HH:MM coerced to 'morning'
  status_transitions:  PARTIAL — 137 WOs migrated to Needs Info; normalizeLegacyStatus still needs AG fix
  tech_pwa_visibility: WORKING ✓
  clock_inout:         PARTIAL — clock-out skips FSM; orgId hardcoded
  notifications:       BROKEN — Phase 21 never shipped; techId=''
  wo_type_detection:   BROKEN — no DB column, no detection fn

n8n_wif9XlVbK3M6a1C8_state (HEALTHY as of 2026-06-25):
  HTTP_node: keypair mode — expressions evaluate per-email ✓
  Skip_Filter_guards: SENT (outbound replies), DRAFT (APT drafts), auto-reply, bounce ✓
  gmailMsgId: resolves correctly from $json.email.id ✓
  known_leakthrough: RM thread-reply emails (INBOX, not SENT) pass filter — pre-existing, not P0

schema:
  dispatch_sent_at: DROPPED 2026-06-25 ✓
  ghost_tables: 8 tables with zero API routes

prod_db_ops_done:
  - WO id=3194 Archived (dedup corruption anchor)
  - WO id=3120 Archived (earlier corrupt expression job)
  - WO id=3217 created (1921 Francisco St 3C, kitchen light — recovered from exec 1839)
  - WO id=3218 created (3770 Shafter Ave Cottage, fence — recovered from exec 1776)
  - 137 WOs migrated 'Needs Review'/'PTE Required'/'Awaiting Approval' → 'Needs Info'

test_suite:
  total: 22 files, 188 tests (PR #22 baseline)
  real_db_tests: event-bus, [jobId].patch, clock-in, job/complete, techs, import
  mocked_tests: job-state (FSM), most UI component tests
  e2e_ci: NOW on pull_request gate (ci isolation PR pending)
  coverage: thresholds in vitest.config.ts; enforced via --coverage (ci isolation PR pending)
```

---

## KNOWN ISSUES / DO NOT TOUCH

```yaml
hook-bug:      continuous-learning-v2 PostToolUse hook reverts Edit changes — use Bash/Write instead
vercel-deploy: AUTO-DEPLOY FIXED (PR #21). Merge to main → READY in ~90s.
vercel-env:    ALWAYS answer NO to env pull — wipes .env.local
github-token:  unset GITHUB_TOKEN before any gh command
vpn:           VPN OFF before any CLI session
tsc:           Always run from C:\PTOW\1_APT_Central_Command (repo root)
no-ai-attr:    No Co-Authored-By, no PR footer, no AI attribution anywhere
migration-0008: APPLIED 2026-06-25 ✓
n8n-dev-branch: was br-muddy-flower-ak85a9jc — DELETED; now br-falling-hall-a6d1mszu
```

---

## N8N WORKFLOW REGISTRY

```yaml
active:
  wif9XlVbK3M6a1C8: Phase 19 — Email Polling & WO Intake (HEALTHY as of 2026-06-25)
  fpwZXWR9u7nOmiDa: CC Event Bus Router
  NUH0krzQiSrBmyfv: PTOW Error Handler
  0V9YLwpiTBJ84InU: FLAG Gate Notification
  Wiuvox8VOZNtVoDN: CA Break Compliance Monitor
  dshTB3lODDYy0FTP: CC Event Bus Outbox Poller
```

---

## ARCHITECTURE LOCKED — S153

```yaml
domain-layer:    tech-pwa/src/domain/ — pure business logic, no Next.js imports
dal-injection:   domain/ accepts DAL interface — unit-testable
result-type:     Result<T,E> — no throws in domain logic
branded-ids:     JobId, TechId, PropertyId
discriminated-u: JobState discriminated union
zod-boundaries:  all API route inputs validated with Zod schemas
tdd-standard:    every phase from 17 onward ships tests-first — non-negotiable
fsm:             JOB_STATE_MACHINE (8 arcs) + createJobStateService factory
event-bus:       EventBus.publish() => workflow_events outbox => n8n router
auth-tech:       badge + SHA-256 PIN => UUID session_token in Neon (tech routes)
auth-staff:      Google OAuth next-auth v5 (office routes)
eslint-boundary: no-restricted-imports in eslint.config.mjs (ADR-001)
mapper:          single source of truth => lib/dal/mappers.ts:mapJob
comms-utils:     lib/comms-utils.ts — extractEmailAddress, deriveStakeholder (added S170)
orthogonality:   docs/ORTHOGONALITY.md — one data path, one truth, framework-level constraints
testing:         docs/TESTING.md — integration tests mandatory, real DB, coverage enforced
```

---

## KEY ARCHITECTURAL FACTS

```yaml
neon-prod:        ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream)
neon-dev-branch:  br-falling-hall-a6d1mszu (compute: ep-damp-truth-a6l72dw7)
gh-cli:           authenticated as linkstream-hub — unset GITHUB_TOKEN before gh commands
playwright:       globalSetup uses DATABASE_URL — NOW uses DATABASE_URL_TEST in CI (ci isolation PR)
team:             Brandon (manager) => Claude Code + AG (co-leads, equal) => Codex (frontend)
vercel-logs:      MCP returns 403 Forbidden — surface errors in API response body
webhook-auth:     DASHBOARD_API_KEY header OR Authorization: Bearer <key>
comms-inbound:    /api/comms/inbound now derives stakeholder from job rmEmail/tenantEmail (PR #22)
assignment-refetch: fixed via apt:job-saved event (PR #22)
phase21-stub:     event-bus-executor.ts:11 techId='' — TechAssigned event missing entirely
org-id-gap:       orgId absent from ALL schedule/job WHERE clauses — P2
fsm-dead-count:   0 WOs (was 137 — all migrated to 'Needs Info' 2026-06-25)
n8n-comms-gate:   IF: Comms Enabled? hardcoded boolean false — edit n8n node to enable
intake_comms_flag: GHOST — zero code gates in tech-pwa/src/**; remove from docs (P2.13)
```

---

## MERGED PHASES (complete)

```yaml
phase-17:  MERGED PR #2
phase-18:  MERGED PR #6 — EventBus outbox
phase-19:  MERGED PR #7 — Observability + CI fix
phase-20:  MERGED PR #9 — ESLint auth boundary rule
phase-23:  MERGED PR #11 — Lapham Form + Access Code Merge
phase-24:  MERGED PR #13 — /api/techs/import rewrite + prod backfill (32 techs)
fix-pr8:   MERGED PR #8 — jobs/sync error surface + upsert fix
fix-pr10:  MERGED PR #10 — email intake 4 bugs + tests
fix-pr14:  MERGED PR #14 — intake parse quality + n8n comms refs + C4 mapper dedup (194 tests)
fix-pr15:  MERGED PR #15 — lock-and-send deleted + migration 0008 + Kanban sort
fix-pr16:  MERGED PR #16 — normalizeLegacyStatus in GET /api/jobs (199 tests)
fix-pr17:  MERGED PR #17 — C1 dual-seam eliminated, resolveJobStatus deleted (202 tests)
fix-pr18:  MERGED PR #18 — C2 job-transitions.ts deleted (188 tests)
fix-pr19:  MERGED PR #19 — lint sprint, 0 warnings (202 tests)
phase-22:  MERGED PR #12 — UI fixes (10 tests)
fix-pr21:  MERGED PR #21 — Vercel auto-deploy exit codes fixed
fix-pr22:  MERGED PR #22 — S170 project reset (security, orthogonality, process, 188 tests)
```
