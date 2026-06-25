# Node Description Batch 124 of 412

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

- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_automated_screenshot_capture_via_playwright_mcp_preferred_when_available": "Automated Screenshot Capture via Playwright-MCP (preferred when available)" | kind=entity | source=agents/gsd-ui-auditor.md:L100 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_output_ui_review_md": "Output: UI-REVIEW.md" | kind=entity | source=agents/gsd-ui-auditor.md:L322 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_pillar_1_copywriting": "Pillar 1: Copywriting" | kind=entity | source=agents/gsd-ui-auditor.md:L187 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_pillar_2_visuals": "Pillar 2: Visuals" | kind=entity | source=agents/gsd-ui-auditor.md:L203 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_pillar_3_color": "Pillar 3: Color" | kind=entity | source=agents/gsd-ui-auditor.md:L211 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_pillar_4_typography": "Pillar 4: Typography" | kind=entity | source=agents/gsd-ui-auditor.md:L225 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_pillar_5_spacing": "Pillar 5: Spacing" | kind=entity | source=agents/gsd-ui-auditor.md:L239 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_pillar_6_experience_design": "Pillar 6: Experience Design" | kind=entity | source=agents/gsd-ui-auditor.md:L253 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_registry_safety_audit_post_execution": "Registry Safety Audit (post-execution)" | kind=entity | source=agents/gsd-ui-auditor.md:L272 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_screenshot_capture_cli_only_no_mcp_no_persistent_browser": "Screenshot Capture (CLI only — no MCP, no persistent browser)" | kind=entity | source=agents/gsd-ui-auditor.md:L140 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_screenshot_storage_safety": "Screenshot Storage Safety" | kind=entity | source=agents/gsd-ui-auditor.md:L70 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_1_load_context": "Step 1: Load Context" | kind=entity | source=agents/gsd-ui-auditor.md:L390 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_2_ensure_gitignore": "Step 2: Ensure .gitignore" | kind=entity | source=agents/gsd-ui-auditor.md:L394 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_3_detect_dev_server_and_capture_screenshots": "Step 3: Detect Dev Server and Capture Screenshots" | kind=entity | source=agents/gsd-ui-auditor.md:L398 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_4_scan_implemented_files": "Step 4: Scan Implemented Files" | kind=entity | source=agents/gsd-ui-auditor.md:L402 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_5_audit_each_pillar": "Step 5: Audit Each Pillar" | kind=entity | source=agents/gsd-ui-auditor.md:L411 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_6_registry_safety_audit": "Step 6: Registry Safety Audit" | kind=entity | source=agents/gsd-ui-auditor.md:L419 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_7_write_ui_review_md": "Step 7: Write UI-REVIEW.md" | kind=entity | source=agents/gsd-ui-auditor.md:L423 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_8_return_structured_result": "Step 8: Return Structured Result" | kind=entity | source=agents/gsd-ui-auditor.md:L427 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_ui_review_complete": "UI Review Complete" | kind=entity | source=agents/gsd-ui-auditor.md:L433 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L7 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_auditor_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L10 | neighbors=[gsd-ui-auditor.md]
- "agents_gsd_ui_checker_agent_dimension_1_copywriting": "Dimension 1: Copywriting" | kind=entity | source=.github/agents/gsd-ui-checker.agent.md:L61 | neighbors=[gsd-ui-checker.agent.md]
- "agents_gsd_ui_checker_agent_dimension_2_visuals": "Dimension 2: Visuals" | kind=entity | source=.github/agents/gsd-ui-checker.agent.md:L82 | neighbors=[gsd-ui-checker.agent.md]
- "agents_gsd_ui_checker_agent_dimension_3_color": "Dimension 3: Color" | kind=entity | source=.github/agents/gsd-ui-checker.agent.md:L99 | neighbors=[gsd-ui-checker.agent.md]
- "agents_gsd_ui_checker_agent_dimension_4_typography": "Dimension 4: Typography" | kind=entity | source=.github/agents/gsd-ui-checker.agent.md:L119 | neighbors=[gsd-ui-checker.agent.md]
- "agents_gsd_ui_checker_agent_dimension_5_spacing": "Dimension 5: Spacing" | kind=entity | source=.github/agents/gsd-ui-checker.agent.md:L139 | neighbors=[gsd-ui-checker.agent.md]
- "agents_gsd_ui_checker_agent_dimension_6_registry_safety": "Dimension 6: Registry Safety" | kind=entity | source=.github/agents/gsd-ui-checker.agent.md:L159 | neighbors=[gsd-ui-checker.agent.md]
- "agents_gsd_ui_checker_agent_issues_found": "Issues Found" | kind=entity | source=.github/agents/gsd-ui-checker.agent.md:L251 | neighbors=[gsd-ui-checker.agent.md]
- "agents_gsd_ui_checker_agent_output_format": "Output Format" | kind=entity | source=.github/agents/gsd-ui-checker.agent.md:L197 | neighbors=[gsd-ui-checker.agent.md]
- "agents_gsd_ui_checker_agent_ui_spec_verified": "UI-SPEC Verified" | kind=entity | source=.github/agents/gsd-ui-checker.agent.md:L225 | neighbors=[gsd-ui-checker.agent.md]
- "agents_gsd_ui_checker_md_agents_gsd_ui_checker_dimension_1_copywriting": "Dimension 1: Copywriting" | kind=entity | source=agents/gsd-ui-checker.md:L59 | neighbors=[gsd-ui-checker.md]
- "agents_gsd_ui_checker_md_agents_gsd_ui_checker_dimension_2_visuals": "Dimension 2: Visuals" | kind=entity | source=agents/gsd-ui-checker.md:L80 | neighbors=[gsd-ui-checker.md]
- "agents_gsd_ui_checker_md_agents_gsd_ui_checker_dimension_3_color": "Dimension 3: Color" | kind=entity | source=agents/gsd-ui-checker.md:L97 | neighbors=[gsd-ui-checker.md]
- "agents_gsd_ui_checker_md_agents_gsd_ui_checker_dimension_4_typography": "Dimension 4: Typography" | kind=entity | source=agents/gsd-ui-checker.md:L117 | neighbors=[gsd-ui-checker.md]
- "agents_gsd_ui_checker_md_agents_gsd_ui_checker_dimension_5_spacing": "Dimension 5: Spacing" | kind=entity | source=agents/gsd-ui-checker.md:L137 | neighbors=[gsd-ui-checker.md]
- "agents_gsd_ui_checker_md_agents_gsd_ui_checker_dimension_6_registry_safety": "Dimension 6: Registry Safety" | kind=entity | source=agents/gsd-ui-checker.md:L157 | neighbors=[gsd-ui-checker.md]
- "agents_gsd_ui_checker_md_agents_gsd_ui_checker_issues_found": "Issues Found" | kind=entity | source=agents/gsd-ui-checker.md:L249 | neighbors=[gsd-ui-checker.md]
- "agents_gsd_ui_checker_md_agents_gsd_ui_checker_output_format": "Output Format" | kind=entity | source=agents/gsd-ui-checker.md:L195 | neighbors=[gsd-ui-checker.md]
- "agents_gsd_ui_checker_md_agents_gsd_ui_checker_ui_spec_verified": "UI-SPEC Verified" | kind=entity | source=agents/gsd-ui-checker.md:L223 | neighbors=[gsd-ui-checker.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-123.json

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
