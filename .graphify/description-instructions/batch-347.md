# Node Description Batch 348 of 412

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

- "references_phase_argument_parsing_manual_normalization_legacy": "Manual Normalization (Legacy)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/phase-argument-parsing.md:L28 | neighbors=[Phase Argument Parsing]
- "references_phase_argument_parsing_using_gsd_tools": "Using gsd-tools" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/phase-argument-parsing.md:L12 | neighbors=[Phase Argument Parsing]
- "references_phase_argument_parsing_validation": "Validation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/phase-argument-parsing.md:L43 | neighbors=[Phase Argument Parsing]
- "references_planner_antipatterns": "planner-antipatterns.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-antipatterns.md:L1 | neighbors=[Planner Anti-Patterns and Specificity E…]
- "references_planner_antipatterns_bad_asking_human_to_automate": "Bad — Asking human to automate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-antipatterns.md:L8 | neighbors=[Checkpoint Anti-Patterns]
- "references_planner_antipatterns_bad_mixing_checkpoints_with_implementation": "Bad — Mixing checkpoints with implementation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-antipatterns.md:L42 | neighbors=[Checkpoint Anti-Patterns]
- "references_planner_antipatterns_bad_reflexive_summary_chaining": "Bad — Reflexive SUMMARY chaining" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-antipatterns.md:L60 | neighbors=[Context Section Anti-Patterns]
- "references_planner_antipatterns_bad_too_many_checkpoints": "Bad — Too many checkpoints" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-antipatterns.md:L19 | neighbors=[Checkpoint Anti-Patterns]
- "references_planner_antipatterns_good_selective_context": "Good — Selective context" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-antipatterns.md:L72 | neighbors=[Context Section Anti-Patterns]
- "references_planner_antipatterns_good_single_verification_checkpoint": "Good — Single verification checkpoint" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-antipatterns.md:L30 | neighbors=[Checkpoint Anti-Patterns]
- "references_planner_antipatterns_scope_reduction_anti_patterns": "Scope Reduction Anti-Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-antipatterns.md:L82 | neighbors=[Planner Anti-Patterns and Specificity E…]
- "references_planner_antipatterns_specificity_examples": "Specificity Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-antipatterns.md:L46 | neighbors=[Planner Anti-Patterns and Specificity E…]
- "references_planner_chunked": "planner-chunked.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-chunked.md:L1 | neighbors=[Chunked Mode Return Formats]
- "references_planner_chunked_outline_only": "outline-only" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-chunked.md:L9 | neighbors=[Modes]
- "references_planner_chunked_resume_behaviour": "Resume Behaviour" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-chunked.md:L45 | neighbors=[Chunked Mode Return Formats]
- "references_planner_chunked_single_plan": "single-plan" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-chunked.md:L28 | neighbors=[Modes]
- "references_planner_gap_closure": "planner-gap-closure.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-gap-closure.md:L1 | neighbors=[Gap Closure Mode — Planner Reference]
- "references_planner_gap_closure_gap_closure_mode_planner_reference": "Gap Closure Mode — Planner Reference" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-gap-closure.md:L1 | neighbors=[planner-gap-closure.md]
- "references_planner_human_verify_mode": "planner-human-verify-mode.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-human-verify-mode.md:L1 | neighbors=[Planner — Human Verification Mode]
- "references_planner_human_verify_mode_compatibility_with_other_modes": "Compatibility with other modes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-human-verify-mode.md:L53 | neighbors=[Planner — Human Verification Mode]
- "references_planner_human_verify_mode_end_of_phase_default_issue_3309": "`end-of-phase` (default — issue #3309)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-human-verify-mode.md:L7 | neighbors=[The two modes]
- "references_planner_human_verify_mode_mid_flight_opt_back_in_pre_3309_behavior": "`mid-flight` (opt-back-in — pre-#3309 behavior)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-human-verify-mode.md:L32 | neighbors=[The two modes]
- "references_planner_human_verify_mode_what_is_not_affected": "What is *not* affected" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-human-verify-mode.md:L49 | neighbors=[Planner — Human Verification Mode]
- "references_planner_mvp_mode": "planner-mvp-mode.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-mvp-mode.md:L1 | neighbors=[Planner — MVP Mode (Vertical Slice Stra…]
- "references_planner_mvp_mode_acceptance_test_for_your_plan": "Acceptance Test for Your Plan" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-mvp-mode.md:L51 | neighbors=[Planner — MVP Mode (Vertical Slice Stra…]
- "references_planner_mvp_mode_anti_patterns_to_reject": "Anti-Patterns to Reject" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-mvp-mode.md:L45 | neighbors=[Planner — MVP Mode (Vertical Slice Stra…]
- "references_planner_mvp_mode_core_rule": "Core Rule" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-mvp-mode.md:L5 | neighbors=[Planner — MVP Mode (Vertical Slice Stra…]
- "references_planner_mvp_mode_task_order_pattern": "Task Order Pattern" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-mvp-mode.md:L19 | neighbors=[Planner — MVP Mode (Vertical Slice Stra…]
- "references_planner_mvp_mode_walking_skeleton_mode_walking_skeleton_true": "Walking Skeleton Mode (`WALKING_SKELETON=true`)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-mvp-mode.md:L31 | neighbors=[Planner — MVP Mode (Vertical Slice Stra…]
- "references_planner_reviews": "planner-reviews.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-reviews.md:L1 | neighbors=[Reviews Mode — Planner Reference]
- "references_planner_reviews_step_1_load_reviews_md": "Step 1: Load REVIEWS.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-reviews.md:L7 | neighbors=[Reviews Mode — Planner Reference]
- "references_planner_reviews_step_2_categorize_feedback": "Step 2: Categorize Feedback" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-reviews.md:L13 | neighbors=[Reviews Mode — Planner Reference]
- "references_planner_reviews_step_3_plan_fresh_with_review_context": "Step 3: Plan Fresh with Review Context" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-reviews.md:L19 | neighbors=[Reviews Mode — Planner Reference]
- "references_planner_reviews_step_4_return": "Step 4: Return" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-reviews.md:L25 | neighbors=[Reviews Mode — Planner Reference]
- "references_planner_revision": "planner-revision.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-revision.md:L1 | neighbors=[Revision Mode — Planner Reference]
- "references_planner_revision_step_1_load_existing_plans": "Step 1: Load Existing Plans" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-revision.md:L7 | neighbors=[Revision Mode — Planner Reference]
- "references_planner_revision_step_2_parse_checker_issues": "Step 2: Parse Checker Issues" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-revision.md:L15 | neighbors=[Revision Mode — Planner Reference]
- "references_planner_revision_step_3_revision_strategy": "Step 3: Revision Strategy" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-revision.md:L30 | neighbors=[Revision Mode — Planner Reference]
- "references_planner_revision_step_4_make_targeted_updates": "Step 4: Make Targeted Updates" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-revision.md:L41 | neighbors=[Revision Mode — Planner Reference]
- "references_planner_revision_step_5_validate_changes": "Step 5: Validate Changes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/planner-revision.md:L47 | neighbors=[Revision Mode — Planner Reference]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-347.json

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
