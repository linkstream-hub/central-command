# ANTIGRAVITY_CREW_SCHEDULING_SPEC.md
# Crew / Multi-Tech Scheduling — Backend + Display Wiring
# Sprint 33 | Spec author: Claude Code | Date: 2026-04-28

---

## Context

`SchedulingDispatch.tsx` already stores multiple assigned techs as a comma-separated string
in `job.assignedTech` (e.g. `"John Smith, Mike Torres"`). The multi-select UI is live.

**What is broken:** The backend reads `assignedTech` as a single name and matches it
exactly against tech lane keys. A crew job only appears in the first tech's lane (or
none at all). TechPWA.gs `isTechMatch` uses badge matching that also only handles one
tech at a time.

**Schema:** No sheet column changes. DQ col 17 already accepts the comma-separated string.
No migration needed — single-tech jobs are unchanged.

---

## SPEC 1 — DashboardAPI.gs: getWeekSchedule

### File: `dashboard-api/DashboardAPI.gs`

### Find in `getWeekSchedule`:

```javascript
        if (techName && byTech[techName]) {
          if (!byTech[techName][sched.date]) byTech[techName][sched.date] = [];
          byTech[techName][sched.date].push(job);
        } else {
          unassigned.push(job);
        }
```

### Replace with:

```javascript
        // Support crew (comma-separated tech names)
        var techNames = techName ? techName.split(',').map(function(n) { return n.trim(); }).filter(Boolean) : [];
        var matched = false;
        techNames.forEach(function(name) {
          if (byTech[name]) {
            if (!byTech[name][sched.date]) byTech[name][sched.date] = [];
            byTech[name][sched.date].push(job);
            matched = true;
          }
        });
        if (!matched) {
          unassigned.push(job);
        }
```

---

## SPEC 2 — DashboardAPI.gs: getTodaySchedule

### File: `dashboard-api/DashboardAPI.gs`

### Find in `getTodaySchedule`:

```javascript
      if (job.assignedTech) {
        if (!byTech[job.assignedTech]) byTech[job.assignedTech] = [];
        byTech[job.assignedTech].push(job);
      } else {
        unassigned.push(job);
      }
```

### Replace with:

```javascript
      // Support crew (comma-separated tech names)
      var techNames = job.assignedTech
        ? job.assignedTech.split(',').map(function(n) { return n.trim(); }).filter(Boolean)
        : [];
      var matched = false;
      techNames.forEach(function(name) {
        if (!byTech[name]) byTech[name] = [];
        byTech[name].push(job);
        matched = true;
      });
      if (!matched) {
        unassigned.push(job);
      }
```

---

## SPEC 3 — TechPWA.gs: isTechMatch

### File: `TechPWA.gs`

### Find:

```javascript
function isTechMatch(assignedCell, badge) {
  \ Assigned Tech cell format: "Name #Badge" — match by badge number
  var m = String(assignedCell || '').match(/#(\d+)/);
  return m ? m[1] === String(badge) : false;
}
```

### Replace with:

```javascript
function isTechMatch(assignedCell, badge) {
  // Support crew: comma-separated "Name #Badge, Name #Badge"
  // Match if badge appears in ANY segment
  var segments = String(assignedCell || '').split(',');
  return segments.some(function(seg) {
    var m = seg.match(/#(\d+)/);
    return m ? m[1] === String(badge) : false;
  });
}
```

---

## SPEC 4 — Display: Crew Badge on Job Cards

### File: `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx`

Inside `DraggableJobCard`, find where `job.estHours` or job address is displayed in the card body. Add a crew badge immediately after the address/category line when multiple techs are assigned:

### Find (the address/category display block — it will look similar to):

```tsx
            <p className="text-[9px] text-[var(--text-muted)] truncate">{job.address}</p>
```

### Add AFTER that line:

```tsx
            {job.assignedTech && job.assignedTech.includes(',') && (
              <div className="flex items-center gap-1 mt-0.5">
                <Users size={9} className="text-[var(--accent)] opacity-70" />
                <span className="text-[8px] font-black text-[var(--accent)] uppercase tracking-widest opacity-70">
                  Crew · {job.assignedTech.split(',').length} techs
                </span>
              </div>
            )}
```

> **Note:** Import `Users` from `lucide-react` if not already imported. Check existing imports first.

---

## SPEC 5 — Display: Confirmed State in SchedulingDispatch

### File: `tech-pwa/src/components/dashboard/SchedulingDispatch.tsx`

The confirmed state currently shows `job.assignedTech` as a raw string. When it's a crew job this reads correctly as comma-separated names, but format it more cleanly.

### Find (in the confirmed/scheduled display section):

```tsx
          <p className="text-sm font-black text-[var(--text-primary)]">{job.assignedTech}</p>
```

This line appears **twice** (once for Scheduled state, once for In Progress state). Replace **both** with:

```tsx
          <div className="flex flex-wrap gap-1 mt-1">
            {(job.assignedTech || '').split(',').map(name => name.trim()).filter(Boolean).map(name => (
              <span key={name} className="text-[10px] font-black text-[var(--text-primary)] bg-white/5 rounded px-2 py-0.5">
                {name}
              </span>
            ))}
          </div>
```

---

## What Must NOT Change

- `SchedulingDispatch.tsx` multi-select logic — already correct, do not touch
- `SchedulingDispatch.tsx` `toggleTech` + `onUpdate({ assignedTech: next.join(", ") })` — keep exactly as-is
- `SchedulingDispatch.tsx` trainee-only check — already handles arrays, keep as-is
- `updateJobDA` in DashboardAPI.gs — already writes `assignedTech` string to col 17 as-is, no change needed
- All other files — do not touch

---

## TypeScript Check

Run `npx tsc --noEmit` from `tech-pwa/`. Must pass with 0 errors.

---

## Verification

1. Open a Ready to Schedule job → DISPATCH phase → tech picker shows multi-select checkboxes
2. Select two techs → both appear as selected chips/badges → save → both names appear in confirmed state as separate badges
3. Open `/schedule` grid → the job card appears in **both** assigned techs' lanes on the correct date
4. On the Tech PWA, log in as one of the crew techs → the job appears in their job list
5. Log in as the other crew tech → the job also appears in their job list
6. Log in as a tech NOT on the crew → the job does NOT appear in their job list
7. Sidebar job card for a crew job shows "Crew · 2 techs" badge under the address
8. Single-tech jobs show no crew badge — unchanged behavior
