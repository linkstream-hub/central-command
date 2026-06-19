# Requirements: APT Central Command

```yaml
defined: 2026-05-29
last-updated: 2026-06-10 (project-docs-reconciliation — IDs unified, statuses synced to git truth)
id-system: ROADMAP IDs canonical — NEON/TRIAGE/PAGA/COMMS/GAS. DINT/WPATH/ARCH retired as aliases (mapping below).
core-value: A dispatcher can receive a work order, assign a tech, and schedule the job — start to finish — without leaving the dashboard.
```

---

## v1.0 Requirements — CLOSED 2026-05-30

Milestone closed; archive: `.planning/milestones/v1.0-cc-core-operational/`.

- [x] **QUEUE-01**: 21-day active dispatch queue; older WOs archived in Neon
- [x] **LEAD-01**: Inbound client email parsed by Gemini → Needs Review queue with WO type, address, contact
- [x] **LEAD-02**: Lapham form submissions detected (detectLaphamForm), bypass Gemini
- [x] **COORD-01**: Comms tab shows Gmail thread history (lazy fetch/cache)
- [x] **COORD-02**: Active WOs have tenant_email populated after bootstrap
- [x] **COORD-03**: Reply from Comms tab reaches tenant/RM
- [x] **DISP-01**: Assign tech to WO with correct status transitions
- [x] **DISP-02**: Schedule WO in schedule grid with assigned tech
- [x] **DISP-03**: Assigned tech sees job in Tech PWA
- [x] **GAP-01**: Verification gaps diagnosed and fixed before close
- [x] **GAP-02**: All v1.0 requirements pass on real production data

---

## Triage Requirements — COMPLETE (Phase 11)

- [x] **TRIAGE-01**: Tech debt map assembled (`11-TECH-DEBT-MAP.md`, commit `a9197e7`)
- [x] **TRIAGE-02**: MANIFEST.json fixed + Railway checklist (commits `d116408`, `36a2658`); live Railway verification deferred (COO decision 2026-06-09)

---

## Neon Cutover Requirements — COMPLETE (Phase 12)

- [x] **NEON-01**: Data integrity audit — `tools/orchestrator/neon_audit.py` pass/fail gate for `jobs`, `time_records`, `job_comments` vs Sheets (21-day window); 9 pytest tests pass; audit artifact PASS (commit `a3dd42b`)
- [x] **NEON-02**: DAL Sheets read fallbacks severed — `jobs.ts`, `techs.ts` Neon-only; `sheets-client.ts` tombstoned with unconditional throw (commit `2ef7f46`)
- [x] **NEON-03**: Sheets write path severed — job-comments route Neon-only GET+POST (commit `15bad39`)

### Retired alias IDs (do not use in new plans)

| Old ID | Disposition |
|---|---|
| DINT-01/02/03 | → NEON-01 — audit script, gap list by WO ID, zero-mismatch gate. All delivered. |
| WPATH-01/02/03 | → delivered via Phases 17/18 (PRs #2653/#2654) + NEON-02/03. `WRITE_PATH_NEON_ONLY=true` invariant live. |
| ARCH-01 | Sheets write access severed in code (NEON-03 + Phases 17/18); Sheets-permission-level lock → Phase 24 (GAS-02) |
| ARCH-02 | `docs/SHADOW_WRITES.md` never created — closure doc folded into Phase 24 (GAS-02) |
| ARCH-03 | Delivered — CLAUDE.md invariants + 2026-06-10 docs reconciliation declare Neon sole write path |

---

## GAS Migration Requirements — ACTIVE

- [x] **GAS-A**: Phase A dead code cleanup (PR #2635)
- [x] **GAS-B**: TechPWA.gs auth cutover — handleLogin stubbed, pinHash migrated (`af1a359`)
- [x] **GAS-C**: TechPWA cutover pts 1+2 (PRs #2653, #2654)
- [ ] **GAS-D**: Code.js email polling → n8n (Phase 19, in progress) — blocked on Lapham extraction + property merge node ports; Gmail OAuth for workorder@ (Brandon)

---

## Future Requirements (Phases 22–24)

- [ ] **PAGA-01/02/03**: The PAGA Firewall — CA break compliance (Phase 22; define at discuss-phase)
- [ ] **COMMS-01/02**: Unified Dispatch Comms (Phase 23; define at discuss-phase — auto-reply + tenant-email slice moved to INTAKE-06/07; owns OpenPhone SMS integration incl. A2P 10DLC)
- [ ] **GAS-01/02**: Legacy GAS Retirement — full GAS exit, Sheets tab permission lock, `docs/SHADOW_WRITES.md` closure doc (Phase 24)
- [ ] **FORM-01…**: Direct WO Intake Form + website remediation — structured form → intake API, segmented client links, contact-form ADA fixes, privacy policy (Phase 26; define at discuss-phase)
- [ ] **DASH-01**: getTimecardApprovalQueue + approveTimecard + disputeTimecard served by Next.js routes against Neon — GAS actions retired
- [ ] **DASH-02**: getTechAvailability served by Next.js against Neon time_off_requests data
- [ ] **DASH-03**: DEFERRED (2026-06-11) — dispatch scheduling truth is the daily-assignment Google Sheet + Buildertrend calendar feed, not Neon; calendar ships after sr-01 makes CC the scheduling surface. Phase 27 gives getCalendarData an explicit not-implemented response (no GAS fallthrough).
- [ ] **DASH-04**: expandScope, generateTenantScheduleLink, submitFeedback writes ported to Next.js routes (Neon-only); markPTEGranted DROPPED — zero callers, PTE flows via updateJob
- [ ] **DASH-05**: dashboard-api.ts /api/gas fallthrough reaches GAS for ZERO non-Gmail actions; Gmail-domain (getGmailThread/getDraftReply/replyToThread) explicitly carved out to Phase 23
- [ ] **SENT-01**: Sentinel checks (wc-scanner, time-anomaly, stale-job, spec-architect) run as scheduled jobs during work hours only — no 24/7 polling services
- [ ] **SENT-02**: Every sentinel run is connect-query-disconnect — zero held Neon connections; endpoint autosuspends between runs
- [ ] **SENT-03**: Neon compute graph verifiably flatlines between runs; projected monthly consumption fits the allowance with headroom

## Parsing & Intake Requirements — Phase 25 (COO directive 2026-06-10)

- [ ] **INTAKE-01**: WO address extracted correctly from inbound email and Lapham forms
- [ ] **INTAKE-02**: Requester and Tenant name + contact info extracted; tenant contact exempt when unoccupied (turnover/inspection WO types)
- [ ] **INTAKE-03**: Work description extracted completely and cleanly
- [ ] **INTAKE-04**: Access info two-way sync — pulled from Neon `properties` for known addresses; WO-supplied access info adds/corrects the DB record when missing or changed
- [ ] **INTAKE-05**: Lapham form parsing is lossless — every field dispatch needs to assign/schedule lands on the WO (paramount)
- [ ] **INTAKE-06**: Requester receives an automatic "message received" reply on intake
- [ ] **INTAKE-07**: Tenant receives date/time coordination email when tenant email provided (SMS via OpenPhone deferred to Phase 23 — COO 2026-06-10)

---

## Schedule Redesign Requirements (sr-01) — PAUSED

| ID | Requirement | Status |
|----|-------------|--------|
| SR-FOUNDATION | CSS tokens: amber accent (#f59e0b), Outfit font, semantic aliases | ✅ |
| SR-01 | Tech-row grid replaces time-slot calendar on /schedule | Pending |
| SR-02 | Lock and Send button in schedule header | Pending |
| SR-03 | Lock and Send fires n8n webhook, marks dispatch_sent_at, confirmation screen | Pending |
| SR-04 | Data source dashboardRequest (GAS) → /api/schedule/week (Neon) | Pending |
| SR-05 | Badge/PIN login numeric keypad on clock.* hostname | ✅ |
| SR-06 | Job list: amber URGENT + teal STANDARD cards, bottom nav | Pending |
| SR-REGRESSION | Playwright: 0 new failures vs 43p/68s/0f baseline | Pending |

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Comms bulk backfill | Lazy fetch covers the active 21-day window |
| Any new UX features | No new features until the core loop is battle-tested |
| PTE exception review before archive | WOs open 21+ days are operationally dead |
| New GAS code of any kind | No-new-GAS-code invariant — Next.js or n8n only |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| QUEUE/LEAD/COORD/DISP/GAP (11) | v1.0 Phases 1–3 | ✅ Closed 2026-05-30 |
| TRIAGE-01/02 | Phase 11 | ✅ |
| NEON-01/02/03 | Phase 12 | ✅ (merge of `feat/phase-12-neon-cutover` pending) |
| GAS-A/B/C | Phases 15–18 | ✅ |
| GAS-D | Phase 19 | In progress |
| PAGA-01/02/03 | Phase 22 | Pending |
| COMMS-01/02 | Phase 23 | Pending |
| GAS-01/02 | Phase 24 | Pending |
| INTAKE-01…07 | Phase 25 | Pending |
| SR-* | sr-01 | Paused (2/8 done) |
| DASH-01…05 | Phase 27 | Pending |
