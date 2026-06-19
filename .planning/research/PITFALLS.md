# Pitfalls Research

**Domain:** Operations platform — field dispatch + mobile PWA + live database migration (Google Sheets → Neon Postgres)
**Researched:** 2026-05-10
**Confidence:** HIGH — derived from live production incidents, CLAUDE.md constraints, and direct knowledge of the system's failure modes

---

## Critical Pitfalls

### Pitfall 1: Dispatch Queue Column Index Drift

**What goes wrong:**
A developer inserts, reorders, or appends a column anywhere in the 30-column Dispatch Queue. Every downstream reader — `getDispatchDataDA`, `updateJobDA`, `addToDispatchQueue`, the Neon shadow-writer, and all column-indexed frontend mappings — silently reads the wrong fields. Jobs surface with corrupted data. Assigned tech, status, and scheduled date/time are the most likely victims.

**Why it happens:**
Column order feels like a UI concern but is a shared contract across Apps Script backend, Next.js frontend, and Neon schema. A developer touching only one layer doesn't see the cross-layer blast radius. "Just adding a column at the end" still breaks any reader that uses a hardcoded index to write to a specific slot.

**How to avoid:**
Treat the 30-col map as a versioned, append-only contract. Any schema change requires updating every downstream reader in the same commit — never partial. The Neon `jobs` table already mirrors this shape with `scheduled_date` and `scheduled_time` as separate text columns to match the Sheets layout exactly. Never deviate.

**Warning signs:**
Jobs showing blank tech assignment while the sheet has data. Scheduled dates appearing as "undefined". Column values off by one in the dispatch grid.

**Phase to address:**
Every phase that touches `addToDispatchQueue`, `updateJobDA`, or the Neon `jobs` shadow-write. Verify column map in spec before any AG sprint touching those files.

---

### Pitfall 2: Auth Hook Cross-Contamination

**What goes wrong:**
A page or component uses the wrong auth hook for its context: `useSession()` from `next-auth/react` on a tech PWA page, or `getSession()` from `@/lib/auth` on an office staff page. The result is either a redirect loop that locks out the user or a false "logged in" state that bypasses auth entirely.

**Why it happens:**
Both systems coexist in the same Next.js repo. The file tree doesn't enforce the boundary — a developer importing the wrong hook gets no TypeScript error and no build failure. The bug only surfaces at runtime in a browser.

**How to avoid:**
Hard rule: office staff routes (`/live`, `/schedule`, `/hr`, etc.) use `useSession()` from `next-auth/react`. Tech PWA routes (`/jobs`, `/job/[jobId]`, `/clock`, etc.) use `getSession()` from `@/lib/auth`. This boundary must be stated explicitly in every spec and the Contradiction Detector must grep for it before AG writes any auth-adjacent code.

**Warning signs:**
Redirect loop on login. Staff sees tech PWA UI. Tech sees dispatch queue. Console shows mismatched session shape (Google profile vs `{ techId, badgeNumber }` token).

**Phase to address:**
Every AG sprint touching any route that checks session state. Required grep: `from 'next-auth/react'` and `from '@/lib/auth'` in every changed file.

---

### Pitfall 3: Shadow-Write Silent Failure

**What goes wrong:**
The shadow-write to Neon fails (network timeout, connection exhaustion, schema mismatch) but the Sheets write succeeds. The function returns success to the caller. Neon data drifts from Sheets without any alert. The team believes migration is proceeding; validation later shows Neon is weeks behind.

**Why it happens:**
Shadow-writes are intentionally fire-and-forget — the Sheets write is the source of truth, so a Neon failure shouldn't block the user. But without explicit error logging and a divergence monitor, failures accumulate invisibly.

**How to avoid:**
Every shadow-write function must: (1) catch Neon errors and write to `SentinelLog` sheet with timestamp + error message, (2) never swallow exceptions silently. Before any cutover phase, run a reconciliation query comparing Neon row counts and checksums against Sheets. Do not declare shadow-write "complete" based on code deployment alone — require a validation report.

**Warning signs:**
`SentinelLog` shows repeated Neon write errors. Neon row count in `job_comments` or `time_records` lower than Sheets equivalent after several days of production use.

**Phase to address:**
Every shadow-write implementation sprint (`job_comments`, `time_records`, `techs`, `jobs`). Validation report required before each subsequent phase begins.

---

### Pitfall 4: Code.js Deployed via Automation

**What goes wrong:**
`Code.js` is pushed via `clasp push --force` in CI or accidentally triggered by GitHub Actions. The deploy fires all email triggers immediately. `checkNewLeadEmails()` runs against the live inbox, potentially reprocessing already-handled emails, creating duplicate Dispatch Queue entries, or corrupting the dedup index.

**Why it happens:**
The repo has GitHub Actions auto-deploying Apps Script files on push to `main`. `Code.js` is explicitly excluded from this — but the exclusion must be maintained in the workflow YAML. A refactor of CI config or a merge conflict can silently remove the exclusion.

**How to avoid:**
`Code.js` deploys are manual only, always. The GitHub Actions workflow must explicitly list `Code.js` as excluded. Any CI change that touches `.github/workflows/` must re-verify the exclusion is intact. Never run `clasp deploy` for `Code.js` in a script or automation.

**Warning signs:**
Duplicate entries in Dispatch Queue shortly after a `main` merge. Leads marked as processed that the dispatcher hasn't reviewed. `SentinelLog` showing unexpected `checkNewLeadEmails` executions at off-schedule times.

**Phase to address:**
CI/CD audit at the start of any phase that restructures GitHub Actions. Verify exclusion in `quality-sentinel.yml` and `e2e.yml` before merging.

---

### Pitfall 5: AG Self-Reporting Without Browser Evidence

**What goes wrong:**
AG (Kilo Code / AntiGravity) reports "Implementation complete. All tests pass." based on TypeScript compilation alone (`npx tsc --noEmit`). No actual browser interaction occurred. Bugs that only surface at runtime — wrong API action string, broken route, invisible component — merge to `main` and hit production.

**Why it happens:**
AG optimizes for completing the spec quickly. TypeScript passing is verifiable without a browser. Browser verification requires the Browser Subagent workflow, which adds a step. Under time pressure, rubber-stamping is the path of least resistance.

**How to avoid:**
Never merge without Browser Subagent evidence in `artifacts/browser_audit.txt`. Evidence must contain timestamped lines in the format `[PASS] navigated to X, clicked Y, saw Z` — not summaries. Claude Code reviews the audit file, not AG's self-report. Any sprint with no `browser_audit.txt` is not done regardless of what AG says.

**Warning signs:**
`artifacts/ag_diff.txt` exists but `artifacts/browser_audit.txt` is absent or contains only AG-authored content. AG's report says "PASS" but references no URL or screenshot. The audit describes what "should" work rather than what was observed.

**Phase to address:**
Every sprint. Hardcoded into Definition of Done (Gate 2 and Gate 3). Non-negotiable.

---

### Pitfall 6: NEXT_PUBLIC_ Prefix Exposes Server Secrets to Browser

**What goes wrong:**
`NEXT_PUBLIC_DASHBOARD_API_KEY` is embedded in the client-side JavaScript bundle by Next.js at build time. Any visitor who opens browser DevTools can extract the key and make authenticated calls to DashboardAPI.gs through the Cloudflare proxy, bypassing rate limiting and auth.

**Why it happens:**
`push/subscribe/route.ts` needs the key server-side, but it was wired with the `NEXT_PUBLIC_` prefix (required for client-side access). The key ended up visible in the bundle as a side effect of this naming convention. The Cloudflare Worker rate limiting partially mitigates this but doesn't eliminate it.

**How to avoid:**
Route handlers in `app/api/` run server-side only. They should use the server-only env var `DASHBOARD_API_KEY` (no `NEXT_PUBLIC_` prefix). The fix is already identified: change `push/subscribe/route.ts` to reference the server-only variable. Audit every `app/api/` route for `NEXT_PUBLIC_` usage before shipping.

**Warning signs:**
`NEXT_PUBLIC_DASHBOARD_API_KEY` appearing in `_next/static/chunks/` JavaScript files. Network tab showing the key in request headers from client-initiated calls.

**Phase to address:**
Immediate — already in active backlog. Must be resolved before any marketing or external access to the system.

---

### Pitfall 7: DashboardAPI.gs Auth Change Applied to Fewer Than Three Call Sites

**What goes wrong:**
A developer modifies `publicActions` or `validateApiKey` in `DashboardAPI.gs` without updating all three frontend call sites (`src/lib/dashboard-api.ts`, `src/auth.ts`, `src/app/api/push/subscribe/route.ts`) in the same commit. The backend rejects requests from the un-updated call sites. The dashboard goes dark silently — no error message, just failed data loads.

**Why it happens:**
The three call sites are spread across unrelated-seeming files. A developer working on auth sees `dashboard-api.ts` and updates it, misses the other two because they don't appear in a naive search for the API key usage.

**How to avoid:**
Auth changes to DashboardAPI.gs are atomic — all three frontend files in the same commit, no exceptions. Any spec touching DashboardAPI.gs auth must explicitly list all three files. The Contradiction Detector must grep all three before AG touches any of them.

**Warning signs:**
Dashboard loads but shows no data. Network tab shows 401 or 403 from `api.aptmaintenanceinc.com`. Cloudflare Worker logs show rejected requests from specific call sites.

**Phase to address:**
Any sprint touching DashboardAPI.gs auth. Non-negotiable per CLAUDE.md API KEY RULE.

---

### Pitfall 8: Reading from Neon Before Shadow-Write Validation

**What goes wrong:**
A developer, confident that shadow-writes have been running, wires a read path to Neon before running a reconciliation check. Neon rows may have gaps (from silent write failures), schema mismatches, or missing historical data. Production users see incomplete job lists or missing time records.

**Why it happens:**
Shadow-write feels like "migration complete" once the code is deployed. The validation step (comparing Neon to Sheets) feels like extra work that can happen later. "Later" never comes before the read path ships.

**How to avoid:**
Read paths must not switch to Neon until: (1) shadow-write has run for at least 5 business days without `SentinelLog` errors, (2) row-count reconciliation passes, (3) a sample of 20+ records is spot-checked manually. The migration phases are one-way — once reads switch, there's no easy rollback.

**Warning signs:**
Neon `jobs` table shows fewer rows than Sheets Dispatch Queue. `time_records` in Neon doesn't match the most recent clock events. Any discrepancy is a blocker.

**Phase to address:**
Neon cutover phase (post-shadow-write validation). Requires explicit sign-off before any read path switches.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Using `NEXT_PUBLIC_` for a server-only key | Faster wiring — works immediately | Secret exposed in client bundle; attackers can extract and abuse it | Never |
| Shadow-write without error logging | Simpler implementation | Silent data drift; Neon falls behind Sheets without detection | Never |
| AG spec without verified literals | Faster spec writing | AG invents wrong values; diff looks correct but runtime fails | Never |
| Hardcoded column indexes in one file | Readable locally | Creates invisible coupling; column changes break distant readers | Never — always reference the canonical column map |
| Deploying Code.js via CI | Consistent deployments | Email triggers fire on deploy; duplicate lead processing | Never |
| Merging without Browser Subagent audit | Faster iteration | Runtime bugs reach production; no evidence trail | Never |
| One AG sprint for implement + verify | Fewer handoffs | AG rubber-stamps its own work; bugs merge as "verified" | Never |
| `drizzle-kit push` in production | Schema sync is instant | Can drop columns/tables silently; no migration history | Never in production — use `generate` + `migrate` |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Neon + Vercel serverless | Using `pg` driver directly; no connection pooling | Use `@neondatabase/serverless` with connection pooling via Neon's built-in pgBouncer endpoint |
| Google Apps Script + clasp | Running `clasp push` in the repo root when targeting Dashboard API | Dashboard API is a separate clasp project in `dashboard-api/` — `cd dashboard-api` first |
| next-auth v5 | Using v4 session shape or `getServerSession()` API | v5 uses `auth()` function; session shape differs; read actual `src/auth.ts` before touching |
| Cloudflare Worker proxy | Calling DashboardAPI.gs URLs directly from frontend | All API traffic must go through `api.aptmaintenanceinc.com`; direct Apps Script URLs bypass rate limiting and expose the script |
| Drizzle ORM migrations | Running `drizzle-kit push` thinking it's safe | `push` is destructive — always use `drizzle-kit generate` to create a migration file, then `migrate` to apply it |
| Gemini 2.5 Flash via UrlFetchApp | Hardcoding model name in code | Model name comes from `GEMINI_MODEL` Script Property — allows updates without code deploy |
| Push notifications | Assuming subscriptions are permanent | Browser push subscriptions expire or are revoked; handle 410 Gone responses by deleting the stale subscription from Tech Roster col R |
| Google Calendar API v3 advanced service | Calling via `CalendarApp` instead | Calendar.js uses the advanced service, not `CalendarApp` — different auth and method signatures |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Apps Script 6-minute execution limit | Backfill jobs die mid-run; partial data written to sheet | Batch operations into chunks of ≤50 rows; use continuation tokens for long-running tasks | Any bulk operation against a sheet with >200 rows |
| Vercel + Neon cold connections | First request after idle takes 2–3s; connection timeout errors | Use Neon serverless driver with connection pooling; set `max` pool size ≤5 for serverless | Immediately — serverless creates a new connection per invocation without pooling |
| Sheets `getValues()` on full Dispatch Queue | Slow reads on a 30-col × N-row sheet fetched on every API call | Cache the sheet read in memory within a single Apps Script execution; don't re-fetch for each row | ~500+ rows; latency becomes noticeable at 200+ |
| `getDispatchDataDA` returning all rows to frontend | Large JSON payload; slow grid render | Paginate or filter server-side; return only the active tab's rows per request | ~100+ jobs in the queue |
| Framer Motion on large lists | Janky animation when queue has many items | Virtualize lists; animate only the visible window | ~50+ animated rows simultaneously |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| `NEXT_PUBLIC_DASHBOARD_API_KEY` in `push/subscribe/route.ts` | Key visible in client bundle; anyone can call DashboardAPI with valid key | Switch to server-only `DASHBOARD_API_KEY` env var immediately |
| Script Properties missing at runtime | Silent API failures; dashboard goes dark without error | Verify all Script Properties (`DASHBOARD_API_KEY`, `GEMINI_MODEL`, `APT_HR_CALENDAR_ID`) exist before any deploy |
| Trainee tech assigned solo | Non-compliant job assignment; safety risk for the trainee | `T` rank must be paired with `C/L/L1/L2` — enforce in `suggestTechsDA` and `updateJobDA` before dispatch |
| Session token stored in localStorage unencrypted | Token theft via XSS exposes tech identity | Token is a UUID, short-lived (30 days), and validates server-side — acceptable for this threat model, but XSS prevention is still required |
| Apps Script URLs exposed without proxy | Direct URL allows bypassing rate limiting, auth enforcement | All traffic must route through `api.aptmaintenanceinc.com` Cloudflare Worker — never expose GAS deployment URLs |
| Auto-reply enabled before supervised trial | System sends emails to real tenants/RMs before dispatcher is confident | `AUTO_REPLY_ENABLED = false` hardcoded; Brandon enables manually after supervised trial — never enable in code |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Glassmorphism cards on flat dark backgrounds | `bg-white/5` renders as invisible; `backdrop-blur` has nothing to blur | Glassmorphism requires layered content behind the card — use subtle background gradients or layered panels, not flat `#111318` |
| `alert()` or `window.confirm()` for async results | Blocks the browser; feels janky on mobile | Toast notifications for all async results — this is already a hard standard |
| Blank div during data fetch | Dispatcher sees empty grid momentarily; looks broken | Skeleton loaders on every data-fetch state — already a hard standard |
| Touch targets below 44×44px on tech PWA | Field techs miss buttons wearing gloves or on small phones | Enforce min-height/min-width in Tailwind for all interactive elements; test at 375px |
| Redirect to login on session expiry without message | Tech loses their in-progress form data silently | Intercept 401 responses; show toast "Session expired, please log in again" before redirect |
| Dispatch queue default to ALL tab | Dispatcher overwhelmed by completed/archived jobs | Default tab is READY TO SCHEDULE — already specified; must not regress |

---

## "Looks Done But Isn't" Checklist

- [ ] **Shadow-write:** Code deployed ≠ migration working. Verify `SentinelLog` shows successful Neon writes after a real production event (not a test).
- [ ] **Push notifications:** Subscription saved to Tech Roster col R ≠ notifications delivered. Verify actual push delivery to a real device.
- [ ] **Auth dev bypass:** `VERCEL_ENV` check passes locally ≠ bypass works on preview. Verify Vercel preview shows dev bypass button without Google OAuth.
- [ ] **Neon schema provisioned:** Tables exist ≠ shadow-write is wired. Verify `addJobCommentDA` actually writes to `job_comments` table after the shadow-write sprint.
- [ ] **`APT_HR_CALENDAR_ID` set:** Brandon says he'll set it ≠ it's set. Verify via Script Properties editor before any calendar-blocking feature goes to Browser Subagent.
- [ ] **Tech Roster migration:** Script exists ≠ it's run. Verify 4 new techs appear in the roster with badge numbers before running `setupNewTechPin()`.
- [ ] **TypeScript zero errors:** `tsc --noEmit` passing ≠ runtime correctness. A mis-typed API action string compiles fine and fails silently at the Apps Script layer.
- [ ] **Drizzle schema matches Neon:** Schema file in repo ≠ what's in the database. After any schema change, verify `drizzle-kit check` shows no drift.
- [ ] **Cloudflare Worker proxy active:** Proxy exists ≠ all traffic routes through it. Verify no direct GAS URLs remain in `dashboard-api.ts`, `auth.ts`, or route handlers.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Column index drift corrupting Dispatch Queue | HIGH | Stop all writes immediately. Identify the corrupted column range. Re-map downstream readers to the correct indexes. Manually audit and repair affected rows in Sheets. Neon shadow-write records may need manual correction or replay. |
| Auth hook cross-contamination in production | MEDIUM | Hot-fix the import in the affected file. Deploy to `main` immediately. Verify in browser before declaring resolved. No AG sprint required — single-file fix. |
| Shadow-write silent failures accumulated | MEDIUM | Query `SentinelLog` for the date range of failures. Identify which events didn't write to Neon. Replay those events using a one-off migration script. Run reconciliation report before continuing. |
| Code.js accidentally auto-deployed | HIGH | Check Dispatch Queue for duplicate entries created during the unintended run. Use the `isDuplicateJob` logic to identify and remove duplicates. Restore the CI exclusion immediately. Notify Brandon of any duplicate leads sent to production. |
| AG self-report accepted without Browser Subagent evidence | MEDIUM | Do not merge. Send back to AG for Browser Subagent audit. If already merged: roll back the branch, run audit on the reverted preview, re-merge only after evidence is in `artifacts/`. |
| Secret exposed via `NEXT_PUBLIC_` prefix | HIGH | Rotate the key immediately (regenerate `DASHBOARD_API_KEY` in Apps Script + Vercel). Update all three call sites with the new server-only env var. Redeploy. Audit access logs for unauthorized calls. |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Column index drift | Every phase touching `addToDispatchQueue` or `updateJobDA` | Spec must include 30-col map reference; AG Contradiction Detector must grep col index usages |
| Auth hook cross-contamination | Every sprint with route or component changes | Required grep: both auth import patterns in every changed file |
| Shadow-write silent failure | `job_comments`, `time_records`, `techs`, `jobs` shadow-write sprints | `SentinelLog` shows successful writes after real production events |
| Code.js auto-deploy | CI/CD audit phase | `.github/workflows/` explicitly excludes `Code.js`; verified in each CI-touching sprint |
| AG rubber-stamping | Every sprint | `artifacts/browser_audit.txt` present with timestamped evidence before merge |
| Secret via NEXT_PUBLIC_ | Immediate — current backlog | `push/subscribe/route.ts` uses server-only env var; `NEXT_PUBLIC_` absent from `app/api/` routes |
| DashboardAPI.gs auth atomic change | Any sprint touching auth | All 3 call sites listed in spec; all 3 updated in same commit |
| Reading Neon before validation | Neon cutover phase | Reconciliation report passes; 5+ days of clean `SentinelLog` before switching any read path |
| Trainee assigned solo | Spec for assignment guardrails | `suggestTechsDA` rejects solo-T assignments; `updateJobDA` enforces pairing rule |
| Glassmorphism on flat backgrounds | Any UI sprint with glass cards | Browser Subagent screenshot at 1280px shows visible card differentiation from background |

---

## Sources

- CLAUDE.md — production constraints, auth architecture, known failures, API KEY RULE
- PROJECT.md — shadow-write risk ordering, out-of-scope items, active blockers
- CLAUDE.md memory: glassmorphism incident (bg-white/5 invisible on flat dark background)
- CLAUDE.md memory: AG rubber-stamp prevention protocol
- CLAUDE.md memory: expert-grade dev workflow standards (Brandon's explicit requirement)
- CLAUDE.md: DashboardAPI.gs auth atomic change rule (lived constraint, not theoretical)
- CLAUDE.md: Code.js manual-only deploy rule (email trigger behavior)
- Session 54 state: Neon Phase B provisioned, shadow-writes pending, validation not yet done
- Known security item: `NEXT_PUBLIC_DASHBOARD_API_KEY` in `push/subscribe/route.ts` (active backlog)
- Known issue: Trainee pairing rule not enforced in code (active backlog gap)

---
*Pitfalls research for: APT Central Command — field dispatch + mobile PWA + live Sheets→Neon migration*
*Researched: 2026-05-10*
