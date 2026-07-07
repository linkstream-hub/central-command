# KNOWN_ISSUES.md — APT Central Command
# Active bugs, risks, workarounds. Live tracking — update when status changes.
# Last updated: 2026-07-07

---

## CRITICAL (P0) — Production-impacting, no workaround

| ID | Issue | Location | Status | Phase |
|---|---|---|---|---|
| P0-001 | `NEXT_PUBLIC_DASHBOARD_API_URL` exposed in client bundle — GAS URL visible in page source | `src/auth.ts`, `src/app/api/gas/route.ts`, `src/app/api/comms/[jobId]/route.ts:53` | FIXED — TC-PH1-001, PR #29 (branch `fix/ph1-001-nextpublic-rename`), pending merge | Phase 1 |
| P0-002 | Tech session stored in `localStorage['apt_tech_session']` — XSS-exploitable, no expiry enforcement | `src/lib/auth.ts`, `src/lib/tech-session.ts` | OPEN | Phase 0 (Clerk/Lucia) |
| P0-003 | GAS controls staff permissions on every login — single point of failure, unstable | `src/auth.ts:fetchStaffPermissions()` | OPEN | Phase 0 (Clerk/Lucia) |
| P0-004 | Next.js version `16.2.6` is phantom (does not exist) — unverified package ecosystem | `tech-pwa/package.json` | OPEN | Phase 2 |
| P0-005 | 138 WOs with FSM-dead status `Needs Info` in prod — converted from broken states. Also: 485 WOs with `Archived` status — per Brandon 2026-06-29: not a real FSM state (display filter only, effectively Completed). Phase 3 plan: bulk-reclassify 485 Archived→Completed; per-WO CC+Brandon review required only for the 15 true FSM-dead non-Archived WOs. | `domain` layer, Neon `work_orders` table | OPEN | Phase 3 |

---

## AUDIT FINDINGS — Phase 1 Prerequisites (must resolve before Phase 1 Task Cards)

| ID | Finding | Source | Status | Blocks |
|---|---|---|---|---|
| AF-001 | NEXT_PUBLIC_ scope 10x worse than mapped: 200 symbols across 68 files. Cannot scrub blindly — must categorize legitimately-public vs. server-only vs. ghost vars first | AG Codegraph Audit 2026-06-26 | **RESOLVED 2026-06-29** — manifest merged PR #28 (artifacts/af_001_nextpublic_manifest.md). 296 occurrences categorized. server-only: NEXT_PUBLIC_DASHBOARD_API_URL (3 src/ routes — rename Phase 1). ghost: NEXT_PUBLIC_DASHBOARD_API_KEY (already renamed), NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SUPABASE_* (Vercel cleanup only). legitimately-public: VAPID, Sentry DSN, Clerk key, UploadThing ID, App URL, Vercel Env, Sandbox Mode, Dev Allow Writes. Phase 1 Task Cards now unblocked. | Phase 1 Task Card for secret removal |
| AF-002 | GAS calls route through Cloudflare Worker proxy (`Sentinels/worker.js` → `DASHBOARD_API_URL`). Phase 1 env var rename is not enough — worker must be decommissioned or rerouted | AG Codegraph Audit 2026-06-26 | **RESOLVED 2026-06-29** — Decision: decommission Sentinels/worker.js when GAS exits. GAS URL is hardcoded in Worker (not env var); Next.js API routes eliminate cross-origin problem; no logic worth preserving. Scope into Phase 1 GAS exit Task Card. | Phase 1 GAS exit path |

---

## HIGH (P1) — Degraded functionality, workaround exists

| ID | Issue | Location | Status | Phase |
|---|---|---|---|---|
| P1-001 | Single `DEV_BYPASS_AUTH` guard — only checks `NODE_ENV + VERCEL_ENV`, no secret | `src/auth.ts` | OPEN | Phase 1 |
| P1-002 | `npm run build` = `next build` only — no migration run; migrations manual | `tech-pwa/package.json` | OPEN | Phase 2 |
| P1-003 | Camera upload route throws (broken S3 wrapper) | `src/app/api/jobs/[id]/photo/route.ts` | **CLOSED** — PR #25 (UploadThing) | Phase 0 |
| P1-004 | Push subscribe writes to GAS instead of Neon | `src/app/api/subscribe/route.ts` | OPEN | Phase 3 |
| P1-005 | n8n email intake: Apple Mail forward format not detected by Lapham parser | `src/lib/parsers/lapham.ts` | DIAGNOSED, UNCOMMITTED | Phase 3 |
| P1-009 | `job_photos` table MISSING in production — migration 0009 never applied to purple-dust-72858226. UploadThing code (PR #25, live) fails at DB insert on every photo upload. | `tech-pwa/drizzle/0009_curly_rumiko_fujikawa.sql`, `0010_uploadthing.sql` | **CLOSED** — TC-MIGRATE-009-010 applied 2026-06-29 (CC via Neon MCP) | Phase 0 emergency |
| P1-010 | `workflow_events` table MISSING in production — migration 0007 targeted old Neon project `ep-jolly-morning` only; never re-applied after infra migration. `EventBus.publish()` fails silently — events dropped, n8n receives nothing. | `tech-pwa/drizzle/0007_curly_kree.sql`, `src/lib/services/event-bus.ts` | **CLOSED** — TC-MIGRATE-0007 applied 2026-06-29 (CC via Neon MCP) | Phase 0 emergency |
| P1-006 | n8n owns event memory — events lost on n8n restart | n8n workflows | OPEN | Phase 4 |
| P1-007 | `INTAKE_COMMS_ENABLED` ghost flag — zero code gates in tech-pwa/src | codebase-wide | OPEN | Phase 4 |
| P1-008 | E2E dispatch tests flaky on preview env ("shows all seeded TEST jobs" & "list to emailType inspection" fail with element not found); no CI baseline on main to confirm pre-existing | E2E Tests | OPEN (branch fix/s171-ut-ag noted) | Unrelated to UploadThing changes |

---

## WO PARSING BUGS (deferred — Phase 3, pipeline bugs not features)

| ID | Bug | Location | Status | Phase |
|---|---|---|---|---|
| WO-P3-001 | `commsMessages` never written on intake → Comms tab blank → dead GAS fallback fires | `lib/intake/parseEmailToWO.ts` | OPEN — locked in `artifacts/TC-WO-PARSING-phase3-implementation-plan.md` | Phase 3 |
| WO-P3-002 | Sender regex fails on bare email addresses (no `<>` brackets) → wrong requester name/email | `lib/intake/parseEmailToWO.ts` | OPEN — same doc | Phase 3 |
| WO-P3-003 | `EMAIL-<GUID>` rendered as job ID in JobDetailModal → needs `workOrderNumber` schema + display fix | `components/dashboard/JobDetailModal.tsx`, `lib/schema.ts` | OPEN — FROZEN (schema change) | Phase 3 (after schema gate opens) |

**Source doc:** `artifacts/TC-WO-PARSING-phase3-implementation-plan.md` — multi-AI audited (ChatGPT 5.5, Claude, DeepSeek V4 Pro, Grok 4.2). Migration slot: 0011+ (0010 taken by UploadThing).

---

## COMPLIANCE GAPS (deferred — Phase 3/4, no current exposure)

| ID | Gap | Spec Rule | Deferred To |
|---|---|---|---|
| CG-001 | No rounding detection — system must reject/flag any non-exact-minute timestamps | Wage_Hour_PAGA_Compliance.md §1.1 (*Donohue v. AMN Services*) | Phase 3 |
| CG-002 | 4-punch enforcement not mandatory — break punches are optional | §1.2 | Phase 3 |
| CG-003 | Attestation is boolean only — no Option A (voluntary/no premium) vs Option B (employer-initiated/premium owed) distinction | §2.3 | Phase 3 |
| CG-004 | Rest break entitlement engine missing — 10 min per 4h worked not calculated or surfaced | §3.1 | Phase 3 |
| CG-005 | Recovery break (Cal/OSHA heat illness) not tracked or flagged | §3.2 | Phase 3 |
| CG-006 | Rest & recovery attestation not in clock-out flow | §3.3 | Phase 3 |
| CG-007 | No premium pay flag — LC §226.7 premium not computed or stored; no daily 2-hour cap | §4.1/4.2 | Phase 4 |
| CG-008 | RROP not tagged — premiums must use Regular Rate of Pay per *Ferra* decision | §4.3 | Phase 4 (payroll integration) |

**Rationale for deferral:** CC never used in production. Zero techs have clocked in. Zero PAGA exposure. Will resolve before select-tech pilot. Source of record: `docs/Wage_Hour_PAGA_Compliance.md`.

---

## MEDIUM (P2) — Minor degradation

| ID | Issue | Status | Phase |
|---|---|---|---|
| P2-001 | `normalizeLegacyStatus()` — missing edge case mappings | OPEN | Phase 3 |
| P2-005 | `Missing Google AI API Key` on `/api/webhooks/n8n/gmail` — GEMINI_API_KEY or GOOGLE_AI_API_KEY unset in that deployment | OPEN | Immediate |
| P2-002 | Code.js > 200 lines — GAS business logic not yet removed | Phase 4 |
| P2-008 | ESCALATED → P1-010 (2026-06-29) — confirmed active silent production failure |
| P2-003 | `/api/health` exists but Neon auto-suspend causes `NeonDbError: Couldn't connect to compute node` on first request after idle period — 1 occurrence 2026-06-29T02:57Z (deployment dpl_9fkF9C5ZYRZiyaU5vZdaSCDxnd2M) | OPEN — Phase 3 synthetic heartbeat is the fix |
| P2-006 | UptimeRobot not yet monitoring `/api/health` — uptime blind | OPEN | Phase 3 |
| P2-007 | `next-auth InvalidCheck: pkceCodeVerifier value could not be parsed` on `/api/auth/[...nextauth]` — 1 occurrence 2026-06-29T10:02:23Z; likely session cookie disrupted during rollback/deployment transition | OPEN — monitor for recurrence; single transient occurrence |
| P2-004 | n8n dispatch job ID corruption (stale context bug) | OPEN | Phase 3 |

---

## INFRASTRUCTURE NOTES

```yaml
vercel_runtime_logs: always 403 Forbidden — surface errors in API response body instead
neon_branch_status: healthy
auto_deploy: LIVE (merge to main → READY ~90s)
  WARNING: Vercel Instant Rollback suspends auto-deploy promotion until manually cancelled.
  After rollback drill 2026-06-29, d2c7328d built but did not go live until Brandon manually
  promoted via dashboard. Future rollbacks require same manual re-promotion to restore live.
ci_cd: GitHub Actions, coverage enforced, E2E nightly/manual only <!-- CI-001 -->
```

---

## WORKAROUNDS IN USE

| Workaround | Replaces | Remove When |
|---|---|---|
| `DASHBOARD_API_URL` served from GAS (renamed off `NEXT_PUBLIC_` prefix — TC-PH1-001) | Neon `staff_permissions`, zero GAS calls in auth path | Phase 1 complete (Clerk migration, TC-PH1-003) |
| GAS email polling (15-min cycle) | Postmark Inbound (push) | Phase 0 Postmark complete |
| localStorage tech session | HttpOnly cookie (Phase 0 Clerk/Lucia) | Phase 0 auth complete |
| Manual `db:migrate` before deploy | Atomic migration in build | Phase 2 complete |

---

## SECURITY INCIDENTS (resolved)

| ID | Incident | Root Cause | Resolution | Date |
|---|---|---|---|---|
| CINC-001 | Neon PostgreSQL URI exposed in GitHub — `archive/agents/hook_logs/ae5744aa-.../UserPromptSubmit.jsonl` and 2 other files (1 context bundle) committed in TC-PURGE-001 (638b944f). GitGuardian alert received. | TC-PURGE-001 swept entire working directory into `archive/` including live agent session hook logs which captured `DATABASE_URL` from hook environment context. | (1) Neon prod + dev `neondb_owner` passwords rotated; (2) Vercel env vars deleted + recreated with new strings; (3) local `.env.local` updated; (4) git history purged via `git filter-repo` — all 1136 commits rewritten, `archive/agents/` removed; (5) force pushed to main (17bca513); (6) `.gitignore` permanently blocks `archive/agents/{hook_logs,context_bundles,security_logs}` and `session-summary.tmp`. New Vercel deployment `dpl_HZaXvnRTq2XvHX3gX6eqjZU3PAfq` READY. | 2026-06-29 |

---

## CLOSED ISSUES (reference)

| ID | Issue | Closed | PR |
|---|---|---|---|
| C-001 | `dispatch_sent_at` column still in prod schema (migration 0008 missing) | 2026-06-25 | #22 |
| C-002 | n8n HTTP → keypair auth; SENT/DRAFT guards added | 2026-06-25 | #22 |
| C-003 | 2 WOs recovered (3217–3218) from bad FSM state | 2026-06-25 | #22 |
| C-004 | Apple Mail forward format detected in Lapham parser | 2026-06-26 | #24 (pending) |
| C-005 | Camera upload route throws (broken S3 wrapper) | 2026-06-29 | #25 (merged — UploadThing) |
| C-006 | Resend "Missing API key" on /intake (Sentry, 33 events over 6d, escalating) — resolved by PR #25 `\|\| 're_placeholder'` fallback + RESEND_API_KEY confirmed set in Vercel; 0 occurrences in 48h as of 2026-06-29 | 2026-06-29 | — |
| C-007 | `job_photos` table MISSING in prod (migrations 0009+0010 never applied after infra migration to purple-dust-72858226) — every UploadThing photo upload failed at DB insert | 2026-06-29 | TC-MIGRATE-009-010 (CC via Neon MCP) |
| C-008 | `workflow_events` table MISSING in prod (migration 0007 targeted old project ep-jolly-morning only) — all domain events silently dropping, n8n receiving nothing, Resend fallback firing on every event | 2026-06-29 | TC-MIGRATE-0007 (CC via Neon MCP) |
| C-009 | `drizzle.__drizzle_migrations_id_seq` out of sync (last_value=2, max_id=7) — root cause unknown (infra migration to purple-dust-72858226 not captured in git history; public schema sequences all verified in sync); fixed with `setval('drizzle.__drizzle_migrations_id_seq', 7)` before TC-MIGRATE-0007 INSERT; see DEPLOYMENT.md §NEON PROJECT MIGRATION for guard | 2026-06-29 | setval verified; sequence at 10 post-migration; public schema audit clean |
