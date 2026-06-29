# QUEUE TAB STRUCTURE — IMPLEMENTATION SPEC
# Replaces the current two-layer filter system on the Live page.
# Read every line. Do not freelance.

---

## WHAT IS WRONG NOW (do not keep any of this)

The current implementation has TWO separate filter layers:

**Layer 1 — in `live/page.tsx`:**
- `activeFilter` state: `'all' | 'needs-action' | 'history'`
- Three buttons: "All", "Needs Action", "History"
- Pre-filters `jobs` into `filteredJobs` before passing to `JobQueueTable`

**Layer 2 — in `JobQueueTable.tsx`:**
- `filterType` state: string, default `'READY TO SCHEDULE'`
- `filterOptions` array: `['ALL', 'READY TO SCHEDULE', 'TURNOVER', 'INSPECTION', 'WORK ORDER', 'NEW INQUIRY']`
- Filter logic mixes status-based and email-type-based matching

Both layers are wrong and must be replaced. There is no two-layer system after this change.

---

## THE CORRECT MODEL

One filter layer. Owned entirely by `JobQueueTable`. Status-based only.
Email type (TURNOVER, INSPECTION, WORK ORDER) is a row badge — NOT a tab.

```
[ ALL ]  [ NEW ]  [ READY TO SCHEDULE ]  [ PTE REQUIRED ]  [ SCHEDULED ]  [ COMPLETE ]
                                                                     [ Show Archived ↗ ]
```

Default active tab: `READY_TO_SCHEDULE`

---

## FILE 1: `src/app/live/page.tsx`

### DELETE these exactly:

**Line 25 — delete this state declaration:**
```typescript
const [activeFilter, setActiveFilter] = useState<'all' | 'needs-action' | 'history'>('all');
```

**Lines 55–63 — delete this computed block:**
```typescript
const filteredJobs = jobs.filter(job => {
  if (activeFilter === 'needs-action') {
    return job.status === 'New' || job.status === 'Ready to Schedule' || job.status === 'Awaiting Approval';
  }
  if (activeFilter === 'history') {
    return job.status === 'Complete' || job.status === 'Archived';
  }
  return job.status !== 'Complete' && job.status !== 'Archived';
});
```

**Lines 81–106 — delete this entire JSX block (the three-button tab group):**
```tsx
<div className="flex p-1 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-subtle)] shadow-inner">
  <button onClick={() => setActiveFilter('all')} ...>All</button>
  <button onClick={() => setActiveFilter('needs-action')} ...>Needs Action</button>
  <button onClick={() => setActiveFilter('history')} ...>History</button>
</div>
```

### CHANGE — line 127:
```typescript
// BEFORE:
<JobQueueTable jobs={filteredJobs} onJobClick={(job) => setSelectedJob(job)} />

// AFTER:
<JobQueueTable jobs={jobs} onJobClick={(job) => setSelectedJob(job)} />
```

That is the only change to `live/page.tsx`. No new state, no new logic.

---

## FILE 2: `src/components/dashboard/JobQueueTable.tsx`

### ADD — new type at top of file (after existing imports):

```typescript
type StatusTab = 'ALL' | 'NEW' | 'READY_TO_SCHEDULE' | 'PTE_REQUIRED' | 'SCHEDULED' | 'COMPLETE';
```

### CHANGE — state declarations inside the component:

```typescript
// REMOVE:
const [filterType, setFilterType] = useState<string>('READY TO SCHEDULE');

// ADD in its place:
const [statusTab, setStatusTab] = useState<StatusTab>('READY_TO_SCHEDULE');
const [showArchived, setShowArchived] = useState(false);
```

### REPLACE — the entire filter logic block in `filteredAndSortedJobs` useMemo:

Replace the current `if (filterType === 'READY TO SCHEDULE') {...} else if (filterType !== 'ALL') {...}` block with:

```typescript
let list = [...jobs];

// Always exclude Archived unless the toggle is on
if (!showArchived) {
  list = list.filter(j => j.status !== 'Archived');
}

// Status tab filter
switch (statusTab) {
  case 'NEW':
    list = list.filter(j => j.status === 'New' || j.status === 'Open');
    break;
  case 'READY_TO_SCHEDULE':
    list = list.filter(j => j.status === 'Ready to Schedule');
    break;
  case 'PTE_REQUIRED':
    list = list.filter(j =>
      j.status === 'PTE Required' ||
      j.status === 'PTE-Pending' ||
      j.status === 'Tenant Contacted'
    );
    break;
  case 'SCHEDULED':
    list = list.filter(j =>
      j.status === 'Scheduled' ||
      j.status === 'In Progress' ||
      j.status === 'Awaiting Approval'
    );
    break;
  case 'COMPLETE':
    list = list.filter(j => j.status === 'Complete');
    break;
  case 'ALL':
  default:
    // no additional filter — Archived already excluded above unless toggled
    break;
}
```

The rest of the sort logic (sortKey, sortDir) stays exactly as-is. Only the filter block changes.

### REMOVE — the `filterOptions` array:

```typescript
// DELETE this line entirely:
const filterOptions = ['ALL', 'READY TO SCHEDULE', 'TURNOVER', 'INSPECTION', 'WORK ORDER', 'NEW INQUIRY'];
```

### REPLACE — the Category Filters JSX block:

Find this block:
```tsx
{/* Category Filters */}
<div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
  {filterOptions.map(opt => (
    <button key={opt} onClick={() => setFilterType(opt)} ...>
      {opt}
    </button>
  ))}
</div>
```

Replace it with:
```tsx
{/* Status Tab Bar */}
<div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
  {(
    [
      { key: 'ALL'               as StatusTab, label: 'All' },
      { key: 'NEW'               as StatusTab, label: 'New' },
      { key: 'READY_TO_SCHEDULE' as StatusTab, label: 'Ready to Schedule' },
      { key: 'PTE_REQUIRED'      as StatusTab, label: 'PTE Required' },
      { key: 'SCHEDULED'         as StatusTab, label: 'Scheduled' },
      { key: 'COMPLETE'          as StatusTab, label: 'Complete' },
    ]
  ).map(tab => (
    <button
      key={tab.key}
      onClick={() => setStatusTab(tab.key)}
      className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
        statusTab === tab.key
          ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20'
          : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
      }`}
    >
      {tab.label}
    </button>
  ))}

  {/* Archived toggle — right side, separated */}
  <div className="ml-auto pl-4 shrink-0 border-l border-[var(--border-subtle)]">
    <button
      onClick={() => setShowArchived(!showArchived)}
      className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
        showArchived
          ? 'bg-[var(--text-muted)]/20 border-[var(--text-muted)]/30 text-[var(--text-muted)]'
          : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-muted)]/40 hover:text-[var(--text-muted)]'
      }`}
    >
      {showArchived ? 'Hide Archived' : 'Show Archived'}
    </button>
  </div>
</div>
```

### ADD — PTE sub-state indicator on job rows:

In the row render block, find where `rmName` is displayed:
```tsx
<div className="flex items-center mt-1.5 text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest">
  <span className="truncate">{job.rmName || "Dispatcher Not Set"}</span>
</div>
```

Replace with:
```tsx
<div className="flex items-center mt-1.5 text-[9px] font-black uppercase tracking-widest gap-2">
  <span className="truncate text-[var(--text-muted)]">{job.rmName || "Dispatcher Not Set"}</span>
  {(job.status === 'PTE Required' || job.status === 'PTE-Pending' || job.status === 'Tenant Contacted') && (
    <span className={`shrink-0 tracking-widest ${
      job.status === 'Tenant Contacted'
        ? 'text-yellow-500/70'
        : 'text-amber-400'
    }`}>
      {job.status === 'Tenant Contacted' ? '↻ WAITING' : '→ CONTACT TENANT'}
    </span>
  )}
</div>
```

Logic:
- `'Tenant Contacted'` → "↻ WAITING" in yellow (we already reached out, waiting for response)
- `'PTE Required'` or `'PTE-Pending'` → "→ CONTACT TENANT" in amber (action needed from Robert)

---

## WHAT TO KEEP UNCHANGED

- All sort logic (sortKey, sortDir, toggleSort, SortIndicator) — untouched
- All row render markup except the rmName sub-line above
- All TYPE_MAP entries — type badges still render on every row
- STATUS_LABELS map — untouched
- The `getStatusColor`, `getPriorityInfo`, `getTypeInfo`, `getAgeColor` helpers — untouched
- The table header (Priority, Type, Address, Category, Assigned Tech, Status, Age columns) — untouched
- The Mode: Table | Kanban toggle in `live/page.tsx` — untouched

---

## VERIFICATION

1. `cd tech-pwa && npm run build` — zero TypeScript errors
2. Live page loads with "Ready to Schedule" tab active by default
3. Clicking each tab shows only jobs in the correct statuses (verify against the switch cases above)
4. "Show Archived" toggle appears right-aligned, shows archived jobs when clicked, hides them when clicked again
5. Jobs in PTE Required status show either "→ CONTACT TENANT" or "↻ WAITING" depending on their status value
6. No "Needs Action", "History", "LAPHAM", "TURNOVER", "INSPECTION", "WORK ORDER", "NEW INQUIRY" tab buttons exist anywhere on the page
7. Type badges (TURNOVER, INSPECTION, WORK ORDER, NEW INQUIRY) still appear on individual job rows — they are NOT gone, just not tabs
