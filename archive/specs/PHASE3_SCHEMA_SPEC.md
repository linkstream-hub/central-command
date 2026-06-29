# PHASE 3 — NEON SCHEMA DESIGN
# Complete multi-tenant schema for all six domains.
# This is the foundation document — nothing gets built until this is reviewed and approved.
# Sprint P3-1 implements this schema in Drizzle. Sprints P3-2 through P3-5 migrate and rebuild on top of it.
# Last updated: 2026-05-25 (Session 97 cont.) — design decisions locked

## LOCKED DESIGN DECISIONS (2026-05-25)

1. **Unified `employees` table** — replaces both `techs` (existing) and the planned `staff` table.
   One record per person. Role determines access. Skills and module permission columns are nullable —
   non-null per role type. This is the correct long-term architecture. System is dormant — clean migration now.

2. **`shifts` table confirmed** — Required for correct CA PAGA compliance. Meal period rules apply to
   elapsed shift time (total time worked that day), not per-job elapsed time. The shift is the unit of
   analysis for all compliance calculations.

3. **`breaks` as separate table** — Multi-break support per CA law. One row per break event.
   Legacy `break_start`, `break_end`, `break_minutes` columns on `time_records` kept during migration
   period, removed when P3-4 cutover completes.

4. **`attestations` as separate table** — Immutable audit trail. IP address + user agent logged.
   PAGA defense requires records that cannot be edited after the fact. Separate table enforces this.

---

## GROUND RULES

- Every table gets `org_id text NOT NULL`. Default value for all data: `'APT-CA'`.
- `entity_id` → `org_id` rename on all existing tables (breaking migration — acceptable, system is dormant).
- Foreign keys use `integer` references to `id` serial PKs. Business keys (job_id, record_id, etc.) remain text for cross-system compatibility during migration.
- `org_id` is not a FK to `orgs.org_id` at the DB layer (Neon/Drizzle doesn't enforce text FK well). It is enforced at the application layer.
- All timestamps are `timestamp` (UTC). Application converts to `America/Los_Angeles` for display.
- Drizzle schema file: `tech-pwa/src/lib/schema.ts`. Migration dir: `tech-pwa/drizzle/`.

---

## EXISTING TABLES — CHANGES ONLY

These tables exist in Neon. P3-1 adds `org_id`, removes `entity_id`, and adds FK columns where noted.

### `comms_messages` — ADD `org_id`
- Add: `org_id text NOT NULL DEFAULT 'APT-CA'`
- Note: `comms_messages` has no `entity_id` column in the current Drizzle schema — no rename needed, just add `org_id`.

### `techs` — MIGRATE TO `employees`, THEN DROP
- P3-1: Create `employees` table (see Workforce section below)
- P3-1: INSERT all rows from `techs` into `employees` (role = 'tech', map all columns)
- P3-1: DROP `techs` table
- All FK references to `techs.id` become `employees.id` in the same migration

### `jobs` — ADD `org_id`, ADD `employee_id`, ADD `property_id`
- Add: `org_id text NOT NULL DEFAULT 'APT-CA'`
- Add: `employee_id integer` (nullable FK → employees.id — populated by P3-3 migration)
- Add: `property_id integer` (nullable FK → properties.id — populated by P3-3 migration)
- Keep: `tech text` (legacy field, kept until P3-5 when TechPWA.gs is decommissioned)
- Remove: `entity_id`

### `time_records` — ADD `org_id`, ADD `shift_id`, ADD `employee_id`
- Add: `org_id text NOT NULL DEFAULT 'APT-CA'`
- Add: `shift_id integer` (nullable FK → shifts.id — populated by P3-2 migration)
- Add: `employee_id integer` (nullable FK → employees.id — populated by P3-2 migration)
- Keep: `break_start`, `break_end`, `break_minutes` (legacy fields — kept until P3-4 cutover to `breaks` table)
- Remove: `entity_id`

### `job_comments` — ADD `org_id`
- Add: `org_id text NOT NULL DEFAULT 'APT-CA'`
- Remove: `entity_id`

### `compliance_alerts` — ADD `org_id`, ADD `employee_id`
- Add: `org_id text NOT NULL DEFAULT 'APT-CA'`
- Add: `employee_id integer` (nullable FK → employees.id — populated by P3-4 migration)
- Remove: implied entity link (none currently)

---

## NEW TABLES BY DOMAIN

---

### INFRASTRUCTURE

#### `orgs` — Federated entity registry
```
id:          serial PK
org_id:      text UNIQUE NOT NULL    -- 'HOLDING', 'APT-CA', 'APT-ID', 'RE-ACQ', 'LAPHAM', etc.
parent_org_id: text                  -- NULL = root/holding; all entity rows point to 'HOLDING'
entity_type: text NOT NULL DEFAULT 'maintenance'  -- 'holding' | 'maintenance' | 'pm_client' | 'acquisition' | 'development'
name:        text NOT NULL           -- 'APT Maintenance Inc. — California'
timezone:    text NOT NULL DEFAULT 'America/Los_Angeles'
is_active:   boolean DEFAULT true
created_at:  timestamp DEFAULT now()
```
**Seed on creation (in order):**
1. `('HOLDING', NULL, 'holding', 'APT Holdings', 'America/Los_Angeles', true)`
2. `('APT-CA', 'HOLDING', 'maintenance', 'APT Maintenance Inc. — California', 'America/Los_Angeles', true)`

**Why the hierarchy:** Each entity is an independent profit center with its own management and P&L. The HOLDING org is the central core with portfolio-wide visibility. Entity-level staff see only their org_id. Portfolio Admin roles (central core) can query across all entities by parent_org_id. Cross-entity data flows (e.g., acquisition property → maintenance entity) are deliberate handoffs routed through central, not automatic lateral sharing.

#### `sentinel_log` — Railway Sentinel write-back (replaces Sheets tab)
```
id:              serial PK
org_id:          text NOT NULL
sentinel_name:   text NOT NULL     -- 'health', 'time-anomaly', 'wc-scanner', 'stale-job', 'spec-architect'
event_type:      text NOT NULL
payload:         text              -- JSON blob
severity:        text DEFAULT 'info'  -- 'info' | 'warning' | 'critical'
resolved_at:     timestamp
created_at:      timestamp DEFAULT now()
```

---

### DOMAIN 6: PROPERTY / CLIENT

#### `clients` — PM companies and property owners
```
id:              serial PK
org_id:          text NOT NULL
name:            text NOT NULL           -- 'Lapham', 'Private Owner', etc.
type:            text NOT NULL           -- 'pm_company' | 'private_owner' | 'commercial'
contact_name:    text
contact_email:   text
contact_phone:   text
notes:           text
is_active:       boolean DEFAULT true
created_at:      timestamp DEFAULT now()
```

#### `properties` — Verified property database (replaces Master Directory Sheets tab)
```
id:              serial PK
org_id:          text NOT NULL
client_id:       integer              -- FK → clients.id (nullable — some properties have no PM company)
address:         text NOT NULL        -- Sanitized, no ## prefix
unit:            text                 -- Null for single-unit properties
address_key:     text NOT NULL        -- normalizeAddressKey(address, unit) output — dedup key
city:            text DEFAULT 'Oakland'
state:           text DEFAULT 'CA'
zip:             text
property_type:   text DEFAULT 'residential'  -- 'residential' | 'commercial' | 'industrial'
rm_name:         text                 -- Property manager name (denormalized from clients for speed)
rm_email:        text                 -- Property manager email
access_info:     text                 -- Lockbox codes, building access, gate codes
notes:           text
is_active:       boolean DEFAULT true
created_at:      timestamp DEFAULT now()
UNIQUE(org_id, address_key)
```
**Note:** `address_key` = output of `normalizeAddressKey(address, unit)` from Code.js. Same normalization function must be used on write to avoid phantom duplicates.

#### `tenant_contacts` — Tenant info per property
```
id:              serial PK
org_id:          text NOT NULL
property_id:     integer NOT NULL     -- FK → properties.id
name:            text
phone:           text
email:           text
pref_contact:    text DEFAULT 'email'  -- 'email' | 'phone' | 'text'
has_pets:        boolean DEFAULT false
notes:           text
is_active:       boolean DEFAULT true
created_at:      timestamp DEFAULT now()
```
**Note:** Multiple tenants can exist per property (multi-unit or turnover history). Use `is_active = true` for current tenant.

#### `new_contact_queue` — Staging queue (replaces New Contacts Sheets tab)
```
id:              serial PK
org_id:          text NOT NULL
source_lead_id:  text                 -- Lead ID from email parse
address:         text
unit:            text
client_name:     text
manager_name:    text
manager_email:   text
access_info:     text
notes:           text
sender_email:    text
gmail_msg_id:    text
status:          text DEFAULT 'Pending Review'  -- 'Pending Review' | 'Added' | 'Verify & Update'
reviewed_by:     text                 -- Staff email
reviewed_at:     timestamp
created_at:      timestamp DEFAULT now()
```

---

### DOMAIN 3: WORKFORCE

#### `employees` — Unified people table (replaces `techs` Neon table + Staff Roster Sheets tab)
```
id:               serial PK
org_id:           text NOT NULL

-- Identity
badge:            text                 -- field techs only; unique per org (partial index)
email:            text                 -- office staff; unique per org (partial index); nullable for techs
name:             text NOT NULL
phone:            text
rank:             text                 -- tech skill rank (used by SuggestTechs scoring)

-- Role & Access
role:             text NOT NULL        -- 'tech' | 'dispatcher' | 'hr_admin' | 'finance_admin'
                                       -- | 'org_admin' | 'intel' | 'field_supervisor'
employment_type:  text DEFAULT 'hourly'  -- 'hourly' | 'salary' | 'contractor'
is_active:        boolean DEFAULT true

-- Compensation
hourly_rate:      real
hire_date:        text                 -- 'YYYY-MM-DD'

-- Auth — field techs (badge+PIN via Tech PWA)
pin_hash:         text                 -- SHA-256, techs only
session_token:    text                 -- current active PWA session token
token_expiry:     timestamp

-- Auth — office staff (Google OAuth via next-auth, not stored here; last_login tracked)
last_login_at:    timestamp

-- Module permissions — office staff (false for field techs)
perm_admin:       boolean DEFAULT false
perm_dispatch:    boolean DEFAULT false
perm_people:      boolean DEFAULT false
perm_finance:     boolean DEFAULT false
perm_intel:       boolean DEFAULT false

-- Skills — field techs (0 for office staff)
skill_carpentry:  real DEFAULT 0
skill_plumbing:   real DEFAULT 0
skill_electrical: real DEFAULT 0
skill_finish_carp: real DEFAULT 0
skill_structural: real DEFAULT 0
skill_landscaping: real DEFAULT 0
skill_janitorial: real DEFAULT 0

created_at:       timestamp DEFAULT now()
updated_at:       timestamp DEFAULT now()
```
**Partial unique indexes (Drizzle `index().where()`):**
- `(org_id, badge)` WHERE `badge IS NOT NULL` — no two techs in same org share a badge
- `(org_id, email)` WHERE `email IS NOT NULL` — no two staff in same org share an email

**Migration source:** `techs` table in Neon → INSERT into `employees` (role='tech'). Staff Roster Google Sheet → INSERT into `employees` (role per sheet column) during P3-4. `techs` table dropped after migration.

**Note on push subscriptions:** `techs.push_sub` (JSON blob) moves to the `push_subscriptions` table below.

#### `push_subscriptions` — Web push delivery endpoints (split from techs.push_sub JSON blob)
```
id:              serial PK
org_id:          text NOT NULL
employee_id:     integer NOT NULL     -- FK → employees.id
endpoint:        text NOT NULL
p256dh:          text NOT NULL
auth_key:        text NOT NULL
user_agent:      text
created_at:      timestamp DEFAULT now()
updated_at:      timestamp DEFAULT now()
UNIQUE(employee_id, endpoint)
```
**Note:** Separating this from the employee record allows multiple devices per person and clean subscription lifecycle management (create on register, delete on unsubscribe).

#### `time_off_requests` — Replaces AppSheet TOM TimeOffRequests tab
```
id:              serial PK
org_id:          text NOT NULL
employee_id:     integer NOT NULL     -- FK → employees.id
request_date:    text NOT NULL        -- 'YYYY-MM-DD' first day of leave
return_date:     text NOT NULL        -- 'YYYY-MM-DD' return to work date
leave_type:      text NOT NULL        -- 'vacation' | 'sick' | 'personal' | 'other'
notes:           text
status:          text DEFAULT 'Pending'  -- 'Pending' | 'Approved' | 'Denied'
reviewed_by:     integer              -- FK → employees.id (the approver)
reviewed_at:     timestamp
created_at:      timestamp DEFAULT now()
```
**CA compliance enforced in application layer:** sick leave requests auto-approve on submission (CA Labor Code §246.5 — denial is illegal). Vacation requires manager approval. Never enforce these rules in DB constraints — enforcement logic can change; constraints cannot.

#### `accrual_rules` — PTO accrual config (replaces AppSheet TOM AccrualRules tab)
```
id:              serial PK
org_id:          text NOT NULL
rule_name:       text NOT NULL        -- 'Standard Full Time', etc.
accrual_rate:    real NOT NULL        -- Hours per pay period
max_accrual:     real                 -- Cap on total accrued hours
applies_to:      text DEFAULT 'all'   -- 'all' | 'full_time' | 'part_time'
is_active:       boolean DEFAULT true
created_at:      timestamp DEFAULT now()
```

---

### DOMAIN 2: FIELD OPERATIONS

#### `shifts` — Shift-level tracking (new — not in existing Sheets or Neon)
```
id:                  serial PK
org_id:              text NOT NULL
shift_id:            text UNIQUE NOT NULL  -- UUID, matches GAS localStorage shift session reference
employee_id:         integer NOT NULL      -- FK → employees.id
shift_date:          text NOT NULL         -- 'YYYY-MM-DD'
shift_start:         timestamp NOT NULL
shift_end:           timestamp
total_break_minutes: integer DEFAULT 0
actual_hours:        real
status:              text DEFAULT 'Active'  -- 'Active' | 'Complete' | 'Attested'
created_at:          timestamp DEFAULT now()
```
**Why shifts exist:** A shift is a tech's full work day. One shift → many time_records (one per job). CA meal period rules evaluate against elapsed shift time, not per-job time. A tech working two 3-hour jobs back-to-back has been on-shift 6+ hours — that's a meal period obligation. Without the shift container, that calculation is impossible. The shift is the unit of PAGA analysis.

#### `breaks` — Multi-break support (CA law requires tracking all breaks)
```
id:              serial PK
org_id:          text NOT NULL
time_record_id:  text NOT NULL         -- FK ref to time_records.record_id (text key for cross-system compat)
break_number:    integer NOT NULL      -- 1, 2, 3... (ordered)
break_start:     timestamp NOT NULL
break_end:       timestamp
break_minutes:   integer
break_type:      text DEFAULT 'meal'   -- 'meal' | 'rest' | 'other'
created_at:      timestamp DEFAULT now()
```
**Note:** `time_records.break_start`, `break_end`, `break_minutes` columns are kept as legacy fields until P3-2 migration completes. New records after P3-4 write to `breaks` table only.

#### `inventory_items` — Wholesale materials tracking (replaces Inventory sheet)
```
id:              serial PK
org_id:          text NOT NULL
item_id:         text UNIQUE NOT NULL  -- Internal identifier from Inventory sheet
name:            text NOT NULL
sku:             text
barcode:         text
location_bin:    text                  -- Storage location
cost:            real                  -- Wholesale/purchase cost
price:           real                  -- Billing/markup price
reorder_point:   real DEFAULT 0
current_stock:   real DEFAULT 0
unit_of_measure: text DEFAULT 'each'   -- 'each', 'lbs', 'sqft', etc.
is_active:       boolean DEFAULT true
created_at:      timestamp DEFAULT now()
updated_at:      timestamp DEFAULT now()
```

#### `inventory_transactions` — Replaces Transaction Logs sheet
```
id:                serial PK
org_id:            text NOT NULL
item_id:           integer NOT NULL   -- FK → inventory_items.id
job_id:            text               -- FK ref to jobs.job_id (nullable — restocks not tied to a job)
employee_id:       integer            -- FK → employees.id (nullable — restocks by supplier)
transaction_type:  text NOT NULL      -- 'check_out' | 'return' | 'restock' | 'adjustment'
quantity:          real NOT NULL
notes:             text
transacted_at:     timestamp DEFAULT now()
created_at:        timestamp DEFAULT now()
```

---

### DOMAIN 4: COMPLIANCE / PAGA

#### `attestations` — Separate attestation audit trail (replaces embedded fields in time_records)
```
id:               serial PK
org_id:           text NOT NULL
shift_id:         integer NOT NULL   -- FK → shifts.id
employee_id:      integer NOT NULL   -- FK → employees.id
shift_date:       text NOT NULL      -- 'YYYY-MM-DD'
attestation_text: text NOT NULL      -- Full CA-compliant attestation language shown to tech
signed_at:        timestamp NOT NULL
meal_compliant:   boolean NOT NULL   -- true = no meal period violations
rest_compliant:   boolean NOT NULL   -- true = no rest break violations
overtime_hours:   real DEFAULT 0     -- Hours over 8/day or 40/week flagged
ip_address:       text               -- Audit trail
user_agent:       text               -- Audit trail
created_at:       timestamp DEFAULT now()
UNIQUE(shift_id)
```
**Note:** `time_records.attestation` and `attestation_at` are kept for legacy compat during migration. New attestations after P3-4 write to this table only.

---

### DOMAIN 1: WORK ORDER MANAGEMENT

#### `job_performance_history` — Replaces Job Performance History Sheets tab
```
id:              serial PK
org_id:          text NOT NULL
job_id:          text NOT NULL        -- FK ref to jobs.job_id
employee_id:     integer              -- FK → employees.id (nullable — old records may not match)
tech_name:       text                 -- Denormalized for query speed
category:        text
address:         text
unit:            text
est_hours:       real
actual_hours:    real
completed_at:    timestamp
created_at:      timestamp DEFAULT now()
```

#### `historical_assignments` — Tech scoring history (replaces Historical Assignments Sheets tab)
```
id:              serial PK
org_id:          text NOT NULL
job_id:          text
employee_id:     integer              -- FK → employees.id (nullable — old records)
tech_name:       text
address:         text
unit:            text
category:        text
scheduled_date:  text                 -- 'YYYY-MM-DD'
status:          text
actual_hours:    real
created_at:      timestamp DEFAULT now()
```

#### `dispatcher_feedback` — Replaces Dispatcher Feedback Sheets tab
```
id:              serial PK
org_id:          text NOT NULL
job_id:          text NOT NULL
employee_id:     integer              -- FK → employees.id (nullable)
feedback_type:   text
content:         text NOT NULL
submitted_by:    text                 -- Staff email
created_at:      timestamp DEFAULT now()
```

#### `trade_duration_defaults` — Replaces Trade Duration Defaults Sheets tab
```
id:              serial PK
org_id:          text NOT NULL
category:        text NOT NULL        -- Service category (Plumbing, Electrical, etc.)
default_hours:   real NOT NULL
sample_count:    integer DEFAULT 0    -- Number of completed jobs used in calibration
last_calibrated_at: timestamp
created_at:      timestamp DEFAULT now()
UNIQUE(org_id, category)
```

---

### DOMAIN 5: FINANCIAL (placeholders — not operational yet)

#### `job_costs` — Job costing line items
```
id:               serial PK
org_id:           text NOT NULL
job_id:           text NOT NULL       -- FK ref to jobs.job_id
cost_type:        text NOT NULL       -- 'labor' | 'materials' | 'overhead' | 'premium'
description:      text
amount:           real NOT NULL
employee_id:      integer             -- FK → employees.id (nullable — overhead costs)
time_record_id:   text               -- FK ref to time_records.record_id (nullable — for labor costs)
created_at:       timestamp DEFAULT now()
```

#### `invoices` — Billing placeholder
```
id:               serial PK
org_id:           text NOT NULL
invoice_number:   text UNIQUE NOT NULL
job_id:           text               -- FK ref to jobs.job_id (nullable — consolidated invoices)
client_id:        integer            -- FK → clients.id
status:           text DEFAULT 'Draft'  -- 'Draft' | 'Sent' | 'Paid' | 'Void'
subtotal:         real DEFAULT 0
tax_amount:       real DEFAULT 0
total_amount:     real DEFAULT 0
issued_at:        timestamp
due_at:           timestamp
paid_at:          timestamp
created_at:       timestamp DEFAULT now()
```

#### `invoice_line_items` — Billing placeholder
```
id:               serial PK
org_id:           text NOT NULL
invoice_id:       integer NOT NULL   -- FK → invoices.id
description:      text NOT NULL
quantity:         real DEFAULT 1
unit_price:       real NOT NULL
total:            real NOT NULL
line_type:        text NOT NULL      -- 'labor' | 'materials' | 'premium' | 'other'
created_at:       timestamp DEFAULT now()
```

---

## TABLE INVENTORY SUMMARY

| Table | Status | Domain | Source |
|---|---|---|---|
| `orgs` | NEW | Infrastructure | New — federated org hierarchy |
| `sentinel_log` | NEW | Infrastructure | Replaces SentinelLog tab |
| `comms_messages` | MODIFY | Infrastructure | Existing |
| `gmail_sync_state` | KEEP AS-IS | Infrastructure | Existing |
| `clients` | NEW | Property/Client | New |
| `properties` | NEW | Property/Client | Replaces Master Directory tab |
| `tenant_contacts` | NEW | Property/Client | Extracted from jobs.tenant_* fields |
| `new_contact_queue` | NEW | Property/Client | Replaces New Contacts tab |
| `employees` | NEW (replaces techs) | Workforce | Migrated from `techs` + Staff Roster sheet |
| `push_subscriptions` | NEW | Workforce | Split from techs.push_sub JSON blob |
| `time_off_requests` | NEW | Workforce | Replaces AppSheet TOM |
| `accrual_rules` | NEW | Workforce | Replaces AppSheet TOM |
| `techs` | DROP (after migration) | Workforce | Superseded by `employees` |
| `shifts` | NEW | Field Operations | New — PAGA compliance unit of analysis |
| `time_records` | MODIFY | Field Operations | Existing |
| `breaks` | NEW | Field Operations | Replaces embedded break cols |
| `inventory_items` | NEW | Field Operations | Replaces Inventory sheet |
| `inventory_transactions` | NEW | Field Operations | Replaces Transaction Logs tab |
| `attestations` | NEW | Compliance/PAGA | Separate immutable audit trail |
| `compliance_alerts` | MODIFY | Compliance/PAGA | Existing |
| `jobs` | MODIFY | WO Management | Existing |
| `job_comments` | MODIFY | WO Management | Existing |
| `job_performance_history` | NEW | WO Management | Replaces Job Performance History tab |
| `historical_assignments` | NEW | WO Management | Replaces Historical Assignments tab |
| `dispatcher_feedback` | NEW | WO Management | Replaces Dispatcher Feedback tab |
| `trade_duration_defaults` | NEW | WO Management | Replaces Trade Duration Defaults tab |
| `job_costs` | NEW | Financial | New (placeholder) |
| `invoices` | NEW | Financial | New (placeholder) |
| `invoice_line_items` | NEW | Financial | New (placeholder) |

**Total: 28 tables (6 modified, 22 new or kept)**

---

## MIGRATION STRATEGY

### Entity ID → Org ID
All existing tables use `entity_id text`. The migration:
1. `ALTER TABLE <table> ADD COLUMN org_id text NOT NULL DEFAULT 'APT-CA'`
2. `UPDATE <table> SET org_id = entity_id WHERE entity_id IS NOT NULL`
3. `ALTER TABLE <table> DROP COLUMN entity_id`

### Existing data compatibility
- `jobs.tech` (text name) stays until P3-3 migration populates `jobs.tech_id`
- `time_records` break columns stay until P3-2 migration writes to `breaks` table
- `time_records.attestation*` columns stay until P3-4 moves attestation to its own table

### Index strategy
Add at minimum:
- `org_id` index on every table
- `(org_id, status)` on `jobs`, `time_records`, `compliance_alerts`
- `(org_id, address_key)` UNIQUE on `properties`
- `(org_id, employee_id, shift_date)` on `shifts`
- `(org_id, email)` UNIQUE WHERE `email IS NOT NULL` on `employees`
