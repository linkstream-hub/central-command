# KNOWN VULNERABILITIES
# Maintained by: AG | Last updated: 2026-05-21
# These HIGH vulns cannot be fixed without breaking dependency changes.
# CI gate is set to --audit-level=critical (blocks CRITICAL only).
# Revisit each entry when the named package releases a patch that doesn't require --force.

---

## HIGH — serialize-javascript <=7.0.4

**Advisory:** GHSA-5c6j-r48x-rmvq, GHSA-qj8w-gfj5-8c6v
**Risk:** RCE via RegExp.flags and DoS via crafted array-like objects
**Chain:** serialize-javascript → @rollup/plugin-terser (0.2.0–0.4.4) → workbox-build (7.1.0–7.4.0) → @ducanh2912/next-pwa (>=10.2.7)
**Why not fixed:** `npm audit fix --force` would downgrade `@ducanh2912/next-pwa` to 10.2.6 — a breaking change that requires PWA regression testing. Deferred to a dedicated PWA upgrade sprint.
**Exposure:** dev-build toolchain only (workbox is a build-time dependency). No runtime exposure in production Next.js output.
**Resolution path:** Pin `@ducanh2912/next-pwa` to a version that pulls in workbox-build >=7.4.1 once available, or migrate to the official `next-pwa` package.

---

## MODERATE — esbuild <=0.24.2

**Advisory:** GHSA-67mh-4wv8-2f99
**Risk:** Dev server CORS bypass (remote sites can read dev server responses)
**Chain:** esbuild → @esbuild-kit/core-utils → @esbuild-kit/esm-loader → drizzle-kit
**Why not fixed:** Fix would downgrade drizzle-kit — breaking change to DB migration tooling.
**Exposure:** Dev-only. Never exposed in production.

---

## MODERATE — postcss <8.5.10

**Advisory:** GHSA-qx2v-qp2m-jg93
**Risk:** XSS via unescaped `</style>` in CSS stringify output
**Chain:** postcss (inside next's node_modules)
**Why not fixed:** Fix would downgrade Next.js to 9.3.3 — catastrophic breaking change.
**Exposure:** Build-time CSS processing only. No direct user input reaches postcss.
