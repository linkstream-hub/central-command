# Node Description Batch 182 of 412

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

- "claude_agents_gsd_security_auditor_md_agents_gsd_security_auditor_secured": "SECURED" | kind=entity | source=.claude/agents/gsd-security-auditor.md:L88 | neighbors=[gsd-security-auditor.md]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_automated_screenshot_capture_via_playwright_mcp_preferred_when_available": "Automated Screenshot Capture via Playwright-MCP (preferred when available)" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L108 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_output_ui_review_md": "Output: UI-REVIEW.md" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L330 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_pillar_1_copywriting": "Pillar 1: Copywriting" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L195 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_pillar_2_visuals": "Pillar 2: Visuals" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L211 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_pillar_3_color": "Pillar 3: Color" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L219 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_pillar_4_typography": "Pillar 4: Typography" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L233 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_pillar_5_spacing": "Pillar 5: Spacing" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L247 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_pillar_6_experience_design": "Pillar 6: Experience Design" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L261 | neighbors=[6-Pillar Scoring (1-4 per pillar)]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_registry_safety_audit_post_execution": "Registry Safety Audit (post-execution)" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L280 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_screenshot_capture_cli_only_no_mcp_no_persistent_browser": "Screenshot Capture (CLI only — no MCP, no persistent browser)" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L148 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_screenshot_storage_safety": "Screenshot Storage Safety" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L78 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_1_load_context": "Step 1: Load Context" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L398 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_2_ensure_gitignore": "Step 2: Ensure .gitignore" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L402 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_3_detect_dev_server_and_capture_screenshots": "Step 3: Detect Dev Server and Capture Screenshots" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L406 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_4_scan_implemented_files": "Step 4: Scan Implemented Files" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L410 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_5_audit_each_pillar": "Step 5: Audit Each Pillar" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L419 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_6_registry_safety_audit": "Step 6: Registry Safety Audit" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L427 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_7_write_ui_review_md": "Step 7: Write UI-REVIEW.md" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L431 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_step_8_return_structured_result": "Step 8: Return Structured Result" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L435 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_auditor_md_agents_gsd_ui_auditor_ui_review_complete": "UI Review Complete" | kind=entity | source=.claude/agents/gsd-ui-auditor.md:L441 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_checker_md_agents_gsd_ui_checker_dimension_1_copywriting": "Dimension 1: Copywriting" | kind=entity | source=.claude/agents/gsd-ui-checker.md:L61 | neighbors=[gsd-ui-checker.md]
- "claude_agents_gsd_ui_checker_md_agents_gsd_ui_checker_dimension_2_visuals": "Dimension 2: Visuals" | kind=entity | source=.claude/agents/gsd-ui-checker.md:L82 | neighbors=[gsd-ui-checker.md]
- "claude_agents_gsd_ui_checker_md_agents_gsd_ui_checker_dimension_3_color": "Dimension 3: Color" | kind=entity | source=.claude/agents/gsd-ui-checker.md:L99 | neighbors=[gsd-ui-checker.md]
- "claude_agents_gsd_ui_checker_md_agents_gsd_ui_checker_dimension_4_typography": "Dimension 4: Typography" | kind=entity | source=.claude/agents/gsd-ui-checker.md:L119 | neighbors=[gsd-ui-checker.md]
- "claude_agents_gsd_ui_checker_md_agents_gsd_ui_checker_dimension_5_spacing": "Dimension 5: Spacing" | kind=entity | source=.claude/agents/gsd-ui-checker.md:L139 | neighbors=[gsd-ui-checker.md]
- "claude_agents_gsd_ui_checker_md_agents_gsd_ui_checker_dimension_6_registry_safety": "Dimension 6: Registry Safety" | kind=entity | source=.claude/agents/gsd-ui-checker.md:L159 | neighbors=[gsd-ui-checker.md]
- "claude_agents_gsd_ui_checker_md_agents_gsd_ui_checker_issues_found": "Issues Found" | kind=entity | source=.claude/agents/gsd-ui-checker.md:L251 | neighbors=[gsd-ui-checker.md]
- "claude_agents_gsd_ui_checker_md_agents_gsd_ui_checker_output_format": "Output Format" | kind=entity | source=.claude/agents/gsd-ui-checker.md:L197 | neighbors=[gsd-ui-checker.md]
- "claude_agents_gsd_ui_checker_md_agents_gsd_ui_checker_ui_spec_verified": "UI-SPEC Verified" | kind=entity | source=.claude/agents/gsd-ui-checker.md:L225 | neighbors=[gsd-ui-checker.md]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_color": "Color" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L160 | neighbors=[What to Ask]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_copywriting": "Copywriting" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L166 | neighbors=[What to Ask]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_output_ui_spec_md": "Output: UI-SPEC.md" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L209 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_registry_only_if_shadcn_initialized": "Registry (only if shadcn initialized)" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L172 | neighbors=[What to Ask]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_shadcn_initialization_gate": "shadcn Initialization Gate" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L123 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_spacing": "Spacing" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L150 | neighbors=[What to Ask]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_1_load_context": "Step 1: Load Context" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L230 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_2_scout_existing_ui": "Step 2: Scout Existing UI" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L237 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_3_shadcn_gate": "Step 3: shadcn Gate" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L255 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_4_design_contract_questions": "Step 4: Design Contract Questions" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L259 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-181.json

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
