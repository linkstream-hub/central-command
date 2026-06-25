# Node Description Batch 55 of 412

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

- "lib_schema_newcontactqueue": "newContactQueue" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L104 | neighbors=[actions.ts, intake-processor.ts, schema.ts, migrate-from-csv.ts]
- "lib_schema_pushsubscriptions": "pushSubscriptions" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L161 | neighbors=[route.ts, schema.ts, route.ts, route.ts]
- "lib_syncqueue_dequeueevent": "dequeueEvent()" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L53 | neighbors=[syncQueue.ts, getQueue(), saveQueue(), flushQueue()]
- "lib_syncqueue_enqueueevent": "enqueueEvent()" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L34 | neighbors=[syncQueue.ts, apiCall(), getQueue(), saveQueue()]
- "lib_syncqueue_flushqueue": "flushQueue()" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L59 | neighbors=[syncQueue.ts, dequeueEvent(), getQueue(), getSession()]
- "lib_syncqueue_getqueue": "getQueue()" | kind=code-symbol | source=tech-pwa/src/lib/syncQueue.ts:L20 | neighbors=[syncQueue.ts, dequeueEvent(), enqueueEvent(), flushQueue()]
- "lib_tech_session_setshiftsession": "setShiftSession()" | kind=code-symbol | source=tech-pwa/src/lib/tech-session.ts:L33 | neighbors=[ClockedInBar.tsx, page.tsx, tech-session.ts, updateShiftBreak()]
- "modes_all_all_mode_auto_select_all_gray_areas_discuss_interactively": "--all mode — auto-select ALL gray areas, discuss interactively" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/all.md:L1 | neighbors=[all.md, Combination rules, Effect, Why this mode exists]
- "modes_analyze_analyze_mode_trade_off_tables_before_each_question": "--analyze mode — trade-off tables before each question" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/analyze.md:L1 | neighbors=[analyze.md, Effect, Example, Sourcing the analysis]
- "modes_auto_auto_mode_fully_autonomous_discuss_phase": "--auto mode — fully autonomous discuss-phase" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/auto.md:L1 | neighbors=[auto.md, Combination rules, CRITICAL — Auto-mode pass cap, Effect across steps]
- "paga_compliance": "PAGA Compliance" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md | neighbors=[Compliance / PAGA Domain, AB 2288, Ferra Doctrine, LC 226 (Itemized Wage Statement)]
- "plankton_code_quality_skill_pairing_with_ecc": "Pairing with ECC" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L112 | neighbors=[Avoiding Hook Conflicts, Complementary, Not Overlapping, Recommended Combination, Plankton Code Quality Skill]
- "plankton_code_quality_skill_setup": "Setup" | kind=entity | source=.github/skills/ecc/plankton-code-quality/SKILL.md:L71 | neighbors=[Plankton Code Quality Skill, Language-Specific Dependencies, Per-Project Integration, Quick Start]
- "planning_continue_here_blocking_constraints_read_before_anything_else": "BLOCKING CONSTRAINTS — Read Before Anything Else" | kind=entity | source=.planning/.continue-here.md:L9 | neighbors=[.continue-here.md, Infrastructure State, Key Technical Facts for Phase 28 Execut…, Required Reading]
- "planning_project_requirements": "Requirements" | kind=entity | source=.planning/PROJECT.md:L24 | neighbors=[APT Central Command (CC2.0 → CC3.0), Active, Out of Scope, Validated]
- "references_ai_frameworks_decision_dimensions": "Decision Dimensions" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ai-frameworks.md:L129 | neighbors=[AI Framework Decision Matrix, By Model Commitment, By System Type, By Team Size and Stage]
- "references_artifact_types_gsd_artifact_types": "GSD Artifact Types" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/artifact-types.md:L1 | neighbors=[artifact-types.md, Core Artifacts, Extended Artifacts, Standing Reference Artifacts]
- "references_executor_examples_checkpoint_examples": "Checkpoint Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/executor-examples.md:L72 | neighbors=[Auth gate handling, Bad checkpoint placement, Good checkpoint placement, Executor Extended Examples]
- "references_executor_examples_executor_extended_examples": "Executor Extended Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/executor-examples.md:L1 | neighbors=[executor-examples.md, Checkpoint Examples, Deviation Rule Examples, Edge Case Decision Guide]
- "references_gates_gates_taxonomy": "Gates Taxonomy" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gates.md:L1 | neighbors=[gates.md, Gate Matrix, Gate Types, Implementing Gates]
- "references_git_integration_multi_repo_workspace_support_sub_repos": "Multi-Repo Workspace Support (sub_repos)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-integration.md:L259 | neighbors=[git-integration.md, Commit Routing, Configuration, How It Works]
- "references_model_profile_resolution_model_profile_resolution": "Model Profile Resolution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profile-resolution.md:L1 | neighbors=[model-profile-resolution.md, Lookup Table, Resolution Pattern, Usage]
- "references_model_profiles_per_phase_type_model_map_3023": "Per-Phase-Type Model Map (#3023)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L22 | neighbors=[Model Profiles, Phase-type → agent mapping, Resolution precedence (highest to lowes…, Why two layers above the profile?]
- "references_planner_human_verify_mode_planner_human_verification_mode": "Planner — Human Verification Mode" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-human-verify-mode.md:L1 | neighbors=[planner-human-verify-mode.md, Compatibility with other modes, The two modes, What is *not* affected]
- "references_planner_source_audit_multi_source_coverage_audit_format": "Multi-Source Coverage Audit Format" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-source-audit.md:L5 | neighbors=[Four Source Types, Handling MISSING Items, What is NOT a Gap, Planner Source Audit & Authority Limits]
- "references_planning_config_example_configurations": "Example Configurations" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planning-config.md:L390 | neighbors=[planning-config.md, Large Codebase -- 1M Context with Exten…, Minimal -- Solo Developer, Team Project with Branching]
- "references_sketch_tooling_components": "Components" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-tooling.md:L17 | neighbors=[Annotation Mode, Theme Switcher, Viewport Preview, Sketch Toolbar]
- "references_sketch_tooling_sketch_toolbar": "Sketch Toolbar" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/sketch-tooling.md:L1 | neighbors=[sketch-tooling.md, Components, Implementation, Styling]
- "references_tdd_gate_enforcement_rules": "Gate Enforcement Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/tdd.md:L251 | neighbors=[tdd.md, Executor Gate Validation, Fail-Fast Rules, Gate Definitions]
- "references_thinking_partner_integration_points": "Integration Points" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/thinking-partner.md:L31 | neighbors=[1. Discuss Phase — Tradeoff Deep-Dive, 2. Plan Phase — Architectural Decision …, 3. Explore — Approach Comparison (requi…, Thinking Partner Integration]
- "references_user_profiling_cross_project_consistency": "Cross-Project Consistency" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L655 | neighbors=[Assessment, Phase 3 Resolution, Reporting Splits, User Profiling: Detection Heuristics Re…]
- "references_user_profiling_thin_data_handling": "Thin Data Handling" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-profiling.md:L510 | neighbors=[Handling Insufficient Dimensions, Message Thresholds, Questionnaire Supplement, User Profiling: Detection Heuristics Re…]
- "references_user_story_template_user_story_template_mvp_mode": "User Story Template (MVP Mode)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/user-story-template.md:L1 | neighbors=[user-story-template.md, Canonical format, How it lands in PLAN.md, How it lands in ROADMAP.md]
- "references_verification_overrides_matching_rules": "Matching Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L63 | neighbors=[Ambiguity Resolution, Examples, Matching Algorithm, Verification Overrides]
- "references_verification_overrides_override_lifecycle": "Override Lifecycle" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L175 | neighbors=[At Milestone Completion, Cleanup, During Re-verification, Verification Overrides]
- "references_verify_mvp_mode_generated_uat_script_structure_under_mvp_mode": "Generated UAT script structure under MVP mode" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verify-mvp-mode.md:L22 | neighbors=[1. User-flow walk-through (always first…, 2. Technical checks (only if section 1 …, 3. Coverage check (always last, always …, Verify-Work — MVP Mode UAT Framing]
- "references_worktree_path_safety_worktree_path_safety": "Worktree Path Safety" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/worktree-path-safety.md:L1 | neighbors=[worktree-path-safety.md, Absolute-path guard — step 0b (#3099), cwd-drift sentinel — step 0a (#3097), Worktree branch check (run once at spaw…]
- "research_features_feature_landscape": "Feature Landscape" | kind=entity | source=.planning/research/FEATURES.md:L9 | neighbors=[Anti-Features (Commonly Requested, Ofte…, Differentiators (Competitive Advantage), Table Stakes (Users Expect These), Feature Research]
- "research_features_mvp_definition": "MVP Definition" | kind=entity | source=.planning/research/FEATURES.md:L108 | neighbors=[Feature Research, Add After Validation (v1.x), Future Consideration (v2+), Launch With (Neon cutover v1)]
- "research_project_stack": "STACK.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/STACK.md:L1 | neighbors=[Core, Dev dependencies, Stack Research Template, Supporting]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-054.json

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
