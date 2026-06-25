# Node Description Batch 132 of 412

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

- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_assessment_a_design_review": "Assessment A: Design Review" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L42 | neighbors=[critique.md] | lang=pt
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_assessment_b_detector_browser_evidence": "Assessment B: Detector + Browser Evidence" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L55 | neighbors=[critique.md] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_assessment_orchestration": "Assessment Orchestration" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L28 | neighbors=[critique.md] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_cognitive_load_checklist": "Cognitive Load Checklist" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L305 | neighbors=[Cognitive Load Assessment] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_design_health_score": "Design Health Score" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L96 | neighbors=[Generate Combined Critique Report] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_extraneous_load_bad_design": "Extraneous Load: Bad Design" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L284 | neighbors=[Three Types of Cognitive Load] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_germane_load_learning_effort": "Germane Load: Learning Effort" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L294 | neighbors=[Three Types of Cognitive Load] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_hard_invariants": "Hard Invariants" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L5 | neighbors=[critique.md] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_intrinsic_load_the_task_itself": "Intrinsic Load: The Task Itself" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L275 | neighbors=[Three Types of Cognitive Load] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_issue_severity_p0_p3": "Issue Severity (P0–P3)" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L598 | neighbors=[Heuristics Scoring Guide] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_minor_observations": "Minor Observations" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L155 | neighbors=[Generate Combined Critique Report] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_overall_impression": "Overall Impression" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L127 | neighbors=[Generate Combined Critique Report] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_persist_the_snapshot": "Persist the Snapshot" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L177 | neighbors=[critique.md] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_persona_red_flags": "Persona Red Flags" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L142 | neighbors=[Generate Combined Critique Report] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_priority_issues": "Priority Issues" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L133 | neighbors=[Generate Combined Critique Report] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_project_specific_personas": "Project-Specific Personas" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L772 | neighbors=[Persona-Based Design Testing] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_purpose": "Purpose" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L1 | neighbors=[critique.md] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_questions_to_consider": "Questions to Consider" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L158 | neighbors=[Generate Combined Critique Report] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_score_summary": "Score Summary" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L584 | neighbors=[Heuristics Scoring Guide] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_selecting_personas": "Selecting Personas" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L757 | neighbors=[Persona-Based Design Testing] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_setup": "Setup" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L15 | neighbors=[critique.md] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_the_working_memory_rule": "The Working Memory Rule" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L322 | neighbors=[Cognitive Load Assessment] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_what_s_working": "What's Working" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L130 | neighbors=[Generate Combined Critique Report] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_appropriate_to_context": "Appropriate to Context" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L60 | neighbors=[Delight Principles] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_assess_delight_opportunities": "Assess Delight Opportunities" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L15 | neighbors=[delight.md] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_celebration_moments": "Celebration Moments" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L248 | neighbors=[Delight Techniques] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_compound_over_time": "Compound Over Time" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L66 | neighbors=[Delight Principles] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_delight_amplifies_never_blocks": "Delight Amplifies, Never Blocks" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L48 | neighbors=[Delight Principles] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_easter_eggs_hidden_delights": "Easter Eggs & Hidden Delights" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L208 | neighbors=[Delight Techniques] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_illustrations_visual_personality": "Illustrations & Visual Personality" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L146 | neighbors=[Delight Techniques] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_implementation_patterns": "Implementation Patterns" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L263 | neighbors=[delight.md] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_loading_waiting_states": "Loading & Waiting States" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L229 | neighbors=[Delight Techniques] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_micro_interactions_animation": "Micro-interactions & Animation" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L76 | neighbors=[Delight Techniques] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_personality_in_copy": "Personality in Copy" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L115 | neighbors=[Delight Techniques] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_register": "Register" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L7 | neighbors=[delight.md] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_satisfying_interactions": "Satisfying Interactions" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L167 | neighbors=[Delight Techniques] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_sound_design": "Sound Design" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L193 | neighbors=[Delight Techniques] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_surprise_and_discovery": "Surprise and Discovery" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L54 | neighbors=[Delight Principles] | lang=en
- "agents_skills_archive_impeccable_reference_delight_md_reference_delight_verify_delight_quality": "Verify Delight Quality" | kind=entity | source=.agents/skills_archive/impeccable/reference/delight.md:L291 | neighbors=[delight.md] | lang=en
- "agents_skills_archive_impeccable_reference_distill_md_reference_distill_assess_current_state": "Assess Current State" | kind=entity | source=.agents/skills_archive/impeccable/reference/distill.md:L6 | neighbors=[distill.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-131.json

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
