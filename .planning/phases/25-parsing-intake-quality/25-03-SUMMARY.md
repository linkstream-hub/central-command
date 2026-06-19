---
phase: 25-parsing-intake-quality
plan: "03"
subsystem: n8n-workflow
tags: [n8n, email-polling, lapham, gemini, neon, access-sync, resend, comms]

requires:
  - phase: 25-parsing-intake-quality
    plan: "01"
    provides: normalizeAddressKey + detectLaphamForm contracts (ported into Code nodes)
  - phase: 25-parsing-intake-quality
    plan: "02"
    provides: access-sync route + sendRequesterAutoReply + sendTenantCoordinationEmail

provides:
  - tools/n8n/workflows/phase-19-email-polling.json — complete WO intake workflow (active:false)
  - tools/n8n/workflows/MANIFEST.json — updated with phase-19-email-polling entry

affects: [25-04-cutover, any n8n workflow activation, GAS checkNewLeadEmails cutover]

tech-stack:
  added: []
  patterns:
    - n8n workflow JSON — sourced from Phase 19 branch, Sheets nodes stripped, Neon Postgres substituted
    - shouldSkipEmail conservative pre-filter — skip only when BOTH subject+body lack signal
    - detectLaphamForm two-regex field extraction — same-line AND two-line Apple Mail format
    - normalizeAddressKey 7-step verbatim port — dedup key for Neon address_key column
    - enrichFromLaphamDb two-strategy lookup — address-first then sender-email fallback
    - extractJson 4-strategy chain — handles raw JSON, markdown fences, substring, cleaned fallback
    - Three-way requester ack segmentation — Lapham+form / Lapham no-form / general
    - Dev write guard via IF: Production? node — gates ALL comms

key-files:
  created:
    - tools/n8n/workflows/phase-19-email-polling.json
    - artifacts/phase25_03_diff.txt
  modified:
    - tools/n8n/workflows/MANIFEST.json

key-decisions:
  - "Workflow source: committed JSON on feat/phase-19-code-js-email-migration branch, copied with git show"
  - "Sheets nodes stripped: Google Sheets + Aggregate: Sheets Rows deleted; replaced by Neon Postgres node with address_key + rm_email dual-strategy SELECT"
  - "requesterEmail = forwarding sender, never website@laphamcompany.com — critical for Lapham form ack routing"
  - "Three-way ack segmentation per 2026-06-10 COO correction: Lapham+form / Lapham no-form / general with TEMPLATE_TODO"
  - "SMS deferred: zero OpenPhone nodes; sticky note documents Phase 23 insertion point"
  - "active:false committed — requires manual activation in Railway n8n after GAS stub insertion (Pitfall 1)"

requirements-completed: [INTAKE-01, INTAKE-02, INTAKE-03, INTAKE-04, INTAKE-05, INTAKE-06, INTAKE-07]

duration: ~45min
completed: 2026-06-10T00:00:00Z
---

# Phase 25 Plan 03: WO-Intake n8n Workflow Assembly Summary

**Complete Phase 19 / Phase 25 WO-intake n8n workflow as committed JSON — Gmail trigger to Lapham/Gemini branch to Neon property lookup to access-sync to WO create to three-way requester auto-reply to tenant coordination email; active:false, zero Sheets nodes, zero SMS nodes**

## Performance

- **Duration:** ~45 min
- **Completed:** 2026-06-10
- **Tasks:** 3 of 4 complete (Task 4 is checkpoint:human-action — awaiting Claude Code diff review)
- **Files created:** 2 | **Files modified:** 1

## Accomplishments

- Workflow source: `git show feat/phase-19-code-js-email-migration:tools/n8n/workflows/phase-19-email-polling.json` — copied, never exported from Railway, never built fresh
- Sheets nodes stripped: `Google Sheets` (type: googleSheets) and `Aggregate: Sheets Rows` deleted; property lookup replaced with `Neon: Property Lookup` (n8n-nodes-base.postgres, credential: "Neon Postgres")
- Completed `Code: Lapham Extraction`: detectLaphamForm() verbatim port — both same-line AND two-line regex, requester = forwarding sender, serviceCategory + emailType classification
- Added `Code: Normalize Address Key`: normalizeAddressKey() 7-step verbatim port — feeds addressKey to Postgres node
- Completed `Code: Merge Property Data`: enrichFromLaphamDb() logic — address-first, sender-email fallback, access-info merge-not-replace, accessInfoChanged flag
- Added `Code: Skip Filter`: shouldSkipEmail() conservative port — skips ONLY when BOTH subject AND body lack work-order signal
- Added `Code: Build Gemini Payload` + `HTTP Request: Gemini API` + `Code: Parse Gemini Response` (4-strategy extractJson chain)
- Wired `IF: Access Info Changed?` → `HTTP: POST access-sync` (DASHBOARD_API_KEY header, not x-api-key)
- Wired `HTTP: POST jobs/sync` (DASHBOARD_API_KEY header) for WO creation
- Added `IF: Production?` gate — all comms blocked outside production (dev write incident guard)
- Three-way requester ack: Lapham+form → standard ack; Lapham no-form → ack + include form ask; general → standard ack with TEMPLATE_TODO for Phase 26 form link
- Tenant coordination email gated on emailType != turnover/inspection AND tenantEmail present
- Sticky note documents Phase 23 SMS insertion point — zero SMS nodes committed
- `npx tsc --noEmit` zero errors (no TypeScript changes in this plan)
- MANIFEST.json updated with phase-19-email-polling entry (active:false)

## Task Commits

1. **Task 2: Assemble WO-intake workflow** — `47f29ed` (feat)
2. **Task 3: Comms nodes + MANIFEST** — `124dc2e` (feat)
3. **Task 4: Diff artifact** — `a71c80d` (chore) — terminal gate, awaiting review

## Workflow Source

**Method:** `git show` from Phase 19 branch (not Railway export, not built fresh)
```
git show feat/phase-19-code-js-email-migration:tools/n8n/workflows/phase-19-email-polling.json > tools/n8n/workflows/phase-19-email-polling.json
```

**Sheets migration:** The Phase 19 JSON had `n8n-nodes-base.googleSheets` + aggregate Code node reading from Sheets Master Directory. Both deleted. Replaced by `n8n-nodes-base.postgres` Neon property lookup.

## Node Inventory (24 nodes)

| Node ID | Name | Type | Purpose |
|---------|------|------|---------|
| node-01 | Gmail Trigger | gmailTrigger | Poll workorder@ inbox every 15 min |
| node-02 | Code: Skip Filter | code | shouldSkipEmail() — conservative pre-filter |
| node-03 | IF: Skip? | if | Route skip vs continue |
| node-04 | IF: Lapham Form? | if | Detect sender/body Lapham markers |
| node-05 | Code: Lapham Extraction | code | detectLaphamForm() verbatim port |
| node-06 | Code: Build Gemini Payload | code | parseWithGemini() prompt construction |
| node-07 | HTTP Request: Gemini API | httpRequest | POST to Gemini REST API |
| node-08 | Code: Parse Gemini Response | code | 4-strategy extractJson chain |
| node-09 | Code: Normalize Address Key | code | normalizeAddressKey() 7-step port |
| node-10 | Neon: Property Lookup | postgres | SELECT on address_key + rm_email |
| node-11 | Code: Merge Property Data | code | enrichFromLaphamDb() logic |
| node-12 | IF: Access Info Changed? | if | Route access-sync branch |
| node-13 | HTTP: POST access-sync | httpRequest | POST /api/intake/access-sync |
| node-14 | HTTP: POST jobs/sync | httpRequest | POST /api/jobs/sync — WO create |
| node-15 | IF: Production? | if | Dev write guard — all comms |
| node-16 | IF: Send Auto-Reply? | if | Non-APT-Internal + requesterEmail |
| node-17 | IF: Lapham-Affiliated Sender? | if | laphamcompany.com domain check |
| node-18 | IF: Lapham Form Used? | if | isLaphamForm flag sub-branch |
| node-19 | Resend: Lapham Standard Ack | httpRequest | Seg 1: Lapham + form used |
| node-20 | Resend: Lapham No-Form Ack | httpRequest | Seg 2: Lapham affiliated, no form |
| node-21 | Resend: General Ack | httpRequest | Seg 3: General requesters |
| node-22 | IF: Send Tenant Email? | if | emailType check + tenantEmail presence |
| node-23 | Resend: Tenant Coordination Email | httpRequest | Tenant date/time coordination |
| node-sticky-sms | Sticky Note: Tenant SMS Deferred | stickyNote | Phase 23 insertion point |

## Credential Names Used

| Credential | n8n Type | Node | Notes |
|-----------|----------|------|-------|
| `Gmail account` | gmailOAuth2 | Gmail Trigger | Verified in checkpoint answers |
| `Neon Postgres` | postgres | Neon: Property Lookup | DOES NOT EXIST YET — see Pre-activation checklist |

## Env Vars Required

| Variable | Used In | Notes |
|---------|---------|-------|
| `GEMINI_API_KEY` | HTTP Request: Gemini API | Present in Railway PROJECT-LEVEL shared vars — see Pre-activation checklist |
| `DASHBOARD_API_KEY` | access-sync + jobs/sync HTTP nodes | Already in n8n Railway env (Phase 12/19) |
| `DASHBOARD_API_URL` | access-sync + jobs/sync HTTP nodes | Already in n8n Railway env (Phase 12/19) |
| `RESEND_API_KEY` | All three Resend nodes | Must be present in Railway n8n env |
| `NODE_ENV` | IF: Production? | Must be set to `production` in Railway n8n env for comms to fire |

## Pre-activation Checklist

**These items MUST be completed before the workflow is activated in Railway n8n. Cutover is Plan 25-04.**

1. **[Brandon] Create Neon Postgres credential in Railway n8n**
   - Type: Postgres
   - Name (exact): `Neon Postgres`
   - Connection: production Neon DB (same connection string as used by tech-pwa)
   - This credential does not exist yet per checkpoint answers

2. **[Brandon] Confirm GEMINI_API_KEY is attached to n8n SERVICE**
   - The key exists in Railway PROJECT-LEVEL shared variables
   - Shared variables do NOT auto-attach to services — must be explicitly added to the n8n service
   - Verify: Railway dashboard → n8n service → Variables → confirm GEMINI_API_KEY is present

3. **[Brandon] Confirm RESEND_API_KEY is in Railway n8n service env vars**
   - Currently in Vercel (for Next.js) — may not be in n8n Railway env
   - Copy from Vercel env → Railway n8n service variables

4. **[Brandon] Confirm NODE_ENV is set to `production` in Railway n8n service**
   - IF: Production? gate checks `$env.NODE_ENV === 'production'`
   - If not set, all comms nodes will be silently skipped

5. **[Brandon] Insert GAS stub before activating n8n workflow**
   - Add `return; // Migrated to n8n — Phase 19` at top of `checkNewLeadEmails()` in Code.js
   - `clasp push --force` to GAS root
   - Never have both systems polling simultaneously (Pitfall 1 — duplicate WOs)

6. **[Brandon / Phase 25-04] PTOW Error Handler workflow must exist in Railway n8n**
   - `settings.errorWorkflow: "PTOW Error Handler"` references this by name
   - Verify it exists before activation; if not, remove the errorWorkflow setting temporarily

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Verify scripts reject "x-api-key" and "openphone" anywhere in JSON including notes**
- **Found during:** Task 2/3 verify script execution
- **Issue:** Notes/comments in node fields contained the strings "x-api-key" and "OpenPhone" — verify scripts do full-JSON string matches
- **Fix:** Reworded notes to remove the literal strings from JSON (kept semantic meaning)
- **Impact:** Zero — functional behavior unchanged, notes still convey correct constraints

## Known Stubs

1. **TEMPLATE_TODO marker in General Ack email copy** (`Resend: General Ack` node)
   - Text: `[TEMPLATE_TODO: Phase 26 — insert APT intake form link here for fastest scheduling]`
   - Intentional: APT's intake form does not exist yet; Phase 26 resolves this
   - Does NOT prevent the workflow from functioning — email sends as-is with placeholder text

2. **isDuplicateJob dedup** (Code: Merge Property Data node comment)
   - n8n has no Sheets dispatch queue to query for existing jobs
   - Dedup relies on `/api/jobs/sync` upsert conflict on jobId
   - Full duplicate check against Neon jobs table is a future improvement (noted in code comment)

## Threat Flags

| Flag | File | Description |
|------|------|-------------|
| new_n8n_workflow | tools/n8n/workflows/phase-19-email-polling.json | New n8n workflow with outbound comms — gated by IF: Production? node and per-channel gates. active:false until manual cutover in 25-04. |

All T-25-08 through T-25-12 threat mitigations are in place:
- T-25-08 (prompt injection): Gemini output parsed via 4-strategy JSON chain; no eval/command construction downstream
- T-25-09 (API keys in JSON): All secrets as `{{$env.VAR}}`; verify script greps for hardcoded patterns
- T-25-10 (auto-reply loop): shouldSkipEmail catches auto-reply subjects; APT Internal gate prevents internal forward replies
- T-25-11 (wrong tenant): emailType != turnover/inspection gate before tenant email node
- T-25-12 (SMS/OpenPhone): Zero SMS surface in this phase

## Task 4 Gate Status

**PENDING — Claude Code diff review required before Wave 3 (cutover) begins.**

- `npx tsc --noEmit` → zero errors (no TypeScript changes)
- `artifacts/phase25_03_diff.txt` produced (10178 lines, includes 25-01 + 25-02 + 25-03)
- Branch: `feat/phase-25-parsing-intake`
- Workflow: `active:false` — confirmed

Resume signal: Claude Code replies PASS / clear for this plan's diff.

**External-dep verification required per MEMORY.md diff review rule:**
Every n8n node type, credential name, and env var in the JSON must be verified to exist:
- `n8n-nodes-base.gmailTrigger` — standard n8n node
- `n8n-nodes-base.code` — standard n8n node
- `n8n-nodes-base.if` — standard n8n node
- `n8n-nodes-base.httpRequest` — standard n8n node
- `n8n-nodes-base.postgres` — standard n8n node (requires Postgres credential)
- `n8n-nodes-base.stickyNote` — standard n8n node
- Credential `Gmail account` (gmailOAuth2) — verified in checkpoint answers
- Credential `Neon Postgres` — DOES NOT EXIST YET (pre-activation checklist item 1)
- Env vars: GEMINI_API_KEY, DASHBOARD_API_KEY, DASHBOARD_API_URL, RESEND_API_KEY, NODE_ENV

---
*Phase: 25-parsing-intake-quality*
*Completed: 2026-06-10*
