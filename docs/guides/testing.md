<!-- generated-by: gsd-doc-writer -->
# Testing Guide

APT Central Command uses two test tiers: Vitest for unit tests of pure library code, and Playwright for E2E tests of user-facing flows. TypeScript compilation (`npx tsc --noEmit`) runs as a separate gate in CI.

---

## Test Framework and Setup

| Layer | Tool | Version |
|-------|------|---------|
| Unit tests | Vitest | ^4.1.6 |
| Coverage | @vitest/coverage-v8 | ^4.1.6 |
| E2E | Playwright | ^1.60.0 |
| Accessibility (E2E) | @axe-core/playwright | ^4.9.0 |
| Type checking | TypeScript / tsc | ^5 |

**Prerequisites before running any tests:**

```bash
cd tech-pwa
npm install
```

E2E tests also require Playwright browsers:

```bash
npx playwright install chromium webkit --with-deps
```

E2E tests require a `.env.local` file with `DATABASE_URL` set to a Neon dev branch. The global setup applies schema migrations idempotently on first run.

---

## Running Tests

### Unit tests

```bash
# Run once (CI mode)
npm run test:unit

# Watch mode (development)
npm run test:unit:watch

# With coverage report
npm run test:unit:coverage
```

Unit test files live in `src/**/__tests__/**/*.test.ts`. Vitest runs in `node` environment.

### E2E tests

```bash
# Run full E2E suite (starts dev server on port 3010 automatically)
npx playwright test

# Run a specific spec file
npx playwright test tests/e2e/auth.spec.ts

# Run with Playwright UI (trace viewer, step-through)
npx playwright test --ui

# Run headed (visible browser)
npx playwright test --headed
```

The Playwright config (`playwright.config.ts`) starts `npm run dev -- -p 3010` automatically and reuses a pre-running server on port 3010 if one exists. In CI, a fresh server is always started.

Specs skipped in CI (`cc-full.spec.ts`, `go-live.spec.ts`) can be run locally without restriction.

### Type checking

```bash
cd tech-pwa
npx tsc --noEmit
```

This must pass with zero errors before any merge. It is a hard gate in the CI workflow `ci.yml`.

---

## Test Credentials

### Tech portal (badge + PIN login)

| Field | Value |
|-------|-------|
| Badge | `1` |
| PIN | `1234` |

These credentials are seeded by the global Playwright setup (`tests/globalSetup.ts`) and cleared/re-seeded on each run. The Upstash rate-limit key for badge `1` is also reset before seeding so repeated local runs do not hit the 5-attempt limit.

### Staff portal (office admin login)

E2E tests use `DEV_BYPASS_AUTH=true` + a "Dev Login" button that grants an admin session without Google OAuth. This bypass is active in the Playwright webServer env config and in CI — it is never active in production.

The auth helper functions are in `tests/fixtures/auth.ts`:

```typescript
// Logs in as office admin and lands on /live
await loginAsAdmin(page);

// Logs in as tech with badge=1, PIN=1234 and lands on /jobs
await loginAsTech(page);

// Custom credentials
await loginAsTech(page, '99', '5678');
```

> Auth is split by page zone. Never mix the two hooks — see `src/lib/CLAUDE.md` for the rule.

---

## Writing New Tests

### Unit test naming and location

- Files: `src/lib/__tests__/<module-name>.test.ts`
- Import Vitest helpers: `import { describe, it, expect } from 'vitest'`
- Follow AAA (Arrange, Act, Assert) structure

Current unit test files:

| File | Covers |
|------|--------|
| `access-codes.test.ts` | `src/lib/access-codes.ts` |
| `compliance.test.ts` | `src/lib/compliance.ts` |
| `detectLaphamForm.test.ts` | `src/lib/detectLaphamForm.ts` |
| `email-intake.test.ts` | email intake logic |
| `job-transitions.test.ts` | `src/lib/job-transitions.ts` |
| `normalizeAddressKey.test.ts` | `src/lib/normalizeAddressKey.ts` |
| `wc-codes.test.ts` | workers comp code logic |

### E2E test naming and location

- Files: `tests/e2e/<flow-name>.spec.ts`
- Use Playwright `test` and `expect` from `@playwright/test`
- Use the auth fixture helpers from `tests/fixtures/auth.ts` rather than re-implementing login steps
- Group related tests inside `test.describe` blocks with numbered assertions (e.g., `1.1`, `1.2`)

Current E2E spec files:

| Spec | Covers |
|------|--------|
| `auth.spec.ts` | Login flows, auth redirects, badge+PIN |
| `dispatch.spec.ts` | Dispatcher work order flows |
| `scheduling.spec.ts` | Job scheduling |
| `parser.spec.ts` | Email/form parsing |
| `tech-pwa.spec.ts` | Tech portal flows |
| `tenant-loop.spec.ts` | Tenant contact flows |
| `accessibility.spec.ts` | Axe-core accessibility scans |
| `fsm-constraints.spec.ts` | Job state machine rules |
| `phase2-verification.spec.ts` | Phase verification suite |
| `cc-full.spec.ts` | Full regression (local only) |
| `go-live.spec.ts` | Go-live checklist (local only) |

---

## Coverage Requirements

Coverage is enforced only on the five critical library modules listed in `vitest.config.ts`:

| Module | Lines | Functions | Branches |
|--------|-------|-----------|----------|
| `src/lib/compliance.ts` | 100% | 100% | 90% |
| `src/lib/job-transitions.ts` | 100% | 100% | 90% |
| `src/lib/normalizeAddressKey.ts` | 100% | 100% | 90% |
| `src/lib/detectLaphamForm.ts` | 100% | 100% | 90% |
| `src/lib/access-codes.ts` | 100% | 100% | 90% |

No coverage threshold is configured for E2E specs. All other library code targets 80% as a team standard (see `RULES.md`).

---

## CI Integration

### `ci.yml` — TypeScript + Lint + Build

- **Trigger:** Pull request to `main` touching `tech-pwa/**`
- **Type check step:** `npx tsc --noEmit` — must pass with zero errors
- **Lint step:** `npm run lint`
- **Build step:** `npm run build`

This workflow does not run Vitest or Playwright. It is a fast gate (type safety + build integrity).

### `e2e.yml` — Playwright E2E

- **Trigger:** Pull request to `main` touching `tech-pwa/**`, or manual dispatch
- **Browsers:** Chromium, WebKit
- **Command:** `npx playwright test`
- **Artifacts:** Test results uploaded to `playwright-results` (retained 14 days)
- **Skipped specs in CI:** `cc-full.spec.ts`, `go-live.spec.ts`

### `e2e-nightly.yml` — Weekly Regression

- **Trigger:** Every Monday at 6:00 AM UTC, or manual dispatch
- **Same config as `e2e.yml`** but uploads to `playwright-nightly-results` (retained 7 days)

---

## Sprint Test Protocol

Per the sprint protocol defined in `CLAUDE.md`, every sprint ends with these test tasks before merge is allowed:

1. **AG runs:** `npx tsc --noEmit` — zero errors required
2. **AG runs:** `git push` then `git diff main...HEAD > artifacts/ag_diff.txt`
3. **AG posts diff to Claude Code — stops and waits for PASS**
4. **AG runs test sprint** — records specific observed evidence per item in `artifacts/ag_test_results.txt`
5. **AG kills dev server, posts results to Claude Code — stops and waits for clear**
6. **Merge only after explicit "Clear to merge" from Claude Code**

Merging without Claude Code clearance is not permitted regardless of test results.

---

## Test Reports

After a Playwright run, reports are written to:

```
tech-pwa/test-results/
  runs/          # per-test artifacts (traces, screenshots, videos on failure)
  results.json   # machine-readable JSON
  html/          # browseable HTML report (open index.html)
```

Open the HTML report locally:

```bash
npx playwright show-report tech-pwa/test-results/html
```

Traces and videos are captured only on first retry (`trace: 'on-first-retry'`, `video: 'on-first-retry'`). Screenshots are captured on failure (`screenshot: 'only-on-failure'`).
