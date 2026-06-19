---
phase: 25-parsing-intake-quality
plan: "02"
subsystem: intake
tags: [access-sync, neon, drizzle, email, resend, tdd, vitest, typescript]

requires:
  - phase: 25-parsing-intake-quality
    plan: "01"
    provides: normalizeAddressKey.ts + detectLaphamForm.ts (consumed by 25-03)

provides:
  - access-codes.ts — pure helpers extractCodes + computeAccessMerge (testable, no DB)
  - POST /api/intake/access-sync — two-way access-info sync (INTAKE-04)
  - sendRequesterAutoReply — receipt auto-reply, dev-guarded (INTAKE-06)
  - sendTenantCoordinationEmail — tenant date/time coordination email, dev-guarded (INTAKE-07 email channel)

affects: [25-03, any n8n node calling access-sync or email functions]

tech-stack:
  added: []
  patterns:
    - TDD RED/GREEN per task (failing test commit then implementation commit)
    - Merge-not-replace: computeAccessMerge appends codes via pipe-separator, never replaces
    - Dev write guard: NODE_ENV !== 'production' || NEXT_PUBLIC_SANDBOX_MODE guard blocks all Resend calls outside production
    - DASHBOARD_API_KEY internal auth: header-only, no session auth (n8n-called route)
    - Drizzle SELECT then conditional UPDATE (not upsert) — property row must pre-exist

key-files:
  created:
    - tech-pwa/src/lib/access-codes.ts
    - tech-pwa/src/app/api/intake/access-sync/route.ts
    - tech-pwa/src/lib/__tests__/access-codes.test.ts
    - tech-pwa/src/lib/__tests__/email-intake.test.ts
    - artifacts/phase25_02_diff.txt
  modified:
    - tech-pwa/src/lib/email.ts (two new exported functions appended)
    - tech-pwa/vitest.config.ts (access-codes.ts added to coverage.include)

key-decisions:
  - "computeAccessMerge appends inbound as 'existing | inbound' — only when inbound has codes absent from existing; merge result is never just the inbound string"
  - "access-sync route: internal API key auth only (DASHBOARD_API_KEY) — matches jobs/sync + properties analogs; called by n8n not browser"
  - "email guard placement: dev guard fires immediately after invalid-email no-op, before any Resend construction"
  - "APT-Internal gate is caller-owned: email functions only guard on to validity + dev env; callers must check senderType !== 'APT Internal' before invoking"

patterns-established:
  - "Merge-not-replace pattern: extractCodes Set comparison → append-only UPDATE, tested by unit tests"
  - "Internal route pattern: DASHBOARD_API_KEY header, no session, try/catch returning 500 error shape"
  - "Dev write guard test: vi.mock Resend + vi.stubEnv NODE_ENV='test' → asserting dev guard log fires and send is not called"

requirements-completed: [INTAKE-04, INTAKE-06, INTAKE-07]

duration: ~5 min
completed: 2026-06-10T21:35:00Z
---

# Phase 25 Plan 02: Access-Sync Route + Email Comms Functions Summary

**Neon two-way access-info sync with merge-not-replace logic, requester auto-reply, and tenant coordination email — all dev-guarded and fully unit-tested**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-06-10T21:29:48Z
- **Completed:** 2026-06-10T21:35:00Z
- **Tasks:** 2 of 3 complete (Task 3 is checkpoint:human-action — awaiting Claude Code review)
- **Files created:** 5 | **Files modified:** 2

## Accomplishments

- `access-codes.ts`: `extractCodes` (3–6 digit regex with Set dedup) + `computeAccessMerge` (append-not-replace, returns updated/merged/newCodes/reason)
- `POST /api/intake/access-sync`: DASHBOARD_API_KEY auth, addressKey 400 validation, SELECT property by (addressKey, orgId), computeAccessMerge, conditional UPDATE; returns property_not_found / no_new_codes / no_inbound_codes without writing
- `email.ts` extended: `sendRequesterAutoReply` (INTAKE-06) + `sendTenantCoordinationEmail` (INTAKE-07) — both with dev guard, invalid-email no-op, dark-themed HTML, try/catch-swallow
- 22 new unit tests (14 access-codes + 8 email-intake)
- Full suite: 108 tests, 7 files, zero regressions to existing 86 tests
- `npx tsc --noEmit` zero errors
- `artifacts/phase25_02_diff.txt` produced (2961 lines)

## Task Commits

1. **Task 1 RED** — `2fff9de` (test) — failing tests for extractCodes + computeAccessMerge
2. **Task 1 GREEN** — `ae470dd` (feat) — access-codes.ts + access-sync route + vitest config
3. **Task 2 RED** — `3e4cf08` (test) — failing tests for sendRequesterAutoReply + sendTenantCoordinationEmail
4. **Task 2 GREEN** — `c672663` (feat) — email.ts extended with both comms functions
5. **Task 3 gate** — `4319017` (chore) — diff artifact committed

## Exported Symbol Contracts

These are the exact signatures 25-03 n8n nodes must consume:

```typescript
// tech-pwa/src/lib/access-codes.ts
export function extractCodes(text: string): string[]
export interface AccessMergeResult {
  updated: boolean;
  merged: string | null;
  newCodes: string[];
  reason?: string;
}
export function computeAccessMerge(existing: string | null, inbound: string): AccessMergeResult

// tech-pwa/src/lib/email.ts
export async function sendRequesterAutoReply(to: string, address: string): Promise<void>
export async function sendTenantCoordinationEmail(to: string, tenantName: string, address: string): Promise<void>
```

## Access-Sync Request/Response Contract

n8n HTTP Request node must use:

**Endpoint:** `POST /api/intake/access-sync`

**Required header:** `DASHBOARD_API_KEY: <value of DASHBOARD_API_KEY env var>`
(Note: header name is `DASHBOARD_API_KEY`, NOT `x-api-key`)

**Request body (JSON):**
```json
{
  "addressKey": "string (required — normalized property dedup key)",
  "inboundAccessInfo": "string (access info text from inbound WO)",
  "orgId": "string (optional, default: 'APT-CA')"
}
```

**Response shapes:**

| Status | Body | When |
|--------|------|------|
| 200 | `{ updated: true, merged: string, newCodes: string[] }` | New codes merged into DB |
| 200 | `{ updated: false, reason: 'no_new_codes' }` | All inbound codes already stored |
| 200 | `{ updated: false, reason: 'no_inbound_codes' }` | Inbound access info has no numeric codes |
| 200 | `{ updated: false, reason: 'property_not_found' }` | No property row for addressKey+orgId |
| 400 | `{ error: 'addressKey required' }` | Missing or non-string addressKey |
| 401 | `{ error: 'Unauthorized' }` | Missing or wrong DASHBOARD_API_KEY |
| 500 | `{ error: string }` | Unexpected Drizzle/DB error |

## Merge Semantics

- `computeAccessMerge('gate 7890', 'lockbox 2345')` → `{ updated: true, merged: 'gate 7890 | lockbox 2345', newCodes: ['2345'] }`
- `computeAccessMerge('gate 7890', 'gate 7890')` → `{ updated: false, reason: 'no_new_codes' }`
- `computeAccessMerge(null, 'lockbox 2345')` → `{ updated: true, merged: 'lockbox 2345', newCodes: ['2345'] }`

The merge result is NEVER just the inbound string when existing data exists. Existing codes are always preserved.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

## TDD Gate Compliance

| Gate | Commit | Status |
|------|--------|--------|
| Task 1 RED | `2fff9de` — `Cannot find module '../access-codes'` confirmed | PASS |
| Task 1 GREEN | `ae470dd` — 14 tests passing | PASS |
| Task 2 RED | `3e4cf08` — `sendTenantCoordinationEmail is not a function` confirmed | PASS |
| Task 2 GREEN | `c672663` — 8 tests passing (108 total) | PASS |

## Known Stubs

None — all functions are fully implemented with real logic. No TODO or placeholder values.

## Threat Flags

New `/api/intake/access-sync` endpoint introduced:
- Authenticated by `DASHBOARD_API_KEY` header (T-25-03 mitigated — 401 before any DB access)
- No session auth — this is an internal n8n-called route, matches existing jobs/sync + properties pattern
- Outbound email functions: dev write guard asserted by unit tests (T-25-04 mitigated)
- Merge logic: append-only, unit-tested (T-25-05 mitigated)

| Flag | File | Description |
|------|------|-------------|
| new_internal_route | tech-pwa/src/app/api/intake/access-sync/route.ts | POST endpoint for n8n access-info sync — authenticated by DASHBOARD_API_KEY, no public surface |

## Task 3 Gate Status

**PENDING — Claude Code review required before Wave 2 begins.**

- `npx tsc --noEmit` → zero errors (observed: no output, exit 0)
- `artifacts/phase25_02_diff.txt` produced (2961 lines), committed `4319017`
- Full unit suite: `108 passed` across 7 test files
- Branch: `feat/phase-25-parsing-intake`

Resume signal: Claude Code replies PASS / clear for this plan's diff.

## Next Phase Readiness

- `extractCodes` + `computeAccessMerge` available for import by Plan 25-03 n8n Code nodes
- `sendRequesterAutoReply` + `sendTenantCoordinationEmail` ready for Plan 25-03 n8n HTTP Request nodes
- Access-sync contract documented above — n8n node must send `DASHBOARD_API_KEY` header (not `x-api-key`)

**Blockers for Wave 2:**
- Claude Code diff review PASS required (Task 3 gate)

---
*Phase: 25-parsing-intake-quality*
*Completed: 2026-06-10*
