# Shadow-Writes Inventory
# Generated: 2026-05-31 | Foundation Milestone Phase 11
# Updated: 2026-06-01 | Phase 14 Cut-Over Complete

> **STATUS: CUT-OVER COMPLETE** (Phase 14)
> Google Sheets (Dispatch Queue) is now locked as a read-only archive. Neon Postgres is the sole authoritative source of truth and write path for work orders.

Shadow-writes were active write paths where GAS (Google Sheets) remained the authoritative source while Neon was written concurrently. This inventory tracks the state of those paths prior to and following the Neon cut-over.

---

## Active Shadow-Write Paths

### 1. `employees` (Techs / Tech Roster)

| Property | Value |
|----------|-------|
| **Neon table** | `employees` |
| **GAS source** | `TechPWA.gs → syncTechToNeon()` |
| **Trigger events** | `handleLogin()`, `handleChangePin()` — after any tech row mutation |
| **Next.js endpoint** | `POST /api/techs/sync` |
| **Auth** | `DASHBOARD_API_KEY` header (not `x-api-key` — intentional match on both sides) |
| **Conflict strategy** | `ON CONFLICT (orgId, badge) WHERE badge IS NOT NULL DO UPDATE SET *` (full upsert) |
| **Fields synced** | name, badge, rank, phone, pinHash, sessionToken, tokenExpiry, role, isActive, hourlyRate, pushSub, entityId, skill ratings (7 trades) |
| **Fields NOT synced** | None — full row sync |
| **Neon primary?** | NO — Sheets is authoritative. Login reads from GAS, writes session token to Sheets, then syncs to Neon. |
| **Gap** | Session tokens written by Next.js `/api/field/auth/login` write directly to Neon but GAS does NOT read that value back. Pin hashes stored in both. |

### 2. `time_records` (Clock In/Out Events)

| Property | Value |
|----------|-------|
| **Neon table** | `time_records` |
| **GAS source** | `TechPWA.gs → syncTimeRecordToNeon()` |
| **Trigger events** | `handleClockIn`, `handleClockOut`, `handleStartBreak`, `handleEndBreak`, `handleMarkComplete`, `handleEndShift` |
| **Next.js endpoint** | `POST /api/time-records/sync` |
| **Auth** | `DASHBOARD_API_KEY` header |
| **Conflict strategy** | `ON CONFLICT (record_id) DO UPDATE SET *` (full upsert by natural key) |
| **Fields synced** | Full time record: recordId, jobId, techId, techName, clockIn/Out, breakStart/End, breakMinutes, actualHours, estHours, status, notes, receiptIds, mealWarning, date, lat/lng, attestation fields, premiumOwed, complianceViolations |
| **Compliance side-effect** | If `premiumOwed > 0`, `/api/time-records/sync` also inserts a `compliance_alerts` row |
| **Neon primary?** | NO — Sheets is authoritative. TechPWA.gs writes to Sheets first, then calls sync endpoint. |
| **Gap** | Next.js `/api/field/clock-in` also inserts directly to `time_records` — two write paths exist for the same record. Risk of duplicate records if both are active simultaneously. Must resolve before Sheets cutover. |

### 3. `jobs` (Dispatch Queue / Work Orders)

| Property | Value |
|----------|-------|
| **Neon table** | `jobs` |
| **GAS source — new leads** | `Code.js → syncJobToNeon()` — called in `addToDispatchQueue()` and `updateJob()` |
| **GAS source — techs** | `TechPWA.gs → syncJobToNeon()` — called when job row is mutated via tech actions |
| **Next.js endpoint** | `POST /api/jobs/sync` |
| **Auth** | `DASHBOARD_API_KEY` header (Code.js uses `x-api-key`; TechPWA.gs uses `DASHBOARD_API_KEY`) |
| **Conflict strategy** | `ON CONFLICT (job_id) DO UPDATE SET *` (full upsert) |
| **Fields synced** | jobId, timestamp, priority, emailType, category, address, unit, description, timing, access, rmName, rmEmail, tenantName, tenantPhone, pteGranted, estimate, tech, sched, estHours, status, notes, msgId, calEvent, tenantEmail, tenantPref, tenantPets, wcCode, entityId |
| **Neon primary?** | YES. Neon is the sole write path and source of truth. Sheets is locked as a read-only archive. |
| **Gap** | None. Neon is the single source of truth. |

### 4. `job_comments` (Dispatch Comments)

| Property | Value |
|----------|-------|
| **Neon table** | `job_comments` |
| **Write paths** | **Two separate paths** |
| **Path A — POST (new comment)** | `POST /api/job-comments/[jobId]` — writes to Sheets first (`addJobCommentDA`), then shadow-writes to Neon |
| **Path B — GET (lazy backfill)** | `GET /api/job-comments/[jobId]` — on Neon miss, fetches from Sheets and shadow-writes to Neon |
| **Auth** | Office staff session (`auth()`) |
| **Conflict strategy** | No `ON CONFLICT` — soft dedup check by presence (insert if Neon empty). Risk of duplicates on repeated lazy fetches. |
| **Neon primary?** | NO — Sheets is authoritative. Neon is a write-through cache. |
| **Gap** | No unique constraint on job_comments (no messageId or natural key). Repeated GET calls for the same jobId during transition will insert duplicates into Neon. Needs `(job_id, author_name, content, created_at)` unique index or a `source_id` column before Neon becomes primary. |

### 5. `comms_messages` — Inbound Email Replies

| Property | Value |
|----------|-------|
| **Neon table** | `comms_messages` |
| **GAS source** | `Code.js → writeInboundReplyToNeon()` — calls `/api/comms/inbound` via `DASHBOARD_API_URL` |
| **Next.js endpoint** | `POST /api/comms/inbound` |
| **Auth** | `x-api-key` header = `DASHBOARD_API_KEY` |
| **Conflict strategy** | `ON CONFLICT DO NOTHING` (keyed on `message_id` unique) |
| **Trigger events** | When an inbound reply arrives on a known thread in `checkNewLeadEmails()` |
| **Neon primary?** | YES — comms_messages is Neon-native. GAS shadow-writes new inbound messages; Next.js reads from Neon exclusively. |
| **Gap** | Historical emails (pre-migration) not in Neon. Gmail sync cron (`sync-gmail-history`) handles backfill. |

### 6. `comms_messages` — Outbound (Gmail Sync Cron)

| Property | Value |
|----------|-------|
| **Neon table** | `comms_messages` |
| **Source** | `GET /api/cron/sync-gmail-history` — Gmail History API push → inserts full thread |
| **Auth** | Bearer token or cron secret |
| **Conflict strategy** | `ON CONFLICT DO NOTHING` (message_id unique) |
| **Neon primary?** | YES |
| **Gap** | None currently known. Gmail sync state tracked in `gmail_sync_state` table. |

### 7. `compliance_alerts` (Side-Effect of Time Record Sync)

| Property | Value |
|----------|-------|
| **Neon table** | `compliance_alerts` |
| **Write path** | `POST /api/time-records/sync` — auto-inserts when `premiumOwed > 0` |
| **Also written by** | CA Break Compliance Monitor n8n workflow → Google Sheets ComplianceAlerts tab (separate — no Neon sync for n8n-detected violations yet) |
| **Neon primary?** | PARTIAL — time_records sync path writes to Neon; n8n path writes to Sheets only |
| **Gap** | n8n-detected compliance alerts (from the CA Break Compliance Monitor workflow) are written to the Google Sheets ComplianceAlerts tab but NOT to Neon. There is no `/api/compliance/sync` endpoint. These are invisible to the Next.js dashboard. |

---

## Write Paths NOT Yet Shadow-Writing to Neon

| Data | Currently in | Status |
|------|-------------|--------|
| Leads (raw parsed emails) | Leads sheet (`logToSheet()` in Code.js) | No Neon equivalent — `leads` table not yet in schema |
| New Contacts queue | New Contacts sheet (`flagNewContactsForReview()`) | No Neon equivalent |
| Lapham Master Directory | Master Directory sheet | No Neon equivalent — `properties` table exists but no sync |
| Historical Assignments | HIST_ASSIGNMENTS sheet | No Neon equivalent |
| Time Off requests (TOM) | AppSheet Time Off Manager | `time_off_requests` table exists in Neon but no active sync from AppSheet |
| Calendar events | Google Calendar (via GAS) | Not in Neon |
| n8n compliance alerts | ComplianceAlerts sheet (via n8n) | Not synced to `compliance_alerts` Neon table |

---

## Duplicate Write Path Risks (Requires Resolution Before Cutover)

| Table | Risk | Resolution |
|-------|------|-----------|
| `time_records` | TechPWA.gs shadow-write AND Next.js `/api/field/clock-in` both INSERT to the same table | Disable one path. After cutover: Next.js writes primary, GAS sync disabled. Interim: check for `recordId` collision before inserting in GAS path. |
| `job_comments` | No unique key — lazy backfill can insert duplicates | Add composite unique index `(job_id, author_name, content, created_at)` before Neon becomes primary |
| `compliance_alerts` | n8n path writes to Sheets; time_records sync path writes to Neon | Add n8n → `/api/compliance/sync` endpoint, or redirect n8n violations directly to Neon endpoint |

---

## Cutover Readiness by Table

| Table | Neon has primary? | Divergence risk | Cutover gate |
|-------|------------------|----------------|-------------|
| `jobs` | Read: YES. Write: NO | Medium — PATCH without Sheets write | Audit 30 days of sync logs, verify job counts match |
| `employees` | NO | Low — full upsert, no secondary writes | Validate pinHash + session state match |
| `time_records` | NO | HIGH — dual insert path active | Resolve dual-write before any cutover attempt |
| `job_comments` | NO | HIGH — no unique key, duplicate risk | Add unique index first |
| `comms_messages` | YES | Low — message_id unique, DO NOTHING | Ready now |
| `compliance_alerts` | PARTIAL | Medium — n8n path missing | Add compliance sync endpoint |
