# Testing Standards — APT Central Command
# Karpathy/Pocock grade. No aspirational claims — every line is enforced or marked TODO.
# Last updated: 2026-06-25

---

## Core Principle

**Tests must verify behavior through the real code path.**

A test that mocks the DAL and tests the FSM in isolation does not catch a 'Needs Review' status that breaks the FSM in prod. The test must go through the route → real DB → verify DB state.

This is the root cause of the 138 FSM-dead WOs and every "202 tests GREEN" false-confidence failure.

---

## Test Types Required

### 1. Integration Tests (MANDATORY for API routes)

Every `/api/` route that writes to DB must have at least one integration test that:
- Hits the real Next.js route handler (not the function directly)
- Uses a real Neon dev-branch DB connection (DATABASE_URL_TEST or dev branch)
- Verifies DB state after the call — not just the HTTP response
- Tests the unhappy path at the boundary (missing fields, invalid state, wrong auth)

```typescript
// CORRECT — tests through real route, real DB
it('PATCH /api/jobs/[id] with Needs Review source state returns 422', async () => {
  // seed a job with status='Needs Review'
  // PATCH with FSM transition
  // assert response is 422 INVALID_TRANSITION
  // assert DB status unchanged
});

// WRONG — tests mapping function, never touches DB
it('buildScheduledJobUpdate returns correct structure', () => {
  expect(buildScheduledJobUpdate({...}).scheduledTime).toBe('10:00');
  // This test is blind to job-update.ts:110 which coerces '10:00' to 'morning'
});
```

### 2. Unit Tests (for pure functions only)

Use unit tests ONLY for pure functions with no side effects:
- `normalizeAddressKey()`
- `detectLaphamForm()`
- `deriveStakeholder()`
- `compliance.*` rules
- `access-codes.*`

Do not unit-test functions that call DB, Next.js, or external APIs. Those need integration tests.

### 3. FSM Tests (MANDATORY for any FSM change)

The FSM has 8 arcs and 6 valid source states. For any FSM change:
- Test every valid arc (should succeed)
- Test every invalid arc from every state (should fail with INVALID_TRANSITION)
- Test legacy state rejection: 'Needs Review', 'PTE Required', 'Awaiting Approval' must all return INVALID_TRANSITION from FSM
- Use real DB — mock DAL hides exactly the bugs that cause prod incidents

```typescript
// Required: test that legacy states are rejected by FSM
it('FSM rejects Needs Review as source state', async () => {
  const service = createJobStateService(makeJobStateDAL(db));
  const jobId = toJobId('TEST-001');
  // seed job with status='Needs Review'
  const result = await service.transition(jobId, { type: 'ADVANCE' });
  expect(result.success).toBe(false);
  expect(result.error).toContain('INVALID_TRANSITION');
});
```

### 4. E2E Tests (MANDATORY for UI flows, runs on PR)

Every UI feature that writes to DB must have an E2E test that:
- Logs in (badge+PIN for tech, Google OAuth mock for staff)
- Performs the action in the browser
- Verifies DB state via a direct DB query (not just UI assertion)

E2E tests are NOT optional and NOT `workflow_dispatch`-only. They run on every PR.

---

## What Tests Are NOT Acceptable

| Pattern | Why it's banned |
|---------|----------------|
| `vi.mock('@/lib/dal/jobs')` in FSM tests | Hides real DB behavior — this is how 138 WOs got stuck |
| Tests that only assert on mock return values | Tautological — always pass |
| Tests that verify dead code is absent (`toContain('lock-and-send')`) | Zero behavioral value |
| `expect(component.text()).toBe(...)` for data that comes from API | Test the API, not the render |
| Tests that don't verify DB state after writes | The route can succeed but write nothing |

---

## Coverage Requirements

- Lines: 90% (declared in vitest.config.ts — MUST be enforced in CI)
- Functions: 90%
- Branches: 80%
- Coverage scope: all files in `src/domain/`, `src/lib/dal/`, `src/lib/services/`, `src/lib/side-effects/`, `src/lib/comms-utils.ts`

Coverage runs as `vitest run --coverage` — not just `vitest run`. Thresholds fail the build.

---

## CI Gates (what must block a PR merge)

| Gate | Tool | Status |
|------|------|--------|
| TypeScript zero errors | `tsc --noEmit` | ✓ ACTIVE |
| Lint zero errors | `eslint` | ✓ ACTIVE (no-explicit-any now error) |
| Unit + integration tests pass | `vitest run` | ✓ ACTIVE |
| Coverage thresholds met | `vitest run --coverage` | TODO — not yet in ci.yml |
| E2E tests pass | `playwright test` | TODO — currently workflow_dispatch only |
| Build succeeds | `next build` | ✓ ACTIVE |
| Security audit | `npm audit --critical` | ✓ ACTIVE |

**TODO items are blocking tech debt, not optional enhancements.**

---

## DB Isolation

Integration tests MUST use a separate DB branch from prod:
- Local: `DATABASE_URL_TEST` pointing to dev branch (`br-muddy-flower-ak85a9jc`)
- CI: use a Neon test branch, NOT the `DATABASE_URL` (prod) secret

The current CI config uses `DATABASE_URL` (prod/shared) for tests. This is a bug — test inserts mutate shared state. Fix: create `DATABASE_URL_TEST` secret pointing to a dedicated CI branch.

---

## Writing New Tests

For every PR that adds or changes a feature:
1. Write the failing test FIRST (RED)
2. Implement the change to make it pass (GREEN)
3. Refactor only if the test still passes (REFACTOR)

The test file must be in `src/**/__tests__/` next to the code it tests.
For E2E: `tests/e2e/[feature].spec.ts`.

No PR ships without tests covering the changed behavior. "It works in the browser" is not a test.
