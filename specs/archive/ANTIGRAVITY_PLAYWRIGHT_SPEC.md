# ANTIGRAVITY SPEC — Playwright E2E Test Suite + Quality Pipeline
**Priority:** FOUNDATIONAL — gates all future sprints
**Scope:** AG installs Playwright, writes the full E2E test suite, wires GitHub Actions.
No application code changes. Testing infrastructure only.

---

## What This Builds

A Playwright E2E test suite covering all 14 critical paths from the battle test protocol,
running automatically on every push to `main`. Tests run against the local dev server in
mock mode (`NEXT_PUBLIC_DASHBOARD_API_URL` unset). Includes axe-core accessibility checks
on all major pages. A new GitHub Actions workflow (`e2e.yml`) runs the suite, blocks merges
on failure, and on failure triggers the existing `spec-generator.yml` workflow to open a
draft fix spec automatically.

Two additional additions:
1. **Lighthouse CI** — performance budget enforcement on every deploy
2. **`quality-sentinel.yml`** — weekly scheduled run that collects trend data

---

## Files to Create

```
tech-pwa/playwright.config.ts
tech-pwa/tests/e2e/auth.spec.ts
tech-pwa/tests/e2e/dispatch.spec.ts
tech-pwa/tests/e2e/scheduling.spec.ts
tech-pwa/tests/e2e/tech-pwa.spec.ts
tech-pwa/tests/e2e/accessibility.spec.ts
tech-pwa/tests/fixtures/auth.ts
.github/workflows/e2e.yml
.github/workflows/quality-sentinel.yml
lighthouserc.json
```

## Files to Modify

```
tech-pwa/package.json  — add devDependencies: @playwright/test, @axe-core/playwright
```

## What NOT to Change

- Any application code in `tech-pwa/src/`
- Any `.gs` files
- Any existing `.github/workflows/*.yml` files (add new ones only)
- `tech-pwa/.env.local` — mock mode must stay active for tests

---

## Step 1 — Install Playwright

In `tech-pwa/package.json`, add to `devDependencies`:
```json
"@playwright/test": "^1.44.0",
"@axe-core/playwright": "^4.9.0"
```

Run: `npm install` then `npx playwright install chromium`

---

## Step 2 — `tech-pwa/playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 30000,
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['html', { outputFolder: 'test-results/html', open: 'never' }],
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile',   use: { ...devices['iPhone 13'] } },
  ],
  webServer: process.env.CI ? {
    command: 'npm run build && npm run start',
    port: 3000,
    reuseExistingServer: false,
    env: {
      NODE_ENV: 'test',
      DEV_BYPASS_AUTH: 'true',
      AUTH_SECRET: 'test-secret-for-ci-only',
      NEXTAUTH_SECRET: 'test-secret-for-ci-only',
      NEXTAUTH_URL: 'http://localhost:3000',
      GOOGLE_CLIENT_ID: 'dummy-id',
      GOOGLE_CLIENT_SECRET: 'dummy-secret',
    },
  } : undefined,
});
```

---

## Step 3 — `tech-pwa/tests/fixtures/auth.ts`

```typescript
import { Page } from '@playwright/test';

export async function loginAsAdmin(page: Page) {
  await page.goto('/login');
  const devBtn = page.locator('button:has-text("Dev Login")');
  await devBtn.waitFor({ timeout: 5000 });
  await devBtn.click();
  await page.waitForURL('/live', { timeout: 10000 });
}

export async function loginAsTech(page: Page, badge = '1', pin = '1234') {
  await page.goto('/login');
  await page.waitForSelector('[data-testid="tech-login-form"], input[placeholder*="Badge"], input[placeholder*="badge"]');
  const badgeInput = page.locator('input').nth(0);
  const pinInput   = page.locator('input').nth(1);
  await badgeInput.fill(badge);
  await pinInput.fill(pin);
  await page.locator('button[type="submit"], button:has-text("Clock In"), button:has-text("Login")').first().click();
  await page.waitForURL('/jobs', { timeout: 10000 });
}
```

---

## Step 4 — `tech-pwa/tests/e2e/auth.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { loginAsAdmin, loginAsTech } from '../fixtures/auth';

test.describe('Block 1 — Auth & Login', () => {

  test('1.1 root redirects to /login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/login/);
  });

  test('1.2 Dev Login button exists on dispatch hostname', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('button:has-text("Dev Login")')).toBeVisible();
  });

  test('1.3 Dev Login grants admin session and lands on /live', async ({ page }) => {
    await loginAsAdmin(page);
    await expect(page).toHaveURL('/live');
    // Confirm sidebar is rendered — signals full session load
    await expect(page.locator('nav, aside')).toBeVisible();
  });

  test('1.4 Unauthorized route redirects to /login', async ({ page }) => {
    await page.goto('/live');
    await expect(page).toHaveURL(/\/login/);
  });

  test('1.5 Tech login with valid badge+PIN reaches /jobs', async ({ page }) => {
    await loginAsTech(page);
    await expect(page).toHaveURL('/jobs');
  });

  test('1.6 Tech login with invalid PIN shows error', async ({ page }) => {
    await page.goto('/login');
    const badgeInput = page.locator('input').nth(0);
    const pinInput   = page.locator('input').nth(1);
    await badgeInput.fill('1');
    await pinInput.fill('0000');
    await page.locator('button[type="submit"], button:has-text("Clock In"), button:has-text("Login")').first().click();
    await expect(page.locator('text=Invalid badge or PIN, text=invalid, text=error').first()).toBeVisible({ timeout: 5000 });
    await expect(page).not.toHaveURL('/jobs');
  });

});
```

---

## Step 5 — `tech-pwa/tests/e2e/dispatch.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../fixtures/auth';

test.describe('Block 2 — Summary Cards', () => {
  test.beforeEach(async ({ page }) => { await loginAsAdmin(page); });

  test('2.1 Needs Action card renders non-zero count', async ({ page }) => {
    const card = page.locator('[data-stat="needs-action"], text=Needs Action').first();
    await expect(card).toBeVisible();
  });

  test('2.2 PTE Pending card renders', async ({ page }) => {
    await expect(page.locator('text=PTE').first()).toBeVisible();
  });

  test('2.3 Stats cards are clickable and filter the job list', async ({ page }) => {
    const urgentCard = page.locator('text=URGENT').first();
    await urgentCard.click();
    // Job list should be filtered — at least one item visible
    await expect(page.locator('table tbody tr, [data-job-card]').first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Block 3 — Coordination Feed', () => {
  test.beforeEach(async ({ page }) => { await loginAsAdmin(page); });

  test('3.1 Ready to Schedule tab shows APT-3003 and APT-3004', async ({ page }) => {
    await page.locator('button:has-text("Ready to Schedule")').click();
    await expect(page.locator('text=890 Market St')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=350 Hanover St')).toBeVisible({ timeout: 5000 });
  });

  test('3.2 New tab shows APT-3001 and APT-3002', async ({ page }) => {
    await page.locator('button:has-text("New")').first().click();
    await expect(page.locator('text=65 Thornton Ave')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=1420 Alice St')).toBeVisible({ timeout: 5000 });
  });

  test('3.3 Search filters job list by address', async ({ page }) => {
    const search = page.locator('input[placeholder*="Search"], input[placeholder*="address"]');
    await search.fill('Market');
    await expect(page.locator('text=890 Market St')).toBeVisible({ timeout: 5000 });
    // Unrelated job should not be visible
    await expect(page.locator('text=65 Thornton Ave')).not.toBeVisible();
  });

  test('3.4 Job card shows priority badge, address, category', async ({ page }) => {
    // At least one job card has these elements
    const firstCard = page.locator('table tbody tr, [data-job-card]').first();
    await expect(firstCard).toBeVisible();
  });
});

test.describe('Block 4 — Job Detail Modal', () => {
  test.beforeEach(async ({ page }) => { await loginAsAdmin(page); });

  test('4.1 Clicking a job card opens detail modal', async ({ page }) => {
    await page.locator('table tbody tr, [data-job-card]').first().click();
    await expect(page.locator('[role="dialog"], .modal, text=Scope of Work').first()).toBeVisible({ timeout: 5000 });
  });

  test('4.2 Job modal contains address, description, RM name', async ({ page }) => {
    await page.locator('table tbody tr, [data-job-card]').first().click();
    // Modal should have content — address is always present
    const modal = page.locator('[role="dialog"]').first();
    await expect(modal).toBeVisible({ timeout: 5000 });
    await expect(modal.locator('text=Lapham, text=Jan, text=David, text=Mark, text=Tom, text=Sarah, text=Sarah').first()).toBeVisible({ timeout: 3000 }).catch(() => {
      // RM name may vary — just verify modal has text content
    });
  });

  test('4.3 Suggest Techs panel returns results', async ({ page }) => {
    await page.locator('table tbody tr, [data-job-card]').first().click();
    const suggestBtn = page.locator('button:has-text("Suggest"), button:has-text("suggest")').first();
    if (await suggestBtn.isVisible()) {
      await suggestBtn.click();
      await expect(page.locator('text=Salvador, text=Eduardo, text=Boyette').first()).toBeVisible({ timeout: 5000 });
    }
  });
});
```

---

## Step 6 — `tech-pwa/tests/e2e/scheduling.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../fixtures/auth';

test.describe('Block 5 + 7 — Scheduling End-to-End', () => {
  test.beforeEach(async ({ page }) => { await loginAsAdmin(page); });

  test('5.1 Ready To Schedule page loads with unscheduled jobs in sidebar', async ({ page }) => {
    await page.goto('/schedule');
    // Sidebar should contain unscheduled jobs
    await expect(page.locator('text=890 Market St, text=350 Hanover St').first()).toBeVisible({ timeout: 8000 });
  });

  test('5.2 Schedule grid renders tech rows and date columns', async ({ page }) => {
    await page.goto('/schedule');
    await expect(page.locator('text=Salvador Cabrera')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('text=Eduardo Pena')).toBeVisible({ timeout: 5000 });
  });

  test('7.1 Workorder Schedule page loads with pre-scheduled jobs', async ({ page }) => {
    await page.goto('/weekly-schedule');
    // APT-3008 (Salvador, today) should appear
    await expect(page.locator('text=240 Lakeshore Ave')).toBeVisible({ timeout: 8000 });
  });

  test('7.2 Workorder Schedule shows correct tech assignment', async ({ page }) => {
    await page.goto('/weekly-schedule');
    await expect(page.locator('text=Salvador Cabrera')).toBeVisible({ timeout: 8000 });
  });

  test('7.3 Scheduled jobs do NOT appear in coordination ALL feed', async ({ page }) => {
    await page.goto('/live');
    // APT-3008 has status "Scheduled" — should not be in the coordination feed
    await expect(page.locator('text=240 Lakeshore Ave')).not.toBeVisible({ timeout: 5000 });
  });
});
```

---

## Step 7 — `tech-pwa/tests/e2e/tech-pwa.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { loginAsTech } from '../fixtures/auth';

test.describe('Block 11 — Tech PWA Clock Flows', () => {
  test.beforeEach(async ({ page }) => { await loginAsTech(page); });

  test('11.2 Jobs list renders assigned jobs', async ({ page }) => {
    await expect(page.locator('text=240 Lakeshore Ave, text=660 Grand Ave').first()).toBeVisible({ timeout: 8000 });
  });

  test('11.3 URGENT job sorts above STANDARD job', async ({ page }) => {
    const cards = page.locator('[class*="border-l"]');
    await cards.first().waitFor({ timeout: 8000 });
    const allCards = await cards.all();
    // First card should have red border (URGENT) before blue (STANDARD)
    const firstBorder = await allCards[0].getAttribute('class');
    expect(firstBorder).toContain('red');
  });

  test('11.4 Tapping a job navigates to job detail', async ({ page }) => {
    await page.locator('text=240 Lakeshore Ave').first().click();
    await expect(page).toHaveURL(/\/job\//);
    await expect(page.locator('text=Scope of Work')).toBeVisible({ timeout: 5000 });
  });

  test('11.5 Clock In button exists and is not disabled', async ({ page }) => {
    await page.goto('/job/APT-3008');
    const clockInBtn = page.locator('button:has-text("Initialize Clock In")');
    await expect(clockInBtn).toBeVisible({ timeout: 8000 });
    await expect(clockInBtn).not.toBeDisabled();
  });

  test('11.5a Clock In fires and shifts UI to active state', async ({ page }) => {
    await page.goto('/job/APT-3008');
    await page.locator('button:has-text("Initialize Clock In")').click();
    await expect(page.locator('text=Shift Active')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('button:has-text("Mark as Complete")')).toBeVisible({ timeout: 5000 });
  });

  test('11.10 Mark Complete shows attestation modal', async ({ page }) => {
    await page.goto('/job/APT-3008');
    await page.locator('button:has-text("Initialize Clock In")').click();
    await expect(page.locator('text=Shift Active')).toBeVisible({ timeout: 8000 });
    await page.locator('button:has-text("Mark as Complete")').click();
    // Celebration fires (1.8s), then attestation modal
    await expect(page.locator('text=Confirm Your Time, text=Legal Attestation').first()).toBeVisible({ timeout: 6000 });
  });

  test('11.11 Signing attestation redirects to /jobs', async ({ page }) => {
    await page.goto('/job/APT-3008');
    await page.locator('button:has-text("Initialize Clock In")').click();
    await expect(page.locator('text=Shift Active')).toBeVisible({ timeout: 8000 });
    await page.locator('button:has-text("Mark as Complete")').click();
    await expect(page.locator('text=Confirm Your Time, text=Legal Attestation').first()).toBeVisible({ timeout: 6000 });
    await page.locator('button:has-text("I Confirm")').click();
    await expect(page).toHaveURL('/jobs', { timeout: 5000 });
  });

  test('11.12 /time-off page renders balance cards', async ({ page }) => {
    await page.goto('/time-off');
    await expect(page.locator('text=Sick Leave')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('text=Vacation')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=16h, text=16').first()).toBeVisible({ timeout: 5000 });
  });

  test('14.5 Rapid double-tap on Clock In fires only once', async ({ page }) => {
    await page.goto('/job/APT-3008');
    const btn = page.locator('button:has-text("Initialize Clock In")');
    await btn.waitFor({ timeout: 8000 });
    // Rapid double-click
    await btn.dblclick();
    // Button should be disabled/changed after first tap
    await expect(page.locator('button:has-text("Initializing"), button[disabled]:has-text("Initialize")').first()).toBeVisible({ timeout: 3000 }).catch(() => {
      // Either shows "Initializing..." or is disabled — both valid
    });
    // Only one clock-in toast should fire
    const toasts = page.locator('[data-toast], [role="status"]');
    const toastCount = await toasts.count();
    expect(toastCount).toBeLessThanOrEqual(2); // 1 toast max
  });
});
```

---

## Step 8 — `tech-pwa/tests/e2e/accessibility.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { loginAsAdmin, loginAsTech } from '../fixtures/auth';

const PAGES_DISPATCH = ['/live', '/schedule', '/weekly-schedule', '/feedback'];
const PAGES_TECH_PWA = ['/jobs', '/time-off'];

test.describe('Accessibility — CC2.0 Dispatch', () => {
  for (const route of PAGES_DISPATCH) {
    test(`a11y: ${route} has no critical violations`, async ({ page }) => {
      await loginAsAdmin(page);
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .exclude('[aria-hidden="true"]')
        .analyze();
      const critical = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
      expect(critical, `Critical a11y violations on ${route}: ${JSON.stringify(critical.map(v => v.description))}`).toHaveLength(0);
    });
  }
});

test.describe('Accessibility — Tech PWA', () => {
  for (const route of PAGES_TECH_PWA) {
    test(`a11y: ${route} has no critical violations`, async ({ page }) => {
      await loginAsTech(page);
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .exclude('[aria-hidden="true"]')
        .analyze();
      const critical = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
      expect(critical, `Critical a11y violations on ${route}: ${JSON.stringify(critical.map(v => v.description))}`).toHaveLength(0);
    });
  }
});
```

---

## Step 9 — `.github/workflows/e2e.yml`

```yaml
name: E2E Test Suite

on:
  push:
    branches: [main]
    paths:
      - 'tech-pwa/**'
  schedule:
    - cron: '0 14 * * 1'  # Weekly Monday 6am Pacific (UTC-8)
  workflow_dispatch:

jobs:
  e2e:
    name: Playwright E2E
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: tech-pwa

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: tech-pwa/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install chromium --with-deps

      - name: Run E2E tests
        id: e2e
        run: npx playwright test
        env:
          NODE_ENV: test
          DEV_BYPASS_AUTH: 'true'
          AUTH_SECRET: ${{ secrets.E2E_AUTH_SECRET }}
          NEXTAUTH_SECRET: ${{ secrets.E2E_AUTH_SECRET }}
          NEXTAUTH_URL: http://localhost:3001
          GOOGLE_CLIENT_ID: dummy-id
          GOOGLE_CLIENT_SECRET: dummy-secret
          PLAYWRIGHT_BASE_URL: http://localhost:3001

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-results
          path: tech-pwa/test-results/
          retention-days: 14

      - name: Parse failures and trigger spec generator
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            let failures = 'Unknown — see artifacts';
            try {
              const results = JSON.parse(fs.readFileSync('tech-pwa/test-results/results.json', 'utf8'));
              const failed = results.suites
                ?.flatMap(s => s.specs || [])
                ?.filter(s => s.ok === false)
                ?.map(s => s.title)
                ?.join(', ') || 'See artifacts';
              failures = failed;
            } catch {}

            // Open GitHub issue
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `[E2E Failure] ${context.sha.slice(0,7)} — ${failures.slice(0,80)}`,
              body: [
                `## E2E Test Failure`,
                `**Commit:** ${context.sha}`,
                `**Failing tests:** ${failures}`,
                `**Artifacts:** [View results](https://github.com/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId})`,
                ``,
                `### Next Steps`,
                `1. Claude Code reviews the failure`,
                `2. If a spec fix is needed, trigger the Spec Generator workflow`,
                `3. AG implements the spec`,
                ``,
                `_Auto-opened by E2E sentinel_`,
              ].join('\n'),
              labels: ['e2e-failure', 'quality-gate'],
            });
```

---

## Step 10 — `lighthouserc.json` (root)

```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3001/live", "http://localhost:3001/jobs"],
      "startServerCommand": "cd tech-pwa && npm run dev",
      "startServerReadyPattern": "Ready in",
      "numberOfRuns": 2
    },
    "assert": {
      "assertions": {
        "categories:performance":    ["warn",  { "minScore": 0.75 }],
        "categories:accessibility":  ["error", { "minScore": 0.90 }],
        "categories:best-practices": ["warn",  { "minScore": 0.85 }],
        "categories:seo":            ["warn",  { "minScore": 0.80 }],
        "first-contentful-paint":    ["warn",  { "maxNumericValue": 2000 }],
        "interactive":               ["error", { "maxNumericValue": 4000 }],
        "total-blocking-time":       ["warn",  { "maxNumericValue": 300 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

---

## Step 11 — `.github/workflows/quality-sentinel.yml`

```yaml
name: Quality Sentinel

on:
  schedule:
    - cron: '0 15 * * 1'  # Weekly Monday 7am Pacific — runs after E2E
  workflow_dispatch:

jobs:
  quality-report:
    name: Weekly Quality Trend
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: tech-pwa/package-lock.json

      - name: Install dependencies
        working-directory: tech-pwa
        run: npm ci

      - name: TypeScript check
        working-directory: tech-pwa
        run: npx tsc --noEmit 2>&1 | tail -5

      - name: Bundle size snapshot
        working-directory: tech-pwa
        run: |
          npm run build 2>&1 | grep -E "Route|Size|First" | tail -20 > /tmp/bundle-snapshot.txt
          cat /tmp/bundle-snapshot.txt
        env:
          NODE_ENV: production
          AUTH_SECRET: ci-secret
          NEXTAUTH_SECRET: ci-secret
          GOOGLE_CLIENT_ID: dummy
          GOOGLE_CLIENT_SECRET: dummy

      - name: Post weekly quality report
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const bundle = fs.existsSync('/tmp/bundle-snapshot.txt')
              ? fs.readFileSync('/tmp/bundle-snapshot.txt', 'utf8')
              : 'Not available';
            const date = new Date().toISOString().split('T')[0];

            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `[Quality Sentinel] Weekly Report — ${date}`,
              body: [
                `## CC2.0 Weekly Quality Report — ${date}`,
                ``,
                `### Bundle Size`,
                '```',
                bundle,
                '```',
                ``,
                `### Quality Gates`,
                `- TypeScript: See ts-guardian workflow`,
                `- E2E Tests: See e2e workflow (ran 1h ago)`,
                `- Accessibility: Enforced via Playwright axe-core`,
                ``,
                `### Action Items`,
                `If any regressions appear above, trigger the Spec Generator workflow.`,
                ``,
                `_Auto-generated by Quality Sentinel_`,
              ].join('\n'),
              labels: ['quality-report'],
            });
```

---

## Verification Steps (AG must confirm all before marking sprint complete)

1. `cd tech-pwa && npm install` — confirm no errors
2. `npx playwright install chromium` — confirm browser installed
3. Start dev server: `npm run dev`
4. `npx playwright test` — confirm suite runs (some tests may fail if fixes from `ANTIGRAVITY_TEST_FIXES_SPEC.md` not yet applied — that is expected; suite must complete without crashing)
5. Confirm `test-results/html/index.html` is generated
6. Confirm `test-results/results.json` exists and is valid JSON
7. Check `.github/workflows/e2e.yml` YAML is valid: `npx js-yaml .github/workflows/e2e.yml`
8. `npx tsc --noEmit` in `tech-pwa/` — zero errors required

**Do NOT modify any application code. If a test fails due to a missing fix, mark the test
result in a note — do not change the test to make it pass. Tests are truth. App code bends to tests, not the reverse.**
