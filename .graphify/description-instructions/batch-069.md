# Node Description Batch 70 of 412

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

- "v1_0_cc_core_operational_roadmap_success_criteria": "Success Criteria" | kind=entity | source=.planning/milestones/v1.0-cc-core-operational/ROADMAP.md:L16 | neighbors=[Phase 1 — Queue Cleanup, Phase 2 — Core Loop Verification, Phase 3 — Gap Remediation]
- "windows_desktop_e2e_skill_fallback_screenshot_mode": "Fallback: Screenshot Mode" | kind=entity | source=.github/skills/ecc/windows-desktop-e2e/SKILL.md:L749 | neighbors=[Debugging Match Confidence, DPI / Scaling Rules (screenshot mode on…, Windows Desktop E2E Testing]
- "workflow": "WORKFLOW.md" | kind=entity | source=WORKFLOW.md:L1 | neighbors=[APT CENTRAL COMMAND — AGENT WORKFLOW, Peer Pair model. AG does the heavy lift…, Updated: Session 56 — all 4 shadow-writ…]
- "workflows_audit_milestone_milestone_version_tech_debt_review": "⚡ Milestone {version} — Tech Debt Review" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/audit-milestone.md:L306 | neighbors=[audit-milestone.md, Tech Debt by Phase, Total: {N} items across {M} phases]
- "workflows_import_import_workflow": "Import Workflow" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/import.md:L1 | neighbors=[import.md, Anti-Patterns, Path A: MODE=plan (--from)]
- "workflows_plan_phase_8_5_chunked_planning_mode": "8.5. Chunked Planning Mode" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L990 | neighbors=[plan-phase.md, 8.5.1 Outline Phase (outline-only mode,…, 8.5.2 Per-Plan Tasks (single-plan mode,…]
- "workflows_reapply_patches_step_5_hunk_verification_gate": "Step 5: Hunk Verification Gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/reapply-patches.md:L270 | neighbors=[Reapply Local Patches Workflow, 5a: Deterministic verifier (binding gat…, 5b: Hunk Verification Table review (adv…]
- "03_gap_remediation_03_01_plan": "03-01-PLAN.md" | kind=entity | source=.planning/phases/03-gap-remediation/03-01-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "03_gap_remediation_03_02_plan": "03-02-PLAN.md" | kind=entity | source=.planning/phases/03-gap-remediation/03-02-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "03_gap_remediation_03_03_plan": "03-03-PLAN.md" | kind=entity | source=.planning/phases/03-gap-remediation/03-03-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "10_gas_migration_scope_10_01_plan": "10-01-PLAN.md" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-01-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "10_gas_migration_scope_10_02_plan": "10-02-PLAN.md" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-02-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "12_data_integrity_audit_12_01_plan": "12-01-PLAN.md" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-01-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "12_data_integrity_audit_12_02_plan": "12-02-PLAN.md" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-02-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "12_data_integrity_audit_12_03_plan": "12-03-PLAN.md" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-03-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "13_write_path_flip_13_01_plan": "13-01-PLAN.md" | kind=entity | source=.planning/phases/13-write-path-flip/13-01-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "14_archive_docs_14_01_plan_tasks": "Tasks" | kind=entity | source=.planning/phases/14-archive-docs/14-01-PLAN.md:L8 | neighbors=[Phase 14: Archive + Docs (v1.1 Neon Cut…, Wave 1: Sheet Protection & Documentation]
- "15_gas_migration_phase_a_dead_code_cleanup_15_01_plan": "15-01-PLAN.md" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-01-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "15_gas_migration_phase_a_dead_code_cleanup_15_04_plan": "15-04-PLAN.md" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-04-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "25_parsing_intake_quality_25_01_plan": "25-01-PLAN.md" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-PLAN.md:L1 | neighbors=[Analog files to copy structure from:, Port source (read in full before writin…]
- "25_parsing_intake_quality_25_01_summary_deviations_from_plan": "Deviations from Plan" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L101 | neighbors=[Auto-fixed Issues, Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_02_summary_deviations_from_plan": "Deviations from Plan" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L145 | neighbors=[Auto-fixed Issues, Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_03_summary_deviations_from_plan": "Deviations from Plan" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L176 | neighbors=[Auto-fixed Issues, Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "27_dashboard_remainder_27_01_plan": "27-01-PLAN.md" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-01-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "27_dashboard_remainder_27_02_plan": "27-02-PLAN.md" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-02-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "27_dashboard_remainder_27_03_plan": "27-03-PLAN.md" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-03-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "27_dashboard_remainder_27_04_plan": "27-04-PLAN.md" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-04-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "27_dashboard_remainder_27_05_plan": "27-05-PLAN.md" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-05-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "27_dashboard_remainder_27_06_plan": "27-06-PLAN.md" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-06-PLAN.md:L1 | neighbors=[STRIDE Threat Register, Trust Boundaries]
- "adr_002": "ADR-002 (Neon Postgres)" | kind=entity | source=docs/ARCHITECTURE.md | neighbors=[Neon Postgres, DAL Gate]
- "adr_005": "ADR-005 (Multi-Tenancy)" | kind=entity | source=docs/ARCHITECTURE.md | neighbors=[Domain-Driven Design Bounded Contexts, DAL Gate]
- "agents_gsd_code_reviewer_agent": "gsd-code-reviewer.agent.md" | kind=entity | source=.github/agents/gsd-code-reviewer.agent.md:L1 | neighbors=[Issues to Detect, Three Review Modes]
- "agents_gsd_code_reviewer_md_agents_gsd_code_reviewer": "gsd-code-reviewer.md" | kind=entity | source=agents/gsd-code-reviewer.md:L1 | neighbors=[Issues to Detect, Three Review Modes]
- "agents_gsd_executor_agent": "gsd-executor.agent.md" | kind=entity | source=.github/agents/gsd-executor.agent.md:L1 | neighbors=[MVP+TDD Gate, Plan-Level TDD Gate Enforcement (type: …]
- "agents_gsd_executor_md_agents_gsd_executor": "gsd-executor.md" | kind=entity | source=agents/gsd-executor.md:L1 | neighbors=[MVP+TDD Gate, Plan-Level TDD Gate Enforcement (type: …]
- "agents_gsd_intel_updater_agent_completion_protocol": "Completion Protocol" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L307 | neighbors=[Context Quality Tiers, GSD Intel Updater]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_upstream_input": "Upstream Input" | kind=entity | source=agents/gsd-intel-updater.md:L43 | neighbors=[Config Gate, From `/gsd:map-codebase --query` Command]
- "agents_gsd_verifier_agent_step_4_verify_artifacts_three_levels": "Step 4: Verify Artifacts (Three Levels)" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L212 | neighbors=[gsd-verifier.agent.md, Final Artifact Status]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_4_verify_artifacts_three_levels": "Step 4: Verify Artifacts (Three Levels)" | kind=entity | source=agents/gsd-verifier.md:L210 | neighbors=[gsd-verifier.md, Final Artifact Status]
- "agents_skills_archive_impeccable_reference_adapt_md_reference_adapt_reference_material": "Reference Material" | kind=entity | source=.agents/skills_archive/impeccable/reference/adapt.md:L194 | neighbors=[adapt.md, Responsive Design]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-069.json

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
