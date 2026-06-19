# Architecture Research

**Domain:** Property maintenance operations platform (hybrid Google Workspace + Next.js SaaS)
**Researched:** 2026-05-10
**Confidence:** HIGH — derived from live codebase, `docs/ARCHITECTURE.md`, `CLAUDE.md`, and `PROJECT.md`

---

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENTS                                       │
│  ┌──────────────────────┐        ┌───────────────────────────┐      │
│  │  CC2.0 Dashboard     │        │  Tech PWA                 │      │
│  │  (Next.js / Vercel)  │        │  (Next.js / Vercel)       │      │
│  │  Google OAuth        │        │  Badge + SHA-256 PIN      │      │
│  └──────────┬───────────┘        └──────────────┬────────────┘      │
└─────────────┼──────────────────────────────────┼────────────────────┘
              │ HTTPS                             │ HTTPS (text/plain)
              ▼                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│               EDGE PROXY — Cloudflare Worker                         │
│           api.aptmaintenanceinc.com                                  │
│           Rate limiting · Auth enforcement · Apps Script URL hidden  │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
          ┌────────────────┴─────────────────┐
          ▼                                  ▼
┌─────────────────────┐            ┌─────────────────────┐
│  DashboardAPI.gs    │            │  TechPWA.gs          │
│  (dashboard-api/)   │            │  (root clasp)        │
│  CC2.0 actions      │            │  doGet/doPost        │
│  v34                │            │  shift/clock/jobs    │
│  auto-deploys       │            │  v81 auto-deploys    │
└──────────┬──────────┘            └──────────┬──────────┘
           │                                   │
           │  reads/writes                     │ reads/writes
           ▼                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│               GOOGLE SHEETS (Source of Truth — today)                │
│   APT Lead Intake Master (1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuO)  │
│   Dispatch Queue · Tech Roster · Time Records · Job Comments ·       │
│   ComplianceAlerts · SentinelLog · Staff Roster · JobPerf History   │
└───────────────────────┬─────────────────────────────────────────────┘
                        │  shadow-write (dual-write during migration)
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│               NEON POSTGRES (Migration Target)                       │
│   Drizzle ORM · org_id on every table · multi-tenant from day one   │
│   Phase A live: comms_messages                                       │
│   Phase B provisioned: jobs · techs · time_records · job_comments   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│               SUPPORTING INFRASTRUCTURE (Railway)                    │
│  n8n (event bus) · Flowise v1.8.2 (compliance engine)               │
│  Railway Sentinels ×5: health · time-anomaly · wc-scanner ·         │
│                        stale-job · spec-architect                    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│               AI LAYER (Google)                                      │
│  Gemini 2.5 Flash — email parsing, property scoring, draft replies  │
│  Called from Code.js via UrlFetchApp REST                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Component Responsibilities

| Component | Responsibility | Implementation |
|-----------|----------------|----------------|
| CC2.0 Dashboard | Dispatcher / office staff UI — queue management, scheduling, timecard approval, HR | Next.js 16, `tech-pwa/src/app/` |
| Tech PWA | Field tech mobile interface — clock in/out, job completion, attestation, time off | Next.js 16, `tech-pwa/src/app/` (same repo, separate routes) |
| Cloudflare Worker | Edge proxy — hides Apps Script URLs, enforces rate limiting, validates API key | Cloudflare Worker (deployed separately) |
| DashboardAPI.gs | All CC2.0 API actions — jobs, scheduling, techs, timecards, comments, push | `dashboard-api/DashboardAPI.gs`, action-dispatch pattern |
| TechPWA.gs | Field tech API — auth, shift/clock events, job list, mark complete | `TechPWA.gs` in root clasp project |
| Code.js | Lead email polling → Gemini parse → Dispatch Queue write | `Code.js`, manual-deploy-only |
| Google Sheets | Source of truth today — all operational tables (30-col Dispatch Queue invariant) | Single spreadsheet, fixed column order |
| Neon Postgres | Migration target — org_id multi-tenant schema, Drizzle ORM, shadow-write ingestion | `tech-pwa/src/lib/schema.ts` |
| n8n | Cross-component workflow automation (Railway, not fully migrated) | Railway hosted |
| Flowise | CA wage-hour compliance rule engine — writes ComplianceAlerts to Sheets | Railway, v1.8.2 pinned |
| Railway Sentinels | Health/anomaly monitoring, write-back to SentinelLog sheet | Railway, 5 active |
| Gemini 2.5 Flash | Email parsing, property context scoring, draft reply generation | Called from Code.js |
| Hermes | Browser-based QA agent for feature audit (Gate 2/3) | Docker + Browserbase, targets Vercel preview |

---

## Recommended Project Structure

The existing structure is correct and should be maintained:

```
A:/PTOW/1_APT_Central_Command/
├── Code.js                    # Lead parsing — manual-deploy only (email triggers)
├── TechPWA.gs                 # Field tech API — auto-deploys via CI
├── Dashboard.js               # Tech roster support functions
├── Calendar.js                # Google Calendar sync
├── SuggestTechs.js            # Tech suggestion engine
├── appsscript.json            # Root clasp manifest
│
├── dashboard-api/             # Separate clasp project (different auth + deploy cadence)
│   ├── DashboardAPI.gs        # All CC2.0 API actions
│   └── appsscript.json
│
├── time-manager/              # Third clasp project (not yet set up)
│
├── tech-pwa/                  # Next.js 16 app — CC2.0 + Tech PWA
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   │   ├── live/          # Dispatch queue (office)
│   │   │   ├── schedule/      # RtS day×time grid
│   │   │   ├── jobs/          # Tech PWA job list
│   │   │   ├── job/[jobId]/   # Tech PWA job detail
│   │   │   └── api/           # Next.js API routes (push/subscribe)
│   │   ├── components/        # Shared UI components
│   │   ├── lib/
│   │   │   ├── dashboard-api.ts   # DashboardAPI.gs client
│   │   │   ├── auth.ts            # Tech PWA session util (NOT next-auth)
│   │   │   └── schema.ts          # Drizzle ORM schema
│   │   └── auth.ts            # next-auth v5 config (office staff)
│   ├── drizzle/               # Drizzle migration files
│   └── migrate.ts             # Migration runner
│
├── docs/
│   ├── ARCHITECTURE.md        # System briefing (load at session start)
│   └── SHEETS_SCHEMA.md       # Complete Sheets tab/column reference
├── specs/                     # AG implementation specs
└── artifacts/                 # AG diffs, browser audit evidence
```

### Structure Rationale

- **`dashboard-api/` as separate clasp project:** DashboardAPI.gs has its own Script ID, deployment cadence, and auth config. Mixing it with Code.js would share deployment triggers and create confusion.
- **`tech-pwa/` as Next.js root:** Vercel's root directory is `tech-pwa/`. Everything inside is a standard Next.js monolith. CC2.0 office pages and tech PWA pages coexist under the same deployment — separated only by route path and auth hook.
- **`drizzle/` + `migrate.ts` inside `tech-pwa/`:** Drizzle migrations run against Neon from the Next.js context where the DB connection string lives.

---

## Architectural Patterns

### Pattern 1: Action-Dispatch API (DashboardAPI.gs)

**What:** All CC2.0 API calls funnel through a single `doPost` / `doGet` handler in DashboardAPI.gs. The request includes an `action` string, and the handler routes to the matching function.

**When to use:** Every new CC2.0 backend feature. Never create a new Apps Script web app deployment — extend the existing action list.

**Trade-offs:** Simple to add new actions; no versioning overhead. Downside: one deploy point means all actions share auth config — a change to `validateApiKey` or `publicActions` must be atomic across all 3 frontend call sites simultaneously.

```javascript
// DashboardAPI.gs pattern
function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  const { action, ...params } = body;

  if (!publicActions.includes(action)) validateApiKey(e);

  switch (action) {
    case 'getDispatchDataDA':    return getDispatchDataDA(params);
    case 'addJobCommentDA':      return addJobCommentDA(params);
    // ... all other actions
  }
}
```

### Pattern 2: Shadow-Write Dual-Write Migration

**What:** Every write to Google Sheets also attempts a write to Neon Postgres. Reads still come from Sheets. Only after shadow data is validated does a table cut over to Neon as source of truth.

**When to use:** Every new table migration. Always in risk order: no-history tables first (job_comments), high-history tables last (jobs).

**Trade-offs:** Zero downtime — Sheets stays live during migration. Neon failures are logged but non-fatal. The invariant is: **Sheets write must succeed; Neon write is best-effort.**

```typescript
// Shadow-write pattern in DashboardAPI.gs
async function addJobCommentDA(params) {
  // 1. Always write to Sheets first (source of truth)
  const result = writeCommentToSheets(params);

  // 2. Shadow-write to Neon — non-fatal if it fails
  try {
    await neonClient.insert(jobComments).values({
      org_id: 'APT-CA',
      ...params
    });
  } catch (err) {
    console.error('Neon shadow-write failed (non-fatal):', err);
  }

  return result;
}
```

### Pattern 3: Dual Auth — Never Mixed

**What:** The system has two completely separate authentication systems, serving two different user populations. They must never share hooks or middleware.

**When to use:** Office staff routes use `useSession()` from `next-auth/react`. Tech PWA routes use `getSession()` from `@/lib/auth`. The split is enforced at the route level — not at the component level.

**Trade-offs:** Duplication, but the alternative (mixing auth hooks) causes redirect loops in production. The separation is worth the ceremony.

```typescript
// Office staff page (e.g., /live/page.tsx)
import { useSession } from 'next-auth/react';
const { data: session } = useSession(); // Google OAuth session

// Tech PWA page (e.g., /jobs/page.tsx)
import { getSession } from '@/lib/auth';
const session = getSession(); // localStorage['apt_tech_session'] UUID token
```

### Pattern 4: Edge Proxy as Security Perimeter

**What:** All API traffic from the Next.js frontend passes through a Cloudflare Worker before reaching Apps Script. The Worker enforces rate limiting, validates the API key, and prevents the Apps Script deployment URL from leaking to clients.

**When to use:** This is the only path to backend. No direct Apps Script URL calls from the frontend ever. If a new Apps Script deployment is added, it gets a new Worker route — never exposed directly.

**Trade-offs:** Extra hop adds ~5ms latency (negligible). Significant benefit: Apps Script URLs stay private, rate limiting prevents abuse, and auth can be changed at the edge without a Next.js deploy.

### Pattern 5: Dispatch Queue as Immutable State Machine

**What:** The Dispatch Queue is a 30-column Sheets table with a frozen column order. Status values (`New / Ready to Schedule / PTE Required / Scheduled / Complete / Archived`) drive tab routing in CC2.0. Column indexes are a system-wide invariant.

**When to use:** Any feature that touches job data must treat column indexes as constants — never insert, reorder, or remove columns. New fields → new columns appended at end only (requires updating Neon schema simultaneously).

**Trade-offs:** Rigidity prevents accidental data corruption across all downstream readers (DashboardAPI.gs, Code.js, TechPWA.gs, Neon shadow-write). The cost is that schema evolution is expensive.

---

## Data Flow

### Work Order Lifecycle

```
Inbound Email (workorder@aptmaintenanceinc.com)
    ↓ [every 15 min, M-F 6:30am-7pm PT]
Code.js: shouldSkipEmail() filter
    ↓
Gemini 2.5 Flash parse
  (address · category · priority · PTE · access info · tenant contact)
    ↓
enrichFromLaphamDb() — Master Directory property match
    ↓
isDuplicateJob() check
    ↓
addToDispatchQueue() → Sheets Dispatch Queue (30 cols, immutable order)
    ↓
CC2.0 Dashboard (getDispatchDataDA)
  → Dispatcher reviews, assigns tech, drags to RtS grid
  → updateJobDA() → Sheets write + Calendar sync
    ↓
Tech PWA (TechPWA.gs)
  → startShift → clockIn → markComplete → signAttestation
  → Time Records tab write
    ↓
Job Performance History (markComplete callback)
    ↓
Compliance Engine (Flowise) reads Time Records
  → ComplianceAlerts tab (open CA wage-hour violations)
    ↓
[Billing pipeline — NOT BUILT]
```

### API Request Flow (CC2.0 Dashboard)

```
Next.js component (useEffect / SWR / mutation)
    ↓
src/lib/dashboard-api.ts (fetchDashboardAPI wrapper)
    ↓ POST { action: 'getDispatchDataDA', ...params }
Cloudflare Worker (api.aptmaintenanceinc.com)
  → validate API key header
  → rate limit check
    ↓
DashboardAPI.gs doPost()
  → action dispatch
  → Sheets read/write
  → [shadow-write to Neon if applicable]
    ↓
JSON response → Next.js → component state update
```

### Tech Auth Flow

```
Badge # + PIN entered in Tech PWA
    ↓
SHA-256(PIN) computed client-side
    ↓
POST { action: 'login', badge, pinHash } (text/plain to bypass CORS preflight)
    ↓
TechPWA.gs handleLogin()
  → Tech Roster lookup (col L = stored hash)
  → hash match → generate UUID session token
  → write token + expiry to Tech Roster cols M, N
    ↓
UUID token stored in localStorage['apt_tech_session']
    ↓
All subsequent tech requests include token in body
  → validateToken() checks col M + col N (30-day expiry)
```

### Neon Shadow-Write Flow

```
DashboardAPI.gs action executes
    ↓
1. Write to Google Sheets (must succeed — blocks response)
    ↓
2. Attempt write to Neon via Drizzle ORM
   org_id = 'APT-CA' on every row
   ↓ success → log
   ↓ failure → log error, continue (non-fatal)
    ↓
Return Sheets result to caller
```

---

## Multi-Tenancy Architecture

Multi-tenancy is a **day-one requirement** for Neon, not a retrofit. Every table has `org_id` as the first discriminator column, set to `'APT-CA'` for all current data.

**Why this matters:** Entity 3 (PM SaaS) will license this platform to property management companies. The `org_id` column is what separates their data from APT's. A missing `org_id` on any table means a full schema migration later under live production conditions.

**Rule:** Any new Neon table added during shadow-write migration **must** include `org_id TEXT NOT NULL DEFAULT 'APT-CA'`. This is non-negotiable.

```typescript
// schema.ts pattern — org_id mandatory on every table
export const jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  org_id: text('org_id').notNull().default('APT-CA'),
  // ... other columns matching Dispatch Queue shape
});
```

---

## Anti-Patterns

### Anti-Pattern 1: Mixing Auth Hooks

**What people do:** Use `useSession()` (next-auth) in a tech PWA page, or `getSession()` (local util) in an office staff page.

**Why it's wrong:** The two auth systems are completely separate. next-auth's `useSession()` looks for a NextAuth session cookie that tech users don't have. The local `getSession()` looks at `localStorage['apt_tech_session']` which office users don't have. Mixing them causes silent auth failures and redirect loops that are hard to trace.

**Do this instead:** Route determines auth hook. `/jobs`, `/job/[jobId]`, `/clock` = `getSession()`. Everything else = `useSession()`. This is enforced in `CLAUDE.md` and must be in every AG spec.

### Anti-Pattern 2: Mutating the Dispatch Queue Column Order

**What people do:** Insert a new column in the middle of the Dispatch Queue to logically group related data.

**Why it's wrong:** Every reader of the Dispatch Queue uses hardcoded column indexes (0-indexed or 1-indexed depending on context). Code.js, DashboardAPI.gs, TechPWA.gs, and the Neon shadow-write schema all depend on the fixed 30-col map. A column insertion shifts every subsequent index and corrupts all reads silently.

**Do this instead:** Append new columns after col 30. Update the Neon schema, DashboardAPI.gs reader, Code.js writer, and SHEETS_SCHEMA.md in the same atomic commit.

### Anti-Pattern 3: Calling Apps Script URLs Directly from Frontend

**What people do:** Hardcode the `script.google.com/macros/s/AKfycby...` URL directly in a fetch call to skip the Cloudflare Worker.

**Why it's wrong:** The Apps Script URL becomes public, bypassing rate limiting and auth enforcement. Anyone with the URL can hit the backend without an API key.

**Do this instead:** All calls go through `src/lib/dashboard-api.ts` which always targets `api.aptmaintenanceinc.com` (the Cloudflare Worker).

### Anti-Pattern 4: Making Neon Writes Fatal

**What people do:** Throw or return an error to the caller when a Neon shadow-write fails.

**Why it's wrong:** During the migration period, Neon is best-effort. The Sheets write is the authoritative operation. A Neon failure during shadow-write phase should log and continue — not surface an error to the user or block the operation.

**Do this instead:** Wrap every Neon shadow-write in try/catch. Log failures to console (and ideally SentinelLog). Return the Sheets result regardless.

### Anti-Pattern 5: Automating Code.js Deployment

**What people do:** Add Code.js to the GitHub Actions CI/CD pipeline to auto-deploy on push to main.

**Why it's wrong:** Code.js has email trigger functions registered against it. When you deploy a new version, Apps Script may re-fire those triggers. This can cause duplicate email processing during business hours.

**Do this instead:** Code.js is manual-deploy-only. CI/CD deploys TechPWA.gs and DashboardAPI.gs only.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Google Workspace (Gmail, Calendar, Drive) | Apps Script built-in services (GmailApp, CalendarApp) — no OAuth flow needed | Runs under workorder@ service account context |
| Gemini 2.5 Flash | UrlFetchApp REST from Code.js | `GEMINI_MODEL` Script Property controls model. Prompt tuned for property maintenance email patterns |
| Neon Postgres | Drizzle ORM in Next.js API routes and DashboardAPI.gs (via fetch to `/api/neon` or direct) | Connection string in Vercel env vars, never in code |
| Cloudflare Worker | Frontend → Worker → Apps Script chain. Worker validates `X-API-Key` header | Cloudflare dashboard config, not version-controlled in this repo |
| AppSheet TOM | Reads Time Off Requests sheet directly (no API layer) | `1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk` sheet ID |
| Web Push (VAPID) | `push/subscribe/route.ts` stores subscription JSON in Tech Roster col R | Subscription stored in Sheets; push payload sent server-side |
| Railway (n8n, Flowise, Sentinels) | Sentinels write-back to SentinelLog tab; n8n connects to Apps Script webhooks | n8n workflows and Flowise flows not yet version-controlled — open gap |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Next.js ↔ DashboardAPI.gs | POST via `src/lib/dashboard-api.ts` wrapper, always through Cloudflare Worker | Action string routing; API key in header |
| Tech PWA ↔ TechPWA.gs | POST with `Content-Type: text/plain` (bypasses CORS preflight); body is JSON | Separate endpoint from DashboardAPI |
| DashboardAPI.gs ↔ Google Sheets | Direct Sheets API calls (SpreadsheetApp, getRange, getValues/setValues) | Spreadsheet ID hardcoded in Apps Script; all ops scoped to specific tabs |
| DashboardAPI.gs ↔ Neon | Shadow-write only during Phase B; Drizzle ORM via serverless Neon driver | Phase B order: job_comments → time_records → techs → jobs |
| Flowise ↔ Sheets | Reads Time Records; writes ComplianceAlerts tab | Direct Sheets API access from Railway |
| Sentinels ↔ Sheets | Write-back to SentinelLog tab | Webhooks or direct Sheets API |

---

## Scaling Considerations

This system operates at single-tenant SMB scale today (~10 office users, ~20 field techs, hundreds of jobs/month). The Neon migration is the path to scaling.

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (1 org, ~30 users) | Google Sheets as source of truth is fine. Apps Script handles the load. |
| 1–10 orgs (PM SaaS Stage 1) | Neon cutover must be complete. `org_id` isolation already in schema. Read-only PM portal on Neon reads. |
| 10–100 orgs | Apps Script backend becomes the bottleneck (6-minute execution limit, quota limits). Start migrating business logic to Next.js API routes backed by Neon. |
| 100+ orgs | Apps Script must be fully replaced. All business logic in Next.js API routes + Neon. Email ingestion moves to a proper queue (e.g., SQS or n8n). |

**First bottleneck:** Apps Script execution quotas. Google limits daily execution time per account. At ~10 orgs, concurrent dashboard loads will start hitting rate limits. Fix: migrate high-frequency reads to Neon + Next.js API routes, leaving only write-sync in Apps Script.

**Second bottleneck:** Google Sheets concurrent edit limits. Sheets is not a transactional database. At multi-org scale, concurrent writes to the same spreadsheet will produce data races. Fix: Neon cutover eliminates this entirely.

---

## Open Architecture Gaps

These are known gaps that will become blockers before multi-tenancy is viable:

| Gap | Risk | Mitigation |
|-----|------|-----------|
| n8n workflows not version-controlled | Workflow loss on Railway redeploy | Export flows to JSON, commit to `infra/n8n/` |
| Flowise flows not version-controlled | Same risk | Export flows, commit to `infra/flowise/` |
| TechPWA.gs behind "Anyone" access (no Cloudflare Worker) | Anyone with the deployment URL can call it | Add Cloudflare Worker route for TechPWA.gs endpoint |
| Session tokens stored plain in Tech Roster col M | Token theft → impersonation | Hash tokens before storage (or rotate to JWT-signed approach) |
| `NEXT_PUBLIC_DASHBOARD_API_KEY` in push/subscribe/route.ts | Server-side route exposing a public env var to avoid | Move to `DASHBOARD_API_KEY` server-only env var |
| Code.js auto-routing not built | Dispatchers manually triage email type | Spec and build: turnover/inspection → RtS; adhoc+tenant → PTE Required |
| Conflicting job detection not built | Duplicate jobs for same property+unit | Spec and build: `isDuplicateJob()` extended with time-window check |

---

## Sources

- `docs/ARCHITECTURE.md` — live system briefing, maintained as authoritative system overview
- `CLAUDE.md` — operational constraints, security standards, deployment workflow
- `PROJECT.md` — requirements, decisions, context
- `tech-pwa/src/lib/schema.ts` — Drizzle ORM schema (Neon tables)
- `tech-pwa/drizzle/` — Drizzle migration files

---

*Architecture research for: APT Central Command (CC2.0 → CC3.0)*
*Researched: 2026-05-10*
