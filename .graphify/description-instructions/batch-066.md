# Node Description Batch 67 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "jobid_route_derivestakeholder": "deriveStakeholder()" | kind=code-symbol | source=tech-pwa/src/app/api/comms/[jobId]/route.ts:L22 | neighbors=[route.ts, extractEmailAddress(), route.ts] | lang=en
- "jobs_page_techjobspage": "TechJobsPage()" | kind=code-symbol | source=tech-pwa/src/app/jobs/page.tsx:L41 | neighbors=[page.tsx, useTranslation(), getSession()] | lang=en
- "jobs_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/route.ts:L51 | neighbors=[route.ts, sendJobAssignedPush(), route.ts] | lang=en
- "jobs_route_sendjobassignedpush": "sendJobAssignedPush()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/route.ts:L20 | neighbors=[route.ts, POST(), route.ts] | lang=en
- "lib_auth_clearsession": "clearSession()" | kind=code-symbol | source=tech-pwa/src/lib/auth.ts:L27 | neighbors=[page.tsx, auth.ts, getSession()] | lang=en
- "lib_dashboard_api_approvetimecard": "approveTimecard()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L688 | neighbors=[page.tsx, dashboard-api.ts, dashboardRequest()] | lang=en
- "lib_dashboard_api_computestats": "computeStats()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L286 | neighbors=[dashboard-api.ts, dashboardRequest(), returnMockData()] | lang=en
- "lib_dashboard_api_disputetimecard": "disputeTimecard()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L692 | neighbors=[page.tsx, dashboard-api.ts, dashboardRequest()] | lang=en
- "lib_dashboard_api_gettimecardapprovalqueue": "getTimecardApprovalQueue()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L684 | neighbors=[page.tsx, dashboard-api.ts, dashboardRequest()] | lang=en
- "lib_dashboard_api_mapjob": "mapJob()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L228 | neighbors=[dashboard-api.ts, normalizeLegacyStatus(), normalizeName()] | lang=en
- "lib_dashboard_api_normalizename": "normalizeName()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L216 | neighbors=[dashboard-api.ts, mapJob(), mapTech()] | lang=en
- "lib_db_sql": "sql" | kind=code-symbol | source=tech-pwa/src/lib/db.ts:L5 | neighbors=[db.ts, GET(), main()] | lang=en
- "lib_detectlaphamform_detectlaphamform": "detectLaphamForm()" | kind=code-symbol | source=tech-pwa/src/lib/detectLaphamForm.ts:L52 | neighbors=[route.ts, detectLaphamForm.ts, detectLaphamForm.test.ts] | lang=en
- "lib_fieldschemas_breakendschema": "BreakEndSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L35 | neighbors=[route.ts, fieldSchemas.ts, route.ts] | lang=en
- "lib_fieldschemas_breakstartschema": "BreakStartSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L30 | neighbors=[fieldSchemas.ts, route.ts, route.ts] | lang=en
- "lib_fieldschemas_shiftendschema": "ShiftEndSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L51 | neighbors=[route.ts, fieldSchemas.ts, route.ts] | lang=en
- "lib_fieldschemas_shiftstartschema": "ShiftStartSchema" | kind=code-symbol | source=tech-pwa/src/lib/fieldSchemas.ts:L46 | neighbors=[fieldSchemas.ts, route.ts, route.ts] | lang=en
- "lib_gmail_client_cleanemailbody": "cleanEmailBody()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L64 | neighbors=[gmail-client.ts, getNewMessages(), getThreadByMessageId()] | lang=en
- "lib_gmail_client_extractemail": "extractEmail()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L26 | neighbors=[gmail-client.ts, getNewMessages(), getThreadByMessageId()] | lang=en
- "lib_gmail_client_getheader": "getHeader()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L21 | neighbors=[gmail-client.ts, getNewMessages(), getThreadByMessageId()] | lang=en
- "lib_intake_schema_intakeschema": "intakeSchema" | kind=code-symbol | source=tech-pwa/src/lib/intake-schema.ts:L30 | neighbors=[actions.ts, intake-schema.ts, intake-schema.test.ts] | lang=en
- "lib_location_getcurrentposition": "getCurrentPosition()" | kind=code-symbol | source=tech-pwa/src/lib/location.ts:L10 | neighbors=[page.tsx, location.ts, page.tsx] | lang=en
- "lib_permissions_hasaccess": "hasAccess()" | kind=code-symbol | source=tech-pwa/src/lib/permissions.ts:L25 | neighbors=[RouteGuard.tsx, permissions.ts, RouteGuard()] | lang=en
- "lib_sandbox_store_writestore": "writeStore()" | kind=code-symbol | source=tech-pwa/src/lib/sandbox-store.ts:L128 | neighbors=[sandbox-store.ts, readStore(), sandboxAction()] | lang=en
- "lib_schema_compliancealerts": "complianceAlerts" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L301 | neighbors=[schema.ts, route.ts, route.ts] | lang=en
- "lib_schema_jobcomments": "jobComments" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L377 | neighbors=[route.ts, schema.ts, route.ts] | lang=en
- "lib_schema_jobperformancehistory": "jobPerformanceHistory" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L391 | neighbors=[route.ts, schema.ts, route.test.ts] | lang=en
- "lib_schema_workflowevents": "workflowEvents" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L488 | neighbors=[schema.ts, event-bus.ts, event-bus.test.ts] | lang=en
- "lib_syncqueue_savequeue": "saveQueue()" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L29 | neighbors=[syncQueue.ts, dequeueEvent(), enqueueEvent()] | lang=en
- "lib_tech_session_updateshiftbreak": "updateShiftBreak()" | kind=code-symbol | source=tech-pwa/src/lib/tech-session.ts:L50 | neighbors=[tech-session.ts, getShiftSession(), setShiftSession()] | lang=en
- "lib_wc_codes_resolvewccode": "resolveWCCode()" | kind=code-symbol | source=tech-pwa/src/lib/wc-codes.ts:L53 | neighbors=[jobs.ts, wc-codes.ts, wc-codes.test.ts] | lang=en
- "modes_chain_chain_mode_interactive_discuss_then_auto_advance": "--chain mode — interactive discuss, then auto-advance" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/chain.md:L1 | neighbors=[chain.md, auto_advance step (executed by the pare…, Effect] | lang=en
- "n8n_export_main": "main()" | kind=code-symbol | source=tools/n8n/export.py:L59 | neighbors=[export.py, api_get(), slugify()] | lang=en
- "references_add_watch_graphify_reference_add_a_url_and_watch_a_folder": "graphify reference: add a URL and watch a folder" | kind=entity | source=.github/skills/graphify/references/add-watch.md:L1 | neighbors=[add-watch.md, For /graphify add, For --watch] | lang=pt
- "references_agent_contracts_key_handoff_contracts": "Key Handoff Contracts" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/agent-contracts.md:L44 | neighbors=[Agent Contracts, Executor -> Verifier (via SUMMARY.md), Planner -> Executor (via PLAN.md)] | lang=en
- "references_ai_evals_evaluation_dimensions": "Evaluation Dimensions" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L31 | neighbors=[AI Evaluation Reference, Pre-Deployment (Development Phase), Production Monitoring] | lang=en
- "references_continuation_format_pulling_context": "Pulling Context" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L183 | neighbors=[Continuation Format, For phases (from ROADMAP.md):, For plans (from ROADMAP.md):] | lang=en
- "references_hooks_graphify_reference_commit_hook_and_native_claude_md_integration": "graphify reference: commit hook and native CLAUDE.md integration" | kind=entity | source=.github/skills/graphify/references/hooks.md:L1 | neighbors=[hooks.md, For git commit hook, For native CLAUDE.md integration] | lang=en
- "references_planner_antipatterns_context_section_anti_patterns": "Context Section Anti-Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-antipatterns.md:L58 | neighbors=[Bad — Reflexive SUMMARY chaining, Good — Selective context, Planner Anti-Patterns and Specificity E…] | lang=en
- "references_planner_chunked_chunked_mode_return_formats": "Chunked Mode Return Formats" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-chunked.md:L1 | neighbors=[planner-chunked.md, Modes, Resume Behaviour] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-066.json

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
