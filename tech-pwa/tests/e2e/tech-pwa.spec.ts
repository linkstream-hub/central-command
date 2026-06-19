import { test, expect } from '@playwright/test';
import { loginAsTech } from '../fixtures/auth';

test.describe.fixme('Block 11 — Tech PWA Clock Flows — blocked on CC3.0 Phase 4 (loginAsTech calls pwa-api.aptmaintenanceinc.com CF Worker, not available in CI)', () => {
  test.beforeEach(async ({ page }) => {
    test.fixme(true, 'loginAsTech calls pwa-api.aptmaintenanceinc.com CF Worker — blocked on CC3.0 Phase 4');
    await loginAsTech(page);
  });

  test('11.2 Jobs list renders assigned jobs', async ({ page }) => {
    await expect(page.locator('text=240 Lakeshore Ave').first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator('text=660 Grand Ave').first()).toBeVisible({ timeout: 8000 });
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

  test('11.5 Start Shift button is visible and not disabled', async ({ page }) => {
    const startShiftBtn = page.locator('button:has-text("Start Shift")');
    await expect(startShiftBtn).toBeVisible({ timeout: 8000 });
    await expect(startShiftBtn).not.toBeDisabled();
  });

  test('11.5a Starting shift shows Shift Active in status bar', async ({ page }) => {
    await page.locator('button:has-text("Start Shift")').click();
    await expect(page.locator('text=Shift Active')).toBeVisible({ timeout: 8000 });
  });

  test('11.10 End Shift shows attestation modal', async ({ page }) => {
    await page.locator('button:has-text("Start Shift")').click();
    await expect(page.locator('text=Shift Active')).toBeVisible({ timeout: 8000 });
    await page.locator('button:has-text("End Shift")').click();
    await page.locator('button:has-text("Confirm End")').click();
    // Geolocation resolves quickly (denied in headless), then endShift mock fires → attestation modal
    await expect(page.locator('text=Confirm Your Time')).toBeVisible({ timeout: 10000 });
  });

  test('11.11 Signing attestation clears shift bar', async ({ page }) => {
    await page.locator('button:has-text("Start Shift")').click();
    await expect(page.locator('text=Shift Active')).toBeVisible({ timeout: 8000 });
    await page.locator('button:has-text("End Shift")').click();
    await page.locator('button:has-text("Confirm End")').click();
    await expect(page.locator('text=Confirm Your Time')).toBeVisible({ timeout: 10000 });
    await page.locator('button:has-text("I Confirm")').click();
    await expect(page.locator('text=Shift Active')).not.toBeVisible({ timeout: 5000 });
  });

  test('11.12 /time-off page renders balance cards', async ({ page }) => {
    await page.goto('/time-off');
    await expect(page.locator('text=Sick Leave')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('text=Vacation')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=16h').first()).toBeVisible({ timeout: 5000 });
  });

  test('14.5 Rapid double-tap on Start Shift fires only once', async ({ page }) => {
    const btn = page.locator('button:has-text("Start Shift")');
    await btn.waitFor({ timeout: 8000 });
    await btn.dblclick();
    // Only one Shift Active bar should appear regardless of rapid taps
    await expect(page.locator('text=Shift Active')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Shift Active')).toHaveCount(1);
  });
});

test.describe('P3-4 API Routes - Golden Path', () => {
  test('Golden path works through API', async ({ request }) => {
    // badge='99' is the dedicated API-test employee — kept separate from badge='1' (UI flows).
    // 1. Login
    const loginRes = await request.post('/api/field/auth/login', {
      data: { badge: '99', pin: '1234' }
    });
    expect(loginRes.ok()).toBeTruthy();
    const loginData = await loginRes.json();
    expect(loginData.success).toBe(true);
    const token = loginData.token;

    // 2. Get Jobs
    const jobsRes = await request.get('/api/field/jobs', {
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(jobsRes.ok()).toBeTruthy();
    const jobsData = await jobsRes.json();
    expect(jobsData.success).toBe(true);

    // 3. Start Shift
    const shiftRes = await request.post('/api/field/shift/start', {
      headers: { Authorization: `Bearer ${token}` },
      data: {}
    });
    expect(shiftRes.ok()).toBeTruthy();
    const shiftData = await shiftRes.json();
    expect(shiftData.success).toBe(true);
  });
});
