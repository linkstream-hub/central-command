# SPRINT: Go-Live Validation
# Branch: feat/go-live-validation
# Status: READY FOR EXECUTION
# Claude Code authoring date: 2026-05-27

---

## Goal

The system has never been used in production. Phase 3 (Neon rebuild) + Tier 2.5 (security hardening) is the first version that should be production-ready. This sprint validates that every major user flow works end-to-end against Vercel Preview before real staff and techs are handed the system.

**Output:** A PASS/FAIL report for every flow in `artifacts/go_live_validation.txt`. Failures are documented and flagged to Claude Code — **not fixed inline**. Fixes come in a subsequent sprint.

---

## CRITICAL SAFETY CONSTRAINTS

> The system previously sent live emails to real clients (Lapham) during testing. These constraints are non-negotiable.

1. **All testing runs against the Vercel Preview deployment** — NOT `dispatch.aptmaintenanceinc.com` (production). The Preview URL is the URL Vercel creates for the `feat/go-live-validation` branch after the first push.
2. **All test data uses fake emails** — `test-rm@test.local`, `test-tenant@test.local`. No real RM or tenant emails in any seeded record.
3. **Seed script targets `DATABASE_URL_PREVIEW`** — the Neon preview branch. The Preview deployment uses `DATABASE_URL_PREVIEW ?? DATABASE_URL` (see `src/lib/db.ts`). Seed there, not in the dev branch.
4. **`NODE_ENV=production` on Vercel Preview** — the dev backdoor in `login/route.ts` (line 66–69) does NOT apply. Real `pinHash` comparison is enforced. Seed the correct hash.

---

## Spec Scope — exact files AG may touch

**New files (create):**
- `tech-pwa/scripts/seed-test-data.ts`

**Artifacts (write, not committed code):**
- `artifacts/go_live_validation.txt`

**Any file not on this list requires an immediate STOP and flag to Claude Code before touching. Do not create diagnostic scripts, scratch files, or helper scripts outside this list.**

---

## Prerequisites — verify before any code

**PREREQ-A (Brandon — already confirmed 2026-05-27):** `N8N_COMPLIANCE_WEBHOOK_URL` is set for Vercel Preview environment. ✅

**PREREQ-B (AG — verify at Task 1):** `DATABASE_URL_PREVIEW` is set in Vercel Preview env. AG cannot read this value — just confirm it exists by checking if the Preview deployment can reach the DB (Task 4 health check will confirm this).

---

## Task List

### Task 1 — Branch verify

```powershell
git branch --show-current
```
Output must be: `feat/go-live-validation`
If not: STOP. Do not proceed. Report to Claude Code.

```powershell
git ls-remote --heads origin feat/go-live-validation
```
Must be non-empty. If empty: `git push -u origin feat/go-live-validation`

**HARD SCOPE CONSTRAINT:** During this sprint you may only create or modify files listed in the Spec Scope section above. If you feel the need to write a diagnostic script, test harness, or output file — stop. Read source files directly. Do not create helper scripts. Any file created outside the scope list will block the diff review.

---

### Task 2 — Get the Preview deployment URL

After the first push to `feat/go-live-validation`, Vercel will create a preview deployment. Find it:

```powershell
cd tech-pwa && npx vercel ls 2>&1 | Select-Object -First 20
```

Or check Vercel dashboard → Deployments → filter by branch `feat/go-live-validation`. The URL will be something like `apt-central-command-git-feat-go-live-validation-bgb.vercel.app`.

Paste the Preview URL here: `______`

All testing in Tasks 5–14 uses this URL. Never use `dispatch.aptmaintenanceinc.com`.

---

### Task 3 — Create `tech-pwa/scripts/seed-test-data.ts`

Create this file exactly:

```typescript
/**
 * Go-Live Validation — Test Data Seeder
 * Targets DATABASE_URL_PREVIEW (Neon preview branch).
 * Safe: uses fake emails only, no real client data.
 * Run: cd tech-pwa && npx tsx scripts/seed-test-data.ts
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { employees, jobs } from '../src/lib/schema';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const url = process.env.DATABASE_URL_PREVIEW;
if (!url) {
  throw new Error('DATABASE_URL_PREVIEW not set in .env.local — cannot seed preview branch.');
}

const sql = neon(url);
const db = drizzle(sql);

// ── Test tech credentials ─────────────────────────────────────────────────────
const TEST_BADGE = 'T01';
const TEST_PIN   = '1234';
const TEST_NAME  = 'Test Tech (Validation)';

// hashPin mirrors login/route.ts: sha256(pin)
const pinHash = crypto.createHash('sha256').update(TEST_PIN).digest('hex');

console.log(`[seed] Seeding test tech: badge=${TEST_BADGE}, pin=${TEST_PIN}`);
console.log(`[seed] pinHash: ${pinHash}`);
console.log(`[seed] Target DB: ${url.slice(0, 40)}...`);

// ── Upsert test tech ──────────────────────────────────────────────────────────
const existing = await db.select().from(employees).where(eq(employees.badge, TEST_BADGE));

let techId: number;
if (existing.length > 0) {
  techId = existing[0].id;
  await db.update(employees)
    .set({ name: TEST_NAME, pinHash, orgId: 'APT-CA' })
    .where(eq(employees.badge, TEST_BADGE));
  console.log(`[seed] Updated existing tech id=${techId}`);
} else {
  const inserted = await db.insert(employees).values({
    badge: TEST_BADGE,
    name: TEST_NAME,
    orgId: 'APT-CA',
    pinHash,
  }).returning({ id: employees.id });
  techId = inserted[0].id;
  console.log(`[seed] Inserted new tech id=${techId}`);
}

// ── Upsert test job ───────────────────────────────────────────────────────────
// Job is filtered by jobs.tech === session.badge (see /api/field/jobs/route.ts)
// Uses fake emails only — no real RM or tenant data.

const todayLA = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Los_Angeles',
  year: 'numeric', month: '2-digit', day: '2-digit'
}).format(new Date());

const TEST_JOB_LEAD_ID = 'TEST-VALIDATION-001';

const existingJob = await db.select().from(jobs).where(eq(jobs.leadId, TEST_JOB_LEAD_ID));

if (existingJob.length > 0) {
  await db.update(jobs)
    .set({
      tech: TEST_BADGE,
      employeeId: techId,
      status: 'Scheduled',
      scheduledDate: todayLA,
    })
    .where(eq(jobs.leadId, TEST_JOB_LEAD_ID));
  console.log(`[seed] Updated existing test job leadId=${TEST_JOB_LEAD_ID}`);
} else {
  await db.insert(jobs).values({
    leadId: TEST_JOB_LEAD_ID,
    tech: TEST_BADGE,
    employeeId: techId,
    status: 'Scheduled',
    scheduledDate: todayLA,
    scheduledTime: '09:00',
    address: '123 Validation Test St',
    unit: 'Unit 1',
    rmName: 'Test RM',
    rmEmail: 'test-rm@test.local',
    tenantName: 'Test Tenant',
    tenantEmail: 'test-tenant@test.local',
    tenantPhone: '555-000-0000',
    priority: 'ROUTINE',
    emailType: 'GENERAL',
    category: 'GENERAL',
    orgId: 'APT-CA',
    notes: 'VALIDATION TEST JOB — safe to delete after go-live validation sprint',
  });
  console.log(`[seed] Inserted test job leadId=${TEST_JOB_LEAD_ID}`);
}

console.log('[seed] Done. Test tech and job are in the preview Neon branch.');
console.log(`[seed] Login credentials: badge=${TEST_BADGE}, pin=${TEST_PIN}`);
```

---

### Task 4 — Run the seed script

```powershell
cd tech-pwa && npx tsx scripts/seed-test-data.ts
```

Paste the full console output here: `______`

Verify:
- No error thrown
- `[seed] Done.` line appears
- `pinHash` logged (64 hex chars)
- `Target DB` line shows `DATABASE_URL_PREVIEW` (not dev branch URL)

Then confirm the health check on the Preview URL:
```
curl https://<PREVIEW_URL>/api/health
```
Must return: `{"status":"ok","db":"ok","timestamp":"..."}`. If this returns anything else — STOP and flag to Claude Code before continuing.

---

### Task 5 — Flow 1: Tech Login (mobile browser or Chrome DevTools mobile emulation)

Open the Preview URL in a mobile browser (or Chrome DevTools → Toggle device toolbar → iPhone 12 Pro).

Navigate to `/login`. Enter:
- Badge: `T01`
- PIN: `1234`

Expected: redirect to `/jobs`.

Evidence to record in `go_live_validation.txt`:
```
Flow 1 — Tech Login
URL tested: ______
Badge/PIN: T01 / 1234
Result: PASS / FAIL
If PASS: redirected to ______ (must be /jobs)
If FAIL: error observed: ______
Network: POST /api/field/auth/login → status ______ body excerpt: ______
```

---

### Task 6 — Flow 2: Job Queue

After login, the `/jobs` page should display the test job (`TEST-VALIDATION-001`, address `123 Validation Test St`, status `Scheduled`).

Evidence:
```
Flow 2 — Job Queue
Job TEST-VALIDATION-001 visible: yes / no
Job address shown: ______
Job status shown: ______
Network: GET /api/field/jobs → status ______ job count: ______
```

---

### Task 7 — Flow 3: Clock In

Tap the test job. Find the clock-in button. Clock in.

Expected: `POST /api/field/clock-in` → 200, time record created in Neon.

Evidence:
```
Flow 3 — Clock In
Network: POST /api/field/clock-in → status ______ body: ______
UI state after clock-in: ______
```

---

### Task 8 — Flow 4: Break Start

Tap "Start Break" (or equivalent UI control).

Expected: `POST /api/field/break/start` → 200.

Evidence:
```
Flow 4 — Break Start
Network: POST /api/field/break/start → status ______ body: ______
UI state: ______
```

---

### Task 9 — Flow 5: Break End + Attestation

End the break. If the attestation modal appears, complete it.

Expected: `POST /api/field/break/end` → 200. n8n compliance webhook may fire (internal only — no alert to real people).

Evidence:
```
Flow 5 — Break End + Attestation
Network: POST /api/field/break/end → status ______ body: ______
Attestation modal appeared: yes / no
Attestation submitted: yes / no / n-a
UI state after: ______
```

---

### Task 10 — Flow 6: Job Complete + Attestation

Mark the job complete. Complete any attestation modal.

Expected: `POST /api/field/job/complete` → 200. Job should disappear from active queue or show as Complete.

Evidence:
```
Flow 6 — Job Complete
Network: POST /api/field/job/complete → status ______ body: ______
Attestation modal appeared: yes / no
Job status after: ______
```

---

### Task 11 — Flow 7: Clock Out

Clock out of the shift.

Expected: `POST /api/field/clock-out` → 200.

Evidence:
```
Flow 7 — Clock Out
Network: POST /api/field/clock-out → status ______ body: ______
UI state after: ______
```

---

### Task 12 — Flow 8: Dashboard Live Status (dispatch view)

Open the Preview URL in a desktop browser. Log in as admin (Dev Login button — this is a Google OAuth dispatch login, not a badge/PIN login).

Navigate to `/live`. Confirm the live status view shows tech activity from the flows above (or at minimum loads without error).

Evidence:
```
Flow 8 — Dashboard Live Status
URL: <PREVIEW_URL>/live
Page loads without error: yes / no
Live status data visible: yes / no
Network: GET /api/dashboard/live-status → status ______ body excerpt: ______
```

---

### Task 13 — Flow 9: Archive a Job (dispatch)

From the dispatch dashboard, open any non-test job. Attempt to archive it.

Expected: `PATCH /api/jobs/:id` with `{ status: 'Archived' }` → 200. Job disappears from queue.

Evidence:
```
Flow 9 — Archive Job
Network: PATCH /api/jobs/<id> → status ______ body: ______
Job disappeared from list: yes / no
```

---

### Task 14 — Compile results and flag failures

Write `artifacts/go_live_validation.txt` with all evidence from Tasks 5–13.

At the top of the file, include a summary table:
```
GO-LIVE VALIDATION RESULTS — <date>
Preview URL: ______
Neon branch: DATABASE_URL_PREVIEW (preview branch)

Flow | Description                  | Result
-----|------------------------------|--------
1    | Tech Login                   | PASS / FAIL
2    | Job Queue                    | PASS / FAIL
3    | Clock In                     | PASS / FAIL
4    | Break Start                  | PASS / FAIL
5    | Break End + Attestation      | PASS / FAIL
6    | Job Complete + Attestation   | PASS / FAIL
7    | Clock Out                    | PASS / FAIL
8    | Dashboard Live Status        | PASS / FAIL
9    | Archive Job                  | PASS / FAIL

FAILURES:
(list each failure with: flow number, expected behavior, actual behavior, network evidence)
```

**For every FAIL:** include the full error message, HTTP status, and response body observed. Do not include guesses about root cause — just observed evidence.

---

### Task 15 — Commit seed script + results, push, post to Claude Code

```powershell
cd tech-pwa && npx tsc --noEmit
```
Must be zero errors. If errors: STOP and flag to Claude Code.

```powershell
git add tech-pwa/scripts/seed-test-data.ts artifacts/go_live_validation.txt
git commit -m "feat(validation): go-live validation — seed script + flow results"
git push origin HEAD
```

Post `artifacts/go_live_validation.txt` content to Claude Code. Stop. Wait for next instructions.

**This is a reporting sprint.** Failures do not get fixed here. Claude Code will review results and spec remediation.

---

## What Claude Code does with this report

- PASS on all 9 flows → write the activation plan (real tech credentials, production handoff)
- Any FAIL → spec a remediation sprint targeting only the failing flows
- Repeat until all 9 flows PASS

---

*History in git log. Priorities in `SESSION_STATE.md`.*
