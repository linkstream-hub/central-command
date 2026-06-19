# DOMAIN ARCHITECTURE — APT ECOSYSTEM
# Systems analysis for the full platform — written as a professional dev/systems architect would approach it.
# This document answers: how does all of this fit together, and what decisions must be made correctly from the start?
# Last updated: 2026-05-22

---

## THE FRAMEWORK: DOMAIN-DRIVEN DESIGN (DDD)

The professional approach to a system this complex is **Domain-Driven Design (DDD)**. The core idea: break the platform into **bounded contexts** — each one a distinct business capability with its own data model, its own language, and its own rules. Crossing a boundary requires a deliberate interface, not a shared table.

This is why the early CC versions accumulated technical debt: everything was in one GAS monolith with one "God Sheet." Every feature touched every other feature. No boundary, no ownership, no ability to change one thing without breaking another.

DDD fixes this structurally, not just cosmetically.

---

## DOMAIN CLASSIFICATION

Not all domains are equal. A professional team classifies them:

| Classification | Definition | APT Examples |
|---|---|---|
| **Core Domain** | Where competitive advantage lives. Gets the most investment. Cannot be outsourced. | Work Order Management, Field Operations, Compliance/PAGA |
| **Supporting Domain** | Necessary but not differentiating. Build it, but don't over-engineer it. | HR/Workforce, Lead Intake, Property Directory |
| **Generic Domain** | Commodity. Use a vendor if you can. Only build if the vendor can't serve you. | Auth, Billing (QB), Communications (transport layer) |

**Why this classification matters:**

CA Labor Code compliance (PAGA) is a **Core Domain** for APT. Getting it wrong has direct legal liability. No off-the-shelf software handles it correctly. This is a genuine competitive differentiator — a platform that auto-calculates meal premiums and generates a complete audit trail is something APT can eventually sell to other CA contractors.

Work Order Management is a Core Domain because APT's WO lifecycle (dual-path intake, PTE coordination, tech scheduling, field execution, closeout) is operationally specific and deeply integrated with compliance. You cannot swap in ServiceTitan without rebuilding the compliance layer.

Billing is Generic — QuickBooks does it. The platform's job is to generate the invoice event; QB processes it.

---

## BOUNDED CONTEXTS — THE NINE DOMAINS

### 1. LEAD INTAKE (Parsing & Qualification)

**What it does:** Takes inbound signals — emails, future forms, future SMS — and produces qualified, enriched work order candidates ready for dispatch review.

**This domain owns:**
- Inbound signal log (every email that passes the spam filter)
- Parse results (address, category, contacts, priority signal, confidence score)
- Qualification state (is this schedulable? does it need PTE? do we know this property?)
- Duplicate detection

**The two intake paths:**
- **Free-text email** — Gemini parse → confidence score → route to Needs Review or Ready to Schedule
- **Structured form** (Lapham, future PM clients) — regex parse → high confidence → direct to Ready to Schedule. No Gemini call, no ambiguity.

**Publishes events:**
- `LeadParsed` → Work Order Management (create the WO)
- `UnknownPropertyDetected` → Property Directory (flag for review queue)
- `LowConfidenceParse` → alert to HR Admin (human review needed)

**Consumes:**
- Property Directory lookups (for address enrichment)

**Current implementation:** `Code.js` `checkNewLeadEmails()` + `parseWithGemini()`. Needs confidence scoring and structured form detection.

**Migration target:** `/api/parse-email` Next.js route with Vercel AI SDK `generateObject()` + Zod schema. Apps Script calls the route. Structured output guaranteed, malformed responses caught.

---

### 2. WORK ORDER MANAGEMENT

**What it does:** Manages the lifecycle of a job from creation through completion and archival. This is the order book of the business.

**This domain owns:**
- `work_orders` — the canonical job record
- `job_comments` — internal dispatch/tech/system notes
- `job_performance_history` — completed job data (feeds duration calibration)
- `trade_duration_defaults` — estimated hours config

**Status lifecycle (locked — do not change without architecture review):**
```
Needs Review → Ready to Schedule → PTE Required → Awaiting Approval → Scheduled → In Progress → Complete → Archived
```
Each transition has defined rules:
- `RtS → Scheduled`: auto when tech + date + time all present (server-side)
- `Scheduled → In Progress`: auto on first ClockIn event from Field Operations
- `In Progress → Complete`: auto on AttestationSigned event from Field Operations

**Publishes events:**
- `WorkOrderCreated` → Communications (send receipt to PM)
- `WorkOrderScheduled` → Communications (notify PM, tenant, tech)
- `WorkOrderCompleted` → Financial (trigger invoice), Compliance (check time records)
- `WorkOrderStatusChanged` → Communications (relevant stakeholders)

**Consumes:**
- `LeadParsed` from Lead Intake
- `ClockIn` from Field Operations (flip to In Progress)
- `AttestationSigned` from Field Operations (flip to Complete)

---

### 3. FIELD OPERATIONS

**What it does:** Everything that happens on the ground. The tech's mobile experience. This is where payroll, compliance, and billing data originates — every dollar of revenue and every PAGA exposure starts here.

**This domain owns:**
- `shifts` — a tech's work day (container for all clock events)
- `time_records` — clock-in/out pairs per job within a shift
- `job_photos` — before/after photo documentation
- `receipts` — material receipts per job
- GPS data, attestations

**The shift model:**
A shift is the top-level container. A tech starts a shift (goes to work), clocks in/out for specific jobs within that shift, takes meal breaks, and ends the shift. This structure is essential for PAGA compliance — meal period rules apply at the shift level, not the job level. A tech working two jobs in one shift has ONE meal period obligation for the total elapsed time.

**Publishes events:**
- `ShiftStarted`, `ShiftEnded`
- `ClockIn`, `ClockOut` → Work Order Management, Compliance
- `BreakStarted`, `BreakEnded` → Compliance
- `AttestationSigned` → Work Order Management, Compliance
- `JobCompleted` → Work Order Management

**Consumes:**
- `WorkOrderScheduled` from Work Order Management (loads job details on tech's device)

---

### 4. COMMUNICATIONS

**This is the most architecturally misunderstood domain in the system.** The user asked how it should be divided — this is the answer.

Communications is NOT a single thing. There are three distinct patterns with different owners, different lifecycles, and different technical implementations:

#### Pattern A: Transactional Notifications (automated, one-way, event-triggered)
- "Your work order was received."
- "Tech is scheduled for Thursday 9am at 123 Main St."
- "Job complete."
- "Meal period warning — tech Keith has been clocked in 4:45 with no break."
- "You have an unaccepted job assignment (2 hours)."

**Owner:** Notification Service — reads domain events, applies templates, fires delivery.
**Channels:** Email (GAS Gmail), Push (PWA), future SMS (OpenPhone).
**No human action required.** Fire and forget.

#### Pattern B: Operational Threads (bidirectional, job-linked, async)
- PM/Dispatcher email thread: "Need access code for Unit 4B" ↔ "Code is 1234"
- Tenant coordination: scheduling link, appointment confirmation
- PTE coordination: "Does the tenant need to be notified?" ↔ "Yes, contact Maria"

**Owner:** Communications domain — `comms_messages` table, linked to job by `job_id`.
**Source of truth:** Postgres (`comms_messages`), NOT Gmail inbox. Gmail is the transport.
**Why this matters:** When Lapham gets a read-only portal, every message about their properties is a SQL query — not a Gmail API call.

#### Pattern C: Internal Coordination (in-app, role-gated, synchronous for the user)
- Dispatcher notes on a job card
- Compliance flags to supervisor
- HR approval comments
- System alerts (duplicate detected, low confidence parse)

**Owner:** Each domain owns its own internal notes (`job_comments`, compliance notes, etc.).
**Channel:** CC2.0 in-app only. Not emailed. Not pushed.

#### Channel Map by Participant and Pattern

| Participant | Transactional | Operational (B) | Internal (C) |
|---|---|---|---|
| PM / Requestor | Email (GAS) | Email thread (GAS) | — |
| Tenant | Email + future SMS | Scheduling link email | — |
| Field Tech | PWA Push | In-app job details | — |
| Dispatcher | CC2.0 push + in-app | In-app comms tab | Job comments |
| HR / Compliance Staff | CC2.0 push + in-app | In-app | Internal notes |
| Supervisor | CC2.0 push + in-app | — | Timecard comments |

**The architectural rule:** Pattern A is owned by the triggering domain (Compliance fires the meal warning, Field Operations fires the ClockIn confirmation). The Notification Service is infrastructure, not a domain. Patterns B and C require human intent — they are NOT automated.

---

### 5. WORKFORCE

**What it does:** Employee lifecycle — hiring, skills, availability, time off, timecard approval. The system of record for who works here and what they're authorized to do.

**This domain owns:**
- `employees` — unified record for ALL staff (field techs + office staff)
- `push_subscriptions` — web push delivery endpoints
- `time_off_requests` — leave requests and approvals
- `accrual_rules` — leave accrual config per org

**The unified employee model:**
Field techs and office staff are in the same `employees` table. This is the correct design — a company has employees, not "techs" and "staff" as separate concepts. Role determines access. Employment type determines which fields are populated (badge/PIN for techs, email/module flags for office staff).

**CA compliance rules (non-negotiable — built into the system, not configurable):**
- Sick leave requests: auto-approve on submission (CA Labor Code §246.5 — denial is illegal)
- Vacation: manager approval required
- Accrual balance: calculated from `hire_date` + `accrual_rules` row matching tenure bracket

**Publishes events:**
- `EmployeeActivated` / `EmployeeDeactivated`
- `TimeOffApproved` → affects scheduling availability
- `TimecardApproved` → Financial (labor cost confirmed), Compliance (final check)

**Consumes:**
- `ShiftEnded` from Field Operations (surfaces timecard for review)

---

### 6. COMPLIANCE / PAGA

**This is a Core Domain. Treat it accordingly.**

CA Labor Code violations — specifically PAGA (Private Attorneys General Act) — represent the single largest financial exposure in this business. A single missed meal period = 1 hour premium. A class action PAGA claim on 5 techs over 12 months = potentially hundreds of thousands of dollars in penalties.

**The architectural principle:** Compliance must be fully automated and audit-trail-complete. No human discovers violations — the system detects them automatically, calculates the premium, records the exposure, and surfaces it for review. The human's job is to approve the resolution, not find the problem.

**This domain owns:**
- `compliance_alerts` — detected violations with premium amounts
- Compliance rules (meal period thresholds, OT thresholds — configured per state)
- Audit trail (immutable records once attestation is signed)

**Detection logic (CA-specific):**
- Elapsed time > 5 hours without a ≥30-min break → Missed 1st Meal Period → 1 hour premium at regular rate
- Break taken but start time > 5 hours after clock-in → Late 1st Meal Period → 1 hour premium
- Elapsed time > 10 hours without a second ≥30-min break → Missed/Short 2nd Meal Period → 1 hour premium
- 7th consecutive workday → requires different premium calculation
- Daily OT: > 8 hours = 1.5x, > 12 hours = 2x
- Weekly OT: > 40 hours = 1.5x

**The attestation chain (PAGA shield):**
```
Tech signs attestation (acknowledges shift record) →
Field Supervisor reviews + approves timecard →
Record locks (immutable after supervisor approval) →
Compliance engine makes final violation check →
Premium amounts flow to Financial
```

**Publishes events:**
- `ViolationDetected` → Communications (alert HR/supervisor)
- `PremiumOwed` → Financial (add to job cost, include in QB invoice)

**Consumes:**
- `AttestationSigned` from Field Operations (trigger evaluation)
- `TimecardApproved` from Workforce (final lock)

---

### 7. PROPERTY / CLIENT DIRECTORY

**This is the most important architectural decision in the entire ecosystem.**

The Property entity is the center of gravity for ALL four entities:
- In APT Maintenance: a property that has work orders
- In Property Management (Entity 3): a property in the managed portfolio
- In Real Estate Acquisition (Entity 4): a target property being analyzed
- In Development (Entity 5): a property being renovated

Every other domain references properties. Address normalization (`normalizeAddressKey`) must happen at write time — the dedup key is computed and stored, not computed on every read.

**This domain owns:**
- `organizations` — the root of the federated hierarchy (see Ecosystem section below)
- `properties` — one row per addressable unit, with `address_key` dedup
- `clients` — PM companies (Lapham, future clients), with `email_domains` for sender matching
- `property_contacts` — property managers, tenants, owners (external people, not employees)

**The `org_id` pattern scopes every row to a specific entity.** Each entity is its own org. Properties do NOT automatically appear in all entities — a property flows from Acquisition to Maintenance via a deliberate central-core handoff event. `org_id` scoping keeps entities fully isolated; the central holding org can query across all of them.

**Key operations:**
- Address normalization at write time (property becomes queryable immediately)
- New Contacts queue: unknown properties from Lead Intake stage here for human review, then promote
- Access code management: property-level codes stored here; job-specific access stored on work_orders

---

### 8. FINANCIAL

**Current state: NOT BUILT. Placeholder tables only.**

**What it will own:**
- `invoices`, `invoice_line_items`
- Job costing (labor + materials + premiums)
- QB integration (invoice generation on job complete)
- Payroll export (ADP integration)
- P&L per entity (essential for employee equity calculations)

**Consumes:**
- `WorkOrderCompleted` → generate invoice
- `PremiumOwed` from Compliance → add premium line item to invoice
- `TimecardApproved` from Workforce → labor cost confirmed, include in invoice
- `ReceiptsApproved` from Field Operations → materials cost confirmed

**Note on employee equity:** `org_id` on all financial records is not optional — it is the foundation for per-entity P&L, which is the foundation for profit sharing with equity employees (Idaho model). This is already in the schema.

---

### 9. INTELLIGENCE / ANALYTICS (future)

Not a Phase 3 concern, but the schema must support it from day one.

What this domain will own:
- Aggregated tech performance (jobs completed, hours, skill vs. category match rate)
- Property maintenance patterns (this address has had 8 plumbing calls in 24 months)
- PM client health (response time, job completion rate, billing status)
- Business intelligence (revenue per tech, cost per category, margin by PM client)

**What this means for current schema design:** Every operational table needs `created_at`, `updated_at`, and sufficient FKs to support aggregation. No data thrown away. Historical records are assets.

---

## THE EVENT TOPOLOGY

How domains communicate without coupling each other:

```
[Lead Intake] ──LeadParsed──────────────────────► [Work Order Mgmt]
                                                          │
                    ┌─────────────────────────────────────┤
                    │ WorkOrderScheduled                   │ WorkOrderCompleted
                    ▼                                      ▼
            [Communications]                        [Financial]    [Compliance]
                    ▲                                               ▲
                    │ ViolationDetected                             │
                    │                                               │
            [Compliance] ◄──AttestationSigned──── [Field Operations]
                                                          │
                                                    ClockIn/Out
                                                          │
                                                          ▼
                                                 [Work Order Mgmt]
                                                 (flip to In Progress)
```

**The rule:** Domain A does not query Domain B's tables. Domain A publishes an event. Domain B subscribes. Each domain owns its data. No cross-domain JOIN in application code.

This is enforced by code convention, not separate databases. The benefit: you can split any domain into a separate service later without changing the rest of the system.

**Current implementation of events:** n8n as the event bus. Webhook fires on clock events → n8n routes to compliance check. This pattern extends to every other domain event.

---

## THE ECOSYSTEM — FEDERATED HOLDING MODEL

### The Business Model

Each entity is an **independent profit center** — it operates on its own, generates its own revenue, and has its own management team. They are NOT divisions of a single business; they are separate businesses that share infrastructure and a central oversight core.

This is the portfolio/holding company model (Berkshire Hathaway, not GE). The value compounds when entities work together, but **no entity is dependent on another entity to be profitable**. APT CA runs without Idaho. Acquisition runs without APT CA. The connections create upside optionality, not fragility.

**Why this matters architecturally:** Infrastructure is shared (the platform, Vercel, Railway, Neon). Operational data is isolated by entity. The central holding core can see across all entities for portfolio oversight. Entity-level management sees only their entity.

### The Org Hierarchy

```
HOLDING (central core — portfolio oversight)
    ├── APT-CA     (maintenance, California — proving ground)
    ├── APT-ID     (maintenance, Idaho — equity model, lower regulation)
    ├── LAPHAM     (PM client — Stage 1 portal, future full PM pack)
    ├── PM-CO-2    (future PM client #2)
    └── RE-ACQ     (real estate acquisition — tax search + CRM)
```

The `organizations` table implements this directly:

```sql
organizations
  id          UUID PK
  slug        TEXT UNIQUE NOT NULL    -- 'HOLDING', 'APT-CA', 'APT-ID', 'RE-ACQ'
  name        TEXT NOT NULL
  parent_id   UUID FK→organizations NULL   -- NULL = root/holding; all entities point to holding
  entity_type TEXT NOT NULL           -- 'holding', 'maintenance', 'pm_client', 'acquisition', 'development'
  created_at  TIMESTAMPTZ NOT NULL default now()
```

### Role Hierarchy

| Role Level | Scope | What They See |
|---|---|---|
| **Portfolio Admin** | Cross-entity — reads all orgs | Consolidated P&L, aggregate compliance exposure, portfolio view across all entities. Central core only. |
| **Entity Admin** | Single entity (`org_id` scoped) | Full access within their entity. Cannot see other entities' operational data. |
| **Entity Staff** | Single entity, role-gated | Dispatcher, tech, HR — same as today. Scoped to their org + role. |

### The Four Entities

| Entity | Org Slug | Platform | Independent Revenue Source |
|---|---|---|---|
| APT CA | `APT-CA` | CC2.0 (this system) | Maintenance contracts. CA compliance-native. Proving ground. |
| APT Idaho | `APT-ID` | Fork of CC2.0 | Same model, lower overhead. Employee equity structure. |
| PM SaaS | `LAPHAM`, `PM-CO-N` | CC2.0 PM Portal | Per-property SaaS fee. Lapham is Stage 1. |
| Real Estate Acq | `RE-ACQ` | Tax Search + CRM | Deal margins. Feeds properties to maintenance entities. |

### Cross-Entity Data Flow (Deliberate Handoffs Only)

Entities do NOT share data laterally. A property in the Acquisition entity is NOT automatically visible in the APT CA entity. Cross-entity flows are deliberate events reviewed by the central core:

```
RE-ACQ flags property as acquired
    → Central core reviews
    → Approves registration in target entity (APT-CA or APT-ID)
    → PropertyRegistered event fires
    → New property row created in target entity's org context
    → Maintenance entity can now receive work orders for that address
```

This keeps entities genuinely independent while still allowing the portfolio-level compounding.

### The SaaS Angle

The PM SaaS entity (Entity 3) is the platform's external revenue channel. Once Lapham is live at Stage 3:
- CA compliance-native scheduling platform
- ServiceTitan doesn't handle CA labor law at this specificity
- Jobber doesn't handle PAGA premium auto-calculation
- Each PM company that signs up becomes its own org under the HOLDING hierarchy

**Revenue model options (to be decided — not built yet):**
- Per-property monthly SaaS fee
- Per-vendor seat fee
- Platform fee on invoice flow

---

## ARCHITECTURE GRADIENT

Where the system is → where it goes → final target.

### Now (end of Phase 2)
```
Email → GAS Code.js → Google Sheets (source of truth for everything)
                     → Neon (shadow writes: comms, jobs, time_records)
Tech → TechPWA.gs → Google Sheets
n8n → reads Sheets → writes ComplianceAlerts sheet
CC2.0 → DashboardAPI.gs → Google Sheets (primary) + Neon (partial)
```
**Problem:** GAS is the brain and Sheets is the database. No bounded contexts. Everything coupled. Compliance is bolted on, not built in.

### Phase 3 Target (the rebuild we're starting)
```
Email → Code.js (Gmail trigger stays GAS) → /api/parse-email (Next.js + Gemini)
                                           → Neon work_orders (source of truth)
Tech → Next.js API routes → Neon (time_records, shifts)
n8n → reads Neon → writes Neon (ComplianceAlerts)
CC2.0 → Next.js API routes → Neon (primary read)
GAS → Gmail + Calendar bridge ONLY
```
**Source of truth: Neon.** GAS becomes a thin Google Workspace integration layer.

### Phase 4 Target (event-driven)
```
Domain events via n8n (event bus)
Each domain context owns its tables in Neon
Domains communicate through events, not direct table joins in application code
```

### Phase 5 Target (ecosystem ready)
```
Property Registry as shared kernel across all four entities
PM Portal reads from same Neon instance, org_id scoped
Acquisition CRM links to Property Registry via address bridge
Idaho entity on same stack, different org_id, Idaho compliance ruleset
Firebase migration when PM SaaS hits 10+ client orgs (real-time requirements)
```

---

## THE MODULAR MONOLITH PATTERN

**Do NOT jump to microservices.** The correct progression is:

1. **Monolith (where we are):** Everything in GAS/Sheets. No boundaries.
2. **Modular Monolith (Phase 3 target):** Everything in Next.js + Neon, but each domain is a distinct module with clear code boundaries. Internal communication is function calls. External communication (to n8n, GAS) is events/webhooks.
3. **Microservices (Phase 5+, only if needed):** Split individual domains into separate services when they have genuinely different scaling needs or deployment cadences. Only do this when a monolith boundary is genuinely painful — not preemptively.

**Why modular monolith first:** You get 90% of the architectural benefit of microservices (clear domain ownership, independent changeability, defined interfaces) with 10% of the operational complexity (no service discovery, no distributed tracing, no network latency between domains, one deployment).

The APT system will never need microservices unless the PM SaaS gets to 50+ clients. Build the modular monolith correctly and you can split it later without rewriting.

---

## THE COMMUNICATIONS ARCHITECTURE (EXPANDED)

The user's specific question: "communications — whether coordination with requestor/tenant/tech/staff — not sure how this can/should be divided/handled."

**The professional answer:**

Break it into three services with completely different designs:

### Service A: Notification Engine
- **Trigger:** Domain events (WorkOrderScheduled, ViolationDetected, ShiftAssigned)
- **Direction:** Outbound only
- **Latency:** Near real-time (fire within seconds of event)
- **State:** Stateless — no conversation history
- **Channels:** Email (GAS GmailApp), PWA Push (web-push-notifications), future SMS (OpenPhone webhook)
- **Owner:** Each domain publishes the event; a central notification service handles delivery
- **Implementation:** n8n workflow per notification type. Template per event type. No custom code per notification.

### Service B: Conversation Threads
- **Trigger:** Human action (dispatcher replies to PM, PM replies to tenant direction email)
- **Direction:** Bidirectional — external parties can reply
- **Latency:** Async (email threads, not instant messaging)
- **State:** Full thread history in `comms_messages`, linked to `work_order_id`
- **Channels:** Email (primary, GAS GmailApp), future SMS (OpenPhone)
- **Owner:** Communications domain (comms_messages table)
- **Read surface:** Job modal comms tab in CC2.0 — reads from Postgres, not Gmail API
- **Write surface:** Dispatcher sends from CC2.0 → GAS → Gmail → comms_messages

### Service C: Internal Coordination
- **Trigger:** Staff action (dispatcher adds note, compliance flags supervisor, HR adds approval comment)
- **Direction:** Internal only — no external party sees this
- **Latency:** Synchronous from the user's perspective (they see it immediately)
- **State:** `job_comments` table (or entity-specific comments tables)
- **Channels:** CC2.0 in-app only
- **Owner:** Each domain owns its own comment/note concept

**The separation that matters most:** Service A (notifications) must NEVER require a human decision. If it does, it's actually Service B. Service B (threads) must NEVER be used for automated messages — that's Service A. Mixing them creates a system where automated noise drowns out real PM communication.

---

## WHAT THIS MEANS FOR THE SCHEMA (connection back to Phase 3 design)

The schema design produced in this session maps directly to this architecture:

| Domain | Tables |
|---|---|
| Lead Intake | (no persistent tables — events only) |
| Work Order Management | `work_orders`, `job_comments`, `job_performance_history`, `trade_duration_defaults` |
| Field Operations | `shifts`, `time_records` (+ future: `job_photos`, `receipts`) |
| Communications | `comms_messages` (Service B threads) |
| Workforce | `employees`, `push_subscriptions`, `time_off_requests`, `accrual_rules` |
| Compliance / PAGA | `compliance_alerts` |
| Property / Client | `organizations`, `properties`, `clients`, `property_contacts` |
| Financial | `invoices`, `invoice_line_items` (placeholder) |
| Infrastructure | `sentinel_log`, `dispatcher_feedback`, `gmail_sync_state` |

**Every table has `org_id`.** This is the single most important architectural decision in the schema. It enables:
- Multi-tenant SaaS (PM clients, Idaho entity) with zero schema changes
- Per-entity P&L for employee equity
- Property Registry shared kernel across the four ecosystem entities
- Row-level access control when Firebase migration happens

---

## DECISIONS LOCKED BY THIS ARCHITECTURE

These decisions should not be relitigated sprint by sprint:

1. **`employees` is a unified table** — one record per person, role-gated access. Not separate `techs` and `staff` tables.

2. **`work_orders` replaces `jobs`** — same data, proper structure. Migration via `legacy_lead_id` FK during transition.

3. **`shifts` is the PAGA unit of analysis** — meal period rules apply to elapsed shift time, not per-job elapsed time. The shift container is non-negotiable for correct compliance calculation.

4. **Properties are first-class entities** — `properties` table with `address_key` dedup is the master record. Not a lookup. Address normalization runs at write time.

5. **`comms_messages` is the source of truth for external communication** — not Gmail. Gmail is transport. SQL is the query layer.

6. **GAS is a Google Workspace bridge** — after Phase 3, GAS touches: GmailApp (send/receive), Calendar (create/update/delete events), and nothing else. It is not a backend.

7. **`org_id` on every table, no exceptions** — even internal-only tables. The cost of adding it later is 10x the cost of adding it now.

---

## OPEN QUESTIONS (to be decided before Phase 3 migration code is written)

1. **`shifts` — does this match how you think about the data?** A shift is a tech's work day. Time records are clock events within a shift. This is a new concept not in the current system but required for correct PAGA compliance.

2. **`employees` unified or split?** Field techs and office staff in one table. Recommended: unified. Alternative: separate. Decision should be made before `techs` table migration.

3. **`work_orders` migration approach?** Option A: ADD `work_orders` alongside existing `jobs` table, migrate data, remove `jobs` in same sprint. Option B: ALTER `jobs` table in place (add `org_id`, rename). Option A is cleaner but requires more migration code.

4. **Event bus tooling?** n8n is current event bus (used for compliance webhook). Extend n8n to handle all domain events (WorkOrderCompleted → Financial, WorkOrderScheduled → Notifications), or use a different pattern for non-compliance events?

5. **`property_contacts` vs. embedded tenant fields?** Tenant name/phone/email are currently embedded on the job card. Schema keeps them denormalized on `work_orders` for simplicity. `property_contacts` is for repeat contacts (known PMs, tenants who call regularly). Confirm this split is correct.

---

*Architecture documents rot faster than code if not maintained. Update this document when bounded context ownership changes, when a new entity is added, or when a domain classification changes.*
