# ROADMAP — APT Central Command

```yaml
rebuilt: 2026-06-10 (project-docs-reconciliation — git log is ground truth)
rule: phase numbers = .planning/phases/ directory numbers — never reuse a number
id-system: ROADMAP IDs canonical (NEON/TRIAGE/PAGA/COMMS/GAS) — DINT/WPATH/ARCH are resolved aliases (see REQUIREMENTS.md)
```

---

## Milestone Index

| Milestone | Phases | Status |
|---|---|---|
| v1.0 CC Core Operational | 1–3 | ✅ CLOSED 2026-05-30 — archived `.planning/milestones/v1.0-cc-core-operational/` |
| Foundation | F1–F12 (own numbering) | ✅ COMPLETE except F9 (deferred) |
| v1.1 Neon Cut-Over | 12–14 | ✅ DELIVERED — 13/14 superseded; work landed via Phase 12 + 17/18 |
| Schedule Redesign | sr-01 | ⏸ PAUSED — 2/6 plans complete (sr-01-01, sr-01-04) |
| GAS Migration (CC3.0 exit) | 15–21 | ▶ ACTIVE — 15–18 done, 19 in progress |
| Post-GAS Features | 22–24 | Pending — gated on GAS exit + battle-tested core loop |

---

## Foundation Milestone (own F-numbering — predates phase dirs)

| F# | Item | Status |
|---|---|---|
| F1 | ADW Orchestrator gaps | ✅ 2026-05-31 |
| F2 | context_bundle_builder hook | ✅ 2026-05-31 |
| F3 | npm audit + fix | ✅ 2026-05-31 |
| F4 | Nightly E2E cron | ✅ 2026-05-31 |
| F5 | n8n workflow export | ✅ 2026-05-31 |
| F6 | drizzle-kit migrate fix | ✅ 2026-05-31 |
| F7 | GCP OAuth cleanup | ✅ 2026-05-31 |
| F8 | Vercel orphan deletion | ✅ 2026-05-31 |
| F9 | Jack Roberts n8n patterns | DEFERRED — apply opportunistically to new n8n work |
| F10 | GAS migration scope catalog | ✅ `04879a6` — `docs/GAS_MIGRATION_SCOPE.md` accepted 2026-06-07 |
| F11 | Shadow-writes inventory | NEVER EXECUTED — overtaken by Phase 12 audit (parity verified by `neon_audit.py`, cutover landed via NEON-02/03). `docs/SHADOW_WRITES.md` never created; residual doc work folded into Phase 24 |
| F12 | Data integrity audit | ✅ 2026-06-10 — same work as Phase 12 below |

---

## Executed Phase Arc (directory numbering — git truth)

| Phase | Name | Status | Evidence |
|---|---|---|---|
| 02 | Core loop verification | ✅ | v1.0 milestone closed 2026-05-30 |
| 03 | Gap remediation | ✅ | v1.0 milestone closed 2026-05-30 |
| 06 | drizzle-kit migrate fix | ✅ | = F6 |
| 07 | GCP OAuth cleanup | ✅ | = F7 |
| 10 | GAS migration scope | ✅ | `04879a6`, `05101d5` — = F10 |
| 11 | Production Triage & System Audit (TRIAGE-01/02) | ✅ | `a9197e7`, `d116408`, `36a2658`; live Railway verification deferred (COO decision 2026-06-09) |
| 12 | Data Integrity Audit + Neon Cutover (NEON-01/02/03) | ✅ | audit `a3dd42b`; NEON-02 `2ef7f46`; NEON-03 `15bad39` — branch `feat/phase-12-neon-cutover`, **merge pending** |
| 13 | write-path-flip | 🪦 SUPERSEDED | never executed — delivered via 17/18 + NEON-02/03 (see 13-0x-SUMMARY.md) |
| 14 | archive-docs | 🪦 SUPERSEDED | never executed — see 14-01-SUMMARY.md; SHADOW_WRITES.md doc → Phase 24 |
| 15 | GAS Phase A — dead code cleanup | ✅ | PR #2635 (`c33f74c`) |
| 16 | TechPWA.gs auth cutover | ✅ | `af1a359` (#2651) — no phase dir; branch `feat/phase-16-execution` |
| 17 | TechPWA cutover pt 1 | ✅ | PR #2653 (`69ff959`) |
| 18 | TechPWA cutover pt 2 | ✅ | PR #2654 (`f78a5b3`) |
| 19 | Code.js email polling → n8n | ▶ IN PROGRESS | branch `feat/phase-19-code-js-email-migration` |
| 20 | Fix 3-day WO drought on dispatch | MONITORING | likely resolved by Phase 25 cutover — first new-pipeline WO landed in dispatch overnight 2026-06-11 (COO confirmed); close after 1 week of steady flow |
| 21 | Neon migration (remaining) | Pending | CONTEXT.md drafted |

### Phase 19 blockers (carry-forward)

```yaml
n8n-workflow-stubs: 2 nodes are stubs (Lapham extraction + property merge) — workflow MUST NOT be activated in n8n until both ported
gmail-oauth: workorder@ OAuth in Node context — Brandon GCP action, gates production email polling
sheets-node-debt: RESOLVED 2026-06-10 — Sheets node stripped in Phase 25 cutover; workflow is Neon-native
gmail-push-trigger: BACKLOG (COO request 2026-06-10) — replace 5-min polling with Gmail push: Pub/Sub topic + n8n webhook + daily watch() renewal + slow fallback poll. Dedup (EMAIL-<msgId>) already makes push adoption safe. Small sprint after intake verified on real traffic. Requires Brandon GCP action: create Pub/Sub topic + grant gmail-api-push@system.gserviceaccount.com publisher.
```

---

## Future Phases (renumbered 2026-06-10 — old 13/14/15 labels collided with executed dirs)

| Phase | Name | Requirements | Gate |
|---|---|---|---|
| 22 | The PAGA Firewall | PAGA-01/02/03 | operational core battle-tested |
| 23 | Unified Dispatch Comms | COMMS-01/02 | Phase 22; auto-reply + tenant-email slice moved to Phase 25; owns OpenPhone SMS integration (API key, A2P 10DLC, send + inbound webhook) |
| 24 | Legacy GAS Retirement | GAS-01/02 | Phases 19–21 complete; Gmail OAuth (Brandon); includes `docs/SHADOW_WRITES.md` closure doc + Sheets tab permission lock |
| 25 | Parsing & Intake Quality | INTAKE-01…07 | COO directive 2026-06-10; depends on Phase 19 (parsing improvements land in the n8n port / Next.js — no new GAS code) |
| 26 | Direct WO Intake Form + Website Remediation | FORM-01… (define at discuss-phase) | COO directive 2026-06-10; after Phase 25 — structured form intake makes parsing the fallback path |
| 28 | Sentinel Consolidation — Neon Compute Diet | SENT-01…03 | URGENT (Neon allowance 81% on day 11): rebuild 4 Railway sentinel pollers as scheduled work-hours jobs with connect-query-disconnect so Neon autosuspends; sentinels currently PAUSED (Brandon, 2026-06-11) |
| 27 | DashboardAPI Remainder Migration | DASH-01…05 | port last non-Gmail GAS actions to Next.js (timecards, availability, scope/schedule-link/feedback writes); calendar DEFERRED post-sr-01 (dispatch truth = assignment sheet/Buildertrend today); markPTEGranted dropped (dead); Gmail-domain → Phase 23 |

### Phase 25: Parsing & Intake Quality

**Goal:** Inbound WO parsing reliably extracts everything dispatch needs to assign/schedule, access info syncs two-way with the Neon `properties` table, Lapham form extraction is lossless, and requester/tenant comms wiring (auto-reply, date/time coordination email) is in place. OpenPhone SMS deferred to Phase 23 (COO 2026-06-10).

**Success criteria:**
1. WO address, requester/tenant name + contact, and work description extracted correctly from inbound email and Lapham forms (tenant contact exempt for turnover/inspection WOs)
2. Access info pulled from `properties` for known addresses; missing/changed access info from a WO adds/corrects the DB record
3. Requester receives an automatic "message received" reply on intake
4. Tenant receives date/time coordination email when tenant email provided (SMS via OpenPhone → Phase 23)
5. All improvements in n8n/Next.js — zero new GAS code

### Phase 26: Direct WO Intake Form + Website Remediation

**Goal:** WO data arrives structured through APT's own form instead of free-text email — parsing becomes the fallback, not the main path. Plus aptmaintenanceinc.com remediation.

**Scope (define at discuss-phase — revised 2026-06-10 after COO input):**
1. REMODEL the existing /contact page forms rather than net-new route — the page's real job is request submission. Two intents, clearly split: "Request a Quote" stays for prospects/estimate work; ADD a "Submit a Work Order" form (or one form with an intent selector swapping field sets) for existing PM clients — fields mirror the intake schema (address/unit, requester contact, occupied? → tenant contact, work description, access info)
2. Both forms POST to the CC intake API (structured JSON → Neon → WO + auto-ack) — NOT an email to an inbox; that's the change that kills parsing for form-sourced WOs
3. Segmentable client links (deep-link with WO intent + client preselected) for tailored intake
4. Phase 25 auto-reply TEMPLATE_TODO resolved — form link added to requester acknowledgement
5. ADA compliance on all forms (WAVE report already flags /contact issues); privacy policy + legal pages added
6. Site audit prerequisite: aptmaintenanceinc.com WAF blocks automated fetch (403 even via headless Chromium) — audit existing form fields/platform at discuss-phase with browser access

Deferred design note — Tenant Contact (pteGranted=No): home = n8n workflow, NOT GAS. Gate: Phase 24. Neon insert with `pte_granted=No` → n8n → Resend email → `comms_messages` entry → dispatch UI indicator.

---

### Phase 27: DashboardAPI Remainder Migration

**Goal:** Port the last 9 non-Gmail GAS DashboardAPI actions to Next.js routes backed by Neon, so the /api/gas fallthrough in dashboard-api.ts serves ZERO non-Gmail actions. After this phase, GAS DashboardAPI is caller-less dead code (Phase 24 deletes it).

**Plans:** 6 plans in 3 waves (planned 2026-06-11)

Plans:
- [ ] 27-01-PLAN.md — dispatcher_feedback schema migration (ADDITIVE; Brandon row-count + db:migrate gates) [DASH-04 unblock]
- [ ] 27-02-PLAN.md — timecard queue/approve/dispute routes (TDD; payroll authz) [DASH-01]
- [ ] 27-03-PLAN.md — tech availability + calendar reads (TDD; date expansion) [DASH-02, DASH-03]
- [ ] 27-04-PLAN.md — markPTEGranted/expandScope (existing PATCH) + generateTenantScheduleLink route (TDD) [DASH-04]
- [ ] 27-05-PLAN.md — feedback CRUD routes vs migrated table (TDD; gated on 27-01) [DASH-04]
- [ ] 27-06-PLAN.md — dashboard-api.ts wiring + DASH-05 zero-fallthrough audit + Playwright [DASH-05]

**Wave structure:** W1 {01 schema, 02 timecards, 03 availability/calendar} -> W2 {04 job-writes, 05 feedback (needs 01)} -> W3 {06 wiring + Playwright}.

---

### Phase 28: Sentinel Consolidation — Neon Compute Diet

**Goal:** Replace the four 24/7 Railway sentinel pollers (wc-scanner, time-anomaly, stale-job, spec-architect) — root cause of the Neon compute burn (81% of the 100 CU-hr allowance by day 11) — with one consolidated n8n work-hours-only scheduled workflow using connect-query-disconnect so Neon autosuspends between runs, then delete the Railway services. Sentinel SQL is NOT in the repo (`Sentinels/` is a CF Worker proxy); it must be recovered from the paused Railway containers first.

**Plans:** 3 plans in 3 waves (planned 2026-06-11)

Plans:
- [ ] 28-01-PLAN.md — Wave 0 discovery: Railway GraphQL script recovers sentinel SQL/cadence/DATABASE_URL → SENTINEL_INVENTORY.md (Brandon-run; autonomous:false) [SENT-01, SENT-02]
- [ ] 28-02-PLAN.md — Wave 1 build: consolidated "APT Sentinel Checks" n8n workflow (work-hours cron, Pacific TZ, "Neon Postgres" HTTP credential, errorWorkflow wired) + Brandon-runnable importer [SENT-01, SENT-02]
- [ ] 28-03-PLAN.md — Wave 2 retire: dry-run-guarded Railway deletion script + SENT-03 evidence (neon_diagnostics pre/post 48h delta, monthly projection < 100 CU-hr) [SENT-01, SENT-03]

**Wave structure:** W0 {01 discovery — gates everything; no SQL = no build} -> W1 {02 build + import + manual verify Neon-idle} -> W2 {03 delete services AFTER parity confirmed + SENT-03 gate}. Three-wave separation is non-negotiable (RESEARCH.md Pitfall 5 — deletion before parity has no rollback).

---

## Schedule Redesign (sr-01) — PAUSED

| Plan | What | Status |
|---|---|---|
| sr-01-01 | CSS tokens + Outfit font + amber accent | ✅ |
| sr-01-02 | Tech-row grid (desktop /schedule, GAS→Neon data source) | Pending |
| sr-01-03 | Lock and Send (schema, API route, ConfirmationScreen) | Pending |
| sr-01-04 | Badge/PIN login redesign (numeric keypad) | ✅ |
| sr-01-05 | Job list redesign (amber/teal cards, BottomNav) | Pending |
| sr-01-06 | Playwright suite verification | Pending |

Resume after GAS migration arc — requirements and success criteria preserved in `.planning/phases/schedule-redesign/`.
