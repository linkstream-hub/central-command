# Node Description Batch 186 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
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

- "concept_job": "Job" | kind=entity | source=CONTEXT.md | neighbors=[Work Order] | lang=en
- "concept_outbox": "Outbox" | kind=entity | source=CONTEXT.md | neighbors=[Event Bus] | lang=en
- "concept_quality_gate_fleet": "GitHub Actions Quality Gate Fleet" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md | neighbors=[CLAW_ARMY_PHASE1_SPEC.md] | lang=en
- "concept_work_order": "Work Order" | kind=entity | source=CONTEXT.md | neighbors=[Job] | lang=en
- "configure_ecc_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L1 | neighbors=[Configure Everything Claude Code (ECC)] | lang=en
- "configure_ecc_skill_2a_choose_scope_core_vs_niche": "2a: Choose Scope (Core vs Niche)" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L67 | neighbors=[Step 2: Select & Install Skills] | lang=pt
- "configure_ecc_skill_2b_choose_skill_categories": "2b: Choose Skill Categories" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L83 | neighbors=[Step 2: Select & Install Skills] | lang=en
- "configure_ecc_skill_2c_confirm_individual_skills": "2c: Confirm Individual Skills" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L100 | neighbors=[Step 2: Select & Install Skills] | lang=en
- "configure_ecc_skill_2d_execute_installation": "2d: Execute Installation" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L200 | neighbors=[Step 2: Select & Install Skills] | lang=en
- "configure_ecc_skill_4a_verify_file_existence": "4a: Verify File Existence" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L255 | neighbors=[Step 4: Post-Installation Verification] | lang=pt
- "configure_ecc_skill_4b_check_path_references": "4b: Check Path References" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L263 | neighbors=[Step 4: Post-Installation Verification] | lang=en
- "configure_ecc_skill_4c_check_cross_references_between_skills": "4c: Check Cross-References Between Skills" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L277 | neighbors=[Step 4: Post-Installation Verification] | lang=en
- "configure_ecc_skill_4d_report_issues": "4d: Report Issues" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L293 | neighbors=[Step 4: Post-Installation Verification] | lang=en
- "configure_ecc_skill_if_optimizing_rules": "If optimizing rules:" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L323 | neighbors=[Step 5: Optimize Installed Files (Optio…] | lang=en
- "configure_ecc_skill_if_optimizing_skills": "If optimizing skills:" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L316 | neighbors=[Step 5: Optimize Installed Files (Optio…] | lang=en
- "configure_ecc_skill_path_reference_errors_after_project_level_install": "\"Path reference errors after project-level install\"" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L382 | neighbors=[Troubleshooting] | lang=en
- "configure_ecc_skill_prerequisites": "Prerequisites" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L18 | neighbors=[Configure Everything Claude Code (ECC)] | lang=en
- "configure_ecc_skill_rules_not_working": "\"Rules not working\"" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L378 | neighbors=[Troubleshooting] | lang=en
- "configure_ecc_skill_skills_not_being_picked_up_by_claude_code": "\"Skills not being picked up by Claude Code\"" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L373 | neighbors=[Troubleshooting] | lang=en
- "configure_ecc_skill_step_0_clone_ecc_repository": "Step 0: Clone ECC Repository" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L26 | neighbors=[Configure Everything Claude Code (ECC)] | lang=en
- "configure_ecc_skill_step_1_choose_installation_level": "Step 1: Choose Installation Level" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L41 | neighbors=[Configure Everything Claude Code (ECC)] | lang=en
- "configure_ecc_skill_step_3_select_install_rules": "Step 3: Select & Install Rules" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L222 | neighbors=[Configure Everything Claude Code (ECC)] | lang=en
- "configure_ecc_skill_step_6_installation_summary": "Step 6: Installation Summary" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L336 | neighbors=[Configure Everything Claude Code (ECC)] | lang=en
- "configure_ecc_skill_when_to_activate": "When to Activate" | kind=entity | source=.github/skills/ecc/configure-ecc/SKILL.md:L11 | neighbors=[Configure Everything Claude Code (ECC)] | lang=en
- "context": "CONTEXT.md" | kind=entity | source=CONTEXT.md:L1 | neighbors=[APT Central Command] | lang=en
- "context_sentinel_domain": "Sentinel Domain" | kind=entity | source=CONTEXT.md:L65 | neighbors=[Language] | lang=en
- "context_toastcontext_toastcontext": "ToastContext" | kind=code-symbol | source=tech-pwa/src/context/ToastContext.tsx:L7 | neighbors=[ToastContext.tsx] | lang=en
- "context_toastcontext_toastitem": "ToastItem" | kind=code-symbol | source=tech-pwa/src/context/ToastContext.tsx:L5 | neighbors=[ToastContext.tsx] | lang=en
- "context_toastcontext_toasttype": "ToastType" | kind=code-symbol | source=tech-pwa/src/context/ToastContext.tsx:L4 | neighbors=[ToastContext.tsx] | lang=en
- "context_work_order_domain": "Work Order Domain" | kind=entity | source=CONTEXT.md:L7 | neighbors=[Language] | lang=en
- "contexts_dev": "dev.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/dev.md:L1 | neighbors=[Dev Context Profile] | lang=en
- "contexts_dev_focus_areas": "Focus Areas" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/dev.md:L12 | neighbors=[Dev Context Profile] | lang=en
- "contexts_dev_output_style": "Output Style" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/dev.md:L5 | neighbors=[Dev Context Profile] | lang=en
- "contexts_dev_verbosity": "Verbosity" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/dev.md:L19 | neighbors=[Dev Context Profile] | lang=en
- "contexts_research": "research.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/research.md:L1 | neighbors=[Research Context Profile] | lang=en
- "contexts_research_focus_areas": "Focus Areas" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/research.md:L12 | neighbors=[Research Context Profile] | lang=en
- "contexts_research_output_style": "Output Style" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/research.md:L5 | neighbors=[Research Context Profile] | lang=en
- "contexts_research_verbosity": "Verbosity" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/research.md:L20 | neighbors=[Research Context Profile] | lang=en
- "contexts_review": "review.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/review.md:L1 | neighbors=[Review Context Profile] | lang=en
- "contexts_review_focus_areas": "Focus Areas" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/contexts/review.md:L12 | neighbors=[Review Context Profile] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-185.json

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
