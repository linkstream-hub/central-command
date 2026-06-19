# SPRINT P3-5 — GAS Bridge Cleanup
**Branch:** `feat/p3-5-gas-bridge-cleanup`
**Phase goal:** Remove every piece of GAS plumbing from the field tech stack. After this sprint, the only GAS touchpoints are `Code.js` (email parsing) and `DashboardAPI.gs` (office staff dashboard). `TechPWA.gs` is dead code. `/api/exec` is gone. `NEXT_PUBLIC_API_URL` and `TECH_PWA_GAS_URL` are retired from the codebase.

**Depends on:** P3-4 (PR #853, merged) — all field actions now have direct Neon-backed routes.

---

## WHAT THIS SPRINT DOES

### Deletions
| File | Why |
|---|---|
| `tech-pwa/src/app/api/exec/route.ts` | GAS proxy + shadow-write bridge. All actions it handled are now in `/api/field/*`. Dead code since P3-4. |

### Auth architecture fix (field/live and field/compliance)
These routes live in the `/api/field/` namespace but were imported from `@/auth` (Google OAuth — wrong). The office dashboard called them browser-side via session cookie. This sprint separates concerns correctly:
- **New** `/api/dashboard/live-status/` and `/api/dashboard/compliance-status/` — office-staff-facing, use `auth()`, proxy to field routes with `x-api-key` server-side.
- **Updated** `field/live` and `field/compliance` — become server-to-server only, strip `auth()`, keep only `x-api-key`.

### GAS fallback removal (syncQueue.ts)
`syncQueue.ts` has three locations where it falls back to `NEXT_PUBLIC_API_URL || '/api/mock/exec'` when an action isn't in `FIELD_POST_ROUTES`. All supported field actions ARE now in `FIELD_POST_ROUTES`. The fallbacks become error throws.
- `flushQueue()` is refactored to retry queued events through `FIELD_POST_ROUTES` (proper offline support).
- `apiCall()` throws for any action not in `FIELD_POST_ROUTES` (no more silent GAS proxy).
- `apiGet()` throws for any action other than `getJobs` (no more GAS GET fallback).

### Dead code removal (dashboard-api.ts)
`dashboard-api.ts` exports a `signAttestation()` function at line 654 that still calls `NEXT_PUBLIC_API_URL`. This function is never called — `ClockedInBar.tsx` uses `apiCall('signAttestation', ...)` (through `FIELD_POST_ROUTES`). Remove the dead export.

### Dev mode flag fix (location.ts)
`location.ts` uses `!process.env.NEXT_PUBLIC_API_URL` as a dev mode flag to skip geolocation. After P3-5, `NEXT_PUBLIC_API_URL` is retired. Replace with `process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true'`.

---

## FILES — EXACT SCOPE (no changes outside this list)

| Action | File |
|---|---|
| DELETE | `tech-pwa/src/app/api/exec/route.ts` |
| MODIFY | `tech-pwa/src/lib/syncQueue.ts` |
| MODIFY | `tech-pwa/src/lib/dashboard-api.ts` |
| MODIFY | `tech-pwa/src/lib/location.ts` |
| MODIFY | `tech-pwa/src/app/api/field/live/route.ts` |
| MODIFY | `tech-pwa/src/app/api/field/compliance/route.ts` |
| CREATE | `tech-pwa/src/app/api/dashboard/live-status/route.ts` |
| CREATE | `tech-pwa/src/app/api/dashboard/compliance-status/route.ts` |

**Any file not in this list that appears to need a change = STOP and flag to Claude Code. Do not make unrequested changes.**

---

## DUAL AUTH RULE (applies to the two new `/api/dashboard/` routes)

Every new `/api/` route requires:
1. `auth()` session check (Google OAuth) **OR** `x-api-key` header check (DASHBOARD_API_KEY)
2. Both paths → 401 on failure
3. No `as any` casts

The `/api/field/live` and `/api/field/compliance` routes after this sprint accept ONLY `x-api-key`. No session auth. No `as any`.

---

## NUMBERED TASK LIST

### Task 0 — Orchestrator Setup
Run `/gsd-discuss-phase` with this spec as input to build the GSD execution plan. Post the plan summary to Claude Code. Flag any item touching auth, schema, or new routes. Wait for PASS before proceeding.

### Task 1 — Branch Verify (non-negotiable)
```
git branch --show-current
```
Output must be `feat/p3-5-gas-bridge-cleanup`. If it is not, STOP. Create the branch: `git checkout -b feat/p3-5-gas-bridge-cleanup`. Then:
```
git ls-remote --heads origin feat/p3-5-gas-bridge-cleanup
```
If empty, run: `git push -u origin feat/p3-5-gas-bridge-cleanup`. Paste result: `______`

```
git log main..HEAD --oneline
```
If this branch has prior commits, rebase from main first: `git rebase main`. Paste result: `______`

### Task 2 — Grep verification before any code changes
Before touching a single file, run these greps and paste all output:

```powershell
# Verify what uses NEXT_PUBLIC_API_URL and TECH_PWA_GAS_URL in src/
Select-String -Path "tech-pwa\src\**\*.ts","tech-pwa\src\**\*.tsx" -Pattern "NEXT_PUBLIC_API_URL|TECH_PWA_GAS_URL|api/mock/exec" -Recurse | Select-Object Filename,LineNumber,Line
```
Paste complete output: `______`

```powershell
# Verify what calls signAttestation
Select-String -Path "tech-pwa\src\**\*.ts","tech-pwa\src\**\*.tsx" -Pattern "signAttestation" -Recurse | Select-Object Filename,LineNumber,Line
```
Paste complete output: `______`

```powershell
# Verify what calls getLiveFieldStatus or getComplianceStatus
Select-String -Path "tech-pwa\src\**\*.ts","tech-pwa\src\**\*.tsx" -Pattern "getLiveFieldStatus|getComplianceStatus" -Recurse | Select-Object Filename,LineNumber,Line
```
Paste complete output: `______`

This is a contradiction-detection step. If your output differs from what this spec describes (e.g., additional callers of `signAttestation`, or additional `NEXT_PUBLIC_API_URL` references), STOP and flag to Claude Code before writing a single line of code.

### Task 3 — Delete `/api/exec/route.ts`
```powershell
Remove-Item "tech-pwa\src\app\api\exec\route.ts" -Force
```
Verify it is gone:
```powershell
Test-Path "tech-pwa\src\app\api\exec\route.ts"
```
Paste result (must be `False`): `______`

### Task 4 — Rewrite `syncQueue.ts`

Read the current file in full before editing. Make the following targeted changes:

**4a. Rewrite `flushQueue()`** — replace the GAS fetch with FIELD_POST_ROUTES routing:

Replace the entire `flushQueue` function body so it routes each queued event through `FIELD_POST_ROUTES`. If the action is not in `FIELD_POST_ROUTES`, discard the event (it is a legacy GAS action). Use the existing `getSession()` for the bearer token.

The new `flushQueue` logic:
```typescript
export async function flushQueue() {
  const queue = getQueue();
  if (queue.length === 0) return true;

  console.log(`Flushing ${queue.length} events from queue...`);
  const session = getSession();

  for (const event of queue) {
    const fieldUrl = FIELD_POST_ROUTES[event.action];
    if (!fieldUrl) {
      // Legacy GAS action — discard; no endpoint exists anymore
      console.warn(`flushQueue: discarding legacy action "${event.action}" (no field route)`);
      dequeueEvent(event.id);
      continue;
    }
    const token = session?.token ?? (event.payload as Record<string, unknown> & { token?: string }).token ?? '';
    try {
      const response = await fetch(fieldUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(event.payload),
      });
      const data = await response.json() as Record<string, unknown>;
      if (data['error'] === 'INVALID_TOKEN') {
        console.error('SyncQueue halted: INVALID_TOKEN');
        return false;
      }
      dequeueEvent(event.id);
    } catch {
      console.warn('SyncQueue halted: Network detached');
      return false;
    }
  }
  return true;
}
```

**4b. Rewrite `apiCall()`** — remove the GAS fallback block entirely.

Current structure (pseudocode):
```
if (FIELD_POST_ROUTES[action]) → direct field route → return
if (isOnline) → GAS fetch (NEXT_PUBLIC_API_URL || /api/mock/exec) → queue on fail
else → queue or throw
```

New structure — the GAS block is gone. Any action NOT in `FIELD_POST_ROUTES` throws immediately:
```typescript
export async function apiCall<T = { success: boolean }>(
  action: string,
  payload: Record<string, unknown> = {},
  allowQueue: boolean = true
): Promise<T> {
  const p = payload as Record<string, unknown> & { photoBase64?: unknown; token?: string };
  const isPhoto = action === 'uploadReceipt' || !!p.photoBase64;
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const session = getSession();

  if (session && !p.token) {
    p.token = session.token;
  }

  const fieldUrl = FIELD_POST_ROUTES[action];
  if (!fieldUrl) {
    throw new Error(`apiCall: action "${action}" not supported — all field actions must be registered in FIELD_POST_ROUTES`);
  }

  const token = session?.token ?? '';

  if (isOnline) {
    try {
      const response = await fetch(fieldUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json() as T;
      if ((data as Record<string, unknown>)['success'] && !isPhoto) {
        setTimeout(flushQueue, 0);
      }
      return data;
    } catch (e) {
      if (allowQueue && !isPhoto) {
        enqueueEvent(action, payload);
        return { success: true, _queued: true } as unknown as T;
      }
      throw e;
    }
  } else {
    if (allowQueue && !isPhoto) {
      enqueueEvent(action, payload);
      return { success: true, _queued: true } as unknown as T;
    }
    throw new Error('Offline');
  }
}
```

**4c. Rewrite `apiGet()`** — remove GAS fallback. Only `getJobs` is supported:

```typescript
export async function apiGet<T = { success: boolean }>(
  action: string,
  _params: Record<string, string> = {}
): Promise<T> {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  if (!isOnline) throw new Error('Offline');

  const session = getSession();

  if (action === 'getJobs') {
    const token = session?.token ?? '';
    const response = await fetch('/api/field/jobs', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return (await response.json()) as T;
  }

  throw new Error(`apiGet: action "${action}" not supported — only "getJobs" has a field GET route`);
}
```

Note: The `_params` parameter is kept (underscore-prefixed) to avoid breaking callers that pass it. No `as any` anywhere.

After all three edits, verify:
```powershell
Select-String -Path "tech-pwa\src\lib\syncQueue.ts" -Pattern "NEXT_PUBLIC_API_URL|api/mock/exec" | Select-Object LineNumber,Line
```
Paste result (must be empty — zero matches): `______`

### Task 5 — Fix `dashboard-api.ts`

**5a. Remove dead `signAttestation` export.** Read lines 650–665 of `dashboard-api.ts`. Delete the entire `signAttestation` function (the export starting at line 654 that references `NEXT_PUBLIC_API_URL`). It is dead code.

**5b. Update `MIGRATED_ACTIONS`.** Change lines 511–512:
```typescript
// OLD:
getLiveFieldStatus:  '/api/field/live',
getComplianceStatus: '/api/field/compliance',

// NEW:
getLiveFieldStatus:  '/api/dashboard/live-status',
getComplianceStatus: '/api/dashboard/compliance-status',
```

After both edits, verify:
```powershell
Select-String -Path "tech-pwa\src\lib\dashboard-api.ts" -Pattern "NEXT_PUBLIC_API_URL|signAttestation" | Select-Object LineNumber,Line
```
Paste result (must be empty — zero matches): `______`

Verify new routes are referenced:
```powershell
Select-String -Path "tech-pwa\src\lib\dashboard-api.ts" -Pattern "dashboard/live-status|dashboard/compliance-status" | Select-Object LineNumber,Line
```
Paste result (must show 2 matches): `______`

### Task 6 — Fix `location.ts`

Read `tech-pwa/src/lib/location.ts`. At line 15, the check `if (!process.env.NEXT_PUBLIC_API_URL)` is used as a dev mode flag. Replace it with the sandbox check:

```typescript
// OLD:
if (!process.env.NEXT_PUBLIC_API_URL) {
  return null;
}

// NEW:
if (process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true') {
  return null;
}
```

Verify:
```powershell
Select-String -Path "tech-pwa\src\lib\location.ts" -Pattern "NEXT_PUBLIC_API_URL" | Select-Object LineNumber,Line
```
Paste result (must be empty): `______`

### Task 7 — Fix `field/live/route.ts`

Read `tech-pwa/src/app/api/field/live/route.ts` in full. Make these targeted changes:

1. Remove `import { auth } from '@/auth';` (line 3)
2. Remove the lines: `const session = await auth();` and `const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;` and `if (!session && !isApiKeyAuth) {`
3. Replace the auth block with x-api-key only:
```typescript
const apiKey = req.headers.get('x-api-key');
if (apiKey !== process.env.DASHBOARD_API_KEY) {
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}
```

The function signature stays `export async function GET(req: Request)`. No other changes to the route logic.

Verify `auth` import is gone:
```powershell
Select-String -Path "tech-pwa\src\app\api\field\live\route.ts" -Pattern "from '@/auth'|auth\(\)" | Select-Object LineNumber,Line
```
Paste result (must be empty): `______`

### Task 8 — Fix `field/compliance/route.ts`

Read `tech-pwa/src/app/api/field/compliance/route.ts` in full. Apply the same auth change as Task 7:

1. Remove `import { auth } from '@/auth';`
2. Replace auth check with x-api-key only:
```typescript
const apiKey = req.headers.get('x-api-key');
if (apiKey !== process.env.DASHBOARD_API_KEY) {
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}
```

No other changes. The internal `fetch` to `/api/field/live` already passes `x-api-key` — leave it unchanged.

Verify:
```powershell
Select-String -Path "tech-pwa\src\app\api\field\compliance\route.ts" -Pattern "from '@/auth'|auth\(\)" | Select-Object LineNumber,Line
```
Paste result (must be empty): `______`

### Task 9 — Create `/api/dashboard/live-status/route.ts`

Create the file at `tech-pwa/src/app/api/dashboard/live-status/route.ts` with this exact content:

```typescript
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';

/**
 * Dashboard proxy for /api/field/live.
 * Office staff auth (Google OAuth) — browser-facing.
 * Internally calls field/live with x-api-key (server-side — key never exposed to browser).
 */
export async function GET(req: Request) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.startsWith('localhost') ? 'http' : 'https';
    const res = await fetch(`${protocol}://${host}/api/field/live`, {
      headers: { 'x-api-key': process.env.DASHBOARD_API_KEY || '' },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('[GET /api/dashboard/live-status] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
```

Verify file exists and has correct content:
```powershell
Test-Path "tech-pwa\src\app\api\dashboard\live-status\route.ts"
Get-Content "tech-pwa\src\app\api\dashboard\live-status\route.ts" | Select-Object -First 5
```
Paste result: `______`

### Task 10 — Create `/api/dashboard/compliance-status/route.ts`

Create the file at `tech-pwa/src/app/api/dashboard/compliance-status/route.ts` with this exact content:

```typescript
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';

/**
 * Dashboard proxy for /api/field/compliance.
 * Office staff auth (Google OAuth) — browser-facing.
 * Internally calls field/compliance with x-api-key (server-side — key never exposed to browser).
 */
export async function GET(req: Request) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.startsWith('localhost') ? 'http' : 'https';
    const res = await fetch(`${protocol}://${host}/api/field/compliance`, {
      headers: { 'x-api-key': process.env.DASHBOARD_API_KEY || '' },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('[GET /api/dashboard/compliance-status] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
```

Verify file exists:
```powershell
Test-Path "tech-pwa\src\app\api\dashboard\compliance-status\route.ts"
```
Paste result (must be `True`): `______`

### Task 11 — Final GAS reference sweep

Run the definitive verification grep across all `src/` TypeScript files:

```powershell
Select-String -Path "tech-pwa\src\**\*.ts","tech-pwa\src\**\*.tsx" -Pattern "NEXT_PUBLIC_API_URL|TECH_PWA_GAS_URL|api/mock/exec" -Recurse | Select-Object Filename,LineNumber,Line
```
Paste complete output: `______`

**Expected result: zero matches.** If any remain, fix them now before committing. Do not commit with live GAS references.

Also verify auth import is clean:
```powershell
Select-String -Path "tech-pwa\src\app\api\field\**\*.ts" -Pattern "from '@/auth'" -Recurse | Select-Object Filename,LineNumber,Line
```
Paste complete output (must show zero matches — `field/` namespace has no `@/auth` dependency): `______`

### Task 12 — TypeScript compile check

```powershell
cd tech-pwa && npx tsc --noEmit 2>&1
```

**Must return zero errors.** If any errors, fix them in this sprint — do not commit with type errors. Paste last 20 lines of output: `______`

### Task 13 — `ptow_adw.py` diff gate (first-pass before Claude Code review)

```powershell
cd tech-pwa && git push origin HEAD
cd .. && git diff main...HEAD > artifacts/ag_diff.txt
```

Run `ptow_adw.py` against the diff:
```powershell
python tools/ptow_adw.py artifacts/ag_diff.txt
```
Paste complete output: `______`

If `ptow_adw.py` flags any findings (secrets, `as any`, missing auth), fix them before posting to Claude Code.

Commit the diff artifact:
```powershell
git add artifacts/ag_diff.txt && git commit -m "chore(p3-5): add diff artifact"
git push origin HEAD
```

Post to Claude Code. Stop. Wait for PASS.

---

### Task 14 (SEPARATE SESSION) — Test Sprint

Start dev server: `cd tech-pwa && npm run dev`

Wait for "Ready" on port 3000. Confirm `DATABASE_URL` in `.env.local` points to real Neon dev branch (ep-snowy-block pooler). Verify:
```powershell
Select-String -Path "tech-pwa\.env.local" -Pattern "DATABASE_URL" | Select-Object -First 1
```
Output must show a Neon connection string (not localhost, not mock). Paste first 20 chars of the value (not the full string): `______`

**Test 14.1 — Golden path API still works**

Repeat the full P3-4 golden path sequence (login → getJobs → startShift) via `Invoke-RestMethod`:
```powershell
$loginResp = Invoke-RestMethod -Uri "http://localhost:3000/api/field/auth/login" -Method Post -ContentType "application/json" -Body '{"badge":"1","pin":"1234"}'
```
Paste `loginResp.success` (must be `true`): `______`
Paste first 8 chars of `loginResp.token` (NOT the full token): `______`

```powershell
$token = $loginResp.token
$headers = @{ "Authorization" = "Bearer $token" }
$jobsResp = Invoke-RestMethod -Uri "http://localhost:3000/api/field/jobs" -Method Get -Headers $headers
```
Paste `jobsResp.success` and `jobsResp.jobs.Length`: `______`

```powershell
$shiftResp = Invoke-RestMethod -Uri "http://localhost:3000/api/field/shift/start" -Method Post -Headers $headers -ContentType "application/json" -Body '{}'
```
Paste `shiftResp.success`: `______`

**Test 14.2 — `/api/exec` is gone (404)**

```powershell
$execResp = Invoke-WebRequest -Uri "http://localhost:3000/api/exec" -Method Post -ContentType "application/json" -Body '{"action":"login"}' -ErrorAction SilentlyContinue
$execResp.StatusCode
```
Paste status code (must be `404`): `______`

**Test 14.3 — `/api/field/live` now requires x-api-key (rejects browser session calls)**

```powershell
$liveNoKey = Invoke-WebRequest -Uri "http://localhost:3000/api/field/live" -Method Get -ErrorAction SilentlyContinue
$liveNoKey.StatusCode
```
Paste status code (must be `401`): `______`

```powershell
$dashApiKey = (Get-Content "tech-pwa\.env.local" | Where-Object { $_ -match "^DASHBOARD_API_KEY=" }) -replace "DASHBOARD_API_KEY=", ""
$liveWithKey = Invoke-RestMethod -Uri "http://localhost:3000/api/field/live" -Method Get -Headers @{ "x-api-key" = $dashApiKey }
```
Paste `liveWithKey.success` (must be `true`) and `liveWithKey.techs.Length`: `______`

**Test 14.4 — `/api/dashboard/live-status` exists and responds (x-api-key path)**

```powershell
$dashLive = Invoke-RestMethod -Uri "http://localhost:3000/api/dashboard/live-status" -Method Get -Headers @{ "x-api-key" = $dashApiKey }
```
Paste `dashLive.success` (must be `true`): `______`

**Test 14.5 — `/api/dashboard/compliance-status` exists and responds (x-api-key path)**

```powershell
$dashComp = Invoke-RestMethod -Uri "http://localhost:3000/api/dashboard/compliance-status" -Method Get -Headers @{ "x-api-key" = $dashApiKey }
```
Paste `dashComp.success` (must be `true`): `______`

**Test 14.6 — `/api/field/compliance` still reachable via x-api-key (n8n path)**

```powershell
$complianceResp = Invoke-RestMethod -Uri "http://localhost:3000/api/field/compliance" -Method Get -Headers @{ "x-api-key" = $dashApiKey }
```
Paste `complianceResp.success` (must be `true`) and `complianceResp.records.Length`: `______`

**Test 14.7 — Full Playwright suite**

```powershell
cd tech-pwa && npx playwright test
```
Paste the complete summary line (e.g., `42 passed (31s)` or `41 passed, 1 failed`): `______`

If any test regressions beyond the 1 pre-existing failure (`auth.spec.ts:34:7 — Tech login with invalid PIN shows error`), investigate and fix before posting results. Do not dismiss new failures.

**Test 14.8 — Compliance page renders in browser**

Open http://localhost:3000/compliance in browser (logged in as office staff). Confirm:
- Page loads without console error
- Compliance records display (or "No active records" — either is valid)
- Network tab shows request to `/api/dashboard/compliance-status`, NOT `/api/field/compliance`

Paste browser console output (no errors):
```
______
```
Paste the URL called in the Network tab: `______` (must be `/api/dashboard/compliance-status`)

**Test 14.9 — Team page renders in browser**

Open http://localhost:3000/team. Confirm field status section loads without errors.
Network tab must show request to `/api/dashboard/live-status`, NOT `/api/field/live`.
Paste the URL called in the Network tab: `______`

**Checklist before posting results:**
- [ ] Scan `ag_test_results.txt` for any string matching `[0-9a-f]{17,}` (hex strings > 16 chars). Found = hard FAIL, do not post.
- [ ] `test_results.txt` contains actual observed data per item (not generic "PASS")
- [ ] `playwright test` summary line is present

Kill dev server after tests:
```powershell
Get-NetTCPConnection -LocalPort 3000,3001,3010 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
```

Write all results to `artifacts/ag_test_results.txt`. Commit and push. Post to Claude Code. Stop. Wait for clear-to-merge.

---

### Task 15 — Merge (after Claude Code issues "Clear to merge")

```powershell
gh pr create --base main --head feat/p3-5-gas-bridge-cleanup --title "feat(p3-5): GAS bridge cleanup — remove /api/exec, retire NEXT_PUBLIC_API_URL" --body "Removes every piece of GAS plumbing from the field tech stack.

## Changes
- DELETE \`api/exec/route.ts\` — GAS proxy, dead since P3-4
- MODIFY \`syncQueue.ts\` — flushQueue/apiCall/apiGet route through FIELD_POST_ROUTES; no GAS fallback
- MODIFY \`dashboard-api.ts\` — remove dead signAttestation export; MIGRATED_ACTIONS routes getLiveFieldStatus/getComplianceStatus to new dashboard proxies
- MODIFY \`location.ts\` — dev mode flag: NEXT_PUBLIC_API_URL → NEXT_PUBLIC_SANDBOX_MODE
- MODIFY \`field/live/route.ts\` — auth(): removed; x-api-key only (server-to-server)
- MODIFY \`field/compliance/route.ts\` — auth(): removed; x-api-key only
- CREATE \`dashboard/live-status/route.ts\` — office staff OAuth proxy to field/live
- CREATE \`dashboard/compliance-status/route.ts\` — office staff OAuth proxy to field/compliance

## Env vars to retire (Brandon removes from Vercel after merge)
- TECH_PWA_GAS_URL
- NEXT_PUBLIC_API_URL

## TechPWA.gs decommission (Brandon archives in GAS console after merge)
- Deployment: AKfycbySG8tbAaXyIRFXnq7x-Fp5Gvs7uG8RmAyBB_wSFcGmScbhI3SHSq2HoznowBcsi3mM9Q
- Do NOT delete the clasp project — Code.js shares the same .clasp.json

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```

Merge only after Claude Code says **"Clear to merge."** Not before.

---

## POST-MERGE ACTIONS (Brandon, after PR merges)

1. **Vercel** → Settings → Environment Variables → Remove: `TECH_PWA_GAS_URL`, `NEXT_PUBLIC_API_URL` (both Production and Preview)
2. **GAS console** → [Lead Parsing project] → Manage Deployments → Find deployment ID `AKfycbySG8tbAaXyIRFXnq7x-Fp5Gvs7uG8RmAyBB_wSFcGmScbhI3SHSq2HoznowBcsi3mM9Q` → Archive
3. Do NOT delete the clasp project — `Code.js` (email parsing) is in the same project

---

## CLAUDE CODE REVIEW CHECKLIST (do not post spec to AG until this block is read)

When diff arrives:
1. `wc -l artifacts/ag_diff.txt` — must be non-zero
2. `git log main..HEAD --oneline` on PR branch — must show commits
3. Every file in diff is in the 8-file scope list above. Anything outside = flag.
4. No `from '@/auth'` in any `src/app/api/field/` file after the patch
5. Zero `as any` in diff
6. Two new `api/dashboard/` routes: both have dual auth (`auth()` + `x-api-key` fallback) and 401
7. `flushQueue()` routes through `FIELD_POST_ROUTES` — confirm no `NEXT_PUBLIC_API_URL` reference
8. `signAttestation` removed from `dashboard-api.ts` — confirm no NEXT_PUBLIC_API_URL reference
9. Zero `NEXT_PUBLIC_API_URL` or `TECH_PWA_GAS_URL` references remaining in src/
10. No secrets in diff. No production data.

When test results arrive:
11. `/api/exec` returns 404
12. `/api/field/live` returns 401 without x-api-key, 200 with it
13. `/api/dashboard/live-status` returns 200 with x-api-key
14. `/api/dashboard/compliance-status` returns 200 with x-api-key
15. Network evidence shows compliance/team pages call `/api/dashboard/*` (NOT `/api/field/*`)
16. Playwright summary line present — regression count ≤ 1 (the pre-existing auth.spec.ts failure)
17. No secrets/hex tokens in ag_test_results.txt
18. `ag_test_results.txt` has specific observed values per test — not generic PASS
