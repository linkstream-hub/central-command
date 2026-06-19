# P3-3: DISPATCH QUEUE + MASTER DIRECTORY MIGRATION SPEC
# Branch: feat/p3-3-dispatch-migration
# Depends on: P3-2 merged (✅ PR #828)
# Written: 2026-05-26 (Session 101)

---

## GOAL

Properties and clients in Neon. Jobs fully keyed with `property_id` and `employee_id`.
Three migration scripts. Three data sources (Google Sheets → CSV → Neon).

GAS remains source of truth throughout. This sprint is additive only — no existing rows are deleted.

---

## PRE-FLIGHT (AG completes before creating the branch)

Delete the test record that was created during P3-2 testing:

```sql
DELETE FROM time_records WHERE record_id = 'TEST-REC-001';
```

Paste rows affected: `______` (expect 0 or 1)

If 1 row deleted — confirm with: `SELECT COUNT(*) FROM time_records WHERE record_id = 'TEST-REC-001';` → must return 0.

---

## DATA SOURCES (Brandon exports before AG starts Task 4)

Brandon opens the **APT Lead Intake Master** spreadsheet and exports three tabs:

| Tab | Save As | Path |
|---|---|---|
| "Master Directory" | CSV | `tech-pwa/scripts/data/master-directory.csv` |
| "Dispatch Queue" | CSV | `tech-pwa/scripts/data/dispatch-queue.csv` |
| "New Contacts" | CSV | `tech-pwa/scripts/data/new-contacts.csv` |

Export steps: File → Download → Comma-separated values (.csv). Repeat per tab.

These files contain customer data. They are **never committed**. `.gitignore` must cover the data directory (Task 2).

---

## FILES TO CREATE/MODIFY

| File | Action |
|---|---|
| `tech-pwa/scripts/migrate-master-directory.ts` | NEW |
| `tech-pwa/scripts/migrate-dispatch-queue.ts` | NEW |
| `tech-pwa/scripts/migrate-new-contacts.ts` | NEW |
| `specs/PHASE3_P3_3_SPEC.md` | NEW (this file — commit to branch) |
| `.gitignore` | ADD `tech-pwa/scripts/data/` if not present |
| `artifacts/ag_diff.txt` | UPDATED |
| `artifacts/ag_test_results.txt` | UPDATED |

No other files. Any other change = STOP and flag to Claude Code.

---

## SHARED UTILITY — normalizeAddressKey

This function must appear verbatim in all three migration scripts (or a shared `scripts/lib/addressKey.ts`).
It is a byte-for-byte TypeScript port of `normalizeAddressKey` in `Code.js:1942`.
Do NOT modify it. Deviation = phantom duplicates in properties table.

```typescript
function normalizeAddressKey(address: string, unit: string): string {
  let addr = String(address || '').replace(/##/g, '#');
  const embeddedUnit = addr.match(/#(\w+)/);
  if (embeddedUnit && !unit) unit = embeddedUnit[1];
  addr = addr.replace(/#\w+/g, '').trim();
  addr = addr.split(',')[0].trim();
  addr = addr.replace(
    /\b(avenue|ave|street|st|boulevard|blvd|drive|dr|road|rd|lane|ln|way|place|pl|court|ct|terrace|terr)\b\.?/gi,
    (m) => m.replace(/\.$/, '').toLowerCase()
  );
  addr = addr.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  unit = String(unit || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();
  return addr + '||' + unit;
}
```

---

## NUMBERED TASK LIST

---

### Task 1 — Branch verify

```powershell
git branch --show-current
```
→ Must output: `feat/p3-3-dispatch-migration`. If not, STOP and report to Claude Code.

```powershell
git ls-remote --heads origin feat/p3-3-dispatch-migration
```
→ Must return non-empty. If empty: `git push -u origin feat/p3-3-dispatch-migration` first.

```powershell
git log main..HEAD --oneline
```
→ If empty on a pre-existing branch, rebase from main before any work.

Paste all three outputs: `______`

---

### Task 2 — Protect the data directory

Check `.gitignore` at repo root for `tech-pwa/scripts/data/`.
If absent, add:
```
tech-pwa/scripts/data/
```

Verify with: `git check-ignore -v tech-pwa/scripts/data/master-directory.csv`
→ Must return a match. If not, the gitignore line is wrong — fix before proceeding.
Paste output: `______`

---

### Task 3 — Install csv-parse

```powershell
cd tech-pwa && npm install --save-dev csv-parse
```

Paste installed version: `______`

---

### Task 4 — Confirm CSV files exist (Brandon must export first)

```powershell
ls tech-pwa/scripts/data/
```

Paste output (must show all three files with non-zero sizes): `______`

If files are missing, stop and wait for Brandon to export them.

---

### Task 5 — Write `tech-pwa/scripts/migrate-master-directory.ts`

**Dependencies:** `pg`, `dotenv`, `csv-parse/sync`, `fs`

**Algorithm:**

1. `config({ path: '.env.local' })` — load DATABASE_URL_UNPOOLED
2. Connect to Neon via `pg` Client (same pattern as `migrate-time-records.ts`)
3. Read `scripts/data/master-directory.csv` using `csv-parse/sync` with `{ skip_empty_lines: true, from_line: 2 }` (skip header row)
4. Build client dedup map: key = `name.trim().toLowerCase()`, value = `clients.id`
5. For each CSV row (0-indexed columns per SHEETS_SCHEMA.md):

**Master Directory column map:**

| CSV Index | Field | Destination |
|---|---|---|
| 0 | Property ID | Ignore — use Neon serial PK |
| 1 | Client (PM company) | `clients.name` — dedup key |
| 2 | Manager Name | `clients.contact_name` + `properties.rm_name` |
| 3 | Property Address | `properties.address` |
| 4 | Manager Email | `clients.contact_email` + `properties.rm_email` |
| 5 | Access Info | `properties.access_info` |

**Client upsert logic:**
- Normalized key = `row[1].trim().toLowerCase()`
- If blank → client_name = 'Unknown', type = 'private_owner'
- If `'private owner'` (case-insensitive) → type = 'private_owner'
- Otherwise → type = 'pm_company'
- `INSERT INTO clients (org_id, name, type, contact_name, contact_email) VALUES ('APT-CA', $1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING id`
- If DO NOTHING triggered, `SELECT id FROM clients WHERE org_id = 'APT-CA' AND LOWER(name) = $1`
- Store in dedup map: normalized key → id

**Property upsert logic:**
- Skip row if `row[3]` (address) is blank
- Parse address: strip leading `##`, extract embedded unit (`#N` pattern)
- Compute `address_key = normalizeAddressKey(row[3], '')` — Master Directory has no separate unit column; unit is embedded in address only
- `INSERT INTO properties (org_id, client_id, address, address_key, rm_name, rm_email, access_info) VALUES ('APT-CA', $1, $2, $3, $4, $5, $6) ON CONFLICT (org_id, address_key) DO UPDATE SET rm_name = EXCLUDED.rm_name, rm_email = EXCLUDED.rm_email, access_info = EXCLUDED.access_info RETURNING id`

**Migration report — print on completion:**
```
=== migrate-master-directory REPORT ===
Total rows:         ___
Rows skipped (blank address): ___
Clients created:    ___
Clients existing:   ___
Properties created: ___
Properties updated (conflict): ___
```

---

### Task 6 — Run migrate-master-directory.ts

```powershell
cd tech-pwa && npx tsx scripts/migrate-master-directory.ts
```

Paste complete console output: `______`

Then verify in Neon:
```sql
SELECT COUNT(*) FROM clients;
SELECT COUNT(*) FROM properties;
```
Paste both counts: `______`

---

### Task 7 — Write `tech-pwa/scripts/migrate-dispatch-queue.ts`

**Dependencies:** `pg`, `dotenv`, `csv-parse/sync`, `fs`

**Algorithm:**

1. Connect to Neon
2. Load lookup maps:
   - Employee map: `SELECT id, name FROM employees WHERE is_active = true` → Map keyed by `name.trim().toLowerCase()`
   - Property map: `SELECT id, address_key FROM properties WHERE org_id = 'APT-CA'` → Map keyed by `address_key`
3. Read `scripts/data/dispatch-queue.csv` — `{ skip_empty_lines: true, from_line: 2 }`
4. For each row:

**Dispatch Queue column map (CSV is 0-indexed; Sheet is 1-indexed — offset by 1):**

| CSV Index | Sheet Col | Field | jobs column |
|---|---|---|---|
| 0 | 1 | Timestamp | `timestamp` (parse to Date, null if blank) |
| 1 | 2 | Lead ID | `job_id` — **dedup key** |
| 2 | 3 | Priority | `priority` |
| 3 | 4 | Email Type | `email_type` |
| 4 | 5 | Service Category | `category` |
| 5 | 6 | Property Address | `address` |
| 6 | 7 | Unit | `unit` |
| 7 | 8 | Description | `description` |
| 8 | 9 | Preferred Timing | `timing` |
| 9 | 10 | Access Info | `access_info` |
| 10 | 11 | RM Name | `rm_name` |
| 11 | 12 | RM Email | `rm_email` |
| 12 | 13 | Tenant Name | `tenant_name` |
| 13 | 14 | Tenant Phone | `tenant_phone` |
| 14 | 15 | PTE Granted | `pte` |
| 15 | 16 | Estimate Needed | `estimate` |
| 16 | 17 | Assigned Tech | `tech` (text) + match → `employee_id` |
| 17 | 18 | Scheduled Date\|Time | parse `YYYY-MM-DD\|HH:MM` → `scheduled_date` + `scheduled_time` |
| 18 | 19 | Est. Hours | `est_hours` (`parseFloat`, null if blank) |
| 19 | 20 | Status | `status` |
| 20 | 21 | Notes | `notes` |
| 21 | 22 | Gmail Msg ID | `gmail_msg_id` |
| 22 | 23 | Calendar Event ID | `calendar_event_id` |
| 23 | 24 | Tenant Email | `tenant_email` |
| 24 | 25 | Tenant Pref Contact | `tenant_pref` |
| 25 | 26 | Tenant Has Pets | `tenant_pets` |
| 26 | 27 | WC Code | `wc_code` |
| 27 | 28 | Entity ID | Ignore — always write `org_id = 'APT-CA'` |
| 28 | 29 | Tracking Token | `tracking_token` |
| 29 | 30 | Tenant Sched | `tenant_scheduled` (parse `'TRUE'` → `true`, else `false`) |

**Tech matching:**
- Normalize: `row[16].trim().toLowerCase()`
- Look up in employee name map
- If match found: `employee_id = employees.id`
- If no match: `employee_id = null`; log `UNMATCHED TECH: "${row[16]}"`

**Property matching:**
- Compute: `address_key = normalizeAddressKey(row[5], row[6])`
- Look up in property map
- If match: `property_id = properties.id`
- If no match: `property_id = null`; increment unmatched address counter

**Upsert:**
```sql
INSERT INTO jobs (org_id, job_id, timestamp, priority, email_type, category,
                  address, unit, description, timing, access_info,
                  rm_name, rm_email, tenant_name, tenant_phone,
                  pte, estimate, tech, employee_id, scheduled_date,
                  scheduled_time, est_hours, status, notes, gmail_msg_id,
                  calendar_event_id, tenant_email, tenant_pref, tenant_pets,
                  wc_code, tracking_token, tenant_scheduled, property_id)
VALUES (...)
ON CONFLICT (job_id) DO UPDATE SET
  employee_id = COALESCE(EXCLUDED.employee_id, jobs.employee_id),
  property_id = COALESCE(EXCLUDED.property_id, jobs.property_id),
  status = EXCLUDED.status,
  tech = EXCLUDED.tech
RETURNING id, xmax
```
Use `xmax = 0` to detect INSERT vs UPDATE.

**Migration report — print on completion:**
```
=== migrate-dispatch-queue REPORT ===
Total rows:               ___
Rows skipped (blank job_id): ___
Jobs inserted (new):      ___
Jobs updated (existing):  ___
Jobs with employee_id:    ___
Jobs with property_id:    ___
Unmatched tech names:     [list each unique name]
Unmatched addresses:      ___ (count only)
```

---

### Task 8 — Run migrate-dispatch-queue.ts

```powershell
cd tech-pwa && npx tsx scripts/migrate-dispatch-queue.ts
```

Paste complete console output including all UNMATCHED TECH lines: `______`

Then verify:
```sql
SELECT
  COUNT(*) AS total,
  COUNT(employee_id) AS with_employee,
  COUNT(property_id) AS with_property
FROM jobs;
```
Paste result: `______`

---

### Task 9 — Write `tech-pwa/scripts/migrate-new-contacts.ts`

**Dependencies:** `pg`, `dotenv`, `csv-parse/sync`, `fs`

**Algorithm:**

1. Connect to Neon
2. Read `scripts/data/new-contacts.csv` — `{ skip_empty_lines: true, from_line: 2 }`
3. For each row:

**New Contacts column map (0-indexed per SHEETS_SCHEMA.md):**

| CSV Index | Field | new_contact_queue column |
|---|---|---|
| 0 | Timestamp | `created_at` (parse to Date, null if blank) |
| 1 | Lead ID | `source_lead_id` |
| 2 | Property Address | `address` |
| 3 | Unit | `unit` |
| 4 | Client | `client_name` |
| 5 | Manager Name | `manager_name` |
| 6 | Manager Email | `manager_email` |
| 7 | Access Info | `access_info` |
| 8 | Notes | `notes` |
| 9 | Status | `status` |
| 10 | Sender Email | `sender_email` |
| 11 | Gmail Msg ID | `gmail_msg_id` — dedup key |

`org_id = 'APT-CA'`. `reviewed_by = null`. `reviewed_at = null`.

**Dedup:** Before each INSERT, check `SELECT id FROM new_contact_queue WHERE gmail_msg_id = $1 AND org_id = 'APT-CA'`. If exists, skip (log `SKIP duplicate gmail_msg_id: ${row[11]}`). Blank `gmail_msg_id` rows are inserted without dedup check.

**Migration report:**
```
=== migrate-new-contacts REPORT ===
Total rows:            ___
Inserted:              ___
Skipped (duplicate):   ___
Skipped (blank):       ___
```

---

### Task 10 — Run migrate-new-contacts.ts

```powershell
cd tech-pwa && npx tsx scripts/migrate-new-contacts.ts
```

Paste complete console output: `______`

Verify: `SELECT COUNT(*) FROM new_contact_queue;`
Paste count: `______`

---

### Task 11 — Spot-check queries (paste all four results)

```sql
-- 5 properties with client linkage
SELECT p.id, p.address, p.address_key, p.rm_name, c.name AS client_name
FROM properties p
LEFT JOIN clients c ON p.client_id = c.id
LIMIT 5;

-- 5 jobs with employee_id matched
SELECT job_id, address, tech, employee_id, property_id, status
FROM jobs
WHERE employee_id IS NOT NULL
LIMIT 5;

-- 5 jobs with property_id matched
SELECT job_id, address, property_id, employee_id
FROM jobs
WHERE property_id IS NOT NULL
LIMIT 5;

-- Unmatched jobs: has tech text but no employee_id
SELECT COUNT(*)
FROM jobs
WHERE employee_id IS NULL
  AND tech IS NOT NULL
  AND TRIM(tech) != '';
```

Paste all four query results: `______`

---

### Task 12 — tsc zero errors (terminal N-2)

```powershell
cd tech-pwa && npx tsc --noEmit
```

→ Must show 0 errors. If errors exist, fix them before proceeding.
Paste output: `______`

```powershell
cd tech-pwa
git diff origin/main...HEAD | Out-File -Encoding utf8 ../artifacts/ag_diff.txt
cd ..
git add artifacts/ag_diff.txt tech-pwa/scripts/migrate-master-directory.ts tech-pwa/scripts/migrate-dispatch-queue.ts tech-pwa/scripts/migrate-new-contacts.ts specs/PHASE3_P3_3_SPEC.md
git commit -m "feat(p3-3): master directory + dispatch queue + new contacts migration scripts"
git push origin HEAD
```

Post `artifacts/ag_diff.txt` to Claude Code. **Stop. Wait for PASS.**

---

### Task 13 — Test sprint (terminal N-1, separate session)

DATABASE_URL must be connected to real Neon dev branch (not mock, not sandbox).

Run each script and capture complete output:

1. `npx tsx scripts/migrate-master-directory.ts` → paste full output: `______`
2. `npx tsx scripts/migrate-dispatch-queue.ts` → paste full output: `______`
3. `npx tsx scripts/migrate-new-contacts.ts` → paste full output: `______`

Then run verification queries:

4. `SELECT id, name, type, contact_email FROM clients LIMIT 5;` → paste: `______`
5. `SELECT id, address, address_key, rm_name FROM properties LIMIT 5;` → paste: `______`
6. `SELECT COUNT(*) FILTER (WHERE employee_id IS NOT NULL) AS with_emp, COUNT(*) FILTER (WHERE property_id IS NOT NULL) AS with_prop, COUNT(*) AS total FROM jobs;` → paste: `______`
7. `SELECT COUNT(*) FROM new_contact_queue;` → paste: `______`

Write `artifacts/ag_test_results.txt` with all the above outputs — actual observed data, not "PASS".

Post to Claude Code. **Stop. Wait for clear-to-merge.**

---

### Task 14 — Merge (terminal N)

Merge only after Claude Code issues "Clear to merge." Not before.

---

## DEFINITION OF DONE

- All Master Directory rows → `properties` table (with client dedup)
- All Dispatch Queue rows → `jobs` table (no orphans)
- `jobs.employee_id` populated where tech name matches a known employee
- `jobs.property_id` populated where address_key matches a known property
- Unmatched rows documented in migration report (expected — not a failure)
- `npx tsc --noEmit` → 0 errors
- Row count spot-checks pass
- `artifacts/ag_test_results.txt` contains specific observed data per item above
