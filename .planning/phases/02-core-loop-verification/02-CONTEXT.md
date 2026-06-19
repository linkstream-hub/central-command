# Phase 2: Core Loop Verification — Context

**Gathered:** 2026-05-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Verify on real production data that the full lead → coordinate → assign/schedule loop works end-to-end. This is a structured operational walkthrough, not a code sprint. No new features are built. Any failures discovered become Phase 3 scope.

</domain>

<decisions>
## Implementation Decisions

### Pre-flight (before walkthrough begins)
- **D-01:** Run `bootstrapJobsToNeon()` as Task 0 — GAS console → TechPWA.gs project → Run function. This backfills `tenant_email`, `tenantName`, `tenantPhone` for all existing WOs. Required before COORD-02 can pass.
- **D-02:** Confirm Code.js v93 is deployed (it is, as of S117). No other code work is outstanding before verification starts.

### Verification structure
- **D-03:** Wave-ordered walkthrough in dependency order: LEAD → COORD → DISP. COORD depends on having a real WO (from LEAD); DISP depends on having a WO to assign.
- **D-04:** Split protocol — read-only checks observe existing production data (no risk); write-path checks run in the local dev environment against controlled test conditions (no live client impact). Never send a real email to a client or mutate live scheduling data as part of verification.
- **D-05:** Read-only checks (LEAD-01, LEAD-02, COORD-01, COORD-02, DISP-03): verify by observing data already in the production queue/Neon. Real WOs have been coming in since deploy; the data exists.
- **D-06:** Write-path checks (COORD-03 send reply, DISP-01 assign tech, DISP-02 schedule WO): run on `localhost:3000` dev environment with `NEXT_PUBLIC_DEV_ALLOW_WRITES=true` **disabled** (default dev guard on). Use a test WO with an internal APT email as recipient — no real client contact.
- **D-07:** Brandon runs the walkthrough solo. Robert is not involved in Phase 2. Robert gets a supervised operational trial only after Phase 3 closes all gaps.

### Gap protocol
- **D-08:** Full audit pass — continue through all 8 criteria even when a check fails. Log every failure. Phase 3 scope is written from the complete gap inventory, not a partial one. Never stop on first failure.

### Evidence capture
- **D-09:** Committed artifact: `artifacts/phase2-verification-results.md`. One row per requirement: Pass / Fail / Blocked, specific evidence (WO#, field values observed, environment used). This is the primary record.
- **D-10:** After the audit pass, update REQUIREMENTS.md checkboxes from the artifact. Both live: artifact has raw evidence, REQUIREMENTS.md has status.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope and requirements
- `.planning/ROADMAP.md` §Phase 2 — 8 success criteria with exact evidence required per criterion
- `.planning/REQUIREMENTS.md` — LEAD-01, LEAD-02, COORD-01, COORD-02, COORD-03, DISP-01, DISP-02, DISP-03

### Pre-flight — bootstrap gap
- `specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md` §P3 — documents the `bootstrapJobsToNeon()` step. This was never executed. Task 0: run against Neon dev branch first to validate output, then run against production Neon.

### Comms fix — code state
- `specs/ANTIGRAVITY_S114_COMMS_FIX_SPEC.md` §P1 — DashboardAPI bridge fix for comms fallback (merged PR #1272). Code is on main. Unverified on real production WO.
- `tech-pwa/src/app/api/comms/[jobId]/route.ts` — the fixed comms route (DashboardAPI bridge, Neon cache write)
- `tech-pwa/src/lib/gmail-client.ts` — legacy Gmail client (no longer used in comms route after S114)

### Tenant email — data flow
- `Code.js` line 1656 — `tenantEmail: String(row[23] || "")` — maps Sheets col 24 → jobData
- `TechPWA.gs` line 1616 — `syncJobToNeon()` — sends jobData to `/api/jobs/sync`
- `tech-pwa/src/app/api/jobs/sync/route.ts` — upsert via spread; `tenantEmail` flows through to Neon `tenant_email` column
- `tech-pwa/src/lib/schema.ts` line 356 — `tenantEmail: text('tenant_email')` — confirms column exists

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `TechPWA.gs bootstrapJobsToNeon()` — the pre-flight function; reads all Dispatch Queue rows and syncs to Neon via `syncJobToNeon()`
- `artifacts/phase2-verification-results.md` — needs to be created; plain markdown table format: Requirement | Environment | Result | Evidence
- Dev write guard: `NEXT_PUBLIC_DEV_ALLOW_WRITES=true` override — keep OFF (default) for write-path verification to prevent accidental GAS writes

### Established Patterns
- Evidence artifact pattern: `artifacts/ag_test_results.txt` is the existing per-sprint evidence format. Phase 2 uses the same pattern but as a persistent requirements audit record, not a sprint artifact.
- REQUIREMENTS.md checkbox pattern: `- [x] **REQ-ID**: ...` — update after artifact is written.

### Integration Points
- Pre-flight touches GAS console only (no code change, no deploy)
- Walkthrough touches production `dispatch.aptmaintenanceinc.com` — live system, real data
- Evidence artifact committed to `main` directly or via a thin chore branch

</code_context>

<specifics>
## Specific Ideas

- Verification wave order matches the LEAD → COORD → DISP dependency chain, which is the natural operational flow a dispatcher would follow. The planner should structure the plan tasks in this order.
- The `bootstrapJobsToNeon()` output ("Synced N jobs to Neon.") should be captured in the evidence artifact as Task 0 result.
- COORD-01 and COORD-02 may be testable on the same WO (a Lapham WO that has both a Gmail thread and tenant_email populated post-bootstrap).
- Write-path checks (COORD-03, DISP-01, DISP-02) must use a dedicated test WO with an internal APT email as recipient — never a real client contact. The dev write guard (`NEXT_PUBLIC_DEV_ALLOW_WRITES`) must remain OFF during these checks.
- Prior incident: 3 emails sent to Lapham client during a testing session where dev writes were not guarded. This is the reason write-path verification never touches production or real client recipients.

</specifics>

<deferred>
## Deferred Ideas

- Robert supervised operational trial — deferred to after Phase 3 gap fixes
- Auto-archive for ongoing WO hygiene — out of scope for v1.0 (PROJECT.md Out of Scope)
- CA Break Compliance monitor — below the v1.0 gate

</deferred>

---

*Phase: 2 — Core Loop Verification*
*Context gathered: 2026-05-30*
