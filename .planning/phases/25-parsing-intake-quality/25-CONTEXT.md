# Phase 25: Parsing & Intake Quality - Context

**Gathered:** 2026-06-10
**Status:** Ready for planning
**Source:** COO directive (Brandon, 2026-06-10) — captured verbatim by lead dev; supplements memory/project_parsing_intake_directive.md

<domain>
## Phase Boundary

Audit and improve the inbound WO parsing pipeline so dispatch can assign/schedule without manual rework, sync property access info two-way with Neon, and wire requester/tenant comms (auto-reply, date/time coordination email — OpenPhone SMS deferred to Phase 23 per COO 2026-06-10). Current parsing lives in Code.js (`parseWithGemini`, `detectLaphamForm`, `enrichFromLaphamDb`, `shouldSkipEmail`) — improvements MUST land in the Phase 19 n8n workflow / Next.js, never in GAS.

</domain>

<decisions>
## Implementation Decisions

### Extraction targets (locked — the assign/schedule minimum)
- WO address — the property address for the work order
- Contact info — name for Requester AND Tenant
- Tenant contact exempt when property unoccupied: turnover / inspection WO types
- Work description — the work to be done, complete and clean

### Access info (locked)
- Pull access info for the property from the Neon `properties` table (never Sheets)
- Two-way: if inbound WO carries access info that is missing or changed in the DB, add/correct the DB record

### Lapham forms (locked — paramount)
- Lapham form submissions contain everything dispatch needs to assign/schedule; extraction must be lossless
- Lapham forms arrive at workorder@ as FORWARDS from RM/Lapham employees (not direct from website@laphamcompany.com) — detection must be content-based; requester = the forwarding sender (clarified 2026-06-10)
- detectLaphamForm bypasses Gemini today

### Comms wiring (locked)
- Dispatch ↔ Requester and Dispatch ↔ Tenant channels must be in place
- Auto-reply to Requester on receipt: "your message has been received" — three-way segmented copy (corrected 2026-06-10): Lapham sender WITH form = standard ack (no nag); Lapham sender WITHOUT form = ask them to include the Lapham Form with future requests (or use APT's form); general requesters = standard ack + APT intake-form link once Phase 26 ships
- Auto-outreach to Tenant to coordinate date/time — only when tenant email/phone provided
- Tenant SMS via OpenPhone (decided S139 — not Twilio) — DEFERRED to Phase 23 (COO 2026-06-10): core intake features first; Phase 25 ships email-only coordination

### Architecture constraints (locked)
- No new GAS code — parsing improvements land in the Phase 19 n8n email workflow and/or Next.js
- Phase 19 n8n workflow currently has 2 stub nodes (Lapham extraction + property merge) — this phase's Lapham + property work likely completes those stubs
- Outbound customer-facing comms require human approval gate (governance rule) and must respect the dev write guard (Lapham incident: 3 real emails sent from local dev)

### Claude's Discretion
- Gemini prompt/schema design for extraction quality
- n8n node topology, error handling, retry strategy
- Where the access-info reconciliation runs (n8n vs Next.js API)
- Auto-reply template content and send mechanism (n8n + Gmail vs Resend)
- How parsing quality is measured (eval set of real emails/forms recommended)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Parsing source (audit target — read in full before porting)
- `Code.js` — parseWithGemini, detectLaphamForm, enrichFromLaphamDb, shouldSkipEmail, extractEmail, sanitizeAddress, normalizeAddressKey
- `.planning/phases/19-gas-migration-phase-d-email-polling/` — Phase 19 plan + n8n workflow state

### Data layer
- `tech-pwa/src/lib/schema.ts` — `jobs`, `properties` tables (properties has accessInfo, rmName, rmEmail, addressKey unique per org)
- `docs/SHEETS_SCHEMA.md` — legacy column semantics

### Comms
- `docs/DOMAIN_ARCHITECTURE.md` — communications pattern, bounded contexts
- n8n workflows in `tools/n8n/workflows/` — existing export

### Migration scope
- `docs/GAS_MIGRATION_SCOPE.md` — function catalog with migration status

</canonical_refs>

<specifics>
## Specific Ideas

- Lapham forms arrive from website@laphamcompany.com — detection bypasses Gemini; the form is structured, parse deterministically
- Turnover/inspection WOs have no tenant — parser must not hallucinate tenant contact for them
- Access info examples: lockbox codes, gate codes, key locations — failed tech visits when wrong
- "We will implement OpenPhone to handle the SMS w/tenant" — OpenPhone is the committed SMS provider, implementation deferred to Phase 23

</specifics>

<deferred>
## Deferred Ideas

- Direct WO Intake Form (Phase 26) — big-picture goal: data arrives structured via APT's own form, parsing becomes the fallback path. Includes aptmaintenanceinc.com website remediation (cleaner/ADA-compliant form, privacy policy).

- Full unified comms hub UI — remains Phase 23 (Unified Dispatch Comms)
- OpenPhone SMS integration (API key, outbound number, A2P 10DLC registration, send + inbound webhook) — deferred to Phase 23 (COO 2026-06-10)
- Tenant Contact pteGranted=No flow — gated on Phase 24 design note in ROADMAP
- Bulk comms backfill — permanently out of scope (lazy fetch covers active window)

</deferred>

---

*Phase: 25-parsing-intake-quality*
*Context gathered: 2026-06-10 from COO directive*
