# Node Description Batch 122 of 412

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

- "agents_gsd_roadmapper_agent_roadmap_created": "Roadmap Created" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L521 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_roadmap_revised": "Roadmap Revised" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L569 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_solo_developer_the_agent_workflow": "Solo Developer + the agent Workflow" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L56 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_state_md_structure": "STATE.md Structure" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L374 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_step_1_receive_context": "Step 1: Receive Context" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L431 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_step_2_extract_requirements": "Step 2: Extract Requirements" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L441 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_step_3_load_research_context_if_exists": "Step 3: Load Research Context (if exists)" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L458 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_step_4_identify_phases": "Step 4: Identify Phases" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L467 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_step_5_derive_success_criteria": "Step 5: Derive Success Criteria" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L475 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_step_6_validate_coverage": "Step 6: Validate Coverage" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L483 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_step_7_write_files_immediately": "Step 7: Write Files Immediately" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L491 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_step_8_return_summary": "Step 8: Return Summary" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L505 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_step_9_handle_revision_if_needed": "Step 9: Handle Revision (if needed)" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L509 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_traceability_update": "Traceability Update" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L283 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_ui_phase_detection": "UI Phase Detection" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L334 | neighbors=[ROADMAP.md Structure]
- "agents_gsd_roadmapper_agent_what_not_to_do": "What Not to Do" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L626 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L6 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L8 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_1_summary_checklist_under_phases": "1. Summary Checklist (under `## Phases`)" | kind=entity | source=agents/gsd-roadmapper.md:L304 | neighbors=[ROADMAP.md Structure]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_100_requirement_coverage": "100% Requirement Coverage" | kind=entity | source=agents/gsd-roadmapper.md:L247 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_2_detail_sections_under_phase_details": "2. Detail Sections (under `## Phase Details`)" | kind=entity | source=agents/gsd-roadmapper.md:L312 | neighbors=[ROADMAP.md Structure]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_3_progress_table": "3. Progress Table" | kind=entity | source=agents/gsd-roadmapper.md:L361 | neighbors=[ROADMAP.md Structure]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_anti_enterprise": "Anti-Enterprise" | kind=entity | source=agents/gsd-roadmapper.md:L62 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_coverage_is_non_negotiable": "Coverage is Non-Negotiable" | kind=entity | source=agents/gsd-roadmapper.md:L88 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_deriving_phase_success_criteria": "Deriving Phase Success Criteria" | kind=entity | source=agents/gsd-roadmapper.md:L99 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_deriving_phases_from_requirements": "Deriving Phases from Requirements" | kind=entity | source=agents/gsd-roadmapper.md:L164 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_draft_presentation_format": "Draft Presentation Format" | kind=entity | source=agents/gsd-roadmapper.md:L383 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_example_gap_resolution": "Example Gap Resolution" | kind=entity | source=agents/gsd-roadmapper.md:L139 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_goal_backward_at_phase_level": "Goal-Backward at Phase Level" | kind=entity | source=agents/gsd-roadmapper.md:L81 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_good_phase_patterns": "Good Phase Patterns" | kind=entity | source=agents/gsd-roadmapper.md:L217 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_granularity_calibration": "Granularity Calibration" | kind=entity | source=agents/gsd-roadmapper.md:L205 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_phase_numbering": "Phase Numbering" | kind=entity | source=agents/gsd-roadmapper.md:L193 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_requirements_drive_structure": "Requirements Drive Structure" | kind=entity | source=agents/gsd-roadmapper.md:L72 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_roadmap_blocked": "Roadmap Blocked" | kind=entity | source=agents/gsd-roadmapper.md:L597 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_roadmap_created": "Roadmap Created" | kind=entity | source=agents/gsd-roadmapper.md:L519 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_roadmap_revised": "Roadmap Revised" | kind=entity | source=agents/gsd-roadmapper.md:L567 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_solo_developer_claude_workflow": "Solo Developer + Claude Workflow" | kind=entity | source=agents/gsd-roadmapper.md:L54 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_state_md_structure": "STATE.md Structure" | kind=entity | source=agents/gsd-roadmapper.md:L372 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_1_receive_context": "Step 1: Receive Context" | kind=entity | source=agents/gsd-roadmapper.md:L429 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_2_extract_requirements": "Step 2: Extract Requirements" | kind=entity | source=agents/gsd-roadmapper.md:L439 | neighbors=[gsd-roadmapper.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-121.json

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
