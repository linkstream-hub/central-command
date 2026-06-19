# Phase 28: Sentinel Consolidation — Neon Compute Diet - Research

**Researched:** 2026-06-11
**Domain:** n8n scheduled workflows, Neon autosuspend, Railway service retirement
**Confidence:** MEDIUM — sentinel SQL logic not in repo; must be recovered via Railway API (Wave 0 task)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Sentinels stay paused until the consolidated replacement ships — compute budget over monitoring continuity
- Replacement = scheduled runs during APT work hours only
- Connect-query-disconnect every run — zero held connections
- Verification = Neon monitoring graph flatlines between runs + projected month fits allowance (SENT-03 gate)
- Alerting on findings goes through the existing PTOW Error Handler / email-to-Brandon pattern

### Claude's Discretion
- Cron cadence per check (e.g., wc-scanner 2×/day vs stale-job hourly during work hours)
- Whether spec-architect belongs in this consolidation at all
- Query batching across checks in one connection burst

### Deferred Ideas (OUT OF SCOPE)
- Re-architecting sentinel logic itself (thresholds, new checks) — port behavior as-is, diet only
- Neon plan upgrade — only if post-diet consumption still exceeds allowance
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SENT-01 | Sentinel checks (wc-scanner, time-anomaly, stale-job, spec-architect) run as scheduled jobs during work hours only — no 24/7 polling services | n8n Schedule Trigger cron pattern; work-hours window 7am–6pm PT Mon–Fri |
| SENT-02 | Every sentinel run is connect-query-disconnect — zero held Neon connections; endpoint autosuspends between runs | Neon HTTP driver already in use in project (neon-http adapter); n8n Neon Postgres credential uses same model |
| SENT-03 | Neon compute graph verifiably flatlines between runs; projected monthly consumption fits allowance with headroom | Neon consumption API (see §Consumption Verification); 48h post-ship monitoring window |
</phase_requirements>

---

## Summary

The `Sentinels/` directory in the repo is **not** the Railway sentinel source. It is a Cloudflare Worker proxy (`apt-dashboard-proxy`) that forwards dashboard API traffic through `api.aptmaintenanceinc.com`. The `Training/` subdirectory holds AG doctrine docs. None of the four Railway sentinel services (wc-scanner, time-anomaly, stale-job, spec-architect) have committed source in this repo — their logic, SQL, and cadence exist only inside the Railway service containers. This is the critical discovery gap: **Wave 0 must recover the live sentinel logic before porting can begin.**

The good news: the project already uses the Neon HTTP driver (`@neondatabase/serverless` + `drizzle-orm/neon-http`) everywhere in Next.js. That driver does connect-query-disconnect per call by design. The n8n "Neon Postgres" credential also uses HTTP-mode connections. So SENT-02 is achievable with zero new infrastructure — the n8n Postgres node in HTTP mode or a Code node using the same neon-http pattern will satisfy it.

**Primary recommendation:** Wave 0 = Railway API discovery sprint (Brandon-run script) to extract sentinel logic → Wave 1 = build consolidated n8n workflow → Wave 2 = delete Railway services + verify SENT-03.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Scheduled check execution | n8n (Railway) | — | Schedule Trigger owns the cron; no persistent process needed |
| Neon query execution | n8n Code node (HTTP) | n8n Postgres node | HTTP driver = connect-query-disconnect per invocation |
| Alert on finding | PTOW Error Handler workflow | — | Existing pattern; emails Brandon; avoids new infra |
| Consumption verification | Neon console / Consumption API | — | Read-only; NEON_API_KEY already needed |
| Railway service deletion | Railway dashboard (Brandon) | Railway GraphQL API | Destructive — Brandon-run, same pattern as railway_upsert_vars.cjs |

---

## Standard Stack

### Core (all already in project — no new packages)

| Library / Service | Version / Credential | Purpose | Why Standard |
|-------------------|---------------------|---------|--------------|
| n8n Schedule Trigger | n8n-nodes-base.scheduleTrigger | Cron execution | Already used in project; visible in one place |
| n8n Neon Postgres node | n8n-nodes-base.postgres | Query-per-run DB access | Uses existing "Neon Postgres" credential; HTTP mode |
| n8n Code node | n8n-nodes-base.code | Logic, thresholds, finding detection | When SQL result needs JS evaluation |
| PTOW Error Handler | workflow id (existing) | Alert path to Brandon | Phase 25 precedent; error handler wired in n8n |
| Neon Consumption API | `https://console.neon.tech/api/v2` | SENT-03 gate verification | NEON_API_KEY in n8n env already |

### Supporting

| Library | Purpose | When to Use |
|---------|---------|-------------|
| Railway GraphQL API (`backboard.railway.app/graphql/v2`) | Delete services post-parity | Brandon-run script (same pattern as railway_upsert_vars.cjs) |
| n8n HTTP Request node | Neon consumption API call for SENT-03 | Read consumption delta over 48h post-ship |

**Installation:** None required. All libraries are existing n8n nodes and credentials.

---

## Package Legitimacy Audit

> No new npm packages required for this phase. Existing n8n node types only.

**Packages removed due to SLOP verdict:** none
**Packages flagged as SUS:** none

---

## Critical Discovery: Sentinels Directory

**`Sentinels/worker.js`** [VERIFIED: file read] is `apt-dashboard-proxy` — a Cloudflare Worker that rate-limits and proxies requests to the GAS Dashboard API at `api.aptmaintenanceinc.com`. It has nothing to do with the Railway sentinel services.

**`Sentinels/Training/`** [VERIFIED: file read] contains AG behavioral doctrine (IDENTITY_PRIMARY.md, RULES_OF_ENGAGEMENT.md, EXEMPLARS.md, SESSIONS_MEMORY.json) — spec-generation training material for the Antigravity agent. No SQL, no cron logic, no Neon queries.

**Conclusion:** The four Railway sentinels (wc-scanner, time-anomaly, stale-job, spec-architect) have **no committed source in this repo**. Their SQL queries, check thresholds, alert logic, and cadences are only accessible via the live Railway containers or Railway API.

---

## Architecture Patterns

### System Architecture Diagram

```
[n8n Schedule Trigger]
        |
        | (cron: work hours only, Pacific TZ)
        v
[Sentinel Check Workflow]
        |
        |--[Neon Postgres node: HTTP mode]---> [Neon DB: query]
        |         (connect-query-disconnect)          |
        |                                             v
        |                                      [result rows]
        |
        |--[Code node: threshold eval]
        |         |
        |    findings?
        |    YES -----> [PTOW Error Handler (existing)]
        |                     |
        |                     v
        |               [Email → Brandon]
        |    NO  -----> [no-op / log]
        |
        v
   [workflow end — Neon autosuspends ~5min idle]
```

### Recommended n8n Workflow Structure

```
One workflow: "APT Sentinel Checks"
├── Schedule Trigger (cron: work hours, America/Los_Angeles)
├── Check: WC Scanner (Postgres node → Code node → IF → Error Trigger if findings)
├── Check: Time Anomaly (Postgres node → Code node → IF → Error Trigger if findings)
├── Check: Stale Job (Postgres node → Code node → IF → Error Trigger if findings)
└── Check: Spec Architect (IF still needed — verify in Wave 0)
```

All checks run sequentially in one execution = one connection window = maximum autosuspend time.

### Pattern: n8n Schedule Trigger (work-hours only)

**What:** Cron expression scoped to business hours. Workflow timezone set explicitly to America/Los_Angeles.

**Cron expressions for work-hours runs (examples):**

```
# Every hour 7am–6pm Mon–Fri Pacific
0 7-18 * * 1-5

# Twice daily (9am + 2pm) Mon–Fri
0 9,14 * * 1-5
```

**Workflow timezone setting** [ASSUMED — n8n docs pattern]:
In n8n workflow settings → Timezone → set to `America/Los_Angeles`. All Schedule Trigger crons evaluate in this timezone.

**Reference pattern:** `tools/n8n/workflows/phase-19-email-polling.json` uses `everyX` mode (not cron). For work-hours-only scheduling, use `cron` mode with explicit expression.

### Pattern: Connect-Query-Disconnect (n8n Postgres node)

The project's existing tech stack uses `@neondatabase/serverless` with `drizzle-orm/neon-http` [VERIFIED: tech-pwa/src/lib/db.ts]. This driver sends each query over HTTPS and releases immediately — no persistent TCP connection. The n8n "Neon Postgres" credential uses the same HTTP endpoint pattern. Each Postgres node execution in n8n is a fresh connection that tears down when the node completes.

**What blocks Neon autosuspend:**
- Persistent TCP connections (not HTTP) — eliminated by using HTTP driver
- Polling loops (sleeping process keeps connection alive) — eliminated by removing Railway services
- Connection poolers in "session mode" holding idle connections — use "transaction mode" or HTTP driver only

**n8n Postgres node config for autosuspend compatibility** [ASSUMED]:
- SSL: required
- Connection timeout: set explicitly (e.g., 10s) so failures don't stall the workflow
- No "Keep connection alive" or persistent pool settings

### Anti-Patterns to Avoid

- **Scheduled trigger without timezone setting:** n8n defaults to UTC; 7am UTC = 11pm PT in winter — checks fire overnight and keep Neon awake during idle hours. Always set `America/Los_Angeles` explicitly.
- **One workflow per sentinel:** Four separate workflows = four separate execution windows = more total connection time. Batch into one sequential workflow.
- **Webhook trigger instead of schedule:** CA break compliance monitor uses a webhook trigger (event-driven, not time-driven) — correct for that use case but wrong here. Sentinels need time-driven scheduling.
- **Sending alert via email node directly:** Use existing PTOW Error Handler workflow (set it as the error workflow in workflow settings) — consistent with Phase 25 pattern and keeps alert logic centralized.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Neon connection management | Custom pg pool or node-postgres with keep-alive | n8n Postgres node (HTTP mode) or existing neon-http pattern | HTTP driver already used in project; pool in n8n would hold connections |
| Alert emails | New email node with RESEND | PTOW Error Handler workflow (existing) | Already wired, already sends to Brandon, consistent pattern |
| Railway service discovery | Manual Railway dashboard navigation | Railway GraphQL API via script (Brandon-run) | railway_upsert_vars.cjs proves the pattern; same API supports service query + delete |
| Consumption monitoring | Custom cron to poll Neon API | Neon console Monitoring graph (manual SENT-03 check) or HTTP Request node to consumption API | Phase gate needs evidence, not ongoing automation |

**Key insight:** Every infrastructure piece this phase needs already exists in the project. The only net-new work is: (1) discovering sentinel SQL logic from Railway containers, and (2) encoding that logic into n8n nodes.

---

## Runtime State Inventory

> Applicable — this is a migration phase: Railway services → n8n workflows.

| Category | Items Found | Action Required |
|----------|-------------|-----------------|
| Stored data | None — sentinels are read-only checks; no sentinel-written data in Neon | None |
| Live service config | 4 Railway services: sentinel-wc-scanner, sentinel-time-anomaly, sentinel-stale-job, sentinel-spec-architect — PAUSED as of 2026-06-11; logic inside containers only | Wave 0: Brandon-run Railway API script to extract env vars + source; Wave 2: DELETE services after parity |
| OS-registered state | None — Railway services managed by Railway scheduler | None |
| Secrets/env vars | Railway services have env vars (DATABASE_URL etc.) — accessible via Railway API with RAILWAY_TOKEN | Wave 0 script reads these; NEON_API_KEY needed for SENT-03 (may already be in n8n Railway service env) |
| Build artifacts | None — Railway containers are the artifact; deletion in Wave 2 retires them | Wave 2: railway_delete_sentinels.cjs (Brandon-run) |

**ca-break-compliance-monitor:** [VERIFIED: file read] Uses **webhook trigger** (not schedule trigger), reads **Google Sheets** (not Neon). Not a Neon compute culprit. No action needed.

---

## Common Pitfalls

### Pitfall 1: Sentinel Source Gap
**What goes wrong:** Planner writes n8n tasks assuming SQL logic is known. AG hits Wave 1 with no source material.
**Why it happens:** `Sentinels/` directory is a CF Worker proxy, not the Railway sentinel source. Git history shows sentinels were GH Actions + Railway containers — no SQL committed.
**How to avoid:** Wave 0 is a mandatory Railway API discovery task before any implementation. Brandon runs the script.
**Warning signs:** Any plan that puts "port sentinel logic" in Wave 1 without a prior "extract from Railway" task.

### Pitfall 2: n8n Timezone Default (UTC)
**What goes wrong:** Schedule Trigger crons fire on UTC schedule. "0 7-18 * * 1-5" at UTC fires 11pm–8am Pacific in winter — keeps Neon awake overnight.
**Why it happens:** n8n instance timezone and workflow timezone are separate settings. Default is UTC.
**How to avoid:** Set workflow timezone to `America/Los_Angeles` in workflow Settings tab before finalizing cron.
**Warning signs:** Monitor graph shows Neon activity in the middle of the night after "work-hours" workflow ships.

### Pitfall 3: Held Connections via n8n Postgres Connection Pool
**What goes wrong:** n8n Postgres credential configured with connection pool that keeps connections open between executions. Neon never autosuspends.
**Why it happens:** Some n8n Postgres credential configurations maintain a pool. HTTP-mode Neon connections do not have this problem but standard postgres TCP connections can.
**How to avoid:** Use the existing "Neon Postgres" credential (confirmed working in project via Phase 25); verify it uses the `postgresql://...neon.tech` HTTP-compatible endpoint. Neon HTTP connections are stateless by design.
**Warning signs:** Neon monitoring graph shows continuous activity even between scheduled runs.

### Pitfall 4: spec-architect Is Not a Neon Poller
**What goes wrong:** Plan includes spec-architect in n8n consolidation with a Neon query when it doesn't actually touch Neon.
**Why it happens:** CONTEXT.md flags it as "likely not a Neon poller — verify." If unverified, spec includes it anyway.
**How to avoid:** Wave 0 discovery explicitly checks spec-architect env vars and source for DATABASE_URL. If absent, spec-architect is excluded from SENT-01/02 scope (or retired without porting).
**Warning signs:** Wave 0 script output shows no DATABASE_URL in spec-architect service env.

### Pitfall 5: Deleting Railway Services Before n8n Parity Confirmed
**What goes wrong:** Services deleted before SENT-03 evidence gathered. No rollback path.
**Why it happens:** Planner puts deletion in same wave as workflow ship.
**How to avoid:** Three-wave plan: Wave 0 = discovery, Wave 1 = n8n workflow + validation, Wave 2 = Railway deletion only after SENT-03 confirmed.
**Warning signs:** Any plan where service deletion and n8n activation are in the same task sequence.

---

## Code Examples

### Schedule Trigger JSON structure (n8n workflow node)
```json
{
  "parameters": {
    "rule": {
      "interval": [
        {
          "field": "cronExpression",
          "expression": "0 7-18 * * 1-5"
        }
      ]
    }
  },
  "name": "Schedule Trigger",
  "type": "n8n-nodes-base.scheduleTrigger",
  "typeVersion": 1
}
```
Source: [ASSUMED — standard n8n Schedule Trigger node structure]

### Error workflow wiring (set in n8n workflow Settings)
```json
{
  "settings": {
    "errorWorkflow": "<PTOW_ERROR_HANDLER_WORKFLOW_ID>",
    "timezone": "America/Los_Angeles"
  }
}
```
Source: [ASSUMED — n8n workflow settings schema]

### Railway API: list service env vars (Brandon-run script pattern)
```javascript
// Pattern from tools/n8n/railway_upsert_vars.cjs
const res = await fetch('https://backboard.railway.app/graphql/v2', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `query($serviceId: String!, $environmentId: String!) {
      variables(serviceId: $serviceId, environmentId: $environmentId) { name value }
    }`,
    variables: { serviceId: '<SENTINEL_SERVICE_ID>', environmentId: '<ENV_ID>' }
  })
});
```
Source: [VERIFIED: tools/n8n/railway_upsert_vars.cjs — Railway GraphQL v2 pattern confirmed in project]

### Neon Consumption API (SENT-03 verification)
```bash
# Get project consumption (NEON_API_KEY required — Brandon runs this)
curl -H "Authorization: Bearer $NEON_API_KEY" \
  "https://console.neon.tech/api/v2/projects/<PROJECT_ID>/metrics?from=<ISO_DATE>&to=<ISO_DATE>"
```
Source: [ASSUMED — Neon API v2 pattern; exact endpoint shape needs verification via Neon docs]

---

## Wave 0 Discovery Task (Mandatory — No Planner Skip)

Before Wave 1 can be planned, the following must be answered for each of the four Railway services:

| Question | Source |
|----------|--------|
| What SQL does it run? | Railway API: get service source / env + logs |
| What Neon tables does it read? | Source code or Railway service logs |
| What is its current polling cadence? | Railway service config or cron setting |
| Does it write to Neon or read-only? | Source code |
| Does it have a DATABASE_URL env var? | Railway API: variablesList |
| Does spec-architect touch Neon at all? | Railway API: DATABASE_URL absent = no |

**Wave 0 deliverable:** A markdown table (committed to `.planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md`) with the above answers filled in. This becomes the spec input for Wave 1.

**How to execute:** Brandon runs a Brandon-runnable `.cjs` script (same pattern as `tools/n8n/railway_upsert_vars.cjs`) that queries the Railway API using `RAILWAY_TOKEN` from `.env.local`. Script outputs service env vars + attempts to fetch service source. Claude Code writes the script; Brandon runs it and pastes output.

Railway project ID: `c905a353-0927-4eeb-85f1-11c11d392a08` [VERIFIED: tools/n8n/railway_upsert_vars.cjs]

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| n8n (Railway) | Workflow execution | ✓ | Existing service | — |
| Neon Postgres credential in n8n | Sentinel queries | ✓ | Existing (Phase 25) | — |
| PTOW Error Handler workflow | Alert path | ✓ | Existing (committed) | — |
| RAILWAY_TOKEN | Wave 0 discovery script | Unknown | — | Brandon fetches from Railway dashboard |
| NEON_API_KEY | SENT-03 consumption API | Unknown | — | Manual Neon console screenshot |
| Railway sentinel service IDs | Wave 0 discovery | Unknown | — | Brandon reads from Railway dashboard |

**Missing dependencies with no fallback:** None that block Wave 1 implementation (Wave 0 handles discovery).

**Missing dependencies with fallback:** RAILWAY_TOKEN and NEON_API_KEY both have manual alternatives (dashboard UI).

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual verification (no unit tests for n8n workflows) |
| Config file | n8n workflow JSON — imported via n8n UI |
| Quick run command | n8n workflow: Execute manually once → inspect Execution log |
| Full suite command | SENT-03: Neon monitoring graph 48h window post-activation |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SENT-01 | Workflow fires only during work hours (7am–6pm PT Mon–Fri) | Manual | Review Schedule Trigger cron + timezone in n8n UI | ❌ Wave 0 |
| SENT-02 | No held connections; Neon autosuspends between runs | Manual | Neon monitoring graph: look for flatline between scheduled runs | ❌ Wave 0 |
| SENT-03 | 48h consumption delta × 30 days < 100 CU-hr | Manual | Neon console Monitoring tab or consumption API call | ❌ Wave 2 |

### Wave 0 Gaps
- [ ] `SENTINEL_INVENTORY.md` — sentinel SQL/logic recovered from Railway API
- [ ] Railway service IDs for all four sentinels
- [ ] Brandon-runnable discovery script at `tools/n8n/railway_read_sentinels.cjs`

*(No automated test framework gaps — this phase is infrastructure migration, not Next.js code)*

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — |
| V3 Session Management | no | — |
| V4 Access Control | no | n8n workflows not publicly accessible |
| V5 Input Validation | no | Read-only Neon queries; no user input |
| V6 Cryptography | no | — |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| NEON_API_KEY in script output | Information Disclosure | Brandon-run scripts never echo secrets; use same pattern as railway_upsert_vars.cjs (reads from .env.local, never logs key) |
| Railway API token exposure | Information Disclosure | RAILWAY_TOKEN read from .env.local directly in script; never passed via argv or stdout |

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Railway persistent polling services | n8n scheduled workflows (this phase) | Phase 28 | Neon autosuspends between runs; Railway cost eliminated |
| 24/7 sentinel polling (~7.3 CU-hr/day) | Work-hours-only runs (~2 CU-hr/day estimated) | Phase 28 | ~73% compute reduction; fits 100 CU-hr/month allowance |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | n8n workflow timezone setting (`America/Los_Angeles`) controls Schedule Trigger cron evaluation | Pitfall 2, Code Examples | Crons fire on wrong schedule; Neon stays awake at night |
| A2 | n8n Postgres credential for Neon uses HTTP-mode (connect-query-disconnect) not TCP pool | Pitfall 3 | Held connections block autosuspend; SENT-02 fails |
| A3 | Neon consumption API endpoint is `console.neon.tech/api/v2/projects/<id>/metrics` | Code Examples | SENT-03 script broken; fall back to manual console screenshot |
| A4 | spec-architect does not query Neon (may be a GH Actions spec-generator, not a DB poller) | Per-sentinel verdict, Pitfall 4 | Either over-port (waste) or under-port (leave Neon poller running) |
| A5 | Work hours window is 7am–6pm PT Mon–Fri | Architecture Patterns | Runs fire outside business hours or miss coverage window |
| A6 | Neon autosuspend is currently enabled with 0.25 min CU (verify in Neon console) | Common Pitfalls | Autosuspend disabled = phase goal impossible without Neon config change |

---

## Open Questions

1. **What does each sentinel actually check?**
   - What we know: Names suggest: wc-scanner = work-order/WC scanner; time-anomaly = time record anomaly; stale-job = jobs stuck in state; spec-architect = unknown
   - What's unclear: Exact SQL, thresholds, whether they write to Neon or are read-only
   - Recommendation: Wave 0 Brandon-run discovery script resolves this before Wave 1

2. **Does spec-architect touch Neon at all?**
   - What we know: CONTEXT.md flags it as "likely not a Neon poller"; git history shows a "spec-generator" GH Actions workflow that uses Claude API — likely a spec-generation bot, not a DB sentinel
   - What's unclear: Does the Railway service have DATABASE_URL? Does it even need to be ported?
   - Recommendation: If Wave 0 shows no DATABASE_URL → retire spec-architect without porting; mark as SENT-01 compliant by deletion only

3. **Is Neon autosuspend currently enabled?**
   - What we know: CONTEXT.md says "autosuspend must be ON, min CU 0.25 (verify in console)"
   - What's unclear: Current Neon project settings
   - Recommendation: Brandon checks Neon console → Project Settings → Compute before Wave 1 begins

4. **What are the Railway service IDs for the four sentinels?**
   - What we know: Railway project ID = `c905a353-0927-4eeb-85f1-11c11d392a08`
   - What's unclear: Individual service IDs and environment ID for each sentinel service
   - Recommendation: Brandon reads from Railway dashboard or Wave 0 discovery script queries `services` on the project

---

## Sources

### Primary (HIGH confidence)
- `Sentinels/worker.js` — VERIFIED: CF Worker proxy, not Railway sentinel source
- `Sentinels/Training/` — VERIFIED: AG doctrine docs, no SQL/cron logic
- `tech-pwa/src/lib/db.ts` — VERIFIED: `@neondatabase/serverless` + `drizzle-orm/neon-http` (HTTP driver, connect-query-disconnect)
- `tools/n8n/railway_upsert_vars.cjs` — VERIFIED: Railway GraphQL v2 pattern for Brandon-run scripts
- `tools/n8n/workflows/ca-break-compliance-monitor.json` — VERIFIED: Webhook trigger + Google Sheets (not Neon); not a compute culprit
- `tools/n8n/workflows/ptow-error-handler.json` — VERIFIED: Error trigger → Format → Sheets log + email; the alert path to use

### Secondary (MEDIUM confidence)
- `git log --all -- Sentinels/**` — commit history confirms sentinels were Railway containers, never committed as SQL source to repo
- `.planning/phases/28-sentinel-diet/28-CONTEXT.md` — project decisions and Railway project ID

### Tertiary (LOW confidence / ASSUMED)
- n8n Schedule Trigger cron mode and timezone setting behavior
- Neon consumption API endpoint shape
- spec-architect = GH Actions spec generator (inferred from git history commit message "upgrade spec-generator to Claude API")

---

## Metadata

**Confidence breakdown:**
- Sentinel source gap: HIGH — definitively confirmed; sentinels not in repo
- n8n workflow patterns: MEDIUM — CA break compliance monitor + error handler confirm the pattern; cron details ASSUMED
- Neon HTTP driver: HIGH — verified in db.ts
- Railway API pattern: HIGH — verified in railway_upsert_vars.cjs
- Sentinel SQL logic: LOW — not available; Wave 0 required

**Research date:** 2026-06-11
**Valid until:** 2026-07-11 (stable infra; Neon and n8n APIs unlikely to change)
