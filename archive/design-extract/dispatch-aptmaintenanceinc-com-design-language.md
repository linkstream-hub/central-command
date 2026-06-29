# Design Language: APT Central Command

> Extracted from `https://dispatch.aptmaintenanceinc.com` on June 7, 2026
> 58 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#0d0f14` | rgb(13, 15, 20) | hsl(223, 21%, 6%) | 2 |
| Secondary | `#1e293b` | rgb(30, 41, 59) | hsl(217, 33%, 17%) | 56 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#ffffff` | hsl(0, 0%, 100%) | 53 |
| `#64748b` | hsl(215, 16%, 47%) | 1 |

### Background Colors

Used on large-area elements: `#0d0f14`, `#0a0f18`, `#ffffff`

### Text Colors

Text color palette: `#ffffff`, `#64748b`

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#1e293b` | border | 56 |
| `#ffffff` | text, background, border | 53 |
| `#0d0f14` | background | 2 |
| `#64748b` | text | 1 |

## Typography

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 24px | 1.5rem | 700 | 32px | normal | h1 |
| 18px | 1.125rem | 600 | 28px | normal | h2 |
| 16px | 1rem | 400 | 24px | normal | html, head, link, script |
| 14px | 0.875rem | 400 | 20px | normal | p |

### Heading Scale

```css
h1 { font-size: 24px; font-weight: 700; line-height: 32px; }
h2 { font-size: 18px; font-weight: 600; line-height: 28px; }
```

### Body Text

```css
body { font-size: 14px; font-weight: 400; line-height: 20px; }
```

### Font Weights in Use

`400` (49x), `500` (7x), `700` (1x), `600` (1x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-2 | 2px | 0.125rem |
| spacing-24 | 24px | 1.5rem |
| spacing-32 | 32px | 2rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| lg | 12px | 2 |
| lg | 16px | 1 |

## CSS Custom Properties

### Colors

```css
--bg-primary: #0a0f18;
--bg-surface: #121926;
--text-primary: #fff;
--text-secondary: #94a3b8;
--text-muted: #64748b;
--border-subtle: #1e293b;
--accent: #f5b900;
--accent-hover: #e0a700;
--accent-gold: #f5b900;
--color-teal: #00d2d3;
--color-urgent: #ff4757;
--color-turnover: coral;
--surface-card: #121926;
--color-surface: var(--bg-surface);
--color-text-primary: var(--text-primary);
--color-accent: var(--accent);
--color-accent-amber: var(--accent);
--foreground: var(--text-primary);
--color-zinc-100: lab(96.1634% .0993311 -.364041);
--color-amber-400: lab(80.1641% 16.6016 99.2089);
--tw-ring-shadow: 0 0 #0000;
--color-purple-500: lab(52.0183% 66.11 -78.2316);
--color-emerald-300: lab(83.9203% -48.7124 13.8849);
--color-slate-700: lab(26.9569% -1.47016 -15.6993);
--color-red-900: lab(28.5139% 44.5539 29.0463);
--color-teal-400: lab(76.0109% -53.3483 -2.27906);
--color-blue-700: lab(36.9089% 35.0961 -85.6872);
--color-amber-600: lab(60.3514% 40.5624 87.1228);
--color-slate-500: lab(48.0876% -2.03595 -16.5814);
--color-slate-900: lab(7.78673% 1.82345 -15.0537);
--tw-inset-ring-shadow: 0 0 #0000;
--color-blue-300: lab(77.5052% -6.4629 -36.42);
--color-yellow-400: lab(83.2664% 8.65132 106.895);
--color-slate-300: lab(84.7652% -1.94535 -7.93337);
--color-purple-900: lab(24.9401% 45.2703 -51.2728);
--color-amber-300: lab(86.4156% 6.13147 78.3961);
--color-gray-500: lab(47.7841% -.393182 -10.0268);
--color-green-500: lab(70.5521% -66.5147 45.8073);
--color-emerald-600: lab(55.0481% -49.9246 15.93);
--tw-ring-offset-color: #fff;
--color-red-400: lab(63.7053% 60.745 31.3109);
--color-white: #fff;
--color-gray-400: lab(65.9269% -.832707 -8.17473);
--color-blue-400: lab(65.0361% -1.42065 -56.9802);
--color-slate-400: lab(65.5349% -2.25151 -14.5072);
--color-gray-100: lab(96.1596% -.0823438 -1.13575);
--color-red-500: lab(55.4814% 75.0732 48.8528);
--tw-ring-offset-width: 0px;
--color-zinc-300: lab(84.9837% .601262 -2.17986);
--color-standard: #10b981;
--color-border-subtle: #1e293b;
--tw-ring-offset-shadow: 0 0 #0000;
--color-gray-800: lab(16.1051% -1.18239 -11.7533);
--color-green-600: lab(59.0978% -58.6621 41.2579);
--color-zinc-500: lab(47.8878% 1.65477 -5.77283);
--color-zinc-900: lab(8.30603% .618205 -2.16572);
--color-red-300: lab(76.5514% 36.422 15.5335);
--color-zinc-800: lab(15.7305% .613764 -2.16959);
--color-slate-800: lab(16.132% -.318035 -14.6672);
--color-orange-500: lab(64.272% 57.1788 90.3583);
--color-bg-primary: #0a0f18;
--color-slate-600: lab(35.5623% -1.74978 -15.4316);
--color-emerald-950: lab(15.0582% -17.9507 2.38369);
--color-orange-400: lab(70.0429% 42.5156 75.8207);
--color-amber-500: lab(72.7183% 31.8672 97.9407);
--color-pte: #8b5cf6;
--color-green-400: lab(78.503% -64.9265 39.7492);
--color-emerald-500: lab(66.9756% -58.27 19.5419);
--color-blue-500: lab(54.1736% 13.3369 -74.6839);
--color-blue-900: lab(26.1542% 15.7545 -51.5504);
--color-zinc-400: lab(65.6464% 1.53497 -5.42429);
--color-amber-700: lab(47.2709% 42.9082 69.2966);
--color-amber-900: lab(31.2288% 30.2627 40.0378);
--color-zinc-600: lab(35.1166% 1.78212 -6.1173);
--color-purple-400: lab(63.6946% 47.6127 -59.2066);
--color-blue-600: lab(44.0605% 29.0279 -86.0352);
--tw-border-style: solid;
--color-red-600: lab(48.4493% 77.4328 61.5452);
--color-blue-200: lab(86.15% -4.04379 -21.0797);
--color-black: #000;
--color-text-muted: #64748b;
--color-emerald-400: lab(75.0771% -60.7313 19.4147);
--color-green-700: lab(47.0329% -47.0239 31.4788);
--color-teal-500: lab(67.3859% -49.0983 -2.63511);
--color-yellow-500: lab(76.3898% 14.5258 98.4589);
--color-amber-200: lab(91.7203% -.505269 49.9084);
--color-purple-300: lab(78.3298% 26.2195 -34.9499);
```

### Spacing

```css
--tw-space-x-reverse: 0;
--spacing: .25rem;
--tw-space-y-reverse: 0;
```

### Typography

```css
--font-sans: var(--font-sans);
--font-mono: var(--font-mono);
--tracking-tight: -.025em;
--text-2xl: 1.5rem;
--text-lg: 1.125rem;
--text-5xl--line-height: 1;
--text-base--line-height: calc(1.5 / 1);
--tracking-wider: .05em;
--text-lg--line-height: calc(1.75 / 1.125);
--font-weight-bold: 700;
--text-xs--line-height: calc(1 / .75);
--default-font-family: ;
--text-xl: 1.25rem;
--leading-relaxed: 1.625;
--leading-snug: 1.375;
--tracking-tighter: -.05em;
--font-weight-black: 900;
--text-2xl--line-height: calc(2 / 1.5);
--tracking-wide: .025em;
--text-xl--line-height: calc(1.75 / 1.25);
--font-weight-semibold: 600;
--text-sm: .875rem;
--leading-tight: 1.25;
--text-4xl: 2.25rem;
--tracking-normal: 0em;
--text-sm--line-height: calc(1.25 / .875);
--text-3xl--line-height: calc(2.25 / 1.875);
--text-5xl: 3rem;
--text-3xl: 1.875rem;
--text-xs: .75rem;
--tracking-widest: .1em;
--font-weight-medium: 500;
--font-weight-normal: 400;
--text-4xl--line-height: calc(2.5 / 2.25);
--text-base: 1rem;
--default-mono-font-family: ;
```

### Shadows

```css
--tw-inset-shadow-alpha: 100%;
--tw-drop-shadow-alpha: 100%;
--tw-inset-shadow: 0 0 #0000;
--tw-shadow-alpha: 100%;
--drop-shadow-md: 0 3px 3px #0000001f;
--tw-shadow: 0 0 #0000;
```

### Radii

```css
--radius-sm: .25rem;
--radius-2xl: 1rem;
--radius-md: .375rem;
--radius-lg: .5rem;
--radius-3xl: 1.5rem;
--radius-xl: .75rem;
```

### Other

```css
--lightningcss-light: ;
--lightningcss-dark: initial;
--surface-raised: #1e293b;
--background: var(--bg-primary);
--container-md: 28rem;
--aspect-video: 16 / 9;
--blur-xl: 24px;
--tw-gradient-from: rgba(0, 0, 0, 0);
--tw-gradient-to: rgba(0, 0, 0, 0);
--tw-scale-z: 1;
--container-sm: 24rem;
--tw-gradient-via-position: 50%;
--container-lg: 32rem;
--tw-gradient-to-position: 100%;
--default-transition-duration: .15s;
--animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
--container-xs: 20rem;
--tw-gradient-from-position: 0%;
--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
--tw-translate-z: 0;
--tw-gradient-via: rgba(0, 0, 0, 0);
--tw-scale-y: 1;
--tw-translate-y: 0;
--blur-md: 12px;
--animate-spin: spin 1s linear infinite;
--container-4xl: 56rem;
--tw-divide-y-reverse: 0;
--container-2xl: 42rem;
--tw-translate-x: 0;
--tw-scale-x: 1;
--container-xl: 36rem;
--blur-sm: 8px;
```

### Dependencies

```css
--color-surface: --bg-surface;
--color-text-primary: --text-primary;
--color-accent: --accent;
--color-accent-amber: --accent;
--background: --bg-primary;
--foreground: --text-primary;
--font-sans: --font-sans;
--font-mono: --font-mono;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Transitions & Animations

**Easing functions:** `[object Object]`

**Durations:** `0.3s`, `0.15s`

### Common Transitions

```css
transition: all;
transition: background-color 0.3s, color 0.3s;
transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), fill 0.15s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.15s cubic-bezier(0.4, 0, 0.2, 1);
```

### Keyframe Animations

**shake**
```css
@keyframes shake {
  0%, 100% { transform: translate(0px); }
  20%, 60% { transform: translate(-6px); }
  40%, 80% { transform: translate(6px); }
}
```

**spin**
```css
@keyframes spin {
  100% { transform: rotate(360deg); }
}
```

**pulse**
```css
@keyframes pulse {
  50% { opacity: 0.5; }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (1 instances)

```css
.button {
  background-color: rgb(255, 255, 255);
  color: lab(16.1051 -1.18239 -11.7533);
  font-size: 16px;
  font-weight: 500;
  padding-top: 12px;
  padding-right: 16px;
  border-radius: 12px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: lab(16.1051 -1.18239 -11.7533);
  padding: 12px 16px 12px 16px;
  border-radius: 12px;
  border: 0px solid rgb(30, 41, 59);
  font-size: 16px;
  font-weight: 500;
```

## Layout System

**0 grid containers** and **4 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 448px | 0px |

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 2x |
| column/nowrap | 2x |

**Gap values:** `12px`, `8px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 0 passing, 0 failing color pairs

## Design System Score

**Overall: 95/100 (Grade: A)**

| Category | Score |
|----------|-------|
| Color Discipline | 100/100 |
| Typography Consistency | 90/100 |
| Spacing System | 100/100 |
| Shadow Consistency | 85/100 |
| Border Radius Consistency | 100/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Consistent typography system, Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 819 duplicate CSS declarations

## Z-Index Map

**1 unique z-index values** across 1 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| dropdown | 100,100 | div.f.i.x.e.d. .b.o.t.t.o.m.-.4. .l.e.f.t.-.1./.2. .-.t.r.a.n.s.l.a.t.e.-.x.-.1./.2. .z.-.[.1.0.0.]. .f.l.e.x. .f.l.e.x.-.c.o.l. .g.a.p.-.2. .w.-.8.0. .p.o.i.n.t.e.r.-.e.v.e.n.t.s.-.n.o.n.e |

## SVG Icons

**1 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| sm | 1 |

**Icon colors:** `#4285F4`, `#34A853`, `#FBBC05`, `#EA4335`, `rgb(0, 0, 0)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| GeistSans | self-hosted | 100 900 | normal |
| GeistMono | self-hosted | 100 900 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 1 | objectFit: contain, borderRadius: 12px, shape: rounded |

**Aspect ratios:** 1:1 (1x)

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `150ms` | 150 |
| `md` | `300ms` | 300 |

### Easing Families

- **custom** (1 uses) — `cubic-bezier(0.4, 0, 0.2, 1)`

## Brand Voice

**Tone:** neutral · **Pronoun:** third-person · **Headings:** unknown (tight)

### Top CTA Verbs

- **sign** (1)

### Button Copy Patterns

- "sign in with google" (1×)

## Page Intent

**Type:** `landing` (confidence 0.45)
**Description:** APT Maintenance Inc. Progressive Web App

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.281 |
| Shadow profile | none |
| Avg shadow blur | 0px |
| Max radius | 16px |
| backdrop-filter in use | no |
| Gradients | 0 |

## Imagery Style

**Label:** `icon-only` (confidence 0.6)
**Counts:** total 1, svg 0, icon 1, screenshot-like 0, photo-like 0
**Dominant aspect:** square-ish
**Radius profile on images:** soft

## Component Library

**Detected:** `tailwindcss` (confidence 0.766)

Evidence:
- tailwind-like class density 74%

## Quick Start

To recreate this design in a new project:

2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
