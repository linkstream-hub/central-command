# Roadmap: APT Central Command — v1.0 CC Core Operational

**Milestone:** v1.0
**Goal:** Prove that the full lead → coordinate → assign/schedule loop works reliably on real production data before any other work proceeds.
**Phases:** 3
**Requirements:** 11

---

## Phase 1 — Queue Cleanup

**Goal:** Archive all WOs older than 21 days in Neon so the dispatch queue reflects only the operational window.
**Requirements:** QUEUE-01
**No UI**

### Success Criteria

1. Dispatch queue shows 0 WOs older than 21 days in the active view.
2. Neon `jobs` table confirms archived count via SQL query — dispatcher can state the exact number of rows updated.

---

## Phase 2 — Core Loop Verification

**Goal:** Verify on real production data that lead ingestion, tenant coordination, and assign/schedule all work end-to-end.
**Requirements:** LEAD-01, LEAD-02, COORD-01, COORD-02, COORD-03, DISP-01, DISP-02, DISP-03
**No UI**

### Success Criteria

1. A real inbound email from a property management client lands in the Needs Review queue with WO type, address, and contact info correctly populated — dispatcher states the specific WO number and field values observed.
2. A real Lapham form submission lands in the queue without Gemini parsing — dispatcher confirms the WO was created via detectLaphamForm path with a specific WO number cited.
3. Dispatcher opens a specific active WO's Comms tab and the Gmail thread history loads — dispatcher states "opened WO #X, Comms tab loaded thread with N messages."
4. At least one real Lapham WO has tenant_email populated — dispatcher confirms specific WO number and the email value shown.
5. Dispatcher sends a reply from the Comms tab and can confirm the message reached the tenant/RM — reply appears in Gmail thread, no error shown.
6. Dispatcher assigns a tech to a WO and the status transitions correctly through the workflow — dispatcher states the WO number, tech assigned, and resulting status.
7. Dispatcher schedules a WO in the day x time grid with the assigned tech — dispatcher states the WO number, day, and time slot selected.
8. Assigned tech sees the job in the Tech PWA after assignment — dispatcher confirms by checking the tech's PWA view or the tech reports the job appeared.

---

## Phase 3 — Gap Remediation

**Goal:** Fix every gap surfaced by Phase 2 verification. Milestone closes only when all v1.0 requirements pass on real production data.
**Requirements:** GAP-01, GAP-02
**No UI**
**Conditional:** If Phase 2 surfaces no gaps, this phase is trivially complete. If gaps exist, scope is determined by Phase 2 findings.
**Plans:** 3 plans

Plans:
- [ ] 03-01-PLAN.md — Code.js GAP-01 serviceCategory inference + GAP-02 forwarded-block parsing + mailto: strip
- [ ] 03-02-PLAN.md — tech-pwa UX fixes: tenant contact display, WO# search ranking, sidebar labels, comms contrast, header search button removal
- [ ] 03-03-PLAN.md — Data cleanup (GAP-04/APT-01331 Neon SQL, GAP-09 Sheet row) + COORD-03 comms reply re-test

### Success Criteria

1. Every failure or gap surfaced during Phase 2 has a diagnosis and a shipped fix — no open gaps remain undocumented or unresolved.
2. All 11 v1.0 requirements are marked complete in REQUIREMENTS.md with specific evidence on record.

---

## Coverage

| Requirement | Phase | Description |
|-------------|-------|-------------|
| QUEUE-01 | 1 | WOs older than 21 days archived in Neon; active queue shows only operational window |
| LEAD-01 | 2 | Real inbound email parsed by Gemini lands in Needs Review with correct fields |
| LEAD-02 | 2 | Lapham form submission identified via detectLaphamForm, lands without Gemini parsing |
| COORD-01 | 2 | Dispatcher opens Comms tab on any active WO and sees Gmail thread history |
| COORD-02 | 2 | Active WOs have tenant_email populated after bootstrap (at least one real Lapham WO) |
| COORD-03 | 2 | Dispatcher sends reply from Comms tab and message reaches tenant/RM |
| DISP-01 | 2 | Dispatcher assigns tech to WO and status transitions correctly |
| DISP-02 | 2 | Dispatcher schedules WO in day x time grid with assigned tech |
| DISP-03 | 2 | Assigned tech sees job in Tech PWA after assignment |
| GAP-01 | 3 | Every Phase 2 failure diagnosed and fixed before milestone closes |
| GAP-02 | 3 | All v1.0 requirements pass on real production data after gap fixes applied |

All 11 requirements mapped. Coverage: 100% ✓

---

## Progress

| Phase | Status | Completed |
|-------|--------|-----------|
| 1 — Queue Cleanup | Not started | — |
| 2 — Core Loop Verification | Not started | — |
| 3 — Gap Remediation | Planning complete | — |

---

*Defined: 2026-05-29 — Milestone v1.0 CC Core Operational*
*Phase 3 plans created: 2026-05-30*
