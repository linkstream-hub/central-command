# ANTIGRAVITY SPRINT — TECH PROFILE MODAL + DATE DETAIL MODAL
# Owner: Claude Code | Executor: Antigravity
# Date: April 23, 2026

---

## IMPLEMENT THIS ALONGSIDE `ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md`

Both specs touch `schedule/page.tsx`, `weekly-schedule/page.tsx`, and
`SchedulePageComponents.tsx`. Implement both in a single pass to avoid
conflicts. The chevron nav buttons in `schedule/page.tsx` are currently stubs —
the nav spec wires them; this spec fixes their CSS. Do not touch those buttons
twice.

---

## MANDATORY PRE-WORK A — Backend fix in DashboardAPI.gs

`getWeekSchedule` builds its `techs` array as a minimal stub (only `techId`,
`techName`, `jobsRemaining`). Badge/employee ID, rank, and skills are never
attached. This is the root cause — fix it first.

### File: `dashboard-api/DashboardAPI.gs`

Find this block near line 494 (inside `getWeekSchedule`, after the `byTech` map is built):

```js
// FIND:
    // Build techs array in the shape the frontend mapTech expects
    var techList = Object.keys(byTech).map(function(name) {
      return { techId: name, techName: name, jobsRemaining: 0 };
    });

// REPLACE WITH:
    // Enrich techs with badge (employee ID), rank, and skills from Tech Roster
    var trSheetEnrich = getTRSheet();
    var trEnrichMap = {};
    if (trSheetEnrich && trSheetEnrich.getLastRow() >= 2) {
      var trEnrichData = trSheetEnrich.getDataRange().getValues();
      trEnrichData.slice(1).forEach(function(row) {
        var n = String(row[DA_TR.NAME] || '').trim();
        if (!n) return;
        trEnrichMap[n] = {
          badge : String(row[DA_TR.BADGE] || '').trim(),
          rank  : String(row[DA_TR.RANK]  || '').trim(),
          skills: {
            Carpentry          : Number(row[DA_TR.CARPENTRY])    || 0,
            Plumbing           : Number(row[DA_TR.PLUMBING])     || 0,
            Electrical         : Number(row[DA_TR.ELECTRICAL])   || 0,
            'Finish Carpentry' : Number(row[DA_TR.FINISH_CARP])  || 0,
            Structural         : Number(row[DA_TR.STRUCTURAL])   || 0,
            Landscaping        : Number(row[DA_TR.LANDSCAPING])  || 0,
            Janitorial         : Number(row[DA_TR.JANITORIAL])   || 0
          }
        };
      });
    }

    var techList = Object.keys(byTech).map(function(name) {
      var tr = trEnrichMap[name] || {};
      return {
        techId      : name,
        techName    : name,
        jobsRemaining: 0,
        badge       : tr.badge  || '',
        rank        : tr.rank   || '',
        skills      : tr.skills || {}
      };
    });
```

### Deploy after this change:
```
cd dashboard-api && clasp push --force && clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v17 — enrich getWeekSchedule techs with badge/rank/skills"
```

Report the confirmed version number.

---

## MANDATORY PRE-WORK B — Fix TechStatus interface + mapTech() in dashboard-api.ts

Two issues in `tech-pwa/src/lib/dashboard-api.ts`:

**Issue 1:** `TechStatus.badge` comment is wrong — `badge` is the numeric employee ID
(Tech Roster col B, e.g. "101"), not the rank code. Rank code is a separate field `rank`.

**Issue 2:** `mapTech()` drops `badge`, `rank`, and `skills` from the raw response.

### Fix the TechStatus interface (lines ~19–32):

```ts
// FIND:
export interface TechStatus {
  techId: string;
  techName: string;
  status: 'ON JOB' | 'ON BREAK' | 'CLOCKED OUT' | 'UNSCHEDULED';
  currentAddress?: string;
  elapsedMin?: number;
  jobsRemaining: number;
  violations?: string[];
  clockIn?: string;
  // Preserved from raw getTechList response for scheduling
  badge?: string;   // rank code: C, L, L1, L2, T
  skills?: Record<string, number>; // skill ratings by code
  active?: boolean;
}

// REPLACE WITH:
export interface TechStatus {
  techId: string;
  techName: string;
  status: 'ON JOB' | 'ON BREAK' | 'CLOCKED OUT' | 'UNSCHEDULED';
  currentAddress?: string;
  elapsedMin?: number;
  jobsRemaining: number;
  violations?: string[];
  clockIn?: string;
  badge?: string;   // numeric employee ID (e.g. "101") — matches Tech Roster col B
  rank?: string;    // rank code: C, L, L1, L2, T
  skills?: Record<string, number>; // skill ratings by full name; 1=primary, 2=secondary, 3=supporting, 0=omit
  active?: boolean;
}
```

### Fix mapTech() return block (lines ~95–104):

```ts
// FIND:
  return {
    techId:         raw.techId   || '',
    techName:       raw.techName || '',
    status,
    currentAddress: raw.address  || undefined,
    elapsedMin:     raw.elapsedMin,
    jobsRemaining:  raw.jobsRemaining ?? 0,
    violations:     violations.length ? violations : undefined,
    clockIn:        raw.clockIn || undefined,
  };

// REPLACE WITH:
  return {
    techId:         raw.techId   || '',
    techName:       raw.techName || '',
    status,
    currentAddress: raw.address  || undefined,
    elapsedMin:     raw.elapsedMin,
    jobsRemaining:  raw.jobsRemaining ?? 0,
    violations:     violations.length ? violations : undefined,
    clockIn:        raw.clockIn  || undefined,
    badge:          raw.badge    || undefined,
    rank:           raw.rank     || undefined,
    skills:         raw.skills   || undefined,
    active:         raw.active   ?? undefined,
  };
```

---

## REFERENCE DATA — Decode maps for TechProfileModal

### Rank decode (rank field → display label)
```ts
const RANK_LABELS: Record<string, string> = {
  'C':  'Captain',
  'L':  'Lieutenant',
  'L1': '1st Lieutenant',
  'L2': '2nd Lieutenant',
  'T':  'Trainee',
};
```

### Skills — NO decode needed
The API returns skills with full names as keys (`"Carpentry"`, `"Plumbing"`, etc.).
Use the key directly. Filter out any skill with rating `=== 0` (unrated).

### Skill rating interpretation (lower = better)
| Rating | Color | Label |
|--------|-------|-------|
| 1      | `text-[var(--accent)]` | Primary |
| 2      | `text-yellow-400`       | Secondary |
| 3      | `text-[var(--text-muted)]` | Supporting |
| 0      | omit entirely | — |

### Employee ID display
`tech.badge` = numeric employee ID (e.g. `"101"`). Display as `EMP #101` in the modal header.

### Trainee rule (display warning in TechProfileModal)
If `tech.rank === 'T'`: show a warning badge — `"Trainee — must be paired with Captain or Lieutenant"`

---

## PART 1 — SchedulePageComponents.tsx

### 1a — Add TechProfileModal

Add this component at the bottom of the file (before the closing of the last export):

```tsx
// ─────────────────────────────────────────────────────────────────────────────
// Tech Profile Modal
// ─────────────────────────────────────────────────────────────────────────────

interface TechProfileModalProps {
  tech: import('@/lib/dashboard-api').TechStatus | null;
  weekDates: string[];
  gridData: Record<string, Job[]>; // dateStr → jobs for this tech
  isOpen: boolean;
  onClose: () => void;
  onJobClick?: (job: Job) => void;
}

const RANK_LABELS: Record<string, string> = {
  C: 'Captain', L: 'Lieutenant', L1: '1st Lieutenant', L2: '2nd Lieutenant', T: 'Trainee',
};

export function TechProfileModal({ tech, weekDates, gridData, isOpen, onClose, onJobClick }: TechProfileModalProps) {
  if (!tech) return null;

  // tech.rank = rank code (C/L/L1/L2/T); tech.badge = numeric employee ID ("101")
  const rank = RANK_LABELS[tech.rank || ''] || tech.rank || 'Tech';
  const isTrainee = tech.rank === 'T';
  // Skills come back with full names as keys; rating 0 means unrated — omit those
  const skillEntries = tech.skills
    ? Object.entries(tech.skills).filter(([, rating]) => rating > 0)
    : [];
  const totalWeekHours = weekDates.reduce((sum, d) =>
    sum + (gridData[d] || []).reduce((s, j) => s + (Number(j.estimatedHours) || 0), 0), 0);

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
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-black text-lg border border-[var(--accent)]/20">
                  {tech.techName[0]}
                </div>
                <div>
                  <h3 className="text-base font-black text-[var(--text-primary)] uppercase tracking-tight">{tech.techName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">{rank}</span>
                    {tech.badge && (
                      <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                        EMP #{tech.badge}
                      </span>
                    )}
                    {isTrainee && (
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[8px] font-black uppercase tracking-widest">
                        Pair Required
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <CloseIcon size={18} />
              </button>
            </div>

            {/* Skills */}
            {skillEntries.length > 0 && (
              <div className="px-6 pt-5 pb-4 border-b border-white/5 shrink-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3">Skill Profile</p>
                <div className="flex flex-wrap gap-2">
                  {skillEntries
                    .sort(([, a], [, b]) => a - b)
                    .map(([skillName, rating]) => (
                      <div key={skillName} className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                        rating === 1 ? 'border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]' :
                        rating === 2 ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' :
                        'border-white/10 bg-white/5 text-[var(--text-muted)]'
                      }`}>
                        <span>{skillName}</span>
                        <span className="opacity-60">·</span>
                        <span>{rating === 1 ? 'Primary' : rating === 2 ? 'Secondary' : 'Supporting'}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Week stats */}
            <div className="px-6 py-4 border-b border-white/5 shrink-0">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Week Load</p>
                <span className={`text-sm font-black ${totalWeekHours > 40 ? 'text-urgent' : 'text-[var(--text-primary)]'}`}>
                  {totalWeekHours.toFixed(1)} / 40.0 hrs
                </span>
              </div>
              {totalWeekHours > 40 && (
                <p className="text-[9px] text-urgent font-black uppercase tracking-widest mt-1 animate-pulse">Over capacity this week</p>
              )}
            </div>

            {/* Week schedule */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {weekDates.map(dateStr => {
                const dayJobs = gridData[dateStr] || [];
                const d = new Date(dateStr + 'T12:00:00');
                const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                const dayHours = dayJobs.reduce((s, j) => s + (Number(j.estimatedHours) || 0), 0);

                return (
                  <div key={dateStr} className="border-b border-white/5 last:border-0">
                    <div className="px-6 py-3 flex items-center justify-between bg-white/[0.02]">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">{dayLabel}</span>
                      <span className="text-[10px] font-black text-[var(--text-muted)]">
                        {dayJobs.length} job{dayJobs.length !== 1 ? 's' : ''} · {dayHours.toFixed(1)}h
                      </span>
                    </div>
                    {dayJobs.length === 0 ? (
                      <div className="px-6 py-3 text-[9px] text-[var(--text-muted)] opacity-30 font-black uppercase tracking-widest italic">
                        No assignments
                      </div>
                    ) : (
                      <div className="px-4 py-2 space-y-2">
                        {dayJobs
                          .sort((a, b) => (a.scheduledTime || '').localeCompare(b.scheduledTime || ''))
                          .map(job => (
                            <button
                              key={job.jobId}
                              onClick={() => { onJobClick?.(job); onClose(); }}
                              className="w-full text-left p-3 bg-[var(--bg-primary)] border border-white/5 rounded-xl hover:border-[var(--accent)]/30 transition-all group"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-[10px] font-black text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                                  {job.address}{job.unit ? ` · Unit ${job.unit}` : ''}
                                </p>
                                <span className="text-[8px] font-black text-[var(--text-muted)] whitespace-nowrap shrink-0">
                                  {job.scheduledTime || 'TBD'} · {job.estimatedHours || '?'}h
                                </span>
                              </div>
                              <p className="text-[8px] text-[var(--accent)] uppercase tracking-wide mt-1 font-black">{job.serviceCategory}</p>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
```

### 1b — Add DateDetailModal

Add this component after TechProfileModal in the same file:

```tsx
// ─────────────────────────────────────────────────────────────────────────────
// Date Detail Modal
// ─────────────────────────────────────────────────────────────────────────────

interface DateDetailModalProps {
  dateStr: string | null;
  techs: import('@/lib/dashboard-api').TechStatus[];
  gridData: Record<string, Record<string, Job[]>>; // techName → dateStr → jobs
  isOpen: boolean;
  onClose: () => void;
  onJobClick?: (job: Job) => void;
}

export function DateDetailModal({ dateStr, techs, gridData, isOpen, onClose, onJobClick }: DateDetailModalProps) {
  if (!dateStr) return null;

  const d = new Date(dateStr + 'T12:00:00');
  const dayLabel = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const techsWithJobs = techs
    .map(tech => ({
      tech,
      jobs: (gridData[tech.techName]?.[dateStr] || [])
        .sort((a, b) => (a.scheduledTime || '').localeCompare(b.scheduledTime || ''))
    }))
    .filter(({ jobs }) => jobs.length > 0);

  const totalJobs = techsWithJobs.reduce((s, { jobs }) => s + jobs.length, 0);
  const totalHours = techsWithJobs.reduce(
    (s, { jobs }) => s + jobs.reduce((ss, j) => ss + (Number(j.estimatedHours) || 0), 0), 0
  );

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
                  {totalJobs} work order{totalJobs !== 1 ? 's' : ''} · {totalHours.toFixed(1)} hrs committed
                </p>
              </div>
              <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <CloseIcon size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {techsWithJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-[var(--text-muted)] opacity-30">
                  <p className="text-[10px] font-black uppercase tracking-widest">No work orders scheduled</p>
                </div>
              ) : (
                techsWithJobs.map(({ tech, jobs }) => {
                  const dayHours = jobs.reduce((s, j) => s + (Number(j.estimatedHours) || 0), 0);
                  return (
                    <div key={tech.techId} className="border-b border-white/5 last:border-0">
                      <div className="px-6 py-3 bg-white/[0.02] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-black text-xs border border-[var(--accent)]/20 shrink-0">
                            {tech.techName[0]}
                          </div>
                          <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-tight">{tech.techName}</span>
                        </div>
                        <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                          {jobs.length} job{jobs.length !== 1 ? 's' : ''} · {dayHours.toFixed(1)}h
                        </span>
                      </div>
                      <div className="px-4 py-2 space-y-2">
                        {jobs.map(job => (
                          <button
                            key={job.jobId}
                            onClick={() => { onJobClick?.(job); onClose(); }}
                            className="w-full text-left p-3 bg-[var(--bg-primary)] border border-white/5 rounded-xl hover:border-[var(--accent)]/30 transition-all group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-[10px] font-black text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                                {job.address}{job.unit ? ` · Unit ${job.unit}` : ''}
                              </p>
                              <span className="text-[8px] font-black text-[var(--text-muted)] whitespace-nowrap shrink-0">
                                {job.scheduledTime || 'TBD'} · {job.estimatedHours || '?'}h
                              </span>
                            </div>
                            <p className="text-[8px] text-[var(--accent)] uppercase tracking-wide mt-1 font-black">{job.serviceCategory}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
```

### 1c — Add onClick to TechLaneHeader

Find the TechLaneHeader interface and function:

```ts
// FIND:
interface TechLaneHeaderProps {
  techName: string;
  badge?: string;
  todayHours: number;
  weekHours?: number;
}

// REPLACE WITH:
interface TechLaneHeaderProps {
  techName: string;
  badge?: string;
  todayHours: number;
  weekHours?: number;
  onClick?: () => void;
}
```

Find the outer div in TechLaneHeader:

```tsx
// FIND:
<div className="w-48 shrink-0 border-r border-white/5 bg-[var(--bg-surface)]/50 backdrop-blur-sm sticky left-0 z-20 flex flex-col">

// REPLACE WITH:
<div
  className={`w-48 shrink-0 border-r border-white/5 bg-[var(--bg-surface)]/50 backdrop-blur-sm sticky left-0 z-20 flex flex-col transition-colors ${onClick ? 'cursor-pointer hover:bg-[var(--accent)]/5' : ''}`}
  onClick={onClick}
>
```

Pass onClick through in the function signature:

```tsx
// FIND:
export function TechLaneHeader({ techName, badge, todayHours, weekHours = 0 }: TechLaneHeaderProps) {

// REPLACE WITH:
export function TechLaneHeader({ techName, badge, todayHours, weekHours = 0, onClick }: TechLaneHeaderProps) {
```

---

## PART 2 — schedule/page.tsx

### 2a — Add state for modals

After existing `useState` declarations, add:

```ts
const [selectedTech, setSelectedTech] = useState<import('@/lib/dashboard-api').TechStatus | null>(null);
const [selectedDate, setSelectedDate] = useState<string | null>(null);
const [isTechModalOpen, setIsTechModalOpen] = useState(false);
const [isDateModalOpen, setIsDateModalOpen] = useState(false);
```

### 2b — Import the new modals

Add to the existing import from `SchedulePageComponents`:

```ts
// FIND:
import { 
  DraggableJobCard, 
  DroppableScheduleCell, 
  TechLaneHeader,
  DurationSelectorModal
} from "@/components/dashboard/SchedulePageComponents";

// REPLACE WITH:
import { 
  DraggableJobCard, 
  DroppableScheduleCell, 
  TechLaneHeader,
  DurationSelectorModal,
  TechProfileModal,
  DateDetailModal,
} from "@/components/dashboard/SchedulePageComponents";
```

### 2c — Wire TechLaneHeader onClick

```tsx
// FIND:
<TechLaneHeader
  techName={tech.techName}
  badge={tech.badge}
  todayHours={todayHours}
  weekHours={weekHours}
/>

// REPLACE WITH:
<TechLaneHeader
  techName={tech.techName}
  badge={tech.badge}
  todayHours={todayHours}
  weekHours={weekHours}
  onClick={() => { setSelectedTech(tech); setIsTechModalOpen(true); }}
/>
```

### 2d — Wire date column headers to DateDetailModal

Find the day headers map in the grid header section:

```tsx
// FIND (the return of each day header):
<div key={dateStr} className={`flex-1 p-4 border-r border-white/5 flex flex-col items-center justify-center min-w-[200px] ${isToday ? 'bg-[var(--accent)]/8 border-b-2 border-b-[var(--accent)]' : ''}`}>
   <span className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
   <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-tighter mt-1">{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
</div>

// REPLACE WITH:
<button
  key={dateStr}
  onClick={() => { setSelectedDate(dateStr); setIsDateModalOpen(true); }}
  className={`flex-1 p-4 border-r border-white/5 flex flex-col items-center justify-center min-w-[200px] cursor-pointer hover:bg-white/[0.03] transition-colors ${isToday ? 'bg-[var(--accent)]/8 border-b-2 border-b-[var(--accent)]' : ''}`}
>
  <span className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
  <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-tighter mt-1">{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
</button>
```

Note: The map over `weekDates` uses `key` on the element — move `key={dateStr}` to the `<button>` since it's now the root element.

### 2e — Add modals to JSX (before the closing `</DashboardLayout>`)

```tsx
{/* Add before </DashboardLayout> */}
<TechProfileModal
  tech={selectedTech}
  weekDates={weekDates}
  gridData={selectedTech ? (gridData[selectedTech.techName] || {}) : {}}
  isOpen={isTechModalOpen}
  onClose={() => { setIsTechModalOpen(false); setSelectedTech(null); }}
  onJobClick={(job) => { setSelectedJob(job); }}
/>

<DateDetailModal
  dateStr={selectedDate}
  techs={techs}
  gridData={gridData}
  isOpen={isDateModalOpen}
  onClose={() => { setIsDateModalOpen(false); setSelectedDate(null); }}
  onJobClick={(job) => { setSelectedJob(job); }}
/>
```

### 2f — CSS variable fix on chevron nav container (visibility fix)

This is the info + chevron row in the header. The nav spec (ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md) replaces these chevrons with wired-up ones. When you implement that spec, ensure the chevron wrapper uses:
- `border-[var(--border-subtle)]` (not `border-white/20`)
- `text-[var(--text-muted)]` on chevron buttons (not `text-white`)

The nav spec already includes this — do not override it.

---

## PART 3 — weekly-schedule/page.tsx

### 3a — Add selectedDate state and JobDetailModal

Add after existing state declarations:

```ts
const [selectedJob, setSelectedJob] = useState<Job | null>(null);
const [selectedDate, setSelectedDate] = useState<string | null>(null);
const [isDateModalOpen, setIsDateModalOpen] = useState(false);
```

### 3b — Add imports

```ts
// ADD to existing lucide-react import if not present:
// (ChevronLeft and ChevronRight come from the nav spec — do not re-add if already there)

// ADD new component imports:
import JobDetailModal from "@/components/dashboard/JobDetailModal";
import { DateDetailModal } from "@/components/dashboard/SchedulePageComponents";
```

### 3c — Wire day column headers to DateDetailModal

The weekly-schedule page renders day columns in a `weekDates.map(...)`. Find the outer column div for each day:

```tsx
// FIND (the outer div that starts each day column):
<div
  key={dateStr}
  className={`flex-1 flex flex-col min-w-[160px] rounded-2xl border overflow-hidden ${
    isToday
      ? 'border-[var(--accent)]/30 bg-[var(--accent)]/5'
      : 'border-white/5 bg-[var(--bg-surface)]/20'
  }`}
>
  {/* Day header */}
  <div className={`p-3 border-b shrink-0 ${isToday ? 'border-[var(--accent)]/20' : 'border-white/5'}`}>
```

Wrap ONLY the day header div (not the entire column) with a clickable element:

```tsx
{/* Replace the day header div with: */}
<button
  onClick={() => { setSelectedDate(dateStr); setIsDateModalOpen(true); }}
  className={`p-3 border-b shrink-0 w-full text-left cursor-pointer hover:bg-white/[0.03] transition-colors ${isToday ? 'border-[var(--accent)]/20' : 'border-white/5'}`}
>
  {/* keep all inner content of the day header unchanged */}
</button>
```

### 3d — Wire job cards to JobDetailModal

The weekly-schedule job cards are inside `dayJobs.map(job => ...)`. Find the job card div:

```tsx
// FIND:
<div
  key={job.jobId}
  className="p-3 bg-[var(--bg-surface)] border border-white/5 rounded-xl hover:border-white/10 transition-colors"
>

// REPLACE WITH:
<button
  key={job.jobId}
  onClick={() => setSelectedJob(job)}
  className="w-full text-left p-3 bg-[var(--bg-surface)] border border-white/5 rounded-xl hover:border-[var(--accent)]/30 transition-all group cursor-pointer"
>
```

Close the button tag at the same location the original `</div>` was.

### 3e — Build a synthetic techMap for DateDetailModal

The weekly-schedule page doesn't have a `techs` array or `gridData` map — it has `jobsByDate`. Build a synthetic structure for the DateDetailModal above the return statement:

```tsx
// ADD above return:
const weeklyTechs = useMemo((): import('@/lib/dashboard-api').TechStatus[] => {
  const techSet = new Map<string, import('@/lib/dashboard-api').TechStatus>();
  scheduledJobs.forEach(j => {
    const name = j.assignedTech || 'Unassigned';
    if (!techSet.has(name)) {
      techSet.set(name, { techId: name, techName: name, status: 'UNSCHEDULED', jobsRemaining: 0 });
    }
  });
  return Array.from(techSet.values());
}, [scheduledJobs]);

const weeklyGridData = useMemo((): Record<string, Record<string, Job[]>> => {
  const map: Record<string, Record<string, Job[]>> = {};
  scheduledJobs.forEach(j => {
    const name = j.assignedTech || 'Unassigned';
    if (!map[name]) map[name] = {};
    if (!map[name][j.scheduledDate]) map[name][j.scheduledDate] = [];
    map[name][j.scheduledDate].push(j);
  });
  return map;
}, [scheduledJobs]);
```

### 3f — Add modals to JSX

```tsx
{/* Add before </DashboardLayout> */}
<JobDetailModal
  key={selectedJob?.jobId}
  job={selectedJob}
  onClose={() => setSelectedJob(null)}
/>

<DateDetailModal
  dateStr={selectedDate}
  techs={weeklyTechs}
  gridData={weeklyGridData}
  isOpen={isDateModalOpen}
  onClose={() => { setIsDateModalOpen(false); setSelectedDate(null); }}
  onJobClick={(job) => { setSelectedJob(job); }}
/>
```

---

## VERIFICATION

1. `npx tsc --noEmit` — zero errors
2. Click "WED APR 23" column header on Ready to Schedule → DateDetailModal opens centered, lists all work orders for that day grouped by tech
3. Click a job inside DateDetailModal → DateDetailModal closes, JobDetailModal opens
4. Click a tech header row (e.g., "Arteaga, Jose") → TechProfileModal opens with rank, skill profile, week schedule
5. Click a job inside TechProfileModal → TechProfileModal closes, JobDetailModal opens
6. On Weekly Schedule page: click any job card → JobDetailModal opens
7. On Weekly Schedule page: click a date column header → DateDetailModal opens
8. Toggle light/dark mode → chevron buttons and all modal text use CSS variable colors, no hardcoded white/black

---

## DO NOT TOUCH
- DnD drop handler logic in schedule/page.tsx
- DurationSelectorModal
- The sidebar readyToScheduleJobs section
- CLAUDE.md
- Any file not listed above

---

## COMMIT MESSAGE
`feat: tech profile modal, date detail modal, job card links on weekly schedule`
