# SPEC: Phase 3 — DashboardAPI Migration to Next.js + Neon
# Migrates read-heavy GAS actions to Next.js routes backed by Neon.
# Owner: AG | Reviewer: Claude Code | Branch: feat/p3-dashboardapi-migration

---

## GOAL

Replace DashboardAPI.gs as the primary data source for the CC2.0 frontend. Every action listed below moves from `/api/gas` → GAS → Sheets to a Next.js route that queries Neon directly. This unblocks Phase 4 (TechPWA migration), unblocks 7 E2E fixme tests, and removes GAS as a runtime dependency for the main data flows.

**Success criteria:** After this sprint, the dispatch page, schedule page, field status panel, and notification feed all read from Neon with zero GAS calls.

---

## WHAT'S ALREADY BUILT (do not rebuild)

| Route | Covers | Notes |
|---|---|---|
| `GET /api/jobs` | `getDispatchData` | Built, but NOT in MIGRATED_ACTIONS — wired by Task 1 |
| `GET /api/techs` | `getTechList` | Live and wired in MIGRATED_ACTIONS |
| `PATCH /api/jobs/[jobId]` | `updateJob` | Live, special-cased in dashboard-api.ts |
| `POST /api/comms/[jobId]` | `replyToThread` | Live, special-cased |
| `POST /api/push/subscribe` | `savePushSubscription` | Live, handled separately |

---

## WHAT STAYS IN GAS (do NOT migrate in this sprint)

These actions require GAS-only capabilities or Sheets not yet in Neon:

- `createManualJob` — writes to Dispatch Queue sheet; no Neon→Sheets sync path yet
- `getGmailThread`, `getDraftReply`, `replyToThread`, `getUnprocessedThreads`, `markThreadProcessed` — Gmail API
- `validatePasscode` — Script Properties
- `suggestTechs` — complex scoring against Historical Assignments sheet
- `getTradeDurations`, `getTechAvailability`, `getCalendarData` — TOM sheet / Trade Durations sheet
- `getTimeOffRequests`, `submitTimeOffRequest`, `approveTimeOff`, `denyTimeOff` — TOM sheet
- `getTimecardApprovalQueue`, `approveTimecard`, `disputeTimecard` — Time Records sheet
- `getFeedback`, `submitFeedback`, `updateFeedbackStatus` — Dispatcher Feedback sheet
- `logSentinelEvent`, `logComplianceAnomalies`, `logWcScanResult`, `logStaleJobAlert` — Sentinel write-backs
- `getAvailableSlots`, `tenantSelfSchedule`, `generateScheduleLink` — tenant self-scheduling

---

## AUTH PATTERN — apply to every new route

```typescript
const session = await auth();
const apiKey = req.headers.get('x-api-key');
const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
if (!session && !isApiKeyAuth) {
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}
```

---

## SHARED HELPER — extract before writing new routes

Both `/api/jobs/route.ts` and `/api/jobs/[jobId]/route.ts` (Task 2) will need to map a Neon `jobs` row to the `Job` interface. Extract this into `tech-pwa/src/lib/job-mapper.ts` to avoid duplication.

```typescript
// tech-pwa/src/lib/job-mapper.ts
import type { Job } from './types';
import type { jobs } from './schema';
import type { InferSelectModel } from 'drizzle-orm';

type NeonJob = InferSelectModel<typeof jobs>;

export function mapNeonJobToJob(row: NeonJob, opts?: { clockedInAt?: string | null; activeRecordId?: string | null }): Job {
  return {
    rowIndex:          undefined,
    jobId:             row.jobId,
    priority:          (row.priority || '4-STANDARD') as Job['priority'],
    serviceCategory:   row.category || '',
    address:           row.address || '',
    unit:              row.unit || '',
    description:       row.description || '',
    scheduledDate:     row.scheduledDate || '',
    scheduledTime:     row.scheduledTime || '',
    estimatedHours:    Number(row.estHours || 0),
    status:            (row.status || 'Needs Review') as Job['status'],
    rmName:            row.rmName || '',
    rmEmail:           row.rmEmail || '',
    accessInfo:        row.accessInfo || '',
    tenantName:        row.tenantName || '',
    tenantPhone:       row.tenantPhone || '',
    tenantEmail:       row.tenantEmail || '',
    assignedTech:      row.tech || '',
    notes:             row.notes || '',
    gmailMsgId:        row.gmailMsgId || '',
    emailType:         row.emailType || '',
    preferredTiming:   row.timing || '',
    estimateNeeded:    row.estimate || '',
    pteGranted:        (row.pte || undefined) as Job['pteGranted'],
    tenantPrefContact: row.tenantPref || '',
    tenantHasPets:     row.tenantPets || '',
    timestamp:         row.timestamp ? row.timestamp.toISOString() : '',
    clockedInAt:       opts?.clockedInAt ?? null,
    activeRecordId:    opts?.activeRecordId ?? null,
  };
}
```

---

## TASKS

### Task 1 — Extract `mapNeonJobToJob` into `src/lib/job-mapper.ts`

Create `tech-pwa/src/lib/job-mapper.ts` with the helper above.

Then update `tech-pwa/src/app/api/jobs/route.ts` to import and use it:
```typescript
import { mapNeonJobToJob } from '@/lib/job-mapper';
// Replace the inline mapping block:
const allJobs: Job[] = results.map(({ job, activeRecord }) =>
  mapNeonJobToJob(job, {
    clockedInAt:    activeRecord?.clockIn ? activeRecord.clockIn.toISOString() : null,
    activeRecordId: activeRecord?.recordId || null,
  })
);
```

Run `npx tsc --noEmit` after this task — zero errors required before proceeding.

---

### Task 2 — Wire `getDispatchData` to existing `/api/jobs` GET

In `tech-pwa/src/lib/dashboard-api.ts`:

**2a.** Expand `MIGRATED_ACTIONS`:
```typescript
const MIGRATED_ACTIONS: Record<string, string> = {
  getTechList:     '/api/techs',
  getDispatchData: '/api/jobs',
};
```

**2b.** Remove the revert comment block (approximately lines 507–512 in dashboard-api.ts):
```typescript
// DELETE these lines:
// Neon read path: getDispatchData reverted to DashboardAPI.gs (Sheet source of truth)
// Reason: syncJobToNeon was silently failing (DASHBOARD_API_URL Script Property not set),
// so Neon jobs table was stale. Re-enable only after sync pipeline is verified end-to-end.
```

The `/api/jobs` GET response already returns `{ success, source, jobs, stats }`. The normalization block `if (action === 'getDispatchData' && Array.isArray(data.jobs))` already handles it correctly — no changes needed there.

---

### Task 3 — Add `GET /api/jobs/[jobId]` and wire `getJobById`

**3a.** Add a GET export to `tech-pwa/src/app/api/jobs/[jobId]/route.ts`:

```typescript
import { mapNeonJobToJob } from '@/lib/job-mapper';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { jobId } = await params;
    const results = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    if (!results[0]) {
      return NextResponse.json({ success: false, error: 'JOB_NOT_FOUND' }, { status: 404 });
    }
    return NextResponse.json({ success: true, source: 'neon', job: mapNeonJobToJob(results[0]) });
  } catch (error) {
    console.error('[GET /api/jobs/[jobId]] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
```

**3b.** Add a special case in `dashboard-api.ts` (before the `MIGRATED_ACTIONS` block, with the other special cases):
```typescript
if (action === 'getJobById' && payload.jobId) {
  try {
    const response = await fetch(`/api/jobs/${encodeURIComponent(String(payload.jobId))}`);
    data = await response.json();
  } catch (e) {
    console.error(`[NEON] GET /api/jobs/${payload.jobId} failed:`, e);
  }
}
```

---

### Task 4 — Create `GET /api/schedule/today`

Create `tech-pwa/src/app/api/schedule/today/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { and, eq, ne } from 'drizzle-orm';
import { mapNeonJobToJob } from '@/lib/job-mapper';
import type { Job } from '@/lib/types';

export async function GET(req: Request) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
    const today = formatter.format(new Date());

    const rows = await db.select().from(jobs).where(
      and(
        eq(jobs.scheduledDate, today),
        ne(jobs.status, 'Archived'),
        ne(jobs.status, 'Complete')
      )
    );

    const byTech: Record<string, Job[]> = {};
    const unassigned: Job[] = [];

    rows.forEach(row => {
      const job = mapNeonJobToJob(row);
      if (!row.tech) { unassigned.push(job); return; }
      const names = row.tech.includes(',')
        ? row.tech.split(',').map(n => n.trim()).filter(Boolean)
        : [row.tech];
      names.forEach(name => {
        if (!byTech[name]) byTech[name] = [];
        byTech[name].push(job);
      });
    });

    return NextResponse.json({ success: true, source: 'neon', date: today, byTech, unassigned });
  } catch (error) {
    console.error('[GET /api/schedule/today] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
```

---

### Task 5 — Add `getTodaySchedule` to MIGRATED_ACTIONS

In `dashboard-api.ts`:
```typescript
const MIGRATED_ACTIONS: Record<string, string> = {
  getTechList:       '/api/techs',
  getDispatchData:   '/api/jobs',
  getTodaySchedule:  '/api/schedule/today',
};
```

The GAS response shape was `{ success, date, byTech, unassigned }`. The new route returns the same shape. No normalization changes needed.

---

### Task 6 — Create `GET /api/schedule/week`

Create `tech-pwa/src/app/api/schedule/week/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobs, techs } from '@/lib/schema';
import { and, inArray, ne } from 'drizzle-orm';
import { mapNeonJobToJob } from '@/lib/job-mapper';
import type { Job } from '@/lib/types';

function buildWeekDates(weekStart?: string): string[] {
  const dates: string[] = [];
  const cursor = new Date((weekStart || new Date().toISOString().slice(0, 10)) + 'T12:00:00');
  while (dates.length < 5) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      dates.push(new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric', month: '2-digit', day: '2-digit'
      }).format(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

export async function GET(req: NextRequest) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const weekStart = req.nextUrl.searchParams.get('weekStart') ?? undefined;
    const weekDates = buildWeekDates(weekStart);

    const [jobRows, techRows] = await Promise.all([
      db.select().from(jobs).where(
        and(
          inArray(jobs.scheduledDate, weekDates),
          ne(jobs.status, 'Archived')
        )
      ),
      db.select().from(techs).where(/* isActive */ (() => {
        const { eq } = require('drizzle-orm');
        return eq(techs.isActive, true);
      })()),
    ]);

    const byTech: Record<string, Record<string, Job[]>> = {};
    const unassigned: Job[] = [];

    // Seed byTech with all active techs
    techRows.forEach(t => { byTech[t.name] = {}; });

    jobRows.forEach(row => {
      const job = mapNeonJobToJob(row);
      if (!row.scheduledDate) return;
      if (!row.tech) { unassigned.push(job); return; }
      const names = row.tech.includes(',')
        ? row.tech.split(',').map(n => n.trim()).filter(Boolean)
        : [row.tech];
      names.forEach(name => {
        if (!byTech[name]) byTech[name] = {};
        if (!byTech[name][row.scheduledDate!]) byTech[name][row.scheduledDate!] = [];
        byTech[name][row.scheduledDate!].push(job);
      });
    });

    const techList = techRows.map(t => ({
      techId:   t.badge || String(t.id),
      techName: t.name,
      jobsRemaining: 0,
      badge:    t.badge || '',
      rank:     t.rank || '',
      skills: {
        Carpentry:         t.carpentry || 0,
        Plumbing:          t.plumbing || 0,
        Electrical:        t.electrical || 0,
        'Finish Carpentry': t.finishCarp || 0,
        Structural:        t.structural || 0,
        Landscaping:       t.landscaping || 0,
        Janitorial:        t.janitorial || 0,
      },
    }));

    return NextResponse.json({
      success: true,
      source: 'neon',
      week: { start: weekDates[0], end: weekDates[weekDates.length - 1] },
      byTech,
      unassigned,
      techs: techList,
    });
  } catch (error) {
    console.error('[GET /api/schedule/week] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
```

**Note on the `require` workaround:** The `inArray` + `ne` + `eq` imports are all from `drizzle-orm` — import them all at the top of the file. Remove the inline `require()` shown above; that was illustrative. Final file must use ES imports only.

---

### Task 7 — Add `getWeekSchedule` special case to dashboard-api.ts

`getWeekSchedule` passes `{ weekStart }` as POST body payload, but the route is a GET with a query param. Add a special case:

```typescript
if (action === 'getWeekSchedule') {
  try {
    const weekStart = (payload.weekStart as string) || '';
    const url = weekStart ? `/api/schedule/week?weekStart=${encodeURIComponent(weekStart)}` : '/api/schedule/week';
    const response = await fetch(url);
    data = await response.json();
  } catch (e) {
    console.error('[NEON] GET /api/schedule/week failed:', e);
  }
}
```

---

### Task 8 — Create `GET /api/field/live`

Create `tech-pwa/src/app/api/field/live/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { techs, timeRecords } from '@/lib/schema';
import { and, eq, isNull, gte } from 'drizzle-orm';

export async function GET(req: Request) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const now = new Date();
    const todayLA = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(now);

    // Today midnight Pacific time as UTC timestamp
    const todayStart = new Date(todayLA + 'T00:00:00-07:00');

    const [techRows, recordRows] = await Promise.all([
      db.select().from(techs).where(eq(techs.isActive, true)),
      db.select().from(timeRecords).where(gte(timeRecords.clockIn, todayStart)),
    ]);

    // Build active tech map (badge → { techId, techName })
    const activeTechMap: Record<string, { techId: string; techName: string }> = {};
    techRows.forEach(t => {
      if (t.badge) activeTechMap[t.badge] = { techId: t.badge, techName: t.name };
    });

    // Priority: active > on-break > complete
    const STATUS_PRIORITY: Record<string, number> = { active: 3, 'on-break': 2, complete: 1 };
    const techRecords: Record<string, {
      techId: string; techName: string; status: string;
      minutesWorked: number; jobAddress?: string; clockInTime: string; _clockIn: Date;
    }> = {};

    recordRows.forEach(rec => {
      if (!rec.clockIn) return;
      const techId = rec.techId;
      let status: string;
      let minutesWorked: number;

      if (rec.clockOut) {
        const msSinceOut = now.getTime() - rec.clockOut.getTime();
        if (msSinceOut > 4 * 60 * 60 * 1000) return; // > 4h ago — omit
        status = 'complete';
        minutesWorked = Math.floor((rec.clockOut.getTime() - rec.clockIn.getTime()) / 60000);
      } else if (rec.breakStart && !rec.breakEnd) {
        status = 'on-break';
        minutesWorked = Math.floor((now.getTime() - rec.clockIn.getTime()) / 60000);
      } else {
        status = 'active';
        minutesWorked = Math.floor((now.getTime() - rec.clockIn.getTime()) / 60000);
      }

      const jobAddress = rec.unit ? `${rec.address} #${rec.unit}` : rec.address || undefined;
      const existing = techRecords[techId];
      const newPri = STATUS_PRIORITY[status] || 0;
      const oldPri = existing ? (STATUS_PRIORITY[existing.status] || 0) : -1;

      if (!existing || newPri > oldPri || (newPri === oldPri && rec.clockIn > existing._clockIn)) {
        techRecords[techId] = {
          techId,
          techName: rec.techName || activeTechMap[techId]?.techName || '',
          status,
          minutesWorked,
          jobAddress,
          clockInTime: rec.clockIn.toISOString(),
          _clockIn: rec.clockIn,
        };
      }
    });

    // Build output
    const result = Object.values(techRecords).map(({ _clockIn, ...r }) => r);

    // Append unassigned active techs
    Object.values(activeTechMap).forEach(({ techId, techName }) => {
      if (!techRecords[techId]) {
        result.push({ techId, techName, status: 'unassigned', minutesWorked: 0 });
      }
    });

    return NextResponse.json({ success: true, source: 'neon', techs: result });
  } catch (error) {
    console.error('[GET /api/field/live] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
```

---

### Task 9 — Create `GET /api/field/compliance`

Create `tech-pwa/src/app/api/field/compliance/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const CA_REST_WARNING  = 240;
const CA_MEAL_WARNING  = 300;
const CA_SECOND_MEAL   = 570;

export async function GET(req: Request) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    // Reuse field/live route logic by fetching internally
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.startsWith('localhost') ? 'http' : 'https';
    const liveRes = await fetch(`${protocol}://${host}/api/field/live`, {
      headers: { 'x-api-key': process.env.DASHBOARD_API_KEY || '' },
    });
    const liveData = await liveRes.json();
    if (!liveData.success) return NextResponse.json(liveData, { status: 502 });

    const records = liveData.techs.map((t: {
      techId: string; techName: string; minutesWorked?: number; status?: string;
    }) => {
      const elapsed = t.minutesWorked || 0;
      const onBreak = t.status === 'on-break';
      const violations: string[] = [];
      if (elapsed >= CA_SECOND_MEAL) violations.push('SECOND_MEAL_OVERDUE');
      else if (elapsed >= CA_MEAL_WARNING) violations.push('MEAL_BREAK_OVERDUE');
      else if (elapsed >= CA_REST_WARNING) violations.push('REST_BREAK_DUE');

      const complianceStatus =
        violations.includes('SECOND_MEAL_OVERDUE') ? 'CRITICAL' :
        violations.includes('MEAL_BREAK_OVERDUE')  ? 'MEAL_DUE'  :
        violations.includes('REST_BREAK_DUE')       ? 'REST_DUE'  : 'OK';

      return {
        techId: t.techId,
        techName: t.techName,
        elapsedMin: elapsed,
        onBreak,
        status: complianceStatus,
        violations,
        thresholds: { restAt: CA_REST_WARNING, mealAt: CA_MEAL_WARNING, secondMealAt: CA_SECOND_MEAL },
      };
    });

    return NextResponse.json({ success: true, source: 'neon', records });
  } catch (error) {
    console.error('[GET /api/field/compliance] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
```

---

### Task 10 — Wire field routes in MIGRATED_ACTIONS

In `dashboard-api.ts`:
```typescript
const MIGRATED_ACTIONS: Record<string, string> = {
  getTechList:        '/api/techs',
  getDispatchData:    '/api/jobs',
  getTodaySchedule:   '/api/schedule/today',
  getLiveFieldStatus: '/api/field/live',
  getComplianceStatus:'/api/field/compliance',
};
```

`getWeekSchedule` was handled as a special case in Task 7 — do NOT add it to MIGRATED_ACTIONS (would conflict).

---

### Task 11 — Create `GET /api/jobs/history`

Create `tech-pwa/src/app/api/jobs/history/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { ilike, or } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const address = req.nextUrl.searchParams.get('address');
    if (!address) {
      return NextResponse.json({ success: false, error: 'address required' }, { status: 400 });
    }

    const rows = await db.select({
      timestamp: jobs.timestamp,
      tech:      jobs.tech,
      category:  jobs.category,
      status:    jobs.status,
      notes:     jobs.notes,
      address:   jobs.address,
    }).from(jobs).where(
      ilike(jobs.address, `%${address}%`)
    ).limit(50);

    const matches = rows.map(r => ({
      source:   'Neon',
      date:     r.timestamp ? r.timestamp.toISOString() : '',
      tech:     r.tech || '',
      category: r.category || '',
      status:   r.status || '',
      notes:    (r.notes || '').substring(0, 200),
    })).sort((a, b) => b.date.localeCompare(a.date));

    return NextResponse.json({
      success: true, source: 'neon',
      address, total: matches.length, matches,
    });
  } catch (error) {
    console.error('[GET /api/jobs/history] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
```

---

### Task 12 — Add `getJobHistory` special case in dashboard-api.ts

```typescript
if (action === 'getJobHistory' && payload.address) {
  try {
    const url = `/api/jobs/history?address=${encodeURIComponent(String(payload.address))}`;
    const response = await fetch(url);
    data = await response.json();
  } catch (e) {
    console.error('[NEON] GET /api/jobs/history failed:', e);
  }
}
```

---

### Task 13 — Create `GET /api/notifications`

Create `tech-pwa/src/app/api/notifications/route.ts`.

This aggregates two signal types from Neon:
1. **Stale PTE jobs**: status = 'PTE Required' AND timestamp older than 3 days
2. **Timecard pending**: time_records with `supervisor_status IS NULL` and clockOut set (today - 7 days)

```typescript
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobs, timeRecords } from '@/lib/schema';
import { and, eq, isNull, lte, isNotNull } from 'drizzle-orm';

export async function GET(req: Request) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    const [staleJobs, pendingTimecards] = await Promise.all([
      db.select({ jobId: jobs.jobId, address: jobs.address, timestamp: jobs.timestamp })
        .from(jobs)
        .where(and(
          eq(jobs.status, 'PTE Required'),
          lte(jobs.timestamp, threeDaysAgo),
        ))
        .limit(20),
      db.select({ recordId: timeRecords.recordId, techName: timeRecords.techName, clockIn: timeRecords.clockIn })
        .from(timeRecords)
        .where(and(
          isNotNull(timeRecords.clockOut),
          isNull(timeRecords.supervisorStatus),
        ))
        .limit(20),
    ]);

    const notifications = [
      ...staleJobs.map(j => ({
        id:        `stale-${j.jobId}`,
        type:      'STALE_JOB' as const,
        severity:  'warning' as const,
        title:     `Stale PTE Job: ${j.jobId}`,
        body:      `${j.address || 'Unknown address'} has been in PTE Required for 3+ days.`,
        timestamp: j.timestamp?.toISOString() || new Date().toISOString(),
        href:      '/live?tab=pte',
      })),
      ...pendingTimecards.map(r => ({
        id:        `tc-${r.recordId}`,
        type:      'TIMECARD_PENDING' as const,
        severity:  'info' as const,
        title:     `Timecard Pending: ${r.techName || 'Unknown Tech'}`,
        body:      `Time record from ${r.clockIn?.toLocaleDateString() || 'unknown date'} awaiting supervisor approval.`,
        timestamp: r.clockIn?.toISOString() || new Date().toISOString(),
        href:      '/people?tab=timecards',
      })),
    ];

    return NextResponse.json({
      success: true, source: 'neon',
      notifications,
      unreadCount: notifications.length,
    });
  } catch (error) {
    console.error('[GET /api/notifications] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
```

**Note:** `timeRecords.supervisorStatus` maps to the `supervisor_status` column in schema.ts. Verify the column name before writing this task — `grep 'supervisorStatus\|supervisor_status' tech-pwa/src/lib/schema.ts`. If the column is named differently, adjust the import.

---

### Task 14 — Wire `getNotifications` in MIGRATED_ACTIONS

```typescript
const MIGRATED_ACTIONS: Record<string, string> = {
  getTechList:        '/api/techs',
  getDispatchData:    '/api/jobs',
  getTodaySchedule:   '/api/schedule/today',
  getLiveFieldStatus: '/api/field/live',
  getComplianceStatus:'/api/field/compliance',
  getNotifications:   '/api/notifications',
};
```

The GAS response shape was `{ success, notifications, unreadCount }`. New route returns same shape. The `getNotifications` action in dashboard-api.ts passes `{ userId, role }` in payload — the new Neon route ignores these (it returns all relevant notifications, not user-scoped). This is acceptable for Phase 3.

---

### Task 15 — Add API key auth to `GET /api/jobs`

In `tech-pwa/src/app/api/jobs/route.ts`, the GET handler currently only checks `auth()`. Add the API key path:

```typescript
export async function GET(req: Request) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  // ... rest unchanged
}
```

---

### Task 16 — Add API key auth to `GET /api/techs`

Same pattern as Task 15. In `tech-pwa/src/app/api/techs/route.ts`:

```typescript
export async function GET(req: Request) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  // ... rest unchanged
}
```

---

### Task 17 — Unblock E2E fixme tests

The following tests are explicitly blocked on Phase 3 routes being live:

**`tech-pwa/tests/e2e/dispatch.spec.ts`**
The entire describe block is `fixme` with: `"blocked on CC3.0 Phase 3 (/live fetches from DashboardAPI.gs CF Worker, not available in CI)"`.

After Task 2 (`getDispatchData` → `/api/jobs`), the `/live` page reads from Neon. Remove the `fixme` from the describe block and implement the test using the real data flow. The test must:
- Navigate to `/live`
- Verify the page renders (job cards appear or "no jobs" state is shown)
- Verify no unhandled 5xx errors appear in the network log

Do NOT write a test that asserts specific job data — CI uses a test Neon branch whose content is unpredictable.

**`tech-pwa/tests/e2e/scheduling.spec.ts`**
Four tests are marked `fixme` with `"Requires scheduling page to fetch from Neon API — blocked on CC3.0 Phase 3"`.

After Task 4 + Task 6 (schedule routes live), remove the `fixme` from each test and implement:
- Schedule page loads without error
- Week navigation works (previous/next week)
- Tech column headers appear
- Page does not call `/api/gas` for schedule data (verify via `waitForResponse`)

**`tech-pwa/tests/e2e/tenant-loop.spec.ts`**
One test: `"Requires /live job data from Neon — blocked on CC3.0 Phase 3"`. Remove fixme, implement as: navigate to `/live`, verify tenant email badge renders for a job that has tenantEmail set.

**Implementation requirement:** Each unblocked test must pass in CI with `DATABASE_URL_TEST` pointing to the test Neon branch. Do not assert specific job IDs or counts. Assert structure (elements exist) not content.

---

### Task 18 — Update ARCHITECTURE.md

In `docs/ARCHITECTURE.md`, update the **CC2.0 Internal API Routes** table to include all Phase 3 routes. Add a section:

```markdown
### Phase 3 — Migrated from DashboardAPI.gs (Next.js + Neon)
| Route | Method | Auth | Replaces GAS Action |
|---|---|---|---|
| `/api/jobs` | GET | session ∣ API key | `getDispatchData` |
| `/api/jobs/[jobId]` | GET | session ∣ API key | `getJobById` |
| `/api/jobs/[jobId]` | PATCH | session ∣ API key | `updateJob` |
| `/api/schedule/today` | GET | session ∣ API key | `getTodaySchedule` |
| `/api/schedule/week` | GET | session ∣ API key | `getWeekSchedule` |
| `/api/field/live` | GET | session ∣ API key | `getLiveFieldStatus` |
| `/api/field/compliance` | GET | session ∣ API key | `getComplianceStatus` |
| `/api/jobs/history` | GET | session ∣ API key | `getJobHistory` |
| `/api/notifications` | GET | session ∣ API key | `getNotifications` |
| `/api/techs` | GET | session ∣ API key | `getTechList` |

### Still in DashboardAPI.gs (Phase 5 target)
| GAS Action | Reason |
|---|---|
| `createManualJob` | Needs Dispatch Queue sheet write |
| `suggestTechs` | Historical Assignments sheet scoring |
| Gmail actions (6) | Gmail API |
| `validatePasscode` | Script Properties |
| Time Off actions (4) | TOM sheet |
| Timecard approval (3) | Time Records sheet |
| Feedback system (3) | Dispatcher Feedback sheet |
| Sentinel write-backs (4) | Railway Sentinels call GAS directly |
| Tenant scheduling (3) | Complex, public-facing |
```

Also update the **System State** table entry for `DashboardAPI.gs` to reflect Phase 3 migration status.

---

### Task 19 — CF Worker config update (Brandon deploys)

**Context:** `api.aptmaintenanceinc.com` CF Worker proxies to DashboardAPI.gs. Railway Sentinels call this URL to write `logSentinelEvent`, `logComplianceAnomalies`, `logWcScanResult`, `logStaleJobAlert`. Those actions must stay in GAS.

**Change:** Update the CF Worker to proxy to `dispatch.aptmaintenanceinc.com/api/gas` instead of the GAS URL directly. This makes `api.aptmaintenanceinc.com` a stable external endpoint — as more actions migrate off GAS, the Worker destination stays the same (Vercel), and Vercel's `/api/gas` route routes to GAS for unmigrated actions.

The `/api/gas` route already handles this: it forwards the body to GAS with the API key. No Next.js code changes required.

**AG action:** Write the updated CF Worker script to `docs/CF_WORKER_DASHBOARDAPI_UPDATE.md` as a config instruction for Brandon:
```
Target URL to update in Cloudflare Worker environment variable:
  Old: <GAS deployment URL>
  New: https://dispatch.aptmaintenanceinc.com/api/gas
```

**Brandon action (NOT AG):** In the Cloudflare Workers dashboard, update the `DASHBOARD_API_URL` environment variable in the `DashboardAPI` Worker to point to `https://dispatch.aptmaintenanceinc.com/api/gas`.

Document the instruction. AG does not access Cloudflare.

---

### Task 20 — Verify tsc zero errors + contradiction check

Before generating the diff:

1. Run `grep -r 'require(' tech-pwa/src/app/api/schedule/` — confirm no stray `require()` calls left from Task 6 template. Remove any.
2. Confirm all new route files use ES imports only.
3. Run `npx tsc --noEmit` from `tech-pwa/`.
4. Confirm zero errors.

Document: `tsc exit code: ______` (expected: 0)

---

### Task 21 — Generate diff

```powershell
cd tech-pwa && npx tsc --noEmit
git diff main...HEAD > artifacts/ag_diff.txt
```

Files that MUST appear in the diff — nothing else:
- `tech-pwa/src/lib/job-mapper.ts` (new)
- `tech-pwa/src/app/api/jobs/route.ts` (auth update)
- `tech-pwa/src/app/api/jobs/[jobId]/route.ts` (GET added)
- `tech-pwa/src/app/api/techs/route.ts` (auth update)
- `tech-pwa/src/app/api/schedule/today/route.ts` (new)
- `tech-pwa/src/app/api/schedule/week/route.ts` (new)
- `tech-pwa/src/app/api/field/live/route.ts` (new)
- `tech-pwa/src/app/api/field/compliance/route.ts` (new)
- `tech-pwa/src/app/api/jobs/history/route.ts` (new)
- `tech-pwa/src/app/api/notifications/route.ts` (new)
- `tech-pwa/src/lib/dashboard-api.ts` (MIGRATED_ACTIONS + special cases)
- `tech-pwa/tests/e2e/dispatch.spec.ts` (fixme removed)
- `tech-pwa/tests/e2e/scheduling.spec.ts` (fixme removed)
- `tech-pwa/tests/e2e/tenant-loop.spec.ts` (fixme removed)
- `docs/ARCHITECTURE.md` (Phase 3 routes table)
- `docs/CF_WORKER_DASHBOARDAPI_UPDATE.md` (new — config instruction for Brandon)
- `artifacts/ag_test_results.txt` (appended)

If ANY other file appears: stop, flag to Claude Code before proceeding.

Post `ag_diff.txt` to Claude Code. Wait for PASS.

---

### Task 22 (separate session) — Test sprint

Run the dev server (`cd tech-pwa && npm run dev`) and verify each migrated route:

**API smoke tests (curl or browser network tab):**

```
GET /api/jobs           → { success: true, source: 'neon', jobs: [...], stats: {...} }
GET /api/jobs/<id>      → { success: true, source: 'neon', job: {...} }
GET /api/schedule/today → { success: true, source: 'neon', date: '...', byTech: {...} }
GET /api/schedule/week  → { success: true, source: 'neon', week: {...}, byTech: {...}, techs: [...] }
GET /api/field/live     → { success: true, source: 'neon', techs: [...] }
GET /api/field/compliance → { success: true, source: 'neon', records: [...] }
GET /api/jobs/history?address=... → { success: true, source: 'neon', matches: [...] }
GET /api/notifications  → { success: true, source: 'neon', notifications: [...] }
```

For each endpoint, paste into `artifacts/ag_test_results.txt`:
```
Route: GET /api/jobs
HTTP status: ______  (expected: 200)
source field: ______  (expected: 'neon')
jobs count: ______
stats.urgentCount: ______
```

(Repeat for each route above.)

**UI verification:**
- Navigate to `/live` — confirm dispatch cards render, no GAS calls in network tab
- Navigate to `/schedule` — confirm week grid renders, no GAS calls
- Open browser DevTools → Network → filter by `/api/gas` — confirm zero requests for `getDispatchData`, `getTodaySchedule`, `getWeekSchedule`, `getLiveFieldStatus`, `getComplianceStatus`, `getNotifications`

Paste evidence: `GAS calls for migrated actions: ______` (expected: 0)

**E2E run:**
```powershell
cd tech-pwa && npx playwright test
```
Paste the summary line: `______`
Expected: at minimum, the previously-fixme dispatch + scheduling + tenant-loop tests now PASS.

Kill dev server after testing:
```powershell
Get-NetTCPConnection -LocalPort 3000,3001,3010 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
```

Post `ag_test_results.txt` to Claude Code. Wait for clear-to-merge.

---

### Task 23 — Merge after "Clear to merge"

Not before. Merge `feat/p3-dashboardapi-migration` → `main` via PR.

---

## MERGE GATE (Claude Code checklist)

- [ ] `job-mapper.ts` exports `mapNeonJobToJob` and is used in `/api/jobs` and `/api/jobs/[jobId]`
- [ ] `MIGRATED_ACTIONS` includes all 6 actions listed in Task 14
- [ ] `getWeekSchedule`, `getJobById`, `getJobHistory` have special cases (not in MIGRATED_ACTIONS)
- [ ] All new routes use the session + API key auth pattern
- [ ] All new routes return `source: 'neon'` in the response
- [ ] `GET /api/jobs` and `GET /api/techs` have API key auth added
- [ ] No `require()` calls in route files — ES imports only
- [ ] dispatch/scheduling/tenant-loop fixme tests removed and passing
- [ ] tsc zero errors
- [ ] Network tab evidence: zero `/api/gas` calls for migrated actions
- [ ] E2E Playwright summary line present in `ag_test_results.txt`
- [ ] No secrets or UUIDs in `ag_test_results.txt`
- [ ] Diff contains only the 16 files listed above
- [ ] `docs/CF_WORKER_DASHBOARDAPI_UPDATE.md` present (Brandon will deploy separately)
