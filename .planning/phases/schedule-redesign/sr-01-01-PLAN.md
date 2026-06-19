---
phase: sr-01
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - tech-pwa/src/app/globals.css
  - tech-pwa/src/app/layout.tsx
  - tech-pwa/package.json
autonomous: true
requirements: [SR-FOUNDATION]
must_haves:
  truths:
    - "Accent color is amber (#f59e0b) platform-wide — all pages using var(--accent) show amber"
    - "Font renders as Outfit on all pages"
    - "Semantic token aliases exist (--color-surface, --color-text-primary, --color-accent)"
    - "New tokens are registered in @theme block for Tailwind utility use"
    - "Full Playwright suite passes: 44 passed, 68 skipped, 0 failed"
  artifacts:
    - path: "tech-pwa/src/app/globals.css"
      provides: "Updated CSS token block with amber accent and semantic aliases"
      contains: "--accent: #f59e0b"
    - path: "tech-pwa/src/app/layout.tsx"
      provides: "Outfit font loaded via next/font/google"
      contains: "Outfit"
  key_links:
    - from: "layout.tsx"
      to: "globals.css"
      via: "--font-sans CSS variable"
      pattern: "variable.*--font-sans"
    - from: "globals.css @theme"
      to: ":root tokens"
      via: "var() references"
      pattern: "--color-accent.*var\\(--accent\\)"
---

<objective>
Establish the design system foundation for the entire CC platform. Change the primary accent from blue (#3b6cd4) to amber (#f59e0b), swap the font from Raleway to Outfit, add semantic CSS token aliases, install @phosphor-icons/react, and verify zero Playwright regressions from the platform-wide token change.

Purpose: Every subsequent plan depends on these tokens being in place. This is the design system genesis sprint — visual decisions here define the language for the entire CC platform.
Output: Updated globals.css, layout.tsx, package.json with Phosphor icons. All pages render amber accent and Outfit font.
</objective>

<execution_context>
@C:/Users/Aldrick/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/Aldrick/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-CONTEXT.md
@C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-RESEARCH.md
@C:/PTOW/1_APT_Central_Command/RULES.md

<interfaces>
<!-- Live token state extracted from tech-pwa/src/app/globals.css -->
Current :root block (lines 39-57):
  --bg-primary: #0d0f14
  --bg-surface: #13161e
  --text-primary: #ffffff
  --text-secondary: rgba(255, 255, 255, 0.7)
  --text-muted: rgba(255, 255, 255, 0.35)
  --border-subtle: rgba(255, 255, 255, 0.08)
  --accent: #3b6cd4        ← CHANGE TO #f59e0b
  --accent-hover: #4d7ce0  ← CHANGE TO #d97706
  --accent-gold: #ECD541
  --surface-card: #13151a
  --surface-raised: #1c1f27

Current @theme block (lines 3-37): registers CSS vars as Tailwind tokens.
--color-accent: var(--accent) ALREADY EXISTS in @theme — no duplicate needed.

Status colors — DO NOT CHANGE:
  --color-urgent: #ff3b3b | --color-turnover: #f97316 | --color-standard: #10b981 | --color-pte: #8b5cf6

.light-mode class exists (lines 59-74) — also has --accent: #1c3b7d — update to amber equivalent in light-mode too.

Current layout.tsx font (lines 2, 12-16):
  import { Raleway } from "next/font/google";
  const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans", weight: ["400","500","600","700"] });
  body className uses: ${raleway.variable} font-sans

Package legitimacy: @phosphor-icons/react is a well-established icon library (4+ years, github.com/phosphor-icons/web).
Run slopcheck before install per Package Legitimacy Gate protocol.
</interfaces>
</context>

<tasks>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 1: Slopcheck @phosphor-icons/react before install</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/package.json
    C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-RESEARCH.md (Package Legitimacy Audit section)
  </read_first>
  <what-built>
    Run slopcheck on @phosphor-icons/react:
    1. Check npmjs.com/package/@phosphor-icons/react — verify publisher is phosphor-icons org, confirm download count and age
    2. Check github.com/phosphor-icons/web — confirm repo exists, has recent activity, star count > 1000
    3. Verify no typosquatting variants exist (phosphoricons, phospher-icons, etc.)
  </what-built>
  <how-to-verify>
    Visit https://www.npmjs.com/package/@phosphor-icons/react
    Confirm: weekly downloads > 500K, published > 2 years ago, publisher = phosphor-icons
    Visit https://github.com/phosphor-icons/web — confirm active, starred
  </how-to-verify>
  <resume-signal>Type "slopcheck PASS" to proceed with install, or describe any concerns found</resume-signal>
</task>

<task type="auto" tdd="false">
  <name>Task 2: CSS token migration — amber accent + semantic aliases</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/globals.css
    C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-CONTEXT.md (Design System Architecture section)
    C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-RESEARCH.md (Token Changes Required table)
  </read_first>
  <action>
    Edit tech-pwa/src/app/globals.css with the following changes:

    IN :root block:
    - Change --accent from #3b6cd4 to #f59e0b (amber, per CONTEXT.md locked decision)
    - Change --accent-hover from #4d7ce0 to #d97706 (amber hover state)
    - Keep --accent-gold: #ECD541 unchanged
    - Add new semantic alias tokens after --surface-raised:
        --color-surface: var(--bg-surface);
        --color-text-primary: var(--text-primary);
        --color-accent: var(--accent);
        --color-accent-amber: #f59e0b;
        --color-teal: #10b981;

    IN .light-mode block:
    - Change --accent from #1c3b7d to #d97706 (amber dark, readable on light bg)
    - Change --accent-hover from #233d7d to #b45309

    IN @theme block — add these entries after existing --color-accent-hover line:
        --color-surface: var(--bg-surface);
        --color-accent-amber: #f59e0b;
        --color-teal: #10b981;
    Note: reference the ORIGINAL :root vars (--bg-surface) not the new aliases (--color-surface).
    Referencing a var by the same name it is being defined in @theme creates a circular CSS custom
    property chain which the CSS spec resolves to initial/unset, silently breaking the token.

    DO NOT change any --color-urgent, --color-turnover, --color-standard, --color-pte, or --color-status-* or --color-compliance-* tokens.
    DO NOT add duplicate --color-accent to @theme (it already maps var(--accent)).
    DO NOT change --bg-primary value — keep #0d0f14 (CONTEXT.md says "#0f172a or similar — NOT pure #000000"; existing value is acceptable).
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - globals.css :root contains exactly: --accent: #f59e0b
    - globals.css :root contains exactly: --accent-hover: #d97706
    - globals.css :root contains: --color-surface: var(--bg-surface)
    - globals.css :root contains: --color-accent: var(--accent)
    - globals.css @theme contains: --color-accent-amber
    - .light-mode block --accent is NOT blue (#1c3b7d or #233d7d must be replaced)
    - No --color-urgent, --color-standard, --color-pte values changed
    - globals.css :root contains exactly: --accent-gold: #ECD541 (unchanged)
    - npx tsc --noEmit exits 0
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 3: Font swap Raleway → Outfit + install Phosphor icons</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/layout.tsx
    C:/PTOW/1_APT_Central_Command/tech-pwa/package.json
  </read_first>
  <action>
    Edit tech-pwa/src/app/layout.tsx:
    - Remove: import { Raleway } from "next/font/google";
    - Remove: const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans", weight: ["400","500","600","700"] });
    - Add: import { Outfit } from "next/font/google";
    - Add: const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans", weight: ["400","500","600","700"] });
    - In RootLayout body className, replace ${raleway.variable} with ${outfit.variable}
    - Keep all other body className values unchanged

    Install Phosphor icons (after slopcheck PASS from Task 1):
    cd C:/PTOW/1_APT_Central_Command/tech-pwa && npm install @phosphor-icons/react

    The font variable name "--font-sans" stays the same — zero component changes required.
    Do NOT change metadata, viewport, or any other layout.tsx content.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -5 && node -e "const p=require('./package.json'); console.log('@phosphor-icons/react:', p.dependencies['@phosphor-icons/react'] || 'MISSING')"</automated>
  </verify>
  <acceptance_criteria>
    - layout.tsx imports Outfit, not Raleway
    - layout.tsx uses outfit.variable in body className
    - package.json contains "@phosphor-icons/react" in dependencies
    - npx tsc --noEmit exits 0
    - No other layout.tsx content changed (metadata, viewport, providers, children structure)
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 4 (N-2): tsc + push + git diff artifact</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/globals.css
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/layout.tsx
  </read_first>
  <action>
    Run in order:
    1. cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit — must exit 0. If not, fix errors before continuing.
    2. git add tech-pwa/src/app/globals.css tech-pwa/src/app/layout.tsx tech-pwa/package.json tech-pwa/package-lock.json
    3. git commit -m "feat(design): amber accent tokens + Outfit font + Phosphor icons"
    4. git push origin HEAD
    5. git diff main...HEAD > C:/PTOW/1_APT_Central_Command/artifacts/sr-01-01-diff.txt
    6. git add artifacts/sr-01-01-diff.txt && git commit -m "chore: sr-01-01 diff artifact" && git push origin HEAD
    Post diff path to Claude Code and stop. Wait for PASS.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit</automated>
  </verify>
  <acceptance_criteria>
    - npx tsc --noEmit exits 0 with zero error lines
    - artifacts/sr-01-01-diff.txt exists and is non-empty
    - Branch is feat/schedule-redesign (verify with git branch --show-current)
  </acceptance_criteria>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 5 (N-1): Test sprint — font + accent visual verification</name>
  <read_first>Nothing to read — this is a browser verification task</read_first>
  <what-built>
    Start dev server and verify token changes across all pages:
    1. cd C:/PTOW/1_APT_Central_Command/tech-pwa && npm run dev
    2. Visit http://localhost:3000/login — verify amber accent on Google sign-in button focus/hover ring (NOT blue)
    3. Visit http://localhost:3000/live (log in as admin first) — verify amber on interactive elements
    4. Visit http://localhost:3000/schedule — verify amber accent
    5. Run font check in browser console on any page: document.fonts.check("1em Outfit") — must return true
    6. Run: cd tech-pwa && npx playwright test — must show 44 passed, 68 skipped, 0 failed
    7. Kill dev server: Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
    8. Write artifacts/sr-01-01-test-results.txt with:
       - Font check result: document.fonts.check("1em Outfit") = ______
       - /login accent color: ______ (amber = PASS)
       - /live accent color: ______ (amber = PASS)
       - Playwright summary line: ______
  </what-built>
  <how-to-verify>
    Playwright must show: X passed, Y skipped, 0 failed (where X >= 44 and failed = 0)
    Font check must return: true
    Accent on /login and /live must be amber, not blue
  </how-to-verify>
  <resume-signal>Post artifacts/sr-01-01-test-results.txt content to Claude Code and stop. Wait for clear-to-merge.</resume-signal>
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
| globals.css → all pages | Token change propagates platform-wide; incorrect value = visual regression on every page |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-sr01-01 | Tampering | @phosphor-icons/react npm install | mitigate | Slopcheck gate (Task 1) before install; verify publisher is phosphor-icons org |
| T-sr01-SC | Tampering | npm install | mitigate | slopcheck + blocking human checkpoint for package verification |
</threat_model>

<verification>
- npx tsc --noEmit exits 0 after all changes
- globals.css --accent value is exactly #f59e0b
- layout.tsx imports Outfit, not Raleway
- Playwright suite: 44 passed, 68 skipped, 0 failed (regression ceiling: 0 new failures)
- Browser console: document.fonts.check("1em Outfit") === true
- /live, /login, /schedule all show amber accent, not blue
</verification>

<success_criteria>
- Platform accent is amber (#f59e0b) on all pages
- Font is Outfit on all pages
- Semantic CSS aliases registered in :root and @theme
- @phosphor-icons/react installed and importable
- Zero Playwright regressions vs baseline (43p/68s/0f)
</success_criteria>

<output>
Create C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-01-SUMMARY.md when done
</output>
