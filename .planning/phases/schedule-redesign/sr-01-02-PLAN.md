---
phase: sr-01
plan: 02
type: execute
wave: 2
depends_on: [sr-01-01]
files_modified:
  - tech-pwa/src/app/schedule/page.tsx
  - tech-pwa/src/components/dashboard/ScheduleGrid.tsx
  - tech-pwa/src/components/dashboard/TechRow.tsx
  - tech-pwa/src/components/dashboard/JobChip.tsx
  - tech-pwa/src/components/dashboard/UrgentQueuePanel.tsx
  - tech-pwa/src/components/dashboard/DateNavigation.tsx
  - tech-pwa/src/components/dashboard/LockSendButton.tsx
  - tech-pwa/tests/e2e/scheduling.spec.ts
autonomous: true
requirements: [SR-01, SR-02, SR-04]
must_haves:
  truths:
    - "Dispatcher sees a grid of techs as rows with job chips — not a time-slot calendar"
    - "Day view is the default; week view toggle switches to 5-day view"
    - "Date navigation controls (prev/next day, today button) are functional"
    - "Lock and Send amber CTA button is visible in the top-right header"
    - "Jobs are fetched from /api/schedule/week (Neon), not dashboardRequest (GAS)"
    - "Playwright 5.1 and 5.2 tests pass with new assertions"
    - "Zero new Playwright failures vs baseline (43p/68s/0f)"
  artifacts:
    - path: "tech-pwa/src/app/schedule/page.tsx"
      provides: "Redesigned schedule page — tech-row grid, day/week toggle, LockSendButton stub"
      contains: "ScheduleGrid"
    - path: "tech-pwa/src/components/dashboard/ScheduleGrid.tsx"
      provides: "Tech-row grid layout component"
      exports: ["ScheduleGrid"]
    - path: "tech-pwa/src/components/dashboard/TechRow.tsx"
      provides: "Single tech row with job chips"
      exports: ["TechRow"]
    - path: "tech-pwa/src/components/dashboard/JobChip.tsx"
      provides: "Job chip — address truncated, color by priority"
      exports: ["JobChip"]
    - path: "tech-pwa/src/components/dashboard/UrgentQueuePanel.tsx"
      provides: "Right panel — urgent jobs needing attention"
      exports: ["UrgentQueuePanel"]
    - path: "tech-pwa/src/components/dashboard/DateNavigation.tsx"
      provides: "Day/week toggle + prev/next/today controls"
      exports: ["DateNavigation"]
    - path: "tech-pwa/src/components/dashboard/LockSendButton.tsx"
      provides: "Amber CTA stub — opens confirmation screen (wired in plan 03)"
      exports: ["LockSendButton"]
    - path: "tech-pwa/tests/e2e/scheduling.spec.ts"
      provides: "Rewritten 5.1 + 5.2 tests for new layout"
      contains: "tech-row"
  key_links:
    - from: "schedule/page.tsx"
      to: "/api/schedule/week"
      via: "fetch with weekStart param"
      pattern: "fetch.*api/schedule/week"
    - from: "ScheduleGrid"
      to: "TechRow"
      via: "techs array map"
      pattern: "techs\\.map"
    - from: "TechRow"
      to: "JobChip"
      via: "jobs array map"
      pattern: "jobs\\.map"
---

<objective>
Replace the 769-line time-slot schedule/page.tsx with a tech-row grid. Techs are rows; job chips are content. Switch data source from dashboardRequest (GAS) to fetch('/api/schedule/week') (Neon direct). Add day/week toggle, date navigation, LockSendButton stub, and UrgentQueuePanel. Rewrite the two breaking Playwright tests before implementation.

Purpose: Kills the GAS data dependency on the schedule page. Creates the operational cockpit UX shape APT actually uses.
Output: New schedule page + 6 components + rewritten Playwright tests.
</objective>

<execution_context>
@C:/Users/Aldrick/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/Aldrick/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-CONTEXT.md
@C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-RESEARCH.md
@C:/PTOW/1_APT_Central_Command/RULES.md
@C:/PTOW/1_APT_Central_Command/.agents/skills/design-taste-frontend/SKILL.md
@C:/PTOW/1_APT_Central_Command/.agents/skills/redesign-existing-projects/SKILL.md

<interfaces>
<!-- /api/schedule/week response shape (from route.ts) -->
GET /api/schedule/week?weekStart=YYYY-MM-DD
Auth: auth() from @/auth OR x-api-key header (dual auth — same as today/week routes)
Response: {
  success: true,
  source: 'neon',
  week: { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD' },
  byTech: Record<techName, Record<date, Job[]>>,  // e.g. byTech['Salvador']['2026-06-03'] = [Job]
  unassigned: Job[],
  techs: Array<{
    techId: string, techName: string, jobsRemaining: number,
    badge: string, rank: string,
    skills: { Carpentry: number, Plumbing: number, Electrical: number, ... }
  }>
}

<!-- Job type fields relevant to chip rendering -->
job.jobId: string          // e.g. "APT-3008"
job.address: string        // truncate to ~30 chars for chip display
job.serviceCategory: string // trade icon lookup
job.priority: string       // "1-URGENT" | "2-TURNOVER" | "3-PTE-PENDING" | "4-STANDARD" | "Scheduled"
job.status: string
job.dispatchSentAt: timestamp | null  // added in plan 03 — may be undefined in this plan

<!-- Chip color mapping (per CONTEXT.md locked decision) -->
"1-URGENT"      → amber bg  (bg-amber-500/20 text-amber-400 border-amber-500/40)
"4-STANDARD"    → teal bg   (bg-teal-500/20 text-teal-400 border-teal-500/40)
"Scheduled"     → slate bg  (bg-slate-700/50 text-slate-300 border-slate-600/40)
unassigned      → muted     (bg-slate-800/50 text-slate-500 border-slate-700/40)

<!-- Auth: schedule page uses DashboardLayout — DO NOT CHANGE -->
DashboardLayout wraps the page → RouteGuard uses useSession() from next-auth/react
No auth code belongs in schedule/page.tsx itself

<!-- Deprecated components — do NOT import in new page -->
DraggableJobCard, DroppableTimeSlot, DurationSelectorModal, DateDetailModal, TIME_SLOTS, TIME_LABELS
Remove @dnd-kit/core import from schedule/page.tsx

<!-- Kept components -->
DashboardLayout, ManualScheduleModal, ManualJobCreateModal, JobDetailModal — keep all imports

<!-- Taste-skill dials for this page (CONTEXT.md locked) -->
VARIANCE: 3-4 / MOTION: 2-3 / DENSITY: 8-9
Dense operational cockpit. Tabular-nums on job codes and counts.
Hover states on all interactive elements (200-300ms transition).
Skeleton loaders for loading state (not spinners).
Empty state: designed "no jobs scheduled" view, not blank.

<!-- Playwright tests to rewrite (scheduling.spec.ts) -->
Current 5.1: expects text="100 Test St" in sidebar — WILL BREAK
Current 5.2: expects text="Drag jobs to schedule" and "Next 5 Working Days" — WILL BREAK
New 5.1: /schedule loads, at least one element with data-testid="tech-row" is visible
New 5.2: Lock and Send button visible (text="Lock and Send" or data-testid="lock-send-btn")
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Rewrite scheduling.spec.ts tests 5.1 and 5.2</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/tests/e2e/scheduling.spec.ts
    C:/PTOW/1_APT_Central_Command/tech-pwa/tests/fixtures/auth.ts
  </read_first>
  <action>
    Edit tests/e2e/scheduling.spec.ts — rewrite ONLY tests 5.1 and 5.2. Keep tests 7.1, 7.2, 7.3 exactly as-is.

    Replace test '5.1 Ready To Schedule page loads with unscheduled jobs in sidebar' with:
      test('5.1 Schedule page loads tech-row grid', async ({ page }) => {
        await page.goto('/schedule');
        await expect(page.locator('[data-testid="tech-row"]').first()).toBeVisible({ timeout: 10000 });
      });

    Replace test '5.2 Schedule grid renders time slots and date columns' with:
      test('5.2 Lock and Send button is visible in schedule header', async ({ page }) => {
        await page.goto('/schedule');
        await expect(page.locator('[data-testid="lock-send-btn"]')).toBeVisible({ timeout: 10000 });
      });

    Do NOT add test.fixme to either test — they must run and pass after plan 02 components are implemented.
    Do NOT change test 7.1, 7.2, or 7.3.
    Do NOT change the beforeEach block.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -3</automated>
  </verify>
  <acceptance_criteria>
    - scheduling.spec.ts test '5.1' contains: data-testid="tech-row"
    - scheduling.spec.ts test '5.2' contains: data-testid="lock-send-btn"
    - scheduling.spec.ts tests 7.1, 7.2, 7.3 are unchanged
    - npx tsc --noEmit exits 0
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Build ScheduleGrid, TechRow, JobChip, DateNavigation, LockSendButton, UrgentQueuePanel components</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/lib/types.ts
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/globals.css
    C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-CONTEXT.md
  </read_first>
  <action>
    Create the following files in tech-pwa/src/components/dashboard/:

    --- JobChip.tsx ---
    Props: { job: Job; onClick?: (job: Job) => void }
    Renders: pill-shaped chip, truncated address (max 28 chars + "..."), priority color border-left.
    Color mapping: "1-URGENT" = amber (bg-amber-500/20 text-amber-400 border-l-2 border-amber-500),
    "2-TURNOVER" = orange (bg-orange-500/20 text-orange-400 border-l-2 border-orange-500),
    "3-PTE-PENDING" = yellow (bg-yellow-500/20 text-yellow-400 border-l-2 border-yellow-500),
    "4-STANDARD" or "Scheduled" = teal (bg-teal-500/20 text-teal-400 border-l-2 border-teal-500),
    default = slate (bg-slate-700/50 text-slate-300 border-l-2 border-slate-600).
    Hover: scale(1.02) transform, 200ms transition. cursor-pointer.
    Font: font-variant-numeric tabular-nums for jobId display.
    No icons in Sprint 1 — address text only.
    No fenced code blocks in this action — use the above prose spec.

    --- TechRow.tsx ---
    Props: { techName: string; rank?: string; jobs: Job[]; onJobClick?: (job: Job) => void }
    data-testid="tech-row" on the root element — required for Playwright 5.1.
    Left column (w-36 flex-shrink-0): tech avatar circle (initials, 2 chars, bg-slate-700),
    techName below, rank in muted text.
    Right area: flex-wrap row of JobChip components. If jobs.length === 0: render empty state
    div with text "No jobs scheduled" in text-slate-600 italic text-sm.
    Row has border-b border-[var(--border-subtle)] padding py-3.

    --- ScheduleGrid.tsx ---
    Props: { techs: WeekTech[]; byTech: Record<string,Record<string,Job[]>>; selectedDate: string;
             viewMode: 'day'|'week'; onJobClick?: (job: Job) => void }
    where WeekTech = { techId: string; techName: string; badge: string; rank: string }
    Day view: for each tech, pass byTech[tech.techName][selectedDate] ?? [] to TechRow.
    Week view: show 5 date columns per tech (mini chips per cell) — simplified, each cell shows job count.
    Loading skeleton: when techs.length === 0, render 3 skeleton TechRow placeholders
    (h-16 bg-slate-800/50 rounded animate-pulse).

    --- DateNavigation.tsx ---
    Props: { selectedDate: string; viewMode: 'day'|'week';
             onDateChange: (date: string) => void; onViewModeChange: (mode: 'day'|'week') => void }
    Renders: left chevron (ChevronLeft from lucide-react), date display (formatted: "Mon, Jun 3"),
    right chevron (ChevronRight from lucide-react), "Today" button,
    day/week toggle (two pill buttons, active = bg-amber-500/20 text-amber-400).
    All interactive elements: hover:bg-slate-700/50, transition-all duration-200.

    --- LockSendButton.tsx ---
    Props: { date: string; onConfirm?: () => void; disabled?: boolean }
    data-testid="lock-send-btn" on the button element — required for Playwright 5.2.
    Renders: amber button "Lock and Send" with SendHorizonal icon from lucide-react.
    Style: bg-amber-500 hover:bg-amber-400 text-black font-600 px-4 py-2 rounded-lg
    transition-all duration-200 active:scale-[0.98].
    In Sprint 1 (plan 02): onClick calls props.onConfirm if provided (no API call yet — wired in plan 03).
    Disabled state: opacity-50 cursor-not-allowed.

    --- UrgentQueuePanel.tsx ---
    Props: { jobs: Job[] }
    Renders: right panel, header "Urgent Queue", list of unassigned or urgent jobs.
    Each row: JobChip + job.address. If jobs.length === 0: "No urgent items" empty state.
    Panel width: w-64 flex-shrink-0. Border-left border-[var(--border-subtle)].

    RULES:
    - No `as any` casts anywhere
    - All props typed explicitly (no implicit any)
    - Use lucide-react for ChevronLeft, ChevronRight, SendHorizonal — Phosphor imports only in new schedule page itself
    - 200-300ms transitions on all interactive elements
    - GPU-accelerated animations: transform + opacity only (no top/left/width/height)
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - All 6 component files exist in src/components/dashboard/
    - Each file has a named export matching the component name
    - data-testid="tech-row" present in TechRow.tsx root element
    - data-testid="lock-send-btn" present in LockSendButton.tsx button element
    - No `as any` in any component file (grep -r "as any" src/components/dashboard/ returns 0 matches)
    - npx tsc --noEmit exits 0
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 3: Replace schedule/page.tsx with new tech-row grid page</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/schedule/page.tsx
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/components/dashboard/DashboardLayout.tsx
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/components/dashboard/JobDetailModal.tsx
  </read_first>
  <action>
    Replace tech-pwa/src/app/schedule/page.tsx entirely. The new file:

    "use client" directive at top.

    Imports to ADD:
    - useState, useEffect, useCallback from 'react'
    - DashboardLayout from '@/components/dashboard/DashboardLayout'
    - JobDetailModal from '@/components/dashboard/JobDetailModal'
    - ManualScheduleModal from '@/components/dashboard/ManualScheduleModal'
    - ManualJobCreateModal from '@/components/dashboard/ManualJobCreateModal'
    - ScheduleGrid from '@/components/dashboard/ScheduleGrid'
    - DateNavigation from '@/components/dashboard/DateNavigation'
    - LockSendButton from '@/components/dashboard/LockSendButton'
    - UrgentQueuePanel from '@/components/dashboard/UrgentQueuePanel'
    - type { Job } from '@/lib/types'

    Imports to REMOVE (not in new file):
    - @dnd-kit/core (entire import)
    - dashboardRequest, TechStatus, FieldStatusResponse, WeekScheduleResponse, DispatchDataResponse, UpdateJobResponse from '@/lib/dashboard-api'
    - DraggableJobCard, DroppableTimeSlot, DurationSelectorModal, DateDetailModal, TIME_SLOTS, TIME_LABELS from SchedulePageComponents
    - Lucide icons used only by old components (Calendar, Clock, Info, Search — keep ChevronLeft, ChevronRight if DateNavigation needs them internally)

    State:
    - selectedDate: string — default to today in Pacific time (use Intl.DateTimeFormat 'en-CA' with timeZone 'America/Los_Angeles')
    - viewMode: 'day' | 'week' — default 'day'
    - weekData: { byTech: Record<string,Record<string,Job[]>>; techs: WeekTech[]; unassigned: Job[] } | null — default null
    - loading: boolean — default true
    - selectedJob: Job | null — default null
    - weekStart: string — computed from selectedDate (Monday of that week)
    - showConfirmation: boolean — default false (for Lock and Send flow, wired in plan 03)

    Data fetch function:
    - fetchWeekData(weekStartDate: string): fetch('/api/schedule/week?weekStart=' + weekStartDate)
      with credentials: 'include'. On success set weekData. On error console.error and set loading false.
    - useEffect on weekStart change — call fetchWeekData(weekStart).

    WeekTech type (define locally or import from types if it exists):
    type WeekTech = { techId: string; techName: string; badge: string; rank: string }

    Layout structure (inside DashboardLayout):
    - Top bar: flex justify-between items-center, padding px-6 py-4, border-b border-[var(--border-subtle)]
      Left: page title "Dispatch" in text-xl font-600 text-white
      Center: DateNavigation component
      Right: LockSendButton component (date={selectedDate})
    - Main content area: flex h-full overflow-hidden
      Left/main: flex-1 overflow-y-auto px-6 py-4 — ScheduleGrid component
      Right: UrgentQueuePanel (jobs={weekData?.unassigned ?? []})

    LockSendButton onConfirm stub: setShowConfirmation(true) — actual API call wired in plan 03.
    If showConfirmation: render simple overlay "Dispatch Confirmation — plan 03 will wire this" for now.

    DO NOT add any new auth logic — DashboardLayout handles auth via RouteGuard.
    DO NOT import or use dashboardRequest anywhere in the new file.
    DO NOT use any `as any` casts.
    All fetch calls use the direct /api/schedule/week Neon route.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - schedule/page.tsx has no import from '@dnd-kit/core'
    - schedule/page.tsx has no import of dashboardRequest
    - schedule/page.tsx has no import of DraggableJobCard, DroppableTimeSlot, DurationSelectorModal, DateDetailModal
    - schedule/page.tsx imports ScheduleGrid, DateNavigation, LockSendButton, UrgentQueuePanel
    - schedule/page.tsx fetch call targets '/api/schedule/week'
    - No `as any` in schedule/page.tsx
    - npx tsc --noEmit exits 0
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 4 (N-2): tsc + push + git diff artifact</name>
  <read_first>Nothing to read — terminal task</read_first>
  <action>
    1. cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit — must exit 0. Fix errors before continuing.
    2. git add tech-pwa/src/app/schedule/page.tsx tech-pwa/src/components/dashboard/ScheduleGrid.tsx tech-pwa/src/components/dashboard/TechRow.tsx tech-pwa/src/components/dashboard/JobChip.tsx tech-pwa/src/components/dashboard/UrgentQueuePanel.tsx tech-pwa/src/components/dashboard/DateNavigation.tsx tech-pwa/src/components/dashboard/LockSendButton.tsx tech-pwa/tests/e2e/scheduling.spec.ts
    3. git commit -m "feat(schedule): tech-row grid + new components + rewrite 5.x Playwright tests"
    4. git push origin HEAD
    5. git diff main...HEAD > C:/PTOW/1_APT_Central_Command/artifacts/sr-01-02-diff.txt
    6. git add artifacts/sr-01-02-diff.txt && git commit -m "chore: sr-01-02 diff artifact" && git push origin HEAD
    Post diff path to Claude Code and stop. Wait for PASS.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit</automated>
  </verify>
  <acceptance_criteria>
    - npx tsc --noEmit exits 0
    - artifacts/sr-01-02-diff.txt is non-empty
    - git branch --show-current returns feat/schedule-redesign
  </acceptance_criteria>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 5 (N-1): Test sprint — schedule page visual + Playwright</name>
  <read_first>Nothing to read — browser verification task</read_first>
  <what-built>
    1. cd C:/PTOW/1_APT_Central_Command/tech-pwa && npm run dev
    2. Log in as admin (badge=1, PIN=1234 on /login)
    3. Visit http://localhost:3000/schedule
    4. Verify: tech rows are visible (NOT a time-slot grid)
    5. Verify: "Lock and Send" amber button visible top-right
    6. Verify: date navigation controls visible (prev/next/today/day/week toggle)
    7. Verify: no blank white boxes, no JS console errors from missing components
    8. Run: cd tech-pwa && npx playwright test — must show 0 failed, X passed >= 44
    9. Run: cd tech-pwa && npx playwright test tests/e2e/scheduling.spec.ts — 5.1 and 5.2 must PASS (not skip, not fail)
    10. Kill dev server: Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
    11. Write artifacts/sr-01-02-test-results.txt with:
        - Schedule page visual: tech rows visible? ______
        - Lock and Send button visible? ______
        - scheduling.spec.ts 5.1 result: ______
        - scheduling.spec.ts 5.2 result: ______
        - Full Playwright summary line: ______
  </what-built>
  <how-to-verify>
    - scheduling.spec.ts 5.1 and 5.2 must PASS (not skip, not fail)
    - Full suite: 0 failed
    - /schedule shows tech rows, not time-slot grid
  </how-to-verify>
  <resume-signal>Post artifacts/sr-01-02-test-results.txt to Claude Code and stop. Wait for clear-to-merge.</resume-signal>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 6 (N): Merge after Claude Code clear-to-merge</name>
  <read_first>Nothing to read</read_first>
  <what-built>N/A — merge gate only</what-built>
  <how-to-verify>Merge only after Claude Code issues "Clear to merge." Not before.</how-to-verify>
  <resume-signal>Claude Code issues "Clear to merge" — then merge PR</resume-signal>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| schedule/page.tsx → /api/schedule/week | Authenticated fetch; session cookie required |
| DashboardLayout → RouteGuard | Office staff auth gate; useSession() from next-auth/react |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-sr02-01 | Elevation of Privilege | /schedule page access | accept | DashboardLayout RouteGuard handles auth — no change to auth layer |
| T-sr02-02 | Information Disclosure | fetch('/api/schedule/week') from client | mitigate | Route requires auth() or x-api-key — existing dual-auth unchanged |
| T-sr02-SC | Tampering | npm installs | accept | No new packages in this plan — Phosphor installed in plan 01 |
</threat_model>

<verification>
- npx tsc --noEmit exits 0 after all changes
- schedule/page.tsx has zero imports from @dnd-kit/core or dashboardRequest
- data-testid="tech-row" present in TechRow component
- data-testid="lock-send-btn" present in LockSendButton component
- Playwright 5.1 PASS, 5.2 PASS
- Full Playwright suite: 0 new failures vs baseline (43p/68s/0f)
- No `as any` casts in any new file
</verification>

<success_criteria>
- /schedule renders tech-row grid (not time-slot calendar)
- Data comes from /api/schedule/week (Neon), not dashboardRequest (GAS)
- Lock and Send button visible, day/week toggle functional
- Playwright 5.1 and 5.2 pass with new assertions
- Zero new Playwright failures
</success_criteria>

<output>
Create C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-02-SUMMARY.md when done
</output>
