# ANTIGRAVITY SPRINT — Dispatcher Feedback System
**Author:** Claude Code
**Priority:** Medium — close-out session 24
**Scope:** New `/feedback` page in CC2.0. New backend actions in `DashboardAPI.gs`. New "Dispatcher Feedback" sheet tab.
**Files to touch:** `DashboardAPI.gs`, `tech-pwa/src/app/feedback/page.tsx` (new), `tech-pwa/src/app/layout.tsx` or sidebar nav component (add nav item), `tech-pwa/src/lib/dashboard-api.ts` (add types + fetch calls)

---

## WHAT THIS BUILDS

A clean, professional in-system feedback channel for the Dispatch role.
The dispatcher can submit suggestions, bug reports, workflow notes, and questions — all tagged, timestamped, and stored in the system. Management and Admin roles can view all submissions and update their status. No email chains. No lost feedback.

This is also the primary data source for future development prioritization.

---

## SHEET SETUP

### New tab: "Dispatcher Feedback"
Add this tab to the APT Lead Intake Master spreadsheet.

Column map (1-indexed):
```
Col 1  = Timestamp          (ISO string — auto-set on submit)
Col 2  = Category           (Suggestion / Bug Report / Workflow Note / Question)
Col 3  = Subject            (short title, max ~80 chars)
Col 4  = Details            (full text)
Col 5  = Related Job ID     (optional — job rowIndex or address as string)
Col 6  = Status             (New / Reviewed / In Progress / Done)
Col 7  = Admin Notes        (management/admin-only response notes)
Col 8  = Submitted By       (role name — "Dispatch")
```

**Do not add this tab manually.** The `submitFeedback` backend action should auto-create it on first write if absent (use `getSheetByName` + `insertSheet` pattern same as setupPWASheets).

---

## BACKEND — DashboardAPI.gs

Add two new actions to the `doPost` switch block.

### Action: `submitFeedback`

```javascript
case 'submitFeedback':
  return handleSubmitFeedback(body);
```

```javascript
function handleSubmitFeedback(body) {
  try {
    var ss = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
    var sheet = ss.getSheetByName('Dispatcher Feedback');
    if (!sheet) {
      sheet = ss.insertSheet('Dispatcher Feedback');
      sheet.appendRow(['Timestamp','Category','Subject','Details','Related Job ID','Status','Admin Notes','Submitted By']);
    }
    var row = [
      new Date().toISOString(),
      body.category   || 'General',
      body.subject    || '',
      body.details    || '',
      body.relatedJobId || '',
      'New',
      '',
      body.submittedBy || 'Dispatch',
    ];
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: e.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Action: `getFeedback`

```javascript
case 'getFeedback':
  return handleGetFeedback(body);
```

```javascript
function handleGetFeedback(body) {
  try {
    var ss = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
    var sheet = ss.getSheetByName('Dispatcher Feedback');
    if (!sheet) return ContentService.createTextOutput(JSON.stringify({ success: true, items: [] }))
      .setMimeType(ContentService.MimeType.JSON);

    var rows = sheet.getDataRange().getValues();
    var items = [];
    for (var i = 1; i < rows.length; i++) {
      var r = rows[i];
      items.push({
        rowIndex:     i + 1,
        timestamp:    r[0],
        category:     r[1],
        subject:      r[2],
        details:      r[3],
        relatedJobId: r[4],
        status:       r[5],
        adminNotes:   r[6],
        submittedBy:  r[7],
      });
    }
    // Dispatch sees all (they only submitted their own — no multi-user auth to filter by).
    // Management/Admin sees all. Sort newest first.
    items.reverse();
    return ContentService.createTextOutput(JSON.stringify({ success: true, items: items }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: e.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Action: `updateFeedbackStatus`

```javascript
case 'updateFeedbackStatus':
  return handleUpdateFeedbackStatus(body);
```

```javascript
function handleUpdateFeedbackStatus(body) {
  try {
    var ss = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
    var sheet = ss.getSheetByName('Dispatcher Feedback');
    if (!sheet || !body.rowIndex) throw new Error('Missing sheet or rowIndex');
    if (body.status)     sheet.getRange(body.rowIndex, 6).setValue(body.status);
    if (body.adminNotes !== undefined) sheet.getRange(body.rowIndex, 7).setValue(body.adminNotes);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: e.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## FRONTEND TYPES — dashboard-api.ts

Add to the types section:

```typescript
export interface FeedbackItem {
  rowIndex: number;
  timestamp: string;
  category: 'Suggestion' | 'Bug Report' | 'Workflow Note' | 'Question';
  subject: string;
  details: string;
  relatedJobId?: string;
  status: 'New' | 'Reviewed' | 'In Progress' | 'Done';
  adminNotes?: string;
  submittedBy: string;
}
```

Add fetch helpers alongside the other `dashboardRequest` calls (or use `dashboardRequest` directly in the page component — either is fine, do not duplicate logic).

---

## FRONTEND — `/feedback` page

**File:** `tech-pwa/src/app/feedback/page.tsx` (new file)

**Route guard:** Visible to all roles that can reach the dispatch dashboard (dispatch, management, admin). Do not show to tech PWA users — this is a CC2.0-only page.

### Layout

Two sections on the page, stacked vertically:

1. **Submit Form** (always visible — dispatch uses this)
2. **Submission History** (shows all past submissions, newest first)

---

### Submit Form

```tsx
// Form state
const [form, setForm] = useState({
  category: 'Suggestion' as FeedbackItem['category'],
  subject: '',
  details: '',
  relatedJobId: '',
});
const [submitting, setSubmitting] = useState(false);
const [submitted, setSubmitted] = useState(false);
```

**Category dropdown options:**
- Suggestion
- Bug Report
- Workflow Note
- Question

**Fields:**
1. Category — `<select>` with the four options above
2. Subject — `<input type="text">` placeholder: "One sentence — what's this about?"
3. Details — `<textarea rows={5}>` placeholder: "Give as much detail as you can. Specific examples are most helpful."
4. Related Job ID — `<input type="text">` placeholder: "Optional — address or job number if relevant" (optional field, labeled clearly as optional)

**Submit button:** "Submit Feedback"
- Disabled when subject or details is empty
- On submit: call `dashboardRequest('submitFeedback', { ...form, submittedBy: 'Dispatch' })`
- On success: show a success state (green checkmark, "Got it — your feedback has been recorded.") and reset the form after 3 seconds

---

### Submission History

Fetched on page load via `dashboardRequest('getFeedback', {})`.

Show as a list of cards, newest first.

**Each card shows:**
- Category badge (color-coded — see below)
- Subject (bold)
- Details (truncated to 3 lines, expand on click)
- Timestamp (relative, e.g. "2 days ago")
- Status badge
- Admin Notes section (only show if `adminNotes` is not empty)

**Category badge colors:**
```
Suggestion    → bg-blue-500/20   text-blue-400   border-blue-500/20
Bug Report    → bg-red-500/20    text-red-400    border-red-500/20
Workflow Note → bg-purple-500/20 text-purple-400 border-purple-500/20
Question      → bg-amber-500/20  text-amber-400  border-amber-500/20
```

**Status badge colors:**
```
New         → bg-[var(--text-muted)]/20   text-[var(--text-muted)]
Reviewed    → bg-blue-500/20              text-blue-400
In Progress → bg-amber-500/20             text-amber-400
Done        → bg-emerald-500/20           text-emerald-400
```

**Admin Notes** (if present):
Show as a subtle inset block below the details, styled like this:
```tsx
<div className="mt-3 px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
  <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Team Response</p>
  <p className="text-xs text-[var(--text-primary)]">{item.adminNotes}</p>
</div>
```

**Management/Admin extra controls:**
If the current user's role is `management` or `admin`, each card also shows:
- A `<select>` to change the status (New / Reviewed / In Progress / Done)
- A small textarea to add/edit admin notes
- A "Save" button — calls `dashboardRequest('updateFeedbackStatus', { rowIndex, status, adminNotes })`

These controls are not shown to the dispatch role (they can only submit and read).

---

### Empty State

If no submissions yet:
```tsx
<div className="flex flex-col items-center justify-center py-20 text-center">
  <MessageSquare size={32} className="text-[var(--text-muted)] mb-4" />
  <p className="text-sm font-bold text-[var(--text-primary)]">No feedback submitted yet</p>
  <p className="text-xs text-[var(--text-muted)] mt-1">Use the form above to share a suggestion or report an issue.</p>
</div>
```

---

### Skeleton Loader

While `getFeedback` is loading, show 3 skeleton cards (same pattern as other pages — pulsing gray blocks).

---

## SIDEBAR NAV

Add a "Feedback" item to the sidebar navigation.

- **Icon:** `MessageSquare` from lucide-react
- **Label:** "Feedback"
- **Route:** `/feedback`
- **Visible to:** dispatch, management, admin (NOT compliance, NOT hr unless also management/admin)
- **Position:** Near the bottom of the nav, above any Settings or profile link

---

## PAGE HEADER

```tsx
<div className="mb-8">
  <h1 className="text-2xl font-black text-[var(--text-primary)]">Feedback</h1>
  <p className="text-sm text-[var(--text-muted)] mt-1">
    Share suggestions, report issues, or leave workflow notes. Your input shapes how this system improves.
  </p>
</div>
```

---

## ANIMATIONS

- Page entrance: `motion.div` with `initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}`
- Submitted success state: `motion.div` with same entrance
- Each history card: stagger entrance (use `variants` with `staggerChildren`)
- Status change save: button has `whileTap={{ scale: 0.97 }}`

---

## WHAT TO KEEP UNCHANGED

- All existing pages and routes — do not touch
- All existing sidebar nav items — only add the new one
- `DashboardAPI.gs` existing actions — add the three new ones, do not modify existing
- All `.gs` files at root — do not touch
- Role system — use existing role/session pattern, do not change it

---

## DEPLOYMENT

After implementation is complete:

### DashboardAPI.gs — deploy via dashboard-api clasp:
```
cd dashboard-api
clasp push --force
clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v25 — dispatcher feedback system"
```

### Tech PWA — Vercel auto-deploys on push to main.

---

## VERIFICATION

1. `/feedback` page loads without errors for dispatch role
2. Submit form: fill all fields, submit → success state shows, resets after 3s
3. Check Google Sheet "Dispatcher Feedback" tab — new row appeared with correct columns
4. Refresh `/feedback` — submission appears in history section with correct badge colors
5. Log in as management role → same cards appear with status dropdown + admin notes textarea
6. Management saves a status change → card updates without page reload (optimistic update OK, or refetch on save — either is fine)
7. `tsc --noEmit` — zero errors
8. Mobile: form readable at 375px, submit button is full-width and min 44px tall

---

*Generated: April 25, 2026 | APT Central Command — Session 24*
