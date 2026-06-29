# SPEC: P2B — Job Transition Unit Tests
# Closes P2-7. Extracts inline status logic from route.ts into a testable pure function.
# Owner: AG | Reviewer: Claude Code | Branch: feat/p2b-job-transition-tests

---

## CONTEXT

`tech-pwa/src/app/api/jobs/[jobId]/route.ts` contains two pieces of business logic that are currently untestable because they're embedded inside a Next.js route handler with database and email side effects:

**1. Auto-transition (lines 81–88):**
When `prevStatus === 'Ready to Schedule'` and the job ends up with tech + date + time all present (combining incoming updates with existing jobState), the status auto-promotes to `'Scheduled'`. This is a locked system decision that must never regress.

**2. Email trigger decision (lines 103–117):**
A status change to `'Scheduled'` (from non-Scheduled) sends a tenant confirmation email. A change to `'PTE Required'` (from non-PTE Required) sends a coordination email. Any other transition sends nothing.

Both rules are pure conditional logic — no database, no email call needed to test them. This sprint extracts them into `src/lib/job-transitions.ts` and writes Vitest unit tests.

---

## TASKS

### Task 1 — Create `tech-pwa/src/lib/job-transitions.ts`

Create the file with these two exported pure functions. Copy the logic verbatim from route.ts — do not change behavior.

```typescript
import type { JobStatus } from './types';

interface TransitionContext {
  prevStatus: JobStatus;
  updates: {
    status?: string;
    tech?: string | null;
    scheduledDate?: string | null;
    scheduledTime?: string | null;
  };
  jobState: {
    tech?: string | null;
    scheduledDate?: string | null;
    scheduledTime?: string | null;
  };
}

/**
 * Returns the status that should be written to the database after applying updates.
 * Handles the RtS → Scheduled auto-transition rule.
 */
export function resolveJobStatus(ctx: TransitionContext): JobStatus | undefined {
  const { prevStatus, updates, jobState } = ctx;

  // Explicit status in the request wins unless auto-transition overrides it
  if (prevStatus === 'Ready to Schedule' && updates.status !== 'Scheduled') {
    const effectiveTech = updates.tech ?? jobState.tech;
    const effectiveDate = updates.scheduledDate ?? jobState.scheduledDate;
    const effectiveTime = updates.scheduledTime ?? jobState.scheduledTime;
    if (effectiveTech && effectiveDate && effectiveTime) {
      return 'Scheduled';
    }
  }

  return updates.status as JobStatus | undefined;
}

export type EmailTrigger = 'scheduled' | 'pte-required' | 'none';

/**
 * Returns which tenant email, if any, should be sent for this status transition.
 * Called only in non-API-key (dispatcher) context.
 */
export function resolveEmailTrigger(newStatus: string, prevStatus: string | null | undefined): EmailTrigger {
  if (newStatus === 'Scheduled' && prevStatus !== 'Scheduled') return 'scheduled';
  if (newStatus === 'PTE Required' && prevStatus !== 'PTE Required') return 'pte-required';
  return 'none';
}
```

### Task 2 — Wire `job-transitions.ts` into `route.ts`

Replace the inline logic in `route.ts` with calls to the new functions. The behavior must not change — this is a pure refactor.

**Replace lines 81–88 (auto-transition block):**
```typescript
// Before:
if (prevStatus === 'Ready to Schedule' && updates.status !== 'Scheduled') {
  const effectiveTech = updates.tech ?? jobState.tech;
  const effectiveDate = updates.scheduledDate ?? jobState.scheduledDate;
  const effectiveTime = updates.scheduledTime ?? jobState.scheduledTime;
  if (effectiveTech && effectiveDate && effectiveTime) {
    updates.status = 'Scheduled';
  }
}

// After:
const resolvedStatus = resolveJobStatus({ prevStatus, updates, jobState });
if (resolvedStatus) updates.status = resolvedStatus;
```

**Replace lines 103–117 (email trigger block):**
```typescript
// Before:
if (body.status === 'Scheduled' && prevStatus !== 'Scheduled') {
  await sendTenantScheduledEmail(...);
} else if (body.status === 'PTE Required' && prevStatus !== 'PTE Required') {
  await sendPteCoordinationEmail(...);
}

// After:
const trigger = resolveEmailTrigger(body.status, prevStatus);
if (trigger === 'scheduled') {
  await sendTenantScheduledEmail(...);
} else if (trigger === 'pte-required') {
  await sendPteCoordinationEmail(...);
}
```

Add the import at the top of `route.ts`:
```typescript
import { resolveJobStatus, resolveEmailTrigger } from '@/lib/job-transitions';
```

After the refactor, run `npx tsc --noEmit` — zero errors required before proceeding.

### Task 3 — Write `tech-pwa/src/lib/__tests__/job-transitions.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { resolveJobStatus, resolveEmailTrigger } from '../job-transitions';

// ─── resolveJobStatus ───────────────────────────────────────────────────────

describe('resolveJobStatus — RtS auto-transition', () => {

  it('promotes RtS → Scheduled when tech + date + time all present in updates', () => {
    const result = resolveJobStatus({
      prevStatus: 'Ready to Schedule',
      updates: { tech: 'John D.', scheduledDate: '2026-06-01', scheduledTime: '9:00 AM' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).toBe('Scheduled');
  });

  it('promotes RtS → Scheduled when date/time come from jobState (not updates)', () => {
    const result = resolveJobStatus({
      prevStatus: 'Ready to Schedule',
      updates: { tech: 'John D.' },
      jobState: { tech: null, scheduledDate: '2026-06-01', scheduledTime: '9:00 AM' },
    });
    expect(result).toBe('Scheduled');
  });

  it('does NOT auto-transition when tech is missing', () => {
    const result = resolveJobStatus({
      prevStatus: 'Ready to Schedule',
      updates: { scheduledDate: '2026-06-01', scheduledTime: '9:00 AM' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).not.toBe('Scheduled');
  });

  it('does NOT auto-transition when date is missing', () => {
    const result = resolveJobStatus({
      prevStatus: 'Ready to Schedule',
      updates: { tech: 'John D.', scheduledTime: '9:00 AM' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).not.toBe('Scheduled');
  });

  it('does NOT auto-transition when time is missing', () => {
    const result = resolveJobStatus({
      prevStatus: 'Ready to Schedule',
      updates: { tech: 'John D.', scheduledDate: '2026-06-01' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).not.toBe('Scheduled');
  });

  it('does NOT auto-transition when status is explicitly set to Scheduled (caller already set it)', () => {
    const result = resolveJobStatus({
      prevStatus: 'Ready to Schedule',
      updates: { status: 'Scheduled', tech: 'John D.', scheduledDate: '2026-06-01', scheduledTime: '9:00 AM' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    // Explicit status passes through — auto-transition condition is skipped
    expect(result).toBe('Scheduled');
  });

  it('does NOT auto-transition from a non-RtS status (e.g. Needs Review)', () => {
    const result = resolveJobStatus({
      prevStatus: 'Needs Review',
      updates: { tech: 'John D.', scheduledDate: '2026-06-01', scheduledTime: '9:00 AM' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).not.toBe('Scheduled');
  });

  it('returns the explicit status when no auto-transition applies', () => {
    const result = resolveJobStatus({
      prevStatus: 'Needs Review',
      updates: { status: 'PTE Required' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).toBe('PTE Required');
  });

  it('returns undefined when no status in updates and no auto-transition', () => {
    const result = resolveJobStatus({
      prevStatus: 'Needs Review',
      updates: { tech: 'John D.' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).toBeUndefined();
  });

});

// ─── resolveEmailTrigger ────────────────────────────────────────────────────

describe('resolveEmailTrigger — tenant email decisions', () => {

  it('returns "scheduled" when transitioning to Scheduled from a different status', () => {
    expect(resolveEmailTrigger('Scheduled', 'Ready to Schedule')).toBe('scheduled');
    expect(resolveEmailTrigger('Scheduled', 'Needs Review')).toBe('scheduled');
    expect(resolveEmailTrigger('Scheduled', null)).toBe('scheduled');
  });

  it('returns "none" when already Scheduled (no duplicate email)', () => {
    expect(resolveEmailTrigger('Scheduled', 'Scheduled')).toBe('none');
  });

  it('returns "pte-required" when transitioning to PTE Required from a different status', () => {
    expect(resolveEmailTrigger('PTE Required', 'Needs Review')).toBe('pte-required');
    expect(resolveEmailTrigger('PTE Required', 'Ready to Schedule')).toBe('pte-required');
  });

  it('returns "none" when already PTE Required (no duplicate email)', () => {
    expect(resolveEmailTrigger('PTE Required', 'PTE Required')).toBe('none');
  });

  it('returns "none" for all other status transitions', () => {
    expect(resolveEmailTrigger('Needs Review', 'Scheduled')).toBe('none');
    expect(resolveEmailTrigger('In Progress', 'Scheduled')).toBe('none');
    expect(resolveEmailTrigger('Complete', 'In Progress')).toBe('none');
    expect(resolveEmailTrigger('Archived', 'Complete')).toBe('none');
  });

});
```

### Task 4 — Run the unit tests

```powershell
cd tech-pwa && npm run test:unit
```

All tests must pass. Document in `artifacts/ag_test_results.txt`:

```
Task 4: P2B job transition unit tests
Test files: ______  (expected: 2 — compliance.test.ts + job-transitions.test.ts)
Tests passed: ______  (expected: all — 14 compliance + new transition tests)
Tests failed: ______  (expected: 0)
Summary line: ______  (paste exact output, e.g. "Test Files 2 passed (2) | Tests 26 passed (26) | Duration 1.4s")
```

### Task 5 — Run coverage

```powershell
cd tech-pwa && npm run test:unit:coverage
```

`job-transitions.ts` must hit 100% line and function coverage. Branch coverage ≥ 90%.

Update `vitest.config.ts` coverage include to add `job-transitions.ts`:
```typescript
coverage: {
  include: ['src/lib/compliance.ts', 'src/lib/job-transitions.ts'],
  thresholds: { lines: 100, functions: 100, branches: 90 },
},
```

Document in `artifacts/ag_test_results.txt`:
```
Task 5: Coverage
job-transitions.ts line coverage: ______  (expected: 100%)
job-transitions.ts function coverage: ______  (expected: 100%)
job-transitions.ts branch coverage: ______  (expected: ≥90%)
```

### Task 6 — Update `PROFESSIONAL_BASELINE.md`

In `docs/PROFESSIONAL_BASELINE.md`, update the Dimension 3 gaps table:

```markdown
| No unit tests for dedup, filter, and address logic | ~~**P2**~~ ✅ DONE | `resolveJobStatus` + `resolveEmailTrigger` extracted from route.ts and tested. GAS functions (isDuplicateJob, shouldSkipEmail) deferred — no viable GAS test framework today. |
| No unit tests for status transitions | ~~**P2**~~ ✅ DONE | 16+ tests in `job-transitions.test.ts` covering auto-transition and email trigger rules. |
```

In the consolidated P2 roadmap table:
```markdown
| ~~P2-7~~ | ~~Unit tests for dedup, filter, status logic~~ | ~~AG~~ | ✅ DONE — job-transitions.ts extracted + tested |
```

### Task 7 — tsc + diff

```powershell
cd tech-pwa && npx tsc --noEmit
git diff main...HEAD > artifacts/ag_diff.txt
```

Post `ag_diff.txt` to Claude Code. Wait for PASS.

Expected: `______` (0 tsc errors)

Files that must appear in the diff — nothing else:
- `tech-pwa/src/lib/job-transitions.ts` (new)
- `tech-pwa/src/lib/__tests__/job-transitions.test.ts` (new)
- `tech-pwa/src/app/api/jobs/[jobId]/route.ts` (refactor only — behavior unchanged)
- `tech-pwa/vitest.config.ts` (coverage include update)
- `artifacts/ag_test_results.txt` (appended)
- `docs/PROFESSIONAL_BASELINE.md` (P2-7 closed)

If any other file appears in the diff: stop, flag to Claude Code before proceeding.

### Task 8 (separate session) — Test sprint

```powershell
cd tech-pwa && npm run test:unit
```

Paste the exact summary line into `artifacts/ag_test_results.txt`: `______`

Also paste the coverage table for `job-transitions.ts`: `______`

Wait for Claude Code clear-to-merge.

### Task 9 — Merge after "Clear to merge"

Not before.

---

## MERGE GATE

Claude Code checks:
- [ ] `job-transitions.ts` exports `resolveJobStatus` and `resolveEmailTrigger` as pure functions
- [ ] `route.ts` imports and uses them — inline logic removed
- [ ] `route.ts` behavior is identical to pre-refactor (no logic changes, only extraction)
- [ ] All new tests pass, 0 fail
- [ ] `job-transitions.ts` coverage: 100% lines, 100% functions, ≥90% branches
- [ ] `vitest.config.ts` includes `job-transitions.ts` in coverage
- [ ] PROFESSIONAL_BASELINE.md P2-7 closed
- [ ] tsc zero errors
- [ ] Diff contains only the six files listed above
