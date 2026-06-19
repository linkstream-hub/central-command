# ADR-004: Work Order Status Lifecycle (6-State Machine)

**Status:** Revised — 2026-06-18. Supersedes original 8-state model.
**Date (original):** 2026-06-06
**Revised:** 2026-06-18
**Deciders:** Brandon Bittner

---

## Context

The original 8-state model (`Needs Review`, `Ready to Schedule`, `PTE Required`, `Awaiting Approval`, `Scheduled`, `In Progress`, `Complete`, `Archived`) was organized around workflow position. Analysis of APT's actual dispatch bottlenecks revealed two problems:

1. **States described where a WO was, not what was blocking it.** Dispatch needs to know what action is required.
2. **The PTE coordination flow was underspecified.** `PTE Required` and `Awaiting Approval` were separate states for one continuous process: CC reaches out to tenant, tenant responds with a preferred time.

Two real bottlenecks drive almost all dispatch delays:
- **Bottleneck 1 — Missing information:** CC can't fully route the WO (unknown property, no tenant contact, unclear description).
- **Bottleneck 2 — Tenant coordination:** Unit is occupied, PTE not granted. Requires scheduling around tenant availability.

WOs with PTE already granted OR turnovers (vacant units) have neither bottleneck — they go straight to scheduling.

---

## Decision

Replace the 8-state model with a 6-state machine organized around blockers. Add `woType` as a field (not a status). Remove `Archived` as a user-visible status — completed WOs auto-drop from the live queue after 21 days.

---

## States

| Status | Meaning | Who acts next |
|--------|---------|---------------|
| `Needs Info` | CC couldn't auto-fill required fields. `missingFields` array specifies the gap. | Dispatcher (guided by sub-label + suggested action) |
| `Awaiting Tenant` | Occupied unit, PTE not granted. CC auto-sent SMS + email with scheduling link. Waiting for tenant response. | CC (automated), then Tenant |
| `Ready to Schedule` | All required info present, PTE confirmed or not required. Nothing blocking. | Dispatcher assigns tech + date + arrival window |
| `Scheduled` | Tech assigned, date + arrival window confirmed. 24h auto-reminder to tenant. | Tech (ClockIn) |
| `In Progress` | Tech has clocked in at the job site. | Tech (Complete attestation) |
| `Complete` | Tech submitted completion attestation. Auto-removed from live queue after 21 days. | System |

---

## WO Type (`woType` field — not a status)

`woType` determines how intake evaluation runs. Displayed as a tag in the dispatch UI throughout the job lifecycle.

| woType | PTE logic | Typical intake path |
|--------|-----------|---------------------|
| `maintenance` | Evaluate PTE — may go to `Awaiting Tenant` | Most WOs |
| `turnover` | PTE always N/A (vacant unit) | `Needs Info` or `Ready to Schedule` directly |
| `inspection` | PTE always N/A (Sam Cooney type) | `Ready to Schedule` directly if info complete |

---

## Transition Table

```
Intake evaluation (CC-automated, sets initial status)
  ├── required fields missing            → Needs Info
  ├── info complete + PTE not granted
  │   + woType = maintenance             → Awaiting Tenant (CC fires SMS + email immediately)
  └── info complete + PTE granted/N/A   → Ready to Schedule

Needs Info
  ├── fields filled (CC auto or Dispatcher manual)
  │     + PTE not granted               → Awaiting Tenant
  │     + PTE granted or N/A            → Ready to Schedule
  └── (stays Needs Info until resolved)

Awaiting Tenant
  ├── tenant submits scheduling page    → Ready to Schedule (date/window pre-filled)
  ├── 48h no response                  → Dispatcher alert (status unchanged)
  └── link expires, no response        → Needs Info (Dispatcher must phone tenant)

Ready to Schedule
  └── Dispatcher assigns tech + date + window → Scheduled

Scheduled
  ├── APT internal reschedule (new date/window, no tenant re-coordination)
  │     → Scheduled (field update only, no state change; new 24h reminder fires)
  ├── Reschedule requires new tenant coordination
  │     → Awaiting Tenant (new scheduling link sent)
  └── Tech ClockIn event               → In Progress

In Progress
  └── Tech attestation submitted        → Complete

Complete
  └── 21 days elapsed                  → removed from live queue (automatic)
```

---

## `Needs Info` — Sub-Labels and Suggested Actions

`missingFields: string[]` stored on the job record. UI renders a specific sub-label and a "Request Info" action button.

| Missing fields | Sub-label | Suggested action |
|---------------|-----------|-----------------|
| `propertyAddress` | Missing: property | Email submitting RM |
| `tenantPhone`, `tenantEmail` | Missing: tenant contact | Email RM to obtain tenant info |
| `description` | Missing: work description | Email submitting RM |
| `accessInfo` | Missing: access info | Check property DB; email RM if not found |

Dispatcher clicks "Request Info" → CC opens pre-filled email draft to the correct recipient. Dispatcher reviews and sends. CC does NOT auto-send to RMs/PMs — business relationship, requires human in the loop.

---

## `Awaiting Tenant` — Scheduling Link Flow

CC sends one SMS + one email to tenant at intake when PTE is not granted.

Message includes a secure single-use scheduling link (`/schedule/[token]`, expires 7 days). The page presents:
- Next 7 business days as date options
- Three arrival windows: Morning (8am–12pm), Afternoon (12pm–4pm), Late Afternoon (2pm–6pm)
- No real-time tech availability shown — parallel capacity (~30 techs) makes this unnecessary

On tenant submission:
- `tenantProposedDate` + `tenantProposedWindow` written to job record
- Status advances to `Ready to Schedule`
- Dispatcher sees proposed date/window pre-filled

After Dispatcher assigns tech and confirms:
- CC sends tenant confirmation with arrival window
- CC sends tenant 24h reminder before arrival

48h no-response → Dispatcher alert via Discord `#work-orders`. Dispatcher phones tenant, manually advances status.

---

## Rescheduling (from `Scheduled`)

**Internal reschedule** (APT picks new time, tenant already gave PTE):
- Dispatcher updates `scheduledDate`, `scheduledWindow`, optionally `assignedTech`
- Status stays `Scheduled` — field update only
- New 24h reminder fires to tenant for updated date

**Tenant re-coordination required** (tenant unavailable at new time):
- Status transitions `Scheduled → Awaiting Tenant`
- New scheduling link sent to tenant
- Job re-enters coordination flow

---

## Hard Gates (enforced by `JobStateService` — ADR-010)

| Transition event | Valid from state | Error if called otherwise |
|-----------------|-----------------|--------------------------|
| `ClockIn` | `Scheduled` only | `INVALID_TRANSITION` |
| `Complete` (attestation) | `In Progress` only | `INVALID_TRANSITION` |
| `Schedule` (assign tech + date) | `Ready to Schedule` only | `INVALID_TRANSITION` |
| `Advance` (fill missing fields) | `Needs Info` only | `INVALID_TRANSITION` |

No route, no tech app, no n8n workflow can bypass these gates. `JobStateService` is the only entry point.

---

## Auto-Transitions at Intake (CC-owned, no human sets initial status)

```typescript
// Pseudo-logic only — implementation in domain/job/job-state.ts
if (requiredFieldsMissing(parsedWO)) {
  initialStatus = 'Needs Info'
} else if (parsedWO.pte === 'not_granted' && parsedWO.woType === 'maintenance') {
  initialStatus = 'Awaiting Tenant'
  fireSchedulingOutreach(job)   // SMS + email via n8n EventBus
} else {
  initialStatus = 'Ready to Schedule'
}
```

---

## What This Replaces

| Old state | New equivalent |
|-----------|---------------|
| `Needs Review` | Removed — CC auto-evaluates at intake |
| `Ready to Schedule` | `Ready to Schedule` (narrower: no human review step) |
| `PTE Required` | `Awaiting Tenant` (includes auto-outreach + scheduling link) |
| `Awaiting Approval` | Merged into `Awaiting Tenant` |
| `Scheduled` | `Scheduled` (adds reschedule paths + 24h reminder) |
| `In Progress` | `In Progress` (unchanged) |
| `Complete` | `Complete` (21-day auto-queue-removal replaces `Archived`) |
| `Archived` | Removed as visible status — automatic at 21 days |

---

## Schema Impact (new columns on `jobs` table)

| Column | Type | Purpose |
|--------|------|---------|
| `woType` | `enum('maintenance','turnover','inspection')` | Default `maintenance` |
| `missingFields` | `text[]` | Populated at intake; cleared when resolved |
| `tenantProposedDate` | `date \| null` | Set when tenant submits scheduling page |
| `tenantProposedWindow` | `enum('morning','afternoon','late_afternoon') \| null` | Set same time |
| `schedulingToken` | `uuid \| null` | Single-use token for scheduling link |
| `schedulingTokenExpiresAt` | `timestamp \| null` | 7 days from issue |
| `scheduledWindow` | `enum('morning','afternoon','late_afternoon') \| null` | Replaces exact `scheduledTime` |

Existing `pteGranted` values normalize to `'Yes' | 'No' | 'Not Required'`.
Existing `status` string values update to new 6-state set. **Requires a data migration.**

---

## Consequences

**Positive:**
- Every status tells Dispatch exactly what action is required — no ambiguity
- CC automates both bottlenecks (DB auto-fill for missing info; auto SMS + email for PTE)
- Sub-labels + suggested actions make dispatch "color by numbers"
- Arrival window (not exact time) is realistic for field ops scheduling
- `JobStateService` gates make illegal state corruption impossible at the API layer

**Negative / Constraints:**
- Schema migration required before any Phase 17 code ships
- Public scheduling page (`/schedule/[token]`) is a new route with its own auth model (token-based, no login)
- 48h no-response alert requires a new n8n sentinel workflow
- All hardcoded status strings in the codebase must be updated to match new 6-state set
- `Archived` filter in any reporting query must be removed or replaced
