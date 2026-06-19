# Phase 28: Sentinel Consolidation — Neon Compute Diet - Context

**Gathered:** 2026-06-11
**Status:** Ready for planning
**Source:** Neon compute incident (81% of 100 CU-hr allowance consumed by day 11) + COO directive to fix permanently

<domain>
## Phase Boundary

The four Railway sentinel services (sentinel-wc-scanner, sentinel-time-anomaly, sentinel-stale-job, sentinel-spec-architect) polled Neon continuously, keeping the endpoint awake 24/7 — the root cause of the compute burn (~7.3 CU-hr/day ≈ full-time minimum-CU billing). They are PAUSED as of 2026-06-11 (Brandon, Railway dashboard). This phase rebuilds their checks as scheduled, work-hours-only jobs that let Neon autosuspend between runs, then retires the four standalone services.

</domain>

<decisions>
## Implementation Decisions

### Locked
- Sentinels stay paused until the consolidated replacement ships — compute budget over monitoring continuity
- Replacement = scheduled runs during APT work hours only (Brandon's instinct, validated: Neon-billed polling is exactly where work-hours scheduling pays)
- Connect-query-disconnect every run — zero held connections (held connections block autosuspend)
- Verification = Neon monitoring graph flatlines between runs + projected month fits allowance (SENT-03 is the phase gate)
- Alerting on findings goes through the existing PTOW Error Handler / email-to-Brandon pattern (Phase 25 precedent)

### Lead-dev preference (planner may refine)
- Consolidate into n8n scheduled workflows (Schedule Trigger, work-hours cron) using the existing "Neon Postgres" credential — no new infrastructure, visible in one place, error-handler wired. One workflow with sequential checks likely beats four.
- Railway sentinel services get DELETED (not slept) once parity confirmed — four fewer services to pay for and forget about.

### Claude's Discretion
- Cron cadence per check (e.g., wc-scanner 2×/day vs stale-job hourly during work hours)
- Whether spec-architect (likely not a Neon poller — verify) belongs in this consolidation at all
- Query batching across checks in one connection burst

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning.**

### Sentinel sources (read in full — read-source-before-porting)
- `Sentinels/` directory in repo root (incl. wrangler.toml — CF Worker heritage; verify what each sentinel's check logic actually queries)
- Railway service configs: NOT in repo — discovery via Railway API (RAILWAY_TOKEN pattern, Brandon-run script, or .ops/credentials.env once provisioned: project apt-infrastructure c905a353-0927-4eeb-85f1-11c11d392a08)

### Patterns
- `tools/n8n/workflows/phase-19-email-polling.json` — committed-workflow + credential-by-name pattern
- `tools/n8n/workflows/ptow-error-handler.json` — alert path (emails brandon@)
- `tools/n8n/phase25_*.cjs` — Brandon-runnable ops-script pattern for n8n API changes

### Constraints
- Neon: autosuspend must be ON, min CU 0.25 (verify in console / via NEON_API_KEY once .ops exists)
- n8n Schedule Trigger crons run in instance timezone — set workflow timezone America/Los_Angeles explicitly
</canonical_refs>

<specifics>
## Specific Ideas

- Work hours: assume 7am–6pm Pacific Mon–Fri unless Brandon corrects
- Each sentinel's check is presumably a handful of SQL queries — a single n8n workflow running all checks in one burst (one connection window) maximizes suspend time
- SENT-03 evidence: Neon console Monitoring graph screenshot or consumption API delta over 48h post-ship

</specifics>

<deferred>
## Deferred Ideas

- Re-architecting sentinel logic itself (thresholds, new checks) — port behavior as-is, diet only
- Neon plan upgrade — only if post-diet consumption still exceeds allowance

</deferred>

---

*Phase: 28-sentinel-diet*
*Context gathered: 2026-06-11 from Neon compute incident*
