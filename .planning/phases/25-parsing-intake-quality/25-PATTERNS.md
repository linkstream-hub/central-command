# Phase 25: Parsing & Intake Quality - Pattern Map

**Mapped:** 2026-06-10
**Files analyzed:** 8 new/modified files
**Analogs found:** 8 / 8

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `tech-pwa/src/lib/normalizeAddressKey.ts` | utility | transform | `tech-pwa/src/lib/wc-codes.ts` | exact |
| `tech-pwa/src/lib/detectLaphamForm.ts` | utility | transform | `tech-pwa/src/lib/wc-codes.ts` | exact |
| `tech-pwa/src/app/api/intake/access-sync/route.ts` | route (API) | request-response | `tech-pwa/src/app/api/jobs/sync/route.ts` | exact |
| `tech-pwa/src/lib/email.ts` (add `sendRequesterAutoReply` + `sendTenantCoordinationEmail`) | utility | request-response | `tech-pwa/src/lib/email.ts` (existing file) | exact — modify in place |
| `tech-pwa/src/lib/__tests__/normalizeAddressKey.test.ts` | test | transform | `tech-pwa/src/lib/__tests__/wc-codes.test.ts` | exact |
| `tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts` | test | transform | `tech-pwa/src/lib/__tests__/compliance.test.ts` | exact |
| `tech-pwa/src/lib/__tests__/access-codes.test.ts` | test | request-response | `tech-pwa/src/lib/__tests__/compliance.test.ts` | role-match |
| `tools/n8n/workflows/phase-19-email-polling.json` | n8n workflow | event-driven | `tools/n8n/workflows/ca-break-compliance-monitor.json` | role-match |

---

## Pattern Assignments

### `tech-pwa/src/lib/normalizeAddressKey.ts` (utility, transform)

**Analog:** `tech-pwa/src/lib/wc-codes.ts`

**Imports pattern** (`wc-codes.ts` lines 1–11):
```typescript
// No external imports. Pure TypeScript with a named interface at the top.
interface WCTier {
  code: string;
  desc: string;
  minWage: number;
}
```
Copy this structure: define a narrow input type at the top, no framework imports.

**Core pattern** (`wc-codes.ts` lines 53–61):
```typescript
/** JSDoc on the single exported function describing inputs + return. */
export function resolveWCCode(category: string, hourlyWage: number | null | undefined): string {
  const wage = Number(hourlyWage) || 0;
  const tiers = WC_CODES[category] || WC_CODES['General Repair'];
  const sorted = [...tiers].sort((a, b) => b.minWage - a.minWage);
  for (const tier of sorted) {
    if (wage >= tier.minWage) return tier.code;
  }
  return sorted[sorted.length - 1].code;
}
```
Port the GAS `normalizeAddressKey` verbatim as a single exported function with the same signature. See RESEARCH.md Pattern 2 for the exact algorithm. The function signature must be:
```typescript
export function normalizeAddressKey(address: string, unit?: string): string
```

**Error handling:** No try/catch — pure transform. Return the normalized key unconditionally. Null/empty inputs handled via `String(value || '')` at the top of the function (same as GAS source).

---

### `tech-pwa/src/lib/detectLaphamForm.ts` (utility, transform)

**Analog:** `tech-pwa/src/lib/wc-codes.ts`

**Imports pattern:** No framework imports. Define result shape as a TypeScript interface:
```typescript
export interface LaphamParseResult {
  isLaphamForm: boolean;
  confidence: 'High' | 'Medium' | 'Low';
  emailType: 'adhoc_workorder' | 'turnover' | 'inspection' | 'unknown';
  address: string;
  unit: string;
  rmName: string;
  rmEmail: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  tenantPreferredContact: string;
  tenantHasPets: string;
  pteGranted: 'Yes' | 'No' | 'Not Applicable';
  pteNotes: string;
  description: string;
  senderLookupNeeded: boolean;
}
```

**Core pattern** (`wc-codes.ts` lines 53–61 — same single-export structure):
```typescript
export function detectLaphamForm(
  senderEmail: string,
  subject: string,
  body: string
): LaphamParseResult | null
```
Returns `null` when not a Lapham form (caller falls through to Gemini path). This mirrors how `resolveWCCode` returns a fallback but never throws.

**Two-line regex strategy** (from RESEARCH.md Pattern 3 — CRITICAL):
```typescript
// Port BOTH regex patterns for every field — Apple Mail forwarded forms
// render <b>Field</b><br>Value as Field\nValue (two-line format)
function field(label: string, text: string): string {
  // Same-line: "Label: Value" or "Label:Value"
  const sameLine = new RegExp(String.raw`${label}\s*:\s*(.+)`, 'i').exec(text);
  if (sameLine) return sameLine[1].trim();
  // Two-line: "Label\nValue" (Apple Mail forward rendering)
  const twoLine = new RegExp(String.raw`${label}\s*\n([^\n]+)`, 'i').exec(text);
  if (twoLine) return twoLine[1].replace(/^>\s*/, '').trim();
  return '';
}
```

**Detection guard** (from RESEARCH.md Pattern 3):
```typescript
const isLapham =
  senderEmail === 'website@laphamcompany.com' ||
  body.includes('Submitted values are:') ||
  body.includes('Webform submission from: Maintenance Request');
if (!isLapham) return null;
```

**Error handling:** No try/catch — pure parse. Missing fields return empty string, not null. `senderLookupNeeded = (address === '' || address === 'LOOKUP_BY_SENDER')`.

---

### `tech-pwa/src/app/api/intake/access-sync/route.ts` (route, request-response)

**Analog:** `tech-pwa/src/app/api/jobs/sync/route.ts`

**Imports pattern** (`jobs/sync/route.ts` lines 1–4):
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { properties } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
```

**Auth pattern** (`jobs/sync/route.ts` lines 9–12) — internal API key only, NOT session auth:
```typescript
// TechPWA.gs sends the key as header name 'DASHBOARD_API_KEY' (not 'x-api-key') — intentional
const apiKey = req.headers.get('DASHBOARD_API_KEY');
if (apiKey !== process.env.DASHBOARD_API_KEY) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```
Use this exact pattern. Do NOT use `auth()` (session-based). This route is called by n8n HTTP Request node, not a browser session.

**Core upsert pattern** (`jobs/sync/route.ts` lines 37–44):
```typescript
const result = await db.insert(jobs)
  .values(jobData)
  .onConflictDoUpdate({
    target: jobs.jobId,
    set: jobData
  })
  .returning();
```
For `access-sync`, the conflict target is `properties.id` (after SELECT to find the row). Use `db.update(properties).set({ accessInfo: merged }).where(eq(properties.id, existing.id))` — not an upsert INSERT because the property row must already exist.

**Error handling pattern** (`jobs/sync/route.ts` lines 47–50):
```typescript
} catch (error: unknown) {
  console.error('Job sync error:', error);
  return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
}
```

**Full route shape** (from RESEARCH.md Code Examples section):
```typescript
export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('DASHBOARD_API_KEY');
  if (apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { addressKey, inboundAccessInfo, orgId = 'APT-CA' } = await req.json();
    // SELECT existing → compare codes → conditional UPDATE → return { updated, newCodes/reason }
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
```

**Input validation:** Validate `addressKey` is a non-empty string before the Neon query. Return 400 (not 500) for missing required fields:
```typescript
if (!addressKey || typeof addressKey !== 'string') {
  return NextResponse.json({ error: 'addressKey required' }, { status: 400 });
}
```

---

### `tech-pwa/src/lib/email.ts` — add `sendRequesterAutoReply` + `sendTenantCoordinationEmail` (utility, request-response)

**Analog:** `tech-pwa/src/lib/email.ts` — modify the existing file. Copy the function pattern from the existing `sendTenantScheduledEmail` and `sendPteCoordinationEmail` functions.

**Dev guard pattern** (`email.ts` lines 22–26) — copy exactly for every new function:
```typescript
if (!to || !to.includes('@')) return;
if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true') {
  console.log(`[DEV/TEST EMAIL BLOCKED] Auto-reply → ${to} | ${address}`);
  return;
}
```

**Lazy-init Resend pattern** (`email.ts` lines 5–5):
```typescript
const getResend = () => new Resend(process.env.RESEND_API_KEY || 're_placeholder');
```
Use `getResend()` inside the function body — never construct `new Resend(...)` at module load time.

**Send pattern** (`email.ts` lines 30–57):
```typescript
await getResend().emails.send({
  from: 'noreply@aptmaintenanceinc.com',
  to,
  replyTo: 'workorder@aptmaintenanceinc.com',
  subject: `Request Received — ${address}`,
  html: `...`
});
```
`from` is always `noreply@aptmaintenanceinc.com`. `replyTo` is always `workorder@aptmaintenanceinc.com`.

**Wrap in try/catch** (`email.ts` lines 58–60):
```typescript
} catch (error) {
  console.error('Failed to send tenant scheduled email:', error);
}
```
Never let email failures throw — log and swallow.

**Caller gate for auto-reply** (from RESEARCH.md Pattern 4 — add before calling the new function):
```typescript
// Do NOT auto-reply to APT Internal forwards
if (parsed.senderType === 'APT Internal') return;
```

**HTML template** (`email.ts` lines 36–56): Use the same dark-themed inline HTML structure with `BRAND_COLOR`, `BG_COLOR` constants. Keep the auto-reply under 80 words of visible text.

---

### `tech-pwa/src/lib/__tests__/normalizeAddressKey.test.ts` (test, transform)

**Analog:** `tech-pwa/src/lib/__tests__/wc-codes.test.ts`

**Test framework + imports** (`wc-codes.test.ts` lines 1–2):
```typescript
import { describe, test, expect } from 'vitest';
import { normalizeAddressKey } from '../normalizeAddressKey';
```

**Test structure** (`wc-codes.test.ts` — full file pattern):
```typescript
describe('normalizeAddressKey', () => {
  test('strips city/state suffix at comma boundary', () => {
    expect(normalizeAddressKey('123 Main St, Oakland, CA')).toBe('123 main st||');
  });
  test('extracts embedded unit from address', () => {
    expect(normalizeAddressKey('456 Elm Ave #2B')).toBe('456 elm ave||2b');
  });
  test('normalizes ## to #', () => { ... });
  test('street type abbreviations lowercased', () => { ... });
  test('empty address returns ||', () => { ... });
});
```

**Coverage scope:** Every step in the algorithm (RESEARCH.md Pattern 2, steps 1–7) needs at least one test. Include edge cases: `##` double-hash, embedded unit with explicit unit param, `avenue` vs `ave`, no city suffix.

**vitest.config.ts coverage** — add `normalizeAddressKey.ts` and `detectLaphamForm.ts` to the `coverage.include` array in `tech-pwa/vitest.config.ts` (current list only covers `compliance.ts` and `job-transitions.ts`):
```typescript
coverage: {
  include: [
    'src/lib/compliance.ts',
    'src/lib/job-transitions.ts',
    'src/lib/normalizeAddressKey.ts',  // add
    'src/lib/detectLaphamForm.ts',     // add
  ],
  thresholds: { lines: 100, functions: 100, branches: 90 },
},
```

---

### `tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts` (test, transform)

**Analog:** `tech-pwa/src/lib/__tests__/compliance.test.ts`

**Imports** (`compliance.test.ts` lines 1–2):
```typescript
import { describe, it, expect } from 'vitest';
import { detectLaphamForm } from '../detectLaphamForm';
```

**Fixture pattern** (`compliance.test.ts` lines 5–7 — use helpers to build fixture inputs):
```typescript
// compliance.test.ts uses date helpers; detectLaphamForm.test.ts should use string fixture constants
const LAPHAM_FORM_BODY = `Webform submission from: Maintenance Request\nName: Jane Smith\nAddress: 123 Elm St\n...`;
const LAPHAM_FORWARDED_BODY = `---------- Forwarded message ---------\n...\nName\nJane Smith\nAddress\n123 Elm St\n...`;
```

**Test organization** (`compliance.test.ts` — nested describe blocks per feature):
```typescript
describe('detectLaphamForm — detection', () => {
  it('detects by sender email', () => { ... });
  it('detects by Submitted values marker', () => { ... });
  it('returns null for non-Lapham email', () => { ... });
});
describe('detectLaphamForm — field extraction (same-line format)', () => { ... });
describe('detectLaphamForm — field extraction (forwarded/two-line format)', () => { ... });
describe('detectLaphamForm — emailType detection', () => {
  it('turnover keyword → emailType=turnover', () => { ... });
  it('inspection keyword → emailType=inspection', () => { ... });
  it('normal description → emailType=adhoc_workorder', () => { ... });
});
describe('detectLaphamForm — PTE mapping', () => { ... });
describe('detectLaphamForm — tenant exempt fields', () => {
  it('does not hallucinate tenant for turnover WO', () => { ... });
});
```

---

### `tech-pwa/src/lib/__tests__/access-codes.test.ts` (test, request-response)

**Analog:** `tech-pwa/src/lib/__tests__/compliance.test.ts` (structure/vitest); `tech-pwa/src/app/api/jobs/sync/route.ts` (subject under test pattern)

**Note:** This tests the `extractCodes` helper and the merge logic, not the full HTTP route. The route itself is tested via integration fixture.

**Imports:**
```typescript
import { describe, it, expect } from 'vitest';
// Test the extractCodes + normalizeAccessInfo helpers exported from access-sync utility module
// OR extract those pure functions into a testable utility and test them independently
```

**Test cases required:**
- `extractCodes` returns unique 3–6 digit matches
- `extractCodes` returns empty array for text with no numeric codes
- Merge logic: inbound codes subset of DB codes → `{ updated: false, reason: 'no_new_codes' }`
- Merge logic: inbound has truly new code → `{ updated: true, newCodes: ['...'] }`
- Merge format: result is `existingAccessInfo + " | " + inboundAccessInfo` (not replace)
- Property not found → `{ updated: false, reason: 'property_not_found' }`

---

### `tools/n8n/workflows/phase-19-email-polling.json` (n8n workflow, event-driven)

**Analog:** `tools/n8n/workflows/ca-break-compliance-monitor.json`

**Top-level JSON structure** (`ca-break-compliance-monitor.json` lines 1–9):
```json
{
  "updatedAt": "...",
  "createdAt": "...",
  "id": "...",
  "name": "Phase 19 — Email Polling & WO Intake",
  "description": "",
  "active": false,
  "isArchived": false,
  "nodes": [ ... ],
  "connections": { ... },
  "settings": { "errorWorkflow": "PTOW Error Handler" }
}
```
Set `"active": false` on commit — workflow must be manually activated after GAS stub is inserted.

**Node shape** (`ca-break-compliance-monitor.json` lines 10–85):
```json
{
  "parameters": { ... },
  "name": "Node Name",
  "type": "n8n-nodes-base.typeId",
  "typeVersion": 1,
  "position": [x, y],
  "id": "uuid-here"
}
```

**n8n HTTP Request node pattern for Resend** (`flag-gate.json` lines 17–43 — existing Resend HTTP Request pattern):
```json
{
  "parameters": {
    "method": "POST",
    "url": "https://api.resend.com/emails",
    "sendHeaders": true,
    "headerParameters": {
      "parameters": [
        { "name": "Authorization", "value": "=Bearer {{ $env.RESEND_API_KEY }}" },
        { "name": "Content-Type",  "value": "application/json" }
      ]
    },
    "sendBody": true,
    "specifyBody": "string",
    "body": "={{ JSON.stringify({ ... }) }}"
  },
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4
}
```

**OpenPhone HTTP Request node** — copy the Resend node shape but change auth header (NOT Bearer):
```json
{
  "headerParameters": {
    "parameters": [
      { "name": "Authorization", "value": "={{ $env.OPENPHONE_API_KEY }}" },
      { "name": "Content-Type",  "value": "application/json" }
    ]
  }
}
```

**Code node (function node)** (`ca-break-compliance-monitor.json` lines 73–84):
```json
{
  "parameters": {
    "functionCode": "// JavaScript — items[0].json contains upstream output\nreturn [{ json: { ... } }];"
  },
  "type": "n8n-nodes-base.function",
  "typeVersion": 1
}
```
All ported parsing logic (shouldSkipEmail, detectLaphamForm, normalizeAddressKey, normalizePhone) goes in Code nodes of this type.

**IF node (conditional branch)** (`ca-break-compliance-monitor.json` lines 86–106):
```json
{
  "parameters": {
    "conditions": {
      "boolean": [{ "value1": "={{ $json.isLaphamForm }}", "value2": true }]
    },
    "combineOperation": "all"
  },
  "type": "n8n-nodes-base.if",
  "typeVersion": 1
}
```

**Credential reference** (`ca-break-compliance-monitor.json` lines 65–71) — use `"name"` only, never `"id"`:
```json
"credentials": {
  "googleSheetsOAuth2Api": {
    "name": "Google account"
  }
}
```
For n8n Postgres node: use `"name": "Neon Postgres"` (verify exact credential name in Railway n8n before committing).

**Env var reference** in n8n expression: `{{ $env.VARIABLE_NAME }}` — never hardcode API keys in workflow JSON.

**MANIFEST.json** — add new workflow entry after committing:
```json
{
  "id": "<assigned-by-n8n>",
  "name": "Phase 19 — Email Polling & WO Intake",
  "slug": "phase-19-email-polling",
  "file": "phase-19-email-polling.json",
  "active": false
}
```

---

## Shared Patterns

### API Key Auth (DASHBOARD_API_KEY)

**Source:** `tech-pwa/src/app/api/jobs/sync/route.ts` lines 9–12
**Source (confirmed same):** `tech-pwa/src/app/api/properties/route.ts` lines 7–9
**Apply to:** `POST /api/intake/access-sync`

```typescript
const apiKey = req.headers.get('DASHBOARD_API_KEY');
if (apiKey !== process.env.DASHBOARD_API_KEY) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

Header name is `DASHBOARD_API_KEY` (not `x-api-key`). Matching header name in n8n HTTP Request node is mandatory — see RESEARCH.md Pitfall 8.

### Dev/Sandbox Write Guard

**Source:** `tech-pwa/src/lib/email.ts` lines 23–26
**Apply to:** `sendRequesterAutoReply`, `sendTenantCoordinationEmail`, any n8n node that sends outbound comms

```typescript
if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true') {
  console.log(`[DEV/TEST EMAIL BLOCKED] Auto-reply → ${to} | ${address}`);
  return;
}
```

n8n equivalent: gate the Resend/OpenPhone nodes behind an IF node checking `{{ $env.NODE_ENV === 'production' }}`. Real incident (3 emails to Lapham client from local dev) makes this non-negotiable.

### Drizzle Upsert (onConflictDoUpdate)

**Source:** `tech-pwa/src/app/api/jobs/sync/route.ts` lines 37–44
**Apply to:** Any Neon write in new routes

```typescript
await db.insert(table)
  .values(data)
  .onConflictDoUpdate({ target: table.naturalKey, set: data })
  .returning();
```

For `access-sync`, use `db.update()` (not insert) since the property row must already exist.

### Error Handling in API Routes

**Source:** `tech-pwa/src/app/api/jobs/sync/route.ts` lines 47–50
**Apply to:** All new API routes

```typescript
} catch (error: unknown) {
  console.error('[route description] error:', error);
  return NextResponse.json(
    { error: error instanceof Error ? error.message : 'Unknown error' },
    { status: 500 }
  );
}
```

### Resend Initialization

**Source:** `tech-pwa/src/lib/email.ts` line 5
**Apply to:** Any new email-sending code in `email.ts`

```typescript
const getResend = () => new Resend(process.env.RESEND_API_KEY || 're_placeholder');
```

Never construct at module scope — prevents build failures when `RESEND_API_KEY` is absent.

### Vitest Test Runner

**Source:** `tech-pwa/vitest.config.ts`
**Apply to:** All new test files under `tech-pwa/src/lib/__tests__/`

```typescript
// vitest.config.ts — add new lib files to coverage.include
include: ['src/**/__tests__/**/*.test.ts'],
```

Run command: `cd tech-pwa && npx vitest run --testPathPattern=<file>`
Framework import: `import { describe, it, expect } from 'vitest'` (compliance.test.ts uses `it`; wc-codes.test.ts uses `test` — either is valid, use `it` for new test files to match compliance.test.ts style).

---

## No Analog Found

All files in Phase 25 have close codebase analogs. No files require falling back to RESEARCH.md patterns exclusively.

| File | Role | Data Flow | Closest Analog | Notes |
|------|------|-----------|----------------|-------|
| — | — | — | — | All covered |

---

## Metadata

**Analog search scope:** `tech-pwa/src/lib/`, `tech-pwa/src/app/api/`, `tools/n8n/workflows/`
**Files scanned:** 11 source files + 3 test files + 4 workflow JSON files
**Pattern extraction date:** 2026-06-10

**Key invariants confirmed:**
- `DASHBOARD_API_KEY` header name (not `x-api-key`) — confirmed in `jobs/sync/route.ts` line 9 and `properties/route.ts` line 7
- Dev guard: `NODE_ENV !== 'production' || NEXT_PUBLIC_SANDBOX_MODE === 'true'` — confirmed in `email.ts` lines 23–24 and 73–74
- Vitest (not Jest) — confirmed via `tech-pwa/vitest.config.ts`
- n8n credential name must use `"name"` key only, never `"id"` — confirmed in `ca-break-compliance-monitor.json` lines 65–71
- `getResend()` lazy-init pattern — confirmed in `email.ts` line 5
