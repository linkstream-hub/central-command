# Phase 2: Core Loop Verification Results

**Date:** 2026-05-30
**Runner:** Brandon (solo)
**Milestone:** v1.0 CC Core Operational

| Requirement | Environment | Result | Evidence |
|-------------|-------------|--------|----------|
| LEAD-01 | Production | Fail | APT-01397 (Jordan McCann, rm: 275goodlife@gmail.com). WO type shows Unknown — not extracted. Tenant contact (name/phone/email) present in original form but not rendered in WO card. PTE Granted correctly identified. |
| LEAD-02 | Production | Fail | APT-01331 (Lapham form, sender: website@laphamcompany.com). Form correctly identified via detectLaphamForm. Type shows Unknown — not extracted. Tenant email malformed in Neon: mwangcp@gmail.com<mailto:mwangcp@gmail.com> (mailto: suffix captured). Description not extracted for forwarded Lapham emails (APT-01388 shows "No Description — see original email"). |
| COORD-01 | Production | Pass | APT-01331 Comms tab loaded with Gmail thread visible. Dispatch response confirmed present. UI feedback: Requester vs Dispatch message bubbles need higher contrast (SMS-style). |
| COORD-02 | Production | Pass | APT-01331 (rm: maintenance@laphamcompany.com — Lapham WO) tenant_email=mwangcp@gmail.com confirmed populated via Neon SQL. Bootstrap confirmed already run. |
| COORD-03 | Localhost | Blocked | Deferred — no safe internal-recipient test WO available. Comms reply path depends on correct WO data (tenant_email clean); re-test after Phase 3 parsing fixes land. |
| DISP-01 | Localhost | Pass | WO=TEST-7, status_before="Needs Review"; dispatcher clicked "Click to change status" panel in JobDetailModal (dispatch viewContext), clicked "Ready to Schedule" quick-action button; modal UI confirmed "READY TO SCHEDULE" display; Neon PATCH /api/jobs/TEST-7 returned success=true, GET confirmed status="Ready to Schedule". GAS proxy not available in test env (expected — no DASHBOARD_API_URL set). |
| DISP-02 | Localhost | Pass | Sidebar job "411 Oakland Ave Unit 71" (Ready to Schedule) scheduled via ManualScheduleModal: tech=Ricardo M., date=2026-06-01 (Mon Jun 1), time=08:00, duration=4h. Modal opened, selects populated with 32 techs and 5 date options, Confirm Schedule clicked, modal closed. |
| DISP-03 | Localhost | Pass | badge=1 (Test Tech), PIN=1234 → POST /api/field/auth/login returned success=true with JWT token; GET /api/field/jobs with Bearer token returned success=true, jobs=[] (correct — no seeded jobs assigned to "Test Tech"). Auth + job-list API path fully operational. |

## bootstrapJobsToNeon() Output

[paste GAS execution log here]

## Gap Inventory

GAP-01: LEAD-01 — serviceCategory hardcoded 'Unknown' in detectLaphamForm; WO card does not render tenant name/phone
GAP-02: LEAD-02 — forwarded Lapham form field extraction fails (description empty); tenant email captures mailto: suffix; RM name/email empty on all Lapham webform WOs
GAP-03: COORD-03 — comms reply path untested; re-test after GAP-01/02 resolved
GAP-04: DATA — APT-SEED-0001 test record in production Neon (delete via SQL)
GAP-05: UX — WO card does not render tenant contact fields even when populated in Neon
GAP-06: UX — search returns substring matches before exact WO# match; two redundant search bars
GAP-07: UX — sidebar/nav labels ("Operations", "Schedule Queue") do not reflect workflow stages
GAP-08: UX — Comms tab Requester vs Dispatch messages lack visual contrast (SMS-style contrast needed)
GAP-09: DATA — cooneysam@gmail.com (Sam Cooney) not in contact lookup DB; Gemini misparsed to "Elizabeth"
