# Node Description Batch 181 of 412

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

- "claude_agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_5_assess_confidence": "Step 5: Assess Confidence" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L119 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_6_write_summary_md": "Step 6: Write SUMMARY.md" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L130 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_7_commit_all_research": "Step 7: Commit All Research" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L150 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_8_return_summary": "Step 8: Return Summary" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L158 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_synthesis_blocked": "Synthesis Blocked" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L221 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_synthesis_complete": "Synthesis Complete" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L179 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_1_summary_checklist_under_phases": "1. Summary Checklist (under `## Phases`)" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L312 | neighbors=[ROADMAP.md Structure]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_100_requirement_coverage": "100% Requirement Coverage" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L255 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_2_detail_sections_under_phase_details": "2. Detail Sections (under `## Phase Details`)" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L320 | neighbors=[ROADMAP.md Structure]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_3_progress_table": "3. Progress Table" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L369 | neighbors=[ROADMAP.md Structure]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_anti_enterprise": "Anti-Enterprise" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L70 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_coverage_is_non_negotiable": "Coverage is Non-Negotiable" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L96 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_deriving_phase_success_criteria": "Deriving Phase Success Criteria" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L107 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_deriving_phases_from_requirements": "Deriving Phases from Requirements" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L172 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_draft_presentation_format": "Draft Presentation Format" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L391 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_example_gap_resolution": "Example Gap Resolution" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L147 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_goal_backward_at_phase_level": "Goal-Backward at Phase Level" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L89 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_good_phase_patterns": "Good Phase Patterns" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L225 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_granularity_calibration": "Granularity Calibration" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L213 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_phase_numbering": "Phase Numbering" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L201 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_requirements_drive_structure": "Requirements Drive Structure" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L80 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_roadmap_blocked": "Roadmap Blocked" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L605 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_roadmap_created": "Roadmap Created" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L527 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_roadmap_revised": "Roadmap Revised" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L575 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_solo_developer_claude_workflow": "Solo Developer + Claude Workflow" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L62 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_state_md_structure": "STATE.md Structure" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L380 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_1_receive_context": "Step 1: Receive Context" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L437 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_2_extract_requirements": "Step 2: Extract Requirements" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L447 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_3_load_research_context_if_exists": "Step 3: Load Research Context (if exists)" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L464 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_4_identify_phases": "Step 4: Identify Phases" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L473 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_5_derive_success_criteria": "Step 5: Derive Success Criteria" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L481 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_6_validate_coverage": "Step 6: Validate Coverage" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L489 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_7_write_files_immediately": "Step 7: Write Files Immediately" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L497 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_8_return_summary": "Step 8: Return Summary" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L511 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_9_handle_revision_if_needed": "Step 9: Handle Revision (if needed)" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L515 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_traceability_update": "Traceability Update" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L289 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_ui_phase_detection": "UI Phase Detection" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L340 | neighbors=[ROADMAP.md Structure]
- "claude_agents_gsd_roadmapper_md_agents_gsd_roadmapper_what_not_to_do": "What Not to Do" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L632 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_security_auditor_md_agents_gsd_security_auditor_escalate": "ESCALATE" | kind=entity | source=.claude/agents/gsd-security-auditor.md:L132 | neighbors=[gsd-security-auditor.md]
- "claude_agents_gsd_security_auditor_md_agents_gsd_security_auditor_open_threats": "OPEN_THREATS" | kind=entity | source=.claude/agents/gsd-security-auditor.md:L108 | neighbors=[gsd-security-auditor.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-180.json

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
