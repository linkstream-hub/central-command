# RISK_REGISTER.md — APT Central Command
# Active risks with owner, likelihood, impact, and mitigation.
# Last updated: 2026-06-26

---

## ACTIVE RISKS

| ID | Risk | Likelihood | Impact | Owner | Mitigation | Phase |
|---|---|---|---|---|---|---|
| R-001 | GAS DashboardAPI goes down — staff can't log in | HIGH | CRITICAL | CC | Migrate staff auth to Neon (Phase 1) | Phase 0–1 |
| R-002 | localStorage tech session stolen via XSS | MEDIUM | HIGH | AG | Replace with HttpOnly cookie (Phase 0 Clerk/Lucia) | Phase 0 |
| R-003 | GAS URL in client bundle leaked/scraped | LOW | HIGH | AG | Remove NEXT_PUBLIC_ (Phase 1) | Phase 1 |
| R-004 | Phantom Next.js 16.2.6 — unknown security patches | HIGH | MEDIUM | AG | Pin to 15.x (Phase 2) | Phase 2 |
| R-005 | Preview deploy mutates production DB | MEDIUM | HIGH | AG | Isolate preview Neon branch (Phase 2) | Phase 2 |
| R-006 | n8n restart loses in-flight events | HIGH | MEDIUM | AG | domain_events outbox (Phase 4) | Phase 4 |
| R-007 | DEV_BYPASS_AUTH bypassed with only env flag | LOW | HIGH | AG | Add DEV_BYPASS_SECRET dual guard (Phase 1) | Phase 1 |
| R-008 | Camera upload broken — field tech can't submit photos | HIGH | MEDIUM | AG | UploadThing integration (Phase 0) | Phase 0 |
| R-009 | Timekeeping custom code — PAGA liability | HIGH | HIGH | Brandon | Vendor decision required (Phase 0) | Phase 0 |
| R-010 | CI/CD doesn't block merge on test failure | MEDIUM | HIGH | AG | Harden CI gates (Phase 2) | Phase 2 |
| R-011 | 138 FSM-dead WOs in prod — inaccurate state | HIGH | MEDIUM | AG | Core loop diagnosis (Phase 3) | Phase 3 |
| R-012 | No rollback procedure proven | HIGH | HIGH | CC | Rollback drill (Phase 0 gate) | Phase 0 |
| R-013 | N8N_API_KEY expires ~2026-07-10 | HIGH | HIGH | AG | Rotate before expiry | CLOSED |
| R-014 | No /api/health — outages undetected | HIGH | MEDIUM | AG | Health endpoint + UptimeRobot (Phase 3) | Phase 3 |
| R-015 | INTAKE_COMMS_ENABLED ghost flag misleads agents | MEDIUM | LOW | AG | Remove (Phase 4) | Phase 4 |

---

## CLOSED RISKS

| ID | Risk | Closed | Resolution |
|---|---|---|---|
| CR-001 | n8n auth using HTTP basic (insecure) | 2026-06-25 | Switched to keypair (PR #22) |
| CR-002 | dispatch_sent_at column mismatch | 2026-06-25 | Column dropped, migration applied (PR #22) |
| CR-003 | Auto-deploy broken (inverted exit codes) | 2026-06-22 | PR #21 fixed ignoreCommand |
| CR-004 | N8N_API_KEY expiry risk | 2026-06-26 | Key rotated by Brandon |

---

## RISK OWNERS

```yaml
CC (Claude Code): architecture risks, security review, merge gate risks
AG: implementation risks, infrastructure risks, GAS migration risks
Brandon: business decisions (timekeeping vendor, auth provider, legal compliance)
```

---

## IMMEDIATE ACTION REQUIRED

None active.
