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
    await expect(page.locator('aside').first()).toBeVisible();
  });

  test('1.4 Unauthorized route redirects to /login', async ({ page }) => {
    await page.goto('/live');
    await expect(page).toHaveURL(/\/login/);
  });

  test('1.5 Tech login with valid badge+PIN reaches /jobs', async ({ page }) => {
    test.fixme(true, 'loginAsTech calls pwa-api.aptmaintenanceinc.com CF Worker — blocked on CC3.0 Phase 4');
    await loginAsTech(page);
    await expect(page).toHaveURL('/jobs');
  });

  test('1.6 Tech login with invalid PIN shows error', async ({ page }) => {
    // Clear any session cookies from prior tests (e.g. test 1.3 loginAsAdmin)
    // to prevent active next-auth session from interfering with badge/PIN flow.
    await page.context().clearCookies();
    await page.goto('/login');
    await page.waitForSelector('input[placeholder*="Badge"]');
    const badgeInput = page.locator('input[placeholder*="Badge"]');
    const pinInput   = page.locator('input[placeholder*="PIN"]');
    // pressSequentially fires keydown/input/keyup per character — reliably triggers
    // React's onChange on both desktop and mobile emulation (fill() can miss React
    // state update on mobile when a subsequent fill() triggers a re-render first).
    await badgeInput.pressSequentially('1');
    await expect(badgeInput).toHaveValue('1');
    await pinInput.pressSequentially('0000');
    await page.locator('form button[type="submit"], form button:has-text("Sign In")').first().click();
    await expect(page.locator('text=Invalid badge number or PIN')).toBeVisible({ timeout: 5000 });
    await expect(page).not.toHaveURL('/jobs');
  });

});
