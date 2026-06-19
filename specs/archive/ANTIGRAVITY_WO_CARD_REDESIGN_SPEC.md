# ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md

**Status:** APPROVED — ready for AG implementation
**Sprint:** WO Card + Search Cleanup
**Verified by:** Claude Code (session 41)

---

## SCOPE

Three files. No new files. No backend changes.

| File | What changes |
|------|-------------|
| `tech-pwa/src/components/dashboard/CommandPalette.tsx` | Strip to search-only, wire to real jobs |
| `tech-pwa/src/components/dashboard/JobDetailModal.tsx` | Per-section edits, fix status display, remove Internal Thread, relabel panels |
| `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx` | `DateDetailModal` — flat job list, tech shown on card, inline time edit |

Do NOT touch: `DashboardLayout.tsx`, `schedule/page.tsx`, `weekly-schedule/page.tsx`, `SchedulingDispatch.tsx`, `types.ts`, any `.gs` files.

---

## PART 1 — CommandPalette.tsx

### Problem
The palette has fake static content (Navigation, Quick Actions, Recent Locations, ESC badge) and performs no actual search against job data.

### Solution
Strip the palette to a clean search interface that searches real jobs. Jobs are fetched lazily when the palette first opens.

### Exact changes to `CommandPalette.tsx`

**Replace the entire file** with the following:

```tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { Search, MapPin, Clock, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { dashboardRequest } from "@/lib/dashboard-api";
import { Job } from "@/lib/types";

const PRIORITY_COLOR: Record<string, string> = {
  '1-URGENT':      'text-red-400',
  '2-TURNOVER':    'text-orange-400',
  '3-PTE-PENDING': 'text-yellow-400',
  '4-STANDARD':    'text-zinc-500',
};

interface CommandPaletteProps {
  onSelectJob?: (job: Job) => void;
}

export default function CommandPalette({ onSelectJob }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Toggle on ⌘K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Lazy-load jobs when palette opens for the first time
  useEffect(() => {
    if (open && !loaded) {
      dashboardRequest('getDispatchData').then(res => {
        if (res.success && Array.isArray(res.jobs)) {
          setJobs(res.jobs.filter((j: Job) => j.status !== 'Archived'));
        }
        setLoaded(true);
      });
    }
  }, [open, loaded]);

  const close = useCallback(() => setOpen(false), []);

  const runSelect = (job: Job) => {
    close();
    onSelectJob?.(job);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="relative w-full max-w-2xl bg-[var(--bg-primary)]/95 backdrop-blur-xl border border-[var(--border-subtle)] shadow-[0_0_80px_rgba(0,0,0,0.7)] rounded-3xl overflow-hidden flex flex-col max-h-[60vh]"
          >
            <Command shouldFilter className="flex flex-col flex-1 overflow-hidden">
              {/* Input row */}
              <div className="flex items-center border-b border-[var(--border-subtle)] px-6 h-16 shrink-0">
                <Search className="mr-4 h-4 w-4 text-[var(--text-muted)] shrink-0" />
                <Command.Input
                  autoFocus
                  placeholder="Search jobs, techs, or addresses..."
                  className="flex-1 bg-transparent text-sm font-bold text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
                />
              </div>

              {/* Results */}
              <Command.List className="flex-1 overflow-y-auto custom-scrollbar p-2">
                <Command.Empty className="py-16 text-center">
                  <p className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                    {loaded ? 'No jobs found' : 'Loading...'}
                  </p>
                </Command.Empty>

                {jobs.length > 0 && (
                  <Command.Group
                    heading="Work Orders"
                    className="px-2 pt-3 pb-1 text-[9px] uppercase font-black tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    {jobs.map(job => (
                      <Command.Item
                        key={job.jobId}
                        value={`${job.address} ${job.unit} ${job.serviceCategory} ${job.assignedTech} ${job.rmName} ${job.jobId}`}
                        onSelect={() => runSelect(job)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm transition-all hover:bg-[var(--accent)]/8 data-[selected=true]:bg-[var(--accent)]/10 group"
                      >
                        <MapPin size={14} className={`shrink-0 ${PRIORITY_COLOR[job.priority] || 'text-zinc-500'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-black text-[var(--text-primary)] truncate group-data-[selected=true]:text-[var(--accent)] transition-colors">
                            {job.address}{job.unit ? ` · Unit ${job.unit}` : ''}
                          </p>
                          <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest truncate mt-0.5">
                            {job.serviceCategory}
                            {job.assignedTech ? ` · ${job.assignedTech.split(' #')[0]}` : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {(job.status === 'Scheduled' || job.status === 'In Progress') && (
                            <Clock size={11} className="text-emerald-400" />
                          )}
                          {job.priority === '1-URGENT' && (
                            <AlertTriangle size={11} className="text-red-400" />
                          )}
                          <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-muted)] bg-white/5 px-2 py-0.5 rounded-full">
                            {job.status}
                          </span>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}
              </Command.List>

              {/* Footer hint */}
              <div className="px-6 py-3 border-t border-[var(--border-subtle)] shrink-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]/40 text-center">
                  {jobs.length > 0 ? `${jobs.length} active work orders` : ''}
                </p>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
```

**Wire the `onSelectJob` prop in `DashboardLayout.tsx`:**

In `DashboardLayout.tsx`, find where `<CommandPalette />` is rendered. If it is not already receiving an `onSelectJob` prop:
1. Add state: `const [paletteJob, setPaletteJob] = useState<import('@/lib/types').Job | null>(null);`
2. Pass prop: `<CommandPalette onSelectJob={(job) => setPaletteJob(job)} />`
3. Render modal conditionally:
```tsx
{paletteJob && (
  <JobDetailModal
    key={paletteJob.jobId}
    job={paletteJob}
    onClose={() => setPaletteJob(null)}
    onSave={() => setPaletteJob(null)}
  />
)}
```
4. Add imports for `JobDetailModal` and `Job` type if not present.

---

## PART 2 — JobDetailModal.tsx

### Overview of changes

1. **Replace global `isEditMode` with per-section `editingSection` state**
2. **Header simplification** — remove address/unit/type from header; add jobId + priority + type badges + close only
3. **Left panel label** — add "COORDINATION" section label above stakeholder switcher
4. **Right panel label** — add "ASSIGNMENT · SCHEDULING" panel header
5. **Right panel sections** — restructure into clearly labeled sections, each with a pencil edit button
6. **Fix Job Status display** — 'Scheduled' ≠ 'In Progress'
7. **Rename notes** — "Internal Dispatcher Notes" → "Dispatch Notes"
8. **Remove Internal Thread section** — remove JSX, `CommentBubble`, and associated state/functions
9. **Tenant email visible** — tenant email shown in Tenant section display mode

### 2A — State changes

**Remove:** `const [isEditMode, setIsEditMode] = useState(false);`

**Add:**
```typescript
type EditingSection = 'jobDetails' | 'requester' | 'tenant' | 'context' | 'access' | 'status' | null;
const [editingSection, setEditingSection] = useState<EditingSection>(null);
const toggleSection = (s: EditingSection) =>
  setEditingSection(prev => (prev === s ? null : s));
```

**Remove entirely** — these are only used by the Internal Thread section:
```typescript
const [jobComments, setJobComments]       = useState<JobComment[]>([]);
const [commentBody, setCommentBody]       = useState('');
const [commentLoading, setCommentLoading] = useState(false);
const [postingComment, setPostingComment] = useState(false);
```

**Remove functions** (only used by Internal Thread):
- `fetchJobComments`
- `handlePostComment`
- The `fetchJobComments` call inside the `useEffect` that also calls `fetchThread`

**Remove unused imports** after removing above:
- `MessageSquare` from lucide-react (only used in Internal Thread header)
- `JobComment`, `JobCommentsResponse` from `@/lib/dashboard-api`
- `getSession` from `@/lib/auth` (only used in `handlePostComment`)
- `Plus` from lucide-react (check — also used in scope expansion `PlusCircle` is separate; `Plus` may be unused)

**Keep:** All other state, `scopeExpansion`, `schedLinkUrl`, `updateMasterDirectory`, `confirmArchive`, `thread`, `replyBody`, all loading states, all other functions.

### 2B — Header replacement

**Remove** the current header content between the `<header>` open and close tags and replace with:

```tsx
<header className="h-[56px] px-8 border-b border-white/5 flex items-center justify-between bg-[var(--bg-surface)] shrink-0">
  <div className="flex items-center gap-4">
    <span className="text-sm font-black text-[var(--accent)] tracking-tighter uppercase italic">
      {activeJob.jobId}
    </span>
    <div className="h-4 w-[1px] bg-white/10" />
    <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest border ${typeInfo.class}`}>
      {typeInfo.label}
    </span>
    <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest border ${priorityInfo.class}`}>
      {priorityInfo.label}
    </span>
  </div>
  <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-white transition-colors">
    <X size={20} />
  </button>
</header>
```

### 2C — Left panel — add COORDINATION label

The left panel div currently starts:
```tsx
{/* LEFT PANEL: COMMUNICATION HUB (45%) */}
<div className="w-[45%] border-r border-white/5 flex flex-col bg-[var(--bg-primary)]">
   
    {/* STAKEHOLDER SWITCHER */}
   <div className="flex h-[88px] border-b border-white/5 shrink-0">
```

Add a slim label bar BEFORE the STAKEHOLDER SWITCHER div:
```tsx
<div className="h-8 px-6 flex items-center border-b border-white/5 bg-white/[0.01] shrink-0">
  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-50">
    Coordination
  </span>
</div>
```

### 2D — Right panel restructure

**Replace** the entire contents of the right panel div (`{/* RIGHT PANEL: ACTION WORKBENCH (55%) */}`) — from the opening `<div className="flex-1 overflow-y-auto custom-scrollbar bg-[var(--bg-surface)]/20">` through its closing `</div>` — with the following complete implementation.

Note: Keep the `<SchedulingDispatch>` component call exactly as it currently exists, including all its props. Do not change its props. Do not change `handleSave`, `handleSaveExpansion`, `handleArchive`, or any of the existing logic.

```tsx
{/* RIGHT PANEL: ASSIGNMENT & SCHEDULING (55%) */}
<div className="flex-1 flex flex-col overflow-hidden bg-[var(--bg-surface)]/20">
  {/* Panel label */}
  <div className="h-8 px-8 flex items-center border-b border-white/5 bg-white/[0.01] shrink-0">
    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-50">
      Assignment · Scheduling
    </span>
  </div>

  <div className="flex-1 overflow-y-auto custom-scrollbar">
    <div className="p-8 space-y-8 pb-24">

      {/* ── JOB DETAILS ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Job Details</h4>
          <button
            onClick={() => toggleSection('jobDetails')}
            className={`p-1.5 rounded-lg transition-all ${editingSection === 'jobDetails' ? 'text-[var(--accent)] bg-[var(--accent)]/10' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5'}`}
          >
            {editingSection === 'jobDetails' ? <Check size={13} /> : <Pencil size={13} />}
          </button>
        </div>
        <div className="bg-[var(--bg-surface)] rounded-2xl border border-white/5 p-5 space-y-3">
          {editingSection === 'jobDetails' ? (
            <div className="space-y-3">
              <div>
                <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Address</label>
                <input
                  value={activeJob.address}
                  onChange={(e) => handleUpdateField('address', e.target.value)}
                  className="w-full bg-white/5 border border-[var(--accent)]/30 rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all"
                  placeholder="Property address"
                />
                <p className="text-[8px] text-amber-400 font-black uppercase tracking-widest mt-1 opacity-70">
                  ⚠ Only correct genuine errors — affects scheduling sync
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Unit</label>
                  <input
                    value={activeJob.unit || ''}
                    onChange={(e) => handleUpdateField('unit', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all"
                    placeholder="Unit #"
                  />
                </div>
                <div>
                  <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Trade / Type</label>
                  <select
                    value={activeJob.serviceCategory}
                    onChange={(e) => handleUpdateField('serviceCategory', e.target.value)}
                    className="w-full bg-[#1a1a1b] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[var(--accent)] transition-all cursor-pointer"
                  >
                    {Object.keys(tradeDurations).map(cat => (
                      <option key={cat} value={cat} className="bg-[#111318] text-white">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <p className="text-sm font-black text-[var(--text-primary)]">
                {activeJob.address}
                {activeJob.unit && <span className="text-[var(--text-muted)] font-medium"> · Unit {activeJob.unit}</span>}
              </p>
              <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest">
                {activeJob.serviceCategory}
              </p>
              {activeJob.preferredTiming && (
                <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-1.5">
                  <Clock size={10} className="text-[var(--accent)]" />
                  {activeJob.preferredTiming}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── REQUESTER ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Requester</h4>
          <button
            onClick={() => toggleSection('requester')}
            className={`p-1.5 rounded-lg transition-all ${editingSection === 'requester' ? 'text-[var(--accent)] bg-[var(--accent)]/10' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5'}`}
          >
            {editingSection === 'requester' ? <Check size={13} /> : <Pencil size={13} />}
          </button>
        </div>
        <div className="bg-[var(--bg-surface)] rounded-2xl border border-white/5 p-5">
          {editingSection === 'requester' ? (
            <div className="space-y-3">
              <div>
                <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Name</label>
                <input
                  value={activeJob.rmName || ''}
                  onChange={(e) => handleUpdateField('rmName', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all"
                  placeholder="RM / Contact name"
                />
              </div>
              <div>
                <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Email</label>
                <input
                  value={activeJob.rmEmail || ''}
                  onChange={(e) => handleUpdateField('rmEmail', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-xs font-black text-[var(--text-primary)]">
                {activeJob.rmName || <span className="text-[var(--text-muted)] italic opacity-50 text-[10px] font-medium">Not on file</span>}
              </p>
              {activeJob.rmEmail && (
                <p className="text-[10px] text-[var(--text-muted)] font-medium">{activeJob.rmEmail}</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── TENANT ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Tenant</h4>
          <button
            onClick={() => toggleSection('tenant')}
            className={`p-1.5 rounded-lg transition-all ${editingSection === 'tenant' ? 'text-[var(--accent)] bg-[var(--accent)]/10' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5'}`}
          >
            {editingSection === 'tenant' ? <Check size={13} /> : <Pencil size={13} />}
          </button>
        </div>
        <div className="bg-[var(--bg-surface)] rounded-2xl border border-white/5 p-5">
          {editingSection === 'tenant' ? (
            <div className="space-y-3">
              <div>
                <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Name</label>
                <input
                  value={activeJob.tenantName || ''}
                  onChange={(e) => handleUpdateField('tenantName', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all"
                  placeholder="Tenant name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Phone</label>
                  <input
                    value={activeJob.tenantPhone || ''}
                    onChange={(e) => handleUpdateField('tenantPhone', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all"
                    placeholder="415-555-0000"
                  />
                </div>
                <div>
                  <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Email</label>
                  <input
                    value={activeJob.tenantEmail || ''}
                    onChange={(e) => handleUpdateField('tenantEmail', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all"
                    placeholder="tenant@email.com"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {activeJob.tenantName ? (
                <>
                  <p className="text-xs font-black text-[var(--text-primary)]">{activeJob.tenantName}</p>
                  <div className="flex items-center gap-4 mt-1.5">
                    {activeJob.tenantPhone && (
                      <span className="text-[10px] text-[var(--text-muted)]">{activeJob.tenantPhone}</span>
                    )}
                    {activeJob.tenantEmail && (
                      <span className="text-[10px] text-[var(--text-muted)]">{activeJob.tenantEmail}</span>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-[10px] text-[var(--text-muted)] italic opacity-50">No tenant on file</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── JOB STATUS ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Job Status</h4>
          <button
            onClick={() => toggleSection('status')}
            className={`p-1.5 rounded-lg transition-all ${editingSection === 'status' ? 'text-[var(--accent)] bg-[var(--accent)]/10' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5'}`}
          >
            {editingSection === 'status' ? <Check size={13} /> : <Pencil size={13} />}
          </button>
        </div>

        {/* Status display — context-appropriate */}
        {activeJob.status === 'In Progress' ? (
          <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.15em]">Job In Progress</p>
              <p className="text-[9px] text-emerald-500/60 uppercase tracking-wider mt-0.5 italic">
                {activeJob.assignedTech?.split(' #')[0]} · clocked in {activeJob.clockedInAt ? new Date(activeJob.clockedInAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/Los_Angeles' }) : 'time pending'}
              </p>
            </div>
          </div>
        ) : activeJob.status === 'Scheduled' ? (
          <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <CalendarCheck size={20} />
            </div>
            <div>
              <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.15em]">Scheduled & Assigned</p>
              <p className="text-[9px] text-blue-400/60 uppercase tracking-wider mt-0.5 italic">
                {activeJob.assignedTech?.split(' #')[0]}
                {activeJob.scheduledDate ? ` · ${new Date(activeJob.scheduledDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}` : ''}
                {activeJob.scheduledTime ? ` at ${activeJob.scheduledTime}` : ''}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-5 bg-[var(--bg-surface)] border border-white/5 rounded-2xl">
            <span className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-wider">
              {activeJob.status}
            </span>
          </div>
        )}

        {/* Status edit — override dropdown */}
        {editingSection === 'status' && (
          <div className="p-4 bg-[var(--bg-surface)] border border-[var(--accent)]/20 rounded-2xl space-y-3">
            <label className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block">Override Status</label>
            <select
              value={activeJob.status}
              onChange={(e) => handleUpdateField('status', e.target.value as import('@/lib/types').JobStatus)}
              className="w-full bg-[#1a1a1b] border border-white/20 rounded-xl px-3 py-2.5 text-xs font-bold text-white outline-none focus:border-[var(--accent)] transition-all cursor-pointer"
            >
              {(['New','Ready to Schedule','PTE Required','Awaiting Approval','Scheduled','In Progress','Complete','Archived'] as const).map(s => (
                <option key={s} value={s} className="bg-[#111318] text-white">{s}</option>
              ))}
            </select>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={activeJob.pteGranted === 'Yes'}
                  onChange={(e) => handleUpdateField('pteGranted', e.target.checked ? 'Yes' : 'No')}
                  className="w-3 h-3 rounded border-white/20 bg-transparent text-[var(--accent)] focus:ring-[var(--accent)]"
                />
                <span className="text-[9px] font-black text-[var(--text-muted)] group-hover:text-white uppercase tracking-tight transition-colors">PTE Granted</span>
              </label>
            </div>
          </div>
        )}
      </section>

      {/* ── ASSIGNMENT / SCHEDULING (phase-gated) ── */}
      {(phase === 'COORDINATION') && (
        <section className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
              <AlertTriangle size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">Coordination Required</p>
              <p className="text-[8px] text-amber-500/60 uppercase tracking-widest mt-0.5">Coordinate with Tenant to Schedule</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleEmailTenantPTE}
              className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex flex-col items-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Mail size={16} className="text-[var(--accent)]" />
              <span className="text-[9px] font-black uppercase tracking-widest">Email PTE Request</span>
            </button>
            <button
              onClick={() => { setCommStakeholder('TENANT'); setCommChannel('SMS'); }}
              className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex flex-col items-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Smartphone size={16} className="text-[var(--accent)]" />
              <span className="text-[9px] font-black uppercase tracking-widest">Text Tenant</span>
            </button>
          </div>
          <button
            onClick={() => handleUpdateField('pteGranted', 'Yes')}
            className="w-full py-4 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            Mark PTE Granted — Unlock Dispatch
          </button>
        </section>
      )}

      {phase === 'DISPATCH' && (
        <>
          <SchedulingDispatch
            job={activeJob}
            onUpdate={(patch) => setActiveJob(prev => prev ? { ...prev, ...patch } as Job : null)}
            techRoster={techRoster}
            weekAvailability={weekAvailability}
            outDates={outDates}
            tradeDurations={tradeDurations}
            techSuggestions={techSuggestions}
            onTriggerPTEEmail={handleEmailTenantPTE}
          />

          {/* Tenant Self-Scheduling Link */}
          <section className="mt-4 p-5 rounded-2xl border border-white/8 bg-white/[0.02] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link size={12} className="text-[var(--text-muted)]" />
                <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Tenant Self-Scheduling</span>
                {activeJob.tenantScheduled && (
                  <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    ✓ Tenant Scheduled
                  </span>
                )}
              </div>
              <button
                onClick={handleGenerateScheduleLink}
                disabled={schedLinkLoading || activeJob.tenantScheduled}
                className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 hover:bg-[var(--accent)]/20 disabled:opacity-30 transition-all"
              >
                {schedLinkLoading ? '…' : 'Generate Link'}
              </button>
            </div>
            {schedLinkUrl && (
              <div className="flex items-center gap-2">
                <input readOnly value={schedLinkUrl} className="flex-1 bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-[10px] text-[var(--text-muted)] font-mono focus:outline-none" />
                <button onClick={() => navigator.clipboard.writeText(schedLinkUrl)} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-all">Copy</button>
              </div>
            )}
            {!schedLinkUrl && !activeJob.tenantScheduled && (
              <p className="text-[9px] text-[var(--text-muted)] leading-relaxed">
                Generate a secure link for the tenant to pick their own appointment window.
              </p>
            )}
          </section>
        </>
      )}

      {phase === 'EXECUTION' && (
        <section className="space-y-6">
          {/* Expand Scope */}
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
                <button onClick={() => setScopeExpansion({ open: false, additionalWork: '', hoursToAdd: 0, reassignTech: '' })} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                  <X size={14} />
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Additional Work Discovered</label>
                <textarea
                  value={scopeExpansion.additionalWork}
                  onChange={e => setScopeExpansion(prev => ({ ...prev, additionalWork: e.target.value }))}
                  placeholder="e.g. Water damage behind drywall — plumber needed for supply line leak"
                  rows={3}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-4 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-amber-500/40 resize-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                  Extend Hours <span className="ml-2 text-amber-400">(current: {activeJob!.estimatedHours || 0}h{scopeExpansion.hoursToAdd > 0 ? ` → ${(activeJob!.estimatedHours || 0) + scopeExpansion.hoursToAdd}h` : ''})</span>
                </label>
                <div className="flex gap-2">
                  {[0, 1, 2, 4, 8].map(h => (
                    <button key={h} onClick={() => setScopeExpansion(prev => ({ ...prev, hoursToAdd: h }))}
                      className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${scopeExpansion.hoursToAdd === h ? 'bg-amber-500 text-black' : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)]'}`}>
                      {h === 0 ? 'None' : `+${h}h`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Reassign Tech (optional)</label>
                <select value={scopeExpansion.reassignTech || activeJob!.assignedTech || ''} onChange={e => setScopeExpansion(prev => ({ ...prev, reassignTech: e.target.value }))}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold text-[var(--text-primary)] outline-none focus:border-amber-500/40 transition-all">
                  <option value="">— Keep current tech —</option>
                  {techRoster?.map((t: TechEntry) => <option key={t.name} value={t.name}>{t.name}</option>)}
                </select>
              </div>
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                onClick={handleSaveExpansion}
                disabled={(!scopeExpansion.additionalWork.trim() && scopeExpansion.hoursToAdd === 0) || loading.action}
                className="w-full py-4 rounded-xl bg-amber-500 text-black text-[11px] font-black uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/10">
                {loading.action ? 'Saving…' : 'Save Expansion'}
              </motion.button>
            </motion.div>
          )}

          {/* Live Photo Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Live Photo Feed</h4>
              <span className="text-[8px] font-black text-[var(--accent)] uppercase tracking-widest cursor-pointer hover:underline">View All</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3].map(i => (
                <div key={i} className="aspect-square bg-[var(--bg-surface)] rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2 transition-opacity">
                  <Smartphone size={20} className="text-white/10" />
                  <span className="text-[7px] font-black text-white/5 uppercase">No Photo</span>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-[var(--text-muted)] font-black uppercase text-center tracking-widest italic">
              Photos stream live as {activeJob.assignedTech?.split(' ')[0]} uploads from the field
            </p>
          </div>
        </section>
      )}

      {phase === 'POST-JOB' && (
        <div className="p-8 border border-white/5 rounded-2xl bg-[var(--bg-surface)] text-center space-y-3">
          <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Job Finalized</h4>
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Pending Quality Assurance & Billing Review</p>
        </div>
      )}

      {/* ── WORK ORDER CONTEXT ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Work Order Context</h4>
          <button
            onClick={() => toggleSection('context')}
            className={`p-1.5 rounded-lg transition-all ${editingSection === 'context' ? 'text-[var(--accent)] bg-[var(--accent)]/10' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5'}`}
          >
            {editingSection === 'context' ? <Check size={13} /> : <Pencil size={13} />}
          </button>
        </div>
        <div className="bg-[var(--bg-surface)] p-5 rounded-2xl border border-white/5">
          {editingSection === 'context' ? (
            <textarea
              value={activeJob.description || ''}
              onChange={(e) => handleUpdateField('description', e.target.value)}
              className="w-full h-32 bg-transparent text-xs font-medium text-[var(--text-secondary)] leading-relaxed outline-none border-b border-[var(--accent)]/30 focus:border-[var(--accent)] p-0 resize-none"
              placeholder="Work order description..."
            />
          ) : (
            <p className="text-xs font-medium text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
              {activeJob.description || <span className="text-[var(--text-muted)] italic opacity-50">No description provided.</span>}
            </p>
          )}
        </div>
      </section>

      {/* ── PROPERTY ACCESS ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Property Access</h4>
          <div className="flex items-center gap-2">
            {editingSection === 'access' && (
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={updateMasterDirectory}
                  onChange={(e) => setUpdateMasterDirectory(e.target.checked)}
                  className="w-3 h-3 rounded border-white/20 bg-transparent text-[var(--accent)] focus:ring-[var(--accent)]"
                />
                <span className="text-[8px] font-black text-amber-500/80 group-hover:text-amber-500 uppercase tracking-tighter transition-colors">Update Master Directory</span>
              </label>
            )}
            <button
              onClick={() => toggleSection('access')}
              className={`p-1.5 rounded-lg transition-all ${editingSection === 'access' ? 'text-[var(--accent)] bg-[var(--accent)]/10' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5'}`}
            >
              {editingSection === 'access' ? <Check size={13} /> : <Pencil size={13} />}
            </button>
          </div>
        </div>
        <div className="p-5 bg-orange-400/5 border-l-4 border-orange-400 rounded-r-2xl">
          {editingSection === 'access' ? (
            <textarea
              value={activeJob.accessInfo || ''}
              onChange={(e) => handleUpdateField('accessInfo', e.target.value)}
              className="w-full bg-transparent text-xs font-black text-orange-400 leading-relaxed outline-none border-b border-orange-400/30 focus:border-orange-400 h-16 resize-none"
              placeholder="E.g. Building Code 1234, Lockbox on pipe..."
            />
          ) : (
            <p className="text-xs font-black text-orange-400 leading-relaxed whitespace-pre-wrap uppercase tracking-tight">
              {activeJob.accessInfo || <span className="opacity-40 font-medium normal-case tracking-normal">No access info on file.</span>}
            </p>
          )}
        </div>
      </section>

      {/* ── DISPATCH NOTES ── */}
      <section className="space-y-3 pt-6 border-t border-white/5">
        <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Dispatch Notes</h4>
        <textarea
          value={filteredNotes}
          onChange={(e) => handleNotesChange(e.target.value)}
          className="w-full h-36 bg-[var(--bg-surface)] border border-white/10 rounded-2xl p-5 text-xs font-medium text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-white/20 transition-all resize-none shadow-inner custom-scrollbar"
          placeholder="Notes for the tech or for internal dispatch coordination..."
        />
      </section>

    </div>
  </div>
</div>
```

### 2E — Required new imports

Add to the lucide-react import at the top of `JobDetailModal.tsx`:
- `Pencil` (for section edit buttons)
- `Check` (for section done checkmark)
- `CalendarCheck` (for the Scheduled status banner)

Remove from the lucide-react import (now unused after removals):
- `MessageSquare`
- `LayoutDashboard`
- `PlusCircle` — **KEEP**: still used in Expand Scope
- `Plus` — **REMOVE** if it is no longer referenced after removing Internal Thread

Verify by searching for each removed import name in the file before removing.

---

## PART 3 — SchedulePageComponents.tsx — DateDetailModal

### Problem
The modal groups jobs by tech. Brandon wants a flat list where tech is shown ON the job card, making the popup an actionable day view for dispatch.

### Exact changes to `DateDetailModal` function

**Replace** the `DateDetailModal` function body (lines 647–747) with the following. The function signature and export stay the same.

```tsx
export function DateDetailModal({ dateStr, techs, gridData, isOpen, onClose, onJobClick }: DateDetailModalProps) {
  if (!dateStr) return null;

  const d = new Date(dateStr + 'T12:00:00');
  const dayLabel = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Flatten all jobs for this date across all techs — sorted by scheduledTime
  const allJobs: Job[] = [];
  techs.forEach(tech => {
    const techJobs = gridData[tech.techName]?.[dateStr] || [];
    techJobs.forEach(job => allJobs.push(job));
  });
  allJobs.sort((a, b) => (a.scheduledTime || '').localeCompare(b.scheduledTime || ''));

  const totalHours = allJobs.reduce((s, j) => s + (Number(j.estimatedHours) || 0), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[var(--bg-surface)] border border-white/10 rounded-3xl shadow-2xl overflow-hidden glass-panel flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-base font-black text-[var(--text-primary)] uppercase tracking-tight">{dayLabel}</h3>
                <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">
                  {allJobs.length} work order{allJobs.length !== 1 ? 's' : ''} · {totalHours.toFixed(1)} hrs committed
                </p>
              </div>
              <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <CloseIcon size={18} />
              </button>
            </div>

            {/* Job list — flat, sorted by time */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
              {allJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-[var(--text-muted)] opacity-30">
                  <p className="text-[10px] font-black uppercase tracking-widest">No work orders scheduled</p>
                </div>
              ) : (
                allJobs.map(job => (
                  <button
                    key={job.jobId}
                    onClick={() => { onJobClick?.(job); onClose(); }}
                    className="w-full text-left p-4 bg-[var(--bg-primary)] border border-white/5 rounded-xl hover:border-[var(--accent)]/30 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-black text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                          {job.address}{job.unit ? ` · Unit ${job.unit}` : ''}
                        </p>
                        <p className="text-[8px] text-[var(--accent)] uppercase tracking-wide mt-0.5 font-black">
                          {job.serviceCategory}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[9px] font-black text-[var(--text-muted)] whitespace-nowrap">
                          {job.scheduledTime || 'TBD'} · {job.estimatedHours || '?'}h
                        </span>
                      </div>
                    </div>
                    {/* Tech shown on card, not as a group header */}
                    {job.assignedTech && (
                      <div className="flex items-center gap-1.5 mt-2.5">
                        <div className="w-5 h-5 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-black text-[9px] border border-[var(--accent)]/20 shrink-0">
                          {job.assignedTech[0]}
                        </div>
                        <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest truncate">
                          {job.assignedTech.split(' #')[0]}
                        </span>
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
```

---

## WHAT NOT TO TOUCH

- `SchedulingDispatch.tsx` — unchanged
- `schedule/page.tsx` — unchanged
- `weekly-schedule/page.tsx` — unchanged
- `DashboardLayout.tsx` — only add: `paletteJob` state, `onSelectJob` prop to `<CommandPalette>`, conditional `<JobDetailModal>` render
- Any `.gs` or `.js` files at repo root
- `handleSave`, `handleSaveExpansion`, `handleArchive` functions
- All existing API call logic

---

## DEFERRED (not in this sprint)

- **City field** — no backend column exists (Col 31 would be needed). Display-only city parsing deferred. Address field may contain city from source emails.
- **Drag-to-reschedule on WO Schedule grid** — DnD between day columns is a separate sprint.
- **DnD within DateDetailModal** — sorting jobs within a day by dragging is a separate sprint.
- **PWA job card showing Dispatch Notes** — separate spec for Tech PWA side.
- **Tech Roster edit from Teams View** — separate sprint.

---

## VERIFICATION STEPS

AG must provide explicit "I navigated to X, clicked Y, saw Z" evidence for each step.

1. Open `/schedule`. Search bar in header — click it. Palette opens.
2. Palette has NO navigation section, NO quick actions section, NO recent locations section, NO ESC badge.
3. Type "890" in the palette. Job at "890 Market St" appears as a result.
4. Click the result. JobDetailModal opens for that job.
5. Close palette with Cmd+K or clicking backdrop. Palette closes.
6. Open any WO card from the dispatch queue. Header shows ONLY: `jobId`, type badge, priority badge, X button. No address in header. No "Edit Order" button.
7. Left panel has "COORDINATION" label above the stakeholder switcher tabs.
8. Right panel has "ASSIGNMENT · SCHEDULING" label at the top.
9. Right panel shows: Job Details, Requester, Tenant, Job Status, Work Order Context, Property Access, Dispatch Notes sections — each with a pencil icon (except Dispatch Notes which is always editable).
10. Click pencil on Job Details. Address input, Unit input, and Trade/Type dropdown appear inline. Click checkmark — fields return to display mode.
11. For a Scheduled job: Job Status section shows blue "Scheduled & Assigned" banner with tech name + date + time. NOT "Job In Progress."
12. For an In Progress job: Job Status section shows green "Job In Progress" banner with tech + clock-in time.
13. Click pencil on Job Status. Status dropdown appears with all 8 status values.
14. Right panel has NO "Internal Thread" section at the bottom. No job comments composer.
15. Right panel "Dispatch Notes" textarea is visible and editable without clicking any pencil.
16. Tenant section shows email field when available (both in display mode and edit mode).
17. Navigate to `/weekly-schedule`. Click any day column header. Day popup opens.
18. Day popup shows a flat list of jobs — NOT grouped by tech headings.
19. Each job card shows the assigned tech's name (avatar initial + name) at the bottom of the card.
20. Clicking a job card in the day popup opens the JobDetailModal for that job.
