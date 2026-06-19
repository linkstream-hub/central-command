# Phase 25: Parsing & Intake Quality — Research

**Researched:** 2026-06-10
**Domain:** WO intake pipeline — GAS parsing audit, n8n workflow completion, Neon access-info sync, Resend auto-reply, OpenPhone SMS
**Confidence:** HIGH (parsing/schema/email) | MEDIUM (OpenPhone — API verified via official docs, no existing integration)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Extraction targets**: WO address, Requester name+contact, Tenant name+contact (exempt for turnover/inspection), work description
- **Access info**: Pull from Neon `properties` table (never Sheets); two-way sync — inbound access info missing or changed in DB gets written back
- **Lapham forms**: Lossless extraction is paramount. `website@laphamcompany.com` detection bypasses Gemini. Parse deterministically.
- **Comms channels**: Auto-reply to Requester on receipt ("message received"). Auto-outreach to Tenant when contact provided (email + SMS via OpenPhone).
- **Architecture**: No new GAS code. Improvements land in Phase 19 n8n workflow and/or Next.js. Phase 19 has 2 stub nodes (Lapham extraction + property merge) — this phase likely completes them. Outbound customer-facing comms require human approval gate and dev write guard.

### Claude's Discretion

- Gemini prompt/schema design for extraction quality
- n8n node topology, error handling, retry strategy
- Where access-info reconciliation runs (n8n vs Next.js API)
- Auto-reply template content and send mechanism (n8n + Gmail vs Resend)
- OpenPhone API integration shape (research required)
- How parsing quality is measured (eval set recommended)

### Deferred Ideas (OUT OF SCOPE)

- Full unified comms hub UI (Phase 23)
- Tenant Contact `pteGranted=No` flow (Phase 24)
- Bulk comms backfill (permanently out of scope)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| INTAKE-01 | WO address extracted correctly from inbound email and Lapham forms | Code.js audit: address extraction pipeline documented; Lapham form has deterministic field extractor; Gemini prompt has fallback chain; n8n port strategy identified |
| INTAKE-02 | Requester and Tenant name + contact info extracted; tenant contact exempt when unoccupied | Code.js audit: Gemini schema has tenantName/tenantPhone/tenantEmail; exemption logic for turnover/inspection confirmed; gaps documented |
| INTAKE-03 | Work description extracted completely and cleanly | Gemini prompt uses "1-2 sentence plain trade language"; Lapham has description field extractor with multi-label variants |
| INTAKE-04 | Access info two-way sync — Neon `properties` for known addresses; WO-supplied info adds/corrects DB when missing or changed | `enrichFromLaphamDb` access-info change detection ported to n8n/Next.js; `/api/properties` route exists; Neon schema has `accessInfo` column; upsert strategy defined |
| INTAKE-05 | Lapham form parsing is lossless | `detectLaphamForm` fully audited — current gaps and forwarded-body handling documented; deterministic field extraction documented |
| INTAKE-06 | Requester receives automatic "message received" reply on intake | Resend already in codebase (`^6.12.3`); dev guard pattern already established; auto-reply route design documented |
| INTAKE-07 | Tenant receives date/time coordination outreach — email + SMS via OpenPhone | Resend for email (pattern exists); OpenPhone API verified: POST `/v1/messages`, `Authorization` header, E.164 phone format; US Carrier Registration required |
</phase_requirements>

---

## Summary

Phase 25 improves the WO intake pipeline at all stages: Gemini-based email parsing, deterministic Lapham form extraction, Neon access-info sync, requester auto-reply, and tenant date/time coordination via Resend email + OpenPhone SMS. The source of truth for the current implementation is `Code.js` — a 1800-line GAS file at the repo root. The parsing logic is more capable than a surface read suggests: `detectLaphamForm` handles forwarded/Apple Mail-rendered forms via two-line regex strategy; `enrichFromLaphamDb` has access-info change detection with code extraction; `normalizeAddressKey` handles city-suffix stripping, embedded units, and street-type normalization. These functions must be ported faithfully to n8n Code nodes or Next.js — the edge cases are production-tested.

The Phase 19 n8n workflow JSON does not yet exist in git (`tools/n8n/workflows/` has only the CA Break Compliance workflow and utility workflows). Phase 25 either completes the Phase 19 workflow JSON or creates it if Phase 19 is still blocked. The two stub nodes are: (1) deterministic Lapham extraction replacing the GAS `detectLaphamForm`, and (2) Neon property lookup/access-info merge replacing `enrichFromLaphamDb`. The Sheets read in the Phase 19 plan is migration debt — Phase 25 replaces it with the `/api/properties` Neon endpoint.

The largest unknown is OpenPhone SMS integration. OpenPhone rebranded to Quo in 2026; the API base URL is `https://api.openphone.com/v1` (unchanged). Authentication uses `Authorization: YOUR_API_KEY` header (not Bearer). US Carrier Registration (A2P 10DLC) is required before any US SMS can be sent via the API — this is a Brandon/admin action with a 2–5 business day approval window that must be treated as a hard prerequisite for INTAKE-07.

**Primary recommendation:** Port `detectLaphamForm` + `enrichFromLaphamDb` + `normalizeAddressKey` to n8n Code nodes as the two Phase 19 stub completions. Add a Neon Postgres node for property lookup (not Sheets). Add a Next.js API route `POST /api/intake/access-sync` for the two-way access-info write-back. Wire Resend for Requester auto-reply using the existing dev guard pattern. Wire OpenPhone HTTP Request node for Tenant SMS after Brandon completes A2P registration.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Email polling + dedup | n8n (trigger + Code node) | — | Phase 19 migration target; GAS polling is being replaced |
| Lapham form detection + extraction | n8n Code node | — | Deterministic; no LLM needed; completes Phase 19 stub |
| Gemini parsing (free-text emails) | n8n HTTP Request node | — | Gemini API call; keeps AI call in workflow not in Next.js route |
| Property lookup (address → Neon) | n8n Postgres node | — | Read from Neon `properties` table; replaces Sheets lookup |
| Access info two-way sync write-back | Next.js API route | n8n HTTP Request | Business rule with conditional logic; Next.js owns Neon writes |
| Requester auto-reply | n8n (Gmail send OR HTTP Request → Resend) | — | Triggered immediately on parsed intake; no human gate |
| Tenant email coordination | n8n HTTP Request → Resend | — | Existing Resend pattern in codebase |
| Tenant SMS coordination | n8n HTTP Request → OpenPhone API | — | OpenPhone committed S139; no existing integration |
| WO creation in Neon | n8n HTTP Request → `/api/jobs/sync` | — | Existing pattern from Phase 19 plan |
| Dev write guard | Next.js middleware / env check | n8n env var | Blocks all outbound sends in non-production; real incident precedent |

---

## Standard Stack

### Core (already in codebase — no new installs needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `resend` | `^6.12.3` (latest: 6.12.4) [VERIFIED: npm registry] | Transactional email sends | Already installed; dev guard pattern established; used for tenant scheduled + PTE emails |
| `drizzle-orm` | `^0.45.2` (latest: 0.45.2) [VERIFIED: npm registry] | Neon Postgres ORM | Already in codebase; used for all Neon writes/reads |
| n8n (Railway-hosted) | v1.x [ASSUMED] | Workflow orchestration | Existing infra; Phase 19 target |
| Gemini 2.5 Flash | via REST | Email parsing AI | Already in use; `GEMINI_MODEL=gemini-2.5-flash` |

### New External API

| Service | Auth | Endpoint | Purpose |
|---------|------|----------|---------|
| OpenPhone / Quo API | `Authorization: API_KEY` header (not Bearer) | `POST https://api.openphone.com/v1/messages` | Tenant SMS for date/time coordination |

### No New npm Packages Required

All capabilities are covered by existing stack. OpenPhone is integrated via HTTP Request node in n8n (no SDK).

---

## Package Legitimacy Audit

No new npm packages are being introduced in this phase. Existing packages `resend` and `drizzle-orm` are well-established.

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| resend | npm | ~3 yrs | High (major email provider) | github.com/resend/resend-node | Not run (pre-existing) | Approved — already installed |
| drizzle-orm | npm | ~3 yrs | High | github.com/drizzle-team/drizzle-orm | Not run (pre-existing) | Approved — already installed |

**Packages removed due to slopcheck [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

---

## Architecture Patterns

### System Architecture Diagram

```
Email arrives → workorder@aptmaintenanceinc.com
        |
        v
n8n Gmail Trigger (Phase 19 workflow)
        |
        +-- shouldSkipEmail check (Code node) ───────────────────→ skip + label
        |
        +-- detectLaphamForm? (Code node) ──── YES ──────────────→ structured parse result (High confidence)
        |                                                              |
        NO                                                            v
        |                                                     enrichFromNeon (Postgres node)
        v                                                             |
buildSmartPropertyContext → Gemini HTTP Request                      v
        |                                                     access-info reconcile check
        v                                                             |
parse result (Medium/Low confidence)                           changed? → POST /api/intake/access-sync
        |                                                             |
        v                                                             v
enrichFromNeon (Postgres node: properties lookup)           merge → WO payload
        |
        v
duplicate check (Neon query or Code node)
        |
        v
POST /api/jobs/sync → Neon jobs table
        |
        +--→ POST /api/intake/access-sync (if accessInfoChanged)
        |
        +--→ Resend auto-reply to Requester (no human gate — receipt only)
        |
        +--→ tenantEmail present? → Resend tenant coordination email
        |
        +--→ tenantPhone present? → OpenPhone POST /v1/messages (E.164 format)

Webhook from OpenPhone (message.received event) → n8n Webhook node → log to comms_messages
```

### Recommended Project Structure for New Code

```
tech-pwa/src/app/api/
├── intake/
│   └── access-sync/route.ts    # UPSERT access info into properties table
tools/n8n/workflows/
└── phase-19-email-polling.json  # Complete (was stub in Phase 19 plan)
```

### Pattern 1: Access Info Reconciliation (two-way sync)

**What:** Compare inbound access info from WO vs. stored `properties.accessInfo`. If inbound has new codes (3-6 digit numeric strings) not present in stored record, upsert Neon.
**When to use:** On every new WO where property is matched (not LOOKUP_BY_SENDER).
**Implementation location:** `POST /api/intake/access-sync` (Next.js) — called from n8n HTTP Request node. Keeps Neon write in Next.js DAL, not raw SQL in n8n.

```typescript
// Source: Code.js extractCodes() + enrichFromLaphamDb() — ported logic
function extractCodes(text: string): string[] {
  const matches = text.match(/\b\d{3,6}\b/g) ?? [];
  return [...new Set(matches)]; // deduplicate
}

function normalizeAccessInfo(text: string): string {
  return (text ?? '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Route: POST /api/intake/access-sync
// Body: { addressKey, inboundAccessInfo, orgId }
// Behavior: if inboundAccessInfo has codes not in stored record → db.update(properties).set({ accessInfo })
```

### Pattern 2: normalizeAddressKey parity (n8n Code node)

The GAS `normalizeAddressKey` must be reproduced exactly in n8n JavaScript Code node. It is the dedup key — any deviation produces mismatches. Key operations in order:
1. `##` → `#`
2. Extract embedded unit (`#\w+`) if `unit` param empty
3. Strip `#\w+` from address
4. Split on first `,` — drop city/state suffix
5. Normalize street type abbreviations (avenue→avenue, ave→ave, etc.) with lowercase
6. Lowercase + strip non-alphanumeric + collapse spaces
7. Return `addr + "||" + unit`

```javascript
// Source: Code.js normalizeAddressKey() — port verbatim
function normalizeAddressKey(address, unit) {
  let addr = String(address || '').replace(/##/g, '#');
  const embeddedUnit = addr.match(/#(\w+)/);
  if (embeddedUnit && !unit) unit = embeddedUnit[1];
  addr = addr.replace(/#\w+/g, '').trim();
  addr = addr.split(',')[0].trim();
  addr = addr.replace(/\b(avenue|ave|street|st|boulevard|blvd|drive|dr|road|rd|lane|ln|way|place|pl|court|ct|terrace|terr)\b\.?/gi,
    m => m.replace(/\.$/, '').toLowerCase());
  addr = addr.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  unit = String(unit || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();
  return addr + '||' + unit;
}
```

### Pattern 3: Lapham Form Detection (n8n Code node — port of detectLaphamForm)

**What:** Deterministic extraction from structured Lapham webform emails. Zero Gemini calls. Returns confidence="High".
**Detection:** `sender === 'website@laphamcompany.com'` OR body contains `'Submitted values are:'` OR `'Webform submission from: Maintenance Request'`.
**Two-line regex required:** Lapham forms forwarded through Apple Mail render `<b>Field</b><br>Value` as `Field\nValue`. The current regex handles this — see `field()` function in Code.js lines 188–200.
**Forwarded body handling:** Check for `'---------- Forwarded message ---------'` — if present, also search in `forwardedBody` with `>` quote-prefix stripped. Both passes required for full coverage.
**Key fields to extract:** Name, Address, Unit, Phone, Email, PreferredContact, Pets, Permission to Enter (PTE), Description.
**PTE values to map:** "permission to enter my dwelling while I am not there" → `Yes`; "do not give permission"/"without my presence" → `No`; else `Not Applicable`.
**EmailType detection from description:** scan for `turnover`/`move out`/`move-out` → `turnover`; `inspection` → `inspection`; else `adhoc_workorder`.
**Critical:** Tenant contact is populated for Lapham forms — they submit tenant data. The form IS the tenant context.

### Pattern 4: Requester Auto-Reply (Resend + dev guard)

**What:** On new WO creation, send "Your maintenance request has been received" to requester email.
**Guard pattern (already in codebase — use exactly this):**

```typescript
// Source: tech-pwa/src/lib/email.ts lines 23-26
if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true') {
  console.log(`[DEV/TEST EMAIL BLOCKED] Auto-reply → ${to}`);
  return;
}
```

**Send from:** `noreply@aptmaintenanceinc.com` with `replyTo: 'workorder@aptmaintenanceinc.com'`
**Template:** "Your maintenance request for [address] has been received. Our dispatch team will be in touch." Keep under 80 words. No internal Lead IDs in subject.
**Trigger condition:** `parsed.senderType !== 'APT Internal'` (don't reply to internal forwards). Requester email = `parsed.rmEmail` or `senderEmail` fallback.

### Pattern 5: OpenPhone SMS (n8n HTTP Request node)

**What:** Tenant SMS for date/time coordination on intake.
**Endpoint:** `POST https://api.openphone.com/v1/messages`
**Auth header:** `Authorization: {{$env.OPENPHONE_API_KEY}}` (NOT `Bearer ...` — OpenPhone does not use Bearer token format)
**Body:**
```json
{
  "content": "Hi [tenantName], this is APT Maintenance. We received a work request for [address] and would like to coordinate a time. Reply with your available dates/times.",
  "from": "+1XXXXXXXXXX",
  "to": ["+1TENANTPHONE"]
}
```
**Phone format:** E.164 required — `+15551234567`. Inbound phone from Lapham forms may lack country code. n8n Code node must normalize: strip non-digits, prepend `+1` if 10-digit US number.
**Rate limit:** 10 requests/second per API key [CITED: quo.com/docs/mdx/api-reference/rate-limits]. Returns HTTP 202 on success.
**Incoming replies webhook:** `message.received` event → n8n Webhook trigger → log to `comms_messages` table. Payload includes `data.object.from`, `data.object.text`, `data.object.direction`.
**HARD PREREQUISITE:** US Carrier Registration (A2P 10DLC) must be complete before any API send to US numbers. Brandon must action this in OpenPhone workspace settings. Approval: 2–5 business days.
**Trigger condition:** Send ONLY when `parsed.tenantPhone` is present AND `parsed.emailType !== 'turnover'` AND `parsed.emailType !== 'inspection'` (unoccupied units have no tenant to coordinate with).

### Anti-Patterns to Avoid

- **Calling Gemini for Lapham forms:** The bypass exists for a reason — structured forms parse deterministically with higher reliability than LLM extraction. Any regression here is INTAKE-05 critical.
- **Reading Sheets in n8n for property lookup:** The Phase 19 plan mentioned a Sheets read for the Master Directory. This is migration debt. Phase 25 replaces it with `/api/properties` Neon endpoint or direct Postgres node.
- **Sending tenant SMS for turnover/inspection WOs:** No tenant is in the unit. Parser must gate on `emailType` before triggering any tenant outreach.
- **Replacing stored access info instead of merging:** `enrichFromLaphamDb` pattern: if both email and DB have access info, DB is authoritative for codes; email may add context. Merge as `DB_value + " | " + email_value`. Never replace stored codes with incoming text.
- **Sending auto-reply to APT Internal senders:** `parsed.senderType === 'APT Internal'` must skip auto-reply. Internal forwards do not get receipt emails.
- **Raw SQL access-info upsert without normalizeAddressKey:** Lookups against `properties.addressKey` must use the same normalization algorithm. Computing `addressKey` at write time (Neon upsert) is the correct pattern — not computing on every read.
- **Skipping the duplicate check before WO creation:** `isDuplicateJob` logic must be preserved in n8n — same address+unit with open non-turnover job = skip.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Transactional email | Custom SMTP or GAS `GmailApp.sendEmail` | Resend (already installed) | Dev guard, template system, delivery tracking already wired |
| SMS sends | Custom Twilio/Vonage integration | OpenPhone API (committed S139) | Brandon's committed vendor; APT already has account |
| AI structured output | Custom JSON parser | Gemini `generationConfig: { temperature: 0.1 }` + `extractJson()` strategy chain | 4-strategy fallback already in Code.js lines 459-495 — port it |
| Address normalization | New algorithm | Port `normalizeAddressKey` verbatim from Code.js | Production-tested; deviations break dedup |
| Lapham form parsing | New parsing library | Port `detectLaphamForm` verbatim from Code.js | Edge cases (forwarded Apple Mail format) are already handled |

**Key insight:** The GAS Code.js is the spec. Port first, improve second. The parsing logic contains >1 year of production bug fixes for Lapham edge cases. Any rewrite risks regressions on the forms that matter most (INTAKE-05 paramount).

---

## Current Parsing Audit — Code.js

### What Is Extracted Today (Gemini path)

| Field | Gemini Schema Key | Notes |
|-------|------------------|-------|
| WO address | `propertyAddress` | Falls back to `extractAddressFromSubject()`; then `LOOKUP_BY_SENDER` |
| Unit number | `unitNumber` | Optional |
| Requester name | `rmName` | Post-enriched from Lapham DB if blank |
| Requester email | `rmEmail` | Post-enriched from Lapham DB if blank |
| Tenant name | `tenantName` | May be blank for non-residential emails |
| Tenant phone | `tenantPhone` | May be blank |
| Tenant email | `tenantEmail` | May be blank; `<mailto:...>` tags stripped |
| Tenant pref contact | `tenantPreferredContact` | Phone/Email/Unknown |
| Tenant has pets | `tenantHasPets` | Yes/No/Unknown |
| PTE granted | `pteGranted` | Yes/No/Not Applicable |
| PTE notes | `pteNotes` | Free text |
| Work description | `description` | "1-2 sentence plain trade language" per prompt |
| Email type | `emailType` | adhoc_workorder / turnover / inspection / new_inquiry / internal_forward / unknown |
| Service category | `serviceCategory` | Plumbing/Electrical/Carpentry/Painting/HVAC/Appliance/etc |
| Urgency | `urgency` | Urgent/Standard/Flexible |
| Access info | `accessInfo` | Property-level codes; merged with DB value in `enrichFromLaphamDb` |
| Confidence | `confidence` | High/Medium/Low |
| Estimate needed | `estimateNeeded` | Yes/No/Unknown |

### What Is Extracted Today (Lapham form path)

All fields above PLUS: `isLaphamForm: true`, `tenantPreferredContact`, `tenantHasPets`. These are deterministically extracted — no LLM. `senderLookupNeeded` flag set when `address = 'LOOKUP_BY_SENDER'`.

### Known Gaps in Current Implementation (from code audit)

| Gap | Impact | Phase 25 Fix |
|-----|--------|-------------|
| Lapham form address often `LOOKUP_BY_SENDER` when sender differs from form fields | Dispatcher gets unresolved WO | Port `enrichFromLaphamDb` sender-email fallback lookup into n8n |
| Access info stored in Sheets Master Directory, not Neon | Two-way sync impossible today | Replace with Neon `properties` lookup; add `POST /api/intake/access-sync` |
| `AUTO_REPLY_ENABLED = false` in GAS | No requester receipt today | Wire Resend auto-reply in n8n (GAS flag irrelevant post-migration) |
| Tenant outreach gated on dispatcher manual action | No automated coordination | Wire Resend + OpenPhone in n8n on WO creation |
| Phase 19 n8n workflow JSON does not exist in git | GAS email polling still live | Phase 25 creates/completes the workflow JSON |
| `tenantName` can be blank for free-text emails where tenant is not mentioned | Tenant coordination cannot address tenant by name | Gemini prompt improvement: add instruction "if no tenant mentioned, set tenantName to empty string, do NOT hallucinate" |
| Turnover/inspection WO type does not suppress tenant contact extraction | Parser may infer tenant fields from unrelated text | Lapham form path already handles this correctly; Gemini prompt must be strengthened |

### shouldSkipEmail — Preserved Exactly

The pre-filter in `shouldSkipEmail` has a conservative design: `'no-reply'` from non-Lapham senders is skipped, but the work-order signal check (`workOrderSignals` array) only skips if BOTH subject AND body lack any signal. This conservatism is intentional — false negatives (missing a lead) are worse. Port this logic unchanged.

### enrichFromLaphamDb — Two Lookup Strategies

1. **Address-first:** `lookupByAddress()` with two passes (exact normalized match, then street-number + first-word match).
2. **Sender-email fallback:** If address lookup fails, match sender email against `properties.rmEmail`. This populates `propertyAddress` from the DB when the email body has no address.

Both strategies must be preserved in the Neon port. The `/api/properties` route currently returns `addressKey` — the n8n lookup needs to compute `normalizeAddressKey(inbound_address, unit)` and match against stored `addressKey`.

---

## Runtime State Inventory

> This is a migration/port phase — runtime state audit is required.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | Lapham Master Directory in Google Sheets (tab: "Master Directory") — 6-column format: PropId, Client, RMName, Address, RMEmail, AccessInfo. This is the migration source. | Data migration: copy to Neon `properties` table (may already be done — verify `properties` row count vs Sheets). If not migrated, Phase 25 needs a one-time migration task before the n8n Postgres node can replace the Sheets read. |
| Live service config | `checkNewLeadEmails` GAS trigger fires every 15 minutes in production. Must be disabled (or the `return; // Migrated to n8n` stub inserted) before n8n workflow goes live. | Code edit in GAS: insert `return;` at top of `checkNewLeadEmails()` + clasp push. Cannot activate n8n workflow while GAS is also running — double-processing will create duplicate WOs. |
| OS-registered state | GAS time-based trigger (`setupTrigger()` — fires `checkNewLeadEmails` every 15 min). Registered in Google Apps Script triggers panel, NOT in git. | Manual: GAS triggers panel → delete the trigger after n8n workflow is activated. |
| Secrets/env vars | `GEMINI_API_KEY`, `DASHBOARD_API_URL`, `DASHBOARD_API_KEY` — already in GAS Script Properties. n8n will need `OPENPHONE_API_KEY` (new), `RESEND_API_KEY` (already in Vercel env for Next.js), `GEMINI_API_KEY` (new to n8n). | Add to n8n environment variables on Railway: `OPENPHONE_API_KEY`, `GEMINI_API_KEY`. `DASHBOARD_API_KEY` already needed. |
| Build artifacts | `AUTO_REPLY_ENABLED = false` in Code.js — this is a flag in GAS, not a build artifact. Post-migration it is irrelevant. | No action — GAS becomes stub after n8n cutover. |

**Properties table migration status is UNKNOWN — verify before planning.** Run: `SELECT COUNT(*) FROM properties;` in Neon. If 0 or far below the Sheets row count, a one-time migration Wave is needed.

---

## Common Pitfalls

### Pitfall 1: Activating n8n workflow before disabling GAS trigger
**What goes wrong:** Both systems poll Gmail concurrently. Same email processed twice. Duplicate WOs created in Neon. `jobId` conflict on `/api/jobs/sync` (upsert avoids the Neon dupe but the dispatch queue gets double-entries visible to dispatcher).
**Why it happens:** n8n goes live before GAS stub is inserted.
**How to avoid:** Task ordering in plan: (1) insert `return;` stub in GAS + clasp push, (2) activate n8n workflow. Never concurrent.
**Warning signs:** Two WOs with same Gmail `msgId` in Neon jobs table.

### Pitfall 2: Phone number normalization for OpenPhone
**What goes wrong:** Lapham forms may submit tenant phone as `(510) 555-1234` or `510-555-1234`. OpenPhone requires E.164: `+15105551234`. Sending a non-E.164 number returns a 400 error.
**Why it happens:** No phone normalization in current GAS code (phones stored as-is from form).
**How to avoid:** n8n Code node before OpenPhone HTTP Request: strip all non-digits, check 10-digit US number → prepend `+1`. If result is not 11 digits starting with `1`, log and skip SMS.
**Warning signs:** OpenPhone API returns 400 with invalid `to` field.

### Pitfall 3: Two-line regex regression for Lapham forwarded forms
**What goes wrong:** Apple Mail forwards Lapham webform HTML as plain text where `<b>Field</b><br>Value` becomes `Field\nValue`. Single-line regex `'Field: Value'` misses this format entirely.
**Why it happens:** Developer ports `detectLaphamForm` but writes a simpler regex, not noticing the two-regex strategy.
**How to avoid:** Port both the same-line AND two-line regex for every field. The Code.js `field()` function (lines 188–200) is the reference — port it verbatim.
**Warning signs:** INTAKE-05 regression — Lapham fields come through blank despite data being in email body.

### Pitfall 4: Access info overwrite instead of merge
**What goes wrong:** Inbound email says "lockbox code 2345" but DB has "gate code 7890, lockbox 2345". Overwriting DB with inbound text loses the gate code.
**Why it happens:** Simple PATCH instead of merge logic.
**How to avoid:** `POST /api/intake/access-sync` compares codes (3-6 digit numbers) not full text. Only upsert if inbound has codes NOT in existing DB value. Merge strategy: append, don't replace.
**Warning signs:** Tech visits fail because gate code is gone from DB after access-info sync.

### Pitfall 5: Sending tenant SMS for turnover/inspection jobs
**What goes wrong:** Turnover/inspection WOs have no active tenant. SMS goes to an unknown number or a past tenant.
**Why it happens:** n8n SMS node fires unconditionally on any WO with a phone number.
**How to avoid:** Gate condition before OpenPhone node: `{{ $json.emailType !== 'turnover' && $json.emailType !== 'inspection' && $json.tenantPhone }}`.
**Warning signs:** SMS complaints from people who are not the current tenant.

### Pitfall 6: Auto-reply to APT Internal senders
**What goes wrong:** Brandon or Keith forwards an email to workorder@ — system sends them a "your request has been received" auto-reply. Confusing and unprofessional.
**Why it happens:** Auto-reply fires on every WO without checking sender type.
**How to avoid:** Gate condition: `{{ $json.senderType !== 'APT Internal' && $json.requesterEmail }}`.
**Warning signs:** Internal team receives auto-reply emails.

### Pitfall 7: Properties table not populated (Neon)
**What goes wrong:** Neon Postgres node returns zero results for every address lookup. All WOs come through as `LOOKUP_BY_SENDER` with no access info.
**Why it happens:** The Lapham Master Directory may never have been migrated from Sheets to Neon `properties`.
**How to avoid:** Verify `SELECT COUNT(*) FROM properties;` before planning waves. If count is zero or far below Sheets row count, Wave 0 must include a one-time Sheets → Neon migration for the `properties` table.
**Warning signs:** Zero property matches, all WOs status `Needs Review`.

### Pitfall 8: Header name mismatch on DASHBOARD_API_KEY
**What goes wrong:** n8n HTTP Request to `/api/jobs/sync` sends `x-api-key` but the route checks for `DASHBOARD_API_KEY` (capital header name).
**Why it happens:** `/api/jobs/sync` comment says: "TechPWA.gs sends the key as header name 'DASHBOARD_API_KEY' (not 'x-api-key') — intentional."
**How to avoid:** In n8n HTTP Request node header: `DASHBOARD_API_KEY: {{$env.DASHBOARD_API_KEY}}`. Not `x-api-key`.

---

## Code Examples

### Verified Pattern: Access Sync Route Shape

```typescript
// POST /api/intake/access-sync
// Source: Code.js enrichFromLaphamDb + extractCodes() ported to Next.js
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { properties } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('DASHBOARD_API_KEY');
  if (apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { addressKey, inboundAccessInfo, orgId = 'APT-CA' } = await req.json();

  const [existing] = await db
    .select({ id: properties.id, accessInfo: properties.accessInfo })
    .from(properties)
    .where(and(eq(properties.addressKey, addressKey), eq(properties.orgId, orgId)));

  if (!existing) return NextResponse.json({ updated: false, reason: 'property_not_found' });

  const existingCodes = extractCodes(existing.accessInfo ?? '');
  const newCodes = extractCodes(inboundAccessInfo ?? '');
  const trulyNew = newCodes.filter(c => !existingCodes.includes(c));

  if (trulyNew.length === 0) return NextResponse.json({ updated: false, reason: 'no_new_codes' });

  const merged = existing.accessInfo
    ? `${existing.accessInfo} | ${inboundAccessInfo}`
    : inboundAccessInfo;

  await db.update(properties).set({ accessInfo: merged }).where(eq(properties.id, existing.id));
  return NextResponse.json({ updated: true, newCodes: trulyNew });
}

function extractCodes(text: string): string[] {
  const matches = (text ?? '').match(/\b\d{3,6}\b/g) ?? [];
  return [...new Set(matches)];
}
```

### Verified Pattern: Resend Auto-Reply (dev guard)

```typescript
// Source: tech-pwa/src/lib/email.ts — existing dev guard pattern
export async function sendRequesterAutoReply(to: string, address: string) {
  if (!to?.includes('@')) return;
  if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true') {
    console.log(`[DEV EMAIL BLOCKED] Auto-reply → ${to} | ${address}`);
    return;
  }
  await new Resend(process.env.RESEND_API_KEY!).emails.send({
    from: 'noreply@aptmaintenanceinc.com',
    to,
    replyTo: 'workorder@aptmaintenanceinc.com',
    subject: `Request Received — ${address}`,
    text: `Your maintenance request for ${address} has been received. Our dispatch team will be in touch shortly.\n\n— APT Maintenance`,
  });
}
```

### Verified Pattern: OpenPhone SMS via n8n HTTP Request node

```json
// n8n HTTP Request node config
{
  "method": "POST",
  "url": "https://api.openphone.com/v1/messages",
  "headers": {
    "Authorization": "{{$env.OPENPHONE_API_KEY}}",
    "Content-Type": "application/json"
  },
  "body": {
    "content": "Hi {{$json.tenantName}}, this is APT Maintenance. We received a work request for {{$json.address}} and would like to schedule a time. Please reply with your available dates and times.",
    "from": "{{$env.OPENPHONE_NUMBER}}",
    "to": ["{{$json.tenantPhoneE164}}"]
  }
}
```

### Verified Pattern: Phone Normalization (n8n Code node)

```javascript
// Source: ASSUMED — standard E.164 normalization for US numbers
function normalizePhone(raw) {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return '+1' + digits;
  if (digits.length === 11 && digits[0] === '1') return '+' + digits;
  return null; // skip SMS if can't normalize
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| GAS `UrlFetchApp` → Gemini | n8n HTTP Request node → Gemini API | Phase 19 (in progress) | Removes GAS dependency; n8n retry/error handling |
| Sheets Master Directory lookup | Neon `properties` table lookup | Phase 25 | Eliminates Sheets dependency; enables two-way sync |
| No auto-reply (AUTO_REPLY_ENABLED=false) | Resend auto-reply in n8n | Phase 25 | INTAKE-06 satisfied |
| No tenant SMS | OpenPhone API via n8n HTTP Request | Phase 25 | INTAKE-07 satisfied |
| OpenPhone rebranded | Now operates as Quo; API base URL unchanged: `https://api.openphone.com/v1` | 2025/2026 | Auth docs now at quo.com/docs — same API keys work |

**Deprecated/outdated:**
- GAS Sheets read for Lapham Master Directory: replaced by Neon `properties` Postgres node
- `AUTO_REPLY_ENABLED = false` GAS flag: irrelevant post-migration; Resend controls sends
- Phase 19 plan's Sheets node for property lookup: flagged as migration debt in that plan; Phase 25 eliminates it

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | n8n workflow for Phase 19 does not exist in git (only plan exists) | Open Work / Phase 19 | If a workflow JSON was created but not committed, Phase 25 may be starting from a partially-done state |
| A2 | OpenPhone A2P 10DLC registration is NOT yet complete for this account | OpenPhone API section | If already registered, INTAKE-07 blocker does not apply and SMS can be tested immediately |
| A3 | Lapham Master Directory has NOT been fully migrated to Neon `properties` table | Runtime State Inventory | If already migrated, no Wave 0 migration task needed; verify with `SELECT COUNT(*) FROM properties` |
| A4 | n8n on Railway has environment variable support for new secrets (OPENPHONE_API_KEY, GEMINI_API_KEY) | Architecture | If Railway env var management is restricted, secret injection approach may differ |
| A5 | OpenPhone account is owned by Brandon and has a phone number configured for outbound SMS | OpenPhone section | If no phone number is provisioned, `from` field in SMS send is unknown |

---

## Open Questions (RESOLVED)

1. **Properties table population status** — RESOLVED 2026-06-10: live read-only query returned 605 rows, 504 with access_info (see Orchestrator Verification Addendum below). Lapham Master Directory IS migrated; no Sheets→Neon migration task needed.
   - What we know: Neon `properties` table exists with correct schema (`accessInfo`, `addressKey` unique per org)
   - What's unclear: Row count — does it already reflect the Lapham Master Directory, or is it empty/partial?
   - Recommendation: Task 0 in Wave 0: run audit query. If < 50 rows, include Sheets → Neon migration before n8n workflow work.

2. **Phase 19 n8n workflow — does it exist outside git?** — RESOLVED: deferred to 25-03 Task 1 blocking human checkpoint. Assembly cannot proceed until Brandon exports from Railway or confirms absent.
   - What we know: The `.planning/phases/19` plan describes the workflow; MANIFEST.json shows only the CA Break Compliance workflow was exported
   - What's unclear: Whether Brandon created the workflow in Railway n8n but never committed the JSON
   - Recommendation: Task in Wave 0: export from Railway n8n and commit, OR confirm it does not exist and build from scratch.

3. **OpenPhone A2P 10DLC registration status** — RESOLVED: deferred to 25-03 Task 1 blocking human checkpoint (item 6) + user_setup. SMS node committed disabled if pending; INTAKE-07 go-live gated on approval.
   - What we know: Registration required for US SMS sends; 2–5 business day approval
   - What's unclear: Whether APT's OpenPhone account has completed this
   - Recommendation: Flag as HUMAN-REQUIRED task in Wave 0. Brandon must verify in OpenPhone workspace settings → Carrier Registration tab. INTAKE-07 cannot go live until approved.

4. **OpenPhone phone number for outbound SMS** — RESOLVED: deferred to 25-03 Task 1 blocking human checkpoint (item 4). Brandon provides number/ID before workflow assembly; lands in `OPENPHONE_NUMBER` n8n env var.
   - What we know: `from` field requires a provisioned OpenPhone phone number (format `+1XXXXXXXXXX` or `PN*` phone number ID)
   - What's unclear: Which APT number is designated for tenant SMS; whether `phoneNumberId` (format `PN*`) is preferred
   - Recommendation: Brandon provides the number/ID. Plan includes a `OPENPHONE_NUMBER` env var on n8n.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| n8n (Railway) | Workflow orchestration | ✓ [ASSUMED] | v1.x | — |
| Neon Postgres | Property lookup, WO sync | ✓ | Schema verified | — |
| Resend | Auto-reply email | ✓ | `^6.12.3` in package.json | — |
| OpenPhone API | Tenant SMS (INTAKE-07) | Unknown | N/A | Email-only tenant outreach (partial INTAKE-07) |
| Gemini API | Email parsing | ✓ | 2.5 Flash | — |
| OPENPHONE_API_KEY env var | n8n SMS node | Unknown | — | Skip SMS, flag for human |
| A2P 10DLC registration | OpenPhone SMS to US numbers | Unknown — Brandon must verify | — | SMS blocked without it |
| GAS clasp access | Disabling `checkNewLeadEmails` trigger | ✓ [ASSUMED] | — | — |

**Missing dependencies with no fallback:**
- A2P 10DLC carrier registration — blocks all OpenPhone SMS sends. Human (Brandon) action required.

**Missing dependencies with fallback:**
- OpenPhone API key not yet in n8n env — fallback: skip SMS node, log warning, email-only tenant coordination until key is available.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Jest (inferred from Next.js 16 project) + Playwright for E2E |
| Config file | `tech-pwa/jest.config.*` (check — not confirmed to exist) |
| Quick run command | `cd tech-pwa && npm test -- --testPathPattern=intake` |
| Full suite command | `cd tech-pwa && npm test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INTAKE-01 | Address extracted correctly | Unit | `npm test -- --testPathPattern=normalizeAddressKey` | Wave 0 |
| INTAKE-02 | Requester/Tenant extracted; tenant exempt for turnover | Unit | `npm test -- --testPathPattern=laphamForm` | Wave 0 |
| INTAKE-03 | Description extracted completely | Unit (snapshot) | `npm test -- --testPathPattern=laphamForm` | Wave 0 |
| INTAKE-04 | Access info two-way sync | Integration | `npm test -- --testPathPattern=access-sync` | Wave 0 |
| INTAKE-05 | Lapham form lossless extraction | Unit (fixture emails) | `npm test -- --testPathPattern=detectLaphamForm` | Wave 0 |
| INTAKE-06 | Auto-reply blocked in dev, sent in prod | Unit (mock Resend) | `npm test -- --testPathPattern=email` | Partial (email.ts has patterns) |
| INTAKE-07 | SMS blocked in dev; E.164 normalization | Unit | `npm test -- --testPathPattern=openphone` | Wave 0 |

### Parsing Quality Eval (Discretion — Recommended)

Build a fixture set of 10–15 real email bodies (anonymized) covering: Lapham webform, Lapham forwarded, free-text RM email with address, free-text with no address, inspection, turnover. Run before/after Gemini prompt changes to measure extraction field accuracy. Store fixtures in `tools/eval/intake-fixtures/`. Manual review by dispatcher validates "dispatch-ready" criterion. This is the only way to verify INTAKE-01/02/03 with confidence — unit tests can verify parsing logic but cannot verify Gemini extraction quality without real email data.

### Wave 0 Gaps

- [ ] `tech-pwa/src/lib/normalizeAddressKey.ts` — port from Code.js; unit tests with fixture addresses
- [ ] `tech-pwa/src/lib/detectLaphamForm.ts` — port from Code.js; unit tests with fixture form bodies
- [ ] `tech-pwa/tests/intake/` — test directory
- [ ] `tech-pwa/tests/intake/normalizeAddressKey.test.ts` — REQ INTAKE-01
- [ ] `tech-pwa/tests/intake/detectLaphamForm.test.ts` — REQ INTAKE-02, INTAKE-03, INTAKE-05
- [ ] `tech-pwa/tests/intake/access-sync.test.ts` — REQ INTAKE-04
- [ ] `tools/eval/intake-fixtures/` — real email fixture set (anonymized)

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | — |
| V3 Session Management | No | — |
| V4 Access Control | Yes | `DASHBOARD_API_KEY` header check on all new API routes |
| V5 Input Validation | Yes | Validate phone E.164 format before OpenPhone call; validate `addressKey` format before Neon upsert |
| V6 Cryptography | No | — |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Dev email/SMS leak | Information Disclosure | `NODE_ENV !== 'production'` guard + `NEXT_PUBLIC_SANDBOX_MODE` check |
| API key in n8n workflow JSON committed to git | Information Disclosure | Use n8n environment variables (`$env.OPENPHONE_API_KEY`), never hardcode in workflow JSON |
| Forged webhook from OpenPhone | Spoofing | OpenPhone webhook signature verification (documented but implementation detail TBD) |
| Tenant phone number sent to wrong recipient | Information Disclosure | E.164 normalization gate — skip SMS if normalization fails |
| Auto-reply loop (auto-reply triggers another auto-reply) | DoS | `shouldSkipEmail` already catches `auto-reply` subject — ensure n8n thread-dedup fires before auto-reply node |

---

## Sources

### Primary (HIGH confidence)

- `Code.js` (repo root) — full source audit of all parsing functions: `parseWithGemini`, `detectLaphamForm`, `enrichFromLaphamDb`, `shouldSkipEmail`, `extractEmail`, `sanitizeAddress`, `normalizeAddressKey`, `buildSmartPropertyContext`, `extractCodes`, `isPropertyLevelAccessInfo`
- `tech-pwa/src/lib/schema.ts` — Neon schema: `properties` table columns confirmed (`accessInfo`, `addressKey`, unique on `orgId+addressKey`)
- `tech-pwa/src/lib/email.ts` — Resend integration + dev guard pattern
- `tech-pwa/src/app/api/properties/route.ts` — existing GET endpoint; returns `addressKey`, `accessInfo`
- `tech-pwa/src/app/api/jobs/sync/route.ts` — confirmed `DASHBOARD_API_KEY` header (not `x-api-key`)
- `tech-pwa/src/app/api/comms/[jobId]/route.ts` — existing Resend + comms_messages pattern

### Secondary (MEDIUM confidence)

- [Quo/OpenPhone API docs](https://www.quo.com/docs/api-reference/send-your-first-message) — base URL `https://api.openphone.com/v1`, `Authorization` header auth, POST `/messages` endpoint, E.164 requirement
- [Quo Auth docs](https://www.quo.com/docs/api-reference/authentication) — confirmed NOT Bearer token; API key in `Authorization` header directly
- [Quo Rate Limits](https://www.quo.com/docs/mdx/api-reference/rate-limits) — 10 req/sec per API key
- [Quo Webhooks](https://www.quo.com/docs/mdx/guides/webhooks) — `message.received` event, payload shape with `data.object.from/text/direction`
- [Quo A2P 10DLC](https://support.quo.com/getting-started/carrier-registration/carrier-registration) — US carrier registration required; 2–5 business day approval; $19.50 one-time + $1.50/month

### Tertiary (LOW confidence)

- [n8n community OpenPhone thread](https://community.n8n.io/t/openphone-co-integration/7467) — no dedicated n8n node; HTTP Request node is the correct approach [ASSUMED]

---

## Metadata

**Confidence breakdown:**
- Parsing audit (Code.js): HIGH — full source read
- Neon schema fit: HIGH — full schema.ts read
- Resend integration: HIGH — existing code in codebase
- OpenPhone API shape: MEDIUM — verified via official docs; no existing integration to confirm
- A2P 10DLC status: LOW — external state unknown, requires human verification
- Properties table population: LOW — row count not verified

**Research date:** 2026-06-10
**Valid until:** 2026-07-10 (stable APIs; OpenPhone A2P status is time-sensitive)

---

## Orchestrator Verification Addendum (2026-06-10)

Open Question 1 RESOLVED by live read-only query against production Neon:

```
properties rows: 605 | with access_info: 504
```

The Lapham Master Directory IS migrated to Neon. Property lookups in the n8n workflow will hit real data. Confidence on "Properties Table Status" upgraded LOW → HIGH. Remaining external unknowns: Phase 19 workflow JSON in Railway (Wave 0 export task), OpenPhone A2P 10DLC registration status + designated outbound number (Brandon).
