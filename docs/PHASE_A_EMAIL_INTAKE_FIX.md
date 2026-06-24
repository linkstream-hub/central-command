# Phase A — Email Intake Hotfix
# Unblocks Phase 23 (n8n Stub Node Porting). NOT a replacement for it.

## Root Cause (confirmed by code audit)

Three intake routes exist. The WRONG one is running:

| Route | Gemini | Auth | Dedup | Should run? |
|---|---|---|---|---|
| `/api/parse` | yes (old SDK, no auth) | NO | NO | No — GAS legacy, abandon |
| `/api/webhooks/n8n/gmail` | yes (AI SDK, proper) | yes | NO | YES — fix 4 bugs, wire n8n to it |
| `/api/jobs/sync` | NO | yes | yes | No — dumb extraction, n8n currently calls this |

n8n currently calls `/api/jobs/sync` → no Gemini → "Requester Unknown" on every non-web-form email.

**Fix: wire n8n to `/api/webhooks/n8n/gmail`. Fix its 4 bugs first.**

---

## Four Bugs in `/api/webhooks/n8n/gmail`

### Bug 1 — No dedup
`jobId = APT-${random}` — same email polled twice = 2 WOs.
Fix: `jobId = EMAIL-${gmailMsgId}` + upsert on conflict.

### Bug 2 — Auth header mismatch
Route checks `Authorization: Bearer ${key}`.
n8n sends `DASHBOARD_API_KEY: <key>` (Header Auth credential).
Fix: change route to check `req.headers.get('DASHBOARD_API_KEY')`.

### Bug 3 — Wrong addressKey algorithm
Route uses: `` `${address.toLowerCase()}-${unit}-${city}` ``
Correct function: `normalizeAddressKey(address, unit)` from `@/lib/normalizeAddressKey`.
Mismatch → property lookup fails → rmName empty → "Requester Unknown".

### Bug 4 — Outdated Gemini model
`google('gemini-1.5-flash')` → `google('gemini-2.5-flash')` (confirmed stable at ai.google.dev).

---

## TDD REQUIREMENT — NON-NEGOTIABLE

Write ALL tests FIRST. Run them. Watch them FAIL. Then write production code.
Zero production code before a failing test. No exceptions per Pocock TDD.

---

## Success Criteria (all must pass before CLEAR TO MERGE)

1. `POST /api/webhooks/n8n/gmail` without `DASHBOARD_API_KEY` header → 401
2. `POST` with same `gmailMsgId` twice → exactly 1 row in DB (upsert, not duplicate)
3. `POST` with email whose address matches a property in DB → `rmName` from property table, non-empty
4. `POST` with email whose address does NOT match a property → `rmName` extracted from `sender` param (fallback)
5. `POST` with valid email → `jobId = EMAIL-{gmailMsgId}`, `gmailMsgId` stored
6. n8n test execution → WO in DB with `rmName`, `description`, `gmailMsgId` all non-null
7. tsc clean, vitest GREEN, lint clean

---

## PRE-DEPLOY CHECK (AG must verify before testing n8n step)

Check Vercel env vars — one of these MUST be set for AI SDK to work:
- `GOOGLE_GENERATIVE_AI_API_KEY` (AI SDK default — most likely)
- `GOOGLE_API_KEY`
- `GEMINI_API_KEY`

Run: `vercel env ls` or check Vercel dashboard → Settings → Environment Variables.
If none set → STOP. Do NOT proceed to n8n testing. Flag to Claude Code.

---

## TASK LIST

### Task 0 — Branch
```
git checkout -b fix/email-intake-parse
```
Verify: `git branch` shows `fix/email-intake-parse`, NOT main.

---

### Task 1 — Write failing tests FIRST

File (new): `tech-pwa/src/app/api/webhooks/n8n/gmail/__tests__/gmail.webhook.post.test.ts`

Pattern: matches `tech-pwa/src/app/api/jobs/__tests__/[jobId].patch.test.ts`
- Real Neon dev DB via `DATABASE_URL`
- Mock ONLY `@ai-sdk/google` (do NOT call real Gemini in tests — stub `generateObject` to return fixture data)
- Clean up inserted rows after each test

Mock setup:
```typescript
vi.mock('ai', () => ({
  generateObject: vi.fn().mockResolvedValue({
    object: {
      address: '507 Magnolia Ave',
      unit: '',
      city: 'Oakland',
      description: 'Broken faucet in kitchen',
      category: 'Plumbing',
      priority: '4-STANDARD',
      tenantName: 'Jane Doe',
      tenantPhone: '510-555-1234',
      tenantEmail: 'jane@example.com',
      emailType: 'adhoc_workorder',
      notes: '',
    }
  })
}));
```

Required tests (write these — watch each FAIL before writing production code):

```typescript
// TEST 1: auth guard — DASHBOARD_API_KEY header, not Bearer
it('returns 401 without DASHBOARD_API_KEY header', async () => { ... })

// TEST 2: dedup — same gmailMsgId twice = 1 row
it('upserts on gmailMsgId — second POST does not create duplicate', async () => { ... })

// TEST 3: jobId format
it('sets jobId to EMAIL-{gmailMsgId}', async () => { ... })

// TEST 4: gmailMsgId stored
it('stores gmailMsgId on the created job', async () => { ... })

// TEST 5: rmName from property when address matches
// Insert a test property with known addressKey first, then verify rmName populated
it('populates rmName from properties table when address matches', async () => { ... })

// TEST 6: rmName from sender when property not found
// No property in DB for address → rmName extracted from sender field
it('falls back to sender name when property not found', async () => {
  // sender = '"Joy Gim" <maintenance@laphamcompany.com>'
  // expected rmName = 'Joy Gim'
})
```

Run: `cd tech-pwa && npx vitest run src/app/api/webhooks/n8n/gmail/__tests__/gmail.webhook.post.test.ts`
All 6 must FAIL before touching production code.

---

### Task 2 — Fix `/api/webhooks/n8n/gmail/route.ts`

Surgical changes only. Do NOT rewrite the file. Touch only what each bug fix requires.

#### 2a. Fix auth header (Bug 2)
Replace:
```typescript
const authHeader = request.headers.get('authorization');
if (authHeader !== `Bearer ${process.env.DASHBOARD_API_KEY}`) {
```
With:
```typescript
const apiKey = request.headers.get('DASHBOARD_API_KEY');
if (apiKey !== process.env.DASHBOARD_API_KEY) {
```

#### 2b. Add `sender` to accepted payload (needed for Bug 4 fallback)
```typescript
const { subject, bodyText, gmailMsgId, sender } = payload;
```

Require `gmailMsgId` — return 400 if missing.

#### 2c. Fix addressKey (Bug 3)
Add import at top:
```typescript
import { normalizeAddressKey } from '@/lib/normalizeAddressKey';
```

Replace:
```typescript
const addressKey = `${address.toLowerCase()}-${(unit || '').toLowerCase()}-${(city || 'Oakland').toLowerCase()}`;
```
With:
```typescript
const addressKey = normalizeAddressKey(address, unit);
```

#### 2d. Add rmName fallback from sender (Bug 4 supplement)
After property lookup block, add fallback:
```typescript
if (!rmName && sender) {
  // Parse "Name <email>" or "email" format
  const match = sender.match(/^"?(.+?)"?\s*<.+>$/) ?? sender.match(/^([^<@]+)/);
  rmName = match?.[1]?.trim() || '';
}
```

#### 2e. Fix dedup — change jobId + upsert (Bug 1)
Replace:
```typescript
const newJobId = `APT-${Math.floor(Math.random() * 90000) + 10000}`;

const [newJob] = await db.insert(jobs).values({
  ...
  jobId: newJobId,
  ...
}).returning();
```
With:
```typescript
const newJobId = `EMAIL-${gmailMsgId}`;

const { id: _id, createdAt: _ca, jobId: _jid, ...updateSet } = {
  orgId: 'APT-CA',
  propertyId: propId,
  jobId: newJobId,
  address: address || 'Unknown Address',
  unit: unit || '',
  category: category || 'General Repair',
  priority: priority || '4-STANDARD',
  description: description || '',
  timing: timing || '',
  tenantName: tenantName || '',
  tenantPhone: tenantPhone || '',
  tenantEmail: tenantEmail || '',
  rmName,
  rmEmail,
  accessInfo,
  emailType: emailType || 'adhoc_workorder',
  notes: notes || '',
  gmailMsgId: gmailMsgId || '',
  status: 'Needs Review',
  timestamp: new Date(),
};

const insertData = { ...updateSet, jobId: newJobId, orgId: 'APT-CA' };
const [newJob] = await db.insert(jobs)
  .values(insertData)
  .onConflictDoUpdate({ target: jobs.jobId, set: updateSet })
  .returning();
```

#### 2f. Fix Gemini model (Bug 4)
Replace:
```typescript
model: google('gemini-1.5-flash'),
```
With:
```typescript
model: google('gemini-2.5-flash'),
```

Apply same fix to the FALLBACK's model if it uses one (check the catch block — the fallback does NOT call Gemini, so no change needed there).

#### 2g. Fix fallback jobId (also random — same dedup bug in fallback path)
In the catch block fallback:
```typescript
const newJobId = `APT-${Math.floor(Math.random() * 90000) + 10000}`;
```
Replace with:
```typescript
const newJobId = `EMAIL-${payload.gmailMsgId || Date.now()}`;
```
And change the fallback insert to use `.onConflictDoUpdate` as well.

---

### Task 3 — Run tests GREEN

```
cd tech-pwa && npx vitest run src/app/api/webhooks/n8n/gmail/__tests__/gmail.webhook.post.test.ts
```

All 6 must pass. Fix production code (NOT tests) until they do.

---

### Task 4 — tsc + lint

```
cd C:\PTOW\1_APT_Central_Command
npx tsc --noEmit 2>&1
```
Must be clean. No `@ts-ignore`, no `as any`.

```
cd tech-pwa && npx next lint 2>&1
```
Must be clean.

---

### Task 5 — Update n8n workflow `wif9XlVbK3M6a1C8`

**After tasks 1-4 pass.** **After pre-deploy check confirms Gemini env var is set.**

New n8n workflow shape (3 nodes total):
```
Gmail Trigger → HTTP: POST /api/webhooks/n8n/gmail → [on error → PTOW Error Handler]
```

Delete nodes:
- Code: Skip Filter
- IF: Skip?
- IF: Lapham Form?
- Code: Lapham Extraction
- Code: Normalize Address Key
- Neon: Property Lookup
- Code: Merge Property Data
- IF: Access Info Changed?
- HTTP: POST jobs/sync

Add node — "HTTP: POST n8n/gmail webhook":
```yaml
Method: POST
URL: https://dispatch.aptmaintenanceinc.com/api/webhooks/n8n/gmail
Auth: Header Auth — credential "Header Auth account" (same as before)
      Header name: DASHBOARD_API_KEY
Body (JSON expression):
  {
    "sender": "={{ $json.from.text }}",
    "subject": "={{ $json.subject }}",
    "bodyText": "={{ $json.text }}",
    "gmailMsgId": "={{ $json.id }}"
  }
On error: route to PTOW Error Handler (NUH0krzQiSrBmyfv)
```

After wiring: run ONE manual test execution in n8n with a real Gmail message.
Verify: HTTP node returns `{"success": true, "job": {...}}` with non-empty `rmName` and `description`.

Export updated workflow:
```
python tools/n8n/export.py
```
Commit the updated JSON in `tools/n8n/workflows/`.

---

### Task 6 — git diff + push

```
git branch              # must show fix/email-intake-parse
git diff main --stat    # review what changed
git push origin fix/email-intake-parse
```

Diff must include:
- `tech-pwa/src/app/api/webhooks/n8n/gmail/route.ts` (modified)
- `tech-pwa/src/app/api/webhooks/n8n/gmail/__tests__/gmail.webhook.post.test.ts` (new)
- `tools/n8n/workflows/wif9XlVbK3M6a1C8.json` (updated export)

Diff must NOT include:
- `/api/parse/route.ts`
- `/api/jobs/sync/route.ts`
- Schema
- Any other route or component

---

## SCOPE CONSTRAINT

Touch ONLY:
1. `tech-pwa/src/app/api/webhooks/n8n/gmail/route.ts`
2. `tech-pwa/src/app/api/webhooks/n8n/gmail/__tests__/gmail.webhook.post.test.ts` (new)
3. `tools/n8n/workflows/wif9XlVbK3M6a1C8.json`

Do NOT touch `/api/parse`, `/api/jobs/sync`, schema, or dashboard components.

---

## DB CLEANUP (after Phase 23 confirmed on 3+ real emails — Claude Code executes, NOT AG)

```sql
DELETE FROM jobs
WHERE gmail_msg_id IS NOT NULL
  AND rm_name IS NULL
  AND description IS NULL
  AND status = 'Needs Review';
```
Claude Code verifies row count before executing. Not part of this PR.
