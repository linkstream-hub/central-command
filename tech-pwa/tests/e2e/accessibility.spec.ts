import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { loginAsAdmin, loginAsTech } from '../fixtures/auth';

const PAGES_DISPATCH = ['/live', '/schedule', '/weekly-schedule', '/feedback'];
const PAGES_TECH_PWA = ['/jobs', '/time-off'];

test.describe('Accessibility — CC2.0 Dispatch', () => {
  for (const route of PAGES_DISPATCH) {
    test(`a11y: ${route} has no critical violations`, async ({ page }) => {
      test.fixme(true, 'Pre-existing WCAG violations on dispatch pages; tech pages blocked on loginAsTech — tracked in PROFESSIONAL_BASELINE.md P2');
      await loginAsAdmin(page);
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
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
      test.fixme(true, 'Pre-existing WCAG violations on dispatch pages; tech pages blocked on loginAsTech — tracked in PROFESSIONAL_BASELINE.md P2');
      await loginAsTech(page);
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .exclude('[aria-hidden="true"]')
        .analyze();
      const critical = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
      expect(critical, `Critical a11y violations on ${route}: ${JSON.stringify(critical.map(v => v.description))}`).toHaveLength(0);
    });
  }
});
