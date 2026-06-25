# Node Description Batch 40 of 49

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

- "e2e_cc_full_spec_flowresult": "FlowResult" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L57 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_fssync": "fsSync" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L25 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_getladate": "getLADate()" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L37 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_pathsync": "pathSync" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L27 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_record": "record()" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L67 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_results": "results" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L65 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_todayla": "todayLA" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L46 | neighbors=[cc-full.spec.ts]
- "e2e_cc_full_spec_tomorrowla": "tomorrowLA" | kind=code-symbol | source=tech-pwa/tests/e2e/cc-full.spec.ts:L47 | neighbors=[cc-full.spec.ts]
- "e2e_go_live_spec_flowresult": "FlowResult" | kind=code-symbol | source=tech-pwa/tests/e2e/go-live.spec.ts:L40 | neighbors=[go-live.spec.ts]
- "e2e_go_live_spec_fssync": "fsSync" | kind=code-symbol | source=tech-pwa/tests/e2e/go-live.spec.ts:L19 | neighbors=[go-live.spec.ts]
- "e2e_go_live_spec_log": "log()" | kind=code-symbol | source=tech-pwa/tests/e2e/go-live.spec.ts:L46 | neighbors=[go-live.spec.ts]
- "e2e_go_live_spec_pathsync": "pathSync" | kind=code-symbol | source=tech-pwa/tests/e2e/go-live.spec.ts:L21 | neighbors=[go-live.spec.ts]
- "e2e_intake_spec": "intake.spec.ts" | kind=code-symbol | source=tech-pwa/tests/e2e/intake.spec.ts:L1 | neighbors=[01bf641 Initial commit — clean history]
- "e2e_phase2_verification_spec_loginasadminlong": "loginAsAdminLong()" | kind=code-symbol | source=tech-pwa/tests/e2e/phase2-verification.spec.ts:L26 | neighbors=[phase2-verification.spec.ts]
- "end_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/shift/end/route.ts:L10 | neighbors=[route.ts]
- "event_bus_module": "EventBus Module" | kind=code-symbol | source=tech-pwa/src/lib/services/event-bus.ts | neighbors=[JobStateService]
- "exec_route_mock_jobs": "MOCK_JOBS" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L20 | neighbors=[route.ts]
- "exec_route_mock_tech": "MOCK_TECH" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L11 | neighbors=[route.ts]
- "feedback_page_admincontrolpanel": "AdminControlPanel()" | kind=code-symbol | source=tech-pwa/src/app/feedback/page.tsx:L307 | neighbors=[page.tsx]
- "feedback_page_feedbackpage": "FeedbackPage()" | kind=code-symbol | source=tech-pwa/src/app/feedback/page.tsx:L12 | neighbors=[page.tsx]
- "file_sprint_cc_val": "SPRINT_CC_FULL_VALIDATION.md" | kind=entity | source=specs/SPRINT_CC_FULL_VALIDATION.md | neighbors=[SPRINT_GO_LIVE_VALIDATION.md]
- "fixtures_seed_test_jobs": "TEST_JOBS" | kind=code-symbol | source=tech-pwa/tests/fixtures/seed.ts:L5 | neighbors=[seed.ts]
- "gas_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/gas/route.ts:L7 | neighbors=[route.ts]
- "gmail_route_jobschema": "jobSchema" | kind=code-symbol | source=tech-pwa/src/app/api/webhooks/n8n/gmail/route.ts:L12 | neighbors=[route.ts]
- "health_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/health/route.ts:L7 | neighbors=[route.ts]
- "history_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/history/route.ts:L8 | neighbors=[route.ts]
- "hooks_gsd_check_update_cachedir": "cacheDir" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L37 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_cachefile": "cacheFile" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L38 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_child": "child" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L54 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_cwd": "cwd" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L14 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_detectconfigdir": "detectConfigDir()" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L18 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L6 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_globalconfigdir": "globalConfigDir" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L32 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_globalversionfile": "globalVersionFile" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L42 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_homedir": "homeDir" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L13 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_os": "os" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L8 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L7 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_projectconfigdir": "projectConfigDir" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L33 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_projectversionfile": "projectVersionFile" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L41 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_spawn": "{ spawn }" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L9 | neighbors=[gsd-check-update.js]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-039.json

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
