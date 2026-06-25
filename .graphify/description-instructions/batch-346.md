# Node Description Batch 347 of 412

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

- "references_git_planning_commit_commit_via_cli": "Commit via CLI" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-planning-commit.md:L5 | neighbors=[Git Planning Commit]
- "references_git_planning_commit_when_to_skip": "When to Skip" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-planning-commit.md:L36 | neighbors=[Git Planning Commit]
- "references_github_and_merge": "github-and-merge.md" | kind=entity | source=.github/skills/graphify/references/github-and-merge.md:L1 | neighbors=[graphify reference: GitHub clone and cr…]
- "references_github_and_merge_step_0_clone_github_repo_s_only_if_a_github_url_was_given": "Step 0 - Clone GitHub repo(s) (only if a GitHub URL was given)" | kind=entity | source=.github/skills/graphify/references/github-and-merge.md:L5 | neighbors=[graphify reference: GitHub clone and cr…]
- "references_hooks": "hooks.md" | kind=entity | source=.github/skills/graphify/references/hooks.md:L1 | neighbors=[graphify reference: commit hook and nat…]
- "references_hooks_for_git_commit_hook": "For git commit hook" | kind=entity | source=.github/skills/graphify/references/hooks.md:L5 | neighbors=[graphify reference: commit hook and nat…]
- "references_hooks_for_native_claude_md_integration": "For native CLAUDE.md integration" | kind=entity | source=.github/skills/graphify/references/hooks.md:L21 | neighbors=[graphify reference: commit hook and nat…]
- "references_ios_scaffold": "ios-scaffold.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ios-scaffold.md:L1 | neighbors=[iOS App Scaffold Reference]
- "references_ios_scaffold_critical_rule_never_use_package_swift_as_the_primary_build_system_for_ios_apps": "Critical Rule: Never Use Package.swift as the Primary Build System for iOS Apps" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ios-scaffold.md:L7 | neighbors=[iOS App Scaffold Reference]
- "references_ios_scaffold_ios_deployment_target_compatibility": "iOS Deployment Target Compatibility" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ios-scaffold.md:L91 | neighbors=[iOS App Scaffold Reference]
- "references_ios_scaffold_step_1_install_xcodegen_if_not_present": "Step 1 — Install XcodeGen (if not present)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ios-scaffold.md:L27 | neighbors=[Required Pattern: XcodeGen]
- "references_ios_scaffold_step_2_create_project_yml": "Step 2 — Create `project.yml`" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ios-scaffold.md:L33 | neighbors=[Required Pattern: XcodeGen]
- "references_ios_scaffold_step_3_generate_the_xcodeproj": "Step 3 — Generate the .xcodeproj" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ios-scaffold.md:L65 | neighbors=[Required Pattern: XcodeGen]
- "references_ios_scaffold_step_4_standard_project_layout": "Step 4 — Standard project layout" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ios-scaffold.md:L73 | neighbors=[Required Pattern: XcodeGen]
- "references_ios_scaffold_verification": "Verification" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/ios-scaffold.md:L115 | neighbors=[iOS App Scaffold Reference]
- "references_model_profile_resolution": "model-profile-resolution.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profile-resolution.md:L1 | neighbors=[Model Profile Resolution]
- "references_model_profile_resolution_lookup_table": "Lookup Table" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profile-resolution.md:L13 | neighbors=[Model Profile Resolution]
- "references_model_profile_resolution_resolution_pattern": "Resolution Pattern" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profile-resolution.md:L5 | neighbors=[Model Profile Resolution]
- "references_model_profile_resolution_usage": "Usage" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profile-resolution.md:L33 | neighbors=[Model Profile Resolution]
- "references_model_profiles": "model-profiles.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L1 | neighbors=[Model Profiles]
- "references_model_profiles_design_rationale": "Design Rationale" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L227 | neighbors=[Model Profiles]
- "references_model_profiles_dynamic_routing_with_failure_tier_escalation_3024": "Dynamic Routing with Failure-Tier Escalation (#3024)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L136 | neighbors=[Model Profiles]
- "references_model_profiles_per_agent_overrides": "Per-Agent Overrides" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L200 | neighbors=[Model Profiles]
- "references_model_profiles_phase_type_agent_mapping": "Phase-type → agent mapping" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L43 | neighbors=[Per-Phase-Type Model Map (#3023)]
- "references_model_profiles_profile_definitions": "Profile Definitions" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L5 | neighbors=[Model Profiles]
- "references_model_profiles_profile_philosophy": "Profile Philosophy" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L69 | neighbors=[Model Profiles]
- "references_model_profiles_resolution_logic": "Resolution Logic" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L179 | neighbors=[Model Profiles]
- "references_model_profiles_resolution_precedence_highest_to_lowest": "Resolution precedence (highest to lowest)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L54 | neighbors=[Per-Phase-Type Model Map (#3023)]
- "references_model_profiles_switching_profiles": "Switching Profiles" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L216 | neighbors=[Model Profiles]
- "references_model_profiles_using_claude_code_with_non_anthropic_providers_openrouter_local": "Using Claude Code with Non-Anthropic Providers (OpenRouter, Local)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L119 | neighbors=[Model Profiles]
- "references_model_profiles_using_non_claude_runtimes_codex_opencode_gemini_cli_kilo": "Using Non-Claude Runtimes (Codex, OpenCode, Gemini CLI, Kilo)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L99 | neighbors=[Model Profiles]
- "references_model_profiles_why_two_layers_above_the_profile": "Why two layers above the profile?" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/model-profiles.md:L61 | neighbors=[Per-Phase-Type Model Map (#3023)]
- "references_mvp_concepts": "mvp-concepts.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/mvp-concepts.md:L1 | neighbors=[MVP Concepts — index]
- "references_mvp_concepts_concept_to_file_map": "Concept-to-file map" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/mvp-concepts.md:L18 | neighbors=[MVP Concepts — index]
- "references_mvp_concepts_file_map": "File map" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/mvp-concepts.md:L7 | neighbors=[MVP Concepts — index]
- "references_mvp_concepts_interactions_worth_knowing": "Interactions worth knowing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/mvp-concepts.md:L32 | neighbors=[MVP Concepts — index]
- "references_mvp_concepts_tests": "Tests" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/mvp-concepts.md:L39 | neighbors=[MVP Concepts — index]
- "references_phase_argument_parsing": "phase-argument-parsing.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/phase-argument-parsing.md:L1 | neighbors=[Phase Argument Parsing]
- "references_phase_argument_parsing_directory_lookup": "Directory Lookup" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/phase-argument-parsing.md:L55 | neighbors=[Phase Argument Parsing]
- "references_phase_argument_parsing_extraction": "Extraction" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/phase-argument-parsing.md:L5 | neighbors=[Phase Argument Parsing]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-346.json

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
