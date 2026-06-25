# Node Description Batch 123 of 412

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

- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_3_load_research_context_if_exists": "Step 3: Load Research Context (if exists)" | kind=entity | source=agents/gsd-roadmapper.md:L456 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_4_identify_phases": "Step 4: Identify Phases" | kind=entity | source=agents/gsd-roadmapper.md:L465 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_5_derive_success_criteria": "Step 5: Derive Success Criteria" | kind=entity | source=agents/gsd-roadmapper.md:L473 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_6_validate_coverage": "Step 6: Validate Coverage" | kind=entity | source=agents/gsd-roadmapper.md:L481 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_7_write_files_immediately": "Step 7: Write Files Immediately" | kind=entity | source=agents/gsd-roadmapper.md:L489 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_8_return_summary": "Step 8: Return Summary" | kind=entity | source=agents/gsd-roadmapper.md:L503 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_step_9_handle_revision_if_needed": "Step 9: Handle Revision (if needed)" | kind=entity | source=agents/gsd-roadmapper.md:L507 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_traceability_update": "Traceability Update" | kind=entity | source=agents/gsd-roadmapper.md:L281 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_ui_phase_detection": "UI Phase Detection" | kind=entity | source=agents/gsd-roadmapper.md:L332 | neighbors=[ROADMAP.md Structure]
- "agents_gsd_roadmapper_md_agents_gsd_roadmapper_what_not_to_do": "What Not to Do" | kind=entity | source=agents/gsd-roadmapper.md:L624 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L7 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_roadmapper_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-roadmapper.md:L10 | neighbors=[gsd-roadmapper.md]
- "agents_gsd_security_auditor_agent_escalate": "ESCALATE" | kind=entity | source=.github/agents/gsd-security-auditor.agent.md:L126 | neighbors=[gsd-security-auditor.agent.md]
- "agents_gsd_security_auditor_agent_open_threats": "OPEN_THREATS" | kind=entity | source=.github/agents/gsd-security-auditor.agent.md:L102 | neighbors=[gsd-security-auditor.agent.md]
- "agents_gsd_security_auditor_agent_secured": "SECURED" | kind=entity | source=.github/agents/gsd-security-auditor.agent.md:L82 | neighbors=[gsd-security-auditor.agent.md]
- "agents_gsd_security_auditor_md_agents_gsd_security_auditor_escalate": "ESCALATE" | kind=entity | source=agents/gsd-security-auditor.md:L124 | neighbors=[gsd-security-auditor.md]
- "agents_gsd_security_auditor_md_agents_gsd_security_auditor_open_threats": "OPEN_THREATS" | kind=entity | source=agents/gsd-security-auditor.md:L100 | neighbors=[gsd-security-auditor.md]
- "agents_gsd_security_auditor_md_agents_gsd_security_auditor_secured": "SECURED" | kind=entity | source=agents/gsd-security-auditor.md:L80 | neighbors=[gsd-security-auditor.md]
- "agents_gsd_ui_auditor_agent_automated_screenshot_capture_via_playwright_mcp_preferred_when_available": "Automated Screenshot Capture via Playwright-MCP (preferred when available)" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L102 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_output_ui_review_md": "Output: UI-REVIEW.md" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L324 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_pillar_1_copywriting": "Pillar 1: Copywriting" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L189 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "agents_gsd_ui_auditor_agent_pillar_2_visuals": "Pillar 2: Visuals" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L205 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "agents_gsd_ui_auditor_agent_pillar_3_color": "Pillar 3: Color" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L213 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "agents_gsd_ui_auditor_agent_pillar_4_typography": "Pillar 4: Typography" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L227 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "agents_gsd_ui_auditor_agent_pillar_5_spacing": "Pillar 5: Spacing" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L241 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "agents_gsd_ui_auditor_agent_pillar_6_experience_design": "Pillar 6: Experience Design" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L255 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "agents_gsd_ui_auditor_agent_registry_safety_audit_post_execution": "Registry Safety Audit (post-execution)" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L274 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_screenshot_capture_cli_only_no_mcp_no_persistent_browser": "Screenshot Capture (CLI only — no MCP, no persistent browser)" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L142 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_screenshot_storage_safety": "Screenshot Storage Safety" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L72 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_step_1_load_context": "Step 1: Load Context" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L392 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_step_2_ensure_gitignore": "Step 2: Ensure .gitignore" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L396 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_step_3_detect_dev_server_and_capture_screenshots": "Step 3: Detect Dev Server and Capture Screenshots" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L400 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_step_4_scan_implemented_files": "Step 4: Scan Implemented Files" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L404 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_step_5_audit_each_pillar": "Step 5: Audit Each Pillar" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L413 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_step_6_registry_safety_audit": "Step 6: Registry Safety Audit" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L421 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_step_7_write_ui_review_md": "Step 7: Write UI-REVIEW.md" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L425 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_step_8_return_structured_result": "Step 8: Return Structured Result" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L429 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_agent_ui_review_complete": "UI Review Complete" | kind=entity | source=.github/agents/gsd-ui-auditor.agent.md:L435 | neighbors=[gsd-ui-auditor.agent.md]
- "agents_gsd_ui_auditor_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L6 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L8 | neighbors=[gsd-ui-auditor.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-122.json

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
