import { Page } from '@playwright/test';

export async function loginAsAdmin(page: Page) {
  await page.goto('/login');
  const devBtn = page.locator('button:has-text("Dev Login")');
  await devBtn.waitFor({ timeout: 5000 });
  await devBtn.click();
  await page.waitForURL('/live', { timeout: 60000 });
}

export async function loginAsTech(page: Page, badge = '1', pin = '1234') {
  await page.goto('/login');
  await page.waitForSelector('input[placeholder*="Badge"]');
  const badgeInput = page.locator('input[placeholder*="Badge"]');
  const pinInput   = page.locator('input[placeholder*="PIN"]');
  await badgeInput.fill(badge);
  await pinInput.fill(pin);
  await page.locator('button:has-text("Sign In"), button:has-text("Login")').first().click();
  await page.waitForURL('/jobs', { timeout: 15000 });
}
