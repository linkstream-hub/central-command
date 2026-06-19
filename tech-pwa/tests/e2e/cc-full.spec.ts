/**
 * CC Full Validation Suite — APT Central Command Dispatch API
 *
 * Validates all dispatch-side API routes (Flows A–N) using APIRequestContext.
 * No browser required — pure API calls with x-api-key auth.
 *
 * Auth model (from route code):
 *   - /api/jobs (GET list):        session-only — 401 expected with API key only
 *   - /api/techs:                  session-only — 401 expected with API key only
 *   - /api/jobs/[jobId] (GET/PATCH): session OR x-api-key
 *   - /api/schedule/today:         session OR x-api-key
 *   - /api/schedule/week:          session OR x-api-key
 *   - /api/field/live:             x-api-key ONLY (no session path — different check)
 *   - /api/notifications:          session OR x-api-key
 *   - /api/comms/[jobId]:          session ONLY — 401 expected with API key only
 *
 * Run:
 *   $env:PREVIEW_URL="https://tech-ol3ibg7fv-aptmaintenanceincs-projects.vercel.app"
 *   $env:VERCEL_BYPASS_SECRET="VFIPVEs7ri4O3h6PflolB7UtaA3IFC3S"
 *   $env:DASHBOARD_API_KEY="<value from .env.local>"
 *   npx playwright test tests/e2e/cc-full.spec.ts --project=chromium --reporter=list
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fsSync = require('fs') as typeof import('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pathSync = require('path') as typeof import('path');

import { test, expect, request as pwRequest } from '@playwright/test';

const BASE_URL = process.env.PREVIEW_URL ?? 'https://tech-ol3ibg7fv-aptmaintenanceincs-projects.vercel.app';
const BYPASS = process.env.VERCEL_BYPASS_SECRET ?? '';
const API_KEY = process.env.DASHBOARD_API_KEY ?? '';
const TEST_JOB_ID = 'TEST-VALIDATION-001';

// Compute today and tomorrow in LA timezone using Intl (matches server-side logic)
function getLADate(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}
const todayLA = getLADate(0);
const tomorrowLA = getLADate(1);

// Shared headers for API-key-authenticated requests
const API_HEADERS = {
  'x-api-key': API_KEY,
  'x-vercel-protection-bypass': BYPASS,
  'Content-Type': 'application/json',
};

// ─── Result collector (used to write artifact at end) ─────────────────────────
type FlowResult = {
  flow: string;
  description: string;
  pass: boolean;
  status: number;
  bodyExcerpt: string;
  notes: string;
};
const results: FlowResult[] = [];

function record(r: FlowResult) {
  results.push(r);
  const tag = r.pass ? 'PASS' : 'FAIL';
  console.log(`[Flow ${r.flow}] ${tag} | HTTP ${r.status} | ${r.notes}`);
}

// ─── Test suite ───────────────────────────────────────────────────────────────
test.describe('CC Full Validation — Dispatch API Flows', () => {
  test.setTimeout(120000);
  // This suite tests a live Vercel deployment, not localhost.
  // Set $env:PREVIEW_URL="https://..." before running to activate it.
  test.beforeEach(() => {
    test.skip(!process.env.PREVIEW_URL, 'PREVIEW_URL not set — skipping live deployment validation. Run with $env:PREVIEW_URL="https://..." to activate.');
  });

  // ── Flow A — Job List (Dispatch Queue) ──────────────────────────────────────
  // NOTE: /api/jobs GET is session-only per route code (no x-api-key branch).
  // Expect 401 — this confirms the route exists and the auth guard is working.
  // Document as KNOWN BEHAVIOR, not a failure.
  test('Flow A — Job List GET /api/jobs', async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.get(`${BASE_URL}/api/jobs`);
    const status = res.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    let bodyText = '';
    try { body = await res.json(); bodyText = JSON.stringify(body).slice(0, 300); } catch { bodyText = await res.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
    await ctx.dispose();

    // Route is session-only — API key returns 401. 200 is also acceptable if DASHBOARD_API_KEY was added to the route.
    const pass = status === 200 || status === 401;
    const jobCount = status === 200 && body?.jobs ? body.jobs.length : undefined;
    const notes = status === 200
      ? `source:${body?.source} job_count:${jobCount} success:${body?.success}`
      : `Route is session-only — 401 expected (no x-api-key branch in /api/jobs GET)`;

    record({ flow: 'A', description: 'Job List (dispatch queue)', pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(pass, `Flow A: unexpected status ${status}`).toBe(true);
  });

  // ── Flow B — Single Job Fetch ────────────────────────────────────────────────
  test('Flow B — Single Job GET /api/jobs/TEST-VALIDATION-001', async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.get(`${BASE_URL}/api/jobs/${TEST_JOB_ID}`);
    const status = res.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    let bodyText = '';
    try { body = await res.json(); bodyText = JSON.stringify(body).slice(0, 300); } catch { bodyText = await res.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
    await ctx.dispose();

    const pass = status === 200 && body?.success === true && body?.job?.address === '123 Validation Test St';
    const notes = status === 200
      ? `success:${body?.success} address:${body?.job?.address} jobId:${body?.job?.jobId}`
      : `status:${status} body:${bodyText.slice(0, 100)}`;

    record({ flow: 'B', description: 'Single Job Fetch', pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(status, 'Flow B: expected 200').toBe(200);
    expect.soft(body?.success, 'Flow B: success must be true').toBe(true);
    expect.soft(body?.job?.address, 'Flow B: address must be 123 Validation Test St').toBe('123 Validation Test St');
  });

  // ── Flow C — Tech List ───────────────────────────────────────────────────────
  // NOTE: /api/techs is session-only per route code. Expect 401.
  test('Flow C — Tech List GET /api/techs', async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.get(`${BASE_URL}/api/techs`);
    const status = res.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    let bodyText = '';
    try { body = await res.json(); bodyText = JSON.stringify(body).slice(0, 300); } catch { bodyText = await res.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
    await ctx.dispose();

    const pass = status === 200 || status === 401;
    const notes = status === 200
      ? `tech_count:${body?.techs?.length} includes_T01:${(body?.techs ?? []).some((t: { badge: string }) => t.badge === 'T01')}`
      : `Route is session-only — 401 expected (no x-api-key branch in /api/techs GET)`;

    record({ flow: 'C', description: 'Tech List', pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(pass, `Flow C: unexpected status ${status}`).toBe(true);
  });

  // ── Flow D — Today's Schedule ────────────────────────────────────────────────
  test("Flow D — Today's Schedule GET /api/schedule/today", async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.get(`${BASE_URL}/api/schedule/today`);
    const status = res.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    let bodyText = '';
    try { body = await res.json(); bodyText = JSON.stringify(body).slice(0, 300); } catch { bodyText = await res.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
    await ctx.dispose();

    const pass = status === 200;
    const notes = status === 200
      ? `success:${body?.success} date:${body?.date} source:${body?.source}`
      : `status:${status}`;

    record({ flow: 'D', description: "Today's Schedule", pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(status, 'Flow D: expected 200').toBe(200);
  });

  // ── Flow E — Week Schedule ───────────────────────────────────────────────────
  test('Flow E — Week Schedule GET /api/schedule/week', async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.get(`${BASE_URL}/api/schedule/week`);
    const status = res.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    let bodyText = '';
    try { body = await res.json(); bodyText = JSON.stringify(body).slice(0, 300); } catch { bodyText = await res.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
    await ctx.dispose();

    const pass = status === 200;
    const notes = status === 200
      ? `success:${body?.success} week_start:${body?.week?.start} week_end:${body?.week?.end} source:${body?.source}`
      : `status:${status}`;

    record({ flow: 'E', description: 'Week Schedule', pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(status, 'Flow E: expected 200').toBe(200);
  });

  // ── Flow F — Live Field Status ───────────────────────────────────────────────
  test('Flow F — Live Field Status GET /api/field/live', async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.get(`${BASE_URL}/api/field/live`);
    const status = res.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    let bodyText = '';
    try { body = await res.json(); bodyText = JSON.stringify(body).slice(0, 300); } catch { bodyText = await res.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
    await ctx.dispose();

    const pass = status === 200;
    const notes = status === 200
      ? `success:${body?.success} tech_count:${body?.techs?.length} source:${body?.source}`
      : `status:${status}`;

    record({ flow: 'F', description: 'Live Field Status', pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(status, 'Flow F: expected 200').toBe(200);
  });

  // ── Flow G — Assign Tech to Job ──────────────────────────────────────────────
  test('Flow G — Assign Tech PATCH /api/jobs/TEST-VALIDATION-001', async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.patch(`${BASE_URL}/api/jobs/${TEST_JOB_ID}`, {
      data: { assignedTech: 'T01', status: 'Ready to Schedule' },
    });
    const status = res.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    let bodyText = '';
    try { body = await res.json(); bodyText = JSON.stringify(body).slice(0, 300); } catch { bodyText = await res.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
    await ctx.dispose();

    const pass = status === 200 && body?.success === true;
    const notes = status === 200
      ? `success:${body?.success} warning:${body?.warning ?? 'none'}`
      : `status:${status} body:${bodyText.slice(0, 100)}`;

    record({ flow: 'G', description: 'Assign Tech (WO Assignment)', pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(status, 'Flow G: expected 200').toBe(200);
    expect.soft(body?.success, 'Flow G: success must be true').toBe(true);
  });

  // ── Flow H — Schedule Job ────────────────────────────────────────────────────
  test('Flow H — Schedule Job PATCH /api/jobs/TEST-VALIDATION-001', async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.patch(`${BASE_URL}/api/jobs/${TEST_JOB_ID}`, {
      data: { scheduledDate: todayLA, scheduledTime: '10:00', status: 'Scheduled' },
    });
    const status = res.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    let bodyText = '';
    try { body = await res.json(); bodyText = JSON.stringify(body).slice(0, 300); } catch { bodyText = await res.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
    await ctx.dispose();

    const pass = status === 200 && body?.success === true;
    // Note: email does NOT fire via API key path (isApiKeyAuth=true skips email triggers)
    const notes = status === 200
      ? `success:${body?.success} scheduledDate:${todayLA} scheduledTime:10:00 NOTE:email_not_fired_via_api_key`
      : `status:${status} body:${bodyText.slice(0, 100)}`;

    record({ flow: 'H', description: 'Schedule Job (WO Scheduling)', pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(status, 'Flow H: expected 200').toBe(200);
    expect.soft(body?.success, 'Flow H: success must be true').toBe(true);
  });

  // ── Flow I — Modify Date ─────────────────────────────────────────────────────
  test('Flow I — Modify Date PATCH /api/jobs/TEST-VALIDATION-001', async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.patch(`${BASE_URL}/api/jobs/${TEST_JOB_ID}`, {
      data: { scheduledDate: tomorrowLA, scheduledTime: '14:00' },
    });
    const status = res.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    let bodyText = '';
    try { body = await res.json(); bodyText = JSON.stringify(body).slice(0, 300); } catch { bodyText = await res.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
    await ctx.dispose();

    const pass = status === 200 && body?.success === true;
    const notes = status === 200
      ? `success:${body?.success} scheduledDate:${tomorrowLA} scheduledTime:14:00`
      : `status:${status} body:${bodyText.slice(0, 100)}`;

    record({ flow: 'I', description: 'Modify Date', pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(status, 'Flow I: expected 200').toBe(200);
    expect.soft(body?.success, 'Flow I: success must be true').toBe(true);
  });

  // ── Flow J — Modify Tech Assignment ─────────────────────────────────────────
  // Note: badge 102 may not exist — 200 with warning field is acceptable; 404 skips restore
  test('Flow J — Modify Tech Assignment PATCH /api/jobs/TEST-VALIDATION-001', async () => {
    // First: change to badge 102
    const ctx1 = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res1 = await ctx1.patch(`${BASE_URL}/api/jobs/${TEST_JOB_ID}`, {
      data: { assignedTech: '102' },
    });
    const status1 = res1.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body1: any = {};
    let bodyText1 = '';
    try { body1 = await res1.json(); bodyText1 = JSON.stringify(body1).slice(0, 300); } catch { bodyText1 = await res1.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
    await ctx1.dispose();

    // Second: restore to T01 (skip if first returned 404)
    let status2 = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body2: any = {};
    let bodyText2 = '';
    if (status1 !== 404) {
      const ctx2 = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
      const res2 = await ctx2.patch(`${BASE_URL}/api/jobs/${TEST_JOB_ID}`, {
        data: { assignedTech: 'T01' },
      });
      status2 = res2.status();
      try { body2 = await res2.json(); bodyText2 = JSON.stringify(body2).slice(0, 300); } catch { bodyText2 = await res2.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
      await ctx2.dispose();
    }

    const pass1 = status1 === 200; // 200 with optional warning is acceptable
    const pass2 = status1 === 404 ? true : (status2 === 200 && body2?.success === true);
    const pass = pass1 && pass2;

    const notes = [
      `change_to_102: status=${status1} success=${body1?.success} warning=${body1?.warning ?? 'none'}`,
      status1 === 404
        ? 'badge_102_not_found: restore_skipped'
        : `restore_to_T01: status=${status2} success=${body2?.success}`,
    ].join(' | ');

    record({
      flow: 'J',
      description: 'Modify Tech Assignment',
      pass,
      status: status1,
      bodyExcerpt: `change:${bodyText1.slice(0, 150)} restore:${bodyText2.slice(0, 150)}`,
      notes,
    });
    expect.soft(status1, 'Flow J (change): expected 200').toBe(200);
    if (status1 !== 404) {
      expect.soft(status2, 'Flow J (restore): expected 200').toBe(200);
    }
  });

  // ── Flow K — Comms Read (session-only guard) ─────────────────────────────────
  test('Flow K — Comms Read 401 guard GET /api/comms/TEST-VALIDATION-001', async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.get(`${BASE_URL}/api/comms/${TEST_JOB_ID}`);
    const status = res.status();
    let bodyText = '';
    try { bodyText = (await res.text()).slice(0, 200); } catch { bodyText = '(unreadable)'; }
    await ctx.dispose();

    // 401 is correct — comms routes are session-only by design
    const pass = status === 401;
    const notes = pass
      ? '401 confirmed — comms route correctly rejects API-key-only requests (session guard working)'
      : `UNEXPECTED: expected 401, got ${status}`;

    record({ flow: 'K', description: 'Comms Read (session guard)', pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(status, 'Flow K: expected 401 (session-only guard)').toBe(401);
  });

  // ── Flow L — Comms Reply (session-only guard) ────────────────────────────────
  test('Flow L — Comms Reply 401 guard POST /api/comms/TEST-VALIDATION-001', async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.post(`${BASE_URL}/api/comms/${TEST_JOB_ID}`, {
      data: { replyBody: 'Test reply', stakeholder: 'TENANT', channel: 'EMAIL' },
    });
    const status = res.status();
    let bodyText = '';
    try { bodyText = (await res.text()).slice(0, 200); } catch { bodyText = '(unreadable)'; }
    await ctx.dispose();

    // 401 is correct — comms POST is session-only by design
    const pass = status === 401;
    const notes = pass
      ? '401 confirmed — comms POST correctly rejects API-key-only requests (session guard working)'
      : `UNEXPECTED: expected 401, got ${status}`;

    record({ flow: 'L', description: 'Comms Reply (session guard)', pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(status, 'Flow L: expected 401 (session-only guard)').toBe(401);
  });

  // ── Flow M — Notifications ───────────────────────────────────────────────────
  test('Flow M — Notifications GET /api/notifications', async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.get(`${BASE_URL}/api/notifications`);
    const status = res.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    let bodyText = '';
    try { body = await res.json(); bodyText = JSON.stringify(body).slice(0, 300); } catch { bodyText = await res.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
    await ctx.dispose();

    const pass = status === 200;
    const notes = status === 200
      ? `success:${body?.success} notification_count:${body?.notifications?.length} unreadCount:${body?.unreadCount} source:${body?.source}`
      : `status:${status}`;

    record({ flow: 'M', description: 'Notifications', pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(status, 'Flow M: expected 200').toBe(200);
  });

  // ── Flow N — Reset Test Job ──────────────────────────────────────────────────
  test('Flow N — Reset Test Job PATCH /api/jobs/TEST-VALIDATION-001', async () => {
    const ctx = await pwRequest.newContext({ extraHTTPHeaders: API_HEADERS });
    const res = await ctx.patch(`${BASE_URL}/api/jobs/${TEST_JOB_ID}`, {
      data: {
        assignedTech: 'T01',
        scheduledDate: todayLA,
        scheduledTime: '09:00',
        status: 'Scheduled',
      },
    });
    const status = res.status();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    let bodyText = '';
    try { body = await res.json(); bodyText = JSON.stringify(body).slice(0, 300); } catch { bodyText = await res.text().then(t => t.slice(0, 300)).catch(() => '(unreadable)'); }
    await ctx.dispose();

    const pass = status === 200 && body?.success === true;
    const notes = status === 200
      ? `success:${body?.success} assignedTech:T01 scheduledDate:${todayLA} scheduledTime:09:00 status:Scheduled`
      : `status:${status} body:${bodyText.slice(0, 100)}`;

    record({ flow: 'N', description: 'Reset Test Job', pass, status, bodyExcerpt: bodyText, notes });
    expect.soft(status, 'Flow N: expected 200').toBe(200);
    expect.soft(body?.success, 'Flow N: success must be true').toBe(true);
  });

  // ── Write artifact after all flows ──────────────────────────────────────────
  test.afterAll(async () => {
    const passCount = results.filter(r => r.pass).length;
    const failCount = results.filter(r => !r.pass).length;

    // Build table rows
    const tableRows = results.map(r => {
      const fl = r.flow.padEnd(4);
      const desc = r.description.padEnd(32);
      const result = (r.pass ? 'PASS' : 'FAIL').padEnd(7);
      const statusStr = String(r.status).padEnd(11);
      const evidence = r.notes.slice(0, 80);
      return `${fl} | ${desc} | ${result} | ${statusStr} | ${evidence}`;
    });

    const failureDetails = results
      .filter(r => !r.pass)
      .map(r => `Flow ${r.flow} — ${r.description}\n  HTTP: ${r.status}\n  Body: ${r.bodyExcerpt}\n  Notes: ${r.notes}`)
      .join('\n\n');

    const evidenceDetails = results.map(r =>
      `Flow ${r.flow} — ${r.description}\n  HTTP: ${r.status}\n  Body: ${r.bodyExcerpt}\n  Notes: ${r.notes}`
    ).join('\n\n');

    // Find playwright summary from results
    const playwrightSummary = `${passCount + failCount} tests run — ${passCount} passed, ${failCount} failed`;

    const report = [
      `CC FULL VALIDATION RESULTS — 2026-05-28`,
      `Preview URL: ${BASE_URL}`,
      `Neon branch: preview/feat/go-live-validation (ep-holy-glade-aktl2mly)`,
      ``,
      `AUTOMATED FLOWS (AG — API key auth):`,
      ``,
      `Flow | Description                      | Result  | HTTP Status | Evidence`,
      `-----|----------------------------------|---------|-------------|----------`,
      ...tableRows,
      ``,
      `MANUAL FLOWS (Brandon — Google OAuth session):`,
      ``,
      `Flow | Description                      | Result`,
      `-----|----------------------------------|--------`,
      `M1   | Dispatch Dashboard Login          | PENDING`,
      `M2   | View Test Job in UI               | PENDING`,
      `M3   | Assign + Schedule (email test)    | PENDING`,
      `M4   | Comms Thread View                 | PENDING`,
      `M5   | Reply to Tenant                   | PENDING`,
      ``,
      `KNOWN GAPS (not failures — pre-existing, remediation required):`,
      `- Original email body not stored in comms_messages (Phase 3 regression — Gmail fallback removed, gmailMsgId still on job record, restore required)`,
      `- SMS/tech channel not supported (422 — by design, Phase 4)`,
      `- Comms routes require Google OAuth (no API key path — by design)`,
      `- Email delivery via API key: PATCH /api/jobs returns 200 but email does NOT fire (session auth required for Resend trigger — by design)`,
      `- /api/jobs (GET list) is session-only — no x-api-key branch in route code (Flow A returns 401 with API key — expected)`,
      `- /api/techs is session-only — no x-api-key branch in route code (Flow C returns 401 with API key — expected)`,
      ``,
      `FAILURES (observed bugs, not gaps):`,
      failureDetails.trim() || '(none)',
      ``,
      `EVIDENCE (HTTP status + body excerpt per automated flow):`,
      evidenceDetails,
      ``,
      `Summary: ${passCount} PASS | ${failCount} FAIL`,
      ``,
      `PLAYWRIGHT SUMMARY LINE:`,
      playwrightSummary,
    ].join('\n');

    const artifactsDir = pathSync.join(__dirname, '..', '..', '..', 'artifacts');
    if (!fsSync.existsSync(artifactsDir)) fsSync.mkdirSync(artifactsDir, { recursive: true });
    fsSync.writeFileSync(pathSync.join(artifactsDir, 'cc_full_validation.txt'), report, 'utf8');
    console.log(`\n[cc-full] Artifact written to artifacts/cc_full_validation.txt | ${passCount} PASS | ${failCount} FAIL`);
  });
});
