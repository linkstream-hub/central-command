# KNOWN_ISSUES.md — APT Central Command
# Active bugs, risks, workarounds. Live tracking — update when status changes.
# Last updated: 2026-06-26

---

## CRITICAL (P0) — Production-impacting, no workaround

| ID | Issue | Location | Status | Phase |
|---|---|---|---|---|
| P0-001 | `NEXT_PUBLIC_DASHBOARD_API_URL` exposed in client bundle — GAS URL visible in page source | `src/auth.ts`, `src/app/api/gas/route.ts`, `src/app/api/comms/[jobId]/route.ts:53` | OPEN | Phase 1 |
| P0-002 | Tech session stored in `localStorage['apt_tech_session']` — XSS-exploitable, no expiry enforcement | `src/lib/auth.ts`, `src/lib/tech-session.ts` | OPEN | Phase 0 (Clerk/Lucia) |
| P0-003 | GAS controls staff permissions on every login — single point of failure, unstable | `src/auth.ts:fetchStaffPermissions()` | OPEN | Phase 0 (Clerk/Lucia) |
| P0-004 | Next.js version `16.2.6` is phantom (does not exist) — unverified package ecosystem | `tech-pwa/package.json` | OPEN | Phase 2 |
| P0-005 | 138 WOs with FSM-dead status `Needs Info` in prod — converted from broken states | `domain` layer, Neon `work_orders` table | OPEN | Phase 3 |

---

## AUDIT FINDINGS — Phase 1 Prerequisites (must resolve before Phase 1 Task Cards)

| ID | Finding | Source | Status | Blocks |
|---|---|---|---|---|
| AF-001 | NEXT_PUBLIC_ scope 10x worse than mapped: 200 symbols across 68 files. Cannot scrub blindly — must categorize legitimately-public vs. server-only vs. ghost vars first | AG Codegraph Audit 2026-06-26 | OPEN — categorization audit required | Phase 1 Task Card for secret removal |
| AF-002 | GAS calls route through Cloudflare Worker proxy (`Sentinels/worker.js` → `DASHBOARD_API_URL`). Phase 1 env var rename is not enough — worker must be decommissioned or rerouted | AG Codegraph Audit 2026-06-26 | OPEN — architecture decision required | Phase 1 GAS exit path |

---

## HIGH (P1) — Degraded functionality, workaround exists

| ID | Issue | Location | Status | Phase |
|---|---|---|---|---|
| P1-001 | Single `DEV_BYPASS_AUTH` guard — only checks `NODE_ENV + VERCEL_ENV`, no secret | `src/auth.ts` | OPEN | Phase 1 |
| P1-002 | `npm run build` = `next build` only — no migration run; migrations manual | `tech-pwa/package.json` | OPEN | Phase 2 |
| P1-003 | Camera upload route throws (broken S3 wrapper) | `src/app/api/jobs/[id]/photo/route.ts` | OPEN | Phase 0 (UploadThing) |
| P1-004 | Push subscribe writes to GAS instead of Neon | `src/app/api/subscribe/route.ts` | OPEN | Phase 3 |
| P1-005 | n8n email intake: Apple Mail forward format not detected by Lapham parser | `src/lib/parsers/lapham.ts` | DIAGNOSED, UNCOMMITTED | Phase 3 |
| P1-006 | n8n owns event memory — events lost on n8n restart | n8n workflows | OPEN | Phase 4 |
| P1-007 | `INTAKE_COMMS_ENABLED` ghost flag — zero code gates in tech-pwa/src | codebase-wide | OPEN | Phase 4 |

---

## MEDIUM (P2) — Minor degradation

| ID | Issue | Status | Phase |
|---|---|---|---|
| P2-001 | `normalizeLegacyStatus()` — missing edge case mappings | OPEN | Phase 3 |
| P2-005 | `Missing Google AI API Key` on `/api/webhooks/n8n/gmail` — GEMINI_API_KEY or GOOGLE_AI_API_KEY unset in that deployment | OPEN | Immediate |
| P2-002 | Code.js > 200 lines — GAS business logic not yet removed | Phase 4 |
| P2-003 | No `/api/health` endpoint — uptime monitoring blind | OPEN | Phase 3 |
| P2-004 | n8n dispatch job ID corruption (stale context bug) | OPEN | Phase 3 |

---

## INFRASTRUCTURE NOTES

```yaml
vercel_runtime_logs: always 403 Forbidden — surface errors in API response body instead
neon_branch_status: healthy
auto_deploy: LIVE (merge to main → READY ~90s)
ci_cd: GitHub Actions, coverage enforced, E2E nightly/manual only <!-- CI-001 -->
```

---

## WORKAROUNDS IN USE

| Workaround | Replaces | Remove When |
|---|---|---|
| `NEXT_PUBLIC_DASHBOARD_API_URL` served from GAS | Proper server-side secret | Phase 1 complete |
| GAS email polling (15-min cycle) | Postmark Inbound (push) | Phase 0 Postmark complete |
| localStorage tech session | HttpOnly cookie (Phase 0 Clerk/Lucia) | Phase 0 auth complete |
| Manual `db:migrate` before deploy | Atomic migration in build | Phase 2 complete |

---

## CLOSED ISSUES (reference)

| ID | Issue | Closed | PR |
|---|---|---|---|
| C-001 | `dispatch_sent_at` column still in prod schema (migration 0008 missing) | 2026-06-25 | #22 |
| C-002 | n8n HTTP → keypair auth; SENT/DRAFT guards added | 2026-06-25 | #22 |
| C-003 | 2 WOs recovered (3217–3218) from bad FSM state | 2026-06-25 | #22 |
| C-004 | Apple Mail forward format detected in Lapham parser | 2026-06-26 | #24 (pending) |
