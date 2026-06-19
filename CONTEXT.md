# APT Central Command

Dispatch management system for APT Maintenance Inc. Routes work orders intake → assignment → tech notification → completion.

## Language

### Work Order Domain

**Work Order (WO)**:
Maintenance request. Email intake → dispatch → field completion.
_Avoid_: ticket, job request, task _(use "job" only when referring to the `jobs` DB row)_

**Job**:
DB representation of WO in `jobs` table. Interchangeable with WO in conversation; prefer "Job" for DB state.
_Avoid_: ticket, record

**Lead**:
Prospective client or marketing inquiry (e.g., website contact form). Stored in `new_contact_queue` for triage. Different state machine from WO.
_Avoid_: work order, job

**WC Code**:
Workers' comp classification code on Job. Required for compliance. Job with `wc_code IS NULL` + non-terminal status → sentinel alert.
_Avoid_: work code, comp code

**Dispatch**:
Assign tech + scheduled date to Job, then notify tech. Dispatcher owns this.
_Avoid_: assignment (too narrow — dispatch includes scheduling + notification)

**Snapshot and Send**:
Bundles day's scheduled Jobs, fires webhook to notify techs. Sets `dispatch_sent_at` on each Job. Does NOT lock Jobs — snapshot is notification, not freeze.
_Avoid_: "Lock and Send" (misleading — no lock occurs)

**Dispatched**:
Job with `dispatch_sent_at` set — tech notified. Not complete or immutable.
_Avoid_: locked, sent, closed

**Stale Job**:
Non-terminal Job with no tech (`tech IS NULL`) past threshold. WO entered system, no ownership taken. "No interaction" signal rejected — invalidated by automated intake responses.
_Avoid_: old job, stuck job, overdue job

**Terminal Status**:
Job status indicating work done, no further action expected. Currently: `Complete` only. Jobs auto-drop from live queue 21 days after completion — no `Archived` status.
_Avoid_: closed, finished, resolved, archived (not a status)

**Event Bus**:
Single seam for publishing domain events. `EventBus.publish(event: WorkOrderEvent)` — inserts to `workflow_events` outbox, attempts immediate n8n delivery, falls back to poller. Callers never call n8n or Resend directly.
_Avoid_: "webhook call", "notification trigger", "email sender"

**Outbox**:
`workflow_events` Neon table storing pending domain events. Guarantees delivery survives n8n downtime. n8n poller processes pending rows every 5 minutes during business hours.
_Avoid_: "event queue", "message queue"

**Job State Machine Seam**:
Single entry point for all Work Order status transitions. Implemented as `JobStateService.transition(jobId, event)`. All routes that change job status call this seam — never set status directly.
_Avoid_: "transition logic", "status update", "FSM helper"

**WO Type (`woType`)**:
Field on every Job classifying the work category. `maintenance` (standard, may require PTE coordination), `turnover` (vacant unit, no tenant coordination needed), `inspection` (Sam Cooney type, no PTE needed). Shown as a tag in the dispatch UI. Never encoded as a job status.
_Avoid_: "job type", "work type"

**Missing Fields (`missingFields`)**:
Array stored on the Job record when status is `Needs Info`. Specifies exactly what CC couldn't auto-fill (e.g. `["tenantPhone", "tenantEmail"]`). UI renders a sub-label and a "Request Info" suggested action button from this array. Cleared when gaps are resolved.
_Avoid_: "incomplete", "validation errors"

**Arrival Window**:
The scheduled time range for a tech visit. One of: `morning` (8am–12pm), `afternoon` (12pm–4pm), `late_afternoon` (2pm–6pm). Used instead of exact times — realistic for field ops. What the tenant selects on the scheduling page, and what appears on the job card after scheduling.
_Avoid_: "appointment time", "exact time", "scheduled time"

**Scheduling Link**:
Secure single-use URL (`/schedule/[token]`) sent to tenant via SMS + email when a WO enters `Awaiting Tenant`. Tenant selects preferred date + arrival window. On submit, job advances to `Ready to Schedule` with tenant's proposed date/window pre-filled. Token expires in 7 days.
_Avoid_: "consent link", "PTE link", "approval link"

**Tenant Outreach**:
CC-automated SMS + email sent to tenant when `Awaiting Tenant` status is set at intake. Contains the Scheduling Link. Fires via n8n EventBus — callers never trigger SMS or email directly.
_Avoid_: "tenant notification", "PTE request email"

**Transition Event**:
Typed discriminated union describing what a caller intends: `UpdateFields`, `ClockIn`, `Complete`, `Advance`, `Schedule`. Passed to `JobStateService.transition()`. Callers name their intent — seam validates legality. `Archive` is no longer a valid event (removed with 6-state model).
_Avoid_: "status change request", "update payload"

**TransitionError**:
Typed error returned by `JobStateService.transition()` when a transition is illegal. Codes: `INVALID_TRANSITION`, `JOB_NOT_FOUND`, `MISSING_FIELDS`. Never thrown — returned as `Result<T, E>`. `PTE_REQUIRED` removed (PTE gate now encoded in state, not a runtime error).
_Avoid_: "validation error", "FSM error"

### Sentinel Domain

**Sentinel**:
Automated periodic check. Queries Neon for anomaly condition, alerts via PTOW Error Handler if found. Runs on schedule in n8n.
_Avoid_: monitor, watchdog, cron job

**Time Anomaly**:
Sentinel condition: `time_records` row with `clock_in` set, `clock_out` NULL, `clock_in` older than 12 hours. Tech clocked in but never out.
_Avoid_: open clock-in, hanging session

**WC Scanner**:
Sentinel condition: non-terminal Job with `wc_code IS NULL`. Job missing workers' comp classification.
_Avoid_: WC audit, compliance scan