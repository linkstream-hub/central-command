# Node Description Batch 172 of 412

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

- "auth_block_1_auth_login_bb41b_alid_badge_pin_reaches_jobs_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bb41b-alid-badge-PIN-reaches-jobs-chromium/error-context.md:L56 | neighbors=[error-context.md] | lang=en
- "auth_block_1_auth_login_bb41b_alid_badge_pin_reaches_jobs_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bb41b-alid-badge-PIN-reaches-jobs-mobile/error-context.md:L12 | neighbors=[error-context.md] | lang=en
- "auth_block_1_auth_login_bb41b_alid_badge_pin_reaches_jobs_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bb41b-alid-badge-PIN-reaches-jobs-mobile/error-context.md:L1 | neighbors=[error-context.md] | lang=en
- "auth_block_1_auth_login_bb41b_alid_badge_pin_reaches_jobs_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bb41b-alid-badge-PIN-reaches-jobs-mobile/error-context.md:L7 | neighbors=[error-context.md] | lang=en
- "auth_block_1_auth_login_d9389_exists_on_dispatch_hostname_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--d9389-exists-on-dispatch-hostname-mobile/error-context.md:L12 | neighbors=[error-context.md] | lang=en
- "auth_block_1_auth_login_d9389_exists_on_dispatch_hostname_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--d9389-exists-on-dispatch-hostname-mobile/error-context.md:L1 | neighbors=[error-context.md] | lang=en
- "auth_block_1_auth_login_d9389_exists_on_dispatch_hostname_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--d9389-exists-on-dispatch-hostname-mobile/error-context.md:L7 | neighbors=[error-context.md] | lang=en
- "billing_page_billingpage": "BillingPage()" | kind=code-symbol | source=tech-pwa/src/app/billing/page.tsx:L6 | neighbors=[page.tsx] | lang=en
- "bounded_contexts": "Domain-Driven Design Bounded Contexts" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md | neighbors=[ADR-005 (Multi-Tenancy)] | lang=en
- "calendar_page_calendarskeleton": "CalendarSkeleton()" | kind=code-symbol | source=tech-pwa/src/app/calendar/page.tsx:L312 | neighbors=[page.tsx] | lang=en
- "caveman_commit_readme": "README.md" | kind=entity | source=.github/skills/caveman-commit/README.md:L1 | neighbors=[caveman-commit] | lang=en
- "caveman_commit_readme_example_output": "Example output" | kind=entity | source=.github/skills/caveman-commit/README.md:L19 | neighbors=[caveman-commit] | lang=en
- "caveman_commit_readme_how_to_invoke": "How to invoke" | kind=entity | source=.github/skills/caveman-commit/README.md:L11 | neighbors=[caveman-commit] | lang=en
- "caveman_commit_readme_see_also": "See also" | kind=entity | source=.github/skills/caveman-commit/README.md:L41 | neighbors=[caveman-commit] | lang=en
- "caveman_commit_readme_what_it_does": "What it does" | kind=entity | source=.github/skills/caveman-commit/README.md:L5 | neighbors=[caveman-commit] | lang=en
- "caveman_commit_skill_auto_clarity": "Auto-Clarity" | kind=entity | source=.github/skills/caveman-commit/SKILL.md:L59 | neighbors=[SKILL.md] | lang=en
- "caveman_commit_skill_boundaries": "Boundaries" | kind=entity | source=.github/skills/caveman-commit/SKILL.md:L63 | neighbors=[SKILL.md] | lang=en
- "caveman_commit_skill_examples": "Examples" | kind=entity | source=.github/skills/caveman-commit/SKILL.md:L36 | neighbors=[SKILL.md] | lang=en
- "caveman_commit_skill_rules": "Rules" | kind=entity | source=.github/skills/caveman-commit/SKILL.md:L12 | neighbors=[SKILL.md] | lang=en
- "caveman_compress_readme_benchmarks": "Benchmarks" | kind=entity | source=.github/skills/caveman-compress/README.md:L30 | neighbors=[README.md] | lang=en
- "caveman_compress_readme_how_it_work": "How It Work" | kind=entity | source=.github/skills/caveman-compress/README.md:L106 | neighbors=[README.md] | lang=en
- "caveman_compress_readme_img_src_docs_assets_dancing_rock_svg_width_20_height_20_alt_rock_caveman_285_tokens": "<img src=\"../../docs/assets/dancing-rock.svg\" width=\"20\" height=\"20\" alt=\"rock\"…" | kind=entity | source=.github/skills/caveman-compress/README.md:L58 | neighbors=[Before / After] | lang=en
- "caveman_compress_readme_install": "Install" | kind=entity | source=.github/skills/caveman-compress/README.md:L72 | neighbors=[README.md] | lang=en
- "caveman_compress_readme_original_706_tokens": "📄 Original (706 tokens)" | kind=entity | source=.github/skills/caveman-compress/README.md:L51 | neighbors=[Before / After] | lang=en
- "caveman_compress_readme_part_of_caveman": "Part of Caveman" | kind=entity | source=.github/skills/caveman-compress/README.md:L158 | neighbors=[README.md] | lang=en
- "caveman_compress_readme_security": "Security" | kind=entity | source=.github/skills/caveman-compress/README.md:L68 | neighbors=[README.md] | lang=en
- "caveman_compress_readme_what_files_work": "What files work" | kind=entity | source=.github/skills/caveman-compress/README.md:L97 | neighbors=[Usage] | lang=en
- "caveman_compress_readme_what_is_preserved": "What Is Preserved" | kind=entity | source=.github/skills/caveman-compress/README.md:L129 | neighbors=[README.md] | lang=en
- "caveman_compress_readme_what_it_do": "What It Do" | kind=entity | source=.github/skills/caveman-compress/README.md:L17 | neighbors=[README.md] | lang=en
- "caveman_compress_readme_why_this_matter": "Why This Matter" | kind=entity | source=.github/skills/caveman-compress/README.md:L143 | neighbors=[README.md] | lang=en
- "caveman_compress_security": "SECURITY.md" | kind=entity | source=.github/skills/caveman-compress/SECURITY.md:L1 | neighbors=[Security] | lang=en
- "caveman_compress_security_auth_behavior": "Auth behavior" | kind=entity | source=.github/skills/caveman-compress/SECURITY.md:L21 | neighbors=[Snyk High Risk Rating] | lang=en
- "caveman_compress_security_file_size_limit": "File size limit" | kind=entity | source=.github/skills/caveman-compress/SECURITY.md:L25 | neighbors=[Snyk High Risk Rating] | lang=en
- "caveman_compress_security_reporting_a_vulnerability": "Reporting a vulnerability" | kind=entity | source=.github/skills/caveman-compress/SECURITY.md:L29 | neighbors=[Snyk High Risk Rating] | lang=pt
- "caveman_compress_security_what_the_skill_does_not_do": "What the skill does NOT do" | kind=entity | source=.github/skills/caveman-compress/SECURITY.md:L13 | neighbors=[Snyk High Risk Rating] | lang=en
- "caveman_compress_security_what_triggers_the_rating": "What triggers the rating" | kind=entity | source=.github/skills/caveman-compress/SECURITY.md:L7 | neighbors=[Snyk High Risk Rating] | lang=en
- "caveman_compress_skill": "SKILL.md" | kind=entity | source=.github/skills/caveman-compress/SKILL.md:L1 | neighbors=[Caveman Compress] | lang=en
- "caveman_compress_skill_boundaries": "Boundaries" | kind=entity | source=.github/skills/caveman-compress/SKILL.md:L104 | neighbors=[Caveman Compress] | lang=en
- "caveman_compress_skill_compress": "Compress" | kind=entity | source=.github/skills/caveman-compress/SKILL.md:L66 | neighbors=[Compression Rules] | lang=en
- "caveman_compress_skill_pattern": "Pattern" | kind=entity | source=.github/skills/caveman-compress/SKILL.md:L90 | neighbors=[Caveman Compress] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-171.json

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
