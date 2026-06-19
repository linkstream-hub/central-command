# Google Sheets Schema Reference
# Derived from Code.js and DashboardAPI.gs — ground truth for all sheet operations.
# Role-based terminology used throughout (no named individuals).

---

## Spreadsheet: APT Lead Intake Master
**ID:** `1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4`

---

### Tab: `Leads`
Every inbound email that passes the `shouldSkipEmail` filter is logged here.
Col 36 (0-indexed 35) = Gmail Msg ID (dedup key — prevents duplicate processing).
Full row shape is written by the lead parsing pipeline output; no fixed constants beyond the dedup key.

---

### Tab: `New Contacts`
**Role:** Staging/review queue. Auto-populated when the parser detects a property not in Master Directory, or when access info may have changed on a known property. A human reviewer promotes rows to Master Directory and marks Status = Added.

| Col (0-indexed) | Field | Notes |
|---|---|---|
| 0 | Timestamp | yyyy-MM-dd HH:mm |
| 1 | Lead ID | Source lead reference |
| 2 | Property Address | Sanitized |
| 3 | Unit | Dedup key (normalizeAddressKey) |
| 4 | Client | PM company name |
| 5 | Manager Name | Property manager |
| 6 | Manager Email | Blank if office/generic address |
| 7 | Access Info | Property-level only (lockbox, code) |
| 8 | Notes | Reason for review |
| 9 | Status | `Pending Review` / `Added` / `Verify & Update Master Directory` |
| 10 | Sender Email | Original email sender |
| 11 | Gmail Msg ID | Link back to source email |

---

### Tab: `Dispatch Queue`
30-column job card. Never change column order.

```
Col 1  = Timestamp
Col 2  = Lead ID
Col 3  = Priority          (1-URGENT / 2-TURNOVER / 3-PTE-PENDING / 4-STANDARD)
Col 4  = Email Type        (turnover / adhoc_workorder / inspection / new_inquiry / unknown)
Col 5  = Service Category
Col 6  = Property Address
Col 7  = Unit
Col 8  = Description
Col 9  = Preferred Timing
Col 10 = Access / Lockbox Info
Col 11 = RM Name
Col 12 = RM Email
Col 13 = Tenant Name
Col 14 = Tenant Phone
Col 15 = PTE Granted       (Yes / No / N/A)
Col 16 = Estimate Needed
Col 17 = Assigned Tech
Col 18 = Scheduled Date|Time  (format: YYYY-MM-DD|HH:MM)
Col 19 = Est. Hours
Col 20 = Status
Col 21 = Notes
Col 22 = Gmail Msg ID
Col 23 = Calendar Event ID
Col 24 = Tenant Email
Col 25 = Tenant Pref Contact
Col 26 = Tenant Has Pets
Col 27 = WC Code
Col 28 = Entity ID           (default: APT-CA)
Col 29 = Tracking Token
Col 30 = Tenant Sched        (TRUE if tenant self-scheduled)
```

**Status values:** `New / Ready to Schedule / PTE Required / Awaiting Approval / Scheduled / In Progress / Complete / Archived`

**Tab key `'NEW'` maps to label `'Needs Review'`** (renamed session 47). Canonical tab order:
```
[ ALL ]  [ NEEDS REVIEW ]  [ READY TO SCHEDULE ]  [ PTE REQUIRED ]  [ SCHEDULED ]  [ COMPLETE ]
```
Single layer, workflow-state only. Email type = badge on rows, NOT a tab. Default view = READY TO SCHEDULE.

**Status row colors (updateJob):**

| Status | Background |
|-|-|
| Complete | #1a2b1a (dark green) |
| Scheduled | #D4EDDA (light green) |
| Awaiting Approval | #E8D5F5 (light purple) |
| PTE Required / Tenant Contacted | #FFF3CD (yellow) |
| All others | #111318 (dark default) |
| Archived | #2a2a2a / #666666 font |

---

### Tab: `Master Directory`
**Role:** Verified property/client database. The authoritative source for address matching, manager contact info, and property-level access codes. Source of truth for `buildSmartPropertyContext()`.

| Col (0-indexed) | Constant | Field | Notes |
|---|---|---|---|
| 0 | `COL_PROP_ID` | Property ID | Internal identifier |
| 1 | `COL_CLIENT` | Client | PM company name (e.g. property management org) |
| 2 | `COL_RM_NAME` | Manager Name | Property manager name |
| 3 | `COL_ADDRESS` | Property Address | Supports hyphen-range expansion (530-536 41st St) |
| 4 | `COL_RM_EMAIL` | Manager Email | Used for sender matching |
| 5 | `COL_ACCESS_INFO` | Property Notes / Access Info | Lockbox codes, combinations, building access |

**Note:** Master Directory is the authority on access codes. New Contacts is the staging queue — not a duplicate.

---

### Tab: `Tech Roster`
Skills (cols A–J) + PWA auth (cols K–S, 0-indexed).

**PWA auth columns (0-indexed):**
```
K (10): Phone
L (11): PIN Hash (SHA-256)
M (12): Session Token
N (13): Token Expiry (ISO timestamp)
O (14): Role (tech / admin)
P (15): Active (TRUE/FALSE)
Q (16): Hourly Rate
R (17): Push Subscription (JSON)
S (18): Entity ID (default: APT-CA)
```

**Login:** Badge # + SHA-256 PIN → UUID session token stored in `localStorage['apt_tech_session']`.  
**Session:** Token in col M, expires 30 days.  
**Shift session:** `localStorage['apt_shift_session']` (ShiftSession: recordId, clockInTime, breakDurationMinutes, status).  
**CORS:** POST uses `Content-Type: text/plain` to bypass preflight; body is still JSON.

---

### Tab: `Time Records`
28 columns (0–27).

```
0-15:  Standard clock data (RECORD_ID, JOB_ID, TECH_ID, TECH_NAME, CLOCK_IN, STATUS, DATE, ...)
16-19: GPS (Lat/Lng In/Out)
20:    Entity ID
21:    Attestation text
22:    Attestation At (ISO)
23:    Supervisor Status (PENDING / APPROVED / DISPUTED)
24:    Supervisor ID
25:    Supervisor Name
26:    Supervisor At (ISO)
27:    Dispute Reason
```

---

### Tab: `Historical Assignments`
**Role:** Past job assignment history. Used for address-based job history lookups in `suggestTechsDA` and tech scoring.
Header-based access (reads column names from row 0 dynamically — no fixed index constants).

---

### Tab: `Historical Tech Insights`
**Role:** Aggregated tech performance data. Referenced by DA_SHEETS. Used in tech suggestion scoring.
Header-based access.

---

### Tab: `Trade Duration Defaults`
Estimated hours per trade category. Auto-calibrates from `Job Performance History` data once ~20+ PWA completions accumulate. Do NOT ask staff to fill in manually and do NOT run `calibrateDurationDefaults()` until sufficient data exists.

---

### Tab: `Staff Roster`
Office staff auth + module permissions for CC2.0.

| Col | Field | Notes |
|---|---|---|
| H | Active | TRUE/FALSE — must be TRUE to log in |
| — | Module flags | admin / dispatch / people / finance / intel |

**Module → route mapping:**
- `admin` = all routes
- `dispatch` = `/live`, `/schedule`, `/feedback`
- `people` = `/weekly-schedule`, `/calendar`, `/team`, `/compliance`, `/hr`
- `finance` = `/billing`
- `intel` = `/intel`

See `docs/ORG.md` for named staff roster with module assignments.

---

### Tab: `Job Performance History`
Written by `handleMarkComplete` in TechPWA.gs on job completion. Source data for `calibrateDurationDefaults()`.

---

### Tab: `JobComments`
Internal job comment threads. Auto-provisioned on first use by `getJobCommentsSheet()` in DashboardAPI.gs.
6 columns (0–5).

| Col (0-indexed) | Field | Format | Notes |
|---|---|---|---|
| 0 | Comment ID | `c_{epoch}_{4-char-random}` | Generated by `addJobCommentDA` |
| 1 | Lead ID | String (e.g. `WO-12345`) | Matches `jobs.job_id` in Neon |
| 2 | Author | String | Dispatcher name |
| 3 | Role | String (e.g. `dispatch`) | Comment author role |
| 4 | Body | String (max 2000 chars) | Comment text |
| 5 | Timestamp | `yyyy-MM-dd'T'HH:mm:ss` (America/Los_Angeles) | Written by `addJobCommentDA` using `Utilities.formatDate` |

**Date filter column for audit:** Col 5 (Timestamp). Parse with `datetime.strptime(val, "%Y-%m-%dT%H:%M:%S").date()`.
**No natural key linkable to Neon** — `neon_audit.py` performs count-only comparison for this tab.
**Spreadsheet ID:** `1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4`

---

### Tab: `SentinelLog`
Railway Sentinel write-back. Auto-provisioned on first use.

---

### Tab: `Dispatcher Feedback`
Auto-created on first use by `addDispatcherFeedbackDA`. Records feedback entries on dispatch decisions.

---

### Tab: `ComplianceAlerts`
Auto-created by `ensureComplianceAlertsSheet()`. Written by the compliance engine (Flowise on Railway). Read by `getComplianceAlertsDA` and `getNotificationsDA`.

| Col (0-indexed) | Field | Notes |
|---|---|---|
| 0 | Alert ID | |
| 1 | Employee Name | Role: Field Tech or any wage/hour-covered role |
| 2 | Employee ID | |
| 3 | Violation Type | e.g. Missed Meal Period, OT threshold |
| 4 | Shift Date | |
| 5 | Total Hours | |
| 6 | Premium Amount | Dollar value of PAGA premium owed |
| 7 | Status | `Active` / `Resolved` |
| 8 | Created At | ISO timestamp |
| 9 | Resolved At | ISO timestamp or blank |

---

## Spreadsheet: Time Off Manager
**ID:** `1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk`
Managed by AppSheet TOM. Schema captured separately in memory (AppSheet Time Off Manager Schema).

### Tab: `TimeOffRequests`
Read/written by both DashboardAPI.gs (`getTimecardApprovalQueueDA`) and AppSheet TOM.

---

## Spreadsheet: Inventory (Staff-created — not yet integrated)
**ID:** `1MRWmbuGLm_zDAkVuB-uZyguT86mWBeAQccm5xR7mXgI`
Created independently by office staff. Target domain: **Field Operations**.
Goal: wholesale material procurement to reduce retail field purchases.

### Tab: `Inventory Master`
| Field | Notes |
|---|---|
| Item ID | |
| Item Name | |
| SKU/Barcode | |
| Location/Bin | Storage location |
| Cost | Wholesale/purchase cost |
| Price | Billing/markup price |
| Reorder Point | Alert threshold |
| Current Stock | Live quantity |
| Total Value | Computed: Cost × Current Stock |
| Status | Active/Inactive/etc. |

### Tab: `Transaction Logs`
| Field | Notes |
|---|---|
| Date | |
| Item ID | |
| SKU/Barcode | |
| Type | Check-Out / Return / Restock / Adjustment (TBD — not yet standardized) |
| Quantity | |
| Notes | |
| Employee | Who performed the transaction |

### Tab: `Employee List`
| Field | Notes |
|---|---|
| Name | |
| ID# | Employee/badge ID |
| Barcode | For scanner-based check-out |

---

## Migration Target
All operational data above moves to **Neon Postgres** (multi-tenant, `org_id` on every table).
Google Sheets remain for Google Workspace integration only (Gmail, Calendar read/write via Apps Script).
Apps Script remains the bridge layer — not the source of truth.
