---
phase: sr-01
plan: 04
type: execute
wave: 3
depends_on: [sr-01-01]
files_modified:
  - tech-pwa/src/app/login/page.tsx
  - tech-pwa/src/components/TechLoginView.tsx
autonomous: true
requirements: [SR-05]
must_haves:
  truths:
    - "When hostname starts with clock. the page renders TechLoginView (numeric keypad, not text inputs)"
    - "Badge number displays large and bold as digits are entered"
    - "Numeric keypad shows 1-9 grid + 0 key"
    - "Four PIN dot indicators fill as PIN digits are entered"
    - "Amber Confirm CTA button triggers existing handleTechLogin logic"
    - "Google OAuth dispatch section is completely unchanged"
    - "auth.spec.ts 1.6 (Invalid badge number or PIN error) still passes"
  artifacts:
    - path: "tech-pwa/src/components/TechLoginView.tsx"
      provides: "Full-screen dark navy badge/PIN keypad UI"
      exports: ["TechLoginView"]
    - path: "tech-pwa/src/app/login/page.tsx"
      provides: "Renders TechLoginView when mode === tech, unchanged dispatch section"
      contains: "TechLoginView"
  key_links:
    - from: "login/page.tsx"
      to: "TechLoginView"
      via: "mode === 'tech' conditional render"
      pattern: "mode.*tech.*TechLoginView"
    - from: "TechLoginView"
      to: "handleTechLogin"
      via: "onSubmit prop"
      pattern: "onSubmit"
---

<objective>
Replace the plain text-input badge/PIN form (clock.* hostname mode) with the Apple-style numeric keypad UI from reference image f7c87c3d. The existing form state and handleTechLogin function in login/page.tsx are UNCHANGED — only the rendered UI for tech mode changes. Google OAuth section untouched.

Purpose: Consumer-grade login experience for field techs. "Feels like unlocking an iPhone."
Output: TechLoginView component + login/page.tsx wired to use it for tech mode.
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
<!-- login/page.tsx current state (key existing pieces to KEEP) -->
State kept unchanged:
  badgeId: string, setBadgeId
  pin: string, setPin
  loading: boolean, setLoading
  error: string, setError

Function kept unchanged:
  handleTechLogin(e: React.FormEvent) — calls POST /api/field/auth/login, setSession(), router.push

detectMode() function — kept unchanged:
  returns 'dispatch' | 'tech' | 'both' based on hostname

Auth pattern — DO NOT CHANGE:
  setSession from '@/lib/auth' — this is the tech PWA auth (getSession pattern)
  signIn from 'next-auth/react' — dispatch auth (Google OAuth)
  NEVER swap these

<!-- TechLoginView props interface -->
Props: {
  badgeId: string;
  pin: string;
  loading: boolean;
  error: string;
  onBadgeChange: (val: string) => void;
  onPinChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

<!-- Design spec from CONTEXT.md + reference image f7c87c3d -->
Layout: dark navy full-screen (bg-[#0f172a] or var(--bg-primary)), flex-col items-center justify-center
APT shield logo: Image from aptmaintenanceinc.com/wp-content/uploads/... (existing src from login page)
Badge display: large bold number (text-5xl font-700 tabular-nums), monospace feel
  — shows badgeId as typed, placeholder: "_ _ _" in text-slate-600 when empty
PIN dots: 4 circles in a row (w-4 h-4 rounded-full)
  — filled: bg-amber-500 (digit entered)
  — empty: bg-slate-700 border border-slate-600
Numeric keypad:
  — 3×3 grid: keys 1-9, then bottom row: empty | 0 | backspace
  — Each key: w-16 h-16 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xl font-500
    transition-all duration-150 active:scale-[0.95]
  — Backspace key: uses Delete/backspace icon from lucide-react (Delete icon)
  — Key press: if pin.length < 4 append digit; if pin.length === 4 and key pressed = ignore (PIN full)
  — Badge entry mode vs PIN mode: badge is entered first (badgeId.length < expected), then PIN
    Simplification for Sprint 1: single input flow — all digits go to badgeId until 3 digits entered,
    then digits go to pin until 4 digits entered. Backspace: remove last pin digit first, then last badge digit.
Confirm button:
  — bg-amber-500 hover:bg-amber-400 text-black font-600 w-full max-w-xs py-3 rounded-xl
  — text "Confirm" (not "Sign In")
  — onClick calls onSubmit with a synthetic form event
  — disabled when loading or (badgeId.length === 0 && pin.length === 0)
  — loading state: "Verifying..." text
Error display: text-red-400 text-sm text-center when error is non-empty
  — Must preserve exact string "Invalid badge number or PIN." — auth.spec.ts 1.6 tests this

<!-- auth.spec.ts 1.6 (must keep passing) -->
Tests: text='Invalid badge number or PIN' visible after bad credentials
The error string 'Invalid badge number or PIN.' is set in login/page.tsx handleTechLogin catch block
— do not change this string

<!-- Phosphor icons available (installed in plan 01) -->
Can use Phosphor for decorative icons in TechLoginView if appropriate
Backspace: use Delete from lucide-react (already imported in login/page.tsx)
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Create TechLoginView component</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/login/page.tsx
    C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-CONTEXT.md
  </read_first>
  <action>
    Create tech-pwa/src/components/TechLoginView.tsx

    Props interface (explicit types, no implicit any):
    interface TechLoginViewProps {
      badgeId: string;
      pin: string;
      loading: boolean;
      error: string;
      onBadgeChange: (val: string) => void;
      onPinChange: (val: string) => void;
      onSubmit: (e: React.FormEvent) => void;
    }

    Internal keypad logic:
    - handleKeyPress(digit: string): if pin.length < 4 call onPinChange(pin + digit)
      but if badgeId.length < 3 first call onBadgeChange(badgeId + digit) instead
      (simplified: fill badgeId to 3 chars first, then fill pin to 4 chars)
    - handleBackspace(): if pin.length > 0 call onPinChange(pin.slice(0,-1))
      else if badgeId.length > 0 call onBadgeChange(badgeId.slice(0,-1))

    Layout structure:
    - Root: min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-8 p-6
    - APT logo: Next.js Image component, src from aptmaintenanceinc.com (copy exact src from existing login page), w-16 h-16
    - Badge display area: text-5xl font-700 tabular-nums text-white tracking-widest
      Show badgeId if non-empty, else "· · ·" in text-slate-600
    - PIN dots: flex gap-3, 4 dot circles
      filled when index < pin.length: bg-amber-500
      empty: bg-slate-700 border border-slate-600
    - Keypad: grid grid-cols-3 gap-3 w-full max-w-xs
      Keys 1-9 as array map, then bottom row: empty div, "0" button, backspace button
      Key className: w-16 h-16 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.95]
        text-white text-xl font-500 transition-all duration-150 flex items-center justify-center
    - Confirm button: bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-black font-semibold
        w-full max-w-xs py-3 rounded-xl transition-all duration-200
        disabled={loading || (badgeId.length === 0 && pin.length === 0)}
        onClick={(e) => onSubmit(e as unknown as React.FormEvent)}
        — Note: onClick cast is the ONLY permitted type coercion here; use onSubmit prop directly
    - Error: {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      — preserves "Invalid badge number or PIN." string for auth.spec.ts 1.6

    No hidden inputs. No text input fields. Pure keypad interaction.
    No `as any` anywhere (the one cast above uses `as unknown as React.FormEvent` — permitted).
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - TechLoginView.tsx exists at src/components/TechLoginView.tsx
    - Props interface defined with explicit types
    - No hidden text inputs in the component
    - Error prop renders its string value (preserves "Invalid badge number or PIN." display)
    - No `as any` in file
    - npx tsc --noEmit exits 0
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Wire TechLoginView into login/page.tsx</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/login/page.tsx
  </read_first>
  <action>
    Edit tech-pwa/src/app/login/page.tsx — minimal surgical changes only:

    1. Add import: import TechLoginView from '@/components/TechLoginView';

    2. In the return JSX, find the section that renders when mode === 'tech' OR the tech login form section.
       Replace ONLY the tech-mode badge/PIN form UI with:
         {mode === 'tech' && (
           <TechLoginView
             badgeId={badgeId}
             pin={pin}
             loading={loading}
             error={error}
             onBadgeChange={setBadgeId}
             onPinChange={setPin}
             onSubmit={handleTechLogin}
           />
         )}

    3. The Google OAuth section (mode === 'dispatch' conditional and its JSX) must be COMPLETELY UNCHANGED.
       The 'both' mode fallback: keep existing behavior — show both sections or keep existing both-mode layout.

    4. Keep ALL existing state declarations unchanged (badgeId, pin, showPin, loading, error, googleLoading, searchParams, mode).
    5. Keep handleTechLogin function completely unchanged.
    6. Keep handleGoogleSignIn completely unchanged.
    7. Keep detectMode completely unchanged.
    8. Keep all useEffect hooks unchanged.

    9. Add ONE new useEffect for dev-mode local testing ONLY:
       After the existing useEffect hooks, add:
         useEffect(() => {
           if (searchParams?.get('tech') === '1') setMode('tech');
         }, [searchParams]);
       This allows `?tech=1` to force tech mode on localhost without modifying detectMode.
       This is a read-only param check — no auth logic changes.

    DO NOT remove any existing imports that are still used (signIn, useRouter, Image, setSession, etc.)
    DO NOT add or remove any auth-related logic.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - login/page.tsx imports TechLoginView
    - login/page.tsx renders TechLoginView when mode === 'tech'
    - login/page.tsx has useEffect that sets mode to 'tech' when searchParams.get('tech') === '1'
    - handleTechLogin function body is unchanged
    - signIn (Google OAuth) import still present and used
    - setSession import still present and used
    - detectMode function unchanged
    - No `as any` added to login/page.tsx
    - npx tsc --noEmit exits 0
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 3 (N-2): tsc + push + git diff artifact</name>
  <read_first>Nothing to read — terminal task</read_first>
  <action>
    1. cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit — must exit 0.
    2. git add tech-pwa/src/components/TechLoginView.tsx tech-pwa/src/app/login/page.tsx
    3. git commit -m "feat(mobile): badge/PIN keypad login redesign (TechLoginView)"
    4. git push origin HEAD
    5. git diff main...HEAD > C:/PTOW/1_APT_Central_Command/artifacts/sr-01-04-diff.txt
    6. git add artifacts/sr-01-04-diff.txt && git commit -m "chore: sr-01-04 diff artifact" && git push origin HEAD
    Post diff path to Claude Code and stop. Wait for PASS.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit</automated>
  </verify>
  <acceptance_criteria>
    - npx tsc --noEmit exits 0
    - artifacts/sr-01-04-diff.txt is non-empty
    - Branch is feat/schedule-redesign
  </acceptance_criteria>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 4 (N-1): Test sprint — keypad visual + auth.spec.ts 1.6</name>
  <read_first>Nothing to read — browser verification task</read_first>
  <what-built>
    1. cd C:/PTOW/1_APT_Central_Command/tech-pwa && npm run dev
    2. Visit http://localhost:3000/login?tech=1 (forces tech mode locally)
    3. Verify: numeric keypad visible (1-9 grid + 0)
    4. Verify: tapping digits fills badge display then PIN dots (4 amber dots)
    5. Verify: Confirm button is amber, shows "Verifying..." on click
    6. Enter badge=1, PIN=9999 (wrong PIN) — verify "Invalid badge number or PIN." error appears
    7. Verify: Google OAuth section still visible on http://localhost:3000/login (dispatch mode)
    8. Run: cd tech-pwa && npx playwright test tests/e2e/auth.spec.ts -- must show 1.6 PASS
    9. Run: cd tech-pwa && npx playwright test — must show 0 failed
    10. Kill dev server
    11. Write artifacts/sr-01-04-test-results.txt with:
        - Keypad visible at /login?tech=1: ______
        - Badge digits filled on keypress: ______
        - PIN dots filled (4 amber): ______
        - "Invalid badge number or PIN." error on bad credentials: ______
        - auth.spec.ts 1.6 result: ______
        - Full Playwright summary line: ______
  </what-built>
  <how-to-verify>
    - auth.spec.ts 1.6 must PASS
    - Full suite: 0 failed
    - Keypad interaction functional end-to-end
  </how-to-verify>
  <resume-signal>Post artifacts/sr-01-04-test-results.txt to Claude Code and stop. Wait for clear-to-merge.</resume-signal>
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
| TechLoginView → /api/field/auth/login | Existing auth route; no changes to auth logic |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-sr04-01 | Elevation of Privilege | login/page.tsx auth hooks | mitigate | handleTechLogin and setSession unchanged; Google OAuth section unchanged; auth.spec.ts 1.6 regression test enforces this |
| T-sr04-02 | Spoofing | TechLoginView keypad input | accept | Input goes to same handleTechLogin POST — server validates badge+PIN hash same as before |
| T-sr04-SC | Tampering | npm installs | accept | No new packages in this plan |
</threat_model>

<verification>
- npx tsc --noEmit exits 0
- TechLoginView renders when mode === 'tech'
- Google OAuth section unchanged (dispatch mode unaffected)
- auth.spec.ts 1.6 PASS — "Invalid badge number or PIN." string preserved
- Playwright: 0 new failures vs baseline
</verification>

<success_criteria>
- Badge/PIN login shows Apple-style numeric keypad on clock.* hostname
- PIN dots fill amber as digits entered
- Confirm button triggers existing handleTechLogin
- Google OAuth dispatch login completely unchanged
- auth.spec.ts 1.6 passes
</success_criteria>

<output>
Create C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-04-SUMMARY.md when done
</output>
