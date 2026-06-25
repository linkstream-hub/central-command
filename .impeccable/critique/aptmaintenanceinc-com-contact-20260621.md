---
target: https://aptmaintenanceinc.com/contact/
total_score: 21
p0_count: 0
p1_count: 4
date: 2026-06-21
---

# APT Contact Page Critique

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | Long form has no visible progress, live state, or confirmation path in the fetched document. |
| 2 | Match System / Real World | 3 | Field group names match property maintenance language. |
| 3 | User Control and Freedom | 2 | No visible staged back/next flow or review step. |
| 4 | Consistency and Standards | 2 | Main contact form and footer quote form compete. |
| 5 | Error Prevention | 1 | No evidence of inline validation or structured prevention before submit. |
| 6 | Recognition Rather Than Recall | 2 | Fields are grouped, but all groups appear at once. |
| 7 | Flexibility and Efficiency | 2 | Email and phone are present, but the form itself is not optimized. |
| 8 | Aesthetic and Minimalist Design | 2 | The page reads like a field inventory rather than a guided contact experience. |
| 9 | Error Recovery | 2 | Unknown from fetched document; likely plugin-default behavior. |
| 10 | Help and Documentation | 4 | Urgent call guidance and one-business-day expectation are clear. |
| **Total** | | **21/40** | **Acceptable foundation, significant UX improvement needed.** |

## Overall Impression

The page has the right raw materials: contact methods, address, service categories, urgency, access, scheduling, estimate, pets, requester, and tenant info. The failure is presentation. It exposes the entire maintenance-intake model at once, then adds a second quote/contact form in the footer, which creates cognitive load and weakens confidence.

Claude's recommendation is directionally right on the multi-step wizard, but not complete enough as a production plan.

## Priority Issues

### [P1] The form is a wall of decisions

The current page exposes Property Information, Description, Access and Scheduling, Your Contact Information, and Tenant Information as one continuous form. Users must scan too much before they understand the request path.

Fix: Use a five-step wizard: Property, Details, Access, Contact, Review. Show one step at a time, with 3 to 5 decisions max per step.

Suggested command: `$impeccable shape`

### [P1] CF7 replacement is a product decision, not just a design decision

Claude is too blunt saying professionals do not style CF7. A professional team can ship a good CF7 presentation layer when the form config, spam protection, uploads, and notifications are already stable. But for this business, a custom form to n8n is likely the better end state because the request is operational data, not a generic email.

Fix: Choose a migration path explicitly: CF7 presentation upgrade now, custom n8n intake form next, or direct custom replacement if time allows.

Suggested command: `$impeccable shape`

### [P1] The recommendation misses production requirements

A custom form to n8n needs spam protection, nonce or signed token, rate limiting, server-side validation, file upload handling, confirmation emails, failure recovery, privacy/PII handling, and a fallback path if n8n is down.

Fix: Treat n8n webhook submission as a small product surface, not a fetch snippet.

Suggested command: `$impeccable harden`

### [P1] The page has competing form intents

The main request form and the footer "Get a free quote" form appear on the same page. That splits the user's mental model between maintenance request and quote request.

Fix: On the contact page, make the main request flow dominant. Move the footer quote form behind a smaller link or remove it from this route.

Suggested command: `$impeccable distill`

### [P2] The proposed UI pattern needs accessibility details

The wizard needs focus movement, headings per step, keyboard-safe next/back controls, error summary, inline errors, review summary, and reduced-motion behavior. Claude mentions keyboard navigation but does not define the accessibility contract.

Fix: Define the wizard as a semantic form with fieldsets, legends, visible headings, focus transfer, aria-live summary, and non-color-only validation.

Suggested command: `$impeccable audit`

## Recommended Direction

Best professional path:

1. Short term: ship a presentation-only multi-step CF7 wrapper if the current CF7 form is already working.
2. Strategic path: replace CF7 with a custom maintained form that posts to a server-side WordPress endpoint, which then calls n8n.
3. Avoid putting the whole production form in a WPCode snippet. Use a small plugin or theme template with versioned CSS and JS.

## Run Notes

- Target slug: aptmaintenanceinc-com-contact
- Assessment independence: degraded, sub-agents unavailable/not used
- CLI detector: skipped because target is a URL
- Browser visibility: unavailable in this session
- Overlay injection: skipped
- Evidence fallback: live HTML/text fetched through web open
