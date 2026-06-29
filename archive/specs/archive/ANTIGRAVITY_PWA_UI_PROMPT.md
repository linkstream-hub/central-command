# APT Tech PWA — Expert-Grade UI Brief for Antigravity
# Paste this entire file into Antigravity to begin the UI polish pass.

---

## Context

We have a working Next.js 16 (App Router + Turbopack) + TypeScript + Tailwind + @ducanh2912/next-pwa
Tech PWA deployed and tested end-to-end. The backend is live (Google Apps Script TechPWA.gs).
Clock in/out, breaks, job complete, photo upload, CA break compliance warnings — all functional.

**Goal:** Transform the existing UI from "working prototype" into a product that impresses contractors,
field supervisors, and investors who see it for the first time. We want the visual bar of a polished
consumer app (think Notion, Linear, or Vercel dashboard) applied to a blue-collar field ops tool.

Working directory: `A:/PTOW/1_APT_Central_Command/tech-pwa/`
API spec: `A:/PTOW/1_APT_Central_Command/TECH_PWA_API_SPEC.md`

---

## Tech Constraints

- Next.js 16 App Router — `params` must be unwrapped via `React.use(params)` (it's a Promise)
- Tailwind CSS — prefer Tailwind utilities over custom CSS; add custom tokens to `tailwind.config.ts`
- `framer-motion` — add via npm if not installed; use for page transitions and micro-interactions
- `lucide-react` — already installed; use for all icons
- No new routing architecture — only polish existing screens
- Keep all API call signatures identical to current implementation

---

## Design System

### Color Tokens (add to `tailwind.config.ts`)

```js
colors: {
  surface: {
    bg:      '#0a0b0e',   // page background — near-black with blue tint
    card:    '#13151a',   // card/panel background
    raised:  '#1c1f27',   // elevated elements (modals, dropdowns)
    border:  '#2a2d38',   // subtle borders
    hover:   '#22252f',   // hover state
  },
  brand: {
    primary: '#3b82f6',   // APT blue — primary actions
    dim:     '#1d4ed8',   // darker blue for active states
    glow:    'rgba(59,130,246,0.15)',  // blue glow/pulse
  },
  status: {
    urgent:    '#ef4444',   // red
    turnover:  '#f97316',   // orange
    pending:   '#eab308',   // yellow
    standard:  '#3b82f6',   // blue
    complete:  '#22c55e',   // green
    onBreak:   '#a855f7',   // purple
  },
  compliance: {
    warn:  '#f59e0b',    // meal break warning (amber)
    crit:  '#ef4444',    // missed meal critical (red)
    rest:  '#3b82f6',    // rest break reminder (blue)
    ok:    '#22c55e',    // all clear (green)
  }
}
```

### Typography
- Display (job titles, large numbers): `font-bold tracking-tight text-white`
- Body: `text-sm text-slate-300`
- Muted/meta: `text-xs text-slate-500`
- Monospace (timer, IDs): `font-mono text-white`

### Elevation
- Cards: `bg-surface-card border border-surface-border rounded-2xl`
- Modals: `bg-surface-raised border border-surface-border rounded-3xl shadow-2xl`
- Buttons: use `shadow-lg` + brand color glow on primary actions

---

## Screen-by-Screen Requirements

### 1. Login Screen (`/login` or `/`)

**Current state:** Basic form with badge# and PIN inputs.

**Target:**
- Full-screen dark gradient background (`from-surface-bg via-[#0d1117] to-[#0a0f1a]`)
- APT logo or wordmark centered at top (use text "APT" in brand blue if no asset)
- "Field Operations" subtitle in muted text
- Card container with glass-morphism border: `border border-white/10 backdrop-blur-sm`
- Inputs: `bg-surface-raised border border-surface-border rounded-xl px-4 py-3`
  - Auto-focus badge# on mount
  - PIN field shows `●●●●` — toggle visibility button (eye icon from lucide)
  - On focus: border transitions to `border-brand-primary`
- Login button:
  - `bg-brand-primary hover:bg-brand-dim rounded-xl py-3 w-full font-semibold`
  - Loading state: spinner (animate-spin) replaces text, button disabled
  - On success: `framer-motion` fade+scale exit → jobs screen entrance
- Error state: red border + shake animation (`animate-[shake_0.3s_ease-in-out]`)
  - Define `shake` keyframe in `globals.css`: small horizontal oscillation
- Bottom: "APT Maintenance Inc." in muted micro-text

---

### 2. Today's Jobs Screen (`/jobs`)

**Current state:** List of job cards.

**Target:**
- Header bar:
  - Left: "Good morning/afternoon, [tech first name]" greeting
  - Right: Avatar circle (initials, brand blue bg) + tap → logout confirm sheet
- Job count badge: "3 Jobs Today" pill under greeting
- Pull-to-refresh: custom implementation using touch events — spinner appears at top
- Job cards:
  - `bg-surface-card border border-surface-border rounded-2xl p-4`
  - **Priority accent:** 4px left border in status color (urgent=red, turnover=orange, etc.)
    ```
    border-l-4 border-l-status-urgent   (1-URGENT)
    border-l-4 border-l-status-turnover (2-TURNOVER)
    border-l-4 border-l-status-pending  (3-PTE-PENDING)
    border-l-4 border-l-status-standard (4-STANDARD)
    ```
  - Top row: Address (bold white) + priority chip (right-aligned, colored bg pill)
  - Middle row: Unit + Category in muted text
  - Bottom row: Status chip + estimated hours (if available)
  - Active job (clocked in): pulsing green dot left of address
  - Tap: `framer-motion` slide-right transition into job detail
- Empty state: centered illustration + "No jobs assigned today" + "Pull to refresh"
- Offline banner: sticky top bar `bg-amber-900/50 border-b border-amber-700 text-amber-300`
  - Shows queued event count: "2 events pending sync"
  - Disappears when online + queue flushed

---

### 3. Job Detail Screen (`/job/[jobId]`)

**Current state:** Clock in/out, break, complete, photos, flag issue — functional but flat.

**Target:**

#### Header
- Back chevron + address as title
- Priority chip (right)
- Status chip below title with dot indicator

#### Timer Section (most important element on screen when active)
```
┌─────────────────────────────────┐
│  ● CLOCKED IN                   │
│                                 │
│     02:47:13                    │  ← HH:MM:SS, font-mono, text-5xl
│                                 │
│  Clock-in: 8:32 AM              │
│  Break: 12 min                  │
└─────────────────────────────────┘
```
- `bg-surface-card border border-surface-border rounded-2xl`
- Timer updates every second (`setInterval(1000)`)
- Status indicator: green dot + "CLOCKED IN" | purple dot + "ON BREAK" | gray "NOT STARTED"
- On break: timer pauses, "ON BREAK" text pulses (animate-pulse in purple)

#### CA Compliance Banner
Only visible when thresholds are hit. Full-width, above action buttons:
- Rest break due (270min): `bg-blue-900/50 border border-blue-700 text-blue-300`
  - Icon: Clock + "Rest break recommended — 4 hours worked"
- Meal break required (300min, <30min break taken): `bg-amber-900/50 border border-amber-700`
  - Icon: AlertTriangle + "Meal break required — premium pay triggered if not taken"
  - Pulse animation: `animate-pulse` on the border
- Second meal (570min): `bg-red-900/50 border border-red-700 text-red-300`
  - Bold. This is CA law violation territory.

#### Action Buttons
Render based on state machine:
- **Pre-clock-in:** Single large button "Clock In" — `bg-brand-primary`, full width, rounded-2xl, py-4, text-lg font-semibold
- **Active (clocked in):**
  - Row: `[Start Break]` (purple, 50% width) + `[Clock Out]` (slate, 50% width)
  - Below: `[Mark Complete]` — `bg-status-complete text-black font-bold`, full width
- **On break:**
  - Single button: `[End Break]` — purple, full width
- **Complete:**
  - Gray "Job Completed" non-interactive badge — no buttons

All buttons:
- `rounded-2xl py-4 font-semibold text-base`
- Loading state: spinner + disabled opacity-50
- Haptic feedback on tap: `navigator.vibrate && navigator.vibrate(10)`
- Success haptic on mark complete: `navigator.vibrate([50, 30, 50])`

#### Job Info Accordion
Collapsed by default, tap to expand:
- Tenant & Access (shows lockbox code, notes)
- Task Description
Each section: `border-t border-surface-border py-3`

#### Photo Section
Three tabs: Before / After / Receipt
- Tab bar: `bg-surface-raised rounded-xl p-1` with active pill `bg-surface-card rounded-lg`
- Upload area: dashed border `border-2 border-dashed border-surface-border rounded-2xl`
  - Center: camera icon + "Tap to capture"
  - After capture: thumbnail grid, tap to enlarge (modal)
- Offline note (if offline): amber banner "Photo will upload when connection restored"

#### Flag Issue
- `[⚑ Flag Issue]` button — text-only, muted, bottom of screen
- Tapping opens bottom sheet modal (slides up from bottom with Framer Motion)
  - Textarea + Submit — submits flagIssue API call

---

### 4. Animations & Motion

Install `framer-motion` if not present:
```bash
npm install framer-motion
```

**Page transitions:** Wrap layout with AnimatePresence. Each page: `initial={{ opacity:0, y:8 }}` → `animate={{ opacity:1, y:0 }}` → `exit={{ opacity:0, y:-8 }}` with `duration:0.2`.

**Card entrance on jobs screen:** Staggered — each card delays by `index * 0.05s`.

**Timer number changes:** `key={seconds}` on the seconds digit triggers framer-motion `initial={{ y:4, opacity:0 }} animate={{ y:0, opacity:1 }}`.

**Job completion celebration:**
```
1. Mark Complete button press: haptic [50,30,50]
2. Full-screen overlay fades in: dark bg + centered ✓ icon
3. Checkmark scales up: scale 0 → 1.2 → 1 (spring)
4. Text: "Job Complete" fades in below
5. After 1.5s: overlay fades out, navigate back to jobs list
```

**Compliance warning pulse:** When meal break threshold crossed, the amber banner entrance should use a subtle bounce: `type:"spring", stiffness:300`.

---

### 5. Toast Notification System

Create `src/components/Toast.tsx` and `src/context/ToastContext.tsx`:
- Stack of toasts in bottom-center: `fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2`
- Each toast: `bg-surface-raised border border-surface-border rounded-xl px-4 py-3 shadow-2xl`
- Types: success (green left-border), error (red left-border), info (blue left-border), warning (amber)
- Auto-dismiss after 4s with Framer Motion slide-up exit
- Usage: `const { toast } = useToast(); toast.success('Clocked in successfully')`
- Fire on: clock in/out, break start/end, job complete, photo upload, error

---

### 6. PWA Install Prompt

Create `src/components/InstallPrompt.tsx`:
- Listen for `beforeinstallprompt` event
- Show custom banner (not browser default) after 30s or after successful login
- Design: bottom sheet `bg-surface-card rounded-t-3xl p-6 border-t border-surface-border`
  - APT icon + "Add to Home Screen" + subtitle "Works offline — one tap away"
  - `[Install]` button (brand blue) + `[Not Now]` (muted text)
  - Stores dismissal in localStorage so it doesn't re-appear for 7 days

---

### 7. Technical Fixes Required

**themeColor warning:** Next.js 15+ moved themeColor out of `<head>`. Fix:
```ts
// In layout.tsx, replace themeColor in metadata with:
export const viewport = {
  themeColor: '#0a0b0e',
}
```

**Missing icon:** 404 on `/icon-512-rounded.png`. Either:
1. Add a 512×512 rounded APT icon PNG to `public/`
2. Or update `manifest.json` to remove the rounded variant reference

**Safe area insets** (iPhone notch/home bar):
```css
/* In globals.css */
body {
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
}
```

**Offline queue count indicator** on Today's Jobs screen:
- Read `localStorage.getItem('apt_sync_queue')`, parse array, show count in offline banner

---

### 8. Skeleton Loaders

Replace any blank/loading state with skeletons:
- Jobs list loading: 3 skeleton cards — `bg-surface-raised animate-pulse rounded-2xl h-24`
- Job detail loading: skeleton for timer area + action buttons area
- Create `src/components/Skeleton.tsx` with `SkeletonCard` and `SkeletonBlock` exports

---

## Acceptance Criteria

Before marking complete, verify:
- [ ] Login screen loads with no layout shift; PIN toggle works
- [ ] Timer increments every second (HH:MM:SS)
- [ ] Priority left-border accent renders on all 4 priority levels
- [ ] CA compliance banners appear at 270min, 300min (with <30min break), 570min thresholds
- [ ] Toast fires on every API action
- [ ] Photo uploads show thumbnail after capture
- [ ] Job completion shows full-screen celebration then navigates back
- [ ] Offline banner shows when navigator.onLine is false
- [ ] themeColor warning gone from console
- [ ] PWA installs cleanly to home screen (test on mobile)
- [ ] No TypeScript errors (`npm run build` passes)

---

## File Map (do not create new routes — only edit existing)

```
tech-pwa/src/
  app/
    layout.tsx              ← add AnimatePresence, Toast provider, fix viewport export
    page.tsx                ← login screen redesign
    jobs/page.tsx           ← today's jobs list redesign
    job/[jobId]/page.tsx    ← job detail redesign (remember: use React.use(params))
    globals.css             ← add shake keyframe, safe-area insets, custom scrollbar
  components/               ← create directory if needed
    Toast.tsx
    Skeleton.tsx
    InstallPrompt.tsx
    CameraUpload.tsx        ← already exists; add thumbnail grid display
  context/
    ToastContext.tsx
  lib/
    syncQueue.ts            ← already exists; do not change API call signatures
  tailwind.config.ts        ← add design system color tokens
```

---

## API Endpoints (do not change)

All calls go through `src/lib/syncQueue.ts → apiCall(action, payload)`.

| Action | Method | Key Fields |
|--------|--------|-----------|
| login | POST | `{ employeeId, pinHash }` |
| clockIn | POST | `{ token, jobId }` |
| clockOut | POST | `{ token, jobId, breakDurationMinutes }` |
| startBreak | POST | `{ token, jobId }` |
| endBreak | POST | `{ token, jobId }` |
| markComplete | POST | `{ token, jobId, notes }` |
| flagIssue | POST | `{ token, jobId, notes }` |
| uploadReceipt | POST | `{ token, jobId, photoBase64, photoType, mimeType }` |
| getTechJobs | GET | `?action=getTechJobs&token=...` |
| getTechStatus | GET | `?action=getTechStatus&token=&jobId=...` |

CORS note: POST requests use `Content-Type: text/plain` (not `application/json`) to avoid
Apps Script preflight failures. Do not change this in syncQueue.ts.

---

*Generated: April 17, 2026 | APT Central Command*
