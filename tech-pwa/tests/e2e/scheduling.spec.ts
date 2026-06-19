import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../fixtures/auth';

test.describe('Block 5 + 7 — Scheduling End-to-End', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.waitForURL('**/live', { timeout: 15000 });
  });

  test('5.1 Schedule page loads tech-row grid', async ({ page }) => {
    await page.goto('/schedule');
    await expect(page.locator('[data-testid="tech-row"]').first()).toBeVisible({ timeout: 10000 });
  });

  test('5.2 Lock and Send button is visible in schedule header', async ({ page }) => {
    await page.goto('/schedule');
    await expect(page.locator('[data-testid="lock-send-btn"]')).toBeVisible({ timeout: 10000 });
  });

  test('7.1 Workorder Schedule page loads with pre-scheduled jobs', async ({ page }) => {
    await page.goto('/weekly-schedule');
    // APT-3008 (Salvador, today) should appear
    await expect(page.locator('text=240 Lakeshore Ave')).toBeVisible({ timeout: 8000 });
  });

  test('7.2 Workorder Schedule shows correct tech assignment', async ({ page }) => {
    await page.goto('/weekly-schedule');
    await expect(page.locator('text=Cabrera, Salvador')).toBeVisible({ timeout: 8000 });
  });

  test('7.3 Scheduled jobs do NOT appear in coordination ALL feed', async ({ page }) => {
    await page.goto('/live');
    // APT-3008 has status "Scheduled" — should not be in the coordination feed
    await expect(page.locator('text=240 Lakeshore Ave')).not.toBeVisible({ timeout: 5000 });
  });
});
