# SENTINEL EXEMPLARS — PASS vs FAIL
Project: APT Central Command

---

## EXEMPLAR 1: SPEC GENERATION

### ✅ PASS — Correct level of detail (based on ANTIGRAVITY_QUEUE_TAB_SPEC.md)

```
## What to build
Single-layer status tab bar in `tech-pwa/src/components/dashboard/JobQueueTable.tsx`.

## Exact tabs (in order)
[ ALL ] [ NEW ] [ READY TO SCHEDULE ] [ PTE REQUIRED ] [ SCHEDULED ] [ COMPLETE ]

## Filter logic (exact TypeScript)
const filteredJobs = useMemo(() => {
  const base = showArchived ? jobs : jobs.filter(j => j.status !== 'Archived');
  if (activeTab === 'ALL') return base;
  if (activeTab === 'NEW') return base.filter(j => j.status === 'New');
  if (activeTab === 'READY') return base.filter(j => j.status === 'Ready to Schedule');
  if (activeTab === 'PTE') return base.filter(j => j.status === 'PTE Required');
  if (activeTab === 'SCHEDULED') return base.filter(j => j.status === 'Scheduled');
  if (activeTab === 'COMPLETE') return base.filter(j => j.status === 'Complete');
  return base;
}, [jobs, activeTab, showArchived]);

## What NOT to change
- Do not touch the job card rendering inside the table rows
- Do not add a second row of type-based filter tabs
- Do not modify JobDetailModal.tsx

## Verification steps
1. Log in as dispatch role
2. Confirm tabs render in the exact order above
3. Click each tab — confirm jobs filter correctly
4. Confirm Archived jobs hidden unless "Show Archived" toggled

## Quality gate
Run `npx tsc --noEmit` in tech-pwa/ — must pass with 0 errors.
```

### ❌ FAIL — Vague, prose-only, no code

```
Update the dispatch queue to have better tabs. The tabs should show different job statuses.
Make it look clean and match the dark design. Add filtering functionality.
```

**Why it fails:** No file paths, no TypeScript, no JSX, no verification steps, no RBAC, Antigravity will freelance on status names and produce regressions.

---

## EXEMPLAR 2: BACKEND SPEC

### ✅ PASS — Correct DashboardAPI.gs spec

```
## New action: getJobComments

File: `dashboard-api/DashboardAPI.gs`

Add to switch(action) in doPost():
  case 'getJobComments': return handleGetJobComments(payload);

New function:
function handleGetJobComments(payload) {
  const { leadId } = payload;
  if (!leadId) return jsonResponse({ success: false, error: 'leadId required' });
  const ss = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
  const sheet = ss.getSheetByName('JobComments');
  if (!sheet) return jsonResponse({ success: true, data: [] });
  const rows = sheet.getDataRange().getValues();
  const comments = rows.slice(1)
    .filter(r => r[0] === leadId)
    .map(r => ({ leadId: r[0], author: r[1], role: r[2], body: r[3], timestamp: r[4] }));
  return jsonResponse({ success: true, data: comments });
}

Sheet schema (JobComments tab — create if absent):
Col A=Lead ID, Col B=Author Name, Col C=Role, Col D=Body, Col E=Timestamp (ISO)
```

### ❌ FAIL — Uses getActiveSpreadsheet, no error handling, magic indices

```
function getComments(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rows = ss.getSheetByName('Comments').getDataRange().getValues();
  return rows.filter(r => r[0] === payload.id).map(r => ({ body: r[3] }));
}
```

**Why it fails:** `getActiveSpreadsheet()` returns null in standalone scripts (DashboardAPI is standalone). No error handling. Magic index `r[3]` instead of named column constant. Missing from doPost() switch.

---

## EXEMPLAR 3: HISTORICAL CORRECTIONS (what went wrong and the correct pattern)

### ❌ FAIL — Antigravity moved .gs files (Session 7, April 18 2026)
- **Error:** Antigravity moved `TechPWA.gs`, `Code.js`, `DashboardAPI.gs` to `legacy_gas_archive/`
- **Impact:** Broke all clasp deployments — `skipSubdirectories: true` in `.clasp.json` means .gs files must be at root
- **Correct Pattern:** .gs/.js/.html files at repo ROOT are sacred. Never move them.

### ❌ FAIL — Antigravity freelanced on status values (Session 14, April 21 2026)
- **Error:** Antigravity introduced `"open"`, `"pte_pending"`, `"approval_needed"` as status values instead of the canonical set
- **Impact:** Status tabs broke, jobs disappeared from queue
- **Correct Pattern:** Only ever use: `New | Ready to Schedule | PTE Required | Awaiting Approval | Scheduled | In Progress | Complete | Archived`

### ❌ FAIL — Claude Code implemented instead of speccing (Session 20, April 23 2026)
- **Error:** Claude Code wrote new API endpoints directly instead of handing to Antigravity via spec
- **Impact:** Token waste, violated division of labor, set wrong precedent
- **Correct Pattern:** ANY new function in .gs files → write a spec → Antigravity implements

### ❌ FAIL — Spec had no "what NOT to change" section (multiple sessions)
- **Error:** Spec described new features without calling out what to preserve
- **Impact:** Antigravity "improved" working components adjacent to the spec scope, introduced regressions
- **Correct Pattern:** Every spec must explicitly list: "Do not modify [FileX], [ComponentY], [FunctionZ]"
