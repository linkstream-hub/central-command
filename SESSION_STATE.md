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
branch:  main
head:    72d2b8cd

open-prs: none

production:
  deployed: 42857102 — PRs #17+#18+#19+#20+#21 LIVE
  status:   CURRENT — no pending deploy
```

---

## INFRA STATE

```yaml
neon-prod:  ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream account)
neon-mcp:   org-icy-math-54327215 (accounts@linkstream.tech) — CORRECT account ✓
neon-proj:  purple-dust-72858226 — "APT Central Command"
migrations: 7 applied to prod (NOT 8 — dispatch_sent_at still in prod schema)
n8n:        wif9XlVbK3M6a1C8 — 16 nodes, live
n8n-key:    rotated 2026-06-25 (new expiry unknown — check n8n dashboard)
vercel-mcp: linkstream-hub ✓ (re-authed 2026-06-25)
INTAKE_COMMS_ENABLED: GHOST FLAG — zero occurrences in tech-pwa/src/**; controls nothing
```

---

## PRIORITY ORDER (next session)

```yaml
P0 — operational blockers:
  1. n8n jobId fix
     → $json.email.id not resolving → gmailMsgId=undefined → 400 → fallback uses Date.now() IDs
     → Fix: diagnose Code node output structure in wif9XlVbK3M6a1C8; correct expression
     → Also: archive WO id=3194 (DATE-based corruption): UPDATE jobs SET status='Archived' WHERE id=3194

  2. status_transitions — 138 WOs FSM-dead
     → 34 'Needs Review' (not a FSM state) — intake hardcodes it; auto-eval never built
     → 69 'PTE Required' + 35 'Awaiting Approval' — old GAS states; normalizeLegacyStatus() misses them
     → Fix options: (a) add 'Needs Review' as FSM state with ADVANCE arc, OR (b) migrate WOs to 'Needs Info'
     → normalizeLegacyStatus() must map 'PTE Required'+'Awaiting Approval' → FSM-valid state

  3. assignment BUG 1 — CommandPalette modal missing refetch
     → DashboardLayout.tsx:146 onSave={() => setPaletteJob(null)} — no loadLiveData() call
     → Fix: add refetch callback (live/page.tsx:297 pattern already exists)

P1 — broken features:
  4. notifications — TechAssigned event + Phase 21
     → No TechAssigned event type in WorkOrderEvent union
     → techId='' stub at event-bus-executor.ts:11 ("extend F2 in Phase 21" — never shipped)
     → Fix: add TechAssigned event, resolve techId from jobs.employeeId, wire email/SMS via Resend

  5. comms inbound stakeholder hardcode
     → /api/comms/inbound/route.ts:38 hardcodes stakeholder:'TENANT' for ALL inbound
     → RM replies stored as TENANT; REQUESTER tab never populates from push path
     → Fix: derive stakeholder from sender email (deriveStakeholder() already exists in GET path)

  6. scheduling time precision loss
     → job-update.ts:110 coerces any HH:MM → 'morning' ArrivalWindow
     → DispatchTimelineBoard.tsx:240 startTime='10:00' → always writes 'morning' to DB
     → Fix: extend ArrivalWindow enum or store HH:MM in separate column

P2 — technical debt:
  7. wo_type_detection / ADR-004 schema
     → WoType domain type exists but no DB column; no detectWoType() fn
     → emailType field ('inspection','turnover','adhoc_workorder') exists but never promoted
     → Fix: add wo_type column to schema, promote emailType at intake

  8. clock-out FSM event missing
     → /api/field/clock-out/route.ts updates timeRecords but never fires FSM COMPLETE event
     → COMPLETE event fires via /api/field/job/complete attestation flow (separate)

  9. org_id scoping gap
     → org_id absent from ALL schedule/job queries (schedule/today, schedule/week, job-update.ts)
     → Multi-tenancy declared in CLAUDE.md but not enforced in any WHERE clause
     → clock-in hardcodes orgId:'APT-CA'

  10. INTAKE_COMMS_ENABLED ghost flag cleanup
      → Env var in SESSION_STATE/docs but zero code gates in tech-pwa/src/**
      → Either implement the gate or remove from docs/env
```

---

## S170 FEATURE AUDIT — COMPLETE GROUND TRUTH

```yaml
# Audit completed 2026-06-25 (S170). For each: code_exists / api_writes_db / ui_wires / verdict

1_email_intake:
  code:   tech-pwa/src/app/api/webhooks/n8n/gmail/route.ts:34
  db:     YES — jobs table (upsert on jobs.jobId conflict)
  ui:     N/A — n8n→webhook
  verdict: PARTIAL
  bug:    n8n sends literal 'EMAIL-={{ $json.email.id }}' (unevaluated) → gmailMsgId=undefined → 400 → Date.now() fallback
  note:   INTAKE_COMMS_ENABLED never in code; Gemini schema has no wo_type field

2_comms_display:
  code:   tech-pwa/src/app/api/comms/[jobId]/route.ts:33 (GET)
  db:     YES — comms_messages table (GAS fallback auto-caches via onConflictDoNothing)
  ui:     JobDetailModal.tsx:293 — calls GET, renders stakeholder tabs
  verdict: PARTIAL
  bug:    /api/comms/inbound/route.ts:38 hardcodes stakeholder:'TENANT' for ALL inbound; RM=TENANT
  note:   34 EMAIL-* WOs have 0 Neon rows → display = GAS stability

3_comms_reply:
  code:   tech-pwa/src/app/api/comms/[jobId]/route.ts:158 (POST)
  db:     YES — comms_messages (direction:'outbound')
  ui:     JobDetailModal.tsx:541 → dashboardRequest("replyToThread") → PATCH /api/comms/${jobId}
  verdict: PARTIAL
  works:  EMAIL to REQUESTER/TENANT if email on job record; sender=Resend (noreply@aptmaintenanceinc.com)
  broken: SMS=422_not_supported (GAS-only); TECH=422_not_supported

4_assignment:
  code:   JobDetailModal.tsx:439 → dashboard-api.ts:563 → PATCH /api/jobs/${jobId} → job-update.ts:39
  db:     YES — jobs.tech column
  ui:     PARTIAL
  verdict: PARTIAL
  bug1:   DashboardLayout.tsx:146 onSave missing refetch → stale list until hard reload
  bug2:   DispatchTimelineBoard.tsx:240 startTime='10:00' → job-update.ts:110 coerces → 'morning'

5_scheduling:
  code:   SchedulingDispatch.tsx → JobDetailModal.tsx:439 → job-update.ts:92 (SCHEDULE FSM)
  db:     PARTIAL — scheduledDate correct; scheduledWindow always 'morning' (HH:MM coercion)
  ui:     PARTIAL — time picker sends HH:MM; coerced to 'morning'; reload shows wrong time
  verdict: PARTIAL
  note:   New WOs use Neon; legacy Sheets/Buildertrend WOs not in Neon schedule view

6_status_transitions:
  code:   tech-pwa/src/domain/job/job-state.ts — 8 arcs from 6 valid states
  db:     YES (for valid FSM states)
  ui:     PARTIAL — Kanban drag bypasses FSM for invalid states
  verdict: BROKEN
  bug:    138 WOs in non-FSM states — FSM-dead:
            34 'Needs Review' (not a FSM state) — every transition=INVALID_TRANSITION
            69 'PTE Required' (GAS artifact) — no FSM arc
            35 'Awaiting Approval' (GAS artifact) — no FSM arc
  note:   normalizeLegacyStatus() maps 'Open'/'New'→'Needs Review' but misses PTE/Awaiting
  valid_arcs:
    Needs Info → Awaiting Tenant (REQUEST_TENANT_SCHEDULING)
    Needs Info → Ready to Schedule (ADVANCE)
    Awaiting Tenant → Ready to Schedule (TENANT_SUBMITTED)
    Awaiting Tenant → Needs Info (TENANT_LINK_EXPIRED)
    Ready to Schedule → Scheduled (SCHEDULE)
    Scheduled → In Progress (CLOCK_IN)
    Scheduled → Awaiting Tenant (RESCHEDULE)
    In Progress → Complete (COMPLETE)

7_tech_pwa_visibility:
  code:   tech-pwa/src/app/api/field/jobs/route.ts
  db:     YES — WHERE employeeId=session OR badge=session
  ui:     /app/jobs/page.tsx → apiGet('getJobs') → Bearer → verifyFieldSession
  verdict: WORKING ✓

8_clock_inout:
  code:   /api/field/clock-in/route.ts + /api/field/clock-out/route.ts
  db:     YES — timeRecords table
  ui:     PARTIAL — clock-in confirmed; clock-out UI from /app/job/[jobId]/page.tsx (unverified)
  verdict: PARTIAL
  bug:    clock-out updates timeRecords but never fires FSM event
  debt:   orgId hardcoded 'APT-CA' (single-tenant OK for now)

9_notifications:
  code:   lib/services/event-bus.ts — WorkOrderScheduled fires on SCHEDULE FSM
  db:     YES — workflow_events outbox (WorkOrderScheduled only)
  ui:     N/A
  verdict: BROKEN
  bug:    No TechAssigned event type; techId='' stub in event-bus-executor.ts:11
  note:   Phase 21 ("extend F2") explicitly noted, never shipped; tenant gets confirmation, tech gets nothing

10_wo_type_detection:
  code:   tech-pwa/src/domain/job/job-state.ts:58 (type only)
  db:     NO — zero wo_type column in jobs schema; ADR-004 columns absent
  ui:     NO
  verdict: BROKEN — zero-operational
  note:   emailType ('inspection','turnover','adhoc_workorder') is closest proxy; never promoted
```

---

## PROD DB GROUND TRUTH (S169/S170 audit)

```yaml
status_distribution:
  Archived:          467
  Ready to Schedule: 155  # dominant live — all APT-* (GAS origin), manually moved
  PTE Required:       69  # OLD 8-state — FSM-dead (GAS artifact)
  Awaiting Approval:  35  # OLD 8-state — FSM-dead (GAS artifact)
  Needs Review:       34  # email-intake WOs — FSM-dead (not a valid FSM state)
  Scheduled:          16  # manually set
  Complete:            2

fsm_dead_total: 138 WOs (34+69+35)

known_broken_features:
  n8n_jobid:         $json.email.id literal not resolving → Date.now() fallback IDs
  status_transitions: 138 WOs FSM-dead; auto-eval never built; normalizeLegacyStatus incomplete
  notifications:     TechAssigned event not wired; Phase 21 stub never shipped
  wo_type_detection: ADR-004 schema absent; zero DB columns; no detection fn
  comms_inbound:     stakeholder hardcoded TENANT; RM messages misclassified
  assignment_refetch: CommandPalette modal missing refetch (DashboardLayout.tsx:146)
  scheduling_time:    HH:MM coerced to 'morning' (job-update.ts:110)

adr004_columns_in_prod: NONE
  # wo_type, missing_fields, tenant_proposed_date, scheduling_token, scheduled_window absent

ghost_env_vars:
  INTAKE_COMMS_ENABLED: referenced in docs but zero code gates in tech-pwa/src/**

pending_db_ops:
  - Archive WO id=3194 (DATE-corruption): UPDATE jobs SET status='Archived' WHERE id=3194;
  - Confirm first: SELECT id, job_id, address, status FROM jobs WHERE id=3194;
```

---

## KNOWN ISSUES / DO NOT TOUCH

```yaml
hook-bug:      continuous-learning-v2 PostToolUse hook reverts Edit changes — use Bash sed instead
vercel-deploy: AUTO-DEPLOY FIXED (PR #21). Merge to main → READY in ~90s. CLI only for forced deploys.
vercel-env:    ALWAYS answer NO to env pull — wipes .env.local
github-token:  unset GITHUB_TOKEN before any gh command
vpn:           VPN OFF before any CLI session
tsc:           Always run from C:\PTOW\1_APT_Central_Command (repo root)
no-ai-attr:    No Co-Authored-By, no PR footer, no AI attribution anywhere
migration-0008: NOT applied to prod — dispatch_sent_at still in prod schema
```

---

## N8N WORKFLOW REGISTRY

```yaml
active:
  wif9XlVbK3M6a1C8: Phase 19 — Email Polling & WO Intake (jobId BROKEN)
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
```

---

## KEY ARCHITECTURAL FACTS

```yaml
neon-prod:       ep-jolly-morning-a6xlf4ke.us-west-2.aws.neon.tech (Linkstream)
neon-dev-branch: br-muddy-flower-ak85a9jc | compute: ep-holy-waterfall-akwxx49b
gh-cli:          authenticated as linkstream-hub — unset GITHUB_TOKEN before gh commands
playwright:      globalSetup uses DATABASE_URL (not DATABASE_URL_TEST)
team:            Brandon (manager) => Claude Code (lead/gate) => AG (builder) => Codex (frontend)
vercel-logs:     MCP returns 403 Forbidden — surface errors in API response body
webhook-auth:    DASHBOARD_API_KEY header OR Authorization: Bearer <key>
comms-fallback:  /api/comms/[jobId] GET calls GAS (NEXT_PUBLIC_DASHBOARD_API_URL) when commsMessages empty
comms-inbound:   /api/comms/inbound/route.ts:38 hardcodes stakeholder:'TENANT' — BUG
assignment-bug1: DashboardLayout.tsx:146 onSave missing refetch — CommandPalette stale list
assignment-bug2: DispatchTimelineBoard.tsx:240 + job-update.ts:110 — HH:MM coerces to 'morning'
phase21-stub:    event-bus-executor.ts:11 techId='' ("extend F2 in Phase 21" — never shipped)
org-id-gap:      org_id absent from ALL schedule/job queries — multi-tenancy not enforced
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
phase-22:  MERGED PR #12 — UI fixes: dead artifacts deleted, triage default, date nav, kanban scope, modal fixes (10 tests)
```
