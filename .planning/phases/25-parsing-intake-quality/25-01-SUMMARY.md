---
phase: 25-parsing-intake-quality
plan: "01"
subsystem: parsing
tags: [lapham, address-normalization, email-parsing, unit-tests, vitest, typescript]

requires:
  - phase: 12-neon-cutover
    provides: Neon properties table with addressKey column (dedup key storage)

provides:
  - normalizeAddressKey.ts — deterministic address dedup key function (verbatim GAS port)
  - detectLaphamForm.ts — Lapham webform parser with LaphamParseResult interface (verbatim GAS port)
  - Three intake fixture files (same-line, Apple-Mail-forwarded, turnover) for use by Plans 25-02 and 25-03
  - Test suites: 13 + 33 = 46 unit tests proving GAS behavioral parity

affects: [25-02, 25-03, any consumer of addressKey or LaphamParseResult]

tech-stack:
  added: []
  patterns:
    - Verbatim GAS port: port algorithm step-for-step, prove parity via unit tests
    - Two-regex field() helper: same-line AND two-line regex for every field (Apple Mail forwarded forms)
    - Pure transform utility: no framework imports, no try/catch, null/empty via String() coercion

key-files:
  created:
    - tech-pwa/src/lib/normalizeAddressKey.ts
    - tech-pwa/src/lib/detectLaphamForm.ts
    - tech-pwa/src/lib/__tests__/normalizeAddressKey.test.ts
    - tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts
    - tech-pwa/src/lib/__tests__/fixtures/intake/lapham-sameline.txt
    - tech-pwa/src/lib/__tests__/fixtures/intake/lapham-forwarded.txt
    - tech-pwa/src/lib/__tests__/fixtures/intake/lapham-turnover.txt
  modified:
    - tech-pwa/vitest.config.ts (coverage.include extended)

key-decisions:
  - "Verbatim port over rewrite: GAS detectLaphamForm contains >1yr of production bug fixes for Apple Mail forwarded format — porting verbatim is the only safe path"
  - "Two-regex field() helper: BOTH same-line and two-line regex per field — dropping either would cause INTAKE-05 regression on forwarded forms (Pitfall 3)"
  - "Fixtures use synthetic data only: 555 NANP test numbers + example.com domains — no real tenant PII committed to git (T-25-02 mitigated)"
  - "Test expectation fixed: 'College Ave' normalizes to 'college ave' not 'college avenue' — Ave is an abbreviation token, not the full word; test was wrong"

patterns-established:
  - "Pure utility module pattern: no framework imports, exported function + interface only, JSDoc on exported function — mirrors wc-codes.ts"
  - "Two-regex field extraction: for any structured email parser, always handle same-line AND two-line format to support Apple Mail/Gmail forwarded rendering"
  - "Intake fixtures location: tech-pwa/src/lib/__tests__/fixtures/intake/ — Plans 25-02 and 25-03 should add fixtures here"

requirements-completed: [INTAKE-01, INTAKE-02, INTAKE-03, INTAKE-05]

duration: 35min
completed: 2026-06-10
---

# Phase 25 Plan 01: Port normalizeAddressKey + detectLaphamForm Summary

**Verbatim TypeScript ports of two production-tested GAS parsing primitives with 46 unit tests proving behavioral parity across same-line, Apple-Mail-forwarded, turnover, and edge-case inputs**

## Performance

- **Duration:** ~35 min
- **Started:** 2026-06-10T15:18:00Z
- **Completed:** 2026-06-10T15:22:00Z
- **Tasks:** 2 of 3 complete (Task 3 is checkpoint:human-action — awaiting Claude Code review)
- **Files created:** 7 | **Files modified:** 1

## Accomplishments

- `normalizeAddressKey.ts`: 7-step algorithm ported verbatim (##→#, embedded unit extraction, comma-split, street-type normalization, lowercase/strip/collapse); 13 unit tests
- `detectLaphamForm.ts`: full GAS function ported including `field()` two-regex helper, `fieldFromBody()` for forwarded section, PTE mapping, emailType scan, senderLookupNeeded; 33 unit tests
- 3 intake fixtures created with synthetic data (no PII): same-line, Apple-Mail-forwarded, turnover
- Full unit suite: 79 tests, 5 files, zero regressions to compliance/job-transitions/wc-codes
- `vitest.config.ts` coverage.include updated with both new modules
- `npx tsc --noEmit` zero errors

## Task Commits

1. **Task 1: Port normalizeAddressKey** - `5d74f18` (feat) — TDD RED→GREEN→pass
2. **Task 2: Port detectLaphamForm with fixtures** - `0a35e15` (feat) — TDD RED→GREEN→pass
3. **Task 3: Terminal gate** - awaiting commit (gate: diff artifact + Claude Code PASS)

## Files Created/Modified

- `tech-pwa/src/lib/normalizeAddressKey.ts` — Deterministic address dedup key; `export function normalizeAddressKey(address: string, unit?: string): string`
- `tech-pwa/src/lib/detectLaphamForm.ts` — Lapham webform parser; `export function detectLaphamForm(...)` + `export interface LaphamParseResult`
- `tech-pwa/src/lib/__tests__/normalizeAddressKey.test.ts` — 13 unit tests (all 7 algorithm steps + edge cases)
- `tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts` — 33 unit tests (detection, same-line, forwarded, emailType, PTE, tenant exempt)
- `tech-pwa/src/lib/__tests__/fixtures/intake/lapham-sameline.txt` — Synthetic same-line Lapham webform body
- `tech-pwa/src/lib/__tests__/fixtures/intake/lapham-forwarded.txt` — Synthetic Apple-Mail-forwarded form body (two-line format, `>` prefixes)
- `tech-pwa/src/lib/__tests__/fixtures/intake/lapham-turnover.txt` — Synthetic turnover-type form (no active tenant)
- `tech-pwa/vitest.config.ts` — Added `normalizeAddressKey.ts` + `detectLaphamForm.ts` to coverage.include

## Decisions Made

**Verbatim port over rewrite:** GAS `detectLaphamForm` has >1yr of production bug fixes (Apple Mail rendering, embedded units, PTE phrase matching). Rewriting risks INTAKE-05 regression. Tests prove parity.

**Two-regex field() helper:** Every field uses both same-line (`Field: Value`) and two-line (`Field\nValue`) regex. Dropping either causes silent blank fields for forwarded forms (Pitfall 3 in RESEARCH.md).

**Test expectation correction:** The initial test asserted `'college avenue'` for input `'3126 College Ave, ...'`. The GAS source lowercases `Ave` to `ave` (abbreviation token, not expanded). Test fixed to `'college ave'` — this is correct GAS parity.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Test expectation for 'College Ave' normalisation was wrong**
- **Found during:** Task 1 (normalizeAddressKey GREEN phase)
- **Issue:** Test asserted `'3126 college avenue||'` but GAS source normalizes `Ave` → `ave` (lowercases token as-is, does not expand abbreviations). Result was `'3126 college ave||'`.
- **Fix:** Corrected test expectation to `'3126 college ave||'` with clarifying comment explaining GAS behavior
- **Files modified:** `tech-pwa/src/lib/__tests__/normalizeAddressKey.test.ts`
- **Committed in:** `5d74f18` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - test expectation bug)
**Impact on plan:** Test was testing the wrong value; correction improves accuracy. No scope creep.

## Issues Encountered

None beyond the test expectation correction documented above.

## User Setup Required

None for this plan — pure TypeScript utility ports with no external service dependencies.

## TDD Gate Compliance

| Gate | Commit | Status |
|------|--------|--------|
| Task 1 RED | tests written before implementation; `Cannot find module` error confirmed | PASS |
| Task 1 GREEN | `5d74f18` — 13 tests passing | PASS |
| Task 2 RED | tests written before implementation; `Cannot find module` error confirmed | PASS |
| Task 2 GREEN | `0a35e15` — 33 tests passing | PASS |

## Known Stubs

None — both functions are fully wired to real parsing logic. No placeholder data or TODO items in implementation.

## Threat Flags

None — no new network endpoints, auth paths, or trust boundaries introduced. Fixtures contain only synthetic data (T-25-02 mitigated).

## Task 3 Gate Status

**PENDING — Claude Code review required before Wave 2 begins.**

- `npx tsc --noEmit` → zero errors (observed: no output, exit code 0)
- `artifacts/phase25_01_diff.txt` produced (692 lines)
- Full unit suite: `79 passed` across 5 test files
- Branch: `feat/phase-25-parsing-intake`

Resume signal: Claude Code replies PASS / clear for this plan's diff.

## Next Phase Readiness

- `normalizeAddressKey` and `detectLaphamForm` ready to import by Plan 25-02 (access-sync route) and Plan 25-03 (n8n Code nodes)
- `LaphamParseResult` interface is the contract Plan 25-03 n8n nodes must reproduce
- Fixtures available for integration tests in Plan 25-02

**Blockers for Wave 2:**
- Claude Code diff review PASS required (Task 3 gate)

---
*Phase: 25-parsing-intake-quality*
*Completed: 2026-06-10*
