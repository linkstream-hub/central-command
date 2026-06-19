# ANTIGRAVITY SPEC — S115 DISPATCH FLOW LOCKDOWN
**Status:** Ready for AG implementation
**Sprint type:** Multi-part — UI restructure + new page + label fix + one-time migration
**Branch:** `feat/s115-dispatch-flow`
**Base commit:** run `git rev-parse HEAD` before touching any file — record here: `______`

---

## CONTEXT — WHAT CLAUDE CODE ALREADY DID

These changes are committed to the branch. DO NOT re-implement them:

- **Code.js** — Status names fixed: `"PTE-Pending"` → `"PTE Required"`, `"Approval Needed"` → `"Awaiting Approval"` (at write time + audit report + row coloring)
- **DashboardAPI.gs** — Tenant PTE email instruction corrected: now generates access-coordination copy, not "ask for permission to enter"
- **`drizzle/0004_normalize_job_status_names.sql`** — Data migration SQL created

---

## OBJECTIVE

Four changes ship in one branch:

1. **Status normalization** — one-time API endpoint + call to fix existing Neon jobs with legacy status names
2. **Operations view restructure** — `/live` becomes a triage-only view (Needs Review / PTE Required / Awaiting Approval)
3. **RtS schedule grid** — replace tech-lane grid with clean day×time grid
4. **My Hours page** — `/hours`, badge+PIN auth, shows tech's time records grouped by week
5. **Break label fix** — "Rest Period" → "Start Break"

---

## CONSTRAINT — CONTRADICTION DETECTOR

Before the first commit, verify these literals exist exactly as shown. If any mismatch, STOP and report to Claude Code.

| Literal | Expected file |
|---|---|
| `{shift.status === 'on-break' ? 'End Break' : 'Rest Period'}` | `src/components/ClockedInBar.tsx:167` |
| `rest_period: "Rest Period"` | `src/lib/i18n/en.ts:27` |
| `btn_rest: "Rest Period"` | `src/lib/i18n/en.ts:65` |
| `verifyFieldSession` export | `src/lib/fieldAuth.ts` |
| `<SummaryCards` JSX render | `src/app/live/page.tsx` |
| `<TechAvailabilityPanel` JSX render | `src/app/live/page.tsx` |
| `const phase = !activeJob ? 'COORDINATION'` | `src/components/dashboard/JobDetailModal.tsx` |
| `SchedulingDispatch` import | `src/components/dashboard/JobDetailModal.tsx` |
| `activeStatFilter` state | `src/app/live/page.tsx` |
| `TIME_SLOTS` export | `src/components/dashboard/SchedulePageComponents.tsx` |
| `TechLaneHeader` import | `src/app/schedule/page.tsx` |

---

## PART 1 — STATUS NORMALIZATION (one-time migration)

### What

Existing Neon jobs have legacy status values: `"PTE-Pending"` and `"Approval Needed"`. The frontend filters use `"PTE Required"` and `"Awaiting Approval"`. These jobs don't appear in the correct tabs. This runs once at deploy time.

### Task 1.1 — Create migration route

Create `tech-pwa/src/app/api/admin/normalize-statuses/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const pteResult = await db
    .update(jobs)
    .set({ status: 'PTE Required' })
    .where(eq(jobs.status, 'PTE-Pending'))
    .returning({ id: jobs.id });

  const approvalResult = await db
    .update(jobs)
    .set({ status: 'Awaiting Approval' })
    .where(eq(jobs.status, 'Approval Needed'))
    .returning({ id: jobs.id });

  return NextResponse.json({
    success: true,
    pteFixed: pteResult.length,
    approvalFixed: approvalResult.length,
  });
}
```

### Task 1.2 — Commit, push, wait for Vercel deploy

After committing Part 1 and pushing to `feat/s115-dispatch-flow`, a Vercel preview URL will be generated. Call the endpoint from that URL:

```
curl -s -X POST https://<preview-url>/api/admin/normalize-statuses \
  -H "x-api-key: $DASHBOARD_API_KEY"
```

Paste the response here: `______` (must show `success: true`, non-zero counts)

### Task 1.3 — Remove the migration route

After confirming the call succeeded, delete `route.ts` from `src/app/admin/normalize-statuses/`. Commit the deletion. This endpoint must not exist in production.

---

## PART 2 — OPERATIONS VIEW RESTRUCTURE

**Execute every task in `specs/OPERATIONS_VIEW_SPEC.md` verbatim.**

Read the spec now. Do not paraphrase. Do not skip the contradiction detector. Do not modify scope.

After completing the spec's task list (tasks 1–18), continue here.

---

## PART 3 — RtS SCHEDULE GRID REWORK

**Execute every task in `specs/ANTIGRAVITY_RTS_GRID_SPEC.md` verbatim.**

Read the spec now. Do not paraphrase. Do not skip the completion checklist. Do not modify scope.

After completing the spec's checklist (steps 1–11), continue here.

---

## PART 4 — MY HOURS PAGE

### What

A new page at `/hours` in the Tech PWA. Badge+PIN auth. Shows the authenticated tech's own time records from Neon, grouped by week. Mobile-first, dark theme matching Tech PWA.

### Task 4.1 — Create the API route

Create `tech-pwa/src/app/api/field/hours/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { timeRecords } from '@/lib/schema';
import { eq, desc, and, gte } from 'drizzle-orm';
import { verifyFieldSession } from '@/lib/fieldAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await verifyFieldSession(req);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    // 8 weeks back
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 56);

    const records = await db
      .select()
      .from(timeRecords)
      .where(
        and(
          eq(timeRecords.techId, session.badge),
          gte(timeRecords.clockIn, cutoff)
        )
      )
      .orderBy(desc(timeRecords.clockIn));

    return NextResponse.json({ success: true, records });
  } catch (error) {
    console.error('[hours] error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
```

### Task 4.2 — Create the page

Create `tech-pwa/src/app/hours/page.tsx`.

The page must:
- Use `getSession()` from `@/lib/auth` for badge+PIN auth — if no session, redirect to `/`
- Fetch `GET /api/field/hours` on mount
- Display records **grouped by ISO week** (Mon–Sun, Pacific time)
- Each week group shows: week label (e.g. "Week of May 26"), job count, total hours for the week
- Within each group, each record row shows: address + unit, date (e.g. "Mon May 27"), clock-in → clock-out times (12h format, Pacific), actual hours, break time if > 0
- If `clockOut` is null: show `clockIn` time + "In Progress" instead of hours
- No infinite scroll — just render all records returned by the API
- Use the same dark-surface token scheme as other Tech PWA pages (`bg-[var(--bg-surface)]`, `text-[var(--text-primary)]`, `border-[var(--border-subtle)]`)
- Loading state: spinner centered
- Empty state: "No time records found."
- Page title: "My Hours"

**Week grouping helper:** Use `Intl.DateTimeFormat` with `timeZone: 'America/Los_Angeles'` for all date display. Group by the Monday of each week (`date - weekday + 1`).

**No new component files.** Inline all rendering in `page.tsx`.

### Task 4.3 — Add nav link

In `src/components/TechNav.tsx` (or wherever the Tech PWA bottom nav is defined — read the file first), add a nav item for `/hours` with label "My Hours". Find the nav by searching for other tech nav links like `/jobs` or `/clock`. Use the same icon style as adjacent items.

---

## PART 5 — BREAK LABEL FIX

Three exact changes. Read the files, verify the old strings exist, then replace.

### Task 5.1 — `src/components/ClockedInBar.tsx` line 167

Replace:
```typescript
{shift.status === 'on-break' ? 'End Break' : 'Rest Period'}
```
With:
```typescript
{shift.status === 'on-break' ? 'End Break' : 'Start Break'}
```

### Task 5.2 — `src/lib/i18n/en.ts` line 27

Replace:
```typescript
  rest_period: "Rest Period",
```
With:
```typescript
  rest_period: "Start Break",
```

### Task 5.3 — `src/lib/i18n/en.ts` line 65

Replace:
```typescript
  btn_rest: "Rest Period",
```
With:
```typescript
  btn_rest: "Start Break",
```

---

## TERMINAL TASKS

### Task N-2 — Compile + diff

```
npx tsc --noEmit
```
Zero errors. Then:
```
git push origin HEAD
git diff main...HEAD > artifacts/ag_diff.txt
```
Commit the diff artifact and push. Report one line to Claude Code: "S115 diff at artifacts/ag_diff.txt. tsc: zero errors." Stop. Wait for PASS.

### Task N-1 — Test sprint (separate session after PASS)

Start dev server. Open each of the following and record exact observed evidence:

1. `/live` (Operations view) — open a Needs Review job. Confirm: no date picker, no time picker, no tech picker, no TECH comms tab. Confirm SummaryCards and Field Status panel are gone.
2. `/schedule` — confirm the grid is day×time columns, no tech-lane rows. Drop a job onto a cell — confirm DurationSelectorModal opens.
3. `/hours` — log in as badge T01 / PIN 1234. Confirm page loads, shows time records (or empty state if none), no console errors.
4. Tech PWA job view while clocked in — confirm the break button reads "Start Break" (not "Rest Period").
5. Nav — confirm "My Hours" link appears in tech nav and routes to `/hours`.

Write all results to `artifacts/ag_test_results.txt` with PASS/FAIL per item and specific observed evidence. Kill dev server after testing. Report one line to Claude Code. Stop. Wait for clear-to-merge.

### Task N — Wait for clear-to-merge. Do not merge before it.

---

## DO NOT TOUCH

- `Code.js` — Claude Code already made the GAS fixes
- `dashboard-api/DashboardAPI.gs` — Claude Code already made the GAS fixes
- `tech-pwa/drizzle/` — do not modify migration files
- `src/lib/types.ts` — no changes to `priority` field
- `src/components/dashboard/TechAvailabilityPanel.tsx` — do not delete
- `src/components/dashboard/SchedulingDispatch.tsx` — only conditionally hidden, not deleted
- Any file not listed in a PART above
