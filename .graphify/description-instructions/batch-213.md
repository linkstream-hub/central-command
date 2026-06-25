# Node Description Batch 214 of 412

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

- "github_skills_archive_impeccable_reference_critique_md_reference_critique_7_flexibility_and_efficiency_of_use": "7. Flexibility and Efficiency of Use" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L479 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_7_the_multi_task_demand": "7. The Multi-Task Demand" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L343 | neighbors=[Common Cognitive Load Violations] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_8_aesthetic_and_minimalist_design": "8. Aesthetic and Minimalist Design" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L499 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_8_the_context_switch": "8. The Context Switch" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L347 | neighbors=[Common Cognitive Load Violations] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_9_help_users_recognize_diagnose_and_recover_from_errors": "9. Help Users Recognize, Diagnose, and Recover from Errors" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L519 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_action_summary": "Action Summary" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L214 | neighbors=[Recommended Actions] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_anti_patterns_verdict": "Anti-Patterns Verdict" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L103 | neighbors=[Generate Combined Critique Report] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_ask_the_user": "Ask the User" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L190 | neighbors=[critique.md] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_assessment_a_design_review": "Assessment A: Design Review" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L34 | neighbors=[critique.md] | lang=pt
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_assessment_b_detector_browser_evidence": "Assessment B: Detector + Browser Evidence" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L47 | neighbors=[critique.md] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_assessment_orchestration": "Assessment Orchestration" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L28 | neighbors=[critique.md] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_cognitive_load_checklist": "Cognitive Load Checklist" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L282 | neighbors=[Cognitive Load Assessment] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_design_health_score": "Design Health Score" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L82 | neighbors=[Generate Combined Critique Report] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_extraneous_load_bad_design": "Extraneous Load: Bad Design" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L261 | neighbors=[Three Types of Cognitive Load] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_germane_load_learning_effort": "Germane Load: Learning Effort" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L271 | neighbors=[Three Types of Cognitive Load] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_hard_invariants": "Hard Invariants" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L5 | neighbors=[critique.md] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_intrinsic_load_the_task_itself": "Intrinsic Load: The Task Itself" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L252 | neighbors=[Three Types of Cognitive Load] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_issue_severity_p0_p3": "Issue Severity (P0–P3)" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L575 | neighbors=[Heuristics Scoring Guide] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_minor_observations": "Minor Observations" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L141 | neighbors=[Generate Combined Critique Report] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_overall_impression": "Overall Impression" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L113 | neighbors=[Generate Combined Critique Report] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_persist_the_snapshot": "Persist the Snapshot" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L158 | neighbors=[critique.md] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_persona_red_flags": "Persona Red Flags" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L128 | neighbors=[Generate Combined Critique Report] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_priority_issues": "Priority Issues" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L119 | neighbors=[Generate Combined Critique Report] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_project_specific_personas": "Project-Specific Personas" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L749 | neighbors=[Persona-Based Design Testing] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_purpose": "Purpose" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L1 | neighbors=[critique.md] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_questions_to_consider": "Questions to Consider" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L144 | neighbors=[Generate Combined Critique Report] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_score_summary": "Score Summary" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L561 | neighbors=[Heuristics Scoring Guide] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_selecting_personas": "Selecting Personas" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L734 | neighbors=[Persona-Based Design Testing] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_setup": "Setup" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L15 | neighbors=[critique.md] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_the_working_memory_rule": "The Working Memory Rule" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L299 | neighbors=[Cognitive Load Assessment] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_what_s_working": "What's Working" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L116 | neighbors=[Generate Combined Critique Report] | lang=en
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_appropriate_to_context": "Appropriate to Context" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L60 | neighbors=[Delight Principles] | lang=en
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_assess_delight_opportunities": "Assess Delight Opportunities" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L15 | neighbors=[delight.md] | lang=en
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_celebration_moments": "Celebration Moments" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L248 | neighbors=[Delight Techniques] | lang=en
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_compound_over_time": "Compound Over Time" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L66 | neighbors=[Delight Principles] | lang=en
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_delight_amplifies_never_blocks": "Delight Amplifies, Never Blocks" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L48 | neighbors=[Delight Principles] | lang=en
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_easter_eggs_hidden_delights": "Easter Eggs & Hidden Delights" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L208 | neighbors=[Delight Techniques] | lang=en
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_illustrations_visual_personality": "Illustrations & Visual Personality" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L146 | neighbors=[Delight Techniques] | lang=en
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_implementation_patterns": "Implementation Patterns" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L263 | neighbors=[delight.md] | lang=en
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_loading_waiting_states": "Loading & Waiting States" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L229 | neighbors=[Delight Techniques] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-213.json

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
