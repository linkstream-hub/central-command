# PLAN.md — Phase 2: Core Loop Verification

**Phase:** 2 of 3 — Milestone v1.0 CC Core Operational
**Goal:** Verify on real production data that the full lead → coordinate → assign/schedule loop works end-to-end. No code is written. All failures become Phase 3 scope.
**Date:** 2026-05-30
**Runner:** Brandon (solo walkthrough). No code changes. No AG code sprint.

---

## Phase Boundary

This is a structured operational walkthrough, not a code sprint. The output is a committed evidence artifact. Phase 2 is **complete** when all 8 requirements have a result on record — not when all 8 pass. Failures are expected and acceptable; undocumented failures are not.

---

## Risks

| Risk | Mitigation |
|------|-----------|
| Write-path check sends email to real client | Dev write guard (`NEXT_PUBLIC_DEV_ALLOW_WRITES` stays OFF). Test WO must use internal APT recipient only. Prior incident: 3 real Lapham emails sent during an unguarded session. |
| bootstrapJobsToNeon() corrupts Neon data | It is an upsert — idempotent and non-destructive. No data loss risk. |
| Stopping on first failure | D-08 is mandatory: continue through all 8 criteria regardless of failures. Phase 3 scope is built from the full gap inventory. |
| COORD-01 Comms tab broken on a WO with no Gmail thread | Pick a WO that originated from an inbound email — it will have a thread. |

---

## Pre-flight State

- Code.js v93 ✅ (S117 — status name fix live)
- TechPWA.gs v90 ✅
- DashboardAPI.gs v42 ✅
- `bootstrapJobsToNeon()` — **NOT YET RUN** ← Task 0 runs it

---

## Wave Structure

| Wave | Focus | Tasks | Environment |
|------|-------|-------|-------------|
| 0 | Pre-flight | 2 | GAS console |
| 1 | Lead Ingestion | 2 | Production (read-only) |
| 2 | Coordination | 3 | Production read-only + localhost write |
| 3 | Dispatch | 3 | Localhost write + Tech PWA |
| 4 | Close | 2 | Git |

---

## Tasks

### Wave 0 — Pre-flight

---

**Task 0.1 — Create verification artifact**

Create `artifacts/phase2-verification-results.md` with the following content:

```markdown
# Phase 2: Core Loop Verification Results

**Date:** 2026-05-30
**Runner:** Brandon (solo)
**Milestone:** v1.0 CC Core Operational

| Requirement | Environment | Result | Evidence |
|-------------|-------------|--------|----------|
| LEAD-01 | Production | | |
| LEAD-02 | Production | | |
| COORD-01 | Production | | |
| COORD-02 | Production | | |
| COORD-03 | Localhost | | |
| DISP-01 | Localhost | | |
| DISP-02 | Localhost | | |
| DISP-03 | Localhost | | |

## bootstrapJobsToNeon() Output

[paste GAS execution log here]

## Gap Inventory

[each Fail/Blocked row becomes one line here: GAP-XX: [REQUIREMENT] — [observed failure]]
```

Commit as a placeholder: `git add artifacts/phase2-verification-results.md && git commit -m "chore(phase2): create verification artifact template"`

---

**Task 0.2 — Run bootstrapJobsToNeon() on production**

Brandon: GAS Apps Script console → open **TechPWA.gs** project → run function `bootstrapJobsToNeon()`.

Expected output: `Synced N jobs to Neon.` where N > 0.

Paste the full GAS execution log into the artifact under **bootstrapJobsToNeon() Output**.

⛔ If output shows errors or N = 0, STOP and flag to Claude Code before proceeding. Do not continue the walkthrough until this resolves.

Post-run spot-check (Neon SQL or /live): confirm a Lapham WO now has `tenant_email` populated.

---

### Wave 1 — Lead Ingestion (Production, read-only)

Open https://dispatch.aptmaintenanceinc.com for both tasks. No writes. No mutations.

---

**Task 1.1 — LEAD-01: Real inbound email parsed by Gemini lands with correct fields**

Find a real inbound email from a non-Lapham property management client in the queue (Needs Review or any status).

Confirm all of the following are correctly populated on the WO detail:
- WO type (e.g., Plumbing, HVAC)
- Property address
- Contact name
- Contact info (email or phone)

Fill in artifact row for LEAD-01:
- Result: `Pass` / `Fail` / `Blocked — no qualifying WO in queue`
- Evidence: `WO# APT-XXXXX | type: [value] | address: [value] | contact: [name] / [info]`

If no qualifying non-Lapham WO arrived since 2026-05-30 (queue empty of new inbounds), mark **Blocked** with that reason and continue.

---

**Task 1.2 — LEAD-02: Lapham form submission identified without Gemini**

Find a Lapham WO in the queue. Look for indicators that it was created via `detectLaphamForm` rather than Gemini parsing:
- Source indicator on the WO (e.g., `source: lapham`, or the sender email is `website@laphamcompany.com`)
- Description is structured (pre-formatted form fields), NOT a raw email parse block

Fill in artifact row for LEAD-02:
- Result: `Pass` / `Fail` / `Blocked`
- Evidence: `WO# APT-XXXXX | sender: [email] | source indicator: [value] | description format: structured/raw`

---

### Wave 2 — Coordination

---

**Task 2.1 — COORD-01: Comms tab loads Gmail thread history (Production, read-only)**

On https://dispatch.aptmaintenanceinc.com, open any active WO that originated from an inbound email.
Click the **Comms** tab.

Confirm: Gmail thread history loads with at least 1 message visible. No error banner.

Fill in artifact row for COORD-01:
- Result: `Pass` / `Fail`
- Evidence: `WO# APT-XXXXX | Comms tab loaded | N messages visible` (or error message if Fail)

---

**Task 2.2 — COORD-02: tenant_email populated on Lapham WO after bootstrap (Production, read-only)**

Find a Lapham WO (from Task 1.2 or any other in the queue).
Confirm `tenant_email` is now populated — visible in the WO detail, Comms tab stakeholder section, or via SQL:
```sql
SELECT id, tenant_email FROM jobs WHERE source = 'lapham' AND tenant_email IS NOT NULL LIMIT 5;
```

Fill in artifact row for COORD-02:
- Result: `Pass` / `Fail`
- Evidence: `WO# APT-XXXXX | tenant_email: [value shown]`

---

**Task 2.3 — COORD-03: Send reply from Comms tab (Localhost, write-path)**

⚠️ **GAS write guard check — do this first, before opening the browser.**

Open `tech-pwa/.env.local` and confirm `NEXT_PUBLIC_DEV_ALLOW_WRITES` is **absent** (no line, or commented out). If the line exists and is set to `true`, remove it before proceeding. A live guard prevents GAS writes; an absent or false value is safe. Do not proceed until this is confirmed — prior incident: 3 real Lapham emails sent from an unguarded session.

Setup:
1. `cd tech-pwa && npm run dev` → confirm at http://localhost:3000
3. Identify a **test WO** with an internal APT email as the tenant/RM contact (NOT a real client address). If none exists, use WO with `workorder@aptmaintenanceinc.com` or similar internal address as recipient — flag to Claude Code if you're unsure which WO to use.

Brandon: localhost:3000 → open test WO → Comms tab → compose and send a short reply.

Fill in artifact row for COORD-03:
- Result: `Pass` / `Fail`
- Evidence: `WO# APT-XXXXX | recipient: [internal email] | UI result: [success message or error text] | Gmail thread: reply visible Y/N`

---

### Wave 3 — Dispatch (Localhost, write-path)

All dispatch tasks run on localhost:3000. Dev write guard stays ON.

---

**Task 3.1 — DISP-01: Assign tech to WO and status transitions correctly**

Brandon: localhost:3000 → open a WO (same test WO as COORD-03 or another with internal recipient).
Assign a tech (test tech T01 / Marco Flores, or any available tech).
Confirm status transitions correctly (e.g., Needs Review → Assigned, or similar expected transition).

Fill in artifact row for DISP-01:
- Result: `Pass` / `Fail`
- Evidence: `WO# APT-XXXXX | tech assigned: [name] | status before: [value] | status after: [value]` (or error text if Fail)

---

**Task 3.2 — DISP-02: Schedule WO in day×time slot grid**

Brandon: localhost:3000 → open schedule view (or WO scheduling section).
Schedule the test WO to a specific day and time slot.

Fill in artifact row for DISP-02:
- Result: `Pass` / `Fail`
- Evidence: `WO# APT-XXXXX | day: [value] | time slot: [value] | WO appears in grid: Y/N` (or error text if Fail)

---

**Task 3.3 — DISP-03: Assigned tech sees job in Tech PWA**

Brandon: localhost:3000/jobs → log in as test tech (badge `T01`, PIN `1234`).
Confirm the WO assigned in DISP-01 appears in the job list.

Fill in artifact row for DISP-03:
- Result: `Pass` / `Fail`
- Evidence: `WO# APT-XXXXX visible | tech badge: T01 | environment: localhost` (or error text if Fail)

---

### Wave 4 — Close

---

**Task 4.1 — Finalize artifact and update requirements**

1. Review all 8 artifact rows — every row must have a Result and Evidence entry
2. Populate **Gap Inventory** section: one line per Fail/Blocked row:
   ```
   GAP-01: COORD-03 — [describe observed failure]
   GAP-02: DISP-02 — [describe observed failure]
   ```
3. Update `REQUIREMENTS.md`: set each Phase 2 requirement to `[x]` (Pass) or leave `[ ]` (Fail/Blocked)
4. Kill dev server if running:
   ```powershell
   Get-NetTCPConnection -LocalPort 3000,3001,3010 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
   ```
5. Commit:
   ```
   git add artifacts/phase2-verification-results.md .planning/REQUIREMENTS.md
   git commit -m "docs(phase2): verification results — N pass, M fail, K blocked"
   git push origin HEAD
   ```

---

**Task 4.2 — Report outcome to Claude Code**

Paste the completed artifact table (8 rows) to Claude Code and state:
- "Phase 2 complete — N pass, M fail, K blocked"
- If any Fail/Blocked: "Phase 3 scope: [list gap IDs from Gap Inventory]"

Claude Code will update SESSION_STATE.md and route to Phase 3 planning or declare v1.0 milestone complete if all 8 pass.

---

## Acceptance Criteria

Phase 2 is **complete** when:

1. `artifacts/phase2-verification-results.md` is committed with all 8 rows filled (Pass/Fail/Blocked + specific evidence)
2. `REQUIREMENTS.md` updated with results
3. Outcome reported to Claude Code with the full 8-row table

Phase 2 does **not** require all 8 to pass. It requires all 8 to be documented.

---

## Verification Protocol (gsd-plan-checker)

The plan satisfies the phase goal if:
- Task 0.2 runs before any Wave 1–3 checks (dependency: COORD-02 cannot pass without bootstrap)
- Every artifact row specifies exact evidence (WO#, field values, error text) — not "looks good"
- Write-path tasks (COORD-03, DISP-01, DISP-02) are isolated to localhost with DEV guard ON
- All 8 criteria are attempted even when earlier ones fail
- Evidence artifact is committed, not just filled in

---

*Phase: 2 — Core Loop Verification*
*Plan created: 2026-05-30*
*Sources: 02-CONTEXT.md, ROADMAP.md, REQUIREMENTS.md, S114 spec §P3*
