# Node Description Batch 167 of 412

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

- "archive_claw_army_phase1_spec_what_comes_next_phase_2": "WHAT COMES NEXT (Phase 2)" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L503 | neighbors=[Authored: April 26, 2026]
- "archive_claw_army_phase1_spec_what_this_spec_covers": "WHAT THIS SPEC COVERS" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L8 | neighbors=[Authored: April 26, 2026]
- "archive_claw_army_phase1_spec_zero_infrastructure_cost_no_railway_no_containers_ships_today": "Zero infrastructure cost. No Railway. No containers. Ships today." | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L3 | neighbors=[CLAW_ARMY_PHASE1_SPEC.md]
- "archive_playground_context_apt_central_command_chatplayground_context": "APT CENTRAL COMMAND — CHATPLAYGROUND CONTEXT" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L1 | neighbors=[PLAYGROUND_CONTEXT.md]
- "archive_playground_context_brandon_decisions_required_before_spec": "Brandon Decisions Required Before Spec" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L196 | neighbors=[CURRENT ROADMAP (prioritized)]
- "archive_playground_context_design_standards_every_spec_must_reference_these": "DESIGN STANDARDS (every spec must reference these)" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L70 | neighbors=[Last updated: Session 49 (May 6, 2026)]
- "archive_playground_context_how_to_draft_a_spec": "HOW TO DRAFT A SPEC" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L205 | neighbors=[Last updated: Session 49 (May 6, 2026)]
- "archive_playground_context_key_constraints_include_these_in_every_spec": "KEY CONSTRAINTS (include these in every spec)" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L89 | neighbors=[Last updated: Session 49 (May 6, 2026)]
- "archive_playground_context_paste_this_entire_document_as_your_system_context_at_the_start_of_any_pg_session": "Paste this entire document as your system context at the start of any PG sessio…" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L2 | neighbors=[PLAYGROUND_CONTEXT.md]
- "archive_playground_context_phase_4_gate_hard_blocker_before_first_non_apt_tenant": "Phase 4 Gate (hard blocker before first non-APT tenant)" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L193 | neighbors=[CURRENT ROADMAP (prioritized)]
- "archive_playground_context_production_status": "PRODUCTION STATUS" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L130 | neighbors=[CURRENT ROADMAP (prioritized)]
- "archive_playground_context_tech_stack": "TECH STACK" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L48 | neighbors=[Last updated: Session 49 (May 6, 2026)]
- "archive_playground_context_the_9_point_spec_criteria": "THE 9-POINT SPEC CRITERIA" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L106 | neighbors=[Last updated: Session 49 (May 6, 2026)]
- "archive_playground_context_tier_1_session_50_sprint_one_ag_sprint_two_fixes_ui_redesign": "Tier 1 — Session 50 Sprint (ONE AG sprint — two fixes + UI redesign)" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L147 | neighbors=[CURRENT ROADMAP (prioritized)]
- "archive_playground_context_tier_2_next_2_3_sprints": "Tier 2 — Next 2-3 Sprints" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L175 | neighbors=[CURRENT ROADMAP (prioritized)]
- "archive_playground_context_tier_3_phase_3_active": "Tier 3 — Phase 3 Active" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L182 | neighbors=[CURRENT ROADMAP (prioritized)]
- "archive_playground_context_what_good_output_looks_like": "WHAT GOOD OUTPUT LOOKS LIKE" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L248 | neighbors=[Last updated: Session 49 (May 6, 2026)]
- "archive_playground_context_what_is_done_live_verified": "What Is Done (Live + Verified)" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L137 | neighbors=[CURRENT ROADMAP (prioritized)]
- "archive_playground_context_what_not_to_include_in_a_spec": "WHAT NOT TO INCLUDE IN A SPEC" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L271 | neighbors=[Last updated: Session 49 (May 6, 2026)]
- "archive_playground_context_what_this_system_is": "WHAT THIS SYSTEM IS" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L29 | neighbors=[Last updated: Session 49 (May 6, 2026)]
- "archive_playground_context_your_role_in_this_workflow": "YOUR ROLE IN THIS WORKFLOW" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L7 | neighbors=[Last updated: Session 49 (May 6, 2026)]
- "archive_spec_p1_6_staging_environment_context": "CONTEXT" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L8 | neighbors=[Branch: feat/p1-6-staging-env]
- "archive_spec_p1_6_staging_environment_eliminates_the_production_is_the_test_environment_gap_stops_neon_branch_auto_provisioning": "Eliminates the \"production is the test environment\" gap. Stops Neon branch auto…" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L2 | neighbors=[SPEC_P1_6_STAGING_ENVIRONMENT.md]
- "archive_spec_p1_6_staging_environment_merge_gate": "MERGE GATE" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L195 | neighbors=[Branch: feat/p1-6-staging-env]
- "archive_spec_p1_6_staging_environment_owner_ag_setup_brandon_neon_vercel_dashboard_steps_reviewer_claude_code": "Owner: AG (setup) + Brandon (Neon/Vercel dashboard steps) | Reviewer: Claude Co…" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L3 | neighbors=[SPEC_P1_6_STAGING_ENVIRONMENT.md]
- "archive_spec_p1_6_staging_environment_responsibilities": "RESPONSIBILITIES" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L18 | neighbors=[Branch: feat/p1-6-staging-env]
- "archive_spec_p1_6_staging_environment_spec_p1_6_staging_environment_neon_preview_branch_vercel_preview_env": "SPEC: P1-6 — Staging Environment (Neon Preview Branch + Vercel Preview Env)" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L1 | neighbors=[SPEC_P1_6_STAGING_ENVIRONMENT.md]
- "archive_spec_p1_6_staging_environment_task_1_brandon_create_neon_preview_branch_dashboard_only": "Task 1 — Brandon: Create Neon `preview` branch (dashboard only)" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L33 | neighbors=[TASKS]
- "archive_spec_p1_6_staging_environment_task_10_separate_session_test_sprint": "Task 10 (separate session) — Test sprint" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L165 | neighbors=[TASKS]
- "archive_spec_p1_6_staging_environment_task_11_merge_after_clear_to_merge": "Task 11 — Merge after \"Clear to merge\"" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L189 | neighbors=[TASKS]
- "archive_spec_p1_6_staging_environment_task_2_brandon_disable_vercel_neon_auto_provisioning_dashboard_only": "Task 2 — Brandon: Disable Vercel–Neon auto-provisioning (dashboard only)" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L48 | neighbors=[TASKS]
- "archive_spec_p1_6_staging_environment_task_3_brandon_set_database_url_in_vercel_preview_environment_dashboard_only": "Task 3 — Brandon: Set DATABASE_URL in Vercel Preview environment (dashboard onl…" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L56 | neighbors=[TASKS]
- "archive_spec_p1_6_staging_environment_task_4_ag_verify_the_preview_deploy_connects_to_the_preview_neon_branch": "Task 4 — AG: Verify the preview deploy connects to the `preview` Neon branch" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L66 | neighbors=[TASKS]
- "archive_spec_p1_6_staging_environment_task_5_ag_seed_the_neon_preview_branch": "Task 5 — AG: Seed the Neon `preview` branch" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L85 | neighbors=[TASKS]
- "archive_spec_p1_6_staging_environment_task_6_ag_update_architecture_md": "Task 6 — AG: Update ARCHITECTURE.md" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L113 | neighbors=[TASKS]
- "archive_spec_p1_6_staging_environment_task_7_ag_update_professional_baseline_md": "Task 7 — AG: Update PROFESSIONAL_BASELINE.md" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L134 | neighbors=[TASKS]
- "archive_spec_p1_6_staging_environment_task_8_ag_add_env_preview_to_gitignore": "Task 8 — AG: Add `.env.preview` to `.gitignore`" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L146 | neighbors=[TASKS]
- "archive_spec_p1_6_staging_environment_task_9_tsc_diff": "Task 9 — tsc + diff" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L154 | neighbors=[TASKS]
- "archive_spec_p2b_job_transition_tests_closes_p2_7_extracts_inline_status_logic_from_route_ts_into_a_testable_pure_function": "Closes P2-7. Extracts inline status logic from route.ts into a testable pure fu…" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L2 | neighbors=[SPEC_P2B_JOB_TRANSITION_TESTS.md]
- "archive_spec_p2b_job_transition_tests_context": "CONTEXT" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L7 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-166.json

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
