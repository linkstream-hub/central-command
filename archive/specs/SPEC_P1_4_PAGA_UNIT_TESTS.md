# SPEC: P1-4 — PAGA Unit Tests (Vitest)
# Closes the highest CA legal exposure gap. Every pay period without verified math accrues liability.
# Owner: AG | Reviewer: Claude Code | Branch: feat/p1-4-paga-unit-tests

---

## CONTEXT

CA Labor Code §226.7 / IWC Wage Order 16 rules for the field tech workforce:

| Rule | Threshold | Violation | Premium |
|---|---|---|---|
| First meal break | Must be provided before end of 5th hour of WORK | Missed/short (<30 min) or late (started after 5h worked) | 1 hour at regular rate |
| Second meal break | Must be provided before end of 10th hour of WORK | Missed/short (<30 min total of 2nd break) | 1 hour at regular rate |
| Rest break | 10 min per 4 hours of work | Not tracked in current schema — out of scope for this sprint | — |

**"Hour of work"** = elapsed time minus unpaid break time. A 3-hour break in the middle of a shift does not count toward the 5-hour threshold.

### Two implementations exist — both must be tested

**`tech-pwa/src/lib/compliance.ts` — `evaluateCACompliance()`**
This is the Next.js TypeScript implementation. It will be the authoritative source after CC3.0 Phase 4.

Known bug: second meal check at line 54 uses `shift.breakMinutes && shift.breakMinutes < 60` — this is falsy when `breakMinutes` is 0 or undefined, so a 10+ hour shift with NO break does not trigger the violation. This must be fixed in this sprint.

**`TechPWA.gs` — `calculateMealPremiums()`**
Current production (GAS). Uses ELAPSED time (`clockOut - clockIn`) instead of HOURS WORKED for the >300 min threshold. This can produce false positives for shifts with long breaks. Out of scope to fix GAS in this sprint (CC3.0 Phase 4 will replace it), but document the divergence.

---

## TASKS

### Task 1 — Install Vitest

```
cd tech-pwa
npm install --save-dev vitest @vitest/coverage-v8
```

Add to `tech-pwa/package.json` scripts:
```json
"test:unit": "vitest run",
"test:unit:watch": "vitest",
"test:unit:coverage": "vitest run --coverage"
```

Add `vitest.config.ts` at `tech-pwa/vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/__tests__/**/*.test.ts'],
    coverage: {
      include: ['src/lib/compliance.ts'],
      thresholds: { lines: 100, functions: 100, branches: 90 },
    },
  },
});
```

Verify Vitest runs: `npm run test:unit` — expected: no test files found yet (0 tests), exit 0.

Document: `______` (exit code 0, 0 test files found)

### Task 2 — Fix the second meal break bug in `compliance.ts`

**File:** `tech-pwa/src/lib/compliance.ts`

**Current buggy code (line 54):**
```typescript
if (shift.breakMinutes && shift.breakMinutes < 60) {
```

**Bug:** When `breakMinutes` is 0 or undefined, the condition short-circuits to false — so a 10+ hour shift with NO break never triggers a violation.

**Fixed code:**
```typescript
const totalBreakMinutes = shift.breakMinutes ?? 0;
if (totalBreakMinutes < 60) {
```

This fires the violation when breaks are zero (missing entirely) OR less than 60 minutes total for a >10 hour shift.

The full corrected second meal block:
```typescript
// 2. Second Meal Break Rule (Before end of 10th hour)
if (hoursWorked >= 10) {
  const totalBreakMinutes = shift.breakMinutes ?? 0;
  if (totalBreakMinutes < 60) {
    violations.push('Missed or short second meal break (required before 10th hour of work).');
    requiresAttestation = true;
  }
}
```

Note: change `warnings.push` to `violations.push` — a second meal violation carries the same premium as a first.

### Task 3 — Write `tech-pwa/src/lib/__tests__/compliance.test.ts`

Create the file. Cover every scenario below exactly — these are the legal thresholds.

```typescript
import { describe, it, expect } from 'vitest';
import { evaluateCACompliance } from '../compliance';

// Helper: build a Date from hours offset from an arbitrary start
const T0 = new Date('2026-01-01T08:00:00Z');
const hoursAfter = (h: number) => new Date(T0.getTime() + h * 60 * 60 * 1000);
const minsAfter  = (m: number) => new Date(T0.getTime() + m * 60 * 1000);

describe('evaluateCACompliance — First Meal Break', () => {

  it('no violation: shift under 5 hours with no break', () => {
    const result = evaluateCACompliance({
      clockIn: T0,
      clockOut: hoursAfter(4.9),
    });
    expect(result.violations).toHaveLength(0);
    expect(result.requiresAttestation).toBe(false);
  });

  it('no violation: exactly 5h worked with 30-min break taken before hour 5', () => {
    // Clock in 8am, break 11am-11:30am, clock out 1:30pm = 5.5h elapsed, 5h worked
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(5.5),
      breakStart:   hoursAfter(3),   // 3 hours in — before 5h mark
      breakMinutes: 30,
    });
    expect(result.violations).toHaveLength(0);
  });

  it('violation: 5+ hours worked, no break taken', () => {
    const result = evaluateCACompliance({
      clockIn:  T0,
      clockOut: hoursAfter(6),
    });
    expect(result.violations).toContain('Missed or short first meal break (required before 5th hour).');
    expect(result.requiresAttestation).toBe(true);
  });

  it('violation: 5+ hours worked, break taken but only 20 minutes (too short)', () => {
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(6),
      breakStart:   hoursAfter(2),
      breakMinutes: 20,
    });
    expect(result.violations).toContain('Missed or short first meal break (required before 5th hour).');
  });

  it('violation: break was 30+ min but started after 5 hours of work', () => {
    // Clock in 8am, break starts at 1:30pm (5.5h after clock-in), clock out 3pm
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(7),
      breakStart:   hoursAfter(5.5),  // late — after 5h worked
      breakMinutes: 30,
    });
    expect(result.violations).toContain('Late first meal break (started after 5 hours of work).');
    expect(result.requiresAttestation).toBe(true);
  });

  it('warning only: approaching 5th hour, no break yet, shift in progress', () => {
    // Shift in progress at 4h45m, no break, no clockOut
    const result = evaluateCACompliance({
      clockIn: T0,
    }, minsAfter(285)); // 4h45m = 285 min
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.violations).toHaveLength(0);
    expect(result.requiresAttestation).toBe(false);
  });

});

describe('evaluateCACompliance — Second Meal Break', () => {

  it('no violation: 9.9 hours worked', () => {
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(10.5),
      breakMinutes: 36, // 36 min break → 9.9h worked
    });
    expect(result.violations.filter(v => v.includes('second'))).toHaveLength(0);
  });

  it('violation: 10+ hours worked with NO break at all', () => {
    // Bug regression: breakMinutes = 0 must still fire
    const result = evaluateCACompliance({
      clockIn:  T0,
      clockOut: hoursAfter(11),
    });
    expect(result.violations).toContain('Missed or short second meal break (required before 10th hour of work).');
    expect(result.requiresAttestation).toBe(true);
  });

  it('violation: 10+ hours worked with only 30 min total break (not enough for 2nd meal)', () => {
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(11),
      breakMinutes: 30, // first meal break only — second meal missed
    });
    expect(result.violations).toContain('Missed or short second meal break (required before 10th hour of work).');
  });

  it('no violation: 10+ hours worked with 60+ min total break', () => {
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(11),
      breakMinutes: 65,
    });
    expect(result.violations.filter(v => v.includes('second'))).toHaveLength(0);
  });

});

describe('evaluateCACompliance — hoursWorked calculation', () => {

  it('excludes break time from hours worked threshold', () => {
    // 6h elapsed, 2h break → 4h worked. No violation even though elapsed > 5h.
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(6),
      breakStart:   hoursAfter(2),
      breakMinutes: 120,
    });
    expect(result.violations).toHaveLength(0);
    expect(result.totalHoursWorked).toBeCloseTo(4, 1);
  });

  it('reports correct totalHoursWorked', () => {
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(8),
      breakMinutes: 30,
    });
    expect(result.totalHoursWorked).toBeCloseTo(7.5, 1);
  });

});

describe('evaluateCACompliance — requiresAttestation flag', () => {

  it('false for clean compliant shift', () => {
    const result = evaluateCACompliance({
      clockIn:      T0,
      clockOut:     hoursAfter(6),
      breakStart:   hoursAfter(3),
      breakMinutes: 30,
    });
    expect(result.requiresAttestation).toBe(false);
  });

  it('true whenever any violation exists', () => {
    const result = evaluateCACompliance({
      clockIn:  T0,
      clockOut: hoursAfter(6),
    });
    expect(result.requiresAttestation).toBe(true);
  });

});
```

### Task 4 — Run the unit tests

```
cd tech-pwa && npm run test:unit
```

All tests must pass. Document in `ag_test_results.txt`:

```
Task 4: PAGA unit tests
npm run test:unit output:
  Test files: ______
  Tests passed: ______  (expected: all)
  Tests failed: ______  (expected: 0)
  Summary line: ______  (e.g. "18 tests passed (312ms)")
```

### Task 5 — Run coverage

```
cd tech-pwa && npm run test:unit:coverage
```

compliance.ts must hit 100% line and function coverage, ≥90% branch.

Document in `ag_test_results.txt`:
```
Task 5: Coverage
compliance.ts line coverage: ______  (expected: 100%)
compliance.ts function coverage: ______  (expected: 100%)
compliance.ts branch coverage: ______  (expected: ≥90%)
```

### Task 6 — Document the GAS divergence

Add a comment block at the top of `tech-pwa/src/lib/compliance.ts` (after imports):

```typescript
// CA Labor Code §226.7 / IWC Wage Order 16 compliance engine.
// Authoritative implementation for CC3.0+.
//
// GAS DIVERGENCE (TechPWA.gs:calculateMealPremiums): GAS uses elapsed time
// (clockOut - clockIn) instead of hoursWorked for the >300min threshold.
// This is a known bug. It will be removed in CC3.0 Phase 4 when TechPWA.gs
// is replaced by Next.js routes using this module.
```

### Task 7 — tsc + diff

```
cd tech-pwa && npx tsc --noEmit
git diff main...HEAD > artifacts/ag_diff.txt
```

Post to Claude Code. Wait for PASS.

Expected: `______` (0 tsc errors)

### Task 8 (separate session) — Test sprint

```
cd tech-pwa && npm run test:unit
```

Paste the exact summary line into `ag_test_results.txt`: `______`

Also paste coverage output for `compliance.ts`: `______`

No browser verification needed — this is pure logic. Wait for clear-to-merge.

### Task 9 — Merge after "Clear to merge"

Not before.

---

## MERGE GATE

Claude Code checks:
- [ ] Bug fix confirmed: `evaluateCACompliance` with 11h shift, 0 break minutes returns second meal violation
- [ ] All 18+ tests pass, 0 fail
- [ ] compliance.ts coverage: 100% lines, 100% functions, ≥90% branches
- [ ] GAS divergence comment added
- [ ] tsc zero errors
- [ ] No other files modified beyond: compliance.ts, vitest.config.ts, package.json, package-lock.json, the test file
