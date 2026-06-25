# Node Description Batch 121 of 412

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

- "agents_gsd_research_synthesizer_agent_step_1_read_research_files": "Step 1: Read Research Files" | kind=entity | source=.github/agents/gsd-research-synthesizer.agent.md:L46 | neighbors=[gsd-research-synthesizer.agent.md]
- "agents_gsd_research_synthesizer_agent_step_2_synthesize_executive_summary": "Step 2: Synthesize Executive Summary" | kind=entity | source=.github/agents/gsd-research-synthesizer.agent.md:L65 | neighbors=[gsd-research-synthesizer.agent.md]
- "agents_gsd_research_synthesizer_agent_step_3_extract_key_findings": "Step 3: Extract Key Findings" | kind=entity | source=.github/agents/gsd-research-synthesizer.agent.md:L74 | neighbors=[gsd-research-synthesizer.agent.md]
- "agents_gsd_research_synthesizer_agent_step_4_derive_roadmap_implications": "Step 4: Derive Roadmap Implications" | kind=entity | source=.github/agents/gsd-research-synthesizer.agent.md:L94 | neighbors=[gsd-research-synthesizer.agent.md]
- "agents_gsd_research_synthesizer_agent_step_5_assess_confidence": "Step 5: Assess Confidence" | kind=entity | source=.github/agents/gsd-research-synthesizer.agent.md:L113 | neighbors=[gsd-research-synthesizer.agent.md]
- "agents_gsd_research_synthesizer_agent_step_6_write_summary_md": "Step 6: Write SUMMARY.md" | kind=entity | source=.github/agents/gsd-research-synthesizer.agent.md:L124 | neighbors=[gsd-research-synthesizer.agent.md]
- "agents_gsd_research_synthesizer_agent_step_7_commit_all_research": "Step 7: Commit All Research" | kind=entity | source=.github/agents/gsd-research-synthesizer.agent.md:L144 | neighbors=[gsd-research-synthesizer.agent.md]
- "agents_gsd_research_synthesizer_agent_step_8_return_summary": "Step 8: Return Summary" | kind=entity | source=.github/agents/gsd-research-synthesizer.agent.md:L152 | neighbors=[gsd-research-synthesizer.agent.md]
- "agents_gsd_research_synthesizer_agent_synthesis_blocked": "Synthesis Blocked" | kind=entity | source=.github/agents/gsd-research-synthesizer.agent.md:L215 | neighbors=[gsd-research-synthesizer.agent.md]
- "agents_gsd_research_synthesizer_agent_synthesis_complete": "Synthesis Complete" | kind=entity | source=.github/agents/gsd-research-synthesizer.agent.md:L173 | neighbors=[gsd-research-synthesizer.agent.md]
- "agents_gsd_research_synthesizer_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L6 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L8 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_1_read_research_files": "Step 1: Read Research Files" | kind=entity | source=agents/gsd-research-synthesizer.md:L44 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_2_synthesize_executive_summary": "Step 2: Synthesize Executive Summary" | kind=entity | source=agents/gsd-research-synthesizer.md:L63 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_3_extract_key_findings": "Step 3: Extract Key Findings" | kind=entity | source=agents/gsd-research-synthesizer.md:L72 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_4_derive_roadmap_implications": "Step 4: Derive Roadmap Implications" | kind=entity | source=agents/gsd-research-synthesizer.md:L92 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_5_assess_confidence": "Step 5: Assess Confidence" | kind=entity | source=agents/gsd-research-synthesizer.md:L111 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_6_write_summary_md": "Step 6: Write SUMMARY.md" | kind=entity | source=agents/gsd-research-synthesizer.md:L122 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_7_commit_all_research": "Step 7: Commit All Research" | kind=entity | source=agents/gsd-research-synthesizer.md:L142 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_8_return_summary": "Step 8: Return Summary" | kind=entity | source=agents/gsd-research-synthesizer.md:L150 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_synthesis_blocked": "Synthesis Blocked" | kind=entity | source=agents/gsd-research-synthesizer.md:L213 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_synthesis_complete": "Synthesis Complete" | kind=entity | source=agents/gsd-research-synthesizer.md:L171 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L7 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_research_synthesizer_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L10 | neighbors=[gsd-research-synthesizer.md]
- "agents_gsd_roadmapper_agent_1_summary_checklist_under_phases": "1. Summary Checklist (under `## Phases`)" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L306 | neighbors=[ROADMAP.md Structure]
- "agents_gsd_roadmapper_agent_100_requirement_coverage": "100% Requirement Coverage" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L249 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_2_detail_sections_under_phase_details": "2. Detail Sections (under `## Phase Details`)" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L314 | neighbors=[ROADMAP.md Structure]
- "agents_gsd_roadmapper_agent_3_progress_table": "3. Progress Table" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L363 | neighbors=[ROADMAP.md Structure]
- "agents_gsd_roadmapper_agent_anti_enterprise": "Anti-Enterprise" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L64 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_coverage_is_non_negotiable": "Coverage is Non-Negotiable" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L90 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_deriving_phase_success_criteria": "Deriving Phase Success Criteria" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L101 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_deriving_phases_from_requirements": "Deriving Phases from Requirements" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L166 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_draft_presentation_format": "Draft Presentation Format" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L385 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_example_gap_resolution": "Example Gap Resolution" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L141 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_goal_backward_at_phase_level": "Goal-Backward at Phase Level" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L83 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_good_phase_patterns": "Good Phase Patterns" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L219 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_granularity_calibration": "Granularity Calibration" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L207 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_phase_numbering": "Phase Numbering" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L195 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_requirements_drive_structure": "Requirements Drive Structure" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L74 | neighbors=[gsd-roadmapper.agent.md]
- "agents_gsd_roadmapper_agent_roadmap_blocked": "Roadmap Blocked" | kind=entity | source=.github/agents/gsd-roadmapper.agent.md:L599 | neighbors=[gsd-roadmapper.agent.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-120.json

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
