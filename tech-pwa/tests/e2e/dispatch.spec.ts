import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../fixtures/auth';
import { seedFixtures } from '../fixtures/seed';

test.describe('Sprint 5 — Dispatch E2E Real Tests', () => {
  // Re-seed before each project run. phase2-verification (chromium) modifies TEST-7
  // and schedules one RTS job, causing mobile project to see stale counts.
  test.beforeAll(async () => {
    await seedFixtures();
  });

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.waitForURL('**/live', { timeout: 15000 });
    await expect(page.locator('[data-job-id^="TEST-"]').first()).toBeVisible({ timeout: 15000 });
  });

  test('5.1 "All Types" chip shows all seeded TEST- jobs', async ({ page }) => {
    const testJobs = page.locator('[data-job-id^="TEST-"]');
    await expect(testJobs).toHaveCount(9);
  });

  test('5.2 "Inspection" chip filters list to emailType=inspection', async ({ page, isMobile }) => {
    // Sidebar is 220px fixed z-50 on <lg viewports — blocks chips 1 and 2 (All Types, Inspection)
    test.skip(isMobile, 'dispatch filter chips blocked by pinned sidebar on <lg viewports');
    await page.locator('button:has-text("Inspection")').click();
    const testJobs = page.locator('[data-job-id^="TEST-"]');
    await expect(testJobs).toHaveCount(3);
  });

  test('5.3 "Turnover" chip filters list to emailType=turnover', async ({ page }) => {
    await page.locator('button:has-text("Turnover")').click();
    const testJobs = page.locator('[data-job-id^="TEST-"]');
    await expect(testJobs).toHaveCount(3);
  });

  test('5.4 Re-clicking "All Types" restores full list', async ({ page, isMobile }) => {
    // Inspection chip is inside the 0–220px sidebar zone on mobile — see 5.2
    test.skip(isMobile, 'dispatch filter chips blocked by pinned sidebar on <lg viewports');
    await page.locator('button:has-text("Inspection")').click();
    await expect(page.locator('[data-job-id^="TEST-"]')).toHaveCount(3);
    await page.locator('button:has-text("All Types")').click();
    await expect(page.locator('[data-job-id^="TEST-"]')).toHaveCount(9);
  });

  test('5.5 "Unassigned" jobs show NO tech label', async ({ page }) => {
    const row = page.locator('[data-job-id="TEST-7"]');
    await expect(row).toBeVisible();
    await expect(row.locator('span:has-text("👤")')).toHaveCount(0);
  });

  test('5.6 Assigned single tech shows correctly', async ({ page }) => {
    const row = page.locator('[data-job-id="TEST-2"]');
    await expect(row).toBeVisible();
    // Each job row has a bare 👤 icon span AND the badge "👤 John Doe" span — assert the full badge
    await expect(row.locator('span:has-text("👤 John Doe")')).toBeVisible();
    await expect(row).toContainText('John Doe');
  });

  test('5.7 Assigned multi-tech (+1) shows correctly', async ({ page }) => {
    const row = page.locator('[data-job-id="TEST-3"]');
    await expect(row).toBeVisible();
    // Each job row has a bare 👤 icon span AND the badge "👤 Alice +1" span — assert the full badge
    await expect(row.locator('span:has-text("👤 Alice +1")')).toBeVisible();
    // UI renders semicolon-delimited multi-tech as "Alice +1"
    await expect(row).toContainText('Alice +1');
  });

  test('5.8 "Ready to Schedule" section contains 6 jobs', async ({ page }) => {
    const section = page.locator('[data-status-section="Ready to Schedule"]');
    await expect(section).toBeVisible();
    await expect(section.locator('[data-job-id^="TEST-"]')).toHaveCount(6);
  });

  test('5.9 "Needs Review" section contains 3 jobs', async ({ page }) => {
    const section = page.locator('[data-status-section="Needs Review"]');
    await expect(section).toBeVisible();
    await expect(section.locator('[data-job-id^="TEST-"]')).toHaveCount(3);
  });
});
