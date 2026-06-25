# Node Description Batch 140 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "api_reference_get_api_dashboard_compliance_status": "GET `/api/dashboard/compliance-status`" | kind=entity | source=docs/api/reference.md:L590 | neighbors=[Dashboard]
- "api_reference_get_api_dashboard_live_status": "GET `/api/dashboard/live-status`" | kind=entity | source=docs/api/reference.md:L586 | neighbors=[Dashboard]
- "api_reference_get_api_field_compliance": "GET `/api/field/compliance`" | kind=entity | source=docs/api/reference.md:L465 | neighbors=[Field — Internal]
- "api_reference_get_api_field_hours": "GET `/api/field/hours`" | kind=entity | source=docs/api/reference.md:L426 | neighbors=[Field — Shifts]
- "api_reference_get_api_field_jobs": "GET `/api/field/jobs`" | kind=entity | source=docs/api/reference.md:L218 | neighbors=[Field — Jobs]
- "api_reference_get_api_field_live": "GET `/api/field/live`" | kind=entity | source=docs/api/reference.md:L441 | neighbors=[Field — Internal]
- "api_reference_get_api_health": "GET `/api/health`" | kind=entity | source=docs/api/reference.md:L1035 | neighbors=[Utility]
- "api_reference_get_api_job_comments_jobid": "GET `/api/job-comments/[jobId]`" | kind=entity | source=docs/api/reference.md:L768 | neighbors=[Job Comments]
- "api_reference_get_api_jobs": "GET `/api/jobs`" | kind=entity | source=docs/api/reference.md:L495 | neighbors=[Jobs (Office/Staff)]
- "api_reference_get_api_jobs_history": "GET `/api/jobs/history`" | kind=entity | source=docs/api/reference.md:L563 | neighbors=[Jobs (Office/Staff)]
- "api_reference_get_api_jobs_jobid": "GET `/api/jobs/[jobId]`" | kind=entity | source=docs/api/reference.md:L530 | neighbors=[Jobs (Office/Staff)]
- "api_reference_get_api_notifications": "GET `/api/notifications`" | kind=entity | source=docs/api/reference.md:L810 | neighbors=[Notifications]
- "api_reference_get_api_properties": "GET `/api/properties`" | kind=entity | source=docs/api/reference.md:L969 | neighbors=[Properties]
- "api_reference_get_api_schedule_today": "GET `/api/schedule/today`" | kind=entity | source=docs/api/reference.md:L634 | neighbors=[Schedule]
- "api_reference_get_api_techs": "GET `/api/techs`" | kind=entity | source=docs/api/reference.md:L598 | neighbors=[Techs]
- "api_reference_get_api_weather": "GET `/api/weather`" | kind=entity | source=docs/api/reference.md:L1022 | neighbors=[Utility]
- "api_reference_internal_api_key_dual_auth": "Internal API Key (Dual Auth)" | kind=entity | source=docs/api/reference.md:L42 | neighbors=[Authentication]
- "api_reference_patch_api_comms_jobid": "PATCH `/api/comms/[jobId]`" | kind=entity | source=docs/api/reference.md:L721 | neighbors=[Comms]
- "api_reference_patch_api_jobs_jobid": "PATCH `/api/jobs/[jobId]`" | kind=entity | source=docs/api/reference.md:L541 | neighbors=[Jobs (Office/Staff)]
- "api_reference_post_api_admin_archive_stale": "POST `/api/admin/archive-stale`" | kind=entity | source=docs/api/reference.md:L872 | neighbors=[Admin]
- "api_reference_post_api_comms_inbound": "POST `/api/comms/inbound`" | kind=entity | source=docs/api/reference.md:L743 | neighbors=[Comms]
- "api_reference_post_api_comms_jobid": "POST `/api/comms/[jobId]`" | kind=entity | source=docs/api/reference.md:L703 | neighbors=[Comms]
- "api_reference_post_api_field_attestation_sign": "POST `/api/field/attestation/sign`" | kind=entity | source=docs/api/reference.md:L405 | neighbors=[Field — Shifts]
- "api_reference_post_api_field_auth_change_pin": "POST `/api/field/auth/change-pin`" | kind=entity | source=docs/api/reference.md:L200 | neighbors=[Field Auth]
- "api_reference_post_api_field_auth_login": "POST `/api/field/auth/login`" | kind=entity | source=docs/api/reference.md:L171 | neighbors=[Field Auth]
- "api_reference_post_api_field_break_end": "POST `/api/field/break/end`" | kind=entity | source=docs/api/reference.md:L389 | neighbors=[Field — Shifts]
- "api_reference_post_api_field_break_start": "POST `/api/field/break/start`" | kind=entity | source=docs/api/reference.md:L373 | neighbors=[Field — Shifts]
- "api_reference_post_api_field_clock_in": "POST `/api/field/clock-in`" | kind=entity | source=docs/api/reference.md:L246 | neighbors=[Field — Jobs]
- "api_reference_post_api_field_clock_out": "POST `/api/field/clock-out`" | kind=entity | source=docs/api/reference.md:L264 | neighbors=[Field — Jobs]
- "api_reference_post_api_field_job_complete": "POST `/api/field/job/complete`" | kind=entity | source=docs/api/reference.md:L286 | neighbors=[Field — Jobs]
- "api_reference_post_api_field_shift_end": "POST `/api/field/shift/end`" | kind=entity | source=docs/api/reference.md:L328 | neighbors=[Field — Shifts]
- "api_reference_post_api_field_shift_start": "POST `/api/field/shift/start`" | kind=entity | source=docs/api/reference.md:L306 | neighbors=[Field — Shifts]
- "api_reference_post_api_field_shift_status": "POST `/api/field/shift/status`" | kind=entity | source=docs/api/reference.md:L349 | neighbors=[Field — Shifts]
- "api_reference_post_api_gas": "POST `/api/gas`" | kind=entity | source=docs/api/reference.md:L932 | neighbors=[GAS Proxy]
- "api_reference_post_api_gas_validate_token": "POST `/api/gas/validate-token`" | kind=entity | source=docs/api/reference.md:L940 | neighbors=[GAS Proxy]
- "api_reference_post_api_intake_access_sync": "POST `/api/intake/access-sync`" | kind=entity | source=docs/api/reference.md:L995 | neighbors=[Intake]
- "api_reference_post_api_job_comments_jobid": "POST `/api/job-comments/[jobId]`" | kind=entity | source=docs/api/reference.md:L792 | neighbors=[Job Comments]
- "api_reference_post_api_jobs": "POST `/api/jobs`" | kind=entity | source=docs/api/reference.md:L517 | neighbors=[Jobs (Office/Staff)]
- "api_reference_post_api_push_send": "POST `/api/push/send`" | kind=entity | source=docs/api/reference.md:L851 | neighbors=[Push Notifications]
- "api_reference_post_api_push_subscribe": "POST `/api/push/subscribe`" | kind=entity | source=docs/api/reference.md:L840 | neighbors=[Push Notifications]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-139.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
