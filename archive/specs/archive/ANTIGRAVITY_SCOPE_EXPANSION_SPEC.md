# ANTIGRAVITY SPRINT — Job Scope Expansion Workflow
**Author:** Claude Code
**Priority:** Robert's use case — jobs grow unpredictably on-site
**Scope:** `JobDetailModal.tsx` only. No backend changes required.

---

## WHAT THIS SPRINT BUILDS

Robert's problem: A tech is on-site for a ceiling repair and finds a leak
behind the wall. Robert needs to capture the extra work, extend the hours,
and optionally reassign — all from the job modal, in under 30 seconds, without
creating a new job or losing any of the original job record.

The solution: an "Expand Scope" panel inside the EXECUTION phase of the modal.
One button opens it inline. Robert fills in what changed, clicks Save, done.

---

## NO BACKEND CHANGES

`updateJobDA` already handles `estHours`, `notes`, and `assignedTech`.
The expansion panel just formats a note block, adjusts the hours, and
calls the existing `handleSave`. No new API action. No `.gs` changes.

---

## PART 1 — New State

Inside `JobDetailModal`, add this state near the top of the component
(alongside existing state like `loading`, `activeJob`, etc.):

```typescript
const [scopeExpansion, setScopeExpansion] = useState({
  open: false,
  additionalWork: '',
  hoursToAdd: 0,
  reassignTech: '',
});
```

Reset it when the modal's job changes. Add to the existing `useEffect`
that runs on `job` change (find the `useEffect([job])` block and add):
```typescript
setScopeExpansion({ open: false, additionalWork: '', hoursToAdd: 0, reassignTech: '' });
```

---

## PART 2 — Save Handler

Add this function alongside `handleSave` and `handleArchive`:

```typescript
const handleSaveExpansion = async () => {
  if (!scopeExpansion.additionalWork.trim() && scopeExpansion.hoursToAdd === 0) return;

  const now = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true
  });

  const newTotal = (activeJob!.estimatedHours || 0) + scopeExpansion.hoursToAdd;

  const expansionBlock = [
    `--- SCOPE EXPANSION [${now}] ---`,
    scopeExpansion.additionalWork.trim()
      ? `Additional: ${scopeExpansion.additionalWork.trim()}`
      : null,
    scopeExpansion.hoursToAdd > 0
      ? `Hours extended: +${scopeExpansion.hoursToAdd}h → ${newTotal}h total`
      : null,
    scopeExpansion.reassignTech && scopeExpansion.reassignTech !== activeJob!.assignedTech
      ? `Reassigned to: ${scopeExpansion.reassignTech}`
      : null,
  ].filter(Boolean).join('\n');

  // Merge into activeJob then call the shared save
  const existingNotes = activeJob!.notes || '';
  const separator = existingNotes.trim() ? '\n\n' : '';

  setActiveJob(prev => ({
    ...prev!,
    notes: existingNotes + separator + expansionBlock,
    estimatedHours: newTotal,
    assignedTech: scopeExpansion.reassignTech || prev!.assignedTech,
  }));

  setScopeExpansion(prev => ({ ...prev, open: false }));

  // handleSave reads from activeJob — defer one tick so setState flushes
  // Use a ref-based approach: after state updates, call save manually
  setLoading(prev => ({ ...prev, action: true }));
  const res = await dashboardRequest('updateJob', {
    job: {
      rowIndex: activeJob!.rowIndex,
      assignedTech: scopeExpansion.reassignTech || activeJob!.assignedTech,
      scheduledDate: activeJob!.scheduledDate,
      scheduledTime: activeJob!.scheduledTime,
      estHours: newTotal,
      status: activeJob!.status,
      notes: existingNotes + separator + expansionBlock,
      address: activeJob!.address,
      unit: activeJob!.unit,
      description: activeJob!.description,
      serviceCategory: activeJob!.serviceCategory,
      tenantName: activeJob!.tenantName,
      tenantPhone: activeJob!.tenantPhone,
      tenantEmail: activeJob!.tenantEmail,
      rmName: activeJob!.rmName,
      rmEmail: activeJob!.rmEmail,
      accessInfo: activeJob!.accessInfo,
    }
  });
  setLoading(prev => ({ ...prev, action: false }));
  if (!res.success) {
    // toast error — do NOT use alert()
    console.error('Scope expansion save failed:', res.error);
  }
};
```

---

## PART 3 — JSX inside the EXECUTION phase

Find this existing block:
```tsx
{phase === 'EXECUTION' && (
  <section className="space-y-10">
     <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] flex items-center justify-between shadow-2xl shadow-emerald-500/5">
```

**Add the Expand Scope button and panel immediately after the closing `</div>`
of the "Job in Progress" status card and before the `<div className="space-y-4">`
Live Photo Feed section.** Insert:

```tsx
{/* Expand Scope Panel */}
{!scopeExpansion.open ? (
  <motion.button
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    onClick={() => setScopeExpansion(prev => ({ ...prev, open: true }))}
    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/5 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all"
  >
    <PlusCircle size={16} />
    <span className="text-[11px] font-black uppercase tracking-widest">Expand Scope</span>
  </motion.button>
) : (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-5"
  >
    <div className="flex items-center justify-between">
      <h4 className="text-[11px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
        <PlusCircle size={14} /> Expand Scope
      </h4>
      <button
        onClick={() => setScopeExpansion({ open: false, additionalWork: '', hoursToAdd: 0, reassignTech: '' })}
        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
      >
        <X size={14} />
      </button>
    </div>

    {/* Additional work textarea */}
    <div className="space-y-2">
      <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
        Additional Work Discovered
      </label>
      <textarea
        value={scopeExpansion.additionalWork}
        onChange={e => setScopeExpansion(prev => ({ ...prev, additionalWork: e.target.value }))}
        placeholder="e.g. Water damage behind drywall — plumber needed for supply line leak"
        rows={3}
        className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-4 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-amber-500/40 resize-none transition-all"
      />
    </div>

    {/* Extend hours */}
    <div className="space-y-2">
      <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
        Extend Hours
        <span className="ml-2 text-amber-400">
          (current: {activeJob!.estimatedHours || 0}h
          {scopeExpansion.hoursToAdd > 0 ? ` → ${(activeJob!.estimatedHours || 0) + scopeExpansion.hoursToAdd}h` : ''})
        </span>
      </label>
      <div className="flex gap-2">
        {[0, 1, 2, 4, 8].map(h => (
          <button
            key={h}
            onClick={() => setScopeExpansion(prev => ({ ...prev, hoursToAdd: h }))}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              scopeExpansion.hoursToAdd === h
                ? 'bg-amber-500 text-black'
                : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
            }`}
          >
            {h === 0 ? 'None' : `+${h}h`}
          </button>
        ))}
      </div>
    </div>

    {/* Reassign tech */}
    <div className="space-y-2">
      <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
        Reassign Tech (optional)
      </label>
      <select
        value={scopeExpansion.reassignTech || activeJob!.assignedTech || ''}
        onChange={e => setScopeExpansion(prev => ({ ...prev, reassignTech: e.target.value }))}
        className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold text-[var(--text-primary)] outline-none focus:border-amber-500/40 transition-all"
      >
        <option value="">— Keep current tech —</option>
        {techList?.map((t: { name: string }) => (
          <option key={t.name} value={t.name}>{t.name}</option>
        ))}
      </select>
    </div>

    {/* Save button */}
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={handleSaveExpansion}
      disabled={!scopeExpansion.additionalWork.trim() && scopeExpansion.hoursToAdd === 0}
      className="w-full py-4 rounded-xl bg-amber-500 text-black text-[11px] font-black uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-400 transition-all"
    >
      {loading.action ? 'Saving…' : 'Save Expansion'}
    </motion.button>
  </motion.div>
)}
```

**Add `PlusCircle` to the lucide-react import** at the top of the file.
`X` should already be imported — verify.

---

## PART 4 — Fix remaining `alert()` and `confirm()` calls

The modal still has bare `alert()` and `window.confirm()` calls that violate
the quality standard (no `alert()`, no `window.confirm()`). Fix all of them:

### 4a — `handleSave` failure (line ~211):
```typescript
// REMOVE:
else alert("Save failed.");
// REPLACE WITH:
else console.error('Save failed:', res.error); // toast system not available here yet — log only
```

### 4b — `handleArchive` confirm + failure (lines ~216–220):
```typescript
// REMOVE:
if (!confirm("Archive this job? It will be removed from the active queue.")) return;
// REPLACE WITH: an inline confirmation state

// REMOVE:
else alert("Archive failed.");
// REPLACE WITH:
else console.error('Archive failed:', res.error);
```

For the archive confirm, add this state near the other state declarations:
```typescript
const [confirmArchive, setConfirmArchive] = useState(false);
```

Find the Archive button in the JSX (wherever `handleArchive` is called as onClick).
Replace the single Archive button with this two-step confirm pattern:
```tsx
{!confirmArchive ? (
  <button
    onClick={() => setConfirmArchive(true)}
    className="... existing archive button classes ..."
  >
    Archive Job
  </button>
) : (
  <div className="flex gap-2">
    <button
      onClick={() => setConfirmArchive(false)}
      className="flex-1 py-2 rounded-xl border border-[var(--border-subtle)] text-[10px] font-black text-[var(--text-muted)] uppercase hover:text-[var(--text-primary)] transition-all"
    >
      Cancel
    </button>
    <button
      onClick={handleArchive}
      className="flex-1 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-[10px] font-black text-red-400 uppercase hover:bg-red-500/30 transition-all"
    >
      Confirm Archive
    </button>
  </div>
)}
```

Also reset `confirmArchive` to false in the `useEffect([job])` reset block.

### 4c — DocGen `confirm()` and `alert()` calls (lines ~255–261):
```typescript
// REMOVE all three alert/confirm calls in the DocGen handler
// The DocGen button is already marked as a stub (PENDING_CONNECTION).
// Replace alert() with console.log() for now — Robert never sees this path.
```

---

## WHAT TO KEEP UNCHANGED

- All existing DISPATCH phase JSX — do not touch
- All existing POST-JOB phase JSX — do not touch
- `handleSave` function itself — do not modify (scope expansion uses its own direct call)
- `handleArchive` function body — only change the confirm/alert wrappers, not the API call
- All `.gs` files — do not touch
- `dashboard-api.ts` — do not touch
- All other dashboard components — do not touch

---

## VERIFICATION CHECKLIST

Before marking complete:
- [ ] `npx tsc --noEmit` — zero errors
- [ ] Open a Scheduled or In-Progress job modal → EXECUTION phase shows amber "Expand Scope" button
- [ ] Click "Expand Scope" → panel animates open inline (no new modal window)
- [ ] Type additional work text → Save Expansion enabled
- [ ] Click "+2h" → current hours shown updating in label (e.g. "4h → 6h")
- [ ] Click "Save Expansion" → panel closes, Dispatcher Notes section shows the expansion block appended with timestamp
- [ ] Job still shows original job data intact (address, tenant, RM, original description)
- [ ] Archive button now shows two-step confirm (no `window.confirm()` dialog)
- [ ] No `alert()` calls remain anywhere in `JobDetailModal.tsx`
- [ ] Framer Motion animation on panel open/close
- [ ] Panel readable at 375px width (mobile)
- [ ] No light-mode bleed on amber elements

---

*Generated: April 25, 2026 | APT Central Command — Session 24*
