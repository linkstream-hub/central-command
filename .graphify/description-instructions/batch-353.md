# Node Description Batch 354 of 412

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

- "references_verification_overrides_frontmatter_score": "Frontmatter Score" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L124 | neighbors=[Verifier Behavior with Overrides]
- "references_verification_overrides_impact_on_overall_status": "Impact on Overall Status" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L118 | neighbors=[Verifier Behavior with Overrides]
- "references_verification_overrides_interactive_override_suggestion": "Interactive Override Suggestion" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L139 | neighbors=[Creating Overrides]
- "references_verification_overrides_matching_algorithm": "Matching Algorithm" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L67 | neighbors=[Matching Rules]
- "references_verification_overrides_output_format": "Output Format" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L104 | neighbors=[Verifier Behavior with Overrides]
- "references_verification_overrides_override_via_gsd_tools": "Override via gsd-tools" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L162 | neighbors=[Creating Overrides]
- "references_verification_overrides_required_fields": "Required Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L30 | neighbors=[Override Format]
- "references_verification_overrides_when_not_to_use": "When NOT to Use" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L53 | neighbors=[Verification Overrides]
- "references_verification_overrides_when_to_use": "When to Use" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-overrides.md:L41 | neighbors=[Verification Overrides]
- "references_verification_patterns": "verification-patterns.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L1 | neighbors=[Verification Patterns]
- "references_verification_patterns_api_route_checklist": "API Route Checklist" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L485 | neighbors=[Quick Verification Checklist]
- "references_verification_patterns_api_routes_next_js_app_router_express_etc": "API Routes (Next.js App Router / Express / etc.)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L118 | neighbors=[Verification Patterns]
- "references_verification_patterns_automated_verification_approach": "Automated Verification Approach" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L520 | neighbors=[Verification Patterns]
- "references_verification_patterns_component_checklist": "Component Checklist" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L475 | neighbors=[Quick Verification Checklist]
- "references_verification_patterns_custom_hooks_and_utilities": "Custom Hooks and Utilities" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L254 | neighbors=[Verification Patterns]
- "references_verification_patterns_database_schema_prisma_drizzle_sql": "Database Schema (Prisma / Drizzle / SQL)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L191 | neighbors=[Verification Patterns]
- "references_verification_patterns_environment_variables_and_configuration": "Environment Variables and Configuration" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L305 | neighbors=[Verification Patterns]
- "references_verification_patterns_hook_utility_checklist": "Hook/Utility Checklist" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L503 | neighbors=[Quick Verification Checklist]
- "references_verification_patterns_pattern_api_database": "Pattern: API → Database" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L380 | neighbors=[Wiring Verification Patterns]
- "references_verification_patterns_pattern_component_api": "Pattern: Component → API" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L353 | neighbors=[Wiring Verification Patterns]
- "references_verification_patterns_pattern_form_handler": "Pattern: Form → Handler" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L406 | neighbors=[Wiring Verification Patterns]
- "references_verification_patterns_pattern_state_render": "Pattern: State → Render" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L435 | neighbors=[Wiring Verification Patterns]
- "references_verification_patterns_pre_checkpoint_automation": "Pre-Checkpoint Automation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L599 | neighbors=[Verification Patterns]
- "references_verification_patterns_react_next_js_components": "React/Next.js Components" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L59 | neighbors=[Verification Patterns]
- "references_verification_patterns_schema_checklist": "Schema Checklist" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L495 | neighbors=[Quick Verification Checklist]
- "references_verification_patterns_universal_stub_patterns": "Universal Stub Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L19 | neighbors=[Verification Patterns]
- "references_verification_patterns_when_to_require_human_verification": "When to Require Human Verification" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L561 | neighbors=[Verification Patterns]
- "references_verification_patterns_wiring_checklist": "Wiring Checklist" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verification-patterns.md:L510 | neighbors=[Quick Verification Checklist]
- "references_verify_mvp_mode": "verify-mvp-mode.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verify-mvp-mode.md:L1 | neighbors=[Verify-Work — MVP Mode UAT Framing]
- "references_verify_mvp_mode_1_user_flow_walk_through_always_first_always_required": "1. User-flow walk-through (always first, always required)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verify-mvp-mode.md:L26 | neighbors=[Generated UAT script structure under MV…]
- "references_verify_mvp_mode_2_technical_checks_only_if_section_1_passes": "2. Technical checks (only if section 1 passes)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verify-mvp-mode.md:L40 | neighbors=[Generated UAT script structure under MV…]
- "references_verify_mvp_mode_3_coverage_check_always_last_always_required": "3. Coverage check (always last, always required)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verify-mvp-mode.md:L50 | neighbors=[Generated UAT script structure under MV…]
- "references_verify_mvp_mode_anti_patterns_to_reject_under_mvp_mode": "Anti-patterns to reject under MVP mode" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verify-mvp-mode.md:L58 | neighbors=[Verify-Work — MVP Mode UAT Framing]
- "references_verify_mvp_mode_compatibility_with_existing_verify_work_philosophy": "Compatibility with existing verify-work philosophy" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verify-mvp-mode.md:L64 | neighbors=[Verify-Work — MVP Mode UAT Framing]
- "references_verify_mvp_mode_core_rule": "Core rule" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verify-mvp-mode.md:L5 | neighbors=[Verify-Work — MVP Mode UAT Framing]
- "references_verify_mvp_mode_output_verification_md_changes_under_mvp_mode": "Output: VERIFICATION.md changes under MVP mode" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verify-mvp-mode.md:L68 | neighbors=[Verify-Work — MVP Mode UAT Framing]
- "references_verify_mvp_mode_when_this_framing_applies": "When this framing applies" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/verify-mvp-mode.md:L14 | neighbors=[Verify-Work — MVP Mode UAT Framing]
- "references_workstream_flag": "workstream-flag.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/workstream-flag.md:L1 | neighbors=[Workstream Flag (`--ws`)]
- "references_workstream_flag_cli_usage": "CLI Usage" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/workstream-flag.md:L93 | neighbors=[Workstream Flag (`--ws`)]
- "references_workstream_flag_directory_structure": "Directory Structure" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/workstream-flag.md:L71 | neighbors=[Workstream Flag (`--ws`)]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-353.json

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
