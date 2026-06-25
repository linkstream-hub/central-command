# Node Description Batch 331 of 412

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

- "gsd_workstreams_skill_switch": "switch" | kind=entity | source=.github/skills/gsd-workstreams/SKILL.md:L48 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_status": "status" | kind=entity | source=.claude/commands/gsd/workstreams.md:L46 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_step_1_parse_subcommand": "Step 1: Parse Subcommand" | kind=entity | source=.claude/commands/gsd/workstreams.md:L30 | neighbors=[/gsd-workstreams]
- "gsd_workstreams_step_3_display_results": "Step 3: Display Results" | kind=entity | source=.claude/commands/gsd/workstreams.md:L67 | neighbors=[/gsd-workstreams]
- "gsd_workstreams_subcommands": "Subcommands" | kind=entity | source=.claude/commands/gsd/workstreams.md:L18 | neighbors=[Usage]
- "gsd_workstreams_switch": "switch" | kind=entity | source=.claude/commands/gsd/workstreams.md:L50 | neighbors=[Step 2: Execute Operation]
- "guides_configuration": "configuration.md" | kind=entity | source=docs/guides/configuration.md:L1 | neighbors=[Configuration]
- "guides_configuration_cron_jobs": "Cron Jobs" | kind=entity | source=docs/guides/configuration.md:L117 | neighbors=[Environment Variables]
- "guides_configuration_database": "Database" | kind=entity | source=docs/guides/configuration.md:L12 | neighbors=[Environment Variables]
- "guides_configuration_development_flags": "Development Flags" | kind=entity | source=docs/guides/configuration.md:L127 | neighbors=[Configuration]
- "guides_configuration_email_resend": "Email — Resend" | kind=entity | source=docs/guides/configuration.md:L90 | neighbors=[Environment Variables]
- "guides_configuration_gmail_integration": "Gmail Integration" | kind=entity | source=docs/guides/configuration.md:L46 | neighbors=[Environment Variables]
- "guides_configuration_google_gemini_ai_email_parsing": "Google Gemini AI — Email Parsing" | kind=entity | source=docs/guides/configuration.md:L57 | neighbors=[Environment Variables]
- "guides_configuration_google_oauth_office_staff_auth_next_auth_v5": "Google OAuth — Office Staff Auth (next-auth v5)" | kind=entity | source=docs/guides/configuration.md:L21 | neighbors=[Environment Variables]
- "guides_configuration_internal_api_auth_dashboard_bridge": "Internal API Auth — Dashboard Bridge" | kind=entity | source=docs/guides/configuration.md:L36 | neighbors=[Environment Variables]
- "guides_configuration_n8n_webhooks": "n8n Webhooks" | kind=entity | source=docs/guides/configuration.md:L98 | neighbors=[Environment Variables]
- "guides_configuration_per_environment_overrides": "Per-Environment Overrides" | kind=entity | source=docs/guides/configuration.md:L143 | neighbors=[Configuration]
- "guides_configuration_required_variables_for_first_run": "Required Variables for First Run" | kind=entity | source=docs/guides/configuration.md:L173 | neighbors=[Configuration]
- "guides_configuration_sentry_error_monitoring": "Sentry Error Monitoring" | kind=entity | source=docs/guides/configuration.md:L107 | neighbors=[Environment Variables]
- "guides_configuration_upstash_redis_rate_limiting": "Upstash Redis — Rate Limiting" | kind=entity | source=docs/guides/configuration.md:L69 | neighbors=[Environment Variables]
- "guides_configuration_web_push_notifications_vapid": "Web Push Notifications (VAPID)" | kind=entity | source=docs/guides/configuration.md:L80 | neighbors=[Environment Variables]
- "guides_deployment": "deployment.md" | kind=entity | source=docs/guides/deployment.md:L1 | neighbors=[Deployment]
- "guides_deployment_build_config": "Build Config" | kind=entity | source=docs/guides/deployment.md:L40 | neighbors=[Tech PWA — Vercel]
- "guides_deployment_ci_pipeline": "CI Pipeline" | kind=entity | source=docs/guides/deployment.md:L116 | neighbors=[GAS — Dashboard API]
- "guides_deployment_ci_pre_deploy_checks": "CI / Pre-Deploy Checks" | kind=entity | source=docs/guides/deployment.md:L152 | neighbors=[Deployment]
- "guides_deployment_credential_names": "Credential Names" | kind=entity | source=docs/guides/deployment.md:L140 | neighbors=[n8n — Railway]
- "guides_deployment_cron_jobs": "Cron Jobs" | kind=entity | source=docs/guides/deployment.md:L55 | neighbors=[Tech PWA — Vercel]
- "guides_deployment_deployment_targets": "Deployment Targets" | kind=entity | source=docs/guides/deployment.md:L8 | neighbors=[Deployment]
- "guides_deployment_environment_setup": "Environment Setup" | kind=entity | source=docs/guides/deployment.md:L170 | neighbors=[Deployment]
- "guides_deployment_github_blocked_fallback_active_constraint": "GitHub-Blocked Fallback (ACTIVE CONSTRAINT)" | kind=entity | source=docs/guides/deployment.md:L29 | neighbors=[Tech PWA — Vercel]
- "guides_deployment_monitoring": "Monitoring" | kind=entity | source=docs/guides/deployment.md:L197 | neighbors=[Deployment]
- "guides_deployment_never_run": "Never Run" | kind=entity | source=docs/guides/deployment.md:L205 | neighbors=[Deployment]
- "guides_deployment_normal_deploy": "Normal Deploy" | kind=entity | source=docs/guides/deployment.md:L21 | neighbors=[Tech PWA — Vercel]
- "guides_deployment_npm_config": "npm Config" | kind=entity | source=docs/guides/deployment.md:L65 | neighbors=[Tech PWA — Vercel]
- "guides_deployment_preview_branches": "Preview Branches" | kind=entity | source=docs/guides/deployment.md:L69 | neighbors=[Tech PWA — Vercel]
- "guides_deployment_workflow_deploy_process": "Workflow Deploy Process" | kind=entity | source=docs/guides/deployment.md:L134 | neighbors=[n8n — Railway]
- "guides_development": "development.md" | kind=entity | source=docs/guides/development.md:L1 | neighbors=[Development Guide]
- "guides_development_adding_an_api_route": "Adding an API Route" | kind=entity | source=docs/guides/development.md:L118 | neighbors=[Development Guide]
- "guides_development_auth_architecture": "Auth Architecture" | kind=entity | source=docs/guides/development.md:L105 | neighbors=[Development Guide]
- "guides_development_branch_conventions": "Branch Conventions" | kind=entity | source=docs/guides/development.md:L299 | neighbors=[Development Guide]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-330.json

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
