# Node Description Batch 82 of 412

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

- "tech_pwa_src_app_api_field_jobs_route_ts_jobs_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/field/jobs/route.ts:L9 | neighbors=[route.ts, verifyFieldSession()]
- "tech_pwa_src_app_api_field_shift_end_route_ts_end_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/shift/end/route.ts:L10 | neighbors=[route.ts, verifyFieldSession()]
- "tech_pwa_src_app_api_field_shift_start_route_ts_start_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/shift/start/route.ts:L10 | neighbors=[route.ts, verifyFieldSession()]
- "tech_pwa_src_app_api_job_comments_jobid_route_ts_jobid_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/job-comments/[jobId]/route.ts:L11 | neighbors=[route.ts, sandboxAction()]
- "tech_pwa_src_app_api_job_comments_jobid_route_ts_jobid_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/job-comments/[jobId]/route.ts:L49 | neighbors=[route.ts, sandboxAction()]
- "tech_pwa_src_app_api_jobs_jobid_route_ts_jobid_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/route.ts:L12 | neighbors=[route.ts, mapNeonJobToJob()]
- "tech_pwa_src_app_api_jobs_route_ts_jobs_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/route.ts:L79 | neighbors=[route.ts, computeDashboardStats]
- "tech_pwa_src_app_api_time_records_sync_route_ts_sync_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/time-records/sync/route.ts:L9 | neighbors=[route.ts, evaluateCACompliance()]
- "templates_context_phase_context_template": "Phase Context Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/context.md:L1 | neighbors=[context.md, File Template]
- "templates_debug_debug_template": "Debug Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/DEBUG.md:L1 | neighbors=[DEBUG.md, File Template]
- "templates_discovery": "discovery.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discovery.md:L1 | neighbors=[Discovery Template, [Topic] Discovery]
- "templates_discovery_discovery_template": "Discovery Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discovery.md:L1 | neighbors=[discovery.md, File Template]
- "templates_milestone_archive": "milestone-archive.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/milestone-archive.md:L1 | neighbors=[Milestone Archive Template, Milestone v{{VERSION}}: {{MILESTONE_NAM…]
- "templates_milestone_archive_milestone_archive_template": "Milestone Archive Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/milestone-archive.md:L1 | neighbors=[milestone-archive.md, File Template]
- "templates_readme_planning_root_artifacts": "`.planning/` Root Artifacts" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/README.md:L9 | neighbors=[GSD Canonical Artifact Registry, Version-stamped artifacts (pattern: `vX…]
- "templates_research": "research.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research.md:L1 | neighbors=[or, Research Template]
- "templates_research_research_template": "Research Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research.md:L1 | neighbors=[research.md, File Template]
- "templates_spec_phase_spec_template": "Phase Spec Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/spec.md:L1 | neighbors=[spec.md, File Template]
- "templates_state_state_template": "State Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/state.md:L1 | neighbors=[state.md, File Template]
- "templates_summary_summary_template": "Summary Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/summary.md:L1 | neighbors=[summary.md, File Template]
- "templates_uat_uat_template": "UAT Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/UAT.md:L1 | neighbors=[UAT.md, File Template]
- "templates_user_setup_test_email_sending_replace_with_your_test_email": "Test email sending (replace with your test email)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L291 | neighbors=[user-setup.md, Guidelines]
- "templates_user_setup_user_setup_template": "User Setup Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L1 | neighbors=[user-setup.md, File Template]
- "tests_globalsetup_pgcode": "pgCode()" | kind=code-symbol | source=tech-pwa/tests/globalSetup.ts:L16 | neighbors=[globalSetup.ts, applySchemaIfNeeded()]
- "tests_globalsetup_pgmessage": "pgMessage()" | kind=code-symbol | source=tech-pwa/tests/globalSetup.ts:L21 | neighbors=[globalSetup.ts, applySchemaIfNeeded()]
- "tests_globalteardown_globalteardown": "globalTeardown()" | kind=code-symbol | source=tech-pwa/tests/globalTeardown.ts:L6 | neighbors=[globalTeardown.ts, teardownFixtures()]
- "types_next_auth_d_jwt": "JWT" | kind=code-symbol | source=tech-pwa/src/types/next-auth.d.ts:L11 | neighbors=[next-auth.d.ts, StaffPermissions]
- "types_next_auth_d_session": "Session" | kind=code-symbol | source=tech-pwa/src/types/next-auth.d.ts:L4 | neighbors=[next-auth.d.ts, StaffPermissions]
- "v1_0_cc_core_operational_roadmap_phase_1_queue_cleanup": "Phase 1 — Queue Cleanup" | kind=entity | source=.planning/milestones/v1.0-cc-core-operational/ROADMAP.md:L10 | neighbors=[Success Criteria, Roadmap: APT Central Command — v1.0 CC …]
- "v1_0_cc_core_operational_roadmap_phase_2_core_loop_verification": "Phase 2 — Core Loop Verification" | kind=entity | source=.planning/milestones/v1.0-cc-core-operational/ROADMAP.md:L23 | neighbors=[Success Criteria, Roadmap: APT Central Command — v1.0 CC …]
- "v1_0_cc_core_operational_roadmap_phase_3_gap_remediation": "Phase 3 — Gap Remediation" | kind=entity | source=.planning/milestones/v1.0-cc-core-operational/ROADMAP.md:L42 | neighbors=[Success Criteria, Roadmap: APT Central Command — v1.0 CC …]
- "validate_token_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/gas/validate-token/route.ts:L6 | neighbors=[route.ts, verifyFieldSession()]
- "week_route_buildweekdates": "buildWeekDates()" | kind=code-symbol | source=tech-pwa/src/app/api/schedule/week/route.ts:L10 | neighbors=[route.ts, GET()]
- "week_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/schedule/week/route.ts:L26 | neighbors=[route.ts, buildWeekDates()]
- "windows_desktop_e2e_skill_when_to_activate": "When to Activate" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L11 | neighbors=[When NOT to Use, Windows Desktop E2E Testing]
- "workflows_ingest_docs_ingest_docs_workflow": "Ingest Docs Workflow" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/ingest-docs.md:L1 | neighbors=[ingest-docs.md, Anti-Patterns]
- "workflows_list_workspaces": "list-workspaces.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/list-workspaces.md:L1 | neighbors=[1. Setup, 2. Display]
- "workflows_new_workspace_6_create_workspace": "6. Create Workspace" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/new-workspace.md:L134 | neighbors=[new-workspace.md, For each repo:]
- "workflows_sketch_research_the_target_stack": "Research the Target Stack" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/sketch.md:L169 | neighbors=[sketch.md, For Each Sketch:]
- "workflows_spike_build_each_spike_sequentially": "Build Each Spike Sequentially" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/spike.md:L238 | neighbors=[spike.md, For Each Spike:]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-081.json

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
