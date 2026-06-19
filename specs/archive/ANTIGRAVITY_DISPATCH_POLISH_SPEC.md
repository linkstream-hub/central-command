# ANTIGRAVITY SPRINT — Dispatch Polish
**Author:** Claude Code
**Scope:** Three targeted improvements to Robert's daily dispatch workflow.
**Files:** `JobQueueTable.tsx`, `JobDetailModal.tsx`
**No backend changes required.**

---

## FEATURE 1 — Job Staleness Badges on Queue Rows

### What it does
Jobs sitting in "New" status for more than 24 hours get a visible age badge
so Robert knows what's been ignored. Over 48 hours gets a "STALE" treatment.

### Data available
Every job already has a `timestamp` field (ISO string — the time the email
was parsed and the job was created). Use that.

### Logic (add this helper near the top of `JobQueueTable.tsx`):
```typescript
function getJobAge(timestamp: string): { hours: number; label: string; level: 'fresh' | 'aging' | 'stale' } {
  if (!timestamp) return { hours: 0, label: '', level: 'fresh' };
  const hours = Math.floor((Date.now() - new Date(timestamp).getTime()) / 3600000);
  if (hours < 24)  return { hours, label: `${hours}h`,       level: 'fresh' };
  if (hours < 48)  return { hours, label: `${Math.floor(hours / 24)}d ${hours % 24}h`, level: 'aging' };
  return           { hours, label: `${Math.floor(hours / 24)}d`,  level: 'stale' };
}
```

### Where to render
In the queue row JSX, find where `priority` or `status` badges are rendered.
Add the age badge **only when `job.status === 'New'`** — other statuses don't
need it. Place it inline with the existing badges:

```tsx
{job.status === 'New' && (() => {
  const age = getJobAge(job.timestamp);
  if (age.level === 'fresh') return null;
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
      age.level === 'stale'
        ? 'bg-red-500/20 text-red-400 border border-red-500/20 animate-pulse'
        : 'bg-amber-500/20 text-amber-400 border border-amber-500/20'
    }`}>
      {age.level === 'stale' ? `STALE · ${age.label}` : age.label}
    </span>
  );
})()}
```

---

## FEATURE 2 — Trainee Solo-Assignment Warning in Tech Picker

### What it does
When Robert selects a tech with rank `T` (Trainee) in the modal, a warning
appears below the tech picker: Trainees cannot be assigned solo — must be
paired with a Captain (C) or Lieutenant (L / L1 / L2). This is a warning,
not a hard block — Robert can override if needed.

### Where the rank data lives
`getTechList` returns `{ name, badge, rank, skills, active }` for each tech.
The modal already loads this into `techList` state. Use `tech.rank` directly.

### Logic
In `JobDetailModal.tsx`, find where the assigned tech is displayed or selected
(the DISPATCH phase tech picker). After the tech selector, add:

```tsx
{(() => {
  const selectedTech = techList?.find((t: { name: string; rank?: string }) => t.name === activeJob.assignedTech);
  if (!selectedTech || selectedTech.rank !== 'T') return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
    >
      <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
      <p className="text-[10px] font-bold text-amber-400 leading-snug">
        Trainee — must be paired with a Captain or Lieutenant. Verify a senior tech is on-site.
      </p>
    </motion.div>
  );
})()}
```

Make sure `AlertTriangle` is imported from `lucide-react` — it likely already is.

---

## FEATURE 3 — "Mark Ready" Quick Action on New Queue Rows

### What it does
New jobs require Robert to open the modal just to flip them to "Ready to
Schedule." Add an inline action button on New rows so he can do it in one
click without opening the modal at all.

### Where to add it
In `JobQueueTable.tsx`, find the row action area (wherever archive, assign,
or other row-level buttons appear). Add a "Ready" button that appears
**only on rows where `job.status === 'New'`**:

```tsx
{job.status === 'New' && (
  <button
    onClick={async (e) => {
      e.stopPropagation(); // don't open the modal
      await dashboardRequest('updateJob', {
        job: {
          rowIndex: job.rowIndex,
          assignedTech: job.assignedTech,
          scheduledDate: job.scheduledDate,
          scheduledTime: job.scheduledTime,
          estHours: job.estimatedHours,
          status: 'Ready to Schedule',
          notes: job.notes,
          address: job.address,
          unit: job.unit,
          description: job.description,
          serviceCategory: job.serviceCategory,
          tenantName: job.tenantName,
          tenantPhone: job.tenantPhone,
          tenantEmail: job.tenantEmail,
          rmName: job.rmName,
          rmEmail: job.rmEmail,
          accessInfo: job.accessInfo,
        }
      });
      // Optimistic: remove from New tab view if currently filtered to New
      // The parent page will reload on next refresh — no need to force reload here
    }}
    className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 hover:bg-[var(--accent)]/20 transition-all whitespace-nowrap"
  >
    Mark Ready
  </button>
)}
```

Import `dashboardRequest` in `JobQueueTable.tsx` if not already present.
Check the existing imports at the top of the file — add if missing:
```typescript
import { dashboardRequest } from '@/lib/dashboard-api';
```

---

## WHAT TO KEEP UNCHANGED

- All existing filter/sort/tab logic in `JobQueueTable.tsx` — do not touch
- All existing modal phases (COORDINATION, DISPATCH, EXECUTION, POST-JOB) — do not touch
- All `.gs` files — do not touch
- `dashboard-api.ts` — do not touch
- All other components — do not touch

---

## VERIFICATION

Write to `AG_DONE.md` with these commands:

1. Staleness helper exists:
   `grep -n "function getJobAge" tech-pwa/src/app/components/dashboard/JobQueueTable.tsx`
   or `grep -rn "function getJobAge" tech-pwa/src/`

2. Trainee warning renders:
   `grep -n "Trainee — must be paired" tech-pwa/src/components/dashboard/JobDetailModal.tsx`

3. Mark Ready button exists:
   `grep -n "Mark Ready" tech-pwa/src/components/dashboard/JobQueueTable.tsx`

4. TypeScript clean:
   `npx tsc --noEmit` — zero errors

---

*Generated: April 25, 2026 | APT Central Command — Session 24*
