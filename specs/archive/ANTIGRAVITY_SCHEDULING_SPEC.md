# SCHEDULING WORKFLOW SPEC — Job Detail Modal
# Replaces the current Dispatch section in JobDetailModal.tsx
# This is the core dispatcher workflow. Every interaction must feel inevitable —
# dispatch should never wonder what to do next.

---

## PRINCIPLES

1. The system guides dispatch through a linear workflow. Each step unlocks the next.
2. Status changes automatically. Dispatch never manually sets "Scheduled".
3. Tech selection is a picker, not a text input. Ever.
4. Date/time selection is informed by the selected tech's existing load.
5. Hour estimation is automatic. Dispatch can override but should rarely need to.

---

## STATUS SET (replace all existing statuses)

```typescript
type JobStatus =
  | 'New'               // just parsed, not reviewed
  | 'Ready to Schedule' // cleared, no blockers
  | 'PTE Required'      // needs tenant permission (replaces PTE-Pending + Tenant Contacted)
  | 'Awaiting Approval' // estimate sent, waiting RM sign-off
  | 'Scheduled'         // tech + date + time confirmed (AUTO-SET on save)
  | 'In Progress'       // tech clocked in (AUTO-SET by PWA)
  | 'Complete'          // tech marked done (AUTO-SET by PWA)
  | 'Archived'          // not proceeding
```

Status badge colors:
- New: neutral gray
- Ready to Schedule: blue
- PTE Required: amber
- Awaiting Approval: purple
- Scheduled: green
- In Progress: orange (pulsing dot)
- Complete: dark green
- Archived: muted/strikethrough

**Auto-transition rule (enforced on Save Changes):**
If `assignedTech` is filled AND `scheduledDate` is filled AND `scheduledTime` is filled
→ status automatically becomes `'Scheduled'` regardless of what the dropdown says.

---

## DISPATCH SECTION — FULL REDESIGN

The Dispatch section of the right panel renders differently based on current status.

---

### STATE: New

Show a single "TRIAGE" action panel:

```
┌─────────────────────────────────────────────────────┐
│  TRIAGE THIS JOB                                     │
│                                                      │
│  Does this job require tenant permission to enter?   │
│                                                      │
│  [  YES — PTE REQUIRED  ]   [  NO — READY TO SCHEDULE  ]  │
└─────────────────────────────────────────────────────┘
```

- "YES" → sets status to "PTE Required", surfaces the PTE workflow (see below)
- "NO" → sets status to "Ready to Schedule", surfaces the scheduling workflow

Also show:
```
[ NEEDS ESTIMATE APPROVAL ]   — sets status to "Awaiting Approval"
[ ARCHIVE ]                   — sets status to "Archived"
```

---

### STATE: Ready to Schedule

Three-step guided flow. Steps unlock in sequence.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 OF 3 — SELECT TECHNICIAN(S)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Tech Picker** — NOT a text input. A searchable list showing ALL active techs.

Each tech row shows:
- Name
- **Rank badge** — pulled from `tech.badge` field via Keith's rank key:
  - `C` = Captain (blue badge)
  - `L` = Lieutenant (green badge)
  - `L1` = 1st Lieutenant (green badge)
  - `L2` = 2nd Lieutenant (green badge)
  - `T` = Trainee (amber badge — with warning: "Cannot be assigned solo")
- Skill match badge for the job's service category (STRONG / MODERATE / WEAK based on roster rating)
  - Skill codes: C=Carpentry, P=Plumbing, E=Electrical, FC=Finish Carpentry, S=Structural, L=Landscaping, J=Janitorial
- Today's scheduled hours / daily capacity (e.g., "4.5 / 8 hrs")
- Availability indicator (green = available, yellow = partial, red = at capacity)
- SuggestTechs score shown as a subtle rank indicator (not the primary UI element)

**Trainee rule:** If the only selected tech is rank T (Trainee), show a warning banner:
```
⚠ TRAINEE ASSIGNED WITHOUT SUPERVISION — add a Captain or Lieutenant to this job
```
Do NOT block the save — show the warning and let dispatch decide. The rule is enforced socially, not technically.

Default sort: best skill match + most available hours first.
Search: type to filter by name.
Multi-select: dispatch can select multiple techs for the same job (crew).

Selected techs appear as chips above the list. Can be removed with X.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 OF 3 — SELECT DATE
(unlocks after at least one tech selected)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**7-day rolling date picker** — not a bare HTML date input. A row of day cards:

```
[ MON 4/21 ]  [ TUE 4/22 ]  [ WED 4/23 ]  [ THU 4/24 ]  [ FRI 4/25 ]  [ MON 4/28 ]  [ TUE 4/29 ]
   4.5 hrs       FULL          2 hrs         6 hrs          1 hr          8 hrs          8 hrs
   available    ⛔             available     available      available     available      available
```

Each card shows the selected tech's remaining available hours for that day.
- FULL (≥8 hrs committed) → grayed out, not selectable
- "available" → selectable
- If multiple techs selected, shows the most constrained tech's availability

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 OF 3 — SET ARRIVAL WINDOW & HOURS
(unlocks after date selected)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Arrival time** — a select/dropdown (not bare time input) with slots:
- 7:00 AM, 7:30 AM, 8:00 AM ... 3:00 PM (30 min increments)
- Slots already occupied by the tech's other jobs are grayed out

**Estimated Hours** — pre-filled from Trade Duration Defaults for this service category.
Label: "ESTIMATED HOURS (system estimate — override if needed)"
Dispatch can edit. The value they set (or confirm) feeds the learning loop.

**Confirmation summary** before save:
```
┌────────────────────────────────────────────┐
│  JOSE MANUEL ARTEAGA                        │
│  Monday, April 21 · 8:00 AM                 │
│  Est. 3 hours  (leaves 1 hr capacity)       │
│                                             │
│  ⚠ Tech already has 1 job that day          │
└────────────────────────────────────────────┘
```

**On Save Changes:**
- Status auto-sets to "Scheduled" (no manual status change needed)
- Calendar event created (existing createOrUpdateCalendarEvent backend)
- Row color on live table updates to green

---

### STATE: PTE Required

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERMISSION TO ENTER REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Tenant contact info displayed prominently:
- Name, Phone (tap to call), Email

Action buttons:
- [EMAIL TENANT] → loads PTE template into reply composer (left panel)
- [CALL TENANT] → tel: link
- [MARK PTE GRANTED] → changes status to "Ready to Schedule", surfaces scheduling flow

Note: scheduling controls are hidden/locked while PTE Required. System enforces this.

---

### STATE: Scheduled

Shows a read-only summary with edit capability:

```
┌────────────────────────────────────────────┐
│  ✓ SCHEDULED                                │
│                                             │
│  JOSE MANUEL ARTEAGA                        │
│  Tuesday, April 21 · 8:00 AM · ~3 hrs       │
│                                             │
│  [RESCHEDULE]    [MARK COMPLETE]            │
└────────────────────────────────────────────┘
```

[RESCHEDULE] → reopens the 3-step scheduling flow with current values pre-filled.
[MARK COMPLETE] → sets status to Complete, triggers billing notification.

---

### STATE: In Progress / Complete

In Progress: shows clock-in time, elapsed time, tech name. No editing.
Complete: shows completion time, tech name. Shows [READY TO INVOICE] button (Phase 3).

---

## WHAT TO REMOVE FROM CURRENT MODAL

- The bare `<input type="text">` for Assigned Technician — replaced by tech picker
- The bare `<input type="date">` and `<input type="time">` — replaced by day cards + slot picker
- The star icon that shows 3 suggestions — replaced by the full sorted tech list
- The status dropdown that dispatch manually sets — replaced by auto-transitions
- The big centered status HUD panels — replaced by the step-based workflow above

---

## DATA REQUIREMENTS FROM BACKEND (Claude Code handles these)

The frontend needs these from the API to power the above:

1. **Tech availability per day** — for each tech, how many hours are already scheduled
   → Call `getWeekSchedule`, sum `estimatedHours` per tech per day
   → Expose as `{ techName: { "2026-04-21": 4.5, "2026-04-22": 8 } }`

2. **Trade Duration Defaults** — already in DashboardAPI (`loadDurationsDA`)
   → Add `getTradeDurations` action to DashboardAPI.gs that returns the full map
   → Frontend pre-fills Est. Hours from this on modal open

3. **Full tech list with skill ratings** — already returned by `getTechList`
   → Frontend uses skill rating for the job's service category to sort/badge the picker

4. **Status update** — `updateJob` already exists, just needs to enforce the auto-transition rule
   → If assignedTech + scheduledDate + scheduledTime all present → force status = 'Scheduled'
   → This can be enforced on the frontend before the API call

---

## WC CODE AUTO-CLASSIFICATION (backend — Claude Code)

Do NOT implement this in the frontend. This is noted here for context only.

When a job is saved with a tech assigned:
- Backend looks up tech's hourly rate from Tech Roster (new column to be added)
- Maps service category + wage rate → WC class code
- Writes WC code to the job record (new field in Dispatch Queue col or Job Performance History)
- WC code visible in the completed job record for payroll reporting

Tech Roster needs: add column Q = "Hourly Rate" (number, e.g. 28.50)

---

## LIVE TABLE — STATUS FILTER UPDATE

Add "Ready to Schedule" to the filter options (alongside Lapham/Turnover/etc).
This is Robert's primary working queue — jobs that need to be dispatched today.
It should be the DEFAULT filter when the live page loads, not "ALL".

Change the default filter from ALL to "Ready to Schedule" so Robert's first view
is always his action queue, not the entire job list.
