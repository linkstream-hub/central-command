# ANTIGRAVITY SESSION 46 — CONSOLIDATED SPEC

---

## 🤖 ANTIGRAVITY: YOUR MANDATE

**You are the implementation engine. Read this file completely, then execute every change exactly as written.**

- Implement all three parts in order: Part 1 (bug fixes) → Part 2 (UI redesign) → Part 3 (Tech PWA workflow)
- Do not deviate from specified file paths, function names, state variable names, or logic
- Do not add features not listed here
- Do not test your own work — testing is a separate sprint
- When complete: run `npx tsc --noEmit`, confirm zero errors, report full `git diff`

---

**Date:** Session 46  
**Hardened by:** Claude Code (session 46)  
**Status:** APPROVED FOR AG

---

## ⚠️ CRITICAL: FILE PATH CORRECTIONS FROM PG DRAFT

The PG draft used invented file paths. All paths below are verified against HEAD.

| PG Draft (WRONG) | Actual Path |
|---|---|
| `WOModal.tsx` | `tech-pwa/src/components/dashboard/JobDetailModal.tsx` |
| `JobQueueCard.tsx` | `tech-pwa/src/components/dashboard/JobQueueTable.tsx` |
| `DispatchSidebar.tsx` | `tech-pwa/src/components/dashboard/AppSidebar.tsx` |
| `ScheduleGrid.tsx` | `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx` |
| `tech/jobs/page.tsx` | `tech-pwa/src/app/jobs/page.tsx` |
| `tech/job/[id]/page.tsx` | `tech-pwa/src/app/job/[jobId]/page.tsx` |
| `tech/clock-in/page.tsx` | **Does NOT exist** — no separate clock-in page |

---

## FILES TO CHANGE

| # | File | Change |
|---|---|---|
| 1 | `tech-pwa/src/components/dashboard/JobDetailModal.tsx` | Bug fixes 1–4 + modal glassmorphism polish |
| 2 | `tech-pwa/src/lib/dashboard-api.ts` | Fix mock `updateJob` to handle `pteGranted`; fix mock `getGmailThread` to support stakeholder filtering |
| 3 | `tech-pwa/src/components/dashboard/JobQueueTable.tsx` | Glassmorphism row redesign, Framer Motion list entrance |
| 4 | `tech-pwa/src/components/dashboard/AppSidebar.tsx` | Active state polish, hover animations |
| 5 | `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx` | DraggableJobCard glassmorphism, DateDetailModal polish |
| 6 | `tech-pwa/src/app/jobs/page.tsx` | Add shift status banner + "Start Shift" CTA, glassmorphism job cards |
| 7 | `tech-pwa/src/app/job/[jobId]/page.tsx` | Clock-in-once model: replace per-job Clock In with shift-aware flow; Mark Complete becomes WO-only |
| 8 | `tech-pwa/src/components/ClockedInBar.tsx` | **NEW** — persistent bottom bar for clocked-in state |
| 9 | `tech-pwa/src/lib/tech-session.ts` | **NEW** — shift session helpers (localStorage key + read/write) |
| 10 | `tech-pwa/src/app/layout.tsx` | Inject `ClockedInBar` conditionally on tech routes |
| 11 | `tech-pwa/src/app/api/mock/exec/route.ts` | Add mock handlers for `startShift`, `endShift`, `getShiftStatus` |
| 12 | `TechPWA.gs` | Add `handleStartShift`, `handleEndShift`, `handleGetShiftStatus`; modify `handleMarkComplete` to not close the TimeRecord |

## FILES TO NOT TOUCH

- `tech-pwa/src/auth.ts` — auth chain intact
- `tech-pwa/src/app/api/push/subscribe/route.ts` — push auth intact
- `dashboard-api/DashboardAPI.gs` — no changes needed (thread routing is frontend-only fix)
- `tech-pwa/src/app/live/page.tsx`, `schedule/page.tsx`, `weekly-schedule/page.tsx` — dispatch office pages, untouched
- All root `.gs`, `.js`, `.html` files except `TechPWA.gs` — clasp deployment files

---

## PART 1 — WO CARD BUG FIXES
### File: `tech-pwa/src/components/dashboard/JobDetailModal.tsx`

---

### Bug 1: Duplicate Contact Info on Right Panel

**Root cause:** Right panel has explicit "Requester" section (lines ~493–537) and "Tenant" section (lines ~539–603) showing contact info. The left panel REQUESTER/TENANT tabs show the email thread but no contact card. Feels duplicated.

**Fix:** 
1. Remove the standalone `Requester` and `Tenant` `<section>` blocks from the right panel entirely.
2. Add a compact contact card inside the left panel per stakeholder tab, rendered just above the thread list.

**Left panel — add contact header above thread scroll area** (inside the `flex-1 overflow-y-auto` div, BEFORE the thread messages):

```tsx
{/* CONTACT CONTEXT — shown per active stakeholder */}
{commStakeholder === 'REQUESTER' && (activeJob.rmName || activeJob.rmEmail) && (
  <div className="px-6 pt-4 pb-2 border-b border-white/5 shrink-0">
    <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Requester</p>
    <p className="text-xs font-black text-[var(--text-primary)]">{activeJob.rmName}</p>
    {activeJob.rmEmail && <p className="text-[10px] text-[var(--text-muted)]">{activeJob.rmEmail}</p>}
  </div>
)}
{commStakeholder === 'TENANT' && activeJob.tenantName && (
  <div className="px-6 pt-4 pb-2 border-b border-white/5 shrink-0">
    <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Tenant</p>
    <p className="text-xs font-black text-[var(--text-primary)]">{activeJob.tenantName}</p>
    <div className="flex gap-4 mt-0.5">
      {activeJob.tenantPhone && <p className="text-[10px] text-[var(--text-muted)]">{activeJob.tenantPhone}</p>}
      {activeJob.tenantEmail && <p className="text-[10px] text-[var(--text-muted)]">{activeJob.tenantEmail}</p>}
    </div>
  </div>
)}
```

**Right panel — delete these two `<section>` blocks entirely:**
- The `{/* ── REQUESTER ── */}` section (lines ~493–537)
- The `{/* ── TENANT ── */}` section (lines ~539–603)

Editing contact fields (rmName, rmEmail, tenantName, etc.) is now only accessible via the "Job Details" section's edit mode or the Status section. These fields are rarely edited; the contact display in the left panel is read-only. If editing is needed, the Status override section or Dispatch Notes handles it.

---

### Bug 2: Thread Isolation — Tenant Tab Shows RM Thread

**Root cause:** Single `thread: ThreadMessage[]` state. Both REQUESTER and TENANT tabs render from the same `thread` array. No filtering by email participant.

**Fix:** Add a `getThreadForStakeholder` helper and two separate derived states. The underlying `thread` state stays as-is (one Gmail thread per job). Display is filtered by participant email.

**Add after existing state declarations (after `const [thread, setThread]...`):**

```tsx
// Derive per-stakeholder thread views from the single thread state
const requesterThread = thread.filter(msg =>
  msg.isOutbound ||
  !activeJob.tenantEmail ||
  !msg.from.toLowerCase().includes(activeJob.tenantEmail.toLowerCase().split('@')[0])
);

const tenantThread = thread.filter(msg =>
  msg.isOutbound
    ? (msg.from === 'Dispatch → Tenant')
    : activeJob.tenantEmail
      ? msg.from.toLowerCase().includes(activeJob.tenantEmail.toLowerCase().split('@')[0]) ||
        msg.from.toLowerCase().includes((activeJob.tenantName || '').toLowerCase().split(' ')[0])
      : false
);

const activeThread = commStakeholder === 'TENANT' ? tenantThread : requesterThread;
```

**In the thread render block** — replace `thread.length > 0` and `thread.map(...)` with `activeThread`:

```tsx
// BEFORE:
{loading.thread ? (...) : thread.length > 0 ? (
  thread.map((msg, idx) => (
// AFTER:
{loading.thread ? (...) : activeThread.length > 0 ? (
  activeThread.map((msg, idx) => (
```

**Update mock `getGmailThread`** in `dashboard-api.ts` — add a tenant-addressed message so TENANT tab shows something:

```typescript
case 'getGmailThread':
  data.thread = {
    messages: [
      { from: 'Jan Blythe', body: 'When can we get the plumber out for 65 Thornton? Unit 304 has a slow drain and the tenant is complaining.', timestamp: '2h ago', isOutbound: false },
      { from: 'Dispatch', body: 'Checking availability now — will confirm shortly.', timestamp: '1h ago', isOutbound: true },
      { from: 'maria.santos@email.com', body: 'Hi, yes the drain is very slow. Could we schedule for Thursday afternoon?', timestamp: '45min ago', isOutbound: false },
      { from: 'Dispatch → Tenant', body: 'Hi Maria, we can do Thursday at 2pm. Our tech will call 30 minutes before arrival.', timestamp: '30min ago', isOutbound: true },
    ]
  };
  break;
```

---

### Bug 3: AI Draft and Send Route to Wrong Thread

**Root cause:** `handleSendReply()` always sends `{ msgId: activeJob.gmailMsgId, replyBody }` regardless of `commStakeholder`. `handleDraftAI()` always uses `replyType: 'general'`.

**Fix `handleSendReply`** (currently lines ~287–295):

```tsx
const handleSendReply = async () => {
  if (!replyBody || !activeJob.gmailMsgId) return;
  setLoading(prev => ({ ...prev, action: true }));
  const res = await dashboardRequest('replyToThread', { 
    msgId: activeJob.gmailMsgId, 
    replyBody,
    stakeholder: commStakeholder,  // ADD THIS
    tenantEmail: commStakeholder === 'TENANT' ? activeJob.tenantEmail : undefined,
  });
  if (res.success) {
    // Optimistically add to correct thread with stakeholder marker
    const fromLabel = commStakeholder === 'TENANT' ? 'Dispatch → Tenant' : 'Dispatch';
    setThread(prev => [...prev, { 
      from: fromLabel, 
      fromEmail: '', 
      text: replyBody, 
      timestamp: 'Just now', 
      isOutbound: true, 
      attachments: [] 
    }]);
    setReplyBody("");
  }
  setLoading(prev => ({ ...prev, action: false }));
};
```

**Fix `handleDraftAI`** (currently lines ~298–303):

```tsx
const handleDraftAI = async () => {
  setLoading(prev => ({ ...prev, action: true }));
  const replyType = commStakeholder === 'TENANT' ? 'tenant_pte' : 'general';
  const res = await dashboardRequest('getDraftReply', { 
    jobData: activeJob, 
    leadId: activeJob.jobId, 
    replyType,
    stakeholder: commStakeholder,  // ADD THIS
  });
  if (res.success && res.replyBody) setReplyBody(res.replyBody);
  setLoading(prev => ({ ...prev, action: false }));
};
```

---

### Bug 4: Mark PTE Granted Button Does Nothing

**Root cause (two problems):**
1. The button at line ~709 calls `handleUpdateField('pteGranted', 'Yes')` — local state only, never persists.
2. `handleSave()` payload (lines ~216–252) does NOT include `pteGranted`, so even "Save Changes" doesn't write it.
3. Mock `updateJob` in `dashboard-api.ts` has no `pteGranted` field in its spread.

**Fix 1 — Add `handleMarkPTEGranted` function** (add before `handleSendReply`):

```tsx
const handleMarkPTEGranted = async () => {
  setLoading(prev => ({ ...prev, action: true }));
  const newStatus = activeJob.status === 'PTE Required' ? 'Ready to Schedule' : activeJob.status;
  const res = await dashboardRequest('updateJob', {
    job: {
      rowIndex: activeJob.rowIndex,
      pteGranted: 'Yes',
      status: newStatus,
    }
  });
  if (res.success) {
    setActiveJob(prev => prev ? { ...prev, pteGranted: 'Yes', status: newStatus } : null);
    toast.success(newStatus === 'Ready to Schedule' 
      ? 'PTE granted — job is ready to schedule' 
      : 'PTE marked granted');
  } else {
    toast.error('Failed to save PTE status');
  }
  setLoading(prev => ({ ...prev, action: false }));
};
```

**Fix 2 — Update the "Mark PTE Granted" button** in the COORDINATION phase section (currently line ~708–714):

```tsx
// BEFORE:
onClick={() => handleUpdateField('pteGranted', 'Yes')}

// AFTER:
onClick={handleMarkPTEGranted}
disabled={loading.action || activeJob.pteGranted === 'Yes'}
```

**Fix 3 — Add `pteGranted` to `handleSave()` payload** (around line ~225 in the job payload):

```tsx
// In handleSave(), inside the dashboardRequest('updateJob', { job: { ... } }) call, add:
pteGranted: activeJob.pteGranted,
```

**Fix 4 — Add `pteGranted` to mock `updateJob`** in `dashboard-api.ts` (around line ~469, inside the MOCK_JOBS spread):

```typescript
// Add after the accessInfo line:
...(job.pteGranted !== undefined && { pteGranted: job.pteGranted }),
```

---

## PART 2 — DISPATCH DASHBOARD UI REDESIGN

### 2a. `JobQueueTable.tsx` — Row Card Glassmorphism

Replace the existing row `<div>` styling with glassmorphism. The `JobQueueTable` renders rows inline (no separate card component). Find the row container div (the one with `onClick={() => onJobClick?.(job)}`) and apply:

```tsx
// Row container — replace existing className with:
className={`
  group relative flex items-center gap-4 px-5 py-4
  bg-slate-900/30 hover:bg-slate-800/50
  backdrop-blur-sm
  border-b border-white/[0.04] hover:border-white/10
  transition-all duration-200 cursor-pointer
  ${job.priority === '1-URGENT' ? 'border-l-2 border-l-red-500' :
    job.priority === '2-TURNOVER' ? 'border-l-2 border-l-orange-500' :
    job.priority === '3-PTE-PENDING' ? 'border-l-2 border-l-yellow-500' :
    'border-l-2 border-l-transparent'}
`}
```

Wrap the row list in a Framer Motion `AnimatePresence` + `motion.div` with `staggerChildren`:

```tsx
import { motion, AnimatePresence } from 'framer-motion';

// Wrap the jobs.map() in:
<motion.div
  initial="hidden"
  animate="visible"
  variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
>
  {filteredJobs.map((job, idx) => (
    <motion.div
      key={job.jobId}
      variants={{
        hidden: { opacity: 0, x: -8 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.2 }}
    >
      {/* existing row content */}
    </motion.div>
  ))}
</motion.div>
```

Keep all existing filter/sort/tab logic unchanged.

---

### 2b. `AppSidebar.tsx` — Active State Polish

The sidebar already uses Framer Motion. Add `layoutId="activeNavIndicator"` to the active indicator and a left accent bar:

Find the active nav item render. Currently it has a plain `text-white` class for active. Change to:

```tsx
// Active nav item — add a left accent bar:
{isActive && (
  <motion.div
    layoutId="activeNavIndicator"
    className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent)] rounded-full"
    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
  />
)}
```

The `layoutId` causes the accent bar to animate between nav items on route change. Keep all existing permission filtering, pin/expand logic, and logout unchanged.

---

### 2c. `SchedulePageComponents.tsx` — DraggableJobCard Polish

The `DraggableJobCard` already has glassmorphism-style classes. Enhance the hover state and add a priority left border:

```tsx
// In DraggableJobCard, replace the outer div className:
className={`
  p-4 bg-[var(--bg-surface)] border border-white/10 rounded-xl 
  cursor-grab active:cursor-grabbing 
  hover:border-[var(--accent)]/50 hover:bg-[var(--bg-surface)]/80
  transition-all duration-200 group
  ${job.priority === '1-URGENT' ? 'border-l-red-500/50' :
    job.priority === '2-TURNOVER' ? 'border-l-orange-500/50' : 'border-l-white/10'}
  border-l-4
  scale-100 ${isDragging ? 'opacity-50 scale-95 shadow-2xl' : 'opacity-100'}
`}
```

---

## PART 3 — TECH PWA WORKFLOW FIX + UI REDESIGN

### Architecture Change: Clock In Once Per Shift

**Current model:** Clock In is per-job. Each job has its own TimeRecord with clockIn/clockOut.

**New model:**
- `startShift` — called once when the tech begins their day. Creates one TimeRecord in Sheets (jobId = `SHIFT`).
- During the shift, techs navigate to jobs and tap "Mark Complete" on each. This does NOT create/close TimeRecords.
- `endShift` — closes the shift-level TimeRecord with clockOut. Triggers attestation.
- Break start/end continue to work the same way.

**Key constraint:** TechPWA.gs backend `handleMarkComplete` currently closes the TimeRecord. It must be split: marking a job complete (updates Dispatch Queue status) and ending the shift (closes the TimeRecord) are now separate actions.

---

### 3a. `TechPWA.gs` — New Backend Actions

**Add `handleStartShift(data, techRow)`:**

```javascript
function handleStartShift(data, techRow) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PWA_SHEETS.TIME_RECORDS);
  var coords = data.lat && data.lng ? [data.lat, data.lng] : ['', ''];
  var recordId = 'TR-' + Utilities.getUuid().substring(0, 8).toUpperCase();
  var now = new Date();
  var row = new Array(28).fill('');
  row[TM_COL.RECORD_ID]  = recordId;
  row[TM_COL.JOB_ID]     = 'SHIFT';
  row[TM_COL.TECH_ID]    = techRow[TR_COL.BADGE];
  row[TM_COL.TECH_NAME]  = techRow[TR_COL.NAME];
  row[TM_COL.CLOCK_IN]   = now.toISOString();
  row[TM_COL.STATUS]     = 'active';
  row[TM_COL.DATE]       = Utilities.formatDate(now, 'America/Los_Angeles', 'yyyy-MM-dd');
  row[TM_COL.LAT_IN]     = coords[0];
  row[TM_COL.LNG_IN]     = coords[1];
  row[TM_COL.ENTITY_ID]  = techRow[TR_COL.ENTITY_ID] || 'APT-CA';
  sheet.appendRow(row);
  return { success: true, recordId: recordId, clockInTime: now.toISOString() };
}
```

**Add `handleEndShift(data, techRow)`:**

```javascript
function handleEndShift(data, techRow) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PWA_SHEETS.TIME_RECORDS);
  var rows = sheet.getDataRange().getValues();
  var targetIdx = -1;
  for (var i = rows.length - 1; i >= 1; i--) {
    if (rows[i][TM_COL.RECORD_ID] === data.recordId && rows[i][TM_COL.STATUS] === 'active') {
      targetIdx = i;
      break;
    }
  }
  if (targetIdx === -1) return { success: false, error: 'No active shift record found' };
  var now = new Date();
  var clockIn = new Date(rows[targetIdx][TM_COL.CLOCK_IN]);
  var breakMins = rows[targetIdx][TM_COL.BREAK_MINUTES] || 0;
  var totalMins = Math.round((now - clockIn) / 60000) - breakMins;
  var actualHours = Math.round(totalMins / 60 * 100) / 100;
  var sheetRow = targetIdx + 1;
  sheet.getRange(sheetRow, TM_COL.CLOCK_OUT + 1).setValue(now.toISOString());
  sheet.getRange(sheetRow, TM_COL.ACTUAL_HOURS + 1).setValue(actualHours);
  sheet.getRange(sheetRow, TM_COL.STATUS + 1).setValue('complete');
  if (data.lat) sheet.getRange(sheetRow, TM_COL.LAT_OUT + 1).setValue(data.lat);
  if (data.lng) sheet.getRange(sheetRow, TM_COL.LNG_OUT + 1).setValue(data.lng);
  return { success: true, actualHoursWorked: actualHours, clockOutTime: now.toISOString() };
}
```

**Add `handleGetShiftStatus(data, techRow)`:**

```javascript
function handleGetShiftStatus(data, techRow) {
  var badge = String(techRow[TR_COL.BADGE]);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PWA_SHEETS.TIME_RECORDS);
  var rows = sheet.getDataRange().getValues();
  for (var i = rows.length - 1; i >= 1; i--) {
    if (String(rows[i][TM_COL.TECH_ID]) === badge && 
        rows[i][TM_COL.JOB_ID] === 'SHIFT' &&
        rows[i][TM_COL.STATUS] === 'active') {
      return {
        success: true,
        isShiftActive: true,
        recordId: rows[i][TM_COL.RECORD_ID],
        clockInTime: rows[i][TM_COL.CLOCK_IN],
        breakDurationMinutes: rows[i][TM_COL.BREAK_MINUTES] || 0,
        status: rows[i][TM_COL.STATUS]
      };
    }
  }
  return { success: true, isShiftActive: false };
}
```

**Wire new actions in `doPost`** — add to the switch/if chain:

```javascript
case 'startShift':      return handleStartShift(data, techRow);
case 'endShift':        return handleEndShift(data, techRow);
case 'getShiftStatus':  return handleGetShiftStatus(data, techRow);
```

**Modify `handleMarkComplete`** — remove the clock-out logic. It should ONLY update the Dispatch Queue job status to 'Complete'. Do NOT close the TimeRecord. Keep job performance write. Remove the actual hours calculation and TimeRecord status update.

The function signature stays: `handleMarkComplete(data, techRow)`. Strip the lines that write `CLOCK_OUT`, `ACTUAL_HOURS`, and `STATUS='complete'` to the Time Records sheet. Keep the Dispatch Queue `DQ_COL.STATUS = 'Complete'` write and the Job Performance write.

---

### 3b. `tech-pwa/src/lib/tech-session.ts` — NEW FILE

```typescript
/**
 * Shift session state — stored in localStorage.
 * One record per shift. Independent of per-job state.
 */

const SHIFT_KEY = 'apt_shift_session';

export interface ShiftSession {
  recordId: string;
  clockInTime: string;          // ISO string
  breakDurationMinutes: number;
  status: 'active' | 'on-break';
}

export function getShiftSession(): ShiftSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SHIFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setShiftSession(session: ShiftSession): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SHIFT_KEY, JSON.stringify(session));
}

export function clearShiftSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SHIFT_KEY);
}

export function updateShiftBreak(breakDurationMinutes: number): void {
  const session = getShiftSession();
  if (!session) return;
  setShiftSession({ ...session, breakDurationMinutes });
}
```

---

### 3c. `tech-pwa/src/app/api/mock/exec/route.ts` — Add Mock Handlers

Read the existing file first. Add these cases to the existing switch:

```typescript
case 'startShift': {
  const recordId = 'TR-SHIFT-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  return Response.json({ 
    success: true, 
    recordId, 
    clockInTime: new Date().toISOString() 
  });
}
case 'endShift': {
  return Response.json({ 
    success: true, 
    actualHoursWorked: 7.5,
    clockOutTime: new Date().toISOString()
  });
}
case 'getShiftStatus': {
  // Return not active by default (so mock login starts fresh)
  return Response.json({ success: true, isShiftActive: false });
}
```

---

### 3d. `tech-pwa/src/components/ClockedInBar.tsx` — NEW FILE

```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Coffee, LogOut } from 'lucide-react';
import { getShiftSession, clearShiftSession, updateShiftBreak } from '@/lib/tech-session';
import { apiCall } from '@/lib/syncQueue';
import { useToast } from '@/context/ToastContext';
import { useTranslation } from '@/lib/i18n';

interface ClockedInBarProps {
  onShiftEnd?: () => void;
}

export default function ClockedInBar({ onShiftEnd }: ClockedInBarProps) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [shift, setShift] = useState(getShiftSession());
  const [elapsed, setElapsed] = useState(0); // seconds
  const [ending, setEnding] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Tick elapsed timer
  useEffect(() => {
    if (!shift) return;
    const tick = () => {
      const start = new Date(shift.clockInTime).getTime();
      const breakSecs = (shift.breakDurationMinutes || 0) * 60;
      setElapsed(Math.max(0, Math.floor((Date.now() - start) / 1000) - breakSecs));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [shift]);

  // Re-read shift on storage changes (tab sync)
  useEffect(() => {
    const handler = () => setShift(getShiftSession());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  if (!shift) return null;

  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;
  const timer = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

  const handleRestPeriod = async () => {
    const isOnBreak = shift.status === 'on-break';
    const action = isOnBreak ? 'endBreak' : 'startBreak';
    const res = await apiCall(action, { recordId: shift.recordId });
    if (res.success) {
      const updated = { 
        ...shift, 
        status: isOnBreak ? 'active' : 'on-break' as const,
        breakDurationMinutes: res.breakDurationMinutes ?? shift.breakDurationMinutes,
      };
      setShift(updated);
      // Update localStorage via tech-session helper
      const { setShiftSession } = await import('@/lib/tech-session');
      setShiftSession(updated);
      toast.info(isOnBreak ? t('toast_break_ended') : t('toast_break_started'));
      navigator.vibrate?.(10);
    }
  };

  const handleEndShift = async () => {
    setEnding(true);
    const coords = { lat: undefined as number|undefined, lng: undefined as number|undefined };
    try {
      await new Promise<void>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (p) => { coords.lat = p.coords.latitude; coords.lng = p.coords.longitude; resolve(); },
          () => resolve(),
          { timeout: 5000 }
        );
      });
    } catch { /* GPS optional */ }

    const res = await apiCall('endShift', { recordId: shift.recordId, ...coords });
    if (res.success) {
      clearShiftSession();
      setShift(null);
      toast.success('Shift ended. Great work!');
      navigator.vibrate?.([50, 30, 50]);
      onShiftEnd?.();
    } else {
      toast.error('Failed to end shift');
    }
    setEnding(false);
    setShowConfirm(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="fixed bottom-0 left-0 right-0 z-50
          bg-slate-900/95 backdrop-blur-md
          border-t border-white/10
          px-4 py-3 pb-safe
          flex items-center justify-between gap-4"
      >
        {/* Timer */}
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${shift.status === 'on-break' ? 'bg-purple-400 animate-pulse' : 'bg-green-400 animate-pulse'}`} />
          <span className="font-mono text-sm font-black text-[var(--text-primary)] tracking-tight">{timer}</span>
          <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
            {shift.status === 'on-break' ? 'On Break' : 'Shift Active'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestPeriod}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              bg-purple-500/10 border border-purple-500/30
              text-purple-300 text-[9px] font-black uppercase tracking-widest
              hover:bg-purple-500/20 transition-all"
          >
            <Coffee size={12} />
            {shift.status === 'on-break' ? 'End Break' : 'Rest Period'}
          </motion.button>

          {!showConfirm ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                bg-red-500/10 border border-red-500/30
                text-red-400 text-[9px] font-black uppercase tracking-widest
                hover:bg-red-500/20 transition-all"
            >
              <LogOut size={12} />
              End Shift
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10
                  text-[9px] font-black text-[var(--text-muted)] uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleEndShift}
                disabled={ending}
                className="px-3 py-1.5 rounded-lg bg-red-600/80 border border-red-500
                  text-[9px] font-black text-white uppercase
                  disabled:opacity-50 transition-all"
              >
                {ending ? 'Ending…' : 'Confirm End'}
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
```

---

### 3e. `tech-pwa/src/app/layout.tsx` — Inject ClockedInBar on Tech Routes

Read the existing file. Import `ClockedInBar` and add it conditionally for tech routes. It reads `ShiftSession` from localStorage so it self-hides when no shift is active.

```tsx
// Add import at top:
import ClockedInBar from '@/components/ClockedInBar';

// Inside RootLayout, add just before closing </body>:
<ClockedInBar />
```

The component self-hides via `if (!shift) return null` so no route guard is needed in layout. It shows only when a shift is active.

---

### 3f. `tech-pwa/src/app/jobs/page.tsx` — Shift Status Banner + Start Shift CTA

**Add shift state check on load:**

```tsx
import { getShiftSession, setShiftSession } from '@/lib/tech-session';
import { apiCall } from '@/lib/syncQueue';

// Add state:
const [shiftActive, setShiftActive] = useState<boolean>(!!getShiftSession());
const [startingShift, setStartingShift] = useState(false);
```

**Add `getShiftStatus` check in `useEffect`** (after `loadJobs()`):

```tsx
// Check live shift status from backend (in case localStorage is stale):
apiCall('getShiftStatus', {}).then(res => {
  if (res.success) {
    if (res.isShiftActive && !getShiftSession()) {
      // Backend has active shift but localStorage doesn't — re-sync
      setShiftSession({ 
        recordId: res.recordId, 
        clockInTime: res.clockInTime,
        breakDurationMinutes: res.breakDurationMinutes || 0,
        status: 'active'
      });
      setShiftActive(true);
    } else if (!res.isShiftActive) {
      setShiftActive(false);
    }
  }
});
```

**Add `handleStartShift` function:**

```tsx
const handleStartShift = async () => {
  setStartingShift(true);
  try {
    const coords = { lat: undefined as number|undefined, lng: undefined as number|undefined };
    try {
      await new Promise<void>(resolve => {
        navigator.geolocation.getCurrentPosition(
          p => { coords.lat = p.coords.latitude; coords.lng = p.coords.longitude; resolve(); },
          () => resolve(),
          { timeout: 5000 }
        );
      });
    } catch { /* GPS optional */ }
    const res = await apiCall('startShift', coords);
    if (res.success) {
      setShiftSession({ 
        recordId: res.recordId, 
        clockInTime: res.clockInTime,
        breakDurationMinutes: 0,
        status: 'active'
      });
      setShiftActive(true);
      toast.success(t('toast_clocked_in'));
      navigator.vibrate?.(10);
    }
  } finally {
    setStartingShift(false);
  }
};
```

**Add shift banner in JSX** — insert between the header and job list:

```tsx
{/* Shift Status Banner */}
<AnimatePresence>
  {!shiftActive && (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mx-4 mb-4 p-4 rounded-2xl
        bg-green-500/10 border border-green-500/30
        flex items-center justify-between gap-4"
    >
      <div>
        <p className="text-[10px] font-black text-green-400 uppercase tracking-widest">Ready to Start?</p>
        <p className="text-xs text-green-300/70 mt-0.5">Clock in to begin your shift</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleStartShift}
        disabled={startingShift}
        className="px-4 py-2.5 rounded-xl bg-green-600/80 border border-green-500
          text-[10px] font-black text-white uppercase tracking-widest
          disabled:opacity-50 transition-all shadow-lg shadow-green-500/20"
      >
        {startingShift ? 'Starting…' : 'Start Shift'}
      </motion.button>
    </motion.div>
  )}
</AnimatePresence>
```

**Job card glassmorphism redesign** — the existing job list rows use `border-l-4` priority borders. Keep those. Enhance container:

```tsx
// Job card container div — replace bg/border classes:
className={`
  p-4 rounded-2xl
  bg-[var(--bg-surface)]/60 backdrop-blur-sm
  border border-white/8
  hover:border-white/15 hover:bg-[var(--bg-surface)]/80
  active:scale-[0.98]
  transition-all duration-200
  border-l-4 ${PRIORITY_BORDER[job.priority] || 'border-l-blue-500/50'}
  cursor-pointer
`}
```

---

### 3g. `tech-pwa/src/app/job/[jobId]/page.tsx` — Shift-Aware Flow

**Replace the per-job Clock In model:**

1. **Remove `handleClockIn`** entirely — or replace with a redirect to jobs page with a message to start shift first.

2. **Keep `handleMarkComplete`** but remove the attestation trigger from it. Attestation now fires on `endShift` via `ClockedInBar`.

3. **Remove `handleClockOut`** — clock-out is now "End Shift" in `ClockedInBar`.

4. **Update the timer/status card** — instead of per-job time, show shift-level time from `getShiftSession()`.

**Import and use shift session:**

```tsx
import { getShiftSession } from '@/lib/tech-session';

// Replace activeRecord state with shiftSession:
const shiftSession = getShiftSession();
const isShiftActive = !!shiftSession;
```

**Replace the Timer Card section** — show shift timer from `shiftSession.clockInTime` instead of `activeRecord.clockInTime`.

**Action buttons** — replace the Clock In / Clock Out button logic:

```tsx
// No shift active — prompt to start shift:
{!isShiftActive && (
  <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-center space-y-3">
    <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Shift Not Started</p>
    <p className="text-xs text-amber-300/70">Go back to your jobs list to start your shift first.</p>
    <button
      onClick={() => router.push('/jobs')}
      className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-xl
        text-[10px] font-black text-amber-300 uppercase"
    >
      Back to Jobs
    </button>
  </div>
)}

// Shift active — show Mark Complete only:
{isShiftActive && job.status !== 'Complete' && (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={handleMarkComplete}
    className="w-full py-5 rounded-2xl
      bg-emerald-600/80 hover:bg-emerald-600
      border border-emerald-500
      text-white font-black uppercase tracking-widest text-sm
      shadow-xl shadow-emerald-500/20
      transition-all"
  >
    Mark Complete
  </motion.button>
)}
```

**Update `handleMarkComplete`** — remove the attestation trigger (it moved to `endShift` in ClockedInBar). Keep celebration animation. After celebration, redirect back to jobs list:

```tsx
const handleMarkComplete = async () => {
  const coords = await getCurrentPosition().catch(() => null);
  const res = await apiCall("markComplete", { 
    jobId: job?.jobId, 
    notes: "Job checked completely.", 
    lat: coords?.lat, 
    lng: coords?.lng 
  });
  if (res.success) {
    if (job) setJob({ ...job, status: "Complete" });
    navigator.vibrate?.([50, 30, 50]);
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      router.push('/jobs'); // Back to job list, NOT attestation (attestation on endShift)
    }, 1800);
  }
};
```

**Keep `handleStartBreak` and `handleEndBreak`** — but they now operate on the shift-level `recordId` from `getShiftSession()`:

```tsx
const handleStartBreak = async () => {
  const session = getShiftSession();
  if (!session) return;
  const res = await apiCall("startBreak", { recordId: session.recordId });
  if (res.success) {
    const { setShiftSession } = await import('@/lib/tech-session');
    setShiftSession({ ...session, status: 'on-break' });
    toast.warning(t('toast_break_started'));
    navigator.vibrate?.(10);
  }
};

const handleEndBreak = async () => {
  const session = getShiftSession();
  if (!session) return;
  const res = await apiCall("endBreak", { recordId: session.recordId });
  if (res.success) {
    const { setShiftSession } = await import('@/lib/tech-session');
    setShiftSession({ ...session, status: 'active', breakDurationMinutes: res.breakDurationMinutes || 30 });
    toast.success(t('toast_break_ended'));
    navigator.vibrate?.(10);
  }
};
```

The break buttons remain in the job detail page UI. The "End Shift" is in `ClockedInBar` at the bottom — do NOT add it to the job detail page.

---

## VERIFICATION CHECKLIST
### 🤖 ANTIGRAVITY TEST SPRINT — READ THIS FIRST

**This section is for the test sprint only. If you are in the implement sprint, stop here — your job is done.**

In the test sprint:
- Run `npm run dev` from `tech-pwa/`
- Work through every item below in order
- For each item report: "Navigated to [X], clicked [Y], saw [Z]" — explicit observation required
- Do NOT modify any files. If you find a bug, report it. Do not fix it.
- If any item cannot be verified (missing mock data, blocked by auth), say so explicitly — do not mark it PASS

---

### Part 1 — WO Card Bugs

- [ ] Open any job with tenant info — right panel has NO "Requester" section, NO "Tenant" section; contact info shows in left panel's Requester/Tenant tabs as mini-cards
- [ ] Open a job with a tenant email in mock data (e.g. APT-3001 — tenantEmail: `maria.santos@email.com`). Switch to TENANT tab — see Maria Santos's message. Switch to REQUESTER tab — see Jan Blythe's message only.
- [ ] On TENANT tab, type a reply and click Send. Check that `replyToThread` mock is called with `stakeholder: 'TENANT'` in payload (console.log or network inspect).
- [ ] On TENANT tab, click "Draft with AI" — verify `getDraftReply` is called with `replyType: 'tenant_pte'`.
- [ ] Open job APT-3005 or APT-3006 (PTE Required status). Click "Mark PTE Granted — Unlock Dispatch". Verify toast shows "PTE granted — job is ready to schedule". Verify job status changes to "Ready to Schedule" without clicking "Save Changes". Verify modal still open.
- [ ] On any job: edit a field, click Save. Verify no TypeScript errors (tsc --noEmit passes).

### Part 2 — Dispatch Dashboard UI

- [ ] `/live` — job queue rows have left priority border (red for URGENT, orange for TURNOVER). Rows animate in with stagger on load.
- [ ] Hover a job row — row brightens, border lightens smoothly.
- [ ] Sidebar active item has animated left accent bar. Navigating between pages causes accent bar to slide (layoutId animation).
- [ ] `/schedule` — DraggableJobCard has left priority border and glassmorphism hover.

### Part 3 — Tech PWA Workflow

- [ ] Navigate to `/jobs` — "Start Shift" banner visible at top (shift not active).
- [ ] Tap "Start Shift" — banner animates away, ClockedInBar appears at bottom with running timer.
- [ ] Navigate to a job — no "Clock In" button. "Mark Complete" button visible and enabled.
- [ ] Tap "Mark Complete" — celebration animation plays, then redirects to `/jobs`. No attestation modal.
- [ ] From ClockedInBar, tap "Rest Period" — timer pauses, status shows "On Break". Tap again — "End Break" — timer resumes.
- [ ] From ClockedInBar, tap "End Shift" → "Confirm End" — ClockedInBar disappears, toast shows "Shift ended. Great work!"
- [ ] Refresh the page mid-shift — ClockedInBar reappears (reads from localStorage via `getShiftSession()`).
- [ ] `tsc --noEmit` — zero errors.

---

## WHAT TO KEEP UNCHANGED

- All auth logic (`src/auth.ts`, `src/app/api/auth/`, `src/app/api/push/`)
- All dispatch office pages (`/live`, `/schedule`, `/weekly-schedule`, existing logic)
- All existing filter/sort/tab logic in `JobQueueTable.tsx`
- `DashboardLayout.tsx`, `CommandPalette.tsx`, `SummaryCards.tsx`
- `SchedulingDispatch.tsx` — scheduling wizard unchanged
- All `.gs`, `.js`, `.html` files at repo root except `TechPWA.gs`
- `dashboard-api/DashboardAPI.gs` — no changes needed
- i18n keys in `src/lib/i18n/en.ts` and `es.ts` — add new keys if needed but do not modify existing ones

---

*Spec hardened by Claude Code. File paths and function names verified against HEAD (commit 05d4bb1).*
