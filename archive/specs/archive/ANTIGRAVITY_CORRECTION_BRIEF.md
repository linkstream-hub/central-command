# ANTIGRAVITY CORRECTION BRIEF
# Priority: CRITICAL — fix these before any new features.
# Every issue below is a regression from the original working dashboard.

---

## BUG 1 — Team Page: All cards show blank names and "UNSCHEDULED"

**Root cause:** `getTechList` API returns objects with shape `{ name, badge, role, phone, active, skills }`.
The frontend reads `tech.techName` which is `undefined` because the field is `name`, not `techName`.

**Fix in `src/app/team/page.tsx`:**

Step 1 — Call BOTH `getTechList` and `getLiveFieldStatus` on load, then merge:
```typescript
const [resTechs, resField] = await Promise.all([
  dashboardRequest('getTechList'),
  dashboardRequest('getLiveFieldStatus')
]);

// Build a map of clocked-in techs by name
const activeMap: Record<string, any> = {};
if (resField.success) {
  (resField.activeTechs || []).forEach((t: any) => {
    activeMap[t.techName] = t;
  });
}

// Map getTechList shape → TechStatus shape
const mapped: TechStatus[] = (resTechs.techs || []).map((t: any) => {
  const live = activeMap[t.name] || null;
  return {
    techId:       t.badge || t.name,
    techName:     t.name,              // <-- the actual fix: use t.name
    status:       live ? (live.hasActiveBreak ? 'ON BREAK' : 'ON JOB') : 'UNSCHEDULED',
    currentAddress: live?.address || '',
    elapsedMin:   live?.elapsedMin || 0,
    jobsRemaining: 0,   // will fill from schedule if needed
    violations:   live?.mealDue ? ['MEAL_BREAK_OVERDUE'] : live?.secondMealDue ? ['SECOND_MEAL_OVERDUE'] : [],
    clockIn:      live?.clockIn || ''
  };
});
setTechs(mapped);
```

---

## BUG 2 — Schedule Page: Wrong week shown + blank tech names + no jobs

**Root causes (three separate issues):**

### 2a — Frontend computes wrong week on Sundays
In `src/app/schedule/page.tsx`, the local date calc:
```typescript
const diffToMon = day === 0 ? -6 : 1 - day; // WRONG: Sunday goes BACK 6 days
```
Fix:
```typescript
const diffToMon = day === 0 ? 1 : 1 - day; // Sunday advances FORWARD to next Monday
```

### 2b — Tech rows show "UNSCHEDULED" with no names
Same root cause as Bug 1. `getTechList` returns `t.name`, frontend reads `tech.techName`.
Apply the same merge fix from Bug 1 — build the merged `TechStatus[]` with `techName: t.name`.

### 2c — All cells show "NO JOBS"
The schedule tries to match `s.techId === tech.techName` after normalizing. This works once Bug 2b is fixed (tech names will exist). But also verify the `getWeekSchedule` API is returning data — open the browser console and log `resSchedule`. If `byTech` is empty, the scheduling sheet for this week has no matching tabs yet. That is expected data state, not a bug.

The job field mapping inside the flatten loop also has issues — the returned job objects use `address` and `serviceCategory` but the flatten reads `j.address` and `j.category`. Fix:
```typescript
flattened.push({
  techId:   techName,
  techName: techName,
  day:      dayName,
  time:     j.scheduledTime || 'TBD',
  address:  j.address       || 'Unknown',
  category: j.serviceCategory || j.category || 'Service', // backend uses serviceCategory
  priority: j.priority      || '4-STANDARD'
});
```

---

## BUG 3 — Job Modal: Left panel shows contact name only, no email thread

**Root cause:** The `loadThread` function in `JobDetailModal.tsx` calls `getGmailThread` but the thread
messages are mapped incorrectly. The backend returns `{ messages: [{ from, fromEmail, date, body, isOutbound }] }`
but the frontend `Message` interface is `{ from, text, timestamp }`. The `body` field is being dropped.

**Fix in `src/components/dashboard/JobDetailModal.tsx`:**

When the thread loads, map correctly:
```typescript
const mapped = (data.messages || []).map((m: any) => ({
  from:      m.from || m.fromEmail || 'Unknown',
  fromEmail: m.fromEmail || '',
  text:      m.body || '',       // backend sends "body", not "text"
  timestamp: m.date || '',       // backend sends "date", not "timestamp"
  isOutbound: m.isOutbound || false
}));
setThread(mapped);
```

Also confirm the thread panel renders `message.text` not `message.body`. If the panel is empty but
the array is populated, the render is reading the wrong field name.

If `job.gmailMsgId` is empty for a given job, show:
```
No email thread — this job was entered manually or the original email has been archived.
```
Do NOT show a blank panel.

---

## BUG 4 — Messages Page: Disconnected from jobs, "Unknown Contact" for known senders

The standalone Messages inbox is the wrong UX model. Dispatchers work FROM jobs, not FROM emails.
The original system had email embedded inside the job modal. Do not replace the job modal thread.

**Required changes to `src/app/messages/page.tsx`:**

1. The "LINK TO JOB" button must actually navigate to `/live` with the job pre-selected. Currently it renders but does nothing. Wire it: when clicked, push to router `/live?jobId=<matched_job_id>` and the live page should open the job modal for that job.

2. "Unknown Contact" for `maintenance@laphamcompany.com` — this is the Lapham Company maintenance dispatcher. Map known domains in a lookup:
```typescript
function resolveContactName(email: string, rawName: string): string {
  if (rawName && rawName !== 'Unknown') return rawName;
  const domain = email.split('@')[1] || '';
  const domainMap: Record<string, string> = {
    'laphamcompany.com':      'Lapham Company',
    'aptmaintenanceinc.com':  'APT Maintenance',
  };
  return domainMap[domain] || email;
}
```

3. The Messages page is LOW PRIORITY. The job modal thread is the primary communication surface. Only fix the two items above — do not rebuild this page.

---

## BUG 5 — Dispatcher Notes shows internal sync metadata

The notes field in job cards/modals was showing `[Synced from scheduling sheet 2026-04-17]`.
This has been fixed in the backend (DashboardAPI.gs) — those tags are now stripped before the API
returns the notes field. No frontend change needed. Just confirm notes look clean after next deploy.

---

## DEPLOYMENT NOTE

After making the above fixes:
1. `cd tech-pwa && npm run build` — confirm zero TypeScript errors
2. Push to main — Vercel auto-deploys
3. Test in order: Team page → Schedule page → click a job with a gmailMsgId → confirm thread loads

The original Apps Script dashboard at the Apps Script URL remains the production fallback until
the Vercel dashboard passes a full dispatcher workflow test with Robert.
