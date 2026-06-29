# P3-4: TECHPWA.GS → NEXT.JS API ROUTES SPEC
# Branch: feat/p3-4-field-api-nextjs
# Depends on: P3-3 merged (✅ PR #837)
# Written: 2026-05-26 (Session 101)

---

## GOAL

All 11 field tech API endpoints replaced with Next.js + Neon routes. The Tech PWA frontend
stops calling TechPWA.gs. The GAS fallback in `/api/exec` becomes dead code (not removed
until P3-5). TechPWA.gs stays deployed throughout this sprint.

---

## CRITICAL CONTEXT — READ BEFORE WRITING ANYTHING

**Server-side auth gap:** `getSession()` in `src/lib/auth.ts` reads localStorage — client-side only,
useless in a route handler. Every new field route needs a server-side session validator.
You will create `src/lib/fieldAuth.ts` as the foundation for all 11 routes.

**Wrong auth on existing field routes:** `/api/field/live` and `/api/field/compliance` use `auth()`
from `@/auth` (Google OAuth — CC2.0 office staff). Do NOT touch those files. The new field routes
use badge+PIN session tokens only.

**`/api/exec` stays untouched.** It is not modified or removed in this sprint. It becomes dead
code after the frontend is updated, but removing it is P3-5's job.

**Response shape compatibility:** The PWA frontend currently parses responses from GAS. Since P3-4
also updates the frontend, you do NOT need to exactly match GAS response shapes — just make sure
the new routes and updated frontend agree with each other.

**Next.js 16 note:** Route handler APIs differ from training data. Before writing any new
route, skim `node_modules/next/dist/docs/` or the existing routes in `src/app/api/` for
the correct pattern. Follow the pattern in `/api/field/live/route.ts` exactly.

---

## ENV VAR REQUIRED

`N8N_COMPLIANCE_WEBHOOK_URL` — needed by `/api/field/attestation/sign` (server-side only, never
exposed to client). Add to `tech-pwa/.env.local` before Task 11. Brandon must also add to Vercel
before production deploy.

---

## FILES TO CREATE / MODIFY

**New — route handlers (12 files):**
| File | Route |
|---|---|
| `tech-pwa/src/lib/fieldAuth.ts` | — server-side auth helper |
| `tech-pwa/src/app/api/field/auth/login/route.ts` | POST /api/field/auth/login |
| `tech-pwa/src/app/api/field/jobs/route.ts` | GET /api/field/jobs |
| `tech-pwa/src/app/api/field/shift/start/route.ts` | POST /api/field/shift/start |
| `tech-pwa/src/app/api/field/shift/end/route.ts` | POST /api/field/shift/end |
| `tech-pwa/src/app/api/field/shift/status/route.ts` | POST /api/field/shift/status |
| `tech-pwa/src/app/api/field/clock-in/route.ts` | POST /api/field/clock-in |
| `tech-pwa/src/app/api/field/clock-out/route.ts` | POST /api/field/clock-out |
| `tech-pwa/src/app/api/field/break/start/route.ts` | POST /api/field/break/start |
| `tech-pwa/src/app/api/field/break/end/route.ts` | POST /api/field/break/end |
| `tech-pwa/src/app/api/field/job/complete/route.ts` | POST /api/field/job/complete |
| `tech-pwa/src/app/api/field/attestation/sign/route.ts` | POST /api/field/attestation/sign |

**Modified — frontend files** (exact list determined by Task 3 audit):
- Any `.ts` or `.tsx` file under `tech-pwa/src/` referencing `TECH_PWA_GAS_URL`, `/api/exec`,
  or GAS action strings (`clockIn`, `startShift`, `login`, etc.)

**Updated artifacts:**
- `artifacts/ag_diff.txt`
- `artifacts/ag_test_results.txt`
- `specs/PHASE3_P3_4_SPEC.md` (this file — commit to branch)

**DO NOT TOUCH:**
- `tech-pwa/src/app/api/exec/route.ts`
- `tech-pwa/src/app/api/field/live/route.ts`
- `tech-pwa/src/app/api/field/compliance/route.ts`
- Any `.gs` file

Any unexpected file change = STOP and flag to Claude Code.

---

## FIELDAUTH HELPER — REQUIRED SHAPE

`tech-pwa/src/lib/fieldAuth.ts`:

```typescript
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export interface FieldSession {
  employeeId: number;
  badge: string;
  name: string;
  role: string;
  hourlyRate: number | null;
}

export async function verifyFieldSession(req: Request): Promise<FieldSession | null> {
  const auth = req.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : null;
  if (!token) return null;

  const result = await db.select().from(employees)
    .where(eq(employees.sessionToken, token))
    .limit(1);

  const emp = result[0];
  if (!emp) return null;
  if (!emp.tokenExpiry || emp.tokenExpiry < new Date()) return null;
  if (!emp.isActive) return null;

  return {
    employeeId: emp.id,
    badge: emp.badge || '',
    name: emp.name,
    role: emp.role,
    hourlyRate: emp.hourlyRate ?? null,
  };
}
```

Every new field route (except login) starts with:
```typescript
const session = await verifyFieldSession(req);
if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
```

---

## ROUTE SPECIFICATIONS

All routes: `export const dynamic = 'force-dynamic';`

---

### POST /api/field/auth/login

**No auth required** (this IS the auth).

Request body: `{ badge: string, pin: string }`

Logic (pull from existing `/api/exec` login handler — same algorithm):
1. Look up employee by badge in `employees` table
2. Verify PIN: `crypto.createHash('sha256').update(pin).digest('hex')` === `emp.pin_hash`
   - Dev override: if `NODE_ENV !== 'production'` and `pin === '1234'` → valid
   - If `pin_hash` is null → accept `'1234'` as default
3. Generate: `crypto.randomBytes(32).toString('hex')` as session token
4. UPDATE employees SET `session_token`, `token_expiry` (30 days from now)
5. Return session

Response:
```json
{
  "success": true,
  "token": "<hex string>",
  "techId": "<badge>",
  "employeeId": <integer>,
  "techName": "<name>",
  "role": "<role>",
  "expiresAt": "<ISO string>"
}
```

Failure: `{ "success": false, "message": "Invalid badge or PIN" }` (401)

---

### GET /api/field/jobs

**Auth:** verifyFieldSession

Query: Return jobs for the logged-in tech where:
- `employee_id = session.employeeId` OR `tech = session.badge` (covers legacy text-matched jobs)
- `status` NOT IN ('Archived', 'Complete') **OR** (`status = 'Complete'` AND `scheduled_date = today`)
- Order by: priority ASC, scheduled_date ASC

LA date logic (same as `/api/field/live`):
```typescript
const todayLA = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Los_Angeles',
  year: 'numeric', month: '2-digit', day: '2-digit'
}).format(new Date());
```

Response:
```json
{ "success": true, "jobs": [ { ...job fields... } ] }
```

---

### POST /api/field/shift/start

**Auth:** verifyFieldSession

Request body: `{ shiftDate?: string }` (default: today LA date)

Logic:
1. Compute shift_id: `SHIFT-${session.badge}-${shiftDate}`
2. INSERT INTO shifts with ON CONFLICT (shift_id) DO NOTHING
3. If conflict (shift already started today): fetch existing shift and return it

Response:
```json
{ "success": true, "shiftId": "<shift_id>", "startTime": "<ISO>", "alreadyActive": false }
```

---

### POST /api/field/shift/end

**Auth:** verifyFieldSession

Request body: `{ shiftId: string }`

Logic:
1. Look up shift by shift_id WHERE employee_id = session.employeeId
2. If not found or already ended: 404
3. Compute actual_hours: `(now - shift_start) / 3600000` minus total_break_minutes/60
4. UPDATE shifts SET shift_end=now, actual_hours, status='Complete'

Response:
```json
{ "success": true, "shiftId": "<shift_id>", "endTime": "<ISO>", "actualHours": <number> }
```

---

### POST /api/field/shift/status

**Auth:** verifyFieldSession

Request body: `{ shiftDate?: string }` (default: today LA date)

Logic: SELECT from shifts WHERE employee_id = session.employeeId AND shift_date = shiftDate

Response:
```json
{ "success": true, "shift": { "shiftId": "...", "status": "...", "startTime": "...", "endTime": "..." } | null }
```

---

### POST /api/field/clock-in

**Auth:** verifyFieldSession

Request body: `{ jobId: string, lat?: number, lng?: number }`

Logic:
1. Generate recordId: `crypto.randomUUID()`
2. Compute date: today LA date string
3. INSERT INTO time_records: recordId, jobId, techId=session.badge, techName=session.name, employeeId=session.employeeId, clockIn=now, status='active', date, latIn, lngIn, orgId='APT-CA'
4. UPDATE jobs SET status='In Progress' WHERE job_id = jobId

Response:
```json
{ "success": true, "recordId": "<uuid>", "clockInTime": "<ISO>" }
```

---

### POST /api/field/clock-out

**Auth:** verifyFieldSession

Request body: `{ recordId: string, lat?: number, lng?: number }`

Logic:
1. Fetch time record by recordId WHERE techId = session.badge (ownership check)
2. If not found or already clocked out: 404
3. Compute actualHours: `(now - clockIn) / 3600000 - breakMinutes/60`
4. UPDATE time_records SET clockOut=now, actualHours, status='complete', latOut, lngOut
5. Check meal warning: if shift time > 5h with no break → set mealWarning=true

Response:
```json
{ "success": true, "recordId": "<id>", "clockOutTime": "<ISO>", "actualHoursWorked": <number>, "mealBreakWarning": <boolean> }
```

---

### POST /api/field/break/start

**Auth:** verifyFieldSession

Request body: `{ recordId: string }`

Logic:
1. Fetch time record, verify ownership
2. UPDATE time_records SET breakStart=now, status='on-break'
3. INSERT INTO breaks: time_record_id=recordId, break_number=1, break_start=now, break_type='meal', orgId='APT-CA'

Response:
```json
{ "success": true, "breakStart": "<ISO>" }
```

---

### POST /api/field/break/end

**Auth:** verifyFieldSession

Request body: `{ recordId: string }`

Logic:
1. Fetch time record, verify ownership
2. Compute breakMinutes: `Math.round((now - breakStart) / 60000)`
3. UPDATE time_records SET breakEnd=now, breakMinutes, status='active'
4. UPDATE breaks SET break_end=now, break_minutes=breakMinutes WHERE time_record_id=recordId AND break_end IS NULL

Response:
```json
{ "success": true, "breakEnd": "<ISO>", "breakDurationMinutes": <number> }
```

---

### POST /api/field/job/complete

**Auth:** verifyFieldSession

Request body: `{ recordId: string, jobId: string }`

Logic:
1. UPDATE time_records SET status='complete' WHERE recordId
2. UPDATE jobs SET status='Complete' WHERE job_id=jobId
3. INSERT INTO job_performance_history: jobId, employeeId, techName, address, category, completedAt=now, orgId='APT-CA'

Response:
```json
{ "success": true }
```

---

### POST /api/field/attestation/sign

**Auth:** verifyFieldSession

Request body:
```json
{
  "shiftId": "<shift_id string — e.g. SHIFT-badge-date>",
  "attestationText": "<full CA attestation text shown to tech>",
  "mealCompliant": true,
  "restCompliant": true
}
```

Logic:
1. Look up shift by shift_id WHERE employee_id = session.employeeId
2. Compute overtimeHours: if shift.actual_hours > 8 → actual_hours - 8, else 0
3. INSERT INTO attestations: shiftId=shift.id, employeeId=session.employeeId,
   shiftDate=shift.shift_date, attestationText, signedAt=now,
   mealCompliant, restCompliant, overtimeHours,
   ipAddress=req.headers.get('x-forwarded-for'), userAgent=req.headers.get('user-agent'),
   orgId='APT-CA'
   ON CONFLICT (shift_id) DO NOTHING (one attestation per shift — immutable)
4. Fire n8n webhook (non-blocking — do not await, do not fail the request if webhook fails):
   ```typescript
   fetch(process.env.N8N_COMPLIANCE_WEBHOOK_URL!, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       techId: session.badge,
       techName: session.name,
       shiftDate: shift.shift_date,
       mealCompliant,
       restCompliant,
       overtimeHours,
       hourlyRate: session.hourlyRate,
       signedAt: now.toISOString(),
     }),
   }).catch(err => console.error('[attestation/sign] webhook failed:', err));
   ```

Response:
```json
{ "success": true, "attestationId": <integer> }
```

---

## FRONTEND UPDATE PROTOCOL

### Task 3 audit — grep BEFORE touching any frontend file:

```powershell
grep -rn "TECH_PWA_GAS_URL\|api/exec\|action.*:.*login\|action.*:.*clockIn\|action.*:.*clockOut\|action.*:.*startShift\|action.*:.*endShift\|action.*:.*startBreak\|action.*:.*endBreak\|action.*:.*markComplete\|action.*:.*signAttestation\|action.*:.*getJobs\|action.*:.*shiftStatus" tech-pwa/src --include="*.ts" --include="*.tsx"
```

Paste the complete output to Claude Code as part of Task 3 before modifying any file.
The frontend file list in this spec is determined by that audit — NOT assumed in advance.

### Frontend update rules:
- Every call that was `POST /api/exec` with `body.action = 'xxx'` → becomes `POST /api/field/xxx`
- Include `Authorization: Bearer ${token}` header on every field API call
  - Token comes from `JSON.parse(localStorage.getItem('apt_tech_session')).token`
- Login: `POST /api/field/auth/login` with `{ badge, pin }` (no action field)
- Store the returned session in localStorage as `apt_tech_session` (same key, same shape — add `employeeId` to the stored object)

---

## NUMBERED TASK LIST

---

### Task 1 — Branch verify

```powershell
git branch --show-current
```
→ Must output: `feat/p3-4-field-api-nextjs`. If not, STOP.

```powershell
git ls-remote --heads origin feat/p3-4-field-api-nextjs
```
→ Non-empty. If empty: push first.

```powershell
git log main..HEAD --oneline
```
→ If empty on pre-existing branch, rebase from main.

Paste all three: `______`

---

### Task 2 — Add N8N_COMPLIANCE_WEBHOOK_URL to .env.local

Open `tech-pwa/.env.local` and add:
```
N8N_COMPLIANCE_WEBHOOK_URL=<value from n8n — ask Brandon if not known>
```

Confirm the line is present: `______`

Flag to Claude Code: this env var must also be added to Vercel before production deploy.
Brandon handles the Vercel side.

---

### Task 3 — Frontend audit (MANDATORY before any code change)

Run:
```powershell
grep -rn "TECH_PWA_GAS_URL\|/api/exec\|action.*login\|action.*clockIn\|action.*clockOut\|action.*startShift\|action.*endShift\|action.*startBreak\|action.*endBreak\|action.*markComplete\|action.*signAttestation\|action.*getJobs\|action.*shiftStatus" tech-pwa/src --include="*.ts" --include="*.tsx"
```

Paste complete output: `______`

List every file found. Flag any unexpected file to Claude Code before touching it.

---

### Task 4 — Write `tech-pwa/src/lib/fieldAuth.ts`

Implement `verifyFieldSession()` exactly as specified above.
Verify tsc accepts it: `npx tsc --noEmit` → 0 errors after this file alone.

---

### Task 5 — Write `/api/field/auth/login/route.ts`

- POST handler
- No auth required
- Pull PIN hashing logic from `/api/exec/route.ts` (same algorithm — do not reinvent)
- On success: UPDATE employees.session_token + token_expiry, return session
- On failure: 401

Paste the response from a manual test call: `______`

---

### Task 6 — Write `/api/field/jobs/route.ts`

- GET handler
- Auth: verifyFieldSession
- Query jobs by employee_id + badge, exclude Archived (unless completed today)
- Return job list

---

### Task 7 — Write shift routes (3 files)

- `/api/field/shift/start/route.ts`
- `/api/field/shift/end/route.ts`
- `/api/field/shift/status/route.ts`

All POST. All require verifyFieldSession.
shift_id format: `SHIFT-{badge}-{YYYY-MM-DD}` (consistent with P3-2 migration).

---

### Task 8 — Write clock routes (2 files)

- `/api/field/clock-in/route.ts`
- `/api/field/clock-out/route.ts`

All POST. recordId: `crypto.randomUUID()`. Ownership check on clock-out (techId must match session).

---

### Task 9 — Write break routes (2 files)

- `/api/field/break/start/route.ts`
- `/api/field/break/end/route.ts`

Both write to `time_records` (legacy columns) AND `breaks` table (new in P3-2).
Ownership check: verify the time_record belongs to session.badge.

---

### Task 10 — Write `/api/field/job/complete/route.ts`

POST. Auth: verifyFieldSession.
Writes to: time_records (status), jobs (status='Complete'), job_performance_history (new row).

---

### Task 11 — Write `/api/field/attestation/sign/route.ts`

POST. Auth: verifyFieldSession.
Writes to: attestations table (immutable — ON CONFLICT DO NOTHING).
Fires n8n webhook: **non-blocking** (fire-and-forget, catch errors silently).

⚠️ GUARD: If `process.env.N8N_COMPLIANCE_WEBHOOK_URL` is undefined or blank, skip the webhook
call and log a warning. Do not throw. The attestation write must succeed regardless.

---

### Task 12 — Update frontend files

Using the file list from Task 3:

For each file:
1. Replace GAS action call pattern with direct `fetch('/api/field/xxx', { method: 'POST', headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }, body: JSON.stringify({...}) })`
2. Adjust response parsing if field names changed
3. Login: call `/api/field/auth/login`, store result in localStorage as `apt_tech_session`
   — include `employeeId` in the stored object (new field from P3-4 response)

After all frontend changes: verify the app compiles and the login flow works in the browser (dev server).

---

### Task 13 — tsc zero errors + Playwright E2E

```powershell
cd tech-pwa && npx tsc --noEmit
```
→ 0 errors. Paste output: `______`

Run the golden path E2E test (dev server must be running):
```powershell
npx playwright test tech-pwa.spec.ts --headed
```

If no test covers the new routes, write a minimal test in `tests/e2e/tech-pwa.spec.ts` that:
1. POSTs to `/api/field/auth/login` with badge=`1`, pin=`1234` → expect `success: true`
2. Uses returned token to GET `/api/field/jobs` → expect `success: true`
3. POSTs to `/api/field/shift/start` → expect `success: true`

Paste the `npx playwright test` summary line (e.g., `3 passed (12s)`): `______`

Kill dev server after testing:
```powershell
Get-NetTCPConnection -LocalPort 3000,3001,3010 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
```

---

### Task 14 — tsc + diff + push (terminal N-2)

```powershell
cd tech-pwa && npx tsc --noEmit
```
→ 0 errors. Paste: `______`

```powershell
cd tech-pwa
git diff origin/main...HEAD | Out-File -Encoding utf8 ../artifacts/ag_diff.txt
cd ..
```

Stage only spec-listed files:
```powershell
git add specs/PHASE3_P3_4_SPEC.md `
  tech-pwa/src/lib/fieldAuth.ts `
  tech-pwa/src/app/api/field/auth/login/route.ts `
  tech-pwa/src/app/api/field/jobs/route.ts `
  tech-pwa/src/app/api/field/shift/start/route.ts `
  tech-pwa/src/app/api/field/shift/end/route.ts `
  tech-pwa/src/app/api/field/shift/status/route.ts `
  tech-pwa/src/app/api/field/clock-in/route.ts `
  tech-pwa/src/app/api/field/clock-out/route.ts `
  tech-pwa/src/app/api/field/break/start/route.ts `
  tech-pwa/src/app/api/field/break/end/route.ts `
  tech-pwa/src/app/api/field/job/complete/route.ts `
  tech-pwa/src/app/api/field/attestation/sign/route.ts `
  artifacts/ag_diff.txt
```

Add any frontend files changed in Task 12 (use their exact paths).

```powershell
git commit -m "feat(p3-4): field API routes — 11 Next.js endpoints replace TechPWA.gs"
git push origin HEAD
```

Post `artifacts/ag_diff.txt` to Claude Code. **Stop. Wait for PASS.**

---

### Task 15 — Test sprint (terminal N-1, separate session)

Start dev server: `npm run dev`

Run each route manually and paste response:

1. `POST /api/field/auth/login` with badge=`1`, pin=`1234`:
   → Paste response body: `______`
   → Paste the returned token (first 8 chars only — DO NOT paste full token): `______`

2. Using token from (1), `GET /api/field/jobs`:
   → Paste response (job count + first job_id): `______`

3. `POST /api/field/shift/start`:
   → Paste response: `______`

4. `POST /api/field/clock-in` with a valid jobId:
   → Paste response: `______`

5. `POST /api/field/break/start` with recordId from (4):
   → Paste response: `______`

6. `POST /api/field/break/end`:
   → Paste response: `______`

7. `POST /api/field/clock-out` with recordId from (4):
   → Paste response: `______`

8. `POST /api/field/job/complete`:
   → Paste response: `______`

9. `POST /api/field/attestation/sign` with shiftId from (3):
   → Paste response: `______`
   → Paste n8n execution log confirmation (or "webhook not triggered" if N8N_COMPLIANCE_WEBHOOK_URL not set): `______`

10. Verify Neon writes — paste counts:
    ```sql
    SELECT COUNT(*) FROM shifts WHERE shift_date = CURRENT_DATE;
    SELECT COUNT(*) FROM time_records WHERE clock_in >= NOW() - INTERVAL '1 hour';
    SELECT COUNT(*) FROM attestations WHERE signed_at >= NOW() - INTERVAL '1 hour';
    SELECT COUNT(*) FROM breaks WHERE created_at >= NOW() - INTERVAL '1 hour';
    ```
    Paste all 4: `______`

11. Playwright summary line: `______`

Kill dev server after testing.

Write `artifacts/ag_test_results.txt` with all of the above — specific observed data, not "PASS".

Post to Claude Code. **Stop. Wait for clear-to-merge.**

---

### Task 16 — Merge (terminal N)

Merge only after Claude Code issues "Clear to merge." Not before.

---

## FLAGS TO CLAUDE CODE — STOP AND REPORT

- Branch is not `feat/p3-4-field-api-nextjs`
- Any diff touching `exec/route.ts`, `field/live/route.ts`, `field/compliance/route.ts`, or any `.gs` file
- Task 3 grep finds a file not listed in this spec that needs changes
- `N8N_COMPLIANCE_WEBHOOK_URL` is missing and you cannot source it from Brandon
- TypeScript error that requires modifying a file not in the spec's file list
- A Playwright test fails for a reason that requires changes outside the test file

---

## DEFINITION OF DONE

- All 11 routes exist at `/api/field/*`
- Each route (except login) returns 401 with no/bad token
- `verifyFieldSession` validates token against Neon — expired tokens rejected
- `npx tsc --noEmit` → 0 errors
- Playwright golden path test passes: login → jobs → shift → clock in → break → clock out → complete → attest
- n8n webhook confirmed (or documented as untested if URL not in env)
- No frontend code references `TECH_PWA_GAS_URL` or `/api/exec`
- `ag_test_results.txt` contains observed HTTP responses and Neon counts — not generic "PASS"
