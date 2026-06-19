# PHASE 3 — SPRINT PLAN
# Foundation rebuild: Google Sheets → Neon Postgres
# Schema: specs/PHASE3_SCHEMA_SPEC.md
# Last updated: 2026-05-21 (Session 97)

---

## GUIDING PRINCIPLE

Each sprint has one job. Sprints do not overlap. Data stays coherent because each sprint runs
against a dormant system. Every sprint ends with a verified, shippable state on `main`.

GAS continues to run throughout Phase 3. The flip happens in P3-4 and P3-5.
Until then, GAS is source of truth. Neon is the target being built.

---

## SPRINT OVERVIEW

| Sprint | Name | What It Does | Gate |
|---|---|---|---|
| P3-1 | Schema Foundation | All 28 tables defined in Drizzle, migrations applied, dev Neon branch verified | Schema review → PASS |
| P3-2 | Time Records Migration | Existing Time Records data (Sheets + existing Neon) migrated, shifts/breaks normalized | Data integrity check |
| P3-3 | Dispatch Queue + Master Directory Migration | Master Directory → properties + clients, Dispatch Queue → jobs properly keyed | Data integrity check |
| P3-4 | TechPWA → Next.js API Routes | All field tech endpoints replaced with Next.js/Neon; GAS field routes deprecated | E2E test on dev env |
| P3-5 | GAS Bridge-Only Cutover | DashboardAPI.gs reads replaced; GAS reduced to Gmail/Calendar/Sheets sync only | Full system smoke test |

---

## P3-1: SCHEMA FOUNDATION

**Goal:** All 28 tables exist in Neon dev branch. No data migration. No route changes. Schema only.

**Branch:** `feat/p3-1-schema-foundation`

**Spec:** `specs/PHASE3_P3_1_SPEC.md`

**Definition of Done:**
- `schema.ts` defines all 28 tables per `PHASE3_SCHEMA_SPEC.md`
- All modifications to existing tables (rename `entity_id` → `org_id`, add `tech_id`/`property_id`/`shift_id` FKs) are in Drizzle
- `drizzle-kit generate` produces valid migration files
- `drizzle-kit migrate` applies cleanly to dev Neon branch
- `orgs` table seeded with `APT-CA` record
- `npx tsc --noEmit` → 0 errors

---

## P3-2: TIME RECORDS MIGRATION

**Goal:** All Time Records data in Neon. Shifts created, breaks normalized, attestation data linked.

**Branch:** `feat/p3-2-time-records-migration`

**Depends on:** P3-1 merged

**What this does:**
- Write `scripts/migrate-time-records.ts` — reads Time Records Sheets tab, writes to Neon
- For each unique (tech_badge, date) pair: create one `shifts` row
- For each time record with break_start/break_end: create one `breaks` row (break_number = 1)
- For each time record with attestation: create one `attestations` row
- Link `time_records.shift_id` → correct shifts row
- Reconcile existing Neon `time_records` rows with Sheets (Sheets is source of truth — Neon rows seeded in P2 may differ)

**Definition of Done:**
- Migration script runs without errors against dev Neon
- Row counts match Sheets source (±1% for encoding edge cases)
- 5 spot-checked records verified manually
- `breaks` table populated for all records with break data
- `attestations` table populated for all records with attestation data

---

## P3-3: DISPATCH QUEUE + MASTER DIRECTORY MIGRATION

**Goal:** Properties and clients in Neon. Jobs properly keyed with property_id and tech_id.

**Branch:** `feat/p3-3-dispatch-migration`

**Depends on:** P3-2 merged

**What this does:**
- Write `scripts/migrate-master-directory.ts` — reads Master Directory Sheets tab → populates `clients` + `properties` tables
  - Client dedup by normalized name
  - Properties dedup by address_key (same normalizeAddressKey logic)
- Write `scripts/migrate-dispatch-queue.ts` — reads Dispatch Queue Sheets tab → reconciles with existing Neon `jobs` rows
  - Sheets is source of truth for any row not in Neon
  - For each job: attempt to match `tech` text → `techs.id` (by badge name) → write `tech_id`
  - For each job: attempt to match address_key → `properties.id` → write `property_id`
- Migrate `new_contact_queue` from New Contacts tab

**Definition of Done:**
- All Master Directory rows → `properties` table (with client dedup)
- All Dispatch Queue rows → `jobs` table (no orphans)
- `jobs.tech_id` populated where tech name matches a known tech
- `jobs.property_id` populated where address_key matches a known property
- Unmatched rows documented in migration report
- Row count spot-checks pass

---

## P3-4: TECHPWA.GS → NEXT.JS API ROUTES

**Goal:** All field tech API endpoints moved to Next.js + Neon. TechPWA.gs kept alive but idle.

**Branch:** `feat/p3-4-field-api-nextjs`

**Depends on:** P3-3 merged

**New routes (all use badge+PIN auth pattern from `@/lib/auth`):**
```
POST /api/field/shift/start         → handleStartShift
POST /api/field/shift/end           → handleEndShift
POST /api/field/shift/status        → handleGetShiftStatus
POST /api/field/clock-in            → handleClockIn
POST /api/field/clock-out           → handleClockOut
POST /api/field/break/start         → handleStartBreak
POST /api/field/break/end           → handleEndBreak
POST /api/field/job/complete        → handleMarkComplete
POST /api/field/attestation/sign    → signAttestation (writes to attestations table, triggers n8n webhook)
GET  /api/field/jobs                → handleGetJobs (tech's job list for today)
POST /api/field/auth/login          → handleLogin (badge+PIN → session token)
```

**Auth on all field routes:** `getSession()` from `@/lib/auth` (badge+PIN token — NOT Google OAuth)

**Compliance hook:** `/api/field/attestation/sign` must POST to `N8N_COMPLIANCE_WEBHOOK_URL` env var (server-side) — same webhook as TechPWA.gs signAttestation, but now called from Next.js. Include `hourlyRate` in payload.

**Tech PWA frontend:** Update all API calls in `tech-pwa/src/` to call new `/api/field/*` routes instead of TechPWA.gs URL. The `TECH_PWA_GAS_URL` env var becomes unused.

**TechPWA.gs:** NOT decommissioned in this sprint. Keep alive as fallback. All new writes go to Neon.

**Definition of Done:**
- All 11 routes exist with badge+PIN auth
- `npx tsc --noEmit` → 0 errors
- Playwright E2E: shift start → clock in → break → clock out → mark complete → attest
- n8n compliance webhook receives payload on sign attestation (confirm in n8n execution log)
- TechPWA.gs still deployed but not called by any client code

---

## P3-5: GAS BRIDGE-ONLY CUTOVER

**Goal:** GAS reduced to Google Workspace bridge. All Neon reads cut over. TechPWA.gs decommissioned.

**Branch:** `feat/p3-5-gas-bridge-cutover`

**Depends on:** P3-4 merged

**What this does:**
- Audit all remaining DashboardAPI.gs routes that read Sheets — replace with Neon reads via Next.js
- Remove `TECH_PWA_GAS_URL` from Vercel env and codebase (no more calls to TechPWA.gs)
- TechPWA.gs: keep deployed (has CA Break Compliance Monitor webhook config), remove all non-Workspace logic from doGet/doPost
- GAS handlers that STAY (Google Workspace bridge only):
  - Gmail: getGmailThread, replyToThread, getDraftReply, getGmailLabel actions
  - Calendar: createOrUpdateCalendarEvent, deleteCalendarEvent
  - Code.js triggers: checkNewLeadEmails (email parse → Dispatch Queue write), morningAuditReport
- All `getDispatchData`, `getTimecards`, etc. that read Sheets → now read Neon via Next.js routes
- Staff Roster Sheets tab → replaced by `staff` Neon table (update auth.ts to query Neon instead of DashboardAPI.gs for staff auth)

**Definition of Done:**
- All data reads come from Neon (no Sheets reads in Next.js routes)
- CC2.0 dashboard: job queue, live status, compliance, schedule — all Neon-backed
- Tech PWA: all endpoints Neon-backed
- GAS only handles Gmail, Calendar, Code.js email triggers
- Full Playwright E2E suite passes
- DashboardAPI.gs "Still in GAS" table in ARCHITECTURE.md updated to reflect new state

---

## DEPENDENCIES AND SEQUENCE

```
P3-1 → P3-2 → P3-3 → P3-4 → P3-5
```

Each sprint depends on the previous being merged. No parallel sprints.

**Rollback strategy:** Each sprint keeps legacy data paths intact. If P3-2 has a bug, the existing Sheets + Neon time_records from Phase 2 are untouched (migration is additive, not destructive). P3-4 keeps TechPWA.gs alive. P3-5 is the only sprint with no fallback — run it only after P3-4 is verified stable.

---

## WHAT DOES NOT CHANGE IN PHASE 3

- `Code.js` — email parsing, Google Calendar sync, Gmail API — untouched
- `morningAuditReport` — runs from GAS trigger — untouched
- CI/CD GitHub Actions — no changes
- Vercel deployment — auto-deploy from main continues
- n8n CA Break Compliance Monitor — already wired from P2-3, reads from Neon `time_records`

---

## AFTER PHASE 3

System is at: **Next.js frontend ↔ Neon Postgres ↔ GAS (Workspace bridge only)**

Then priority order:
1. Property Manager read-only portal (Entity 3 Stage 1)
2. Cloudflare Worker in front of TechPWA.gs (Security — open gap)
3. Auto-routing: Code.js turnover → RtS, adhoc → PTE Required
4. RtS Schedule Grid Rework (spec ready at `specs/ANTIGRAVITY_RTS_GRID_SPEC.md`)
5. Billing pipeline (QB integration)
