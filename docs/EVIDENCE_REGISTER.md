# Evidence Register

**Rule:** No agent may claim something works without an entry here.
**Format:** One row per verified claim. Evidence must be a link, output, query result, screenshot, or deployment log — not prose.

| Date | Claim | Evidence Type | Link / Output | Verified By | Re-validate By | Invalidation Triggers |
|---|---|---|---|---|---|---|
| 2026-06-29 | Rollback proven < 5 min | Timed drill | Vercel Instant Rollback: sub-second promotion, tested by Brandon | CC + Brandon | 2026-09-29 | Any change to Vercel project config or team permissions |
| 2026-06-29 | Auth vendor: Clerk | Decision doc | docs/AUTH_DECISION.md | CC + Brandon | Never (decision is final unless reversed) | Brandon explicitly reverses decision |
| 2026-06-29 | DB integrity snapshot: 800 jobs, status breakdown | Neon query | Neon project purple-dust-72858226, docs/DATA_INTEGRITY_AUDIT.md | CC | 2026-07-29 | Any bulk job status mutation |
| 2026-06-29 | Sentry/Vercel baseline measured | Vercel MCP runtime errors (48h) | Active: P2-003 Neon cold start (1x /api/health), P2-007 PKCE transient (1x /api/auth). Resend: 0 errors in 48h (resolved). Historical storm (dpl_B, infra migration) retired. | CC | 2026-07-29 | Any new Sentry alert or Vercel runtime error spike |
| 2026-06-29 | Instant Rollback freeze behaviour documented | Operational observation | After rollback drill, d2c7328d built READY but did not serve production — required manual "Promote to Production" in Vercel dashboard. KNOWN_ISSUES.md infrastructure notes updated. | CC + Brandon | Never (operational rule) | Any Vercel rollback workflow change |
| 2026-06-29 | A-003 compliance audit complete | Code analysis + schema query | compliance.ts vs Wage_Hour_PAGA_Compliance.md: 8 gaps documented (CG-001–008); system never used in prod; zero PAGA exposure; remediation deferred Phase 3/4 | CC + Brandon | Never (decision is final until pilot begins) | CC goes live with real techs |
| 2026-06-29 | `workflow_events` table created in prod (TC-MIGRATE-0007) | Neon MCP query | `SELECT to_regclass('public.workflow_events')` → `workflow_events`; columns 9/9 correct; `idx_workflow_events_status` present; drizzle tracking 8 rows; hash `09026f4a...` verified | CC | 2026-09-29 | Any DROP or schema change to workflow_events |
| 2026-06-29 | `job_photos` table created in prod (TC-MIGRATE-009-010) | Neon MCP query | `SELECT to_regclass('public.job_photos')` → `job_photos`; `job_id=text`, `photo_url` present, `photo_data` absent; `idx_job_photos_job_id` present; drizzle tracking 10 rows; test insert/select/delete clean | CC | 2026-09-29 | Any DROP or schema change to job_photos |
| 2026-06-29 | `drizzle.__drizzle_migrations_id_seq` sequence repaired | Neon MCP query | `last_value` was 2, `MAX(id)` was 7 (infra migration gap); fixed via `setval(..., 7)` before TC-MIGRATE-0007 insert; subsequent inserts at id=8,9,10 succeeded | CC | Never (operational fix) | Any future infra migration / Neon branch clone to new project |
| 2026-06-28 | Cloudflare email intake operational | Commit | f0af7347 (WF-006 merged) | CC | 2026-07-28 | Any change to workers/email-intake/ |

---

## What Counts as Evidence

| Type | Acceptable | Not Acceptable |
|---|---|---|
| Test | CI run link + pass/fail output | "tests pass" |
| Deployment | Vercel deployment URL + health check | "deployed successfully" |
| DB state | Query result with row counts | "data looks right" |
| Auth | Screenshot of auth flow working | "auth is fixed" |
| Integration | E2E Playwright run or log | "integration tested" |
| Sentry | Screenshot showing 0 new errors post-deploy | "no errors seen" |
| Rollback | Timed drill log (<5 min) | "rollback is possible" |

## Stale Evidence Protocol

- `Re-validate By` = 30 days default; reset to 7 days if schema/auth/workflow changes
- `Invalidation Triggers` = specific file/event that makes this claim untrue
- Monthly: CC scans for entries past `Re-validate By` date
- Stale entry = Task Card to refresh before phase gate can close
- "Evidence was valid when captured" ≠ "evidence is valid now"

---

## Architecture Names Are Not Evidence

These exist but are NOT proof of correct behavior:
- FSM exists ≠ FSM handles all transitions correctly
- EventBus exists ≠ events survive restart
- RBAC exists ≠ unauthorized users are blocked
- outbox table exists ≠ events are consumed
- test file exists ≠ behavior is verified
