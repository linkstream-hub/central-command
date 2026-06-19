import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env from .env.local — webServer overrides take precedence for test-specific vars
dotenv.config({ path: path.resolve(__dirname, '.env.local') });
// Tests always use DATABASE_URL (dev branch). Prevent db.ts singleton from
// picking up DATABASE_URL_PREVIEW, which points to a Vercel preview branch.
delete process.env.DATABASE_URL_PREVIEW;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 120 * 1000,
  expect: {
    timeout: 30000
  },
  workers: 1,
  outputDir: './test-results/runs',
  testIgnore: process.env.CI ? ['**/cc-full.spec.ts', '**/go-live.spec.ts'] : [],
  globalSetup: require.resolve('./tests/globalSetup'),
  globalTeardown: require.resolve('./tests/globalTeardown'),
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['html', { outputFolder: 'test-results/html', open: 'never' }],
  ],
  use: {
    baseURL: 'http://localhost:3010',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile',   use: { ...devices['iPhone 13'] } },
  ],
  // Always manage the test server — same config locally and in CI.
  // reuseExistingServer: locally, reuse a pre-started server on 3010 if present.
  // In CI, always start fresh.
  webServer: {
    command: 'npm run dev -- -p 3010',
    url: 'http://localhost:3010',
    reuseExistingServer: !process.env.CI,
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: process.env.DATABASE_URL!,
      ALLOW_MOCK: 'true',
      DEV_BYPASS_AUTH: 'true',
      AUTH_SECRET: process.env.AUTH_SECRET || 'test-secret-for-ci-only',
      NEXTAUTH_SECRET: process.env.AUTH_SECRET || 'test-secret-for-ci-only',
      NEXTAUTH_URL: 'http://localhost:3010',
      GOOGLE_CLIENT_ID: 'dummy-id',
      GOOGLE_CLIENT_SECRET: 'dummy-secret',
      NEXT_PUBLIC_API_URL: '',
      NEXT_PUBLIC_SANDBOX_MODE: 'false',
    },
    timeout: 900000,
  },
});
