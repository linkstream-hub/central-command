# ANTIGRAVITY SPRINT — Kill the Scheduling Spreadsheet Sync
**Author:** Claude Code
**Priority:** URGENT — dailyScheduleSheetSync runs every morning and is
actively dangerous. It reads stale data from Tsegab's old spreadsheet
and can overwrite Robert's CC2.0 assignments. Stop it today.
**Scope:** `ScheduleMiner.js` (kill switch) + `DashboardAPI.gs` (remove fallback)

---

## CONTEXT

Tsegab's scheduling spreadsheet was the source of truth before CC2.0 existed.
`dailyScheduleSheetSync()` bridged the old world → new: it read the spreadsheet
tabs and wrote assignments into the Dispatch Queue so CC2.0 could see them.

That bridge is no longer needed. Robert now assigns jobs via CC2.0's DnD grid,
which writes directly to DQ col 18. The spreadsheet hasn't been updated since
Robert started using CC2.0 (~April 17). The sync runs every morning at 6:15am,
reads ghost entries from weeks ago, and risks overwriting Robert's real
assignments. It must be stopped.

---

## CHANGE 1 — Kill switch in `ScheduleMiner.js`

**File:** `ScheduleMiner.js` (repo root — do NOT move it)

Find the opening of `dailyScheduleSheetSync`:
```javascript
function dailyScheduleSheetSync() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var tz    = 'America/Los_Angeles';
```

Add ONE line immediately after the opening brace:
```javascript
function dailyScheduleSheetSync() {
  // RETIRED April 2026 — CC2.0 is now the write source for scheduling.
  // Trigger remains in place; function is a no-op. Brandon can delete trigger via Apps Script console.
  return;

  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var tz    = 'America/Los_Angeles';
```

Do not touch anything else in this file. The unreachable code below `return`
is intentional — it preserves the full function body for historical reference
and makes reverting trivial if ever needed.

---

## CHANGE 2 — Remove scheduling sheet fallback from `getWeekSchedule` in `DashboardAPI.gs`

**File:** `dashboard-api/DashboardAPI.gs`

In the 12-month sprint we kept a secondary scheduling sheet tab read for
"current week backward compatibility." That caveat is now gone. Remove the
entire secondary block.

Find this comment and the entire block it introduces:
```javascript
    // ── SECONDARY: Scheduling sheet tabs (current week only — Keith's legacy entries) ──
    // Only run this pass if we're looking at the current week (reqWeekStart is null or
    // matches the current weekDateRange). Skipped entirely for future weeks.
    var isCurrentWeek = !reqWeekStart || reqWeekStart === weekDates[0];
    if (isCurrentWeek) {
```

Delete from that comment all the way through the closing `}` of the
`if (isCurrentWeek)` block (including the inner try/catch). The block ends
just before the tech enrichment section (the line starting with
`// Enrich techs with badge...`).

Also delete the `DA_SCHEDULE_SHEET_URL` variable usage comment above the
function if one exists referencing the sheet tabs.

After deletion, `getWeekSchedule` should flow directly from the
DQ primary read block into the tech enrichment block, with nothing in between.

---

## DEPLOYMENT

After both changes are made:

### ScheduleMiner.js — deploy via root clasp:
```
clasp push --force
clasp deploy --deploymentId AKfycbyFgHHDrZm1NZBG2iQ3czdeRxSGuvjkqyLkx7OCjdkA5vRBCm3IQ1RAEyrbgVp-Y4xs1g --description "v77 — retire dailyScheduleSheetSync (kill switch)"
```

### DashboardAPI.gs — deploy via dashboard-api clasp:
```
cd dashboard-api
clasp push --force
clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v24 — remove scheduling sheet tab fallback"
```

---

## WHAT TO KEEP UNCHANGED

- Everything else in `ScheduleMiner.js` — do not touch any other function
- `SCHEDULE_SHEET_URL` variable — leave it, harmless
- `DA_SCHEDULE_SHEET_URL` variable in DashboardAPI.gs — leave it, harmless
- The `[Synced from scheduling sheet...]` note-stripping in `rowToJob()` — keep it
- All reconciliation and backfill functions — already marked do-not-run, leave them
- No frontend changes
- No other `.gs` files

---

## VERIFICATION

Write to `AG_DONE.md` with these commands:

1. Kill switch in place:
   `grep -n "RETIRED April 2026" ScheduleMiner.js`

2. `return` is the second line of the function:
   `grep -n -A2 "function dailyScheduleSheetSync" ScheduleMiner.js`

3. Scheduling sheet fallback removed from DashboardAPI.gs:
   `grep -n "SECONDARY: Scheduling sheet" dashboard-api/DashboardAPI.gs`
   (should return nothing — the line is gone)

4. DQ primary read still present:
   `grep -n "PRIMARY: Read DQ col 18" dashboard-api/DashboardAPI.gs`

---

*Generated: April 25, 2026 | APT Central Command — Session 24*
