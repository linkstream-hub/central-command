---
phase: sr-01
plan: 05
type: execute
wave: 3
depends_on: [sr-01-01]
files_modified:
  - tech-pwa/src/app/jobs/page.tsx
  - tech-pwa/src/components/BottomNav.tsx
autonomous: true
requirements: [SR-06]
must_haves:
  truths:
    - "Job cards show amber left border for URGENT, teal for STANDARD/Scheduled"
    - "Bottom nav bar renders: Home, Jobs, Messages, Profile"
    - "Greeting header shows dark navy background with white greeting text"
    - "getSession() auth pattern is unchanged (no useSession import added)"
    - "Framer-motion card entrance animations present"
    - "Zero new Playwright failures vs baseline"
  artifacts:
    - path: "tech-pwa/src/app/jobs/page.tsx"
      provides: "Updated PRIORITY_BORDER + PRIORITY_CHIP maps, dark navy header, BottomNav"
      contains: "border-l-amber"
    - path: "tech-pwa/src/components/BottomNav.tsx"
      provides: "Bottom navigation bar: Home, Jobs, Messages, Profile"
      exports: ["BottomNav"]
  key_links:
    - from: "jobs/page.tsx"
      to: "BottomNav"
      via: "fixed bottom-0 render"
      pattern: "BottomNav"
    - from: "jobs/page.tsx PRIORITY_BORDER"
      to: "job.priority"
      via: "Record lookup"
      pattern: "PRIORITY_BORDER.*priority"
---

<objective>
Update the mobile job list page to match reference image fd4ab59d: amber URGENT cards, teal STANDARD/Scheduled cards, dark navy greeting header, and a bottom navigation bar (Home, Jobs, Messages, Profile). Auth pattern and data-fetching logic are completely unchanged.

Purpose: Consumer-grade job list that matches the dispatch command center aesthetic. Field techs see their work clearly on mobile.
Output: Updated jobs/page.tsx with new color maps + BottomNav component.
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

<interfaces>
<!-- jobs/page.tsx current PRIORITY maps (lines 17-29) — REPLACE these -->
Current PRIORITY_BORDER:
  "1-URGENT":      "border-l-red-500"
  "2-TURNOVER":    "border-l-orange-500"
  "3-PTE-PENDING": "border-l-yellow-500"
  "4-STANDARD":    "border-l-blue-500"   ← blue must become teal

Current PRIORITY_CHIP:
  "1-URGENT":      "bg-red-500/20 text-red-400"
  "2-TURNOVER":    "bg-orange-500/20 text-orange-400"
  "3-PTE-PENDING": "bg-yellow-500/20 text-yellow-400"
  "4-STANDARD":    "bg-blue-500/20 text-blue-400"  ← blue must become teal

New PRIORITY_BORDER (replace entirely):
  "1-URGENT":      "border-l-amber-500"
  "2-TURNOVER":    "border-l-orange-500"
  "3-PTE-PENDING": "border-l-yellow-500"
  "4-STANDARD":    "border-l-teal-500"
  "Scheduled":     "border-l-teal-500"

New PRIORITY_CHIP (replace entirely):
  "1-URGENT":      "bg-amber-500/20 text-amber-400"
  "2-TURNOVER":    "bg-orange-500/20 text-orange-400"
  "3-PTE-PENDING": "bg-yellow-500/20 text-yellow-400"
  "4-STANDARD":    "bg-teal-500/20 text-teal-400"
  "Scheduled":     "bg-teal-500/20 text-teal-400"

<!-- auth — DO NOT CHANGE -->
getSession() from '@/lib/auth' — line 11, used in session = getSession() and useEffect guard
DO NOT add useSession from next-auth/react
DO NOT change any auth logic, redirect logic, or router.push calls

<!-- data fetch — DO NOT CHANGE -->
apiGet("getJobs") via syncQueue.ts — keep unchanged
loadJobs(), registerPush() — keep unchanged

<!-- framer-motion — already imported, keep animations -->
motion, AnimatePresence already used — keep all animation props unchanged

<!-- greeting header redesign (reference fd4ab59d) -->
Current: likely a simple text header
New: dark navy card/bar at top, slightly elevated bg-[var(--bg-surface)] or bg-slate-900
  Left: greeting text ("Good morning, [firstName]") text-white font-600 text-lg
  Right: locale toggle (keep existing if present)
  Padding: px-4 py-4
  No border on top (extends to status bar)

<!-- BottomNav design spec -->
Fixed bottom-0 left-0 right-0
bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]
Four items evenly spaced: Home, Jobs, Messages, Profile
Each item: flex-col items-center gap-1, icon (Phosphor or lucide) + label text-xs
Active item (Jobs — current page): text-amber-500 icon fill
Inactive: text-slate-500
Home href="/jobs" (for now — no /home route yet)
Jobs href="/jobs" (active)
Messages href="/jobs" (placeholder — no /messages route in Sprint 1)
Profile href="/jobs" (placeholder — no /profile route in Sprint 1)
Height: h-16 (64px), icons w-5 h-5

<!-- body padding for BottomNav -->
Add pb-16 to the main scrollable content area so cards are not hidden behind the nav bar

<!-- Phosphor icons available (installed plan 01) -->
Use from '@phosphor-icons/react':
  House (Home), Briefcase (Jobs), ChatCircle (Messages), User (Profile)
  size={20}, weight="regular" for inactive, weight="fill" for active
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Create BottomNav component</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/jobs/page.tsx
  </read_first>
  <action>
    Create tech-pwa/src/components/BottomNav.tsx

    Props: { activeTab?: 'home' | 'jobs' | 'messages' | 'profile' }
    Default activeTab: 'jobs'

    Import from '@phosphor-icons/react': House, Briefcase, ChatCircle, User
    Import Link from 'next/link'

    Nav items array (define inline):
    [
      { id: 'home',     label: 'Home',     icon: House,       href: '/jobs' },
      { id: 'jobs',     label: 'Jobs',     icon: Briefcase,   href: '/jobs' },
      { id: 'messages', label: 'Messages', icon: ChatCircle,  href: '/jobs' },
      { id: 'profile',  label: 'Profile',  icon: User,        href: '/jobs' },
    ]

    Root element: nav with className "fixed bottom-0 left-0 right-0 h-16 bg-[var(--bg-surface)]
      border-t border-[var(--border-subtle)] flex items-center z-40"

    Each item: Link href={item.href} className "flex-1 flex flex-col items-center justify-center gap-0.5
      transition-colors duration-200"
      isActive = item.id === activeTab
      Icon: size={20} weight={isActive ? 'fill' : 'regular'}
      Icon color class: isActive ? 'text-amber-500' : 'text-slate-500'
      Label: text-[10px] font-500, same color class as icon

    No `as any`. All types explicit.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - BottomNav.tsx exists at src/components/BottomNav.tsx
    - Imports House, Briefcase, ChatCircle, User from '@phosphor-icons/react'
    - Active item uses weight="fill" and text-amber-500
    - No `as any` in file
    - npx tsc --noEmit exits 0
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Update jobs/page.tsx — priority maps + header + BottomNav</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/jobs/page.tsx
  </read_first>
  <action>
    Edit tech-pwa/src/app/jobs/page.tsx with these targeted changes:

    1. PRIORITY_BORDER — replace the entire Record definition:
       "1-URGENT" → "border-l-amber-500"
       "2-TURNOVER" → "border-l-orange-500" (unchanged)
       "3-PTE-PENDING" → "border-l-yellow-500" (unchanged)
       "4-STANDARD" → "border-l-teal-500"
       Add: "Scheduled" → "border-l-teal-500"

    2. PRIORITY_CHIP — replace the entire Record definition:
       "1-URGENT" → "bg-amber-500/20 text-amber-400"
       "2-TURNOVER" → "bg-orange-500/20 text-orange-400" (unchanged)
       "3-PTE-PENDING" → "bg-yellow-500/20 text-yellow-400" (unchanged)
       "4-STANDARD" → "bg-teal-500/20 text-teal-400"
       Add: "Scheduled" → "bg-teal-500/20 text-teal-400"

    3. Add import: import BottomNav from '@/components/BottomNav';

    4. Header section — find the greeting/header area and update its container:
       Add or update className to include: bg-[var(--bg-surface)] px-4 py-4
       The greeting text "{greeting}, {firstName}" should be: text-white font-semibold text-lg
       Keep the greeting logic (greetingKey, t(greetingKey)) completely unchanged.

    5. Main scrollable content area — add pb-16 to allow BottomNav clearance.
       Find the div wrapping the job list and add pb-16 to its className.

    6. Before the closing tag of the root return element, add:
       <BottomNav activeTab="jobs" />

    RULES — DO NOT CHANGE:
    - getSession() import and usage — unchanged
    - apiGet("getJobs") call — unchanged
    - All framer-motion animation props — unchanged
    - All state declarations — unchanged
    - All useEffect hooks — unchanged
    - router.push('/login') redirect — unchanged
    - SkeletonCard usage — unchanged
    - No `as any` anywhere
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - jobs/page.tsx PRIORITY_BORDER contains "border-l-amber-500" for "1-URGENT"
    - jobs/page.tsx PRIORITY_BORDER contains "border-l-teal-500" for "4-STANDARD"
    - jobs/page.tsx PRIORITY_CHIP contains "bg-amber-500/20 text-amber-400" for "1-URGENT"
    - jobs/page.tsx imports BottomNav
    - jobs/page.tsx renders BottomNav activeTab="jobs"
    - jobs/page.tsx still imports getSession from '@/lib/auth' (not useSession)
    - No `as any` in modified file
    - npx tsc --noEmit exits 0
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 3 (N-2): tsc + push + git diff artifact</name>
  <read_first>Nothing to read — terminal task</read_first>
  <action>
    1. cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit — must exit 0.
    2. git add tech-pwa/src/app/jobs/page.tsx tech-pwa/src/components/BottomNav.tsx
    3. git commit -m "feat(mobile): job list redesign — amber/teal cards + bottom nav"
    4. git push origin HEAD
    5. git diff main...HEAD > C:/PTOW/1_APT_Central_Command/artifacts/sr-01-05-diff.txt
    6. git add artifacts/sr-01-05-diff.txt && git commit -m "chore: sr-01-05 diff artifact" && git push origin HEAD
    Post diff path to Claude Code and stop. Wait for PASS.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit</automated>
  </verify>
  <acceptance_criteria>
    - npx tsc --noEmit exits 0
    - artifacts/sr-01-05-diff.txt is non-empty
    - Branch is feat/schedule-redesign
  </acceptance_criteria>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 4 (N-1): Test sprint — mobile job list visual</name>
  <read_first>Nothing to read — browser verification task</read_first>
  <what-built>
    1. cd C:/PTOW/1_APT_Central_Command/tech-pwa && npm run dev
    2. In browser DevTools set mobile viewport (375×812)
    3. Log in as tech (badge=1, PIN=1234)
    4. Visit http://localhost:3000/jobs
    5. Verify: URGENT job cards have amber left border (not red)
    6. Verify: STANDARD/Scheduled job cards have teal left border (not blue)
    7. Verify: Bottom nav visible — Home, Jobs, Messages, Profile — Jobs tab amber/active
    8. Verify: Greeting header shows dark navy background with white greeting text
    9. Verify: Cards do not disappear behind bottom nav (pb-16 clearance)
    10. Run: cd tech-pwa && npx playwright test — must show 0 failed
    11. Kill dev server
    12. Write artifacts/sr-01-05-test-results.txt:
        - URGENT card border color (amber = PASS): ______
        - STANDARD card border color (teal = PASS): ______
        - Bottom nav visible with 4 items: ______
        - Jobs tab is amber/active: ______
        - Cards clear bottom nav: ______
        - Playwright summary line: ______
  </what-built>
  <how-to-verify>
    - Amber left border on URGENT cards (not red, not blue)
    - Teal left border on STANDARD cards (not blue)
    - Bottom nav present with 4 tabs
    - Playwright: 0 failed
  </how-to-verify>
  <resume-signal>Post artifacts/sr-01-05-test-results.txt to Claude Code and stop. Wait for clear-to-merge.</resume-signal>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 5 (N): Merge after Claude Code clear-to-merge</name>
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
| jobs/page.tsx auth guard | getSession() from @/lib/auth — tech PWA auth pattern |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-sr05-01 | Elevation of Privilege | jobs/page.tsx auth hook | mitigate | getSession() unchanged; no useSession() added; redirect to /login unchanged |
| T-sr05-02 | Information Disclosure | BottomNav placeholder routes | accept | All placeholder hrefs point to /jobs — no new routes exposed |
| T-sr05-SC | Tampering | npm installs | accept | No new packages — Phosphor installed in plan 01 |
</threat_model>

<verification>
- npx tsc --noEmit exits 0
- PRIORITY_BORDER "1-URGENT" = "border-l-amber-500"
- PRIORITY_BORDER "4-STANDARD" = "border-l-teal-500"
- jobs/page.tsx uses getSession() not useSession()
- BottomNav renders with 4 items, Jobs tab active/amber
- Playwright: 0 new failures vs baseline
</verification>

<success_criteria>
- URGENT job cards amber, STANDARD/Scheduled job cards teal
- Bottom navigation bar present on /jobs
- Dark navy header with greeting text
- Auth pattern unchanged (getSession)
- Zero Playwright regressions
</success_criteria>

<output>
Create C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-05-SUMMARY.md when done
</output>
