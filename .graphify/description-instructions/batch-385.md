# Node Description Batch 386 of 412

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

- "templates_phase_prompt_user_setup_external_services": "User Setup (External Services)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L513 | neighbors=[Phase Prompt Template] | lang=en
- "templates_planner_subagent_prompt": "planner-subagent-prompt.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/planner-subagent-prompt.md:L1 | neighbors=[Planner Subagent Prompt Template] | lang=en
- "templates_planner_subagent_prompt_continuation": "Continuation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/planner-subagent-prompt.md:L91 | neighbors=[Planner Subagent Prompt Template] | lang=en
- "templates_planner_subagent_prompt_placeholders": "Placeholders" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/planner-subagent-prompt.md:L58 | neighbors=[Planner Subagent Prompt Template] | lang=en
- "templates_planner_subagent_prompt_template": "Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/planner-subagent-prompt.md:L7 | neighbors=[Planner Subagent Prompt Template] | lang=en
- "templates_planner_subagent_prompt_usage": "Usage" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/planner-subagent-prompt.md:L69 | neighbors=[Planner Subagent Prompt Template] | lang=en
- "templates_project": "project.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/project.md:L1 | neighbors=[PROJECT.md Template] | lang=en
- "templates_project_project_md_template": "PROJECT.md Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/project.md:L1 | neighbors=[project.md] | lang=en
- "templates_readme": "README.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/README.md:L1 | neighbors=[GSD Canonical Artifact Registry] | lang=en
- "templates_readme_adding_a_new_canonical_artifact": "Adding a New Canonical Artifact" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/README.md:L71 | neighbors=[GSD Canonical Artifact Registry] | lang=pt
- "templates_readme_milestone_archive_planning_milestones": "Milestone Archive (`.planning/milestones/`)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/README.md:L58 | neighbors=[GSD Canonical Artifact Registry] | lang=en
- "templates_readme_phase_subdirectory_artifacts_planning_phases_nn_name": "Phase Subdirectory Artifacts (`.planning/phases/NN-name/`)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/README.md:L37 | neighbors=[GSD Canonical Artifact Registry] | lang=en
- "templates_readme_version_stamped_artifacts_pattern_vx_y_md": "Version-stamped artifacts (pattern: `vX.Y-*.md`)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/README.md:L27 | neighbors=[`.planning/` Root Artifacts] | lang=en
- "templates_requirements": "requirements.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/requirements.md:L1 | neighbors=[Requirements Template] | lang=en
- "templates_requirements_requirements_template": "Requirements Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/requirements.md:L1 | neighbors=[requirements.md] | lang=en
- "templates_research_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research.md:L9 | neighbors=[Research Template] | lang=en
- "templates_research_good_example": "Good Example" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research.md:L275 | neighbors=[or] | lang=en
- "templates_research_guidelines": "Guidelines" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research.md:L563 | neighbors=[or] | lang=en
- "templates_retrospective": "retrospective.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/retrospective.md:L1 | neighbors=[Project Retrospective] | lang=en
- "templates_retrospective_cost_observations": "Cost Observations" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/retrospective.md:L30 | neighbors=[Milestone: v{version} — {name}] | lang=en
- "templates_retrospective_cumulative_quality": "Cumulative Quality" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/retrospective.md:L45 | neighbors=[Cross-Milestone Trends] | lang=en
- "templates_retrospective_key_lessons": "Key Lessons" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/retrospective.md:L26 | neighbors=[Milestone: v{version} — {name}] | lang=en
- "templates_retrospective_patterns_established": "Patterns Established" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/retrospective.md:L23 | neighbors=[Milestone: v{version} — {name}] | lang=en
- "templates_retrospective_process_evolution": "Process Evolution" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/retrospective.md:L39 | neighbors=[Cross-Milestone Trends] | lang=en
- "templates_retrospective_top_lessons_verified_across_milestones": "Top Lessons (Verified Across Milestones)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/retrospective.md:L51 | neighbors=[Cross-Milestone Trends] | lang=en
- "templates_retrospective_what_was_built": "What Was Built" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/retrospective.md:L10 | neighbors=[Milestone: v{version} — {name}] | lang=en
- "templates_retrospective_what_was_inefficient": "What Was Inefficient" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/retrospective.md:L19 | neighbors=[Milestone: v{version} — {name}] | lang=en
- "templates_retrospective_what_worked": "What Worked" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/retrospective.md:L15 | neighbors=[Milestone: v{version} — {name}] | lang=en
- "templates_roadmap": "roadmap.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/roadmap.md:L1 | neighbors=[Roadmap Template] | lang=en
- "templates_roadmap_initial_roadmap_v1_0_greenfield": "Initial Roadmap (v1.0 Greenfield)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/roadmap.md:L5 | neighbors=[Roadmap Template] | lang=en
- "templates_roadmap_milestone_grouped_roadmap_after_v1_0_ships": "Milestone-Grouped Roadmap (After v1.0 Ships)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/roadmap.md:L136 | neighbors=[Roadmap Template] | lang=en
- "templates_security": "SECURITY.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/SECURITY.md:L1 | neighbors=[Phase {N} — Security] | lang=en
- "templates_security_accepted_risks_log": "Accepted Risks Log" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/SECURITY.md:L35 | neighbors=[Phase {N} — Security] | lang=en
- "templates_security_security_audit_trail": "Security Audit Trail" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/SECURITY.md:L46 | neighbors=[Phase {N} — Security] | lang=en
- "templates_security_sign_off": "Sign-Off" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/SECURITY.md:L54 | neighbors=[Phase {N} — Security] | lang=en
- "templates_security_threat_register": "Threat Register" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/SECURITY.md:L24 | neighbors=[Phase {N} — Security] | lang=en
- "templates_security_trust_boundaries": "Trust Boundaries" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/SECURITY.md:L16 | neighbors=[Phase {N} — Security] | lang=en
- "templates_spec": "spec.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/spec.md:L1 | neighbors=[Phase Spec Template] | lang=en
- "templates_spec_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/spec.md:L16 | neighbors=[Phase Spec Template] | lang=en
- "templates_state": "state.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/state.md:L1 | neighbors=[State Template] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-385.json

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
