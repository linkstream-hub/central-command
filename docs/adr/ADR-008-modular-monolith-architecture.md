# ADR-008: Modular Monolith Over Microservices

**Status:** Accepted  
**Date:** 2026-06-06  
**Deciders:** Brandon Bittner  

---

## Context

The system covers 9 bounded contexts (Lead Intake, Work Order Mgmt, Field Operations, Communications, Workforce, Compliance/PAGA, Property Directory, Financial, Intelligence). A naive reading of Domain-Driven Design at this scale might suggest microservices — one service per domain.

At APT CA's current scale (a handful of field techs, ~9 office staff, one PM client), microservices would introduce:
- Service discovery and inter-service networking
- Distributed tracing and centralized logging across services
- Network latency for every cross-domain operation
- Separate deployment pipelines per service
- Dramatically higher operational complexity for a team of one engineer

The original GAS monolith went in the opposite direction — no boundaries at all, everything in one file touching everything else. Both extremes are wrong at this stage.

---

## Decision

Build a **modular monolith**: a single Next.js application with domain-scoped code modules that have clear internal boundaries and communicate through defined interfaces.

**Structure:**
- Single deployment unit (one Vercel project)
- Single database (one Neon Postgres instance, `org_id` scoped)
- Code organized by domain: `lib/dal/`, domain-specific route handlers, domain-typed schemas
- Cross-domain communication via n8n webhook events (not direct function imports between domain modules)
- Each domain owns its tables — no cross-domain JOIN in application code

**The progression:**
1. ~~GAS monolith~~ — no boundaries (where we started)
2. **Modular monolith** — clear domain boundaries, single deployment ← *current target*
3. Microservices — only if a domain has genuinely different scaling or deployment needs at 50+ PM clients

**When to split a domain into its own service (criteria):**
- It needs to scale independently at 10x the traffic of other domains
- It has a genuinely different deployment cadence (multiple times per day vs. weekly)
- The boundary is causing so much friction that the monolith is actively painful
- NOT because "it's a different domain" — that alone is not a reason to split

**Compliance/PAGA as a case study:** This is the most business-critical domain and the most tempting to split. But it is also the most deeply integrated (reads Field Operations data, writes to Financial). Splitting it into a service adds distributed transaction complexity without any scaling benefit at current load. It stays in the monolith until the PM SaaS has 10+ clients.

---

## Consequences

**Positive:**
- Zero service discovery overhead — cross-domain calls are function calls, not HTTP requests
- One deployment — Vercel handles it, no orchestration layer
- One database — no distributed transaction problem
- Can split any domain later without rewriting — the modular boundaries make extraction clean

**Negative / Constraints:**
- All domains share the same deployment lifecycle — a bug in Field Operations requires deploying all domains
- A slow query in one domain can impact response times in another (shared connection pool)
- Discipline required to maintain boundaries — an engineer can always just import from another domain's module; the rule must be enforced by convention and code review, not by runtime isolation
- The monolith boundary assumption: splitting becomes necessary at ~50 PM client orgs or when any single domain handles >10k events/day
