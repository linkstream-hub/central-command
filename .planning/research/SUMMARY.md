# Project Research Summary

**Project:** APT Central Command (CC2.0 → CC3.0 Migration)
**Domain:** Field-service operations platform — property maintenance dispatch + technician PWA + live database migration
**Researched:** 2026-05-10
**Confidence:** HIGH — stack is locked by production, all features are live or actively specced, architecture derived from live codebase

---

## Executive Summary

APT Central Command is a live production operations platform for a Bay Area property maintenance company. It is not a greenfield project — it is a working system (54 sessions of production delivery) that is now undergoing a controlled migration from Google Sheets as the source of truth to Neon Postgres. The research confirms the stack is locked: Google Apps Script handles all backend logic because Gmail/Calendar/Sheets integration is native and cannot be replaced without a full rewrite. Next.js 16 serves the dispatcher dashboard and tech PWA from a single Vercel deployment. The migration strategy is shadow-write dual-write — every Sheets write also attempts a Neon write, reads stay on Sheets until Neon data is validated, then individual tables cut over one at a time.

The CC3.0 roadmap is not about building new features — it is about completing the migration safely. The shadow-write order is risk-ordered: `job_comments` first (no historical data, zero cutover risk), then `time_records` (payroll integrity), then `techs` (roster sync), then `jobs` last (30-column invariant, highest historical data risk). Each table requires a validation gate before any read path switches. The system must remain live throughout — dispatchers and field techs cannot be interrupted.

The critical risks are architectural, not technical. Column index drift silently corrupts all downstream readers. Auth hook cross-contamination causes redirect loops. Shadow-write failures that are not logged cause Neon to silently fall behind Sheets. Code.js auto-deployment via CI fires live email triggers. All of these have happened or are plausible given the system's complexity. The roadmap must front-load guardrails and validation before any Neon read cutover.

---

## Key Findings

### Recommended Stack

The stack is not hypothetical — it is deployed and in use. No technology decisions remain open. Every component listed is the result of a deliberate prior decision (documented in `PROJECT.md` Sessions 1–54).

**Core technologies:**
- **Google Apps Script (V8):** Backend API for all data operations — required because Gmail/Calendar/Sheets integration is native; no viable alternative without replacing the entire data store
- **Next.js 16 + TypeScript:** Frontend for both CC2.0 dispatcher dashboard and Tech PWA — single Vercel deployment, App Router, RSC; `legacy-peer-deps=true` in `.npmrc` required
- **Tailwind CSS + Framer Motion:** Glassmorphism design system with layout animations — Framer Motion is non-negotiable for gesture-driven drag interactions in the RtS scheduling grid
- **Neon Postgres + Drizzle ORM:** Migration target database — serverless HTTP driver (`@neondatabase/serverless`) required; never `pg` directly in serverless/edge contexts; `org_id` on every table from day one
- **Gemini 2.5 Flash:** Email parsing — called via `UrlFetchApp` REST from Code.js; `GEMINI_MODEL` Script Property controls model name
- **next-auth v5 (beta):** Office staff auth — Google OAuth with `@aptmaintenanceinc.com` domain restriction; v5 App Router integration is stable
- **Cloudflare Workers:** Edge proxy at `api.aptmaintenanceinc.com` — hides Apps Script deployment URLs, enforces rate limiting and API key validation

**What not to use:** `pg` directly, Prisma, Firebase (explicitly replaced), `window.confirm()`/`alert()`, hardcoded hex colors, `NEXT_PUBLIC_*` for server-only secrets, `drizzle-kit push` in production.

### Expected Features

**Must have (table stakes — all live):**
- Email → Dispatch Queue ingestion via Gemini parsing
- Dispatch queue with six workflow-state tabs (Needs Review / Ready to Schedule / PTE Required / Scheduled / Complete / All)
- Job detail modal with Gmail thread, job fields, job comments tab
- Job assignment and drag-and-drop scheduling grid (RtS)
- Tech mobile PWA with badge+PIN auth, clock-in/out, job completion
- Timecard approval queue (supervisor approve/dispute)
- Google Calendar sync for scheduled jobs
- Push notification infrastructure (wired; activation pending)

**Should have (differentiators — live or specced):**
- Gemini email parsing with property context scoring (`buildSmartPropertyContext`)
- Dual auth (OAuth for office staff; badge+PIN for techs — intentionally isolated)
- Shadow-write migration — zero-downtime Neon introduction
- PTE workflow as a first-class status (Bay Area tenant-rights constraint)
- Tech suggestion engine with trainee pairing rule enforcement
- Tenant self-scheduling (`generateScheduleLinkDA` / `getAvailableSlotsDA`)
- `entity_id` multi-tenancy on all Neon records (future PM SaaS expansion)

**Defer (v2+):**
- OpenPhone SMS ($15/month cost decision pending — solves PTE bottleneck)
- `calibrateDurationDefaults()` — needs 20+ PWA completions first
- Conflicting job detection — needs spec before any code
- Status transition guardrails — needs spec
- Code.js auto-routing (turnover → RtS, adhoc → PTE Required) — needs spec
- Auto-reply enable (`AUTO_REPLY_ENABLED`) — Brandon controls the switch after supervised trial

### Architecture Approach

The system is a hybrid: Google Workspace backend (Apps Script + Sheets + Gmail + Calendar) proxied through Cloudflare to a Next.js frontend, with Neon Postgres being introduced as a shadow target during migration. The action-dispatch pattern in `DashboardAPI.gs` routes all CC2.0 API calls through a single `doPost` handler — every new CC2.0 feature extends this list, never creates a new deployment. The dual auth systems (OAuth via next-auth v5 for office staff; badge+PIN via localStorage for techs) are completely separate and must never share hooks or middleware.

**Major components:**
1. **CC2.0 Dashboard** (`tech-pwa/src/app/`) — Dispatcher/office UI; uses `useSession()` from `next-auth/react`
2. **Tech PWA** (`tech-pwa/src/app/`) — Field tech mobile interface; uses `getSession()` from `@/lib/auth`
3. **Cloudflare Worker** — Security perimeter; all API traffic must pass through; never call Apps Script URLs directly from frontend
4. **DashboardAPI.gs** (`dashboard-api/`) — All CC2.0 backend actions; action-dispatch pattern; separate clasp project
5. **TechPWA.gs** (root clasp) — Tech auth + shift/clock/job API; separate deployment cadence from DashboardAPI.gs
6. **Code.js** (root clasp) — Email polling → Gemini parse → Sheets write; **manual deploy only — email triggers fire on deploy**
7. **Google Sheets** — Current source of truth; 30-col Dispatch Queue with frozen column order is a system-wide invariant
8. **Neon Postgres** — Migration target; Phase A live (`comms_messages`); Phase B provisioned (`jobs`, `techs`, `time_records`, `job_comments`); shadow-writes next

**Open architecture gaps (blockers before multi-tenancy):**
- n8n and Flowise flows not version-controlled (Railway redeploy risk)
- TechPWA.gs has no Cloudflare Worker proxy (deployment URL exposed)
- `NEXT_PUBLIC_DASHBOARD_API_KEY` in `push/subscribe/route.ts` (secret in client bundle — active backlog)
- Session tokens stored plain in Tech Roster col M (should be hashed)

### Critical Pitfalls

1. **Dispatch Queue column index drift** — inserting or reordering columns silently corrupts all downstream readers (DashboardAPI.gs, Code.js, TechPWA.gs, Neon shadow-writer). Append-only. Any schema change = all readers updated in one atomic commit.
2. **Auth hook cross-contamination** — `useSession()` on tech routes or `getSession()` on office routes causes redirect loops with no build-time warning. Route determines hook; enforced in every spec.
3. **Shadow-write silent failure** — Neon write fails, Sheets write succeeds, caller gets success. Without `SentinelLog` write-back on failure, Neon silently falls behind Sheets for days. Every shadow-write must catch + log; validation required before any read cutover.
4. **Code.js auto-deployed via CI** — Email triggers fire on deploy, potentially reprocessing live inbox. Code.js is manual-deploy-only. CI exclusion must survive every CI config change.
5. **Reading Neon before validation** — Switching a read path to Neon before 5+ days of clean `SentinelLog` + row-count reconciliation risks surfacing incomplete or missing data to production users.
6. **`NEXT_PUBLIC_` prefix exposes server secret** — `push/subscribe/route.ts` currently uses `NEXT_PUBLIC_DASHBOARD_API_KEY`; this embeds the key in the client bundle. Fix: server-only `DASHBOARD_API_KEY` env var.
7. **DashboardAPI.gs auth changed non-atomically** — Any change to `publicActions` or `validateApiKey` must update all three frontend call sites (`dashboard-api.ts`, `auth.ts`, `push/subscribe/route.ts`) in the same commit.
8. **AG self-reporting without browser evidence** — TypeScript passing ≠ runtime correctness. `artifacts/browser_audit.txt` with timestamped click evidence is required before merge; AG's self-report is never accepted.

---

## Implications for Roadmap

The system is past its original MVP. The CC3.0 roadmap is the shadow-write migration to Neon, completed safely without disrupting live production. Suggested phase structure:

### Phase 1: `job_comments` Shadow-Write
**Rationale:** No historical data — zero risk of data loss on first Neon write. Proves the shadow-write plumbing works end-to-end before touching any payroll-adjacent table. Already specced (Session 54 spec exists).
**Delivers:** `addJobCommentDA` dual-writes to Neon `job_comments` table. `SentinelLog` confirms writes.
**Addresses:** P1 feature (Neon cutover prerequisite)
**Avoids:** Shadow-write silent failure pitfall — must include `SentinelLog` write-back on failure
**Research flag:** None — standard pattern, spec already written

### Phase 2: `time_records` Shadow-Write
**Rationale:** Clock events are already being written to Sheets continuously. Shadow-writing them to Neon `time_records` is the prerequisite for ever moving the timecard approval queue to Neon. Payroll integrity depends on this being correct.
**Delivers:** Every `handleClockIn`/`handleClockOut`/`handleStartShift`/`handleEndShift` call in TechPWA.gs dual-writes to Neon.
**Uses:** Neon serverless driver from Apps Script via fetch-to-Next.js-API-route pattern
**Avoids:** Neon write fatal error (must be non-fatal); validation gate before Phase 5
**Research flag:** Needs implementation spec — TechPWA.gs calling Neon requires a proxy route or direct HTTP to Neon

### Phase 3: `techs` Shadow-Write
**Rationale:** Tech roster is relatively static (low write frequency). Shadow-writing it validates the `techs` table schema before the higher-stakes `jobs` migration.
**Delivers:** Tech Roster changes (new tech setup, PIN updates) dual-write to Neon `techs` table.
**Avoids:** Column index drift (Tech Roster col map must match Neon `techs` schema exactly)
**Research flag:** None — lower complexity than `time_records`

### Phase 4: `jobs` Shadow-Write
**Rationale:** Highest historical data risk — 30-col Dispatch Queue shape, active payroll and scheduling data. Last in risk order. Must not begin until Phases 1–3 have clean `SentinelLog` validation.
**Delivers:** `addToDispatchQueue` and `updateJobDA` dual-write to Neon `jobs` table.
**Avoids:** Column index drift (30-col invariant is the system-wide constraint); must not make Neon write fatal
**Research flag:** Needs detailed spec — 30-col mapping from Sheets to Neon schema must be verified literally against `SHEETS_SCHEMA.md` and `schema.ts`

### Phase 5: Validation Gates + Security Hardening
**Rationale:** Before any read path switches to Neon, each table needs 5+ business days of clean `SentinelLog` + row-count reconciliation. This phase also addresses the active security backlog items that are independent of migration.
**Delivers:** Reconciliation reports for all 4 tables; `NEXT_PUBLIC_DASHBOARD_API_KEY` → server-only env var fix; n8n + Flowise flows version-controlled to `infra/`; TechPWA.gs Cloudflare Worker proxy route
**Avoids:** Reading Neon before validation pitfall; `NEXT_PUBLIC_` secret exposure pitfall
**Research flag:** `NEXT_PUBLIC_` fix is a known 1-file change; n8n/Flowise export is ops work, not code

### Phase 6: Read Cutover (Per Table)
**Rationale:** After each table passes its validation gate, switch read paths one at a time. `job_comments` first (no historical reads existed before); `time_records` for timecard approval queue; `techs` for tech lookup; `jobs` last and only after extended validation.
**Delivers:** Each table fully migrated — Neon as source of truth, Sheets as backup/audit trail
**Avoids:** Reading Neon before validation; switching multiple tables simultaneously (one at a time, validated)
**Research flag:** Each cutover needs a rollback plan documented in its spec

### Phase 7: Post-Cutover Features
**Rationale:** Once Neon is source of truth, features that were deferred pending migration become buildable.
**Delivers (P2):** Push notification activation; auto-reply enable (Brandon-controlled switch)
**Delivers (P3):** Conflicting job detection (needs spec first); status transition guardrails (needs spec); Code.js auto-routing spec
**Research flag:** All P3 items need specs before any AG sprint

### Phase Ordering Rationale

- **Risk order is non-negotiable:** `job_comments` → `time_records` → `techs` → `jobs` is derived from historical data volume and write frequency, not preference. Reversing this order risks data loss during validation.
- **Security hardening in Phase 5** (not last) because `NEXT_PUBLIC_` exposure is an active security risk that doesn't depend on migration progress.
- **Read cutover per-table** because each table has independent validation requirements; cutting over all at once creates unrecoverable rollback complexity.
- **P3 features only after cutover** because they depend on Neon being authoritative and their specs are not yet written.

### Research Flags

Phases needing deeper research during planning:
- **Phase 2 (`time_records`):** TechPWA.gs calling Neon requires clarifying the proxy pattern — Apps Script cannot use the `@neondatabase/serverless` npm package directly; needs a REST wrapper or Next.js API proxy route
- **Phase 6 (cutover):** Each table needs a rollback plan and a specific validation query documented before AG touches any read path

Phases with standard patterns (skip additional research):
- **Phase 1 (`job_comments`):** Already specced; shadow-write pattern established by `comms_messages` Phase A
- **Phase 3 (`techs`):** Low write frequency, schema already provisioned; straightforward dual-write addition
- **Phase 5 (security):** `NEXT_PUBLIC_` fix is a known 1-line env var rename; n8n/Flowise export is operator work

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Locked by production; no open decisions |
| Features | HIGH | 54 sessions of validated delivery; P1/P2/P3 clearly delineated |
| Architecture | HIGH | Derived from live codebase (`docs/ARCHITECTURE.md`, `CLAUDE.md`, `schema.ts`) |
| Pitfalls | HIGH | Derived from live incidents, CLAUDE.md constraints, and known failure modes — not theoretical |

**Overall confidence:** HIGH

### Gaps to Address

- **TechPWA.gs → Neon write path:** The `@neondatabase/serverless` npm driver is not available in Apps Script. Phase 2 spec must define the exact mechanism (likely a Next.js API route acting as a Neon write proxy, called via `UrlFetchApp` from TechPWA.gs). This is the most significant unresolved implementation question.
- **Flowise + n8n version-control:** Both services run on Railway with no exported configs in the repo. If Railway resets, these are unrecoverable. Not blocking migration, but must be addressed in Phase 5 before multi-tenancy.
- **Trainee pairing rule not enforced in code:** `suggestTechsDA` and `updateJobDA` do not enforce the T-rank pairing constraint. This is a compliance risk that should be addressed as a standalone spec, separate from the migration roadmap.

---

## Sources

### Primary (HIGH confidence)
- `CLAUDE.md` — Production system state, locked stack decisions, column maps, auth architecture, known failures
- `PROJECT.md` — Validated requirements (Sessions 1–54), key decisions with rationale
- `docs/ARCHITECTURE.md` — Live system briefing, six domains, component boundaries
- `docs/SHEETS_SCHEMA.md` — Complete Sheets tab/column reference (authoritative for Neon schema shapes)
- `tech-pwa/src/lib/schema.ts` — Drizzle ORM schema (Neon tables, Phase B provisioned)
- `dashboard-api/DashboardAPI.gs` — Authoritative list of implemented API actions (v34)
- Git history Sessions 47–54 — Delivery evidence, shadow-write Phase A/B

### Secondary (MEDIUM confidence)
- `specs/` folder — Session 54 spec for `job_comments` shadow-write (written, not yet executed)
- `artifacts/` — Browser audit evidence from prior AG sprints

---

*Research completed: 2026-05-10*
*Ready for roadmap: yes*
