# Node Description Batch 343 of 412

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "references_artifact_types_plan_md_per_plan": "PLAN.md (per-plan)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L35 | neighbors=[Core Artifacts] | lang=en
- "references_artifact_types_requirements_md": "REQUIREMENTS.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L23 | neighbors=[Core Artifacts] | lang=en
- "references_artifact_types_roadmap_md": "ROADMAP.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L11 | neighbors=[Core Artifacts] | lang=en
- "references_artifact_types_sketch_readme_md_manifest_md_index_html_per_sketch": "Sketch README.md / MANIFEST.md / index.html (per-sketch)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L81 | neighbors=[Extended Artifacts] | lang=en
- "references_artifact_types_spike_md_design_md_per_spike": "SPIKE.md / DESIGN.md (per-spike)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L69 | neighbors=[Extended Artifacts] | lang=en
- "references_artifact_types_spike_readme_md_manifest_md_per_spike_via_gsd_spike": "Spike README.md / MANIFEST.md (per-spike, via /gsd:spike)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L75 | neighbors=[Extended Artifacts] | lang=en
- "references_artifact_types_state_md": "STATE.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L17 | neighbors=[Core Artifacts] | lang=en
- "references_artifact_types_summary_md_per_plan": "SUMMARY.md (per-plan)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L41 | neighbors=[Core Artifacts] | lang=en
- "references_artifact_types_user_profile_md": "USER-PROFILE.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L63 | neighbors=[Extended Artifacts] | lang=en
- "references_artifact_types_wrap_up_summary_md_per_wrap_up_session": "WRAP-UP-SUMMARY.md (per wrap-up session)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L87 | neighbors=[Extended Artifacts] | lang=it
- "references_autonomous_smart_discuss": "autonomous-smart-discuss.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/autonomous-smart-discuss.md:L1 | neighbors=[Smart Discuss — Autonomous Mode] | lang=en
- "references_autonomous_smart_discuss_sub_step_1_load_prior_context": "Sub-step 1: Load prior context" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/autonomous-smart-discuss.md:L15 | neighbors=[Smart Discuss — Autonomous Mode] | lang=en
- "references_autonomous_smart_discuss_sub_step_2_scout_codebase": "Sub-step 2: Scout Codebase" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/autonomous-smart-discuss.md:L62 | neighbors=[Smart Discuss — Autonomous Mode] | lang=en
- "references_autonomous_smart_discuss_sub_step_3_analyze_phase_and_generate_proposals": "Sub-step 3: Analyze Phase and Generate Proposals" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/autonomous-smart-discuss.md:L92 | neighbors=[Smart Discuss — Autonomous Mode] | lang=en
- "references_autonomous_smart_discuss_sub_step_4_present_proposals_per_area": "Sub-step 4: Present Proposals Per Area" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/autonomous-smart-discuss.md:L140 | neighbors=[Smart Discuss — Autonomous Mode] | lang=it
- "references_autonomous_smart_discuss_sub_step_5_write_context_md": "Sub-step 5: Write CONTEXT.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/autonomous-smart-discuss.md:L193 | neighbors=[Smart Discuss — Autonomous Mode] | lang=en
- "references_checkpoints_bad_asking_human_to_deploy_good_claude_automates": "❌ BAD: Asking human to deploy / ✅ GOOD: Claude automates" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L675 | neighbors=[Automatable Quick Reference] | lang=en
- "references_checkpoints_bad_asking_user_to_copy_values_between_services": "❌ BAD: Asking user to copy values between services" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L755 | neighbors=[Automatable Quick Reference] | lang=en
- "references_checkpoints_bad_asking_user_to_run_cli_commands": "❌ BAD: Asking user to run CLI commands" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L744 | neighbors=[Automatable Quick Reference] | lang=en
- "references_checkpoints_bad_asking_user_to_start_dev_server": "❌ BAD: Asking user to start dev server" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L641 | neighbors=[Automatable Quick Reference] | lang=en
- "references_checkpoints_bad_too_many_checkpoints_good_single_checkpoint": "❌ BAD: Too many checkpoints / ✅ GOOD: Single checkpoint" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L698 | neighbors=[Automatable Quick Reference] | lang=en
- "references_checkpoints_bad_vague_verification_good_specific_steps": "❌ BAD: Vague verification / ✅ GOOD: Specific steps" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L721 | neighbors=[Automatable Quick Reference] | lang=en
- "references_checkpoints_checkpoint_decision_9": "checkpoint:decision (9%)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L101 | neighbors=[checkpoints.md] | lang=en
- "references_checkpoints_checkpoint_human_action_1_rare": "checkpoint:human-action (1% - Rare)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L192 | neighbors=[checkpoints.md] | lang=en
- "references_checkpoints_checkpoint_human_verify_most_common_90": "checkpoint:human-verify (Most Common - 90%)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L17 | neighbors=[checkpoints.md] | lang=en
- "references_checkpoints_checkpoint_tdd_review_tdd_mode_only": "checkpoint:tdd-review (TDD Mode Only)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L769 | neighbors=[checkpoints.md] | lang=en
- "references_checkpoints_cli_installation_handling": "CLI Installation Handling" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L472 | neighbors=[checkpoints.md] | lang=en
- "references_checkpoints_dev_server_automation": "Dev Server Automation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L448 | neighbors=[checkpoints.md] | lang=en
- "references_checkpoints_environment_variable_automation": "Environment Variable Automation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L407 | neighbors=[checkpoints.md] | lang=en
- "references_checkpoints_example_1_database_setup_no_checkpoint_needed": "Example 1: Database Setup (No Checkpoint Needed)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L569 | neighbors=[Automatable Quick Reference] | lang=en
- "references_checkpoints_example_2_full_auth_flow_single_checkpoint_at_end": "Example 2: Full Auth Flow (Single checkpoint at end)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L592 | neighbors=[Automatable Quick Reference] | lang=en
- "references_checkpoints_good_claude_starts_server_user_visits": "✅ GOOD: Claude starts server, user visits" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L656 | neighbors=[Automatable Quick Reference] | lang=en
- "references_checkpoints_pre_checkpoint_automation_failures": "Pre-Checkpoint Automation Failures" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L487 | neighbors=[checkpoints.md] | lang=en
- "references_checkpoints_service_cli_reference": "Service CLI Reference" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/checkpoints.md:L391 | neighbors=[checkpoints.md] | lang=en
- "references_common_bug_patterns": "common-bug-patterns.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L1 | neighbors=[Common Bug Patterns] | lang=en
- "references_common_bug_patterns_async_timing": "Async / Timing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L21 | neighbors=[Common Bug Patterns] | lang=en
- "references_common_bug_patterns_data_shape_api_contract": "Data Shape / API Contract" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L60 | neighbors=[Common Bug Patterns] | lang=en
- "references_common_bug_patterns_environment_config": "Environment / Config" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L52 | neighbors=[Common Bug Patterns] | lang=en
- "references_common_bug_patterns_error_handling": "Error Handling" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L75 | neighbors=[Common Bug Patterns] | lang=en
- "references_common_bug_patterns_import_module": "Import / Module" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L37 | neighbors=[Common Bug Patterns] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-342.json

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
