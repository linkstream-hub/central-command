# ANTIGRAVITY OPERATIONAL PLAYBOOK — AG.md
# AG's runtime reference. CLAUDE.md handles system state and safety rules. This is your execution toolkit.
# Updated: Session 74 — created. Typography system from Sprint 9. Workspace map. Shell config.

---

## START OF EVERY SESSION

### Step 0 — Activate your tool suite (always, before anything else)

| Suite | What it does | Key skills |
|---|---|---|
| **SuperGravity** | Browser testing, implementation workflow, local dev | `/test`, `/security`, `/build` |
| **SuperClaude** | Analysis, design intelligence, research | `/sc:analyze`, `/sc:design`, `/sc:research`, `/sc:troubleshoot` |
| **GSD** | Planning and execution framework | `/gsd-discuss-phase`, `/gsd-plan-phase`, `/gsd-execute-phase`, `/gsd-code-review`, `/gsd-verify-work` |

These three suites are **always active**. Not optional. Not situational. Every sprint uses all three.

### Step 1 — Read in order

1. `RULES.md` → universal constraints (load first, always — constraints before context)
2. `SESSION_STATE.md` → this session's priorities and `.env.local` template
3. `docs/ARCHITECTURE.md` → system state, components, what works/broken
4. This file → design system, shell config, workspace map

(`CLAUDE.md` → load when you need sprint checklists, review gates, or spec templates — not at session start)

### Step 2 — Plan before touching code

```
/gsd-discuss-phase → /gsd-plan-phase → flag items (if any) → wait for Claude Code PASS → execute
```

Never open a file to edit before you have a GSD plan.

---

## 🎨 VISUAL DESIGN SYSTEM

### CC2.0 CSS Tokens (canonical — `tech-pwa/src/app/globals.css`)

**Backgrounds (dark mode default):**
```css
--bg-primary:     #0d0f14   /* Page base — near-black navy */
--bg-surface:     #13161e   /* Card/panel surface */
--surface-card:   #13151a   /* Slightly warmer card surface */
--surface-raised: #1c1f27   /* Elevated elements, modals */
```

**Text:**
```css
--text-primary:   #ffffff
--text-secondary: rgba(255, 255, 255, 0.7)
--text-muted:     rgba(255, 255, 255, 0.35)
```

**Borders:**
```css
--border-subtle: rgba(255, 255, 255, 0.08)
```

**Accent (update after Claude Code approves Sprint 9 palette — Task 1 gate):**
```css
--accent:       #f97316   /* Current: orange. Sprint 9 Task 1 extracts from aptmaintenanceinc.com */
--accent-hover: (TBD — Sprint 9 Task 2 adds this token. Do not invent before approval.)
```

**Status colors — fixed, never change without flagging Claude Code:**
```css
--color-urgent:   #ff3b3b   /* Emergency jobs */
--color-turnover: #f97316   /* Turnover jobs */
--color-standard: #10b981   /* Standard jobs */
--color-pte:      #8b5cf6   /* PTE Required */

/* Job row status (table/kanban) */
--color-status-urgent:   #ef4444
--color-status-turnover: #f97316
--color-status-pending:  #eab308
--color-status-standard: #3b82f6
--color-status-complete: #22c55e
--color-status-break:    #a855f7
```

**Compliance colors:**
```css
--color-compliance-warn: #f59e0b
--color-compliance-crit: #ef4444
--color-compliance-rest: #3b82f6
--color-compliance-ok:   #22c55e
```

---

### Typography System (canonical — established Sprint 9)

| Role | Tailwind Classes | Case |
|---|---|---|
| Page title H1 | `text-lg font-semibold tracking-tight` | Sentence |
| Section heading | `text-[13px] font-bold uppercase tracking-wide` | UPPER |
| Table column header | `text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]` | UPPER |
| Body / row text | `text-[13px] font-normal tracking-normal` | Sentence |
| Secondary / metadata | `text-[11px] font-normal tracking-normal` | Sentence |
| Badge / status pill | `text-[9px] font-bold uppercase tracking-widest` | UPPER |
| Sidebar nav label | `text-[11px] font-semibold tracking-wide uppercase` | UPPER |

**Anti-patterns — do not use as default:**
- `text-[10px] font-black uppercase tracking-[0.2em]` — badge-only, never body text
- `font-black italic tracking-tighter` — reserved for the APT logo lockup only

---

### Glassmorphism Rules

`backdrop-blur` only works when visible background content exists behind the element. Flat dark backgrounds (`#0d0f14`) produce zero visual blur effect.

**Correct — floats over grid/media content:**
```tsx
className="bg-[var(--bg-surface)]/80 border border-[var(--border-subtle)] backdrop-blur-md"
```

**Invisible on flat backgrounds — delete, never add:**
```tsx
className="bg-white/5 backdrop-blur-xl"          /* bg-white/5 = transparent black on dark */
className="bg-accent/5 blur-[160px] rounded-full" /* ambient glow — invisible on flat bg */
```

---

### Approved Component Patterns

**Premium card hover (already defined in globals.css — use the class, don't rewrite):**
```css
.premium-card:hover {
  transform: translateY(-2px);
  background: color-mix(in srgb, var(--accent) 5%, var(--bg-surface));
  border-color: color-mix(in srgb, var(--accent) 30%, var(--border-subtle));
}
```

**Glass panel (already defined — use the class):**
```css
.glass-panel {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(12px);
}
```

**Custom scrollbar (already defined — apply `custom-scrollbar` class, don't rewrite).**

**Toggle button group (approved pattern — replaces pipe-separator dividers):**
```tsx
<div className="flex rounded-md overflow-hidden border border-[var(--border-subtle)]">
  <button className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide
    bg-[var(--accent)]/15 text-[var(--accent)]">Active</button>
  <button className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide
    text-[var(--text-muted)] hover:text-[var(--text-primary)]">Inactive</button>
</div>
```

---

## 💻 WINDOWS SHELL CONFIGURATION

**Shell:** PowerShell 7+ (pwsh). `&&` works (PS7+ pipeline chain operator).

**Path format:** `C:\PTOW\1_APT_Central_Command\...` — Windows backslash. Forward slash works in npm/git but not in Windows-native contexts.

**Verified run commands:**
```powershell
# Local dev server
cd tech-pwa && npm run dev                         # → http://localhost:3000

# TypeScript check (required before diff — must be zero errors)
cd tech-pwa && npx tsc --noEmit

# Full branch diff (ONLY after final commit — this is the artifact Claude Code reads)
git diff main...HEAD > artifacts/ag_diff.txt

# Apps Script deploy — Lead Parsing (repo root)
clasp push --force

# Apps Script deploy — Dashboard API (dashboard-api/ subdirectory)
cd dashboard-api && clasp push --force
clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v##"

# E2E tests — playwright manages the test server (port 3010), do NOT pre-start one
# Just run this — it starts the server, runs tests, tears down
cd tech-pwa && npx playwright test
# To reuse a pre-started test server on port 3010 (faster re-runs):
# start it once with: $env:NEXT_PUBLIC_API_URL=''; npm run dev -- -p 3010
# then run tests normally — reuseExistingServer picks it up
```

**Critical shell rules:**
- Never prefix commands with `!` — PowerShell treats it as a unary operator (syntax error)
- `$env:VAR` to read env vars (not `$VAR`)
- `$null` for null/redirect (not `/dev/null`)
- `Remove-Item -Recurse -Force` for `rm -rf`

**Package manager:**
- `npm` with `legacy-peer-deps=true` (set in `.npmrc` at `tech-pwa/` — do not remove)
- Do not use `yarn` or `pnpm` in this project

**clasp credential expiry:** If clasp commands fail with auth errors, you cannot fix this. Flag it — Brandon runs `C:\PTOW\Clasp Reauth.bat`.

**Local dev auth:**
- Tech PWA: badge `1`, PIN `1234`
- Dispatch (CC2.0): "Dev Login (Admin)" button
- `NEXTAUTH_URL=http://localhost:3000` required in `.env.local`
- `.next` build cache lives at `C:/tmp/apt-cc-next`

---

## 🗂️ WORKSPACE DIRECTORY MAP

| # | Absolute Path | Project | Notes |
|---|---|---|---|
| 1 | `C:\PTOW\1_APT_Central_Command` | APT Maintenance CC2.0 — full ops platform | Active — this workspace |
| 2 | `A:\PTOW\2_Zen_Legal` | Zen Legal | Active |
| 3 | `A:\PTOW\3_Credit_Defense` | Credit Defense | Active |
| 4 | `A:\PTOW\4_Double_Great_Project_35` | Project 35 | Active |
| 5 | `A:\PTOW\5_POD_Products` | POD Products | Active |
| 6 | `A:\PTOW\6_Tax_Search` | Tax Search | Active |
| 7 | `A:\PTOW\7_Zen_Legal_CA` | Zen Legal California | Active |
| 8 | `A:\PTOW\8_Golden_Coast_Law` | Golden Coast Law | Active |
| 9 | `A:\PTOW\9_Clearslate_Credit` | Clearslate Credit | Active |
| 10 | `A:\PTOW\10_PC_Cleanup_Organization` | PC Cleanup | Active |

Each project has its own `CLAUDE.md` and `SESSION_STATE.md`. For GSD-managed projects, read `STATE.md` at session start or run `/gsd-new-project`.

---

## ⚙️ AG EXECUTION PROTOCOL (condensed — full protocol in WORKFLOW.md)

**Every sprint, in order — all steps are mandatory, none are optional:**
```
/gsd-discuss-phase → /gsd-plan-phase → flag items (if any) → wait for PASS → implement
  → tsc zero → diff → report one line → STOP. Wait for Claude Code PASS on diff.
  → test sprint (separate session) → ag_test_results.txt → report one line → STOP. Wait for "Clear to merge."
  → merge only after Claude Code issues "Clear to merge." Never before.
```

Skipping any step — especially the test sprint or the merge gate — is freelancing. It is not acceptable regardless of how confident AG is that the work is correct.

**Always flag to Claude Code when touching:**
- Auth token patterns or session storage keys
- Neon schema changes (new columns, type changes, index changes)
- Google Sheets column indexes
- Cross-system writes (Next.js + GAS + Neon in same action)
- New `/api/` routes replacing existing GAS action strings

**Brandon rule — never route tasks to Brandon that AG can do:**
Brandon states outcomes. He does not run commands, merge PRs, pull branches, add system exclusions, or perform any technical operation. If a task seems to require admin or account access, try CLI first:
- Merge PRs → `gh pr merge`
- Defender exclusions → elevated PowerShell `Add-MpPreference`
- GitHub operations → `gh` CLI
- Vercel operations → `vercel` CLI
- Git operations → git CLI

Brandon only touches dashboards to type in secret values (API keys, DSNs) that require his personal account login. Nothing else.

**Non-negotiable rules:**
- Always commit to `feat/[feature-name]` — never `main`
- Implement sprint and test sprint are separate sessions
- Generate `ag_diff.txt` only AFTER final commit — never before
- Only Claude Code clears a merge — "Clear to merge" is Claude Code's phrase, never yours

**Test sprint evidence requirements:**

For all sprints:
- `ag_test_results.txt` must contain specific observed data (job IDs, addresses, status values, response bodies) — not "Verified that X works"
- Screenshots go in `artifacts/` — required for any visual change
- **Run `cd tech-pwa && npx playwright test`. Paste the final summary line** (e.g., `42 passed (31s)`) into `ag_test_results.txt`. Missing = test sprint incomplete, full stop.
- **Never embed key values or secret-resembling strings in `ag_test_results.txt` or any committed file.** Security verification states the method and result: `"DASHBOARD_API_KEY absent from client bundle — confirmed via grep on .next/static/"`. Never print the key value itself. This applies to all files in `artifacts/`.
- **For integrations requiring a live service event** (Sentry, webhooks, push notifications, etc.): "done" = paste the event ID or confirmed response from the external service. A config file that reads from env is not proof the integration is live.

For CSS/font/color sprints — screenshots alone are not enough. Paste browser console output for each changed token:
```js
// Font swap verification
document.fonts.check("1em Raleway")           // → true

// Color token verification
getComputedStyle(document.body).getPropertyValue("--accent").trim()       // → #3b6cd4
getComputedStyle(document.body).getPropertyValue("--accent-hover").trim() // → #4d7ce0
```
Copy the exact output into `ag_test_results.txt`. Claude Code will not clear a CSS sprint on screenshots alone.

**Before AND after every E2E test run — kill port 3010 first:**
```powershell
# Option A — inline (always works)
$pids = (Get-NetTCPConnection -LocalPort 3000,3001,3010 -State Listen -ErrorAction SilentlyContinue).OwningProcess
$pids | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }

# Option B — if PTOW-Bridge.ps1 is loaded (see Bridge Utilities below)
cap
```
Then run: `cd tech-pwa && npx playwright test`

**CRITICAL — why the port kill is mandatory:** Playwright reuses any existing server on port 3010. If you started a dev server manually without `DEV_BYPASS_AUTH=true`, reusing it makes Dev Login fail and every auth test fails. Kill the port first, every time, no exceptions.

Do not leave Node.js processes running after a test sprint. Orphaned servers occupy ports and slow the next startup.

**PTOW Bridge Utilities (`scripts/PTOW-Bridge.ps1`):**
Load once per PowerShell session: `. .\scripts\PTOW-Bridge.ps1`
To auto-load: `Add-Content -Path $PROFILE -Value ". 'C:\PTOW\1_APT_Central_Command\scripts\PTOW-Bridge.ps1'"`

| Alias | Function | Use when |
|---|---|---|
| `cap` | `Clear-ActivePorts` | Before every E2E run — kills ports 3000/3001/3010 |
| `rae` | `Repair-AgentEnv` | Claude Code Desktop crashed AG — run to fix worktreeConfig |
| `tmg` | `Test-MergeGate` | Experimental — runs tsc + diff + launches Claude review |
| `icc` | `Invoke-ClaudeCode` | Experimental — not part of standard workflow |

`cap` and `rae` are production-ready. `tmg` and `icc` are not part of the standard sprint protocol — use only if explicitly instructed.

**Contradiction check (before first commit):**
1. Read target files from the plan
2. Cross-check string literals against live code
3. Flag any mismatch to Claude Code — do not resolve it yourself

> **Reminder:** SuperGravity + SuperClaude + GSD are always active. See Step 0 at the top of this file.

---

## 🔐 AUTH HOOKS — NEVER MIX

| Page context | Required hook |
|---|---|
| Office staff pages (`/live`, `/schedule`, `/team`, `/hr`, etc.) | `useSession()` from `next-auth/react` |
| Tech PWA pages (`/jobs`, `/job/[jobId]`, `/clock`, etc.) | `getSession()` from `@/lib/auth` |

Wrong hook = redirect loop. If unsure which applies, flag to Claude Code before writing the component.

---

## ⚠️ NEXT.JS VERSION WARNING

This project runs **Next.js 16**. Your training data reflects older versions — APIs differ. Before writing any route handler, middleware, or Server Component, read the live docs:
```
node_modules/next/dist/docs/
```
Do not rely on training data for Next.js routing, caching, or server action patterns.
