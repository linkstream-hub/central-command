# Node Description Batch 374 of 412

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

- "specs_spec_p1_4_paga_unit_tests_task_6_document_the_gas_divergence": "Task 6 — Document the GAS divergence" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L300 | neighbors=[TASKS] | lang=en
- "specs_spec_p1_4_paga_unit_tests_task_7_tsc_diff": "Task 7 — tsc + diff" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L314 | neighbors=[TASKS] | lang=en
- "specs_spec_p1_4_paga_unit_tests_task_8_separate_session_test_sprint": "Task 8 (separate session) — Test sprint" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L325 | neighbors=[TASKS] | lang=en
- "specs_spec_p1_4_paga_unit_tests_task_9_merge_after_clear_to_merge": "Task 9 — Merge after \"Clear to merge\"" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L337 | neighbors=[TASKS] | lang=en
- "specs_spec_p1_4_paga_unit_tests_two_implementations_exist_both_must_be_tested": "Two implementations exist — both must be tested" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L19 | neighbors=[CONTEXT] | lang=en
- "specs_spec_p2_1_infra_hardening_context": "CONTEXT" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L7 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…] | lang=en
- "specs_spec_p2_1_infra_hardening_merge_gate": "MERGE GATE" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L182 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…] | lang=en
- "specs_spec_p2_1_infra_hardening_phase_2_opener_ci_dependency_security_dependabot_apps_script_trigger_audit": "Phase 2 opener. CI dependency security + Dependabot + Apps Script trigger audit." | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L2 | neighbors=[SPEC_P2_1_INFRA_HARDENING.md] | lang=en
- "specs_spec_p2_1_infra_hardening_spec_p2_1_infrastructure_hardening": "SPEC: P2-1 — Infrastructure Hardening" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L1 | neighbors=[SPEC_P2_1_INFRA_HARDENING.md] | lang=en
- "specs_spec_p2_1_infra_hardening_task_1_add_dependabot_config": "Task 1 — Add Dependabot config" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L20 | neighbors=[TASKS] | lang=en
- "specs_spec_p2_1_infra_hardening_task_2_audit_and_fix_npm_high_vulnerabilities": "Task 2 — Audit and fix npm high vulnerabilities" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L47 | neighbors=[TASKS] | lang=en
- "specs_spec_p2_1_infra_hardening_task_3_harden_the_ci_audit_gate": "Task 3 — Harden the CI audit gate" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L71 | neighbors=[TASKS] | lang=en
- "specs_spec_p2_1_infra_hardening_task_4_apps_script_trigger_inventory": "Task 4 — Apps Script trigger inventory" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L102 | neighbors=[TASKS] | lang=en
- "specs_spec_p2_1_infra_hardening_task_5_document_trigger_inventory_in_architecture_md": "Task 5 — Document trigger inventory in ARCHITECTURE.md" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L134 | neighbors=[TASKS] | lang=en
- "specs_spec_p2_1_infra_hardening_task_6_tsc_diff": "Task 6 — tsc + diff" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L155 | neighbors=[TASKS] | lang=en
- "specs_spec_p2_1_infra_hardening_task_7_separate_session_test_sprint": "Task 7 (separate session) — Test sprint" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L166 | neighbors=[TASKS] | lang=en
- "specs_spec_p2_1_infra_hardening_task_8_merge_after_clear_to_merge": "Task 8 — Merge after \"Clear to merge\"" | kind=entity | source=specs/SPEC_P2_1_INFRA_HARDENING.md:L176 | neighbors=[TASKS] | lang=en
- "specs_spec_p2_2_compliance_activation_branch_feat_p2_2_compliance_activation": "Branch: feat/p2-2-compliance-activation" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L2 | neighbors=[SPEC_P2_2_COMPLIANCE_ACTIVATION.md] | lang=en
- "specs_spec_p2_2_compliance_activation_brandon_actions_do_these_before_ag_starts_they_unblock_ag_tasks": "BRANDON ACTIONS — do these BEFORE AG starts (they unblock AG tasks)" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L18 | neighbors=[Priority: CRITICAL — PAGA exposure accu…] | lang=pt
- "specs_spec_p2_2_compliance_activation_expected_file_changes": "EXPECTED FILE CHANGES" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L165 | neighbors=[Priority: CRITICAL — PAGA exposure accu…] | lang=en
- "specs_spec_p2_2_compliance_activation_goal": "GOAL" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L7 | neighbors=[Priority: CRITICAL — PAGA exposure accu…] | lang=en
- "specs_spec_p2_2_compliance_activation_post_sprint_state": "POST-SPRINT STATE" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L187 | neighbors=[Priority: CRITICAL — PAGA exposure accu…] | lang=en
- "specs_spec_p2_2_compliance_activation_spec_p2_2_compliance_activation_infrastructure_truth": "SPEC P2-2 — Compliance Activation + Infrastructure Truth" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L1 | neighbors=[SPEC_P2_2_COMPLIANCE_ACTIVATION.md] | lang=en
- "specs_spec_p2_2_compliance_activation_task_1_branch_setup_mandatory_report_output": "Task 1 — Branch setup (mandatory, report output)" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L50 | neighbors=[AG TASKS] | lang=en
- "specs_spec_p2_2_compliance_activation_task_2_add_compliance_webhook_call_to_techpwa_gs_signattestation": "Task 2 — Add compliance webhook call to TechPWA.gs signAttestation()" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L58 | neighbors=[AG TASKS] | lang=en
- "specs_spec_p2_2_compliance_activation_task_3_add_compliance_webhook_call_to_techpwa_gs_handleclockout": "Task 3 — Add compliance webhook call to TechPWA.gs handleClockOut()" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L92 | neighbors=[AG TASKS] | lang=en
- "specs_spec_p2_2_compliance_activation_task_4_update_architecture_md_gas_trigger_inventory": "Task 4 — Update ARCHITECTURE.md GAS trigger inventory" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L101 | neighbors=[AG TASKS] | lang=en
- "specs_spec_p2_2_compliance_activation_task_5_tsc_diff_push": "Task 5 — tsc, diff, push" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L107 | neighbors=[AG TASKS] | lang=en
- "specs_spec_p2_2_compliance_activation_task_6_separate_test_sprint_verify_compliance_webhook_fires": "Task 6 (separate test sprint) — Verify compliance webhook fires" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L124 | neighbors=[Priority: CRITICAL — PAGA exposure accu…] | lang=en
- "specs_spec_p2_2_compliance_activation_task_7_test_sprint_confirm_flowise_decommissioned": "Task 7 (test sprint) — Confirm Flowise decommissioned" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L153 | neighbors=[Priority: CRITICAL — PAGA exposure accu…] | lang=en
- "specs_spec_p2_2_compliance_activation_task_8_merge_gate": "Task 8 — Merge gate" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L159 | neighbors=[Priority: CRITICAL — PAGA exposure accu…] | lang=en
- "specs_spec_p2_2_compliance_activation_what_this_sprint_does_not_include": "WHAT THIS SPRINT DOES NOT INCLUDE" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md:L178 | neighbors=[Priority: CRITICAL — PAGA exposure accu…] | lang=en
- "specs_spec_p2a_ci_hardening_closes_p2_1_npm_audit_p2_5_nightly_e2e_cron_p2_8_gas_trigger_inventory": "Closes P2-1 (npm audit), P2-5 (nightly E2E cron), P2-8 (GAS trigger inventory)." | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L2 | neighbors=[SPEC_P2A_CI_HARDENING.md] | lang=en
- "specs_spec_p2a_ci_hardening_context": "CONTEXT" | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L8 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…] | lang=en
- "specs_spec_p2a_ci_hardening_merge_gate": "MERGE GATE" | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L234 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…] | lang=en
- "specs_spec_p2a_ci_hardening_p2_2_dependabot_is_already_done_github_dependabot_yml_confirmed_in_repo": "P2-2 (Dependabot) is already done — .github/dependabot.yml confirmed in repo." | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L3 | neighbors=[SPEC_P2A_CI_HARDENING.md] | lang=en
- "specs_spec_p2a_ci_hardening_spec_p2a_ci_hardening": "SPEC: P2A — CI Hardening" | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L1 | neighbors=[SPEC_P2A_CI_HARDENING.md] | lang=pt
- "specs_spec_p2a_ci_hardening_task_1_add_npm_audit_step_to_ci_yml": "Task 1 — Add `npm audit` step to `ci.yml`" | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L27 | neighbors=[TASKS] | lang=en
- "specs_spec_p2a_ci_hardening_task_2_add_nightly_e2e_cron_to_e2e_yml": "Task 2 — Add nightly E2E cron to `e2e.yml`" | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L92 | neighbors=[TASKS] | lang=en
- "specs_spec_p2a_ci_hardening_task_3_document_gas_trigger_inventory_in_architecture_md": "Task 3 — Document GAS trigger inventory in `ARCHITECTURE.md`" | kind=entity | source=specs/SPEC_P2A_CI_HARDENING.md:L122 | neighbors=[TASKS] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-373.json

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
