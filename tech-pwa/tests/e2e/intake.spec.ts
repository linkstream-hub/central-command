import { test, expect } from '@playwright/test';

test.describe('Intake Form', () => {
  test('allows tabbing through the form (A11y)', async ({ page }) => {
    await page.goto('/intake');
    
    // We expect a routing step first
    await expect(page.getByRole('heading', { name: /Submit a Request/i })).toBeVisible();
    
    // Press Tab to get into the document body
    await page.keyboard.press('Tab');
    
    const woButton = page.getByRole('button', { name: /Maintenance Request \(Existing Client\)/i });
    await expect(woButton).toBeVisible();
  });

  test('Work Order branch collects required fields and submits', async ({ page }) => {
    await page.goto('/intake');
    await page.getByRole('button', { name: /Maintenance Request \(Existing Client\)/i }).click();

    await page.getByLabel(/Property Address/i).fill('123 Test St');
    await page.getByLabel(/Service Type/i).selectOption('Plumbing');
    await page.getByLabel(/Priority/i).selectOption('ASAP');
    await page.getByLabel(/Description/i).fill('Leaking pipe under sink');
    await page.getByLabel(/Permission to Enter/i).selectOption('Yes');
    
    await page.getByLabel(/Your Name/i).fill('Jane PM');
    await page.getByLabel(/Your Email/i).fill('jane@example.com');

    await page.getByRole('button', { name: /Submit Request/i }).click();

    // Expect success message
    await expect(page.getByText(/Thank you/i)).toBeVisible();
  });

  test('Lead branch collects required fields and submits', async ({ page }) => {
    await page.goto('/intake');
    await page.getByRole('button', { name: /New Service Inquiry/i }).click();

    await page.getByLabel(/Name/i).fill('John Client');
    await page.getByLabel(/Email/i).fill('john@example.com');
    await page.getByLabel(/Tell us what you need/i).fill('Looking for property management maintenance services for 50 units.');

    await page.getByRole('button', { name: /Submit Inquiry/i }).click();

    await expect(page.getByText(/Thank you/i)).toBeVisible();
  });
});
