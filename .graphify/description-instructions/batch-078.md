# Node Description Batch 79 of 412

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

- "lib_permissions_defaultroute": "defaultRoute()" | kind=code-symbol | source=tech-pwa/src/lib/permissions.ts:L33 | neighbors=[RouteGuard.tsx, permissions.ts]
- "lib_ratelimit_getratelimiter": "getRateLimiter()" | kind=code-symbol | source=tech-pwa/src/lib/rateLimit.ts:L13 | neighbors=[rateLimit.ts, checkLoginRateLimit()]
- "lib_sandbox_store_getdefaultdata": "getDefaultData()" | kind=code-symbol | source=tech-pwa/src/lib/sandbox-store.ts:L20 | neighbors=[sandbox-store.ts, readStore()]
- "lib_schema_attestations": "attestations" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L317 | neighbors=[schema.ts, route.ts]
- "lib_schema_gmailsyncstate": "gmailSyncState" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L17 | neighbors=[schema.ts, route.ts]
- "lib_schema_tenantcontacts": "tenantContacts" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L90 | neighbors=[schema.ts, migrate-from-csv.ts]
- "lib_tech_session_clearshiftsession": "clearShiftSession()" | kind=code-symbol | source=tech-pwa/src/lib/tech-session.ts:L42 | neighbors=[ClockedInBar.tsx, tech-session.ts]
- "lib_tech_session_shiftsession": "ShiftSession" | kind=code-symbol | source=tech-pwa/src/lib/tech-session.ts:L8 | neighbors=[ClockedInBar.tsx, tech-session.ts]
- "lib_types_fieldstatusentry": "FieldStatusEntry" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L162 | neighbors=[types.ts, page.tsx]
- "lib_types_syncevent": "SyncEvent" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L70 | neighbors=[syncQueue.ts, types.ts]
- "lib_types_techrosterentry": "TechRosterEntry" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L150 | neighbors=[types.ts, page.tsx]
- "lib_types_techsession": "TechSession" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L60 | neighbors=[auth.ts, types.ts]
- "lib_types_threadattachment": "ThreadAttachment" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L131 | neighbors=[JobDetailModal.tsx, types.ts]
- "lib_types_threadmessage": "ThreadMessage" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L138 | neighbors=[JobDetailModal.tsx, types.ts]
- "lib_types_timecardapprovalqueueresponse": "TimecardApprovalQueueResponse" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L123 | neighbors=[dashboard-api.ts, types.ts]
- "lib_types_timecardrecord": "TimecardRecord" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L101 | neighbors=[page.tsx, types.ts]
- "lib_types_timeoffrequest": "TimeOffRequest" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L77 | neighbors=[page.tsx, types.ts]
- "login_route_generatesessiontoken": "generateSessionToken()" | kind=code-symbol | source=tech-pwa/src/app/api/field/auth/login/route.ts:L15 | neighbors=[route.ts, POST()]
- "login_route_hashpin": "hashPin()" | kind=code-symbol | source=tech-pwa/src/app/api/field/auth/login/route.ts:L11 | neighbors=[route.ts, POST()]
- "login_route_hashtoken": "hashToken()" | kind=code-symbol | source=tech-pwa/src/app/api/field/auth/login/route.ts:L19 | neighbors=[route.ts, POST()]
- "modes_default_default_mode_interactive_discuss_phase": "Default mode — interactive discuss-phase" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/default.md:L1 | neighbors=[default.md, discuss_areas (default, interactive)]
- "n8n": "n8n" | kind=entity | source=docs/ARCHITECTURE.md | neighbors=[Central Command 2.0, Communications Domain]
- "n8n_export_api_get": "api_get()" | kind=code-symbol | source=tools/n8n/export.py:L43 | neighbors=[export.py, main()]
- "n8n_export_slugify": "slugify()" | kind=code-symbol | source=tools/n8n/export.py:L36 | neighbors=[export.py, main()]
- "n8n_import_api_post": "api_post()" | kind=code-symbol | source=tools/n8n/import.py:L29 | neighbors=[import.py, main()]
- "n8n_import_main": "main()" | kind=code-symbol | source=tools/n8n/import.py:L54 | neighbors=[import.py, api_post()]
- "neon_postgres": "Neon Postgres" | kind=entity | source=docs/ARCHITECTURE.md | neighbors=[ADR-002 (Neon Postgres), Central Command 2.0]
- "nextauth_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/auth/[...nextauth]/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, auth.ts]
- "parse_route_extractfield": "extractField()" | kind=code-symbol | source=tech-pwa/src/app/api/parse/route.ts:L110 | neighbors=[route.ts, POST()]
- "parse_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/parse/route.ts:L9 | neighbors=[route.ts, extractField()]
- "planning_requirements_neon_cutover_requirements_complete_phase_12": "Neon Cutover Requirements — COMPLETE (Phase 12)" | kind=entity | source=.planning/REQUIREMENTS.md:L37 | neighbors=[Retired alias IDs (do not use in new pl…, Requirements: APT Central Command]
- "planning_roadmap_executed_phase_arc_directory_numbering_git_truth": "Executed Phase Arc (directory numbering — git truth)" | kind=entity | source=.planning/ROADMAP.md:L43 | neighbors=[Phase 19 blockers (carry-forward), ROADMAP — APT Central Command]
- "references_ai_evals_eval_tooling_guide": "Eval Tooling Guide" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-evals.md:L91 | neighbors=[AI Evaluation Reference, Tool Selection by System Type]
- "references_artifact_types_standing_reference_artifacts": "Standing Reference Artifacts" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L95 | neighbors=[GSD Artifact Types, METHODOLOGY.md]
- "references_common_bug_patterns_how_to_use_this_checklist": "How to Use This Checklist" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L93 | neighbors=[Common Bug Patterns, Symptom-to-Category Quick Map]
- "references_github_and_merge_graphify_reference_github_clone_and_cross_repo_merge": "graphify reference: GitHub clone and cross-repo merge" | kind=entity | source=.github/skills/graphify/references/github-and-merge.md:L1 | neighbors=[github-and-merge.md, Step 0 - Clone GitHub repo(s) (only if …]
- "references_transcribe_graphify_reference_transcribe_video_and_audio": "graphify reference: transcribe video and audio" | kind=entity | source=.github/skills/graphify/references/transcribe.md:L1 | neighbors=[transcribe.md, Step 2.5 - Transcribe video / audio fil…]
- "references_user_profiling_output_schema": "Output Schema" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L540 | neighbors=[Schema Notes, User Profiling: Detection Heuristics Re…]
- "references_verification_overrides_override_format": "Override Format" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L7 | neighbors=[Required Fields, Verification Overrides]
- "remember_archive_archive": "Archive" | kind=entity | source=.remember/archive.md:L1 | neighbors=[archive.md, Week of 2026-06-09]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-078.json

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
