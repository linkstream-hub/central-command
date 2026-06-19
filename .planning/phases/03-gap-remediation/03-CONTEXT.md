# Phase 3: Gap Remediation — Context

**Gathered:** 2026-05-30
**Status:** Ready for planning
**Source:** PRD Express Path (artifacts/phase2-verification-results.md + SESSION_STATE.md gap inventory)

<domain>
## Phase Boundary

Fix every gap surfaced by Phase 2 verification. All 9 gaps are diagnosed with specific file targets identified. The phase closes only when every v1.0 requirement passes on real production data.

**Work streams:**
1. **GAS (Code.js)** — `detectLaphamForm()` parsing fixes (GAP-01, GAP-02) — clasp push + deploy required
2. **Next.js (tech-pwa)** — WO card UX fixes (GAP-05, GAP-06, GAP-07, GAP-08)
3. **Data / manual** — test record cleanup (GAP-04), contact DB entry (GAP-09), comms re-test (GAP-03)

</domain>

<decisions>
## Implementation Decisions

### GAP-01 — Code.js serviceCategory inference (HIGHEST PRIORITY)
- `detectLaphamForm()` in Code.js (~line 255) hardcodes `serviceCategory: 'Unknown'`
- **Fix:** Add keyword inference from description field — match keywords: plumbing, leak, drain, electrical, outlet, breaker, HVAC, AC, heat, heating, cooling, carpentry, lock, appliance, pest, general
- **Result:** serviceCategory populated from description when available; falls back to 'Unknown' only when no keywords match

### GAP-01b — WO card tenant rendering
- WO card (JobDetailModal / job card component in tech-pwa) does not render tenant name and phone even when fields exist in Neon
- **Fix:** Render tenantName + tenantPhone fields in WO card when non-null — same location as tenant_email display

### GAP-02 — Code.js forwarded email field extraction (HIGHEST PRIORITY)
- `field()` regex in Code.js does not reach inside quoted/forwarded blocks in Lapham email bodies
- Symptoms: description empty, RM name/email empty, tenant email captures `<mailto:...>` suffix
- **Fix 1:** Extend `field()` (or add `fieldForwarded()`) to scan inside forwarded/quoted email blocks (lines starting with `>`, or the body after `---------- Forwarded message ---------`)
- **Fix 2:** Strip `<mailto:...>` suffix from all email fields — regex: replace `<mailto:[^>]+>` with empty string
- **Fix 3:** If description is still empty after forwarded-block parsing, fall back to extracting all text after the field block as the description

### GAP-03 — COORD-03 comms reply re-test (blocked, re-test only)
- No code fix required — re-test the Comms tab reply path on a real Lapham WO after GAP-01/02 fixes land
- **Deliverable:** Dispatcher confirms reply sent from Comms tab with specific WO# and message text observed in Gmail thread

### GAP-04 — Data cleanup: APT-SEED-0001 (Brandon runs in Neon console)
- `APT-SEED-0001` test record in production Neon `jobs` table
- **Fix:** `DELETE FROM jobs WHERE job_id = 'APT-SEED-0001';` — Brandon runs in Neon console (requires his login)
- **Deliverable:** SQL confirms 0 rows for `SELECT * FROM jobs WHERE job_id = 'APT-SEED-0001'`

### GAP-05 — Tech PWA WO card tenant contact fields
- JobDetailModal does not render `tenantName` + `tenantPhone` fields
- **Fix:** Add tenant contact section to WO card — render tenantName, tenantPhone, tenantEmail when any is non-null
- This is part of the same fix as GAP-01b (both are WO card rendering issues)

### GAP-06 — Tech PWA search priority + duplicate search bar
- Search returns substring matches ranked above exact WO# match
- Two search bars present — one is non-functional
- **Fix 1:** In search results ranking, sort exact WO# match first, then prefix matches, then substring matches
- **Fix 2:** Remove the redundant (non-functional) search bar

### GAP-07 — Tech PWA sidebar labels
- "Operations" label is meaningless to dispatcher; "Schedule Queue" is not a recognized workflow stage
- **Correct stage names:** Needs Review → Ready to Schedule → Work Schedule
- **Fix:** Update sidebar nav labels to match these three stage names exactly

### GAP-08 — Tech PWA Comms tab message contrast
- Requester vs Dispatch message bubbles visually indistinct (no SMS-style left/right or color contrast)
- **Fix:** Apply SMS-style contrast — Requester messages left-aligned with neutral/grey background; Dispatch messages right-aligned with accent color background (or equivalent clear visual distinction)

### GAP-09 — Contact lookup: Sam Cooney (cooneysam@gmail.com)
- `cooneysam@gmail.com` not in contact lookup DB — Gemini misparsed the name on APT-01396
- **Fix:** Add Sam Cooney entry to contact lookup — email: cooneysam@gmail.com, name: Sam Cooney
- Determine where contact lookup DB lives (GAS property/sheet or Neon table) and add the entry

### Claude's Discretion
- Test execution strategy — can run Playwright e2e on the UX fixes in parallel
- Wave ordering — GAS fixes first (they unblock GAP-03 re-test and data quality)
- Whether GAP-09 requires a code fix (add to lookup during processing) vs a data patch

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### GAS (Code.js)
- `Code.js` — primary target for GAP-01 and GAP-02 fixes (`detectLaphamForm()`, `field()` functions)
- Deployment: `clasp push --force` → `clasp deploy --deploymentId AKfycbySG8tbAaXyIRFXnq7x-Fp5Gvs7uG8RmAyBB_wSFcGmScbhI3SHSq2HoznowBcsi3mM9Q --description "v##"`
- Code.js deploy is MANUAL ONLY — never automate

### Tech PWA
- `tech-pwa/` — Next.js app, target for GAP-05 through GAP-08
- Local dev: `cd tech-pwa && npm run dev` → http://localhost:3000
- Auth context: office staff pages use `useSession()` from `next-auth/react`; tech PWA pages use `getSession()` from `@/lib/auth`

### Phase 2 Evidence
- `artifacts/phase2-verification-results.md` — full gap inventory with specific WO numbers and evidence

### Architecture
- `docs/ARCHITECTURE.md` — system architecture reference
- `docs/DOMAIN_ARCHITECTURE.md` — domain bounded contexts

</canonical_refs>

<specifics>
## Specific Evidence from Phase 2

- **APT-01397** (LEAD-01 fail): Jordan McCann, RM: 275goodlife@gmail.com. WO type = Unknown. Tenant contact present in original email but not rendered.
- **APT-01331** (LEAD-02 fail): Lapham form, sender: website@laphamcompany.com. Type = Unknown. Tenant email malformed: `mwangcp@gmail.com<mailto:mwangcp@gmail.com>`. Description empty on forwarded emails (APT-01388 shows "No Description — see original email").
- **APT-01396** (GAP-09): Gemini misparsed Sam Cooney's name to "Elizabeth" — `cooneysam@gmail.com` not in lookup DB.

</specifics>

<deferred>
## Deferred Ideas

- CC3.0 architecture migration (GAS → Next.js) — explicitly out of scope
- New UX features beyond the 4 gap fixes — out of scope
- CA Break Compliance / PAGA webhook — below milestone gate

</deferred>

---

*Phase: 03-gap-remediation*
*Context gathered: 2026-05-30 via PRD Express Path (gap inventory)*
