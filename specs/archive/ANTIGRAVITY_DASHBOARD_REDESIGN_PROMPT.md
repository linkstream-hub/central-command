# APT CENTRAL COMMAND — FULL PLATFORM REDESIGN
# Antigravity Build Brief — Central Command v2
# Last updated: April 18, 2026

---

## VISION

APT Central Command is not a dashboard. It is a mission control room for a field
operations company. When Robert opens it, he should feel the same way an air traffic
controller feels when they sit down at their station — total situational awareness,
every piece in view, complete confidence in what to do next.

The UI should be so far ahead of what a Bay Area property maintenance company normally
uses that it becomes a competitive differentiator and eventually the foundation of
a SaaS product sold to other property management companies.

Technically: rival ServiceTitan ($300-500/user/month) on UX. Beat it on design.

---

## ARCHITECTURE

### Stack
| Layer | Technology | Notes |
|---|---|---|
| Frontend | Next.js 16 + TypeScript + Tailwind CSS | Multi-page app with persistent sidebar |
| Animations | Framer Motion | Physics-based drag, page transitions, micro-interactions |
| Auth | next-auth v5 + Google OAuth | Restricted to @aptmaintenanceinc.com |
| Drag & Drop | @dnd-kit/core | Calendar scheduling, kanban |
| Command Palette | cmdk | Cmd+K global search/navigation |
| Charts | recharts | Utilization, compliance timelines |
| Tooltips/Popovers | @radix-ui/react-tooltip + @radix-ui/react-popover | Hover previews |
| Toasts | sonner | Beautiful minimal notifications |
| API backend | DashboardAPI.gs (Apps Script web app, "Anyone" access) | Built by Claude Code |
| Hosting | Vercel | |
| Clean URL (interim) | Cloudflare Worker → apt-dispatch.workers.dev | No DNS needed |
| Future URL | dispatch.aptmaintenanceinc.com | Pending DNS access |

### Auth
```typescript
providers: [Google({ clientId, clientSecret })],
callbacks: {
  signIn: ({ profile }) => profile?.email?.endsWith('@aptmaintenanceinc.com') ?? false,
}
```
Only @aptmaintenanceinc.com accounts. Clean "Access Denied" page for anyone else.

### API Pattern
```typescript
const api = async (action: string, payload = {}) => {
  const res = await fetch(process.env.NEXT_PUBLIC_DASHBOARD_API_URL!, {
    method: 'POST',
    body: JSON.stringify({ action, ...payload }),
    headers: { 'Content-Type': 'text/plain' },
  });
  return res.json();
};
```

### API Actions (DashboardAPI.gs handles these)
| Action | Description |
|---|---|
| getDispatchData | All non-archived queue jobs |
| getTodaySchedule | Today's jobs grouped by tech |
| getWeekSchedule | Week's jobs grouped by tech + date |
| updateJob | Save job changes |
| archiveJob | Archive a job |
| suggestTechs | Top 3 tech suggestions for a job |
| getGmailThread | Full Gmail thread for a job |
| replyToThread | Send email reply |
| getDraftReply | AI draft reply |
| getTechList | Full tech roster with skills + status |
| getLiveFieldStatus | Clock events from Time Records — who's clocked in now |
| getJobHistory | All past jobs for an address |
| getComplianceStatus | Active tech clock events + break status |
| sendSms | Send OpenPhone SMS (stub — activates when OpenPhone live) |

---

## DESIGN SYSTEM

### Color Palette
```css
/* Base */
--bg-primary:     #0a0e17;   /* deep navy-black — main background */
--bg-surface:     #0f1520;   /* card/panel background */
--bg-elevated:    #161d2e;   /* modals, dropdowns, sidebar */
--bg-input:       #1c2438;   /* input fields */
--border:         #1e2d47;   /* subtle borders */
--border-bright:  #2a3f5f;   /* hover borders */

/* Status — used everywhere consistently, never deviating */
--urgent:         #ff3b3b;  --urgent-bg:    #1f0a0a;
--turnover:       #ff8c00;  --turnover-bg:  #1f1400;
--pte:            #f0c040;  --pte-bg:       #1f1a00;
--scheduled:      #34d058;  --scheduled-bg: #051a0e;
--complete:       #2ea043;  --complete-bg:  #051a0e;
--approval:       #a78bfa;  --approval-bg:  #130e2a;
--open:           #4d9eff;  --open-bg:      #061628;
--archived:       #3d4451;

/* Compliance */
--compliant:      #34d058;
--warning:        #f0c040;
--violation:      #ff3b3b;

/* Text */
--text-primary:   #e2eaf6;
--text-secondary: #7e9ab5;
--text-muted:     #3d5166;

/* Brand */
--accent:         #ff6b2b;   /* APT orange */
--accent-glow:    rgba(255, 107, 43, 0.2);
--accent-subtle:  rgba(255, 107, 43, 0.08);
```

### Typography
- Font family: Inter (variable font)
- Property address: 15px / 600 weight / --text-primary (always most prominent on a row)
- Section headers: 11px / 600 weight / uppercase / letter-spacing: 0.08em / --text-muted
- Body: 13px / 400 / --text-secondary
- Status chips: 10px / 600 / uppercase / letter-spacing: 0.06em
- KPI numbers: 28px / 700 / --text-primary

### Effects
```css
/* Glassmorphism — hero KPI cards */
backdrop-filter: blur(12px);
background: rgba(255,255,255,0.04);
border: 1px solid rgba(255,255,255,0.08);

/* Urgent glow — urgent job rows, alerts */
box-shadow: 0 0 0 1px var(--urgent), 0 0 20px rgba(255,59,59,0.15);

/* Accent glow — primary action buttons */
box-shadow: 0 0 16px var(--accent-glow);

/* Card elevation */
box-shadow: 0 1px 2px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4);
```

### Animated Background
Subtle slow-moving topology mesh rendered on a canvas element behind the header
and hero section. 4% opacity, moves at 0.3px/frame. Stops feeling like a webpage,
starts feeling like a control room. Pauses when the user is idle (performance).

---

## APP STRUCTURE

### Persistent Sidebar (left, 56px collapsed / 220px expanded)
Hover to expand. Click to pin.

```
──────────────
⚡  Live
📅  Schedule
👥  Team
💬  Messages
📋  Jobs
⚖️  Compliance
📊  Intel          ← stub, Phase 4
──────────────
⚙️  Settings       ← admin only
```

Integration status dots next to each icon:
- ● green: healthy / last synced < 30min
- ● orange: stale > 30min
- ● red: error / needs attention

Sidebar bottom: user avatar + name + sign-out link.

### Global Elements (always present)
- **Command palette** (Cmd+K): full-screen overlay, fuzzy search across jobs,
  techs, addresses. Jump anywhere. Built with cmdk.
- **Notification bell**: dropdown showing last 20 system events (new emails parsed,
  tech clocked in, compliance alert, job status changed). Unread count badge.
- **Global search bar** in header: real-time filter, debounced 200ms.

---

## PAGE 1: ⚡ LIVE — THE CHESS BOARD

Default landing page. Answers: "What's happening right now?"

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER: search + bell + user                                    │
├─────────────────────────────────────────────────────────────────┤
│  HERO SUMMARY BAR (glassmorphism cards)                         │
│  [🔴 Urgent] [📋 Needs Action] [⏳ PTE-Pending] [📅 Today] [✅ Done] │
├──────────────────────────────────┬──────────────────────────────┤
│  TODAY'S MOMENTUM STRIP          │                              │
│  ████████░░ 8/14 dispatched      │                              │
├──────────────────────────────────┤  FIELD STATUS (right 36%)   │
│  JOB QUEUE (left 64%)           │                              │
│  [filter tabs]                   │  Live tech cards — clocked  │
│  [table rows]                    │  in first, sorted by status  │
│                                  │                              │
│                                  │  [Salvador · ● ON JOB]      │
│                                  │  [Eduardo  · ○ CLOCKED OUT] │
│                                  │  [Boyette  · ⏸ ON BREAK]   │
│                                  │                              │
├──────────────────────────────────┴──────────────────────────────┤
│  ACTIVITY FEED (bottom strip, auto-scrolling)                   │
│  "New job parsed: 65 Thornton St" · "Salvador clocked in 7:42am"│
└─────────────────────────────────────────────────────────────────┘
```

### Hero Summary Bar
Five glassmorphism cards. Click any to filter the job queue instantly.
Numbers animate with react-countup on load and on change.
Urgent card pulses with red glow if count > 0.

| Card | Color | Logic |
|---|---|---|
| 🔴 Urgent | --urgent | priority = 1-URGENT |
| 📋 Needs Action | --open | Open/unassigned OR stale >48h |
| ⏳ PTE-Pending | --pte | status = PTE-Pending or Tenant Contacted |
| 📅 Scheduled Today | --scheduled | scheduledDate = today |
| ✅ Done This Week | --complete | Archived this week |

### Job Queue Filter Tabs
**Operational, not structural. Remove "Lapham Forms" entirely.**
```
All  |  Needs Action  |  Scheduled  |  PTE-Pending  |  History
```
Badge counts on each. Active tab: accent color with glow.

### Job Table Rows
Min height: 52px. Dense but readable.

**Left edge**: 3px age bar (green < 24h → yellow 24-48h → orange 48-72h → red 72h+)

**Columns**:
- Priority badge (pill: URGENT/TURNOVER/PTE/STD)
- Address + Unit (15px semibold) + RM name below (11px muted)
- Category chip (icon + label)
- Assigned tech (or "⚠ Unassigned" in --urgent)
- Status chip (color-coded)
- Age ("2d ago") + ⏰ if stale
- Quick actions (appear on hover): [Assign] [Schedule] [•••]

**Row hover**: subtle background lift + left border brightens.
**Urgent rows**: --urgent-bg background + 3px left border --urgent + glow.
**Framer Motion**: new rows slide in, archived rows slide out, status changes pulse.

### Field Status Panel (right)
Tech cards, compact version. Updates every 60 seconds from getLiveFieldStatus.

Each card:
- Initials avatar (colored by status — green if on job, grey if out)
- Name + badge #
- Status: ● ON JOB / ⏸ ON BREAK / ○ CLOCKED OUT / ─ UNSCHEDULED
- Current job address (if clocked in)
- Jobs remaining today (#)

Click any tech card → jumps to Team page, that tech's card expanded.

### Activity Feed
Pinned strip at bottom. Horizontal auto-scroll (marquee with pause on hover).
Shows last 20 system events in real time:
```
📧 New job: 65 Thornton St  ·  🔧 Salvador clocked in 7:42am  ·
⏰ Stale: APT-00847 · 3 days no action  ·  ✅ Job complete: 890 Market
```

### Today's Momentum Strip
Thin bar above the job table:
```
Today: ████████░░░░░░░░  8 of 14 dispatched · 3 complete · 2 PTE-blocked
```

### View Toggle: Table vs Kanban
Toggle button (top right of job table): [≡ Table] [⬛ Kanban]

**Kanban view** — four swim lanes with drag-and-drop between them:
```
│  NEEDS ACTION   │  WAITING         │  SCHEDULED   │  DONE TODAY  │
│  ─────────────  │  ─────────────   │  ──────────  │  ──────────  │
│  [job card]     │  [job card]      │  [job card]  │  [job card]  │
│  [job card]     │  [job card]      │  [job card]  │              │
│  [job card]     │                  │              │              │
```
Drag a card to a different column → status updates via API (optimistic update).
@dnd-kit/core with spring physics and column snap.

---

## PAGE 2: 📅 SCHEDULE — THE SCHEDULING SHEET KILLER

This page permanently replaces the Google Sheet that dispatch currently uses.
When this is live, there is no reason to open the scheduling sheet.

### Layout
```
┌───────────────────────────────────────────────────────────────────┐
│  APRIL 2026    [◀ Week ▶]   [Day] [Week] [Month]   [+ Assign Job] │
├───────────┬──────────┬──────────┬──────────┬──────────┬───────────┤
│  TECH     │  MON 14  │  TUE 15  │  WED 16  │  THU 17  │  FRI 18  │
├───────────┼──────────┼──────────┼──────────┼──────────┼───────────┤
│ BOYETTE   │[TURNOVER]│          │[PLUMBING]│  🏖 OFF  │[TURNOVER] │
│ #61  ●    │350 Hanv. │          │890 Mkt   │  Approved│1420 Alice │
│  ████░░ 3 │          │          │          │          │           │
├───────────┼──────────┼──────────┼──────────┼──────────┼───────────┤
│ SALVADOR  │          │[PLUMBING]│          │[ELECTRIC]│           │
│ #26  ●    │          │450 Oak   │          │72 Pine   │           │
│  ██░░░░ 1 │          │          │          │          │           │
├───────────┼──────────┼──────────┼──────────┼──────────┼───────────┤
│ UNASSIGNED│  ┌────┐  │  ┌────┐  │          │  ┌────┐  │           │
│ (drag)    │  │job │  │  │job │  │          │  │job │  │           │
│           │  └────┘  │  └────┘  │          │  └────┘  │           │
└───────────┴──────────┴──────────┴──────────┴──────────┴───────────┘
                                              [UNASSIGNED JOBS ▶]
                                              (right panel — drag source)
```

### Drag-and-Drop Scheduling
Unassigned jobs sit in a collapsible right panel (list of job cards).
Drag any job card and drop it onto a tech + day cell:
- On drop: sets assignedTech + scheduledDate, calls updateJob via API
- Optimistic update: job card appears in cell immediately, shimmer while saving
- If tech has time off that day: drop rejected with red pulse + toast "Boyette is off Apr 17"
- If cell has 4+ jobs: yellow warning toast "Boyette already has 4 jobs this day"
- Spring physics on card while dragging, snap animation on drop

Click any job in a cell → opens job modal (same 2-panel modal as Live page).

### Capacity Bar Per Tech Row
Left column shows a mini capacity indicator:
- ████░░ 3 jobs → 75% capacity (assuming 4 jobs/day = full)
- Color: green < 50%, yellow 50-75%, red 75%+

### Time-Off Blocks
Approved time off from AppSheet Time Off Manager renders as:
- Cell background: dark striped pattern
- "🏖 OFF — Approved" label
- Cannot drop jobs onto these cells (drag over shows red rejection)
- Pending time off: yellow striped pattern

### View Modes
- **Week view** (default): tech lanes × 5 days
- **Day view**: all techs for one day, with time slots (8am-6pm)
- **Month view**: mini calendar showing job count per day per tech, color-coded load

---

## PAGE 3: 👥 TEAM — TECH COMMAND CENTER

Answers: "Who is available? Who's working what? Who needs attention?"

### Layout
```
┌────────────────────────────────────────────────────────────────┐
│  TEAM  ·  28 techs  ·  [Active Only]  [All]     [+ Add Tech]  │
│                                                                │
│  ● CLOCKED IN (8)        ⏸ ON BREAK (1)                       │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                 │
│  │ Salvador C │ │ Eduardo P  │ │ Boyette J  │ ...             │
│  │ ● On Job   │ │ ● On Job   │ │ ⏸ Break    │                 │
│  │ 890 Market │ │ 350 Hanv.  │ │ Clocked in │                 │
│  │ ██████░ 3j │ │ ████░░ 2j  │ │ 7:30am     │                 │
│  └────────────┘ └────────────┘ └────────────┘                 │
│                                                                │
│  ○ NOT CLOCKED IN (19)                                        │
│  ┌────────────┐ ┌────────────┐ ...                            │
│  │ Federico S │ │ Jesus M    │                                │
│  │ ○ Out      │ │ 🏖 Time Off│                                │
│  │ 2 jobs tmw │ │ Apr 17-18  │                                │
│  └────────────┘ └────────────┘                                │
└────────────────────────────────────────────────────────────────┘
```

### Tech Card (full spec)
```
┌──────────────────────────────────┐
│  SC  Salvador Cabrera  #26       │
│      Field Tech                  │
│      ● ON JOB  since 7:42am      │ ← live from Time Records
├──────────────────────────────────┤
│  Today                           │
│  ✓ 350 Hanover  (Complete 10:15) │ ← from Dispatch Queue + Time Records
│  ▶ 890 Market   (In Progress)    │
│  ○ 1420 Alice   (Pending)        │
│  [+ Assign job]                  │
├──────────────────────────────────┤
│  This week    ████████░░  80%    │
├──────────────────────────────────┤
│  Skills                          │
│  Plumbing  ●●●  Electrical ●●○   │ ← from Tech Roster
│  Carpentry ●●○  Finish Carp ●○○  │
├──────────────────────────────────┤
│  Time Off: None pending          │ ← from AppSheet Time Off Manager
│  Phone: 510-xxx-xxxx             │
└──────────────────────────────────┘
```

Skill dots: ●●● = rating 1 (best), ●●○ = rating 2, ●○○ = rating 3.
PWA status pulled from getLiveFieldStatus every 60s.
Job status pulled from Dispatch Queue filtered by assignedTech + today.

### Tech Profile Modal
Click any tech card → full-screen modal:
- All details from card, expanded
- Full job history (all-time, paginated): date, address, category, duration
- Historical stats from BT Job Insights: top 3 trades, avg jobs/day, total recorded jobs
- Current week's schedule (mini calendar view)
- All time-off requests (pending + approved)
- Edit PIN / edit phone number (admin only)

### Unassigned Alert Strip
If any tech has 0 jobs today and is not on time off:
```
⚠ 6 techs unscheduled today: Federico S, Jesus M, ... [View & Assign →]
```
Links to Schedule page filtered to today with those techs highlighted.

---

## PAGE 4: 💬 MESSAGES — UNIFIED COMMS

All job-related communication in one place. No switching between Gmail, SMS apps,
and the dashboard.

### Layout (two-column)
```
┌──────────────────────────────────────────────────────────────────┐
│  MESSAGES                           [Compose]  [All] [Email] [SMS]│
├──────────────────────┬───────────────────────────────────────────┤
│  CONVERSATION LIST   │  THREAD VIEW                              │
│  (left 35%)          │  (right 65%)                              │
│                      │                                           │
│  APT-00932           │  65 Thornton St. Unit 304  [View Job →]  │
│  Jan Blythe          │  ─────────────────────────               │
│  "Got it, we'll..."  │                                           │
│  Apr 8 · ✓ read      │  Lapham Turnovers  Apr 7 5:24pm         │
│                      │  Hi, minimal maintenance, light           │
│  APT-00847           │  pre-clean, partial paint...             │
│  Maria Santos (SMS)  │                                           │
│  "What time will..."  │  APT Work Order  Apr 8 8:15am  (sent)   │
│  Apr 17 · ● unread   │  Got it! We'll put it on the schedule    │
│                      │  for the next few days. - Nyanza          │
│  ...                 │                                           │
│                      │  ─────────────────────────               │
│                      │  [Reply on this thread...]                │
│                      │  [Send]  [✨ AI Draft]                    │
└──────────────────────┴───────────────────────────────────────────┘
```

### Three Communication Channels

**1. Email threads** — Gmail via getGmailThread (already built)
Sent messages: right-aligned, accent color
Received messages: left-aligned, surface color

**2. SMS — Tenants** (OpenPhone API — UI built now, activates on Brandon approval)
Per-job SMS thread with tenant phone number from Dispatch Queue.
Shown in same thread view, interleaved with email if needed.
"Pending: OpenPhone approval" state if not yet active.

**3. SMS — Techs** (OpenPhone API)
Direct message to any tech by selecting from roster dropdown.
Phone numbers from Tech Roster col K.
Use cases: "Salvador — lockbox at 350 Hanover is 1954, intercom #2015"
This eliminates the need to call techs for basic job info.

### Compose (new message)
Top right button. Select: Email to RM / Email to Tenant / SMS to Tenant / SMS to Tech
Pulls contact info from the job or tech roster automatically.

---

## PAGE 5: 📋 JOBS — FULL QUEUE

Same job table as Live page but with full power-user controls:
- Multi-filter: status + priority + category + assigned tech + date range + stale flag
- Bulk select (checkbox column): bulk archive, bulk assign, bulk status change
- Table view + Kanban view toggle
- Saved filter presets (persist per user in localStorage)
  Examples: "Lapham this week" / "URGENT unassigned" / "Completed today"
- Export to CSV
- Full-text search across all fields

---

## PAGE 6: ⚖️ COMPLIANCE — WAGE & HOUR LIVE MONITOR

Answers: "Who's at risk of a labor violation right now?"
Closes every item from the December 2025 compliance audit.

### Active Techs Panel
Only shows currently clocked-in techs. Updates every 60 seconds.

```
┌──────────────────────────────────────────────────────────────────┐
│  ACTIVE TECHS — Friday Apr 18 · 2:15pm PST                      │
├──────────────────────────────────────────────────────────────────┤
│  ⚠ Salvador C.  #26   ● 6h 32m   MEAL BREAK OVERDUE            │
│  [████████████████████░░░░░░░] >5h, no break recorded           │
│  Meal premium ($) may apply          [📱 Send Reminder SMS]     │
├──────────────────────────────────────────────────────────────────┤
│  ○ Eduardo P.   #47   ● 4h 15m   Rest break due in 45 min      │
│  [████████████░░░░░░░░░░░░░░░] Approaching 270min threshold      │
│  ✓ Compliant                                                    │
├──────────────────────────────────────────────────────────────────┤
│  ✓ Boyette J.   #61   ● 3h 02m   Compliant                     │
│  [████████░░░░░░░░░░░░░░░░░░░] Lunch taken 11:45am (27 min ✓)  │
└──────────────────────────────────────────────────────────────────┘
```

### CA Threshold Logic (from TechPWA.gs)
- 270min (4.5h): rest break due → yellow warning
- 300min (5h): meal break required → orange alert
- 570min (9.5h): second meal required → red alert
- < 30min break: not counted as meal → premium flag

### Compliance Feed (below active panel)
Today's full clock event log — all techs, all events, timestamped.
This is the audit trail. Every event is immutable once written.

### Daily Compliance Summary
- Total active hours today (all techs)
- Meal premiums triggered today (count + estimated $)
- Rest break violations
- Export to PDF (pdfme when built)

### Compliance Alerts in Notification Center
When any threshold is hit, a notification fires immediately:
"⚠ Salvador C. — 5h on clock, no meal break recorded"
Also appears as a red pulse in the sidebar compliance icon.

---

## PAGE 7: 📊 INTEL — ANALYTICS (PHASE 4 STUB)

Build the page shell now. Shows a clean "Coming Soon — Building Phase 4" state
with a preview of what metrics will be shown:
- Job volume by week/month
- Tech utilization rates
- Email → Scheduled response time
- Revenue per client (requires QuickBooks integration)
- SLA compliance rate for Lapham

---

## THE JOB MODAL — TWO-PANEL WORKFLOW DESIGN

Opening a job from any page shows the same modal. It is a WORKFLOW TOOL, not a form.

### Layout
```
┌──────────────────────────────────────────────────────────────────────┐
│  APT-00932  ·  65 Thornton St. Unit 304  ·  🟠 TURNOVER  ·  Apr 7  [X] │
├──────────────────────────┬───────────────────────────────────────────┤
│  CONTEXT  (left 42%)     │  DISPATCH  (right 58%)                    │
│  scroll independently    │  scroll independently                     │
├──────────────────────────┼───────────────────────────────────────────┤
│                          │                                           │
│  DESCRIPTION             │  STATUS STEPPER                          │
│  (job description text)  │  ○ Open → ○ PTE → ● Scheduled → ○ Done  │
│                          │                                           │
│  RM: Jan Blythe          │  NEXT ACTION  (auto-adapts to status)    │
│  65thorntonst@gmail.com  │  (see stage specs below)                 │
│                          │                                           │
│  Preferred timing: ASAP  │  SCHEDULE                                │
│                          │  Date · Time · Est. Hours                │
│  ─────────────────       │                                           │
│  🔐 ACCESS / LOCKBOX     │  DISPATCHER NOTES                        │
│  Intercom: #2015         │  [textarea]                              │
│  Lock box: 1954          │                                           │
│  (highlighted amber box) │                                           │
│                          │                                           │
│  ─────────────────       │                                           │
│  THREAD (inline)         │                                           │
│  received msgs: left     │                                           │
│  sent msgs: right        │                                           │
│  (accent color)          │                                           │
│                          │                                           │
│  [Reply textarea]        │                                           │
│  [Send]  [✨ AI Draft]   │                                           │
│                          │                                           │
├──────────────────────────┴───────────────────────────────────────────┤
│  [Archive]    [🏠 Property History]          [💾 Save Changes]       │
│  STICKY FOOTER — always visible, never at bottom of scroll           │
└──────────────────────────────────────────────────────────────────────┘
```

Width: 900px. Max-height: 92vh. Mobile: full screen, panels stack.

### Status Stepper
Visual progress bar. Click to advance. Never a blank text input.
```
○ Open  →  ○ PTE-Pending  →  ○ Tenant Contacted  →  ● Scheduled  →  ○ Complete
```
Current status highlighted in status color. Clicking a stage updates status
and refreshes the Next Action panel instantly (no API call — React state).

### Next Action Panel — Stage-Aware

**Suggest Tech runs automatically** on modal open (background API call, skeleton loader).
This is always the first thing that loads on the dispatch side.

**Stage: Open**
```
NEXT ACTION — Assign a tech and schedule

SUGGESTED TECHS
● Salvador C. #26  [████████░░] 50pts  ✓ Available · 1 job today
  22 prior Turnover jobs · Worked this address twice
  [Assign & Schedule →]

○ Eduardo P. #47   [██████░░░░] 34pts  ✓ Available
○ Federico S. #117 [████░░░░░░] 27pts  ✓ Available
[Choose different tech ▾]
```

**Stage: PTE-Pending**
```
NEXT ACTION — Contact tenant for property access

Tenant: Maria Santos  ·  510-555-0192  ·  Prefers: Email
Has pets: Yes  ·  Last contacted: Never

[📧 Email Tenant]   [📱 SMS Tenant]   [📞 Copy Number]
```

**Stage: Tenant Contacted**
```
NEXT ACTION — Confirm access or follow up

Contacted: 2 days ago
[✓ Access Granted — Proceed to Schedule]
[📱 Send Follow-up SMS]
```

**Stage: Approval Needed**
```
NEXT ACTION — Get RM approval to proceed

RM: Jan Blythe  ·  65thorntonst@gmail.com
[📧 Email RM for Approval]
```

**Stage: Scheduled ✓**
```
✓ Salvador Cabrera #26 assigned
✓ Friday Apr 19 · 8:00am · Est. 4 hours

[Edit Assignment]     [Mark Complete]
```

**Stage: Complete**
```
Completed ✓
[Archive Job]
```

### Property History Drawer
"🏠 Property History" button in sticky footer slides in a second panel.
Shows all past jobs for the same address — from Dispatch Queue + Historical Assignments.
Columns: Date, Category, Assigned Tech, Status, Duration.
Source badge: "CC" or "Pre-CC (Historical)".

---

## INTEGRATION STATUS DESIGN

Each integration shows its live status in the sidebar and in a Settings page.
Design integrations as first-class citizens even before they're fully active.

| Integration | Active | UI State When Inactive |
|---|---|---|
| Email polling | ✅ Live | n/a |
| Schedule sheet sync | ✅ Live (6:15am daily) | n/a |
| Tech PWA | ✅ Live | n/a |
| OpenPhone SMS | ⏳ Pending approval | SMS buttons show "Pending" badge |
| AppSheet Time Off | ⏳ Pending deployment | Time-off cells show "─" |
| QuickBooks | ⏳ Phase 3 | Invoice button shows "Coming Soon" |
| Flowise Compliance | ⏳ Phase 3 | Compliance page shows live clock data only |
| Vercel hosting | ⏳ Pending setup | n/a (this IS Vercel) |

---

## FRAMER MOTION ANIMATIONS — FULL SPEC

| Element | Animation |
|---|---|
| Page transitions | Shared layout + slide direction based on nav position |
| Job rows (new) | Slide down + fade in, 300ms |
| Job rows (archive) | Slide left + fade out, 250ms |
| Status change | Background color crossfade, 400ms |
| KPI numbers | react-countup with easeOutExpo, 800ms |
| Urgent pulse | scale 1→1.02→1, repeat, 2s interval |
| Modal open | Scale 0.95→1 + fade, 200ms |
| Kanban drag | Physics spring, 200ms snap on drop |
| Calendar drag | Physics spring + column highlight on hover |
| Tech card status | Layout animation on reorder (clocked-in float to top) |
| Notification bell | Bounce on new notification |
| Sidebar expand | Spring physics width transition |
| Activity feed | Marquee with pause-on-hover |
| Skeleton loaders | Shimmer gradient, no spinners |
| Command palette | Scale + blur background on open |
| Toast notifications | Slide up from bottom-right, auto-dismiss 3s |

---

## CLOUDFLARE WORKER — INTERIM CLEAN URL

No DNS access required. Deploy immediately after Vercel setup.

```javascript
// workers/dispatch-proxy.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    url.hostname = env.VERCEL_HOSTNAME; // central-command.vercel.app
    return fetch(new Request(url.toString(), request));
  }
}
```

Deploy to: `apt-dispatch.YOUR_ACCOUNT.workers.dev`
Set `VERCEL_HOSTNAME` as Worker secret.

When DNS access obtained:
1. Add CNAME: dispatch.aptmaintenanceinc.com → apt-dispatch.workers.dev
2. Zero code changes. DNS propagates. Done.

---

## WHAT ANTIGRAVITY BUILDS

1. Next.js app scaffold (TypeScript + Tailwind + all listed libraries)
2. next-auth with Google + @aptmaintenanceinc.com restriction
3. Persistent sidebar with nav + integration status dots
4. Command palette (cmdk)
5. Notification center
6. ⚡ Live page — hero bar, job table, field status panel, activity feed, kanban
7. 📅 Schedule page — drag-and-drop calendar, tech lanes, week/day/month views
8. 👥 Team page — tech cards, live status, tech profile modal
9. 💬 Messages page — unified inbox, email threads, SMS stubs
10. 📋 Jobs page — full queue with advanced filters + bulk actions
11. ⚖️ Compliance page — active tech monitor, threshold bars, audit log
12. 📊 Intel page — stub with preview
13. Job modal — two-panel layout, stage-aware Next Action, sticky footer
14. Property History drawer
15. Cloudflare Worker file (workers/dispatch-proxy.js)
16. All Framer Motion animations per spec

## WHAT CLAUDE CODE BUILDS (separately, before Antigravity handoff)

1. **DashboardAPI.gs** — Apps Script web app exposing all API actions via doPost
2. **getTodaySchedule()** — today's DQ jobs grouped by tech
3. **getWeekSchedule()** — week's DQ jobs grouped by tech + date
4. **getLiveFieldStatus()** — reads Time Records, returns who's clocked in now
5. **getComplianceStatus()** — active techs + clock durations + break status
6. **getJobHistory()** — address-based historical job lookup

---

## REFERENCE — DISPATCH QUEUE COLUMN MAP

```
Col 1  = Timestamp
Col 2  = Lead ID
Col 3  = Priority   (1-URGENT / 2-TURNOVER / 3-PTE-PENDING / 4-STANDARD)
Col 4  = Email Type
Col 5  = Service Category
Col 6  = Property Address
Col 7  = Unit
Col 8  = Description
Col 9  = Preferred Timing
Col 10 = Access / Lockbox Info
Col 11 = RM Name
Col 12 = RM Email
Col 13 = Tenant Name
Col 14 = Tenant Phone
Col 15 = PTE Granted
Col 16 = Estimate Needed
Col 17 = Assigned Tech
Col 18 = Scheduled Date|Time (YYYY-MM-DD|HH:MM)
Col 19 = Est. Hours
Col 20 = Status
Col 21 = Notes
Col 22 = Gmail Msg ID
Col 23 = Calendar Event ID
Col 24 = Tenant Email
Col 25 = Tenant Pref Contact
Col 26 = Tenant Has Pets
```

Tech Roster: name, badge #, phone (col K), skill ratings (cols A-J), active (col P)
Time Records: all PWA clock events — tech name, badge #, action, timestamp, job ID
Historical Assignments: 1,019 classified past jobs — tech name, emp #, category, date

---

*Last updated: April 18, 2026*
*This spec is for Antigravity. DashboardAPI.gs backend is handled by Claude Code.*
*Hand this document to Antigravity as the complete build brief.*
