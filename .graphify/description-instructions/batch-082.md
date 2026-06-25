# Node Description Batch 83 of 412

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

- "02_core_loop_verification_02_context": "02-CONTEXT.md" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L1 | neighbors=[Phase 2: Core Loop Verification — Conte…]
- "02_core_loop_verification_02_context_comms_fix_code_state": "Comms fix — code state" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L48 | neighbors=[Canonical References]
- "02_core_loop_verification_02_context_deferred_ideas": "Deferred Ideas" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L92 | neighbors=[Phase 2: Core Loop Verification — Conte…]
- "02_core_loop_verification_02_context_established_patterns": "Established Patterns" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L69 | neighbors=[Existing Code Insights]
- "02_core_loop_verification_02_context_evidence_capture": "Evidence capture" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L30 | neighbors=[Implementation Decisions]
- "02_core_loop_verification_02_context_gap_protocol": "Gap protocol" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L27 | neighbors=[Implementation Decisions]
- "02_core_loop_verification_02_context_integration_points": "Integration Points" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L73 | neighbors=[Existing Code Insights]
- "02_core_loop_verification_02_context_phase_boundary": "Phase Boundary" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L7 | neighbors=[Phase 2: Core Loop Verification — Conte…]
- "02_core_loop_verification_02_context_phase_scope_and_requirements": "Phase scope and requirements" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L41 | neighbors=[Canonical References]
- "02_core_loop_verification_02_context_pre_flight_before_walkthrough_begins": "Pre-flight (before walkthrough begins)" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L16 | neighbors=[Implementation Decisions]
- "02_core_loop_verification_02_context_pre_flight_bootstrap_gap": "Pre-flight — bootstrap gap" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L45 | neighbors=[Canonical References]
- "02_core_loop_verification_02_context_reusable_assets": "Reusable Assets" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L64 | neighbors=[Existing Code Insights]
- "02_core_loop_verification_02_context_specific_ideas": "Specific Ideas" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L81 | neighbors=[Phase 2: Core Loop Verification — Conte…]
- "02_core_loop_verification_02_context_tenant_email_data_flow": "Tenant email — data flow" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L53 | neighbors=[Canonical References]
- "02_core_loop_verification_02_context_verification_structure": "Verification structure" | kind=entity | source=.planning/phases/02-core-loop-verification/02-CONTEXT.md:L20 | neighbors=[Implementation Decisions]
- "02_core_loop_verification_02_discussion_log": "02-DISCUSSION-LOG.md" | kind=entity | source=.planning/phases/02-core-loop-verification/02-DISCUSSION-LOG.md:L1 | neighbors=[Phase 2: Core Loop Verification — Discu…]
- "02_core_loop_verification_02_discussion_log_deferred_ideas": "Deferred Ideas" | kind=entity | source=.planning/phases/02-core-loop-verification/02-DISCUSSION-LOG.md:L39 | neighbors=[Phase 2: Core Loop Verification — Discu…]
- "02_core_loop_verification_02_discussion_log_evidence_format": "Evidence format" | kind=entity | source=.planning/phases/02-core-loop-verification/02-DISCUSSION-LOG.md:L31 | neighbors=[Decision Rationale]
- "02_core_loop_verification_02_discussion_log_gap_protocol": "Gap protocol" | kind=entity | source=.planning/phases/02-core-loop-verification/02-DISCUSSION-LOG.md:L28 | neighbors=[Decision Rationale]
- "02_core_loop_verification_02_discussion_log_gray_areas_identified": "Gray Areas Identified" | kind=entity | source=.planning/phases/02-core-loop-verification/02-DISCUSSION-LOG.md:L8 | neighbors=[Phase 2: Core Loop Verification — Discu…]
- "02_core_loop_verification_02_discussion_log_pre_flight": "Pre-flight" | kind=entity | source=.planning/phases/02-core-loop-verification/02-DISCUSSION-LOG.md:L22 | neighbors=[Decision Rationale]
- "02_core_loop_verification_02_discussion_log_verification_structure": "Verification structure" | kind=entity | source=.planning/phases/02-core-loop-verification/02-DISCUSSION-LOG.md:L25 | neighbors=[Decision Rationale]
- "02_core_loop_verification_02_discussion_log_walkthrough_runner": "Walkthrough runner" | kind=entity | source=.planning/phases/02-core-loop-verification/02-DISCUSSION-LOG.md:L34 | neighbors=[Decision Rationale]
- "02_core_loop_verification_plan": "PLAN.md" | kind=entity | source=.planning/phases/02-core-loop-verification/PLAN.md:L1 | neighbors=[PLAN.md — Phase 2: Core Loop Verificati…]
- "02_core_loop_verification_plan_acceptance_criteria": "Acceptance Criteria" | kind=entity | source=.planning/phases/02-core-loop-verification/PLAN.md:L264 | neighbors=[PLAN.md — Phase 2: Core Loop Verificati…]
- "02_core_loop_verification_plan_phase_boundary": "Phase Boundary" | kind=entity | source=.planning/phases/02-core-loop-verification/PLAN.md:L10 | neighbors=[PLAN.md — Phase 2: Core Loop Verificati…]
- "02_core_loop_verification_plan_pre_flight_state": "Pre-flight State" | kind=entity | source=.planning/phases/02-core-loop-verification/PLAN.md:L27 | neighbors=[PLAN.md — Phase 2: Core Loop Verificati…]
- "02_core_loop_verification_plan_risks": "Risks" | kind=entity | source=.planning/phases/02-core-loop-verification/PLAN.md:L16 | neighbors=[PLAN.md — Phase 2: Core Loop Verificati…]
- "02_core_loop_verification_plan_verification_protocol_gsd_plan_checker": "Verification Protocol (gsd-plan-checker)" | kind=entity | source=.planning/phases/02-core-loop-verification/PLAN.md:L276 | neighbors=[PLAN.md — Phase 2: Core Loop Verificati…]
- "02_core_loop_verification_plan_wave_0_pre_flight": "Wave 0 — Pre-flight" | kind=entity | source=.planning/phases/02-core-loop-verification/PLAN.md:L50 | neighbors=[Tasks]
- "02_core_loop_verification_plan_wave_1_lead_ingestion_production_read_only": "Wave 1 — Lead Ingestion (Production, read-only)" | kind=entity | source=.planning/phases/02-core-loop-verification/PLAN.md:L103 | neighbors=[Tasks]
- "02_core_loop_verification_plan_wave_2_coordination": "Wave 2 — Coordination" | kind=entity | source=.planning/phases/02-core-loop-verification/PLAN.md:L139 | neighbors=[Tasks]
- "02_core_loop_verification_plan_wave_3_dispatch_localhost_write_path": "Wave 3 — Dispatch (Localhost, write-path)" | kind=entity | source=.planning/phases/02-core-loop-verification/PLAN.md:L188 | neighbors=[Tasks]
- "02_core_loop_verification_plan_wave_4_close": "Wave 4 — Close" | kind=entity | source=.planning/phases/02-core-loop-verification/PLAN.md:L228 | neighbors=[Tasks]
- "02_core_loop_verification_plan_wave_structure": "Wave Structure" | kind=entity | source=.planning/phases/02-core-loop-verification/PLAN.md:L36 | neighbors=[PLAN.md — Phase 2: Core Loop Verificati…]
- "03_gap_remediation_03_01_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/03-gap-remediation/03-01-PLAN.md:L293 | neighbors=[03-01-PLAN.md]
- "03_gap_remediation_03_01_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/03-gap-remediation/03-01-PLAN.md:L287 | neighbors=[03-01-PLAN.md]
- "03_gap_remediation_03_01_summary": "03-01-SUMMARY.md" | kind=entity | source=.planning/phases/03-gap-remediation/03-01-SUMMARY.md:L1 | neighbors=[Phase 03 Plan 01 Summary]
- "03_gap_remediation_03_01_summary_execution_overview": "Execution Overview" | kind=entity | source=.planning/phases/03-gap-remediation/03-01-SUMMARY.md:L3 | neighbors=[Phase 03 Plan 01 Summary]
- "03_gap_remediation_03_01_summary_final_steps": "Final Steps" | kind=entity | source=.planning/phases/03-gap-remediation/03-01-SUMMARY.md:L19 | neighbors=[Phase 03 Plan 01 Summary]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-082.json

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
