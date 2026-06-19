# ANTIGRAVITY SPEC — Battle Test Fix Pass
**Source:** TEST_REPORT_2026-05-01.md confirmed failures
**Scope:** 5 frontend-only fixes. No backend changes. No new API actions.
**Priority:** Fix all 5 before any live demo to Robert.

---

## Fix 1 — "Ready to Schedule" tab missing from Dispatch Hub
**Test ID:** 3.1 | **Severity:** HIGH

### Root Cause
`JobQueueTable.tsx` renders two different tab arrays depending on `view` prop.
`live/page.tsx` passes `view="coordination"`, which omits `READY_TO_SCHEDULE`.

### File
`tech-pwa/src/components/dashboard/JobQueueTable.tsx`

### Find this block (coordination tab array, lines ~242–245):
```tsx
? [
    { key: 'ALL'               as StatusTab, label: 'All Coordination' },
    { key: 'NEW'               as StatusTab, label: 'New' },
    { key: 'PTE_REQUIRED'      as StatusTab, label: 'PTE Required' },
    { key: 'AWAITING_APPROVAL' as StatusTab, label: 'Awaiting Approval' },
  ]
```

### Replace with:
```tsx
? [
    { key: 'ALL'               as StatusTab, label: 'All Coordination' },
    { key: 'NEW'               as StatusTab, label: 'New' },
    { key: 'READY_TO_SCHEDULE' as StatusTab, label: 'Ready to Schedule' },
    { key: 'PTE_REQUIRED'      as StatusTab, label: 'PTE Required' },
    { key: 'AWAITING_APPROVAL' as StatusTab, label: 'Awaiting Approval' },
  ]
```

No other changes in this file.

### Verification
1. Open `http://localhost:3001/live`
2. Confirm "Ready to Schedule" tab is visible in the tab bar
3. Click it — confirm APT-3003 (890 Market St) and APT-3004 (350 Hanover St) appear
4. Confirm "All Coordination" tab still shows all 4 active statuses

---

## Fix 2 — URGENT jobs not sorted first in Tech PWA job list
**Test ID:** 11.3 | **Severity:** HIGH

### Root Cause
`jobs/page.tsx:61` does `setJobs(res.jobs ?? [])` — no sort. Jobs render in API return order.

### File
`tech-pwa/src/app/jobs/page.tsx`

### Find this line (inside `loadJobs`, after `if (res.success)`):
```ts
setJobs(res.jobs ?? []);
```

### Replace with:
```ts
const PRIORITY_ORDER: Record<string, number> = {
  '1-URGENT': 0, '2-TURNOVER': 1, '3-PTE-PENDING': 2, '4-STANDARD': 3,
};
setJobs((res.jobs ?? []).slice().sort((a: Job, b: Job) =>
  (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3)
));
```

No other changes in this file.

### Verification
1. Open `http://localhost:3001` in Tech PWA mode (Badge `1`, PIN `1234`)
2. Navigate to `/jobs`
3. Confirm APT-3010 (1-URGENT, 660 Grand Ave) renders above APT-3008 (4-STANDARD, 240 Lakeshore Ave)

---

## Fix 3 — Attestation modal stale closure after Mark Complete
**Test ID:** 11.10 | **Severity:** HIGH

### Root Cause
In `handleMarkComplete`, `activeRecord.recordId` is read inside a `setTimeout` callback
after `setActiveRecord` has been called. This is a stale closure risk. Capture the value
before the async boundary.

### File
`tech-pwa/src/app/job/[jobId]/page.tsx`

### Find this block inside `handleMarkComplete`:
```ts
    if (res.success) {
        if (job) setJob({ ...job, status: "Complete" });
        setActiveRecord({ ...activeRecord, status: "complete", actualHoursWorked: res.actualHoursWorked });
        navigator.vibrate?.([50, 30, 50]);
        setShowCelebration(true);
        setTimeout(() => { 
            setShowCelebration(false); 
            // Post-clockout attestation
            setAttestationRecordId(activeRecord.recordId);
            setShowAttestation(true);
        }, 1800);
    }
```

### Replace with:
```ts
    if (res.success) {
        const recordIdForAttestation = activeRecord.recordId;
        if (job) setJob({ ...job, status: "Complete" });
        setActiveRecord({ ...activeRecord, status: "complete", actualHoursWorked: res.actualHoursWorked });
        navigator.vibrate?.([50, 30, 50]);
        setShowCelebration(true);
        setTimeout(() => {
            setShowCelebration(false);
            setAttestationRecordId(recordIdForAttestation);
            setShowAttestation(true);
        }, 1800);
    }
```

No other changes in this function.

### Verification
1. Log in as Tech (Badge `1`, PIN `1234`)
2. Navigate to `/job/APT-3008`
3. Tap "Initialize Clock In" → confirm shift goes active
4. Tap "Mark as Complete" → confirm green celebration overlay fires
5. After ~2 seconds, confirm attestation bottom sheet appears ("Confirm Your Time")
6. Tap "I Confirm" → confirm redirected to `/jobs`

---

## Fix 4 — Tech PWA /time-off page doesn't exist (redirects to CC2.0 /hr)
**Test ID:** 11.12 | **Severity:** HIGH

### Root Cause
`tech-pwa/src/app/time-off/page.tsx` is `redirect('/hr')`. The Tech PWA time-off page
was never built. The mock API already has `getTimeOffBalance` and `requestTimeOff` wired.

### File to replace
`tech-pwa/src/app/time-off/page.tsx`

### Delete the entire current content:
```ts
import { redirect } from 'next/navigation';

export default function TimeOffPage() {
  redirect('/hr');
}
```

### Replace with this complete page:
```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle, ChevronLeft, AlertCircle } from "lucide-react";
import { apiGet, apiCall } from "@/lib/syncQueue";
import { getSession } from "@/lib/auth";
import { useToast } from "@/context/ToastContext";

type RequestType = 'sick' | 'vacation' | 'personal';

interface Balance {
  accrued: number;
  used: number;
  available: number;
}

interface TimeOffRequest {
  requestId: string;
  type: RequestType;
  startDate: string;
  endDate: string;
  notes: string;
  status: 'Pending' | 'Approved' | 'Denied';
  submittedAt: string;
}

export default function TimeOffPage() {
  const router = useRouter();
  const session = getSession();
  const { toast } = useToast();

  const [sickBalance, setSickBalance]     = useState<Balance | null>(null);
  const [vacBalance, setVacBalance]       = useState<Balance | null>(null);
  const [history, setHistory]             = useState<TimeOffRequest[]>([]);
  const [loading, setLoading]             = useState(true);

  const [type, setType]         = useState<RequestType>('sick');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate]     = useState('');
  const [notes, setNotes]         = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  useEffect(() => {
    if (!session) { router.replace('/login'); return; }
    async function load() {
      const [balRes, histRes] = await Promise.all([
        apiGet('getTimeOffBalance'),
        apiGet('getTimeOffHistory'),
      ]);
      if (balRes.success) {
        setSickBalance(balRes.sick ?? null);
        setVacBalance(balRes.vacation ?? null);
      }
      if (histRes.success) setHistory(histRes.requests ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;
    setSubmitting(true);
    const res = await apiCall('requestTimeOff', {
      type,
      startDate,
      endDate,
      notes,
      employeeId: session?.employeeId,
    });
    if (res.success) {
      setSubmitted(true);
      setStartDate(''); setEndDate(''); setNotes('');
      toast.success('Time off request submitted');
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      toast.error('Submission failed — try again');
    }
    setSubmitting(false);
  };

  const TYPE_LABELS: Record<RequestType, string> = {
    sick: 'Sick Leave', vacation: 'Vacation', personal: 'Personal',
  };

  const STATUS_STYLE: Record<string, string> = {
    'Pending':  'bg-amber-500/20 text-amber-400',
    'Approved': 'bg-emerald-500/20 text-emerald-400',
    'Denied':   'bg-red-500/20 text-red-400',
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      <header className="px-6 pt-8 pb-4 flex items-center gap-4">
        <button onClick={() => router.push('/jobs')}
          className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-white transition-all active:scale-90">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-black text-[var(--text-primary)] tracking-tight">Time Off</h1>
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Request & Balance</p>
        </div>
      </header>

      <main className="px-6 space-y-8">
        {/* Balance Cards */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 animate-pulse">
            <div className="h-24 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)]" />
            <div className="h-24 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Sick Leave', bal: sickBalance, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
              { label: 'Vacation',   bal: vacBalance,  color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            ].map(({ label, bal, color, bg }) => (
              <div key={label} className={`rounded-2xl border p-5 space-y-1 ${bg}`}>
                <p className={`text-[9px] font-black uppercase tracking-widest ${color}`}>{label}</p>
                <p className={`text-3xl font-black tracking-tight ${color}`}>{bal?.available ?? 0}<span className="text-sm font-bold ml-1">h</span></p>
                <p className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-wider">
                  {bal?.accrued ?? 0}h accrued · {bal?.used ?? 0}h used
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Sick leave auto-approve notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/15 text-[10px] font-bold text-blue-400 uppercase tracking-wide">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          <span>Sick leave requests are auto-approved per California law. No manager approval required.</span>
        </div>

        {/* Request Form */}
        <section className="space-y-4">
          <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.3em]">New Request</p>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 gap-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle size={28} className="text-emerald-400" />
                </div>
                <p className="text-base font-black text-[var(--text-primary)]">Request Submitted</p>
                <p className="text-xs text-[var(--text-muted)]">Ana will review and respond.</p>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-6 space-y-5">

                {/* Type selector */}
                <div className="flex gap-2">
                  {(['sick', 'vacation', 'personal'] as RequestType[]).map(t => (
                    <button type="button" key={t}
                      onClick={() => setType(t)}
                      className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                        type === t
                          ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                          : 'bg-[var(--bg-primary)] border-[var(--border-subtle)] text-[var(--text-muted)]'
                      }`}>
                      {TYPE_LABELS[t]}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar size={10} /> Start Date
                    </label>
                    <input required type="date" value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
                      <Clock size={10} /> End Date
                    </label>
                    <input required type="date" value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Notes (Optional)</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)}
                    rows={3} placeholder="Any context for Ana or Keith..."
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-medium text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-all resize-none" />
                </div>

                <button type="submit" disabled={submitting || !startDate || !endDate}
                  className="w-full py-4 bg-[var(--accent)] text-white font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-lg shadow-[var(--accent)]/20 disabled:opacity-30 active:scale-95 transition-all">
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </section>

        {/* Request History */}
        {history.length > 0 && (
          <section className="space-y-4">
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Past Requests</p>
            <div className="space-y-3">
              {history.map((req) => (
                <div key={req.requestId}
                  className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-black text-[var(--text-primary)]">{TYPE_LABELS[req.type]}</p>
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                      {req.startDate} → {req.endDate}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shrink-0 ${STATUS_STYLE[req.status] ?? 'bg-slate-500/20 text-slate-400'}`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
```

### What to keep unchanged
- `tech-pwa/src/app/hr/page.tsx` — unchanged, this is the CC2.0 HR page for office staff
- No changes to any API files
- No changes to routing or layout config

### Verification
1. Log in as Tech (Badge `1`, PIN `1234`)
2. Navigate to `/time-off`
3. Confirm balance cards render: Sick 16h available, Vacation 40h available
4. Confirm form renders with type selector (Sick Leave / Vacation / Personal) and date fields
5. Fill in start date, end date, submit
6. Confirm success state ("Request Submitted") appears
7. Confirm CA sick leave notice is visible

---

## Fix 5 — Clock In button allows double-tap (duplicate time records)
**Test ID:** 14.5 | **Severity:** CRITICAL

### Root Cause
Clock In button in `job/[jobId]/page.tsx` has no `disabled` or loading state.
Rapid double-tap fires two `clockIn` API calls → duplicate time records → PAGA exposure.

### File
`tech-pwa/src/app/job/[jobId]/page.tsx`

### Step 1 — Add clockingIn state variable
Find the existing state declarations near the top of the component (after `const [locationStatus, setLocationStatus] = useState<string | null>(null);`):

**Find:**
```ts
  const [showCelebration, setShowCelebration] = useState(false);
```

**Add this line immediately before it:**
```ts
  const [clockingIn, setClockingIn] = useState(false);
```

### Step 2 — Gate handleClockIn
**Find:**
```ts
  const handleClockIn = async () => {
    setLocationStatus("Locking Position...");
    const coords = await getCurrentPosition();
```

**Replace with:**
```ts
  const handleClockIn = async () => {
    if (clockingIn) return;
    setClockingIn(true);
    setLocationStatus("Locking Position...");
    const coords = await getCurrentPosition();
```

Then find the end of `handleClockIn` — the last line of the `if (res.success)` block — and add `setClockingIn(false)` after. The full function after the change:

```ts
  const handleClockIn = async () => {
    if (clockingIn) return;
    setClockingIn(true);
    setLocationStatus("Locking Position...");
    const coords = await getCurrentPosition();
    const res = await apiCall("clockIn", { jobId: job?.jobId, lat: coords?.lat, lng: coords?.lng });
    if (res.success) {
      toast.success("Clocked In");
      if (!coords) setLocationStatus("Location Detached (GPS Unavailable)");
      else setLocationStatus(null);
      if (job) setJob({ ...job, status: "In Progress" });
      const session = getSession();
      setActiveRecord({
        recordId: res.recordId,
        jobId: job!.jobId,
        techId: session?.techId || 'MOCK-TECH-ID',
        clockInTime: res.clockInTime || new Date().toISOString(),
        clockOutTime: null,
        breakStart: null,
        breakEnd: null,
        breakDurationMinutes: 0,
        actualHoursWorked: null,
        status: "active"
      });
      navigator.vibrate?.(10);
    }
    setClockingIn(false);
  };
```

### Step 3 — Disable the button
**Find:**
```tsx
          {!activeRecord && job.status !== "Complete" && (
            <button onClick={handleClockIn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] rounded-[2rem] py-6 text-base transition-all active:scale-[0.96] shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
              Initialize Clock In
            </button>
          )}
```

**Replace with:**
```tsx
          {!activeRecord && job.status !== "Complete" && (
            <button onClick={handleClockIn} disabled={clockingIn}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-[0.2em] rounded-[2rem] py-6 text-base transition-all active:scale-[0.96] shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
              {clockingIn ? "Initializing..." : "Initialize Clock In"}
            </button>
          )}
```

No other changes in this file.

### Verification
1. Navigate to `/job/APT-3008` in Tech PWA
2. Tap "Initialize Clock In" rapidly twice
3. Confirm button shows "Initializing..." after first tap and is visually disabled
4. Confirm only ONE clock-in toast fires
5. Confirm `activeRecord` has a single `recordId` (no duplicate)

---

## Fix 6 — Sidebar navigation labels are wrong
**Severity:** HIGH — Robert will be confused by mis-labeled pages

### Root Cause
`AppSidebar.tsx` has the DnD scheduling tool labeled "Workorder Schedule" and the
read-only weekly view labeled "Schedule." These should be swapped.

### File
`tech-pwa/src/components/dashboard/AppSidebar.tsx`

### Find these two lines in the NAV_ITEMS array (lines ~32–33):
```ts
  { id: 'schedule',        label: 'Workorder Schedule', icon: Calendar,        href: '/schedule',        module: 'dispatch'  as keyof StaffPermissions },
  { id: 'weekly-schedule', label: 'Schedule',           icon: CalendarDays,    href: '/weekly-schedule', module: 'people'    as keyof StaffPermissions },
```

### Replace with:
```ts
  { id: 'schedule',        label: 'Ready To Schedule',  icon: Calendar,        href: '/schedule',        module: 'dispatch'  as keyof StaffPermissions },
  { id: 'weekly-schedule', label: 'Workorder Schedule', icon: CalendarDays,    href: '/weekly-schedule', module: 'people'    as keyof StaffPermissions },
```

No other changes in this file.

### Verification
1. Open `http://localhost:3001/live`
2. Confirm sidebar shows "Ready To Schedule" linking to `/schedule`
3. Confirm sidebar shows "Workorder Schedule" linking to `/weekly-schedule`
4. Click "Ready To Schedule" — confirm DnD scheduling grid loads
5. Click "Workorder Schedule" — confirm read-only weekly grid loads

---

## Fix 7 — DnD scheduling does not propagate to Workorder Schedule view
**Severity:** CRITICAL — This is the core scheduling workflow. Robert schedules a job
in "Ready To Schedule," but it never appears in "Workorder Schedule."

### What must happen end-to-end:
1. Robert drags an unscheduled job onto a tech/date in `/schedule`
2. `updateJob` fires with `{ jobId, assignedTech, scheduledDate, scheduledTime, status: 'Scheduled' }`
3. Job disappears from the `/live` coordination feed (status = Scheduled → filtered out by existing logic ✓)
4. Robert opens "Workorder Schedule" (`/weekly-schedule`) → job appears under the tech for that date

### Root cause
The mock `updateJob` handler (added by AG) mutates the `MOCK_JOBS` array. The
`buildMockWeekSchedule()` function reads from `MOCK_JOBS`. This chain SHOULD work in
mock — but needs explicit verification and one guard: the `updateJob` payload from the
DnD component must include `assignedTech` in `"Name #Badge"` format (e.g.
`"Salvador Cabrera #101"`) so `buildMockWeekSchedule()` can split it correctly.

### What to verify BEFORE touching any code
Open `tech-pwa/src/app/schedule/page.tsx` and find the `updateJob` call site.
Confirm the payload shape sent on a DnD drop. Specifically: what value is passed for
`assignedTech`? Is it `"Name #Badge"` format or just `"Name"`?

### If assignedTech is name-only (e.g. `"Salvador Cabrera"`):
`buildMockWeekSchedule()` will try to find `"Salvador Cabrera"` in the `byTech` map
(which is keyed by name). `split(' #')[0]` on a name-only string returns the full name,
so this should still work. No change needed.

### If assignedTech is full format (e.g. `"Salvador Cabrera #101"`):
`split(' #')[0]` = `"Salvador Cabrera"` — also correct. No change needed.

### The actual fix
In `tech-pwa/src/lib/dashboard-api.ts`, the existing `updateJob` mock handler
(added by AG) correctly mutates `MOCK_JOBS`. No change needed there.

**The required change is a navigation/refresh trigger on the Workorder Schedule page.**
After DnD scheduling, Robert must navigate to `/weekly-schedule` and the page must
call `fetchSchedule()` on mount (already does this via `useEffect` on `weekDates[0]`).

**Verify this path works:**
1. Open `/schedule` (DnD grid)
2. Drag APT-3003 (890 Market St, Ready to Schedule) onto Salvador Cabrera / today's date
3. Confirm the job appears in the grid at that slot
4. Navigate to `/weekly-schedule` ("Workorder Schedule")
5. Confirm APT-3003 appears under Salvador Cabrera for today

**If step 5 fails** (job not shown in Workorder Schedule after navigation):
The issue is that `buildMockWeekSchedule()` in `dashboard-api.ts` is calling
`new Date(Date.now() + 86400000).toISOString().split('T')[0]` for `_TODAY` at module
load time — meaning the date constants are frozen at import time. This is fine.
The real issue would be that the `updateJob` mock mutation isn't persisting across
the `dashboardRequest('getWeekSchedule')` call.

**If step 5 fails, apply this fix to `tech-pwa/src/lib/dashboard-api.ts`:**

Find the `getWeekSchedule` case in the mock switch:
```ts
      case 'getWeekSchedule':
        data.byTech = buildMockWeekSchedule();
        data.techs = MOCK_TECH_ROSTER;
        data.unassigned = MOCK_JOBS.filter(j => !j.assignedTech && j.scheduledDate);
        break;
```

This already calls `buildMockWeekSchedule()` which reads from `MOCK_JOBS`. If this
is not reflecting AG's `updateJob` mutation, the issue is that `MOCK_JOBS` is declared
as `const` and AG's handler does `MOCK_JOBS[idx] = {...}`. This IS a valid mutation of
a const array in JS. Verify in browser devtools:
- After DnD drop, open console: `dashboardRequest('getDispatchData')` and confirm
  APT-3003's `assignedTech` and `scheduledDate` fields are updated.

### Verification checklist (must confirm ALL before marking PASS)
- [ ] 7.1 DnD drop: drag APT-3003 to Salvador / today → job appears in DnD grid slot
- [ ] 7.2 Status change: APT-3003 status becomes "Scheduled" (visible in modal)
- [ ] 7.3 Coordination feed: APT-3003 no longer appears in `/live` ALL Coordination tab
- [ ] 7.4 Workorder Schedule: navigate to `/weekly-schedule` → APT-3003 appears under Salvador for today
- [ ] 7.5 Tech PWA: log in as Badge 1 (Salvador mock) → APT-3003 appears in `/jobs` list

---

## What Must NOT Be Changed
- `live/page.tsx` — `view="coordination"` is correct, no change needed
- `tech-pwa/src/app/hr/page.tsx` — CC2.0 HR page for office staff, untouched
- All `.gs` files — no backend changes needed for any of these fixes

---

## After All Fixes — Run TypeScript Check
```
cd tech-pwa && npx tsc --noEmit
```
Zero errors required before committing.
