# Node Description Batch 337 of 412

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

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
- "live_page_livepage": "LivePage()" | kind=code-symbol | source=tech-pwa/src/app/live/page.tsx:L46 | neighbors=[page.tsx]
- "live_page_tab_param_map": "TAB_PARAM_MAP" | kind=code-symbol | source=tech-pwa/src/app/live/page.tsx:L25 | neighbors=[page.tsx]
- "live_page_tabsync": "TabSync()" | kind=code-symbol | source=tech-pwa/src/app/live/page.tsx:L33 | neighbors=[page.tsx]
- "live_page_workspaceview": "WorkspaceView" | kind=code-symbol | source=tech-pwa/src/app/live/page.tsx:L44 | neighbors=[page.tsx]
- "live_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/field/live/route.ts:L7 | neighbors=[route.ts]
- "live_status_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/dashboard/live-status/route.ts:L10 | neighbors=[route.ts]
- "lock_and_send": "Lock and Send" | kind=entity | source=docs/CAPABILITIES_REGISTER.md | neighbors=[Robert (Dispatcher)]
- "lock_and_send_route_locksendschema": "LockSendSchema" | kind=code-symbol | source=tech-pwa/src/app/api/schedule/lock-and-send/route.ts:L10 | neighbors=[route.ts]
- "lock_and_send_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/schedule/lock-and-send/route.ts:L14 | neighbors=[route.ts]
- "login_page_detectmode": "detectMode()" | kind=code-symbol | source=tech-pwa/src/app/login/page.tsx:L9 | neighbors=[page.tsx]
- "login_page_loginpage": "LoginPage()" | kind=code-symbol | source=tech-pwa/src/app/login/page.tsx:L17 | neighbors=[page.tsx]
- "migrate_techs_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/migrate-techs/route.ts:L15 | neighbors=[route.ts]
- "migrate_techs_route_initial_techs": "INITIAL_TECHS" | kind=code-symbol | source=tech-pwa/src/app/api/migrate-techs/route.ts:L8 | neighbors=[route.ts]
- "modes_advisor": "advisor.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/advisor.md:L1 | neighbors=[Advisor mode — research-backed comparis…]
- "modes_advisor_activation": "Activation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/advisor.md:L9 | neighbors=[Advisor mode — research-backed comparis…]
- "modes_advisor_advisor_research_step": "advisor_research step" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/advisor.md:L83 | neighbors=[Advisor mode — research-backed comparis…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-336.json

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
