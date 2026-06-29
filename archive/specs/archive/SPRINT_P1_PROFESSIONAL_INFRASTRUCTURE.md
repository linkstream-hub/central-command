# SPRINT P1 — Professional Infrastructure Baseline
**Branch:** `feat/p1-professional-infrastructure`
**Author:** Claude Code
**Goal:** Four deliverables that should have been in place from the start: (1) realistic seed data in the Neon dev branch so test sprints use meaningful volume, (2) Sentry error monitoring so production failures are visible, (3) E2E tests running automatically on every PR, (4) NEXT_PUBLIC security fix for the dashboard API key. After this sprint, every future test sprint runs against 40+ jobs across all status types, and production errors surface to Brandon within minutes.

---

## AG Prereqs — Complete Before Implementation Tasks

**Prereq 1 — Merge open Dependabot PRs**
```powershell
gh pr list --repo BGB-CRB-Holdings/central-command --author "app/dependabot" --state open --json number,title
```
For each open PR, merge it:
```powershell
gh pr merge <number> --merge --repo BGB-CRB-Holdings/central-command
```
If any PR has a merge conflict, skip it and note the PR number in `ag_test_results.txt`.

**Prereq 2 — Windows Defender exclusions (elevated PowerShell)**
Open PowerShell as Administrator and run:
```powershell
Add-MpPreference -ExclusionPath "A:\PTOW\1_APT_Central_Command\tech-pwa\node_modules"
Add-MpPreference -ExclusionPath "C:\tmp\apt-cc-next"
Add-MpPreference -ExclusionPath "A:\PTOW\1_APT_Central_Command\tech-pwa\.next"
```
Confirm with: `Get-MpPreference | Select-Object -ExpandProperty ExclusionPath` — all three paths must appear.

**Prereq 3 — Pull main after Dependabot merges**
```powershell
git -C "A:\PTOW\1_APT_Central_Command" checkout main && git pull
git checkout -b feat/p1-professional-infrastructure
```

---

## AG Implementation Tasks

### Task 1 — Audit Sentry current state

Read these files to determine Sentry status before touching anything:
- `tech-pwa/package.json` — check if `@sentry/nextjs` is present and at what version
- `tech-pwa/sentry.client.config.ts` (or `.js`) — check if it exists
- `tech-pwa/sentry.server.config.ts` (or `.js`) — check if it exists
- `tech-pwa/next.config.ts` (or `.js`) — check if `withSentryConfig` wraps the config

Report findings to Claude Code before proceeding to Task 2. Flag: INSTALLED+CONFIGURED, INSTALLED+UNCONFIGURED, or NOT_INSTALLED.

---

### Task 2 — NEXT_PUBLIC security fix (5 minutes)

**File:** `tech-pwa/src/app/api/push/subscribe/route.ts`

Find the line that reads `process.env.NEXT_PUBLIC_DASHBOARD_API_KEY`. Change it to `process.env.DASHBOARD_API_KEY`.

This route is server-side. The `NEXT_PUBLIC_` prefix exposes the key to the browser bundle unnecessarily. The server-only name is already set in Vercel env vars.

**Pass/fail:** `grep -r "NEXT_PUBLIC_DASHBOARD_API_KEY" src/app/api/` → zero results.

---

### Task 3 — Sentry setup

**If INSTALLED+CONFIGURED (from Task 1):** Skip to Task 4. Note in ag_test_results.txt: "Sentry already configured — skipped."

**If INSTALLED+UNCONFIGURED:** 
1. Create `tech-pwa/sentry.client.config.ts`:
```ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  debug: false,
  environment: process.env.NODE_ENV,
});
```
2. Create `tech-pwa/sentry.server.config.ts`:
```ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  debug: false,
  environment: process.env.NODE_ENV,
});
```
3. Wrap `next.config.ts` export with `withSentryConfig`. Read the file first — do not overwrite other config.

**If NOT_INSTALLED:**
1. `npm install @sentry/nextjs`
2. Complete steps 1–3 above.
3. **FLAG TO CLAUDE CODE** — new package install requires review before proceeding.

**Env vars needed (Brandon adds after diff is cleared):**
- `NEXT_PUBLIC_SENTRY_DSN` — from sentry.io free tier project → Settings → Client Keys
- Add to Vercel: Production + Preview

---

### Task 4 — Seed script

**File to create:** `tech-pwa/scripts/seed.ts`

**Purpose:** Truncate the `jobs` table on the Neon dev branch and insert 42 realistic jobs covering every status, priority, and category combination. Never runs against production — guarded by `DATABASE_URL` check.

```ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { jobs } from '../src/lib/schema';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL not set');
if (url.includes('pooler.us-east') && !url.includes('dev')) {
  // Rough guard — flag if this looks like a production URL pattern
  throw new Error('SAFETY: DATABASE_URL does not look like a dev branch. Aborting.');
}

const sql = neon(url);
const db = drizzle(sql);

const STATUSES = [
  'Needs Review', 'Ready to Schedule', 'PTE Required',
  'Awaiting Approval', 'Scheduled', 'In Progress', 'Complete', 'Archived'
];

const PRIORITIES = ['URGENT', 'ROUTINE', 'STANDARD'];
const EMAIL_TYPES = ['GENERAL', 'TURNOVER', 'INSPECTION'];
const CATEGORIES = ['PLUMBING', 'ELECTRICAL', 'LANDSCAPING', 'CARPENTRY', 'HVAC', 'GENERAL'];

const ADDRESSES = [
  '65 Thornton Ave', '1420 Alice St', '500 Grand Ave', '120 Mission St',
  '880 Market St', '2200 Broadway', '411 Oakland Ave', '3300 Telegraph Ave',
  '750 Lakeshore Dr', '199 Fruitvale Ave', '5th & Madison', '920 MacArthur Blvd',
];

const RM_NAMES = ['Jan Blythe', 'David Park', 'Carla Reyes', 'Marcus Webb', 'Priya Nair'];
const TECHS = ['Robert Haile', 'Metkel Tecle', 'Keith Johnson', ''];

const DISTRIBUTION: { status: string; count: number }[] = [
  { status: 'Needs Review',       count: 6 },
  { status: 'Ready to Schedule',  count: 10 },
  { status: 'PTE Required',       count: 4 },
  { status: 'Awaiting Approval',  count: 3 },
  { status: 'Scheduled',          count: 8 },
  { status: 'In Progress',        count: 4 },
  { status: 'Complete',           count: 5 },
  { status: 'Archived',           count: 2 },
];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

async function seed() {
  console.log('Truncating jobs table...');
  await sql`TRUNCATE TABLE jobs RESTART IDENTITY CASCADE`;

  const rows = [];
  let idx = 1;

  for (const { status, count } of DISTRIBUTION) {
    for (let i = 0; i < count; i++) {
      const isScheduled = ['Scheduled', 'In Progress', 'Complete', 'Archived'].includes(status);
      const address = pick(ADDRESSES);
      const tech = isScheduled ? pick(TECHS.filter(Boolean)) : '';
      rows.push({
        jobId:         `APT-SEED-${String(idx).padStart(4, '0')}`,
        priority:      pick(PRIORITIES),
        emailType:     pick(EMAIL_TYPES),
        category:      pick(CATEGORIES),
        address,
        unit:          `UNIT ${Math.floor(Math.random() * 20) + 1}`,
        description:   `${pick(CATEGORIES)} issue requires attention`,
        rmName:        pick(RM_NAMES),
        rmEmail:       `rm${idx}@laphamcompany.com`,
        tenantName:    `Tenant ${idx}`,
        tenantPhone:   `510-555-${String(1000 + idx).padStart(4, '0')}`,
        status,
        tech,
        scheduledDate: isScheduled ? '2026-05-19' : null,
        scheduledTime: isScheduled ? '09:00' : null,
        estHours:      pick([1, 2, 3, 4]),
        entityId:      'apt-ca',
        trackingToken: `seed-token-${idx}`,
      });
      idx++;
    }
  }

  console.log(`Inserting ${rows.length} jobs...`);
  await db.insert(jobs).values(rows);
  console.log('Seed complete.');
}

seed().catch(console.error);
```

**Add npm script to `tech-pwa/package.json`:**
```json
"seed": "tsx scripts/seed.ts"
```

**Install tsx if not present:** `npm install -D tsx` (dev dependency only).

**Run to verify:** `cd tech-pwa && npm run seed` — should log "Seed complete." with no errors.

**Pass/fail:** After running, `SELECT COUNT(*), status FROM jobs GROUP BY status ORDER BY status;` in the Neon console — must show 8 rows with counts matching the distribution above.

---

### Task 5 — E2E tests on CI auto-trigger

**File:** `.github/workflows/e2e.yml`

Read the current file. Change the trigger from `workflow_dispatch` only to also run on `pull_request` targeting `main` when `tech-pwa/**` files change:

```yaml
on:
  workflow_dispatch:
  pull_request:
    branches: [main]
    paths:
      - 'tech-pwa/**'
```

This keeps the manual trigger available while adding automatic execution on PRs. No other changes to the file.

**Pass/fail:** `grep -A 8 "^on:" .github/workflows/e2e.yml` → shows both `workflow_dispatch` and `pull_request` triggers.

---

### Task 6 — TypeScript check and diff

```powershell
cd tech-pwa && npx tsc --noEmit
git diff main...HEAD > artifacts/ag_diff.txt
```

Zero tsc errors required. Post diff to Claude Code, stop. Wait for PASS.

---

### Task 7 — Test sprint (separate session)

Run dev server. Verify:

1. **Seed script** — run `npm run seed`. Open `/live` in browser. Confirm job count is 40+, status groups are all populated. Paste SQL count output from Neon console into `ag_test_results.txt`.
2. **NEXT_PUBLIC fix** — open browser DevTools → Application → Sources → search for `DASHBOARD_API_KEY`. Confirm it does NOT appear in any JS bundle file.
3. **Sentry** — if configured: trigger a deliberate test error (`throw new Error('sentry-test')` in a server action, catch in UI). Confirm event appears in sentry.io dashboard. Paste event ID into `ag_test_results.txt`.
4. **E2E trigger** — confirm `.github/workflows/e2e.yml` has `pull_request` trigger: `grep -A 8 "^on:" .github/workflows/e2e.yml` → paste output.

Kill dev server after testing:
```powershell
$pids = (Get-NetTCPConnection -LocalPort 3000,3001,3002 -State Listen -ErrorAction SilentlyContinue).OwningProcess
$pids | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
```

Post `ag_test_results.txt` to Claude Code. Stop. Wait for "Clear to merge."

---

### Task 8 — Merge after Claude Code issues "Clear to merge." Not before.

---

## Flags to Claude Code

- **Task 1:** Report Sentry status (INSTALLED+CONFIGURED / INSTALLED+UNCONFIGURED / NOT_INSTALLED) before writing any config files.
- **Task 3:** If `@sentry/nextjs` is NOT_INSTALLED, flag before running `npm install` — new package requires Claude Code review.
- **Task 4:** Flag the seed script's DATABASE_URL safety check result when running — confirm it ran against the dev branch, not production.

---

## What Does NOT Change

- Auth flows
- All GAS files (.gs)
- Neon production branch
- Any existing API routes
- Drizzle schema (seed script uses it read-only)
