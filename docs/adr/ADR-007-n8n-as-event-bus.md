# ADR-007: n8n as Event Bus and Workflow Automation Layer

**Status:** Accepted  
**Date:** 2026-06-06  
**Deciders:** Brandon Bittner  

---

## Context

The system needs an event bus to connect domain events (WorkOrderScheduled, AttestationSigned, ViolationDetected) to downstream consumers (notifications, compliance checks, future billing triggers) without hard-coding cross-domain calls inside the application.

Options evaluated:
- **Custom webhook fanout in Next.js** — simple but synchronous; a slow consumer blocks the request; no retry logic; no visibility into execution
- **BullMQ (Redis queue)** — requires managing a Redis instance and worker processes; operational overhead not justified at current scale
- **Temporal** — powerful durable workflows but significant complexity overhead; overkill for current needs
- **n8n** — visual workflow builder with webhook triggers, retry logic, execution history, and built-in nodes for Sheets, Postgres, email, HTTP. Already in use for compliance monitoring. Deployed on Railway.

---

## Decision

Use **n8n** (self-hosted on Railway) as the event bus and workflow automation layer.

**Why n8n fits the current scale:**
- Webhook-triggered — any domain can fire an event with a simple HTTP POST; no SDK, no message queue client
- Visual execution history — non-technical stakeholders can see what ran and when
- Built-in retry logic — failed deliveries retry automatically
- Native integrations — Sheets, Postgres, Gmail nodes eliminate custom integration code
- Already running — one active workflow (CA Break Compliance Monitor) proves the infrastructure works

**Current workflows:**
- `CA Break Compliance Monitor` — triggered by `signAttestation()` webhook POST. Reads Time Records, calculates shift state, writes violations to ComplianceAlerts. Status: BROKEN — webhook never called since April 26. Fix: `TechPWA.gs:signAttestation()` must POST to `N8N_COMPLIANCE_WEBHOOK_URL`.

**Version control:** All n8n workflows are exported and committed to `tools/n8n/workflows/`. Run `python tools/n8n/export.py` after any UI change and commit before closing the sprint.

---

## Event Topology (Target — Phase 4)

Domains publish events as webhook POSTs to n8n. n8n routes to consumers:

| Event | Producer | Consumers |
|---|---|---|
| `AttestationSigned` | Field Operations (TechPWA.gs) | Compliance (violation check), Work Order Mgmt (flip to Complete) |
| `WorkOrderScheduled` | Work Order Mgmt | Communications (notify PM, tenant, tech) |
| `WorkOrderCompleted` | Work Order Mgmt | Financial (trigger invoice), Compliance (final check) |
| `ViolationDetected` | Compliance | Communications (alert HR/supervisor) |
| `ShiftEnded` | Field Operations | Workforce (surface timecard for review) |

**The rule:** Domain A fires a webhook. It does not know or care what Domain B does with it. n8n is the routing layer.

---

## Consequences

**Positive:**
- Domains stay decoupled — Work Order Mgmt doesn't import from Compliance
- Visual execution history in n8n UI gives operational visibility without log diving
- New consumers added by wiring a new branch in n8n — no application code change

**Negative / Constraints:**
- n8n on Railway is a single point of failure — if Railway is down, domain events are lost unless retry is built into the producer
- The compliance webhook has been broken since April 26 with zero alerting — event bus failures are silent unless monitored
- n8n workflows are not code-reviewed in the same way source code is — logic bugs in workflow nodes are harder to catch
- Future Firebase migration (Phase 5, 50+ PM clients) will likely require a proper message queue (BullMQ or Pub/Sub) — n8n does not scale to high-throughput event streams
