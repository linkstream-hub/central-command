<!-- generated-by: gsd-doc-writer -->
# APT CENTRAL COMMAND — ARCHITECTURE

Internal ops platform for property maintenance dispatch, field tech coordination, and work order lifecycle management. Multi-bounded-context system migrating from GAS/Sheets monolith to a modular Next.js + Neon Postgres architecture.

Live: `https://dispatch.aptmaintenanceinc.com`

---

## System Overview

APT Central Command is a CA labor-law-native SaaS platform serving two distinct user populations: office staff (dispatchers, HR, admin) who manage the full work order lifecycle through a browser dashboard, and field technicians who use a mobile-first PWA to clock in/out, sign attestations, and receive job assignments. Inbound work orders arrive via Gmail (polled by GAS every 15 minutes), are parsed through a Gemini AI pipeline, routed through an 8-state finite state machine, and tracked through to field execution and compliance check.

The system is organized into nine bounded contexts following Domain-Driven Design. Each context owns its tables in Neon Postgres and communicates with other contexts through n8n webhook events — not direct cross-context SQL joins in application code. The current implementation is a **modular monolith** (single Vercel deployment, single Neon instance) with n8n as the event bus. Microservices are out of scope until PM SaaS exceeds ~50 client orgs.

---

## Component Diagram

```
[Gmail]
   │ GAS 15-min trigger (checkNewLeadEmails)
   ▼
[Google Apps Script]        [Tech PWA browser]      [Office Dashboard browser]
  Code.js / TechPWA.gs          │                          │
   │ POST /api/parse/            │ fetch /api/field/*       │ fetch /api/jobs/*
   │ POST /api/field/*           │                          │ fetch /api/dashboard/*
   └──────────────────────────────┘                         │
                                  ▼                         ▼
                         [Next.js API Routes — tech-pwa/src/app/api/]
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼              ▼
               [DAL layer]   [Upstash Redis]  [n8n webhook POST]
            lib/dal/*.ts      (rate limiting)        │
                    │                          [n8n on Railway]
                    ▼                                │
             [Neon Postgres]  ◄─────────────────────┘
              (source of truth)
```

---

## Directory Structure

```
1_APT_Central_Command/
├── tech-pwa/                      # Next.js 16.x app (App Router)
│   └── src/
│       ├── app/                   # Pages + API routes
│       │   ├── api/               # All API route handlers
│       │   │   ├── field/         # Tech PWA endpoints (clock-in, clock-out, shift, attestation, jobs)
│       │   │   ├── jobs/          # Work order CRUD + history
│       │   │   ├── dashboard/     # Office dashboard data endpoints
│       │   │   ├── intake/        # Email parse → work order creation
│       │   │   ├── parse/         # Gemini parse + n8n webhook bridge
│       │   │   ├── schedule/      # Scheduling + calendar operations
│       │   │   ├── webhooks/      # Inbound n8n webhooks
│       │   │   ├── auth/          # next-auth + tech session endpoints
│       │   │   ├── cron/          # Scheduled jobs (compliance, sync)
│       │   │   ├── comms/         # Communications thread API
│       │   │   ├── properties/    # Property directory endpoints
│       │   │   ├── notifications/ # Push notification management
│       │   │   └── admin/         # Admin operations
│       │   ├── live/              # Dispatcher live queue (office)
│       │   ├── schedule/          # Scheduling view (office)
│       │   ├── jobs/              # Tech PWA job list
│       │   ├── job/[jobId]/       # Tech PWA job detail
│       │   ├── clock/             # Tech clock in/out
│       │   ├── team/              # Staff management
│       │   ├── hr/                # HR and time-off
│       │   └── compliance/        # PAGA compliance dashboard
│       └── lib/
│           ├── dal/               # Data access layer (repository pattern)
│           │   ├── jobs.ts        # Work order reads/writes
│           │   ├── techs.ts       # Employee/tech queries
│           │   ├── time-records.ts # Shift and time record queries
│           │   └── mappers.ts     # Neon row → domain type mappers
│           ├── schema.ts          # Drizzle ORM schema (source of truth for table defs)
│           ├── db.ts              # Neon connection + Drizzle client
│           ├── auth.ts            # Tech PWA session (getSession, localStorage)
│           ├── job-transitions.ts # WO status FSM transition rules
│           ├── compliance.ts      # CA meal period violation detection
│           ├── normalizeAddressKey.ts # Property dedup key computation
│           ├── detectLaphamForm.ts    # Structured form detection (bypasses Gemini)
│           ├── fieldSchemas.ts    # Zod schemas for field API validation
│           ├── permissions.ts     # RBAC module flag checks
│           └── rateLimit.ts       # Upstash Redis rate limiting
├── Code.js                        # GAS: email polling + lead parsing trigger
├── TechPWA.gs                     # GAS: tech auth + attestation (migrating out)
├── dashboard-api/                 # GAS: DashboardAPI.gs (CC2.0 bridge, migrating out)
├── tools/n8n/                     # n8n workflow exports + scripts
│   └── workflows/                 # Version-controlled workflow JSON exports
└── docs/
    ├── adr/                       # 8 Architecture Decision Records
    └── DOMAIN_ARCHITECTURE.md    # Full DDD bounded context analysis
```

---

## Authentication (ADR-001)

Two completely separate auth systems. **Never mix the hooks.** Wrong hook = redirect loop in production.

| User Type | Mechanism | Hook | Session Store |
|---|---|---|---|
| Office staff | Google OAuth via next-auth v5 (`@aptmaintenanceinc.com` domain only) | `useSession()` from `next-auth/react` | next-auth JWT cookie |
| Field techs | 3-digit badge + 4-digit PIN → SHA-256 hash → UUID token (24h expiry) | `getSession()` from `@/lib/auth` | `localStorage['apt_tech_session']` |

**Page zone split:**
- Office pages (`/live`, `/schedule`, `/team`, `/hr`, `/compliance`, `/intel`, `/finance`, `/billing`): `useSession()`
- Tech PWA pages (`/jobs`, `/job/[jobId]`, `/clock`): `getSession()`

`RouteGuard.tsx` enforces RBAC for office routes via the `permissions` object and explicitly bypasses all `/jobs` and `/job/` paths. See `src/auth.ts` for next-auth config and `src/lib/auth.ts` for tech session logic.

---

## Data Layer (ADR-002, ADR-006)

**Source of truth: Neon Postgres.** Google Sheets Dispatch Queue is a read-only archive as of the Phase 3 cutover (2026-06-01).

- **ORM:** Drizzle ORM — schema defined in `tech-pwa/src/lib/schema.ts`, types inferred at compile time
- **Connection:** `@neondatabase/serverless` HTTP driver initialized in `tech-pwa/src/lib/db.ts`; pooled endpoint for serverless functions, unpooled only for migrations
- **Migrations:** `drizzle-kit` — plain SQL migration files, version-controlled. Never use `drizzle-kit push` in production.
- **DAL pattern:** All data access goes through `tech-pwa/src/lib/dal/`. Route handlers call DAL functions; DAL calls Drizzle; no raw SQL in route handlers.
- **Multi-tenancy:** Every table has `org_id TEXT NOT NULL REFERENCES organizations(slug)`. No exceptions. APT CA rows: `org_id = 'APT-CA'`. See ADR-005.

**Known cleanup pending:** `dal/jobs.ts:updateJob` still contains legacy Sheets shadow-write code from the migration period (ADR-006 superseded). This is dead code — the GAS side no-ops it via `WRITE_PATH_NEON_ONLY=true`. Cleanup sprint pending.

---

## Work Order Status Lifecycle (ADR-004)

The work order lifecycle is a **locked 8-state finite state machine**. Do not add, remove, or rename states without an architecture review.

```
Needs Review → Ready to Schedule → PTE Required → Awaiting Approval
                                                         ↓
Archived ← Complete ← In Progress ← Scheduled ←────────┘
```

| Status | Meaning | Auto-Transition |
|---|---|---|
| `Needs Review` | Parsed from email; confidence low or needs human check | — |
| `Ready to Schedule` | PTE confirmed or N/A; assignable to tech | → Scheduled (when tech + date + time all set in one PATCH) |
| `PTE Required` | Permission to Enter not yet granted; cannot schedule | — |
| `Awaiting Approval` | Tenant self-scheduling link sent; awaiting confirmation | → Scheduled |
| `Scheduled` | Tech assigned + date + time set | → In Progress (on ClockIn) |
| `In Progress` | Tech has clocked in | → Complete (on AttestationSigned) |
| `Complete` | Tech has signed attestation | — |
| `Archived` | Terminal — off the live queue | — |

PTE gate is enforced in `dal/jobs.ts:updateJob`: cannot move to `Ready to Schedule` or `Scheduled` if `pteGranted` is not `'Yes'` or `'Not Required'`. Transition rules live in `lib/job-transitions.ts`.

---

## Event Topology (ADR-007)

n8n (self-hosted on Railway) is the event bus. Domains publish events as webhook POSTs to n8n; n8n routes to downstream consumers. Domain A does not query Domain B's tables directly.

**Current active workflow:** `CA Break Compliance Monitor` — triggered by `signAttestation()` webhook POST. Reads time records, calculates shift state, writes violations to `compliance_alerts`.

**Target event topology (Phase 4):**

| Event | Producer | Consumers |
|---|---|---|
| `AttestationSigned` | Field Operations | Compliance (violation check), Work Order Mgmt (→ Complete) |
| `WorkOrderScheduled` | Work Order Mgmt | Communications (notify PM, tenant, tech) |
| `WorkOrderCompleted` | Work Order Mgmt | Financial (trigger invoice), Compliance (final check) |
| `ViolationDetected` | Compliance | Communications (alert HR/supervisor) |
| `ShiftEnded` | Field Operations | Workforce (surface timecard for review) |

All n8n workflows are exported to `tools/n8n/workflows/` and version-controlled. Run `python tools/n8n/export.py` after any UI change in the n8n editor.

---

## Bounded Contexts

### Domain Classification

| Classification | APT Domains |
|---|---|
| **Core** (competitive advantage, max investment) | Work Order Management, Field Operations, Compliance/PAGA |
| **Supporting** (necessary, do not over-engineer) | HR/Workforce, Lead Intake, Property Directory |
| **Generic** (use a vendor where possible) | Auth, Billing (QuickBooks), Communications transport |

### 1. Lead Intake

Converts inbound emails into qualified work order candidates. Two parse paths:
- **Free-text email** → Gemini `generateObject()` parse → confidence score → route to Needs Review or Ready to Schedule
- **Structured form** (Lapham) → `detectLaphamForm.ts` regex bypass → no Gemini call → direct to Ready to Schedule

Entry point: `Code.js:checkNewLeadEmails()` (GAS, 15-min trigger) → `POST /api/parse/` (Next.js + Gemini). Publishes `LeadParsed` → Work Order Management.

### 2. Work Order Management

The order book. Owns `work_orders`, `job_comments`, `job_performance_history`, `trade_duration_defaults`. Enforces the 8-state FSM (above). Auto-transitions fire server-side on ClockIn and AttestationSigned events from Field Operations.

### 3. Field Operations

The tech's mobile experience. Owns `shifts` (the PAGA unit of analysis — meal period rules apply at shift level, not per-job) and `time_records` (clock in/out pairs per job within a shift). Publishes `ClockIn`, `ClockOut`, `AttestationSigned`, `ShiftEnded`.

### 4. Communications

Three distinct services — do not conflate them:

| Service | Direction | Trigger | Channel | Storage |
|---|---|---|---|---|
| **A — Notification Engine** | Outbound only | Domain event (automated) | Email (GAS GmailApp), PWA Push | Stateless |
| **B — Conversation Threads** | Bidirectional | Human action | Email thread (GAS GmailApp) | `comms_messages` table (source of truth — not Gmail) |
| **C — Internal Coordination** | In-app only | Staff action | CC2.0 in-app | `job_comments` per job |

`comms_messages` is the source of truth for external communications. Gmail is transport. When a PM portal is built, every message is a SQL query — not a Gmail API call.

### 5. Workforce

Employee lifecycle. Owns `employees` (unified table — field techs and office staff share one record, role determines access), `push_subscriptions`, `time_off_requests`, `accrual_rules`.

CA compliance rules built in:
- Sick leave requests: auto-approve on submission (CA Labor Code §246.5 — denial is illegal)
- Vacation: manager approval required
- Accrual: calculated from `hire_date` + `accrual_rules` row matching tenure bracket

### 6. Compliance / PAGA (Core Domain)

Automated detection and immutable audit trail for CA labor law violations. Detection logic lives in `lib/compliance.ts`. Owns `compliance_alerts`.

Detection rules (CA-specific):
- Elapsed time > 5h without ≥30-min break → Missed 1st Meal Period → 1 hour premium
- Break taken but start > 5h after clock-in → Late 1st Meal Period → 1 hour premium
- Elapsed time > 10h without a second ≥30-min break → Missed/Short 2nd Meal Period → 1 hour premium
- Daily OT: > 8h = 1.5x, > 12h = 2x
- Weekly OT: > 40h = 1.5x

Attestation chain (PAGA shield):
```
Tech signs attestation → Field Supervisor approves timecard →
Record locks (immutable) → Compliance engine final check →
Premium amounts flow to Financial
```

### 7. Property / Client Directory

The center of gravity for all entities. Owns `organizations`, `properties` (with `address_key` dedup computed at write time by `normalizeAddressKey.ts`), `clients` (PM companies with `email_domains` for sender matching), `property_contacts`. All property lookups hit Neon — never Google Sheets.

### 8. Financial

Not yet built — placeholder tables only (`invoices`, `invoice_line_items`). Will consume `WorkOrderCompleted`, `PremiumOwed`, `TimecardApproved`, `ReceiptsApproved` events to generate invoices and QB export.

### 9. Intelligence / Analytics

Future domain. All current tables include `created_at`, `updated_at`, and FKs sufficient for aggregation. No data is discarded.

### Domain to Table Map

| Domain | Tables |
|---|---|
| Lead Intake | (no persistent tables — events only) |
| Work Order Management | `work_orders`, `job_comments`, `job_performance_history`, `trade_duration_defaults` |
| Field Operations | `shifts`, `time_records` |
| Communications | `comms_messages` |
| Workforce | `employees`, `push_subscriptions`, `time_off_requests`, `accrual_rules` |
| Compliance / PAGA | `compliance_alerts` |
| Property / Client | `organizations`, `properties`, `clients`, `property_contacts` |
| Financial | `invoices`, `invoice_line_items` (placeholder) |
| Infrastructure | `sentinel_log`, `dispatcher_feedback`, `gmail_sync_state` |

---

## Multi-Tenancy (ADR-005)

Every table has `org_id TEXT NOT NULL REFERENCES organizations(slug)`. No exceptions, including internal-only tables.

**Org hierarchy:**
```
HOLDING (portfolio oversight — central core)
    ├── APT-CA     (maintenance, CA — current proving ground)
    ├── APT-ID     (maintenance, ID — future, employee equity model)
    ├── LAPHAM     (PM client — Stage 1 portal)
    ├── PM-CO-N    (future PM clients)
    └── RE-ACQ     (real estate acquisition)
```

`organizations` table: `id`, `slug`, `name`, `parent_id` (self-referencing FK), `entity_type`. All operational queries filter by `org_id`. Portfolio-level cross-entity queries are explicitly gated to the `HOLDING` role. Cross-entity property handoffs (e.g., Acquisition → APT-CA) are deliberate events reviewed by the central core — entities do not share data laterally.

**Role levels:**

| Level | Scope | Access |
|---|---|---|
| Portfolio Admin | Cross-entity (HOLDING only) | Consolidated P&L, aggregate compliance, portfolio view |
| Entity Admin | Single entity (`org_id` scoped) | Full access within their entity only |
| Entity Staff | Single entity, role-gated | Dispatcher, tech, HR — scoped to their org + role |

---

## Key Abstractions

| Abstraction | Location | Purpose |
|---|---|---|
| `db` (Drizzle client) | `lib/db.ts` | Neon connection + schema-aware Drizzle instance |
| `schema` | `lib/schema.ts` | All table definitions — single source of truth for column types and FKs |
| DAL functions | `lib/dal/jobs.ts`, `dal/techs.ts`, `dal/time-records.ts` | Repository-pattern data access; isolated from route handlers |
| `job-transitions.ts` | `lib/job-transitions.ts` | FSM transition rules for the 8-state work order lifecycle |
| `compliance.ts` | `lib/compliance.ts` | CA meal period and OT violation detection logic |
| `normalizeAddressKey.ts` | `lib/normalizeAddressKey.ts` | Address normalization for property dedup at write time |
| `detectLaphamForm.ts` | `lib/detectLaphamForm.ts` | Structured form detection — bypasses Gemini parse |
| `fieldSchemas.ts` | `lib/fieldSchemas.ts` | Zod schemas for all field API inputs |
| `permissions.ts` | `lib/permissions.ts` | RBAC module flag checks for office staff |
| `rateLimit.ts` | `lib/rateLimit.ts` | Upstash Redis rate limiter for API routes |
| `RouteGuard.tsx` | `src/components/dashboard/` | Office route RBAC guard; explicitly bypasses tech PWA routes |

---

## GAS Migration Status (ADR-003)

GAS was the original backend. After Phase 3 cutover (2026-06-01), GAS is scoped exclusively to Google Workspace integration.

**GAS authorized for:**
- `GmailApp` — email polling (`checkNewLeadEmails`, 15-min trigger), send replies, fetch thread history
- `CalendarApp` — create/update/delete Google Calendar events
- Thin HTTP proxy calls to Next.js API routes

**GAS not authorized for:**
- Any new feature or business logic
- Primary data storage (Neon is the database)
- Any operation that can be implemented as a Next.js API route

**Three clasp projects:**

| Project | Directory | Deploy | Notes |
|---|---|---|---|
| Lead Parsing | `./` (root) | Manual only | `Code.js` has time-based email triggers. Never automate deploy. |
| Dashboard API | `dashboard-api/` | Manual only | `DashboardAPI.gs` CC2.0 bridge |
| Time Manager | — | Manual | AppSheet integration for time-off |

Phase 5 target: GAS becomes a ~200-line bridge touching only `GmailApp` and `CalendarApp`.

---

## Architecture Gradient

```
Phase 2 (past):
  Email → GAS → Google Sheets (source of truth) + Neon (shadow writes)
  Tech → TechPWA.gs → Sheets

Phase 3 (current — cutover 2026-06-01):
  Email → Code.js (Gmail trigger) → /api/parse → Neon work_orders (source of truth)
  Tech → Next.js API routes → Neon (shifts, time_records)
  n8n → reads Neon → writes Neon (compliance_alerts)
  CC2.0 → Next.js API routes → Neon (primary read)
  GAS → Gmail + Calendar bridge ONLY
  Sheets Dispatch Queue → read-only archive

Phase 4 (target):
  Full domain event topology via n8n
  Each bounded context owns its Neon tables
  Domains communicate through events — no cross-domain SQL JOINs in application code

Phase 5 (future — ~50+ PM clients):
  Property Registry as shared kernel across all ecosystem entities
  PM Portal: org_id-scoped reads from same Neon instance
  Acquisition CRM linked to Property Registry via address bridge
  Firebase migration evaluation if real-time multi-tenant requirements exceed Neon capability
```

---

## Key Constraints

- **Never mix auth hooks.** `useSession()` on a tech page = redirect loop. `getSession()` on an office page = redirect loop. See `src/lib/CLAUDE.md` and ADR-001.
- **All schema changes require a migration file.** Never use `drizzle-kit push` in production. Neon project has a 10-branch limit — delete stale branches before creating new ones.
- **No new GAS code.** New functionality lands in Next.js or n8n. GAS is migration-only territory.
- **`org_id` on every INSERT.** Missing it causes a NOT NULL constraint failure. Every SELECT must filter by `org_id` unless explicitly authorized as a Portfolio Admin cross-entity query.
- **n8n on Railway is a single point of failure.** If Railway is down, domain events are lost. Monitor actively; event bus failures are silent.
- **`WRITE_PATH_NEON_ONLY=true` is set in GAS Script Properties.** Sheets path is read-only archive. Do not reactivate Sheets writes.
- **`Code.js` must be deployed manually.** It has time-based Gmail triggers that would be disrupted by automated deploy.

---

## ADR Index

| ADR | Decision | Status |
|---|---|---|
| ADR-001 | Dual authentication architecture (Google OAuth + Badge/PIN) | Accepted |
| ADR-002 | Neon Postgres as primary database via Drizzle ORM | Accepted |
| ADR-003 | Google Apps Script as Google Workspace bridge only | Accepted |
| ADR-004 | Work order 8-state finite state machine (locked) | Accepted |
| ADR-005 | `org_id` multi-tenancy on every table | Accepted (non-negotiable) |
| ADR-006 | DAL pattern — Neon-First with Sheets fallback | Superseded — Neon-only post Phase 3 cutover |
| ADR-007 | n8n as event bus and workflow automation layer | Accepted |
| ADR-008 | Modular monolith over microservices | Accepted |

Full ADR text: `docs/adr/`

---

*Update this document when: a bounded context changes ownership, a new entity is added to the org hierarchy, the migration gradient advances, or a new ADR is accepted. See `docs/DOMAIN_ARCHITECTURE.md` for the full DDD analysis.*
