# Node Description Batch 111 of 412

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

- "agents_gsd_doc_synthesizer_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-doc-synthesizer.md:L6 | neighbors=[gsd-doc-synthesizer.md]
- "agents_gsd_doc_synthesizer_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-doc-synthesizer.md:L8 | neighbors=[gsd-doc-synthesizer.md]
- "agents_gsd_doc_synthesizer_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-doc-synthesizer.md:L7 | neighbors=[gsd-doc-synthesizer.md]
- "agents_gsd_doc_synthesizer_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-doc-synthesizer.md:L10 | neighbors=[gsd-doc-synthesizer.md]
- "agents_gsd_doc_verifier_command_npx_eslint_fix_file_2_dev_null_true": "command: \"npx eslint --fix $FILE 2>/dev/null || true\"" | kind=entity | source=.claude/agents/gsd-doc-verifier.md:L11 | neighbors=[gsd-doc-verifier.md]
- "agents_gsd_doc_verifier_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-doc-verifier.md:L6 | neighbors=[gsd-doc-verifier.md]
- "agents_gsd_doc_verifier_matcher_write": "- matcher: \"Write\"" | kind=entity | source=.claude/agents/gsd-doc-verifier.md:L8 | neighbors=[gsd-doc-verifier.md]
- "agents_gsd_doc_verifier_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-doc-verifier.md:L7 | neighbors=[gsd-doc-verifier.md]
- "agents_gsd_doc_verifier_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-doc-verifier.md:L10 | neighbors=[gsd-doc-verifier.md]
- "agents_gsd_doc_writer_agent_api_md": "API.md" | kind=entity | source=.github/agents/gsd-doc-writer.agent.md:L290 | neighbors=[gsd-doc-writer.agent.md]
- "agents_gsd_doc_writer_agent_architecture_md": "ARCHITECTURE.md" | kind=entity | source=.github/agents/gsd-doc-writer.agent.md:L143 | neighbors=[gsd-doc-writer.agent.md]
- "agents_gsd_doc_writer_agent_configuration_md": "CONFIGURATION.md" | kind=entity | source=.github/agents/gsd-doc-writer.agent.md:L335 | neighbors=[gsd-doc-writer.agent.md]
- "agents_gsd_doc_writer_agent_contributing_md": "CONTRIBUTING.md" | kind=entity | source=.github/agents/gsd-doc-writer.agent.md:L420 | neighbors=[gsd-doc-writer.agent.md]
- "agents_gsd_doc_writer_agent_custom_documentation_gap_detected": "Custom Documentation (gap-detected)" | kind=entity | source=.github/agents/gsd-doc-writer.agent.md:L492 | neighbors=[gsd-doc-writer.agent.md]
- "agents_gsd_doc_writer_agent_deployment_md": "DEPLOYMENT.md" | kind=entity | source=.github/agents/gsd-doc-writer.agent.md:L377 | neighbors=[gsd-doc-writer.agent.md]
- "agents_gsd_doc_writer_agent_development_md": "DEVELOPMENT.md" | kind=entity | source=.github/agents/gsd-doc-writer.agent.md:L216 | neighbors=[gsd-doc-writer.agent.md]
- "agents_gsd_doc_writer_agent_doc_tooling_adaptation": "Doc Tooling Adaptation" | kind=entity | source=.github/agents/gsd-doc-writer.agent.md:L536 | neighbors=[gsd-doc-writer.agent.md]
- "agents_gsd_doc_writer_agent_getting_started_md": "GETTING-STARTED.md" | kind=entity | source=.github/agents/gsd-doc-writer.agent.md:L178 | neighbors=[gsd-doc-writer.agent.md]
- "agents_gsd_doc_writer_agent_per_package_readme_monorepo_scope": "Per-Package README (monorepo scope)" | kind=entity | source=.github/agents/gsd-doc-writer.agent.md:L458 | neighbors=[gsd-doc-writer.agent.md]
- "agents_gsd_doc_writer_agent_readme_md": "README.md" | kind=entity | source=.github/agents/gsd-doc-writer.agent.md:L104 | neighbors=[gsd-doc-writer.agent.md]
- "agents_gsd_doc_writer_agent_testing_md": "TESTING.md" | kind=entity | source=.github/agents/gsd-doc-writer.agent.md:L253 | neighbors=[gsd-doc-writer.agent.md]
- "agents_gsd_doc_writer_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L6 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_matcher_write": "- matcher: \"Write\"" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L8 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_md_agents_gsd_doc_writer_api_md": "API.md" | kind=entity | source=agents/gsd-doc-writer.md:L288 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_md_agents_gsd_doc_writer_architecture_md": "ARCHITECTURE.md" | kind=entity | source=agents/gsd-doc-writer.md:L141 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_md_agents_gsd_doc_writer_configuration_md": "CONFIGURATION.md" | kind=entity | source=agents/gsd-doc-writer.md:L333 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_md_agents_gsd_doc_writer_contributing_md": "CONTRIBUTING.md" | kind=entity | source=agents/gsd-doc-writer.md:L418 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_md_agents_gsd_doc_writer_custom_documentation_gap_detected": "Custom Documentation (gap-detected)" | kind=entity | source=agents/gsd-doc-writer.md:L490 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_md_agents_gsd_doc_writer_deployment_md": "DEPLOYMENT.md" | kind=entity | source=agents/gsd-doc-writer.md:L375 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_md_agents_gsd_doc_writer_development_md": "DEVELOPMENT.md" | kind=entity | source=agents/gsd-doc-writer.md:L214 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_md_agents_gsd_doc_writer_doc_tooling_adaptation": "Doc Tooling Adaptation" | kind=entity | source=agents/gsd-doc-writer.md:L534 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_md_agents_gsd_doc_writer_getting_started_md": "GETTING-STARTED.md" | kind=entity | source=agents/gsd-doc-writer.md:L176 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_md_agents_gsd_doc_writer_per_package_readme_monorepo_scope": "Per-Package README (monorepo scope)" | kind=entity | source=agents/gsd-doc-writer.md:L456 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_md_agents_gsd_doc_writer_readme_md": "README.md" | kind=entity | source=agents/gsd-doc-writer.md:L102 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_md_agents_gsd_doc_writer_testing_md": "TESTING.md" | kind=entity | source=agents/gsd-doc-writer.md:L251 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L7 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_doc_writer_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L10 | neighbors=[gsd-doc-writer.md]
- "agents_gsd_domain_researcher_command_echo_ai_spec_domain_section_written_2_dev_null_true": "command: \"echo 'AI-SPEC domain section written' 2>/dev/null || true\"" | kind=entity | source=.claude/agents/gsd-domain-researcher.md:L11 | neighbors=[gsd-domain-researcher.md]
- "agents_gsd_domain_researcher_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-domain-researcher.md:L6 | neighbors=[gsd-domain-researcher.md]
- "agents_gsd_domain_researcher_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-domain-researcher.md:L8 | neighbors=[gsd-domain-researcher.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-110.json

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
