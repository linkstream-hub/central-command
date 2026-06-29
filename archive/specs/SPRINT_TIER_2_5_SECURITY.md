# SPRINT: Tier 2.5 — Security & Quality Hardening
# Branch: feat/tier-2-5-security-hardening
# Status: READY FOR EXECUTION
# Claude Code authoring date: 2026-05-27

---

## Goal

Close the C+ security gaps in the field tech API layer. Take the system from C+ (~72%) to B+ (~87%) security posture before Phase 3 is considered production-ready.

## Security Posture Impact

**Before:** No rate limiting on login, no input validation, plaintext session tokens in Neon, legacy unhashed PIN fallback, 30-day tokens, inconsistent error envelopes, no health check.

**After:** Rate-limited login (5/15min, 429), Zod validation on all POST field routes, SHA-256 hashed tokens in Neon, legacy PIN path removed, 24-hour tokens, standardized error envelopes, `/api/health` endpoint.

---

## Prerequisites — Brandon dashboard actions (before AG starts any code)

**P-PREREQ-A: Create Upstash Redis database via Vercel marketplace**
1. Vercel dashboard → project `apt-central-command` → Storage tab → Marketplace → **Upstash** → Create Redis database
2. Free tier is sufficient (10,000 commands/day)
3. Vercel auto-populates `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in project environment variables
4. Copy both values into `tech-pwa/.env.local`

> **If Redis is not configured:** The rate limit code gracefully degrades — it logs a warning and allows the request. The sprint can proceed without Redis, but rate limiting will not be verified in the test sprint. Copy `KV_REST_API_URL` and `KV_REST_API_TOKEN` to `.env.local` before the test sprint.

---

## Spec Scope — exact files AG may touch

**New files (create):**
- `tech-pwa/src/lib/rateLimit.ts`
- `tech-pwa/src/lib/fieldSchemas.ts`
- `tech-pwa/src/app/api/health/route.ts`

**Modified files:**
- `tech-pwa/src/app/api/field/auth/login/route.ts`
- `tech-pwa/src/lib/fieldAuth.ts`
- `tech-pwa/src/app/api/field/attestation/sign/route.ts`
- `tech-pwa/src/app/api/field/break/start/route.ts`
- `tech-pwa/src/app/api/field/break/end/route.ts`
- `tech-pwa/src/app/api/field/clock-in/route.ts`
- `tech-pwa/src/app/api/field/clock-out/route.ts`
- `tech-pwa/src/app/api/field/job/complete/route.ts`
- `tech-pwa/src/app/api/field/jobs/route.ts`
- `tech-pwa/src/app/api/field/shift/start/route.ts`
- `tech-pwa/src/app/api/field/shift/end/route.ts`
- `tech-pwa/src/app/api/field/shift/status/route.ts`
- `tech-pwa/src/tests/e2e/auth.spec.ts` (P-7 investigation)

**Any file not on this list requires an immediate STOP and flag to Claude Code before touching.**

---

## Task List

### Task 1 — Branch verify + package install

```
git branch --show-current
```
Output must be: `feat/tier-2-5-security-hardening`
If not: STOP. Do not proceed. Report to Claude Code.

```
git ls-remote --heads origin feat/tier-2-5-security-hardening
```
Output must be non-empty. If empty: `git push -u origin feat/tier-2-5-security-hardening`

```
git log main..HEAD --oneline
```
Paste output: `______` (may be empty on a fresh branch — that is expected at this point)

Install packages (both new dependencies):
```bash
cd tech-pwa && npm install zod @upstash/redis @upstash/ratelimit
```

Verify all three appear in `package.json` `dependencies` after install. If any fail, STOP and report.

---

### Task 2 — Create `tech-pwa/src/lib/rateLimit.ts`

Create this file exactly:

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
}

// Vercel's Upstash marketplace integration creates KV_REST_API_URL and KV_REST_API_TOKEN
let ratelimit: Ratelimit | null = null;

function getRateLimiter(): Ratelimit | null {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }
  if (!ratelimit) {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      prefix: 'rate:login',
    });
  }
  return ratelimit;
}

/**
 * Check rate limit for a login attempt by badge.
 * Uses Upstash Redis via Vercel marketplace (KV_REST_API_URL / KV_REST_API_TOKEN).
 * Sliding window: 5 attempts per 15 minutes per badge.
 * Gracefully degrades if Redis is not configured.
 */
export async function checkLoginRateLimit(badge: string): Promise<RateLimitResult> {
  const limiter = getRateLimiter();

  if (!limiter) {
    console.warn('[rateLimit] Redis not configured — rate limiting disabled. Set KV_REST_API_URL and KV_REST_API_TOKEN.');
    return { allowed: true, remaining: 5 };
  }

  try {
    const { success, remaining, reset } = await limiter.limit(badge);
    const retryAfterSeconds = success ? undefined : Math.ceil((reset - Date.now()) / 1000);
    return { allowed: success, remaining, retryAfterSeconds };
  } catch (err) {
    // Redis error — fail open (don't block auth on Redis outage)
    console.error('[rateLimit] Upstash error — failing open:', err);
    return { allowed: true, remaining: 5 };
  }
}
```

> **Note:** `@upstash/ratelimit` uses a sliding window algorithm. The `reset` field is the Unix timestamp (ms) when the window resets — used to compute `Retry-After`. There is no `resetLoginRateLimit` needed — the sliding window handles cleanup automatically. Remove any reference to `resetLoginRateLimit` from `login/route.ts` compared to older drafts.

---

### Task 3 — Create `tech-pwa/src/lib/fieldSchemas.ts`

Create this file exactly:

```typescript
import { z } from 'zod';

// ── Login ─────────────────────────────────────────────────────────────────────
export const LoginSchema = z.object({
  badge: z.string().min(1, 'badge is required').max(20),
  pin: z.string().min(1, 'pin is required').max(20),
});

// ── Clock-in ──────────────────────────────────────────────────────────────────
export const ClockInSchema = z.object({
  jobId: z.string().min(1, 'jobId is required').max(50),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// ── Clock-out ─────────────────────────────────────────────────────────────────
export const ClockOutSchema = z.object({
  recordId: z.string().min(1, 'recordId is required').max(50),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// ── Break start ───────────────────────────────────────────────────────────────
export const BreakStartSchema = z.object({
  recordId: z.string().min(1, 'recordId is required').max(50),
});

// ── Break end ─────────────────────────────────────────────────────────────────
export const BreakEndSchema = z.object({
  recordId: z.string().min(1, 'recordId is required').max(50),
});

// ── Job complete ──────────────────────────────────────────────────────────────
export const JobCompleteSchema = z.object({
  recordId: z.string().min(1, 'recordId is required').max(50),
  jobId: z.string().min(1, 'jobId is required').max(50),
});

// ── Shift start ───────────────────────────────────────────────────────────────
export const ShiftStartSchema = z.object({
  shiftDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'shiftDate must be YYYY-MM-DD').optional(),
});

// ── Shift end ─────────────────────────────────────────────────────────────────
export const ShiftEndSchema = z.object({
  shiftId: z.string().min(1, 'shiftId is required').max(100),
});

// ── Shift status ──────────────────────────────────────────────────────────────
export const ShiftStatusSchema = z.object({
  shiftDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'shiftDate must be YYYY-MM-DD').optional(),
});

// ── Attestation sign ──────────────────────────────────────────────────────────
export const AttestationSignSchema = z.object({
  shiftId: z.string().min(1, 'shiftId is required').max(100),
  attestationText: z.string().max(2000).default(''),
  mealCompliant: z.boolean(),
  restCompliant: z.boolean(),
});
```

---

### Task 4 — Rewrite `tech-pwa/src/app/api/field/auth/login/route.ts`

**What changes:**
- Add rate limiting (P-0): call `checkLoginRateLimit` before any DB query; return 429 with `Retry-After` header on breach; call `resetLoginRateLimit` on success
- Add Zod validation (P-1): parse body through `LoginSchema`; return 400 with Zod error details on failure
- Add token hashing (P-2): generate raw token → return raw to client → store `sha256(rawToken)` in Neon
- Remove legacy PIN fallback (P-3): delete the `|| tech.pinHash === pin` branch entirely
- Shorten expiry to 24 hours (P-4): `30 * 24 * 60 * 60 * 1000` → `24 * 60 * 60 * 1000`
- Standardize error envelope (P-5): catch block uses `message` key, not `error`

**⚠️ BEFORE removing the legacy PIN path (P-3): run this query against the Neon dev DB:**

```sql
SELECT COUNT(*) as unhashed_count
FROM employees
WHERE "pinHash" IS NOT NULL AND LENGTH("pinHash") != 64;
```

If `unhashed_count > 0`: STOP. Flag to Claude Code with the count. Do not remove the legacy path until Claude Code responds.
If `unhashed_count === 0`: proceed to remove the legacy path.

**Full rewrite of `login/route.ts`:**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';
import { checkLoginRateLimit } from '@/lib/rateLimit';
import { LoginSchema } from '@/lib/fieldSchemas';

export const dynamic = 'force-dynamic';

function hashPin(pin: string): string {
  return crypto.createHash('sha256').update(pin).digest('hex');
}

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    // P-1: Zod validation
    const body = await req.json().catch(() => ({}));
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { badge, pin } = parsed.data;

    // P-0: Rate limiting
    const rateLimit = await checkLoginRateLimit(badge);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many login attempts. Try again in 15 minutes.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfterSeconds ?? 900) },
        }
      );
    }

    const techList = await db.select().from(employees).where(eq(employees.badge, badge));
    if (techList.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid badge number or PIN.' }, { status: 401 });
    }

    const tech = techList[0];
    let isValid = false;

    if (!tech.pinHash) {
      // No pin set — allow default PIN in dev only
      if (process.env.NODE_ENV !== 'production' && pin === '1234') {
        isValid = true;
      }
    } else {
      // P-3: Only compare against the hashed pin — legacy unhashed fallback removed
      isValid = tech.pinHash === hashPin(pin);
    }

    // Dev backdoor — non-production only
    if (process.env.NODE_ENV !== 'production' && pin === '1234') {
      isValid = true;
    }

    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid badge number or PIN.' }, { status: 401 });
    }

    // No rate limit reset needed — @upstash/ratelimit sliding window handles cleanup automatically

    // P-2: Generate raw token, store SHA-256 hash in Neon, return raw token to client
    const rawToken = generateSessionToken();
    const hashedToken = hashToken(rawToken);

    // P-4: 24-hour token expiry
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await db.update(employees)
      .set({
        sessionToken: hashedToken,
        tokenExpiry: expiresAt,
      })
      .where(eq(employees.id, tech.id));

    return NextResponse.json({
      success: true,
      token: rawToken,          // Raw token returned to client; never stored
      techId: tech.badge,
      employeeId: tech.id,
      techName: tech.name,
      role: tech.role,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Login error:', error);
    // P-5: Use 'message' key, not 'error'
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
```

---

### Task 5 — Update `tech-pwa/src/lib/fieldAuth.ts`

**What changes:** Hash the incoming Bearer token before comparing to the stored hash in Neon.

**Full rewrite:**

```typescript
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';

export interface FieldSession {
  employeeId: number;
  badge: string;
  name: string;
  role: string;
  hourlyRate: number | null;
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function verifyFieldSession(req: Request): Promise<FieldSession | null> {
  const auth = req.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : null;
  if (!token) return null;

  // P-2: Hash the presented token before comparing to the stored hash
  const hashedToken = hashToken(token);

  const result = await db.select().from(employees)
    .where(eq(employees.sessionToken, hashedToken))
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

---

### Task 6 — Update `field/attestation/sign/route.ts`

**What changes:** Add Zod validation (P-1). Standardize 500 error key to `message` (P-5).

Replace the body parsing block (lines 14–18) with:
```typescript
const body = await req.json().catch(() => ({}));
const parsed = AttestationSignSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
    { status: 400 }
  );
}
const { shiftId, attestationText, mealCompliant, restCompliant } = parsed.data;
```

Add to imports at top:
```typescript
import { AttestationSignSchema } from '@/lib/fieldSchemas';
```

Replace the catch block at the bottom:
```typescript
  } catch (error) {
    console.error('attestation sign error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
```

Remove the now-redundant `if (!shiftId)` manual check (Zod handles it).

---

### Task 7 — Update `field/break/start/route.ts`

**What changes:** Add Zod validation (P-1). Standardize 500 error key (P-5).

Add import: `import { BreakStartSchema } from '@/lib/fieldSchemas';`

Replace body parsing:
```typescript
const body = await req.json().catch(() => ({}));
const parsed = BreakStartSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
    { status: 400 }
  );
}
const { recordId } = parsed.data;
```

Replace catch block: `{ success: false, message: 'Internal Server Error' }` (not `error`).

Remove now-redundant `if (!recordId)` manual check.

---

### Task 8 — Update `field/break/end/route.ts`

**What changes:** Add Zod validation (P-1). Standardize 500 error key (P-5).

Add import: `import { BreakEndSchema } from '@/lib/fieldSchemas';`

Replace body parsing:
```typescript
const body = await req.json().catch(() => ({}));
const parsed = BreakEndSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
    { status: 400 }
  );
}
const { recordId } = parsed.data;
```

Replace catch block: `{ success: false, message: 'Internal Server Error' }`.

Remove now-redundant `if (!recordId)` manual check.

---

### Task 9 — Update `field/clock-in/route.ts`

**What changes:** Add Zod validation (P-1). Standardize 500 error key (P-5).

Add import: `import { ClockInSchema } from '@/lib/fieldSchemas';`

Replace body parsing:
```typescript
const body = await req.json().catch(() => ({}));
const parsed = ClockInSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
    { status: 400 }
  );
}
const { jobId, lat, lng } = parsed.data;
```

Replace catch block: `{ success: false, message: 'Internal Server Error' }`.

Remove now-redundant `if (!jobId)` manual check.

Note: `lat` and `lng` from Zod are already `number | undefined` — no need for `parseFloat`. Remove the `parseFloat(String(...))` calls; use `lat ?? null` and `lng ?? null` directly.

---

### Task 10 — Update `field/clock-out/route.ts`

**What changes:** Add Zod validation (P-1). Standardize 500 error key (P-5).

Add import: `import { ClockOutSchema } from '@/lib/fieldSchemas';`

Replace body parsing:
```typescript
const body = await req.json().catch(() => ({}));
const parsed = ClockOutSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
    { status: 400 }
  );
}
const { recordId, lat, lng } = parsed.data;
```

Replace catch block: `{ success: false, message: 'Internal Server Error' }`.

Remove now-redundant `if (!recordId)` manual check. Use `lat ?? null` and `lng ?? null` directly (no `parseFloat`).

---

### Task 11 — Update `field/job/complete/route.ts`

**What changes:** Add Zod validation (P-1). Standardize 500 error key (P-5).

Add import: `import { JobCompleteSchema } from '@/lib/fieldSchemas';`

Replace body parsing:
```typescript
const body = await req.json().catch(() => ({}));
const parsed = JobCompleteSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
    { status: 400 }
  );
}
const { recordId, jobId } = parsed.data;
```

Replace catch block: `{ success: false, message: 'Internal Server Error' }`.

Remove now-redundant `if (!recordId || !jobId)` manual check.

---

### Task 12 — Update `field/shift/start/route.ts`

**What changes:** Add Zod validation (P-1). Standardize 500 error key (P-5).

Add import: `import { ShiftStartSchema } from '@/lib/fieldSchemas';`

Replace body parsing:
```typescript
const body = await req.json().catch(() => ({}));
const parsed = ShiftStartSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
    { status: 400 }
  );
}
const shiftDateInput = parsed.data.shiftDate;
```

Then replace the `shiftDate` assignment:
```typescript
const shiftDate = shiftDateInput ?? new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Los_Angeles',
  year: 'numeric', month: '2-digit', day: '2-digit'
}).format(new Date());
```

Replace catch block: `{ success: false, message: 'Internal Server Error' }`.

---

### Task 13 — Update `field/shift/end/route.ts`

**What changes:** Add Zod validation (P-1). Standardize 500 error key (P-5).

Add import: `import { ShiftEndSchema } from '@/lib/fieldSchemas';`

Replace body parsing:
```typescript
const body = await req.json().catch(() => ({}));
const parsed = ShiftEndSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
    { status: 400 }
  );
}
const { shiftId } = parsed.data;
```

Replace catch block: `{ success: false, message: 'Internal Server Error' }`.

Remove now-redundant `if (!shiftId)` manual check.

---

### Task 14 — Update `field/shift/status/route.ts`

**What changes:** Add Zod validation (P-1). Standardize 500 error key (P-5).

Add import: `import { ShiftStatusSchema } from '@/lib/fieldSchemas';`

Replace body parsing:
```typescript
const body = await req.json().catch(() => ({}));
const parsed = ShiftStatusSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
    { status: 400 }
  );
}
const shiftDateInput = parsed.data.shiftDate;
```

Then replace the `shiftDate` assignment:
```typescript
const shiftDate = shiftDateInput ?? new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Los_Angeles',
  year: 'numeric', month: '2-digit', day: '2-digit'
}).format(new Date());
```

Replace catch block: `{ success: false, message: 'Internal Server Error' }`.

---

### Task 15 — Update `field/jobs/route.ts`

**What changes:** Standardize 500 error key only (P-5). This is a GET route — no body to validate.

Replace catch block:
```typescript
  } catch (error) {
    console.error('jobs error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
```

No other changes to this file.

---

### Task 16 — Create `tech-pwa/src/app/api/health/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await db.execute(sql`SELECT 1`);
    return NextResponse.json({
      status: 'ok',
      db: 'ok',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[health] DB check failed:', error);
    return NextResponse.json(
      { status: 'error', db: 'error', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
```

No auth required on this endpoint — health checks must be publicly accessible for uptime monitors.

---

### Task 17 — Investigate `tests/e2e/auth.spec.ts:34:7` (P-7)

Read `tests/e2e/auth.spec.ts`. Find the test at line ~34. Paste the full test block here: `______`

Determine: does it skip due to a `test.skip()` call, a `test.fixme()`, a `beforeEach` condition, or a missing environment variable? Paste the skip mechanism: `______`

**Decision rule:**
- If the test skips due to dormant system (no live data available): add a comment `// SKIP: dormant system — re-enable when field techs are active` and leave as skip.
- If the test skips due to a broken code precondition (e.g., missing env var, wrong URL, broken auth): fix the root cause. Do not skip it with a comment — fix it.
- If the test was previously failing (pre-P3-5) and now silently skips: identify why it stopped asserting. Fix the assertion or the code it tests.

Paste final state of lines 30–50 after your change: `______`

---

### Task 18 — Audit 36 skipped Playwright tests (P-8)

Run:
```bash
cd tech-pwa && npx playwright test --reporter=list 2>&1 | grep -E "skipped|○"
```

For each skipped test, determine the reason. Categorize into:
- **DORMANT**: test requires live field tech activity (clock-in, live jobs, etc.) — acceptable skip, add annotation comment if not already present
- **ENV**: test requires an env var not set in CI — acceptable if documented
- **BROKEN**: test skips due to a code bug or broken precondition — MUST FIX

Paste the categorized list in `artifacts/ag_test_results.txt` as:
```
DORMANT (N): [test names]
ENV (N): [test names]
BROKEN (N): [test names]
```

Fix all BROKEN tests. Leave DORMANT and ENV as skips. Each DORMANT skip must have a `// SKIP: dormant system` comment in the test file. Each ENV skip must reference the missing env var.

---

### Task 19 — `npx tsc --noEmit` → diff → push → stop

```bash
cd tech-pwa && npx tsc --noEmit
```
Must return zero errors. If errors found: fix them. Zero errors = proceed.

```bash
git push origin feat/tier-2-5-security-hardening
git diff main...HEAD > artifacts/ag_diff.txt
git add artifacts/ag_diff.txt && git commit -m "chore(tier-2-5): add diff artifact"
git push origin feat/tier-2-5-security-hardening
```

Post to Claude Code: `diff committed and pushed — [line count] lines` — then **STOP**. Do not start dev server. Do not run Playwright. Wait for PASS.

---

### Task 20 — Test sprint (separate session, after Claude Code PASS on diff)

Start dev server: `cd tech-pwa && npm run dev`

**Evidence required — fill every blank:**

**Rate limiting (P-0):**
Make 6 consecutive POST requests to `http://localhost:3000/api/field/auth/login` with `{ "badge": "1", "pin": "9999" }` (wrong PIN). Use curl or a browser fetch loop.

- Attempt 1–5 status codes (all must be 401): `______`
- Attempt 6 status code (must be 429): `______`
- Attempt 6 response body: `______`
- `Retry-After` header value on attempt 6: `______`

> If Redis not configured: paste the console warning and mark this item `KV_NOT_CONFIGURED — verify in production`.

**Token hashing (P-2):**
Log in with badge `1`, PIN `1234` (dev). Copy the `token` from the response.

- Returned token (first 8 chars): `______`
- Run against Neon dev DB: `SELECT "sessionToken" FROM employees WHERE badge = '1' LIMIT 1;`
- DB stored value (first 8 chars): `______`
- These two values must be **different** (raw vs. hash). If they match, token hashing is broken. Paste both: `______`

**Token auth still works (P-2 regression check):**
With the raw token from login, fetch `http://localhost:3000/api/field/jobs` with `Authorization: Bearer <raw_token>`.

- Response status: `______` (must be 200)
- Response body excerpt: `______`

**24-hour expiry (P-4):**
From the login response, paste `expiresAt`: `______`
It must be within 24–25 hours of now, not 30 days. Confirm: `______` (yes/no)

**Zod validation (P-1):**
POST `http://localhost:3000/api/field/auth/login` with `{ "badge": "", "pin": "1234" }` (empty badge).

- Response status: `______` (must be 400)
- Response body: `______` (must contain `message: "Invalid request"` and `details`)

POST `http://localhost:3000/api/field/clock-in` with valid Bearer token and body `{}` (missing jobId).

- Response status: `______` (must be 400)
- Response body: `______` (must mention `jobId`)

**Health check (P-6):**
GET `http://localhost:3000/api/health`

- Response status: `______` (must be 200)
- Response body: `______` (must be `{"status":"ok","db":"ok","timestamp":"..."}`)

**auth.spec.ts (P-7):**
Paste the resolution for auth.spec.ts:34:7: `______` (fixed / annotated — describe what changed)

**Playwright full suite:**
Kill dev server first: `Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }`

Run: `npx playwright test`
Paste the full summary line: `______`
Baseline was `36 skipped, 40 passed, 0 failed`. Zero new failures allowed.

Commit `artifacts/ag_test_results.txt` and push. Post to Claude Code — **STOP**. Wait for "Clear to merge."

---

### Task 21 — Merge

Merge only after Claude Code issues "Clear to merge." Not before.

---

## Orchestrator usage

Run this from repo root after opening the PR:

```bash
python tools/orchestrator/ptow_adw.py specs/SPRINT_TIER_2_5_SECURITY.md \
  --branch feat/tier-2-5-security-hardening \
  --pr <PR_NUMBER>
```

The orchestrator handles implement → diff review → test → test gate → merge autonomously. Brandon reads the final `RESULT:` line.

---

## Claude Code review flags (for manual review — auth path)

Claude Code reads these specific sections of the diff before issuing PASS:
1. `rateLimit.ts` — verify `checkLoginRateLimit` increments before checking, gracefully degrades on KV error
2. `login/route.ts` — verify `hashToken(rawToken)` is what's stored, `rawToken` is what's returned to client
3. `fieldAuth.ts` — verify `hashToken(incomingToken)` is what's queried against `employees.sessionToken`
4. Confirm the raw token and the stored hash are provably different (different lengths is a good check — raw is 64 hex chars, SHA-256 of 64 hex chars is also 64 hex chars but a different value)

> **Note:** SHA-256 of a 64-char hex string is itself a 64-char hex string — they'll be the same length. The test sprint evidence (Task 20, Token hashing section) proves correctness by comparing first 8 chars.
