# APT ECOSYSTEM — MASTER STRATEGIC ROADMAP
**Version**: 3.0 (CC3.0 architecture integrated. Session 50 state. Replaces v2.0.)
**Scope**: All entities in the APT ecosystem — maintenance, property management, real estate acquisition, construction.
**Build constraint**: Token availability, not time. No artificial sprint deadlines. Priority is determined by dependency and legal exposure.

---

## GOVERNING PRINCIPLES — ALL BUILDS, ALL PROJECTS

These are non-negotiable across every entity, every sprint, every tool in the ecosystem.

### 1. Quality Is the Floor, Not the Ceiling
Every frontend shipped is production-grade from day one:
- Dark mode glassmorphism as the default aesthetic register
- Framer Motion for all transitions and micro-interactions — no bare CSS transitions
- Skeleton loaders everywhere, never spinners for data fetching
- Haptic feedback on all mobile tap actions (Tech PWA and any future mobile surfaces)
- Toast notifications for all async results — no alert() or window.confirm()
- Every user-facing action has three defined states: loading, success, error
- Typography: **Geist** for code/data/monospace, **Outfit** for headings/prose
- Responsive across all breakpoints — mobile-first on field-facing surfaces, desktop-first on dispatch/management surfaces
- WCAG 2.1 AA minimum accessibility on all new components
- Core Web Vitals green on every Vercel deployment before a sprint is considered complete

No prototype aesthetic in production. No "we'll clean it up later." If it ships, it ships complete.

### 2. Automation-First
If a human has to do it more than once, it is a build target. The goal across every entity is zero-manual-intervention for routine operations. Every manual workflow is a gap in the system, not a feature of the business.

### 3. Security-First
- No endpoint exposed to the internet without a proxy, rate limiting, and authentication
- Secrets live in environment variables or vaults — never in code, never in committed files
- Every write to any data store is audit-logged with actor + timestamp + delta
- PII is treated as a liability: minimize what's stored, encrypt at field level before any Firebase migration
- Session tokens are hashed before storage (same treatment as PINs)
- All Apps Script endpoints behind Cloudflare Worker once DNS is available

### 4. Professional Execution
Every document, spec, API response, email template, and user-facing string is written to professional standard. The system represents APT and, eventually, multiple client-facing entities. Sloppy output anywhere degrades trust everywhere.

---

## ECOSYSTEM ARCHITECTURE — FOUR ENTITIES

Each entity is operationally independent. Each benefits from shared infrastructure. No entity's growth is prerequisite for another's profitability.

```
┌─────────────────────────────────────────────────────────────────────┐
│             SHARED INFRASTRUCTURE LAYER                             │
│  CC2.0 Platform | Tax Search Engine | n8n Event Bus | Flowise Rules │
│  pdfme/AE_DocGen | Cloudflare Security Layer | Railway Hosting       │
└──────────────┬──────────────┬───────────────┬────────────────────┘
               │              │               │
    ┌──────────┴──┐  ┌────────┴──────┐  ┌────┴──────────────┐
    │  Entity 1   │  │   Entity 2    │  │    Entity 3        │
    │ APT Maint.  │  │  APT Maint.   │  │  Prop Management   │
    │    (CA)     │  │    (Idaho)    │  │  (Lapham Model)    │
    └─────────────┘  └───────────────┘  └────────────────────┘
               │
    ┌──────────┴────────────┐
    │      Entity 4         │
    │  Real Estate Acq.     │
    │  (Tax Search + CRM)   │
    └───────────────────────┘
```

### Entity 1 — APT Maintenance Inc. (California)
**Role:** The proving ground. Everything built here becomes the template.
**Platform:** Central Command 2.0 (CC2.0)
**Full pipeline:** Lead intake → Dispatch → Scheduling → Field execution → Closeout → Billing → Compliance → HR

**What "operational independence" means for this entity:**
- Meal premium auto-calculation fires without human intervention
- QB invoices generate on job closeout without Robert touching anything
- ADP payroll export runs automatically
- Morning briefing surfaces everything requiring human decision
- A dispatcher, a field tech, and an HR approver can each do their full job through their respective interface without calling anyone

**Current state (Session 50):** CC2.0 dispatch dashboard and Tech PWA functional. Core flows verified: job queue, status workflow, DnD scheduling, shift clock-in/out, mark complete, compliance attestation. URL tab deep-linking, trainee warning, comms routing, DnD time fix, shift gate removal shipped. Comms thread filter repaired (Session 51). Robert supervised trial pending — on hold until Tech Comms tab verified. Photo upload unverified (needs real device test).

**Current gap:** Billing pipeline is unbuilt. Without it, unit economics are invisible and every expansion decision is made without numbers.

### Entity 2 — APT Maintenance Inc. (Idaho)
**Role:** Lower-cost, lower-regulatory-complexity expansion market. Employee equity proving ground.
**Platform:** Fork of CC2.0 with Idaho compliance ruleset

**Why Idaho works:**
- No PAGA equivalent (dramatically lower compliance overhead)
- Lower WC rates by trade classification
- Lower prevailing wages → equity stake as meaningful compensation supplement
- GovEase operates in Idaho → Tax Search feeds acquisition targets → those properties need maintenance → APT Idaho is the vendor. The entities feed each other.

**Prerequisites before launch:**
- Entity 1 reaches operational independence
- Idaho LLC formed with employee equity structure (founding employees: 5-15% pooled interest)
- Idaho compliance ruleset defined and built into the compliance scanner
- Idaho WC classification codes mapped (different from CA codes)

**Tech scope:** Same CC2.0 stack, separate clasp deployment, Idaho Script Properties config.

### Entity 3 — Property Management (Lapham Model)
**Role:** APT is already Lapham's vendor. Deepen the relationship, don't rebuild it.

**Build sequence — no skipping steps:**

| Stage | What it is | Lapham adoption friction |
|---|---|---|
| Stage 1: RM Read-Only Portal | Lapham can see job status for their properties | Zero — they gain visibility they don't have today |
| Stage 2: Lapham Form Demo | Build their existing WO form into a proper intake form — structured fields, zero parsing overhead, demo-ready | Near-zero — replaces a form they already fill out |
| Stage 3: Lapham-Filtered Login | Same CC2.0, scoped to their properties | Low — one login, clean view |
| Stage 4: Full PropMgmt Pack | Rent collection bridge, unit turnover, resident self-service | Phase 4 — requires multi-tenant architecture |

**Stage 2 strategy — Lapham Form Demo:**
Lapham's resident managers and maintenance team already use a form when submitting work orders to workorder@. The play is to replicate that exact form as a hosted web form. Submissions POST directly to Neon (no email, no Gemini parsing, no patchwork). The demo shows Lapham: "here's the form you already fill out — now submit it here instead of email and your jobs appear in the system instantly, correctly categorized, with no back-and-forth."

This is the long-term answer to Code.js patchwork parsing for the Lapham account. Structured data from a form is orders of magnitude cleaner than parsed free-text email. Every field that comes in from a form is a field that never has to be inferred by Gemini. Once live with Lapham, this becomes the pitch template for every other PM company: "sign up, customize the form fields for your properties, structured data flows in from day one."

**First step:** Get a copy of the form Lapham currently uses (or ask Brandon to forward a sample WO email that came through their form) and map the fields to the Dispatch Queue column schema.

**SaaS angle:** Once Lapham is live at Stage 3, it is the proof point for pitching other Bay Area PM companies. The pitch: CA compliance-native scheduling platform, purpose-built for property maintenance. ServiceTitan doesn't touch this vertical with this specificity. Jobber doesn't handle CA labor law. The niche is real and defensible.

**Revenue model options:**
- Per-property SaaS fee ($X/unit/month)
- Per-vendor seat fee (APT + any vendor the PM company uses gets billed through the platform)
- Platform fee on QB invoice flow (% of invoices processed through the system)

### Entity 4 — Real Estate Acquisition
**Role:** Lead generation + deal management for distressed property acquisition.
**Platform:** Tax Search (FastAPI + PostgreSQL on Railway + Cloudflare Pages frontend)

**Current state:** 10 CA counties registered, 252 LA properties, nightly APScheduler scraping live, Railway-deployed.

**What's missing:** Deal management layer. Tax Search is a search tool today. It needs to become a CRM.

**Build sequence:**
1. San Diego scraper live test — active auction, verify before close
2. All GovEase states (AZ, NV, TX, FL, ID, others) — single Antigravity sprint, each state = 4 lines inheriting GovEaseScraper
3. Deal Score: 0–100 composite (equity estimate, auction proximity, property type, years delinquent, bid competition)
4. CRM layer: Watchlist → Researching → Offer Submitted → Won/Lost → notes per property
5. n8n alert pipeline: new high-score property in target county → immediate email/SMS
6. Equity enrichment: assessed value from county assessor APIs → `equity_estimate = assessed - minimum_bid`
7. Address bridge → CC2.0 Master Directory: acquired property auto-enters PM entity's property list

**Idaho connection:** Idaho GovEase scrapers feed APT Idaho acquisition targets. A distressed property in Boise becomes an acquisition target AND a future maintenance client. The entities compound each other's value.

### Entity 5 — Construction (Phase 5)
Not started. Do not build until Entities 1 and 3 are generating reliable, automated P&L data. Construction requires milestone-based billing, permit tracking, subcontractor management, and Gantt-level scheduling — a materially different operational model. The platform will support it via a Construction Pack when the time comes.

---

## EMPLOYEE OWNERSHIP STRUCTURE

This is a strategic differentiator, not an afterthought. Field tradesperson retention is an industry-wide problem. Equity solves it at the cost of administration — which the system can automate.

**What the system needs to support employee ownership:**

1. **`entity_id` on all financial records** — add to Dispatch Queue, Time Records, and QB invoices immediately. Cheap now, expensive to retrofit at scale. Each owned entity has its own P&L.
2. **Equity ledger** — who owns what % of which entity. Phase 4 feature, but the data model must not preclude it.
3. **Profit sharing calculator** — once QB pipeline is live, profit per period per entity is computable. Distribution automation follows.
4. **Vesting schedule tracking** — founding employee equity vests over time. System enforces the schedule.

**Idaho as the proving ground:** Form Idaho LLC with founding field employee equity (5–15% pooled). Use lower wage environment + equity to build compensation competitiveness without CA wage pressure. Idaho employees use the same Tech PWA and compliance layer — the tech infrastructure is already there.

---

## BACKEND SECURITY & INFRASTRUCTURE STANDARDS

### Current Architecture — Honest Gap Assessment

| Component | Current State | Gap | Fix |
|---|---|---|---|
| TechPWA.gs | "Anyone" access via Google Workspace | Exposed to internet, no rate limiting | Cloudflare Worker proxy — **OPEN** |
| DashboardAPI.gs | Passcode auth via Script Properties | No rate limiting, no request signing | Cloudflare Worker + HMAC header — **OPEN** |
| Session tokens | Stored plain in Google Sheets col M | Sheet compromise = all sessions exposed | Hash tokens before storage (SHA-256) — **UNVERIFIED** |
| n8n / Flowise | Railway Sentinels (5 running) but core n8n/Flowise workflows not yet migrated | Partial — Sentinels on Railway, orchestration still local | Complete Railway migration — **OPEN** |
| Secrets | Vercel env vars + Script Properties | .bat files eliminated | Centralize in Vercel / Railway env vars — **MOSTLY DONE** |
| Error alerting | Sentry on Next.js frontend ✅ | Apps Script exceptions still silent | Apps Script unhandled exception → email brandon@ — **OPEN** |
| n8n workflows | Not version controlled | Workflow lost if machine fails | Export to JSON, commit to git — **OPEN** |
| Flowise flows | Not version controlled | Same risk | Export, commit to git — **OPEN** |
| Google Sheets PII | Encrypted by Google, accessible to any editor | No field-level control | Field encryption before Firebase migration — **OPEN** |
| Gemini model | Hardcoded in Code.js | Can't upgrade without code change | GEMINI_MODEL Script Property — **OPEN** |
| Drive attachment sharing | ✅ CLOSED (Session 47) | Was ANYONE_WITH_LINK | Now DOMAIN-scoped (APT org only) |
| Force PIN change | ✅ CLOSED (Session 47) | Techs started with default PINs | Force change on first login, enforced |
| CI/CD | ✅ LIVE | Manual clasp deploys | GitHub Actions auto-deploys DashboardAPI + TechPWA on push to main |

### Security Migration Sequence

**Phase 1 — Close Immediate Gaps (before compliance automation goes critical)**
1. Cloudflare Worker in front of TechPWA.gs: rate limiting (10 req/min per IP on auth endpoints), IP restriction (Apps Script only accepts Cloudflare IPs), shared secret header
2. Revert Google Workspace "Anyone" sharing setting once Worker is live
3. Hash session tokens in storage — store SHA-256(token), compare on auth
4. n8n + Flowise → Railway (Docker, same pattern as Tax Search)
5. Export n8n workflows + Flowise flows to JSON → commit to git

**Phase 2 — Before Lapham Onboarding**
6. JWT-based auth for dispatch dashboard (replace passcodes with proper signed tokens, 1-hour expiry, refresh token flow)
7. Google OAuth for @aptmaintenanceinc.com accounts (they already have Google identity — use it)
8. Sentry on all Next.js frontends (error tracking + performance)
9. Apps Script error alerting (unhandled exception → GmailApp.sendEmail to brandon@)
10. Centralized secrets audit: everything in Vercel env vars or Railway env vars, nothing in .bat files or committed code

**Phase 3 — Before Multi-Tenant**
11. Firebase/Firestore migration — replaces Google Sheets as primary data store
    - DashboardAPI interface stays identical (frontend sees no change)
    - Firestore security rules enforce row-level access (tenant isolation)
    - Transactional writes (no more concurrent-write data corruption risk)
    - Apps Script quota limits (6 min execution, 30 concurrent users) no longer apply
12. Field-level encryption for PII (tenant names, phones, SSNs, medical info)
13. Multi-region deployment (Firestore natively supports this)

### Apps Script Scalability Limits — Know When You'll Hit Them
| Limit | Value | When You'll Hit It |
|---|---|---|
| Max execution time | 6 minutes | Large batch operations (backfill-style) |
| Concurrent executions | ~30 | Multi-tenant (Lapham + others hitting API simultaneously) |
| UrlFetchApp daily calls | 20,000 | Gemini parsing at high email volume |
| Spreadsheet API reads | 50,000/day | Won't hit with current data model |

The Firebase migration is not optional at scale — plan for it in Phase 3 architecture work.

### Apps Script Migration Strategy — The Honest Long-Term View

**Industry standard verdict:** Google Apps Script is appropriate for deep Google Workspace automation (reading Gmail, writing to Calendar, sending from GmailApp). It is NOT appropriate as an API backend at scale. The development friction — OAuth reauth during every development session, no local testing, no TypeScript, no package management, 6-minute execution limit — compounds with every sprint.

**What triggers the reauth Brandon sees:** The `clasp` CLI uses OAuth 2.0 tokens stored in `~/.clasprc.json`. These tokens expire, requiring Brandon to `clasp login` through a browser. GitHub Actions CI/CD (in the Railway spec) eliminates this — clasp never runs on Brandon's machine again.

**Migration path — phased, not big-bang:**

| Component | Move When | Move To | Why |
|---|---|---|---|
| `DashboardAPI.gs` | Phase 3 (after Railway infra) | Node.js/Express on Railway | Most actively developed, highest reauth friction, already uses `openById()` — pure Sheets API client, trivial migration |
| `TechPWA.gs` | Phase 3 (same sprint as DashboardAPI) | Same Railway Node.js service | Same reasoning |
| `Code.js` (email parsing) | Phase 4 (Firebase migration) | Gmail Pub/Sub + Cloud Functions | Deep GmailApp dependency makes early migration complex; Gmail Pub/Sub is the proper replacement |

**What the Node.js migration looks like for DashboardAPI:**
- Same endpoints, same request/response shapes — frontend sees no change
- Google APIs Node.js client (`googleapis` npm package) replaces `SpreadsheetApp.openById()`
- Service account auth replaces OAuth (no more token expiry, no more reauth)
- Railway hosting: same `railway.toml` pattern as Tax Search
- TypeScript natively — same language as the frontend already uses
- Local development with hot reload via `tsx watch`
- Proper error logging, monitoring, and rate limiting middleware

**Result:** When DashboardAPI.gs and TechPWA.gs move to Railway, the only thing left on Apps Script is `Code.js` — the email polling script that legitimately belongs there because of its Gmail trigger dependency. Everything else is on Railway, fully standard, zero reauth friction.

### Intelligence Layer — Gaps and Improvements

**Gemini parsing:**
- Add `GEMINI_MODEL` Script Property (currently hardcoded, blocks model upgrades)
- Add confidence score to every parse response — low-confidence jobs route to "Needs Review" queue, not directly to Dispatch Queue (closes the Layer 1 gap)
- Add parse failure alerting: if Gemini returns malformed JSON, log to a dedicated "Parse Failures" sheet tab and notify brandon@

**Flowise as the rule engine:**
- Currently planned but not wired. The correct architecture: n8n receives clock events → calls Flowise compliance endpoint → Flowise evaluates break rules → returns premium owed or "compliant"
- This separates business logic (Flowise) from event routing (n8n) — clean, maintainable, independently testable

**Vector store for property knowledge (Phase 4):**
- As the Master Directory grows beyond 200 properties, fuzzy address matching degrades. Semantic similarity search over property history would outperform the current 2-word threshold matching.
- Implement as a Flowise workflow with a vector store node. Embeddings generated from property address + unit + historical job data.

---

## UNTAPPED TOOLS — ACTIVATION PLAN

Tools in the vault that have clear, immediate ROI:

| Tool | Activation | What It Does |
|---|---|---|
| **n8n-ai-automations repo** | Pull templates, adapt to QB + ADP endpoints | QB invoice trigger on job complete — template almost certainly exists |
| **Mailmeteor** (playbook in vault) | Wire to n8n job-complete event | Job completion summary → RM. Monthly portfolio report → Lapham. Zero marginal cost, high perceived value. |
| **Sales Blink** (playbook in vault) | Activate once Lapham Stage 3 is live | Structured cold outreach to Bay Area PM companies. Lapham is the proof point in the pitch. |
| **Maxun** (no-code scraper) | Use for counties not on GovEase/Bid4Assets/MyTaxSale | Supplements Tax Search without writing Playwright scrapers |
| **n8n Tax Search alert** | 30-minute workflow | Nightly scrape complete → new high-score properties → email/SMS alert |
| **Documentero** | Use only if template-design UI needed | pdfme is the default for wage statements, estimates, invoices |

---

## CC3.0 ARCHITECTURE — INFRASTRUCTURE DESIGN DECISIONS

These are the structural decisions that govern how the platform evolves. Locked here so they don't get relitigated sprint by sprint.

---

### Data Layer: Neon Postgres (Vercel Marketplace) + Drizzle ORM

**Decision:** Replace Google Sheets as the system of record with Neon Postgres, provisioned through the Vercel Marketplace. Firebase/Firestore remains the Phase 4 target for full multi-tenant SaaS (row-level security, real-time subscriptions). Neon gets us to Phase 3 without the Firebase migration complexity.

**Why Neon over Firebase now:** SQL is the right model for APT's relational data (jobs → time_records → techs). Neon auto-provisions `DATABASE_URL` in Vercel env. No SDK lock-in. Drizzle schema is plain TypeScript — AG can read and write it. Firebase's real-time subscription model earns its keep at multi-tenant scale; at current scale it adds complexity with no benefit.

**Why Drizzle over Prisma:** No code generation step, works in Edge Runtime if needed, no module resolution conflicts with Next.js App Router. Prisma's generated client is too fat for serverless.

**Migration strategy — strangler fig, not big-bang:**
```
Phase A: Add Neon. Write to both Sheets + Postgres. Sheets stays source of truth.
Phase B: Switch reads to Postgres, table by table. Start with new tables (comms_messages, job_comments — no historical data to migrate). Then time_records. Last: jobs (Dispatch Queue).
Phase C: Remove Apps Script write paths per table. DashboardAPI.gs becomes Gmail/Calendar transport only.
```
**Never migrate Tech Roster (auth) early.** Badge+PIN flow works. Do it last.

**Initial schema (maps directly from existing column indexes):**
```sql
jobs            (id, lead_id, priority, email_type, category, address, unit, rm_name, rm_email,
                 tenant_name, tenant_phone, tenant_email, assigned_tech, scheduled_date,
                 scheduled_time, est_hours, status, notes, gmail_msg_id, calendar_event_id,
                 pte_granted, tracking_token, entity_id, ...)
time_records    (id, job_id, tech_id, clock_in, clock_out, break_start, break_end,
                 supervisor_status, attestation, entity_id, ...)
techs           (id, badge, name, rank, pin_hash, session_token, role, active, entity_id, ...)
comms_messages  (id, job_id, channel, direction, from_addr, to_addr, stakeholder, body,
                 subject, thread_id, sent_at, created_by_id, entity_id)
job_comments    (id, job_id, author_id, text, created_at)
```

`entity_id` goes on every table from day one. Non-negotiable — retrofitting it at Idaho launch is expensive.

**Vercel agent to use when provisioning:** `vercel:vercel-storage`

---

### WO Intake: Dual-Path (Email Primary, Form Parallel)

**The reality:** APT's current PM clients will not reliably switch to a form. Email intake stays as the primary path permanently, not as a temporary fallback. The form is a parallel path that improves data quality when used.

**The strategy:**
- `Code.js` email parsing continues as-is for all clients
- Auto-response to every email intake includes a link to the structured form: *"Using our online form helps us schedule your request faster."* — zero friction nudge, never mandatory
- Lapham form submissions arrive via email (the form posts to workorder@) — the parser must detect when a structured Lapham form is present in the email body vs. free-text. Form-detected emails get high confidence score → auto-route to Ready to Schedule. Free-text emails route to Needs Review.
- Over time, as form adoption grows among compliant PMs, the Gemini parsing path handles only edge cases and stragglers

**What this means for Code.js:** Add a `detectLaphamForm(emailBody)` function that pattern-matches known Lapham form field headers. When detected: parse fields directly (regex, not Gemini) → high confidence → skip Needs Review. When not detected: Gemini parse → assign confidence score → route accordingly.

**Confidence scoring:**
```
≥ 0.85 → Ready to Schedule (address clean, RM email present, category identified)
0.60–0.84 → Needs Review (address ambiguous, or key fields missing)
< 0.60 → Needs Review + parse_failure_alert to brandon@
```

**Vercel agent to use when building AI SDK parsing route:** `vercel:ai-sdk`

---

### Pre-Assignment Triage Workspace

**The problem it solves:** Right now, the coordination that happens between "email received" and "job scheduled" — the PTE chase, the RM clarification, the access info request — has no structured home. It piles up in email, in Notes, and in personal texts. None of it is queryable or reportable.

**The solution:** A dedicated Triage View within CC2.0, separate from the scheduling grid. This is not a new page — it's a mode within `/live` that surfaces pre-schedulable jobs (status: New, PTE Required, Awaiting Approval) with a structured coordination workspace per job:

- **Comms thread** (unified: email + SMS, all stakeholders, chronological) — powered by `comms_messages` table, not Gmail API calls
- **Coordination checklist** per job: Access info confirmed? PTE granted? Estimate approved? Address verified?
- **Aging indicator**: how long has this job sat in this status? Red flag at 24h for PTE Required, 48h for Needs Review
- **Bulk PTE action**: select multiple PTE Required jobs for same address/RM → send one email covering all

**This is Phase A work** — the UI exists (the Needs Review tab), the infrastructure (comms_messages table) gets built in Tier 2, and the triage workspace is a Tier 3 sprint that composes those two.

---

### Structured Comms Log

**The core architectural shift:** Every message to/from any stakeholder is stored in Postgres (`comms_messages`), not only in Gmail. The job modal reads from Postgres, not from Gmail API. Gmail becomes the transport, not the source of truth.

**Write path (outbound):**
```
Client → POST /api/jobs/[jobId]/comms/send
  → calls replyToThreadDA (Gmail transport) OR OpenPhone API (SMS)
  → on success: INSERT INTO comms_messages
  → return to client
```

**Write path (inbound email):**
```
When dispatch opens a job modal → fetchThread() calls getGmailThreadDA
  → route handler UPSERTs messages into comms_messages using thread_id as dedup key
  → historical threads backfill automatically on first open — no batch import needed
```

**Write path (inbound SMS — when OpenPhone is live):**
```
OpenPhone webhook → POST /api/webhooks/openphone
  → INSERT INTO comms_messages with channel='sms', stakeholder='tenant'
  → Tenant tab in job modal shows email + SMS in unified chronological thread
```

**Why this matters:** When Lapham gets a read-only portal (Stage 1), every message about their properties is queryable without touching Gmail. SLA reporting (email received → scheduled → complete) becomes a SQL query.

**Vercel agents to use during this build:** `vercel:nextjs` (Server Actions), `vercel:env-vars` (DATABASE_URL management)

---

### Gemini Parsing → Vercel AI SDK Route

**Current:** `parseWithGemini()` in Code.js calls UrlFetchApp with manually constructed JSON. Silent failures write bad data to Sheets.

**Target:** `/api/parse-email` Next.js route handler using `generateText` with `Output.object()` (Zod schema validation). Malformed responses throw, get caught, route to dead-letter queue + alert. Structured output guaranteed.

**Migration:** Apps Script calls the Next.js route, gets validated job object back, writes to Sheets (Phase A). No frontend change. Parsing complexity moves to a testable, versionable place.

**Trigger stays in Apps Script** — `checkNewLeadEmails()` uses GmailApp for polling. That legitimately belongs in Google's infrastructure. Only the AI call moves.

**Vercel agent to use:** `vercel:ai-sdk`

---

### Dispatch Queue Caching

**Problem:** Every `getDispatchDataDA` call goes through Cloudflare → Apps Script → Sheets. This is the worst latency path in the system.

**Fix (Phase B, after reads move to Postgres):** Implement `cacheTag('dispatch-queue')` with 30-second TTL. Invalidate via `revalidateTag` on every job write. Dispatch sees stale data for at most 30 seconds — acceptable for a job queue. Eliminates Apps Script latency on page loads entirely.

**Vercel agent to use:** `vercel:next-cache-components`

---

### Security Fix — NEXT_PUBLIC_DASHBOARD_API_KEY

The `NEXT_PUBLIC_DASHBOARD_API_KEY` env var is used in `src/app/api/push/subscribe/route.ts` — a server-side route. The `NEXT_PUBLIC_` prefix exposes it to the browser bundle unnecessarily. This should be `DASHBOARD_API_KEY` (server-only) with the fetch inside the route handler remaining server-side. **Fix before CC3.0 API surface expands.**

---

### PAGA / Wage Compliance — Active Enforcement Architecture

The current system tracks compliance events but does not act on them. CC3.0 makes enforcement automatic and self-documenting.

**Meal period enforcement (the highest-exposure gap):**
- n8n listens to clock events via Railway Sentinel
- If a tech is clocked in for 5+ hours with no break logged: auto-flag fires → dispatch notified → tech notified via PWA push → flagged in `time_records` with `meal_warning: true`
- If tech reaches 6 hours without break: second flag with premium calculation attached
- The system calculates the premium (1 hour at regular rate) and appends it to the timecard automatically — not as a manual adjustment Ana makes later

**Additional enforcement gates:**
- **7th consecutive workday detection**: Railway Sentinel scans Time Records on clock-in. If tech has worked 6 consecutive days, auto-flag to dispatch + Ana before the shift completes
- **Overtime calculation**: system computes daily OT (>8h → 1.5x, >12h → 2x) and weekly OT (>40h → 1.5x) on every clock-out. Written to `time_records` as computed fields, not manual entries
- **Attestation chain lock**: Tech signs → Supervisor approves → record locks. Immutable after lock. This is the legal shield in any PAGA audit

**Weekly compliance report (automated, every Monday):**
- Vercel Cron Job (or Railway Sentinel) runs Sunday night
- Scans prior week's Time Records for: meal violations, OT events, unsigned attestations, disputed records
- Generates report → emails Ana + brandon@ with specific code violations cited
- No manual review needed unless violations found

**What this means in practice:** By the time any payroll period closes, the system has already caught every PAGA exposure and either resolved it automatically (premium calculated, record flagged) or surfaced it for human decision. Ana's job becomes approval, not discovery.

---

### Field Documentation — Before/After Photos + Receipts

**The problem:** Right now, a tech can mark a job complete with no photographic evidence and no receipt record. This creates disputes with PMs, no proof of work, and zero cost tracking for materials.

**CC3.0 enforcement model:**
- Before mark-complete is allowed on a job, the PWA checks: at least 1 "before" photo uploaded AND at least 1 "after" photo uploaded
- Receipt capture is optional per job but required for jobs where materials were purchased (flag set by dispatch on job card: "Materials Expected")
- Photos store to **Vercel Blob** (not Google Drive) — structured by `job_id`, instantly accessible in the job modal without Drive API calls. Drive stays as the long-term archive export
- Receipts: photo → Blob → linked to `job_id` in Postgres `receipts` table (amount, vendor, date, tech_id, approved_by)

**Data model addition:**
```sql
job_photos   (id, job_id, tech_id, phase, blob_url, taken_at)
             -- phase: 'before' | 'after' | 'in_progress'
receipts     (id, job_id, tech_id, blob_url, amount, vendor, date, approved_by, entity_id)
```

**Dispatch view:** Job modal shows photo grid (before/after side by side) and receipt list. PM portal (Stage 1) shows the same — closes the "what did you actually do?" dispute loop entirely.

**Vercel agent to use:** `vercel:vercel-storage` (Vercel Blob for photo storage)

---

### Apps Script → Node.js/Railway — Migration Architecture

This is the long-term escape from Apps Script's 6-minute execution limit, reauth friction, and lack of TypeScript. It is not urgent — it becomes urgent when concurrent users hit ~30 or when DashboardAPI reauth starts costing sprint time.

**What moves and when:**

| Component | Move When | Move To | Notes |
|---|---|---|---|
| `DashboardAPI.gs` | Phase 3 (after Postgres reads live) | Node.js/Express on Railway | Pure Sheets API client today → `googleapis` npm client tomorrow. Same endpoints, zero frontend change. Service account auth replaces OAuth — no more token expiry. |
| `TechPWA.gs` | Phase 3 (same sprint as DashboardAPI) | Same Railway Node.js service | Same reasoning. Shift workflow, timecard writes, auth — all move. |
| `Code.js` (email parsing) | Phase 4 | Gmail Pub/Sub + Cloud Functions | Deep GmailApp dependency makes early migration complex. Gmail Pub/Sub is the proper replacement. Email trigger stays Google-native. |

**What the Node.js service looks like:**
- Railway deployment, `railway.toml` config (same pattern as Tax Search)
- TypeScript natively — same language as the frontend
- Local development with hot reload via `tsx watch`
- `googleapis` npm client for Sheets, Calendar, Gmail reads
- Service account JSON in Railway env vars — no OAuth, no reauth, no browser login
- Proper middleware: rate limiting, request logging, error alerting to Sentry

**Result:** When DashboardAPI.gs and TechPWA.gs move to Railway, `Code.js` is the only thing left on Apps Script — and it legitimately belongs there because of its Gmail trigger dependency. All other backend complexity is on Railway, fully standard, zero reauth friction.

---

### Tech Job Acceptance Loop

**The gap:** Dispatch schedules a job and assumes the tech sees it. There is no confirmation. If the tech misses the push notification or doesn't open the PWA, the job shows up on-site with no tech.

**CC3.0 loop:**
```
Dispatch confirms schedule → Postgres updated → push notification fires to assigned tech
Tech opens PWA job card → "Accept" button visible → tech taps Accept
Dispatch sees status: Accepted (green indicator on job card)
Tech does not accept within 2 hours → dispatch gets a follow-up alert
```

**Implementation:** Two new fields on `jobs`: `tech_accepted_at` (timestamp), `tech_acceptance_status` ('pending' | 'accepted' | 'declined'). The PWA job list shows an Accept button on newly assigned jobs. Dispatch job card shows acceptance status. The Railway Sentinel checks for unaccepted assignments older than 2 hours and fires an alert.

---

## PRIORITY BUILD SEQUENCE

Ordered by dependency and legal exposure. No dates. No BT deadline pressure. Progress is gated by tokens, not time.

### Tier 1 — Complete What's Started (Highest Impact Per Token)
1. **Meal premium auto-calculation + daily attestation** — closes the biggest PAGA exposure. Every pay period without this is liability accumulating.
2. **Job closeout → QB invoice via n8n** — enables unit economics. Nothing in Tier 4+ can be evaluated without this data.
3. **ADP payroll export via ApiX-Drive** — closes the Ana-manual-bridge gap
4. **Add `entity_id` to Dispatch Queue, Time Records, QB invoices** — ✅ COMPLETE. Injected into all append/update logic.
5. **Hash session tokens in Google Sheets storage** — simple security hardening — **UNVERIFIED: confirm whether token is hashed before Sheets write in TechPWA.gs**
6. **San Diego Tax Search scraper live test** — verify against active auction — **STATUS UNKNOWN**

### Tier 2 — Close Infrastructure Gaps + CC3.0 Foundation
7. **GitHub Actions clasp CI/CD** — ✅ COMPLETE. Auto-deploys DashboardAPI.gs + TechPWA.gs on push to main. **n8n + Flowise Railway migration still open** — Sentinels running on Railway but core orchestration workflows not migrated.
8. **Cloudflare Worker in front of TechPWA.gs** — rate limiting, IP restriction, revert "Anyone" access — **OPEN**
9. **Apps Script error alerting** — unhandled exceptions surface to brandon@ instead of dying silently — **OPEN**
10. **Gemini confidence score + Lapham form detection + parse failure logging** — add `detectLaphamForm()` to Code.js; route form-detected emails directly to Ready to Schedule; add confidence score; low-confidence → Needs Review + alert — **OPEN** (use `vercel:ai-sdk` when parsing moves to Next.js route)
11. **NEXT_PUBLIC_ security fix** — change `push/subscribe/route.ts` to use server-only `DASHBOARD_API_KEY` — **OPEN** (5-minute fix, do before CC3.0 surface expands)
12. **Neon Postgres provisioned + Drizzle schema** — Vercel Marketplace → `DATABASE_URL` in env. Schema: jobs, time_records, techs, comms_messages, job_comments. No data moved yet — Phase A foundation only. (use `vercel:vercel-storage`) — **OPEN**
13. **Comms log — Phase A** — write to `comms_messages` on every outbound send; upsert on every `getGmailThreadDA` fetch. Job modal reads from Postgres for comms. Historical threads backfill on first open. (use `vercel:nextjs`) — **OPEN**
14. **n8n alert pipeline for Tax Search** — high-score property → immediate notification — **OPEN**
15. **DashboardAPI.gs + TechPWA.gs → Node.js/Railway** — eliminates Apps Script reauth permanently. Same endpoints, `googleapis` npm client, service account auth. `Code.js` stays on Apps Script. — **OPEN** (Phase 3)

### Tier 2.5 — Professional Infrastructure Baseline (SPEC WRITTEN)
**Spec:** `specs/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md`
- **Seed script** — `tech-pwa/scripts/seed.ts` populates Neon dev branch with 42 jobs across all statuses. Every future test sprint runs against realistic data volume.
- **Sentry** — error monitoring on Next.js frontend. Production failures surface to Brandon within minutes.
- **E2E on CI** — Playwright auto-triggers on PRs touching `tech-pwa/**`. Currently manual-trigger only.
- **NEXT_PUBLIC security fix** — `push/subscribe/route.ts` reads `DASHBOARD_API_KEY` (server-only), not `NEXT_PUBLIC_DASHBOARD_API_KEY`.
- **Brandon prereqs:** Merge 5 open Dependabot PRs + add Windows Defender exclusions (GUI).

---

### Tier 2.6 — Time Off Manager Migration (SPEC PENDING)
**Goal:** Retire the AppSheet Time Off Manager (brandon@ Google account) and bring time-off management natively into CC2.0 on Neon. This eliminates a GAS/AppSheet dependency and integrates leave data with the PAGA compliance engine.

**Source schema (AppSheet, Google Sheets ID: `1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk`):**
- `employees` — Employee ID (= badge), Full Name, Email, Hire Date, Role, Total Hours Worked
- `accrual_rules` — Rule Name, Accrual Rate (text: "2 weeks per year"), Max hours cap, Min Tenure Years (10 rules, tenure-based ladder from New Hire → 23 Year)
- `time_off_requests` — Request ID, Leave Type (Vacation/Sick), Request Type, Start Date, End Date, Hours, Reason, Status, Legal Alert, Manager Notes

**Neon migration target (new tables):**
```sql
accrual_rules (
  id serial PK, rule_name text, hours_per_year real,
  max_hours real, min_tenure_years int, entity_id text
)
time_off_requests (
  id serial PK, request_id text UNIQUE,
  employee_badge text,            -- joins to techs.badge
  leave_type text,                -- 'vacation' | 'sick'
  request_type text,              -- 'full_day' | 'hourly'
  start_date date, end_date date,
  hours real, reason text,
  status text DEFAULT 'pending',  -- 'pending' | 'approved' | 'denied'
  legal_alert text, manager_notes text,
  approved_by text, approved_at timestamp,
  entity_id text, created_at timestamp DEFAULT now()
)
```

**CA compliance rules (non-negotiable):**
- Sick leave requests: auto-approve on submission (CA Labor Code §246.5 — denial is illegal)
- Vacation: manager approval required, no auto-approve
- Accrual balance calculated from `hire_date` + `accrual_rules` row matching tenure years

**CC2.0 integration:**
- HR page (`/hr`) — time off request queue with approve/deny actions
- Time Off page (`/calendar`) — existing calendar view powered by Neon instead of AppSheet
- Tech PWA — techs submit requests via PWA (future sprint, after backend is live)
- PAGA engine — time_off_requests feeds into compliance calculations (approved leave ≠ meal violation)

**Migration tasks (high level — spec TBD):**
1. Add Neon tables via Drizzle migration
2. One-time data export from AppSheet Google Sheet → seed Neon tables
3. Build `/api/time-off/` routes (GET requests, POST submit, PATCH approve/deny)
4. Connect HR page to new routes
5. Retire AppSheet dependency

**Prerequisites:** P1 infrastructure sprint complete (seed script, Sentry live).

---

### Tier 3 — Deepen Core Platform
16. **RROP engine** — Ferra doctrine weighted average calculation
17. **Itemized wage statement generator** (LC §226) via pdfme
18. **Supervisor sign-off + employee attestation workflow** — PAGA audit trail
19. **SLA tracking** — email received → scheduled → complete. Foundation for Lapham reporting. Powered by `comms_messages.sent_at` timestamps once comms log is live.
20. **Pre-assignment triage workspace** — dedicated coordination UI within `/live` for Needs Review / PTE Required / Awaiting Approval jobs. Per-job coordination checklist (access confirmed, PTE granted, estimate approved, address verified). Aging indicators. Bulk PTE action. Powered by `comms_messages` table (Tier 2 prerequisite).
21. **Gemini parsing → Vercel AI SDK route** — `/api/parse-email` with `Output.object()` + Zod schema. Structured output guaranteed, malformed responses caught. Apps Script calls route, writes to Sheets (Phase A). (use `vercel:ai-sdk`)
21a. **Lead ingest → Neon direct write** — GAS parses lead → calls `POST /api/inbound/lead` → writes to `new_contact_queue` in Neon, bypassing Sheets entirely. n8n triggers on the Neon row instead of polling a Sheet. Removes the last Sheets dependency from the inbound lead pipeline. **Prerequisite: item 21 complete.**
21b. **Address + client matching at parse time** — when a lead arrives, run `normalizeAddressKey()` against the address and query the `properties` table. If matched, set `property_id` and `client_id` on the `new_contact_queue` row at ingest. Cross-reference sender email against `clients.contact_email` for client attribution. Leads arrive pre-resolved — no manual lookup. **Prerequisite: item 21a + P3-3 property data in Neon.**
21c. **Few-shot Gemini prompting from historical data** — feed Gemini 3–5 labeled examples from `new_contact_queue` per known form type (Lapham, MRE, generic). Improves field extraction accuracy on edge cases without model change. Historical data in Neon makes this queryable programmatically. **Prerequisite: items 21 + 21a.**
22. **Dispatch queue read → Postgres + cacheTag** — switch `getDispatchDataDA` reads to Postgres. `cacheTag('dispatch-queue')` with 30s TTL, `revalidateTag` on every write. Eliminates Apps Script latency on page loads. (use `vercel:next-cache-components`)
23. **Tech job acceptance + push notification** — on assignment, push notification fires to tech's PWA. Tech taps Accept → status visible to dispatch. Eliminates silent scheduling assumption.
24. **calibrateDurationDefaults()** — auto-calibrates est. hours from Job Performance History (awaiting 20+ PWA completions with real data)
25. **Trainee enforcement in tech picker** — ✅ PARTIAL. Warning exists in `/schedule` + `/live` JobDetailModal. Full enforcement (block save, not just warn) is a future sprint.
26. **Crew/multi-tech scheduling schema** — decide on `assignedTechs[]` array before building UI
27. **Code.js auto-routing** — turnover/inspection → Ready to Schedule at parse time; adhoc with tenant → PTE Required — queued, not yet scheduled

### Tier 4 — External Expansion
28. **Lapham Form Demo** — replicate Lapham's existing WO submission form as a hosted web form. Structured fields POST directly to Neon — no email, no Gemini parsing. Demo to Lapham: "submit the form you already fill out here instead of email, jobs appear instantly." This is the pitch template for all future PM clients. **Prerequisite: get a sample of Lapham's current form to map fields.** (use `vercel:nextjs` Server Actions)
29. **Intake form — general parallel path** — hosted at `schedule.aptmaintenanceinc.com` for non-Lapham clients. Form link included in auto-response to all email intakes. Parallel to email, never a replacement.
29. **Tracking token status page** — `/track/[token]` lets tenants/RMs see job status (Scheduled for Tuesday) without logging in. Uses existing `trackingToken` field in schema.
30. **RM/Client read-only portal** — Lapham Stage 1. Powered by `comms_messages` and Postgres jobs table — every communication about their properties queryable without touching Gmail.
31. **All GovEase states in Tax Search** — single Antigravity sprint
32. **Deal Score + CRM layer in Tax Search** — moves from search tool to investment platform
33. **Lapham-filtered dashboard login** — Stage 3
34. **Job complete → RM completion email** (n8n + Mailmeteor)

### Tier 5 — New Entities
26. **Idaho LLC formation + employee equity structure**
27. **Idaho compliance ruleset** (different break laws, WC codes)
28. **Idaho CC2.0 deployment** (fork + configure)
29. **PropMgmt Pack** (rent collection bridge, unit turnover, resident self-service)
30. **Sales Blink outreach** — Bay Area PM companies, Lapham as proof point

### Tier 6 — SaaS Infrastructure
39. **JWT auth + Google OAuth** for dispatch dashboard
40. **Firebase/Firestore migration** — replaces Neon Postgres for multi-tenant SaaS. Neon handles APT CA + Idaho + Lapham (3 entities). Firebase earns its keep when you have 10+ PM clients requiring row-level real-time data isolation. Neon → Firebase is a defined migration path, not a reinvention.
41. **Firestore security rules** — row-level tenant isolation
42. **Tenant config layer** — industry type, state, compliance ruleset as config
43. **Multi-region deployment**
44. **OpenPhone SMS integration** ($15/mo) — business SMS number, webhook to `/api/webhooks/openphone`, messages stored in `comms_messages`. Eliminates personal phone texts for tenant PTE coordination. Revisit when OpenPhone pricing confirms it's live on their API.

---

## TEAM PROTOCOL — PEER PAIR MODEL (Updated Session 54)

> Full workflow in `WORKFLOW.md`. Summary here.

### Division of Labor
| Role | Responsibility |
|---|---|
| **Brandon** | States outcomes. Answers blockers. Runs merges. |
| **Claude Code** | Safety net — clears flagged items (auth/schema/columns/cross-system), reviews diffs, approves merges, implements GAS-only + emergency changes. SuperClaude for analysis/design. |
| **Antigravity** | Owns implementation end-to-end — plans via GSD, builds, tests via SuperGravity /test (separate sprint), self-audits via /gsd-code-review. |
| **n8n** | Event bus — clock events, QB triggers, alert routing, Flowise calls |
| **Flowise** | Compliance rule engine — break logic, premium calculation, RROP |
| **pdfme / AE_DocGen** | Document generation — wage statements, estimates, invoices |
| **Railway** | Hosting for n8n, Flowise, Tax Search backend |
| **Vercel** | Hosting for all Next.js frontends |
| **Cloudflare** | Security layer — Worker proxy, rate limiting, DNS, Pages (Tax Search frontend) |

### Quality Gate — Every Sprint
Before any AG sprint is considered complete:
- [ ] `npx tsc --noEmit` — zero errors
- [ ] All loading states render (skeleton loaders, not blank divs)
- [ ] All error states render (error messages, not blank divs)
- [ ] Framer Motion animations on all transitions
- [ ] Dark mode correct (no hardcoded light-mode colors)
- [ ] Mobile breakpoint tested (< 768px) for field-facing surfaces
- [ ] `artifacts/ag_test_results.txt` written with explicit [PASS]/[FAIL]/[BLOCKED] lines
- [ ] `artifacts/ag_diff.txt` is `git diff main...HEAD` (full branch, not HEAD~1)

### What Claude Code Never Delegates
- Security architecture (auth model, token handling, encryption)
- Compliance logic (RROP, break rules, PAGA thresholds) — legal consequences
- Data model decisions (column indexes, field names, status strings)
- Any operation touching live production data at scale
- CLAUDE.md, WORKFLOW.md, and this roadmap

---

*Last updated: May 6, 2026 — Session 51. CC3.0 architecture integrated. Roadmap v3.0 replaces v2.0.*
