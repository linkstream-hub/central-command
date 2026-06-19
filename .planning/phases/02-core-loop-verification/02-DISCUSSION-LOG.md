# Phase 2: Core Loop Verification — Discussion Log

**Date:** 2026-05-30
**Mode:** WWPGDPTD — expert-driven decision mode (no user question prompts; Claude made all calls)

---

## Gray Areas Identified

| Area | Decision Made By |
|------|-----------------|
| Pre-flight checklist | Claude (expert call) |
| Verification structure | Claude (expert call) |
| Gap protocol | Claude (expert call) |
| Evidence format | Claude (expert call) |
| Walkthrough runner | Claude (expert call) |

---

## Decision Rationale

### Pre-flight
`bootstrapJobsToNeon()` was documented in S114 spec (P3 section) as a Brandon-run GAS console step that was never executed. COORD-02 cannot pass without it. Made Task 0.

### Verification structure
Wave ordering (LEAD → COORD → DISP) follows natural dependency: COORD needs a real WO to open; DISP needs a real WO to assign. Verification is against existing queue data — no waiting for new inbound emails.

### Gap protocol
Full audit pass before any fixes. Industry-standard approach for verification sprints — stopping on first failure produces incomplete Phase 3 scope, which leads to re-verification loops.

### Evidence format
Committed artifact (`artifacts/phase2-verification-results.md`) is the primary record. REQUIREMENTS.md updates follow from it. Two sources: raw evidence in artifact, status in requirements index.

### Walkthrough runner
Brandon solo. Product owner runs the technical verification pass. Robert gets operational onboarding after the system is proven stable in Phase 3.

---

## Deferred Ideas

- Robert supervised trial → deferred to post-Phase 3
- Auto-archive ongoing WO hygiene → out of v1.0 scope
- CA Break Compliance monitor → below v1.0 gate
