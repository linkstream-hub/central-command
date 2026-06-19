# ADR-012: DAL Cleanup — Delete `updateJob()` and Preserve `createManualJob()` Init Logic

**Status:** Accepted  
**Date:** 2026-06-17  
**Deciders:** Brandon Bittner  

---

## Context

Architecture review (Candidate 3) audited `tech-pwa/src/lib/dal/jobs.ts` and `tech-pwa/src/app/api/jobs/[jobId]/route.ts` for dead Sheets code. Finding: Sheets fallback was already removed in Phase 12 (comment on `dal/jobs.ts:1` confirms). The actual issues found:

**Issue A — `jobsRepository.updateJob()` is dead code.**  
No route calls it. The real update path is `PATCH /api/jobs/[jobId]` which calls `db.update(jobs)` directly (lines 109–111 of route.ts). `dashboard-api.ts:571` and `sandbox-store.ts:202` use `'updateJob'` as an action string, not as a call to the repository method. ADR-010 stated "updateJob() remains for dispatcher field edits" — that was written before confirming call sites. The audit disproves the premise.

**Issue B — `createManualJob()` initialization logic conflict with Phase 17 spec.**  
Phase 17 spec (Out of Scope section) stated: "status is set to `Needs Review` unconditionally; that's correct." Actual code (`dal/jobs.ts:131`) sets status conditionally: if `assignedTech && scheduledDate` → `'Scheduled'`, else `'Ready to Schedule'`. Neither matches the spec assumption. The conditional logic is correct — a dispatcher filling in tech + date at creation time intends a `Scheduled` job; forcing `Needs Review` would add unnecessary clicks with no safety gain. This is initialization, not a transition — the FSM governs existing jobs after creation.

**Issue C — `source: 'neon' as const` field.**  
Present in 15+ places across 10+ route files. Always constant. ADR-006 authorized removal. Not blocking anything.

---

## Decisions

### Decision 1: Delete `jobsRepository.updateJob()`

Delete the method and its 26-line field mapping from `tech-pwa/src/lib/dal/jobs.ts`. No callers exist. Execute in Phase 17 as a cleanup task alongside adding `updateJobStatus()`.

This supersedes ADR-010's statement that "`updateJob()` remains for dispatcher field edits."

### Decision 2: Preserve `createManualJob()` conditional status initialization

`createManualJob()` sets initial status based on payload presence — `Scheduled` if tech+date present, else `Ready to Schedule`. This is correct behavior for job initialization, not a FSM transition. Job creation is a factory operation; the FSM governs state changes on existing jobs. Do not route `createManualJob()` through `JobStateService`.

Update Phase 17 spec Out of Scope note to reflect actual behavior.

### Decision 3: Defer `source: 'neon'` removal to standalone chore PR

Execute as `chore/remove-neon-source-field` after Phase 17 merges. Mechanical, zero-risk, 15 occurrences. Adding to Phase 17 would make the diff noisy without benefit.

---

## Consequences

- `updateJob()` deleted → 26-line field mapping removed from DAL; Phase 17 diff shrinks
- `createManualJob()` unchanged → existing dispatcher create-job flow unchanged
- `source: 'neon'` deferred → Phase 17 diff stays focused on FSM seam work
- ADR-010 statement about `updateJob()` superseded by this ADR
