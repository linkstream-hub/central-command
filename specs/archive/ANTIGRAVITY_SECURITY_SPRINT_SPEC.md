# ANTIGRAVITY_SECURITY_SPRINT_SPEC
**Date:** 2026-04-30
**Sprint:** Security hardening — pre-licensing requirement

---

## What This Builds

Three changes across the CC2.0 Next.js app and GitHub Actions:

1. **Sentry error tracking** — captures unhandled errors from the Next.js frontend and sends them to Sentry. Zero errors are silently swallowed.
2. **CSP headers** — Content-Security-Policy on all Next.js routes. Blocks XSS by restricting what scripts, styles, and connections are allowed.
3. **auto-spec.yml** — GitHub Actions workflow that triggers automatically when a GitHub issue with label `e2e-failure` is opened, calls the spec-architect sentinel, and opens a draft spec PR without human intervention.

---

## Files You Must Change

| # | File | What |
|---|------|------|
| 1 | `tech-pwa/package.json` | Add `@sentry/nextjs` dependency |
| 2 | `tech-pwa/sentry.client.config.ts` | New file — client-side Sentry init |
| 3 | `tech-pwa/sentry.server.config.ts` | New file — server-side Sentry init |
| 4 | `tech-pwa/sentry.edge.config.ts` | New file — edge runtime Sentry init |
| 5 | `tech-pwa/next.config.ts` | Wrap with `withSentryConfig`, add CSP headers |
| 6 | `tech-pwa/src/app/global-error.tsx` | New file — Sentry error boundary for root layout |
| 7 | `.github/workflows/auto-spec.yml` | New file — auto-trigger spec on e2e-failure |

---

## Files You Must NOT Change

- Any `.gs` files at repo root (`TechPWA.gs`, `Code.js`, etc.)
- `dashboard-api/DashboardAPI.gs`
- Any existing `.github/workflows/*.yml` files other than creating the new `auto-spec.yml`
- `tech-pwa/src/app/layout.tsx` — Sentry wraps via `global-error.tsx`, not layout
- `tech-pwa/src/auth.ts`
- `tech-pwa/playwright.config.ts`

---

## Fix 1 — Install Sentry

In `tech-pwa/`, run:
```
npm install @sentry/nextjs
```

This adds `@sentry/nextjs` to `package.json` and `package-lock.json`.

---

## Fix 2 — `tech-pwa/sentry.client.config.ts` (new file)

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  debug: false,
  enabled: process.env.NODE_ENV === 'production',
});
```

---

## Fix 3 — `tech-pwa/sentry.server.config.ts` (new file)

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  debug: false,
  enabled: process.env.NODE_ENV === 'production',
});
```

---

## Fix 4 — `tech-pwa/sentry.edge.config.ts` (new file)

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  debug: false,
  enabled: process.env.NODE_ENV === 'production',
});
```

---

## Fix 5 — `tech-pwa/next.config.ts`

Read the current file first. Then make exactly these two changes:

**A. Wrap the export with `withSentryConfig`.**

Current final lines of the file:
```typescript
export default withPWA(nextConfig);
```

Replace with:
```typescript
import { withSentryConfig } from '@sentry/nextjs';

const sentryConfig = {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
};

export default withSentryConfig(withPWA(nextConfig), sentryConfig);
```

**B. Add CSP headers inside `nextConfig`. The current `nextConfig` object is:**
```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  allowedDevOrigins: ['127.0.0.1'],
};
```

Replace with:
```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  allowedDevOrigins: ['127.0.0.1'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://lh3.googleusercontent.com",
              "connect-src 'self' https://api.aptmaintenanceinc.com https://o4511312150855680.ingest.us.sentry.io",
              "frame-src https://accounts.google.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

**Note on `unsafe-eval`:** Required for Next.js dev mode source maps. Acceptable for this stack.

---

## Fix 6 — `tech-pwa/src/app/global-error.tsx` (new file)

```typescript
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <h2 className="text-xl font-black text-white tracking-tight">Something went wrong</h2>
          <p className="text-sm text-gray-400">The error has been reported automatically.</p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
```

---

## Fix 7 — `.github/workflows/auto-spec.yml` (new file)

```yaml
name: Auto-Spec on E2E Failure

on:
  issues:
    types: [labeled]

jobs:
  trigger-spec:
    name: Generate correction spec
    if: github.event.label.name == 'e2e-failure'
    runs-on: ubuntu-latest
    permissions:
      issues: write

    steps:
      - name: Extract failure context
        id: context
        uses: actions/github-script@v7
        with:
          result-encoding: string
          script: |
            const body = context.payload.issue.body || '';
            const title = context.payload.issue.title || '';
            // Extract failing test names from issue body
            const match = body.match(/\*\*Failing tests:\*\*\s*(.+)/);
            const failingTests = match ? match[1].trim() : title;
            const date = new Date().toISOString().slice(0,10).replace(/-/g,'');
            core.setOutput('failing_tests', failingTests);
            core.setOutput('spec_name', `E2E_FIX_${date}`);
            core.setOutput('issue_number', context.payload.issue.number);

      - name: POST to spec-architect sentinel
        run: |
          curl -s -X POST "${{ secrets.SPEC_ARCHITECT_WEBHOOK_URL }}" \
            -H "Content-Type: application/json" \
            -H "X-Spec-Key: ${{ secrets.SPEC_ARCHITECT_KEY }}" \
            -d '{
              "idea": "Fix failing E2E tests: ${{ steps.context.outputs.failing_tests }}",
              "spec_name": "${{ steps.context.outputs.spec_name }}",
              "issue_url": "${{ github.event.issue.html_url }}"
            }'

      - name: Comment on issue
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: ${{ steps.context.outputs.issue_number }},
              body: [
                '🤖 **Spec architect triggered.**',
                '',
                'A correction spec is being generated. A draft PR will open within ~2 minutes.',
                '',
                '**Next steps after spec PR opens:**',
                '1. Claude Code reviews the spec PR for accuracy',
                '2. Approve and merge the spec PR',
                '3. Open Antigravity → point at the spec file → implement',
                '4. Push triggers E2E rerun',
              ].join('\n'),
            });
```

---

## What Brandon Must Do Before This Goes Live

**Sentry — add 3 environment variables to Vercel (5 minutes):**

Go to Vercel → `central-command` project → Settings → Environment Variables → add all three for Production + Preview + Development:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SENTRY_DSN` | `https://eadba6a4bfaa5f4190d65c746c819a81@o4511312150855680.ingest.us.sentry.io/4511312155443200` |
| `SENTRY_ORG` | `bgb-crb-holdings-llc` |
| `SENTRY_PROJECT` | `javascript-nextjs` |

**SPEC_ARCHITECT_KEY secret (2 minutes):**
- In GitHub repo → Settings → Secrets and variables → Actions
- Confirm `SPEC_ARCHITECT_KEY` exists. If not, get the value from Railway → sentinel-spec-architect service → Environment variables.
- Also confirm `SPEC_ARCHITECT_WEBHOOK_URL` is set (should be from session 38).

---

## Verification Steps

1. **CSP headers:** In Chrome DevTools → Network tab → click any page request → Response Headers → confirm `Content-Security-Policy` is present.

2. **Sentry:** After Brandon adds DSN and redeploys — go to `/live`, open DevTools Console, paste `throw new Error('sentry-test-' + Date.now())`. Within 30 seconds, the error should appear in Sentry dashboard.

3. **auto-spec.yml:** Go to GitHub → Actions → `Auto-Spec on E2E Failure` → confirm it appears. (Full test requires a real e2e-failure issue, which you can simulate by manually adding the `e2e-failure` label to any open issue.)

4. **TypeScript:** Run `cd tech-pwa && npx tsc --noEmit` — must show zero errors.

5. **No `console.error` or blank screens** — visit `/live`, `/schedule`, `/jobs`, `/time-off` and confirm all render correctly.

---

## Do NOT submit as complete until:
- `git diff --name-only` shows all 7 files above (and nothing else unexpected)
- `npx tsc --noEmit` shows zero errors
- CSP header visible in DevTools on a local `npm run build && npm run start`

Run `npx tsc --noEmit` in `tech-pwa/` — must pass with 0 errors before calling sprint complete.
