# RULES.md — APT Central Command
# Universal constraints for all agents on this project.
# Load this FIRST, before any other context. Every line is load-bearing.
# Last updated: 2026-05-21

---

## PRE-ACTION GATES — run before every implementation task

Before writing code, running commands, or touching files:

1. **State the root cause** — not the symptom. Cannot state root cause = stop, investigate.
2. **State the exact file(s)** that contain the fix. No file = not a fix.
3. **Reject all operational shortcuts** — NEVER acceptable:
   - Killing/restarting servers to work around a config problem → BLOCK. Fix the config file.
   - Setting shell env vars to override what a config file should set → BLOCK. Fix the file.
   - Manually clearing build caches to force recompilation → BLOCK. Fix the env var.
   - Pre-starting servers to avoid timeouts → BLOCK. Fix the timeout value in config.
   - Running multiple iterations while adjusting operational parameters → BLOCK. Identify root cause first.
4. **Make one fix** — the minimal correct change that eliminates the root cause.
5. **Run once** — wait for the result. Never retry with operational adjustments.

Any impulse to do something at the OS or shell level instead of editing a file = stop = go back to step 1.

---

## CRITICAL WARNINGS

**API KEY RULE:** Any change to DashboardAPI.gs auth (`publicActions` or `validateApiKey`) MUST update all 3 frontend call sites atomically:
- `src/lib/dashboard-api.ts`
- `src/auth.ts`
- `src/app/api/push/subscribe/route.ts`

**REQUIRED INFRASTRUCTURE:** `DASHBOARD_API_KEY` Script Property must exist in DashboardAPI.gs. `DASHBOARD_API_KEY` (server-only, **no** `NEXT_PUBLIC_` prefix) must match in Vercel env. If either is missing, CC2.0 goes dark silently.

**AUTH HOOK RULE — NEVER MIX:**
- Office staff pages (`/live`, `/schedule`, `/team`, etc.): `useSession()` from `next-auth/react`
- Tech PWA pages (`/jobs`, `/job/[jobId]`, `/clock`, etc.): `getSession()` from `@/lib/auth`
- Wrong hook = redirect loop. If unsure, flag to Claude Code before writing the component.

**NEVER RUN:** `catchUpMissedEmails()`, `resetBackfill()`, `setupBackfillTrigger()`, `archiveOldJobsConfirmed()`, `mineScheduleSheet()`

**AUTO-REPLY:** `AUTO_REPLY_ENABLED = false` — Brandon enables manually when Robert is confidently using the dashboard.

---

## HARD CODE PROHIBITIONS

- **No `as any`** — zero casts, no exceptions. Any found in diff = BLOCK.
- **No production data in repo** — no `data_exports/`, real JSON records, or customer data.
- **No secrets in any committed file** — no UUID-shaped strings, hex tokens, DSNs, or key-like patterns in code, diffs, or test artifacts. Found = hard FAIL, require rotation.
- **No `NEXT_PUBLIC_` prefix on server-only secrets.**
- **Dual auth on every new `/api/` route** — `auth()` session check + `x-api-key` header check, both → 401. Missing either = BLOCK.

---

## BRANCH RULE

Always commit to `feat/[feature-name]`. Never directly to `main`. Any sprint commit found on `main` = BLOCK and investigate.

---

## LOCKED DECISIONS

**Status lifecycle — FSM truth (6 valid states):**
- Valid: Needs Info | Awaiting Tenant | Ready to Schedule | Scheduled | In Progress | Complete
- Terminal: Archived (no transitions out)
- Legacy GAS states — NOT valid FSM inputs; normalize to Needs Info on encounter: PTE Required | Awaiting Approval | Needs Review
- See domain/job/job-state.ts for canonical arc definitions. RULES.md is not the source of truth for status.
- RtS → Scheduled: auto on PATCH when tech + date + time all present (server-side, live)
- "Awaiting Approval" is NOT a tenant response flag — use badge/push instead

**Infrastructure:** No PC-local dependencies in production. All infra on Vercel / Railway / Cloudflare.

---

## DESIGN STANDARDS

**Orthogonality** — see `docs/ORTHOGONALITY.md` (load for any feature or schema work)
- One data path per feature: read and write in the same system
- One source of truth per concept: if it's in domain/, it's in the DB
- Cross-cutting constraints (auth, orgId) enforced at framework level, not per-route
- Shared logic lives in shared modules — never duplicated across files

**Testing** — see `docs/TESTING.md` (load before writing any test)
- Integration tests required for every `/api/` route
- Tests must verify DB state, not just HTTP response
- FSM tests must use real DB — mocked DAL hides prod bugs
- Coverage enforced in CI (vitest run --coverage, thresholds: lines 90 / functions 90 / branches 80)

**Code quality**
- `no-explicit-any: error` in eslint — no exceptions, no CI bypass
- `no-unused-vars: warn` — clean up before merge
- Dual auth on every `/api/` route: session OR x-api-key, missing = BLOCK
