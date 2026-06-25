# Node Description Batch 46 of 49

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

- "scripts_seed_priorities": "PRIORITIES" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L23 | neighbors=[seed.ts]
- "scripts_seed_rm_names": "RM_NAMES" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L33 | neighbors=[seed.ts]
- "scripts_seed_statuses": "STATUSES" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L18 | neighbors=[seed.ts]
- "scripts_seed_techs": "TECHS" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L34 | neighbors=[seed.ts]
- "scripts_seed_test_data_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/seed-test-data.ts:L17 | neighbors=[seed-test-data.ts]
- "scripts_test_gemini_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/test-gemini.ts:L6 | neighbors=[test-gemini.ts]
- "scripts_test_jobs_dal_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/test-jobs-dal.ts:L5 | neighbors=[test-jobs-dal.ts]
- "scripts_test_sheets_fetchsheet": "fetchSheet()" | kind=code-symbol | source=tech-pwa/scripts/test-sheets.js:L2 | neighbors=[test-sheets.js]
- "scripts_test_sprint_hashpin": "hashPin()" | kind=code-symbol | source=tech-pwa/scripts/test-sprint.ts:L10 | neighbors=[test-sprint.ts]
- "scripts_test_sprint_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/test-sprint.ts:L14 | neighbors=[test-sprint.ts]
- "scripts_test_sprint_request": "{ request }" | kind=code-symbol | source=tech-pwa/scripts/test-sprint.ts:L6 | neighbors=[test-sprint.ts]
- "scripts_test_webhook_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/test-webhook.ts:L4 | neighbors=[test-webhook.ts]
- "scripts_verify_hash_parity_nodehash": "nodeHash" | kind=code-symbol | source=scripts/verify-hash-parity.mjs:L3 | neighbors=[verify-hash-parity.mjs]
- "scripts_wipe_and_remigrate_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/wipe-and-remigrate.ts:L8 | neighbors=[wipe-and-remigrate.ts]
- "send_role_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/push/send-role/route.ts:L25 | neighbors=[route.ts]
- "send_role_route_sendroleschema": "SendRoleSchema" | kind=code-symbol | source=tech-pwa/src/app/api/push/send-role/route.ts:L17 | neighbors=[route.ts]
- "send_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/push/send/route.ts:L17 | neighbors=[route.ts]
- "sentinel_spec_architect_index_anthropic": "anthropic" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L25 | neighbors=[index.js]
- "sentinel_spec_architect_index_generatespec": "generateSpec()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L79 | neighbors=[index.js]
- "sentinel_spec_architect_index_server": "server" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L152 | neighbors=[index.js]
- "sentinel_stale_job_index_thresholds_ms": "THRESHOLDS_MS" | kind=code-symbol | source=railway/sentinel-stale-job/index.js:L27 | neighbors=[index.js]
- "sentinel_time_anomaly_index_anthropic": "anthropic" | kind=code-symbol | source=railway/sentinel-time-anomaly/index.js:L26 | neighbors=[index.js]
- "sentinel_wc_scanner_index_anthropic": "anthropic" | kind=code-symbol | source=railway/sentinel-wc-scanner/index.js:L26 | neighbors=[index.js]
- "sentinels_worker_allowed_origins": "ALLOWED_ORIGINS" | kind=code-symbol | source=Sentinels/worker.js:L4 | neighbors=[worker.js]
- "services_event_bus_buserror": "BusError" | kind=code-symbol | source=tech-pwa/src/lib/services/event-bus.ts:L18 | neighbors=[event-bus.ts]
- "side_effects_email_executor_emailsideeffectexecutor_execute": ".execute()" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/email-executor.ts:L6 | neighbors=[EmailSideEffectExecutor]
- "side_effects_email_executor_sideeffectexecutor": "SideEffectExecutor" | kind=code-symbol | neighbors=[EmailSideEffectExecutor]
- "side_effects_event_bus_executor_eventbussideeffectexecutor_execute": ".execute()" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/event-bus-executor.ts:L6 | neighbors=[EventBusSideEffectExecutor]
- "side_effects_event_bus_executor_sideeffectexecutor": "SideEffectExecutor" | kind=code-symbol | neighbors=[EventBusSideEffectExecutor]
- "side_effects_fake_executor_fakesideeffectexecutor_execute": ".execute()" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/fake-executor.ts:L8 | neighbors=[FakeSideEffectExecutor]
- "side_effects_fake_executor_sideeffectexecutor": "SideEffectExecutor" | kind=code-symbol | neighbors=[FakeSideEffectExecutor]
- "sign_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/attestation/sign/route.ts:L10 | neighbors=[route.ts]
- "src_auth_fetchstaffpermissions": "fetchStaffPermissions()" | kind=code-symbol | source=tech-pwa/src/auth.ts:L11 | neighbors=[auth.ts]
- "src_auth_handlers_auth_signin_signout": "{ handlers, auth, signIn, signOut }" | kind=code-symbol | source=tech-pwa/src/auth.ts:L34 | neighbors=[auth.ts]
- "src_index_allowed_origins": "ALLOWED_ORIGINS" | kind=code-symbol | source=workers/tech-pwa-proxy/src/index.js:L1 | neighbors=[index.js]
- "src_instrumentation_client": "instrumentation-client.ts" | kind=code-symbol | source=tech-pwa/src/instrumentation-client.ts:L1 | neighbors=[01bf641 Initial commit — clean history]
- "src_instrumentation_register": "register()" | kind=code-symbol | source=tech-pwa/src/instrumentation.ts:L3 | neighbors=[instrumentation.ts]
- "src_proxy_config": "config" | kind=code-symbol | source=tech-pwa/src/proxy.ts:L22 | neighbors=[proxy.ts]
- "src_proxy_proxy": "proxy()" | kind=code-symbol | source=tech-pwa/src/proxy.ts:L4 | neighbors=[proxy.ts]
- "start_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/shift/start/route.ts:L10 | neighbors=[route.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-045.json

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
