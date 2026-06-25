# Node Description Batch 44 of 49

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "lib_intake_schema_workorderschema": "workOrderSchema" | kind=code-symbol | source=tech-pwa/src/lib/intake-schema.ts:L3 | neighbors=[intake-schema.ts]
- "lib_job_mapper_neonjob": "NeonJob" | kind=code-symbol | source=tech-pwa/src/lib/job-mapper.ts:L5 | neighbors=[job-mapper.ts]
- "lib_job_transitions_emailtrigger": "EmailTrigger" | kind=code-symbol | source=tech-pwa/src/lib/job-transitions.ts:L47 | neighbors=[job-transitions.ts]
- "lib_job_transitions_transitioncontext": "TransitionContext" | kind=code-symbol | source=tech-pwa/src/lib/job-transitions.ts:L3 | neighbors=[job-transitions.ts]
- "lib_location_calculatedistance": "calculateDistance()" | kind=code-symbol | source=tech-pwa/src/lib/location.ts:L39 | neighbors=[location.ts]
- "lib_location_coords": "Coords" | kind=code-symbol | source=tech-pwa/src/lib/location.ts:L5 | neighbors=[location.ts]
- "lib_permissions_module_routes": "MODULE_ROUTES" | kind=code-symbol | source=tech-pwa/src/lib/permissions.ts:L12 | neighbors=[permissions.ts]
- "lib_ratelimit_ratelimitresult": "RateLimitResult" | kind=code-symbol | source=tech-pwa/src/lib/rateLimit.ts:L4 | neighbors=[rateLimit.ts]
- "lib_sandbox_store_sandboxdata": "SandboxData" | kind=code-symbol | source=tech-pwa/src/lib/sandbox-store.ts:L12 | neighbors=[sandbox-store.ts]
- "lib_sandbox_store_store_path": "STORE_PATH" | kind=code-symbol | source=tech-pwa/src/lib/sandbox-store.ts:L10 | neighbors=[sandbox-store.ts]
- "lib_schema_accrualrules": "accrualRules" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L189 | neighbors=[schema.ts]
- "lib_schema_clients": "clients" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L56 | neighbors=[schema.ts]
- "lib_schema_dispatcherfeedback": "dispatcherFeedback" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L421 | neighbors=[schema.ts]
- "lib_schema_historicalassignments": "historicalAssignments" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L406 | neighbors=[schema.ts]
- "lib_schema_inventoryitems": "inventoryItems" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L268 | neighbors=[schema.ts]
- "lib_schema_inventorytransactions": "inventoryTransactions" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L286 | neighbors=[schema.ts]
- "lib_schema_invoicelineitems": "invoiceLineItems" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L474 | neighbors=[schema.ts]
- "lib_schema_invoices": "invoices" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L458 | neighbors=[schema.ts]
- "lib_schema_jobcosts": "jobCosts" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L446 | neighbors=[schema.ts]
- "lib_schema_orgs": "orgs" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L6 | neighbors=[schema.ts]
- "lib_schema_sentinellog": "sentinelLog" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L43 | neighbors=[schema.ts]
- "lib_schema_timeoffrequests": "timeOffRequests" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L175 | neighbors=[schema.ts]
- "lib_schema_tradedurationdefaults": "tradeDurationDefaults" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L432 | neighbors=[schema.ts]
- "lib_syncqueue_field_post_routes": "FIELD_POST_ROUTES" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L4 | neighbors=[syncQueue.ts]
- "lib_types_dispatchdataresponse": "DispatchDataResponse" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L181 | neighbors=[types.ts]
- "lib_types_timeoffbalance": "TimeOffBalance" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L94 | neighbors=[types.ts]
- "lib_types_timerecord": "TimeRecord" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L45 | neighbors=[types.ts]
- "lib_types_userrole": "UserRole" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L58 | neighbors=[types.ts]
- "lib_utils_cn": "cn()" | kind=code-symbol | source=tech-pwa/src/lib/utils.ts:L4 | neighbors=[utils.ts]
- "lib_wc_codes_wc_codes": "WC_CODES" | kind=code-symbol | source=tech-pwa/src/lib/wc-codes.ts:L13 | neighbors=[wc-codes.ts]
- "lib_wc_codes_wctier": "WCTier" | kind=code-symbol | source=tech-pwa/src/lib/wc-codes.ts:L7 | neighbors=[wc-codes.ts]
- "list_employees_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/list-employees/route.ts:L5 | neighbors=[route.ts]
- "live_page_tab_param_map": "TAB_PARAM_MAP" | kind=code-symbol | source=tech-pwa/src/app/live/page.tsx:L43 | neighbors=[page.tsx]
- "live_page_tabsync": "TabSync()" | kind=code-symbol | source=tech-pwa/src/app/live/page.tsx:L51 | neighbors=[page.tsx]
- "live_page_workspaceview": "WorkspaceView" | kind=code-symbol | source=tech-pwa/src/app/live/page.tsx:L62 | neighbors=[page.tsx]
- "live_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/field/live/route.ts:L7 | neighbors=[route.ts]
- "live_status_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/dashboard/live-status/route.ts:L10 | neighbors=[route.ts]
- "lock_and_send_route_locksendschema": "LockSendSchema" | kind=code-symbol | source=tech-pwa/src/app/api/schedule/lock-and-send/route.ts:L10 | neighbors=[route.ts]
- "lock_and_send_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/schedule/lock-and-send/route.ts:L14 | neighbors=[route.ts]
- "login_page_detectmode": "detectMode()" | kind=code-symbol | source=tech-pwa/src/app/login/page.tsx:L9 | neighbors=[page.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-043.json

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
