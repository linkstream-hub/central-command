# Design Language: APT Maintenance

> Extracted from `https://aptmaintenanceinc.com` on June 7, 2026
> 512 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#1c3b7d` | rgb(28, 59, 125) | hsl(221, 63%, 30%) | 92 |
| Secondary | `#408bd1` | rgb(64, 139, 209) | hsl(209, 61%, 54%) | 1 |
| Accent | `#223068` | rgb(34, 48, 104) | hsl(228, 51%, 27%) | 31 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#404040` | hsl(0, 0%, 25%) | 492 |
| `#000000` | hsl(0, 0%, 0%) | 178 |
| `#ffffff` | hsl(0, 0%, 100%) | 177 |
| `#999999` | hsl(0, 0%, 60%) | 17 |
| `#ebebeb` | hsl(0, 0%, 92%) | 3 |
| `#c5c8be` | hsl(78, 8%, 76%) | 3 |
| `#d1d4cc` | hsl(83, 9%, 82%) | 2 |
| `#9ea7a7` | hsl(180, 5%, 64%) | 1 |
| `#b4c1ba` | hsl(148, 9%, 73%) | 1 |
| `#333333` | hsl(0, 0%, 20%) | 1 |
| `#23282d` | hsl(210, 13%, 16%) | 1 |
| `#666666` | hsl(0, 0%, 40%) | 1 |

### Background Colors

Used on large-area elements: `#ffffff`, `#233d7d`, `#ebebeb`, `#9ea7a7`, `#c5c8be`, `#b4c1ba`, `#2f4b86`, `#959591`, `#d1d4cc`, `#c0c2b6`, `#1c3b7d`

### Text Colors

Text color palette: `#000000`, `#404040`, `#4169e1`, `#ffffff`, `#233d7d`, `#223068`, `#999999`, `#1c3b7d`, `#ecd541`, `#1b3662`

### Gradients

```css
background-image: linear-gradient(90deg, rgb(236, 215, 64) 50%, rgb(28, 59, 125) 50%);
```

```css
background-image: linear-gradient(90deg, rgb(255, 255, 255) 80%, rgb(28, 59, 125) 80%);
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#404040` | text, border | 492 |
| `#000000` | text, border | 178 |
| `#ffffff` | background, text, border | 177 |
| `#1c3b7d` | background, text, border | 92 |
| `#4169e1` | text, border | 66 |
| `#223068` | text, border, background | 31 |
| `#999999` | text, border, background | 17 |
| `#ecd541` | text, border, background | 7 |
| `#2f4b86` | background | 6 |
| `#ebebeb` | background, border | 3 |
| `#c5c8be` | background, border | 3 |
| `#d1d4cc` | background, border | 2 |
| `#9ea7a7` | background | 1 |
| `#b4c1ba` | background | 1 |
| `#333333` | background | 1 |
| `#408bd1` | background | 1 |
| `#23282d` | background | 1 |
| `#00a0d2` | border | 1 |
| `#666666` | text | 1 |

## Typography

### Font Families

- **Raleway** — used for all (452 elements)
- **Times New Roman** — used for body (60 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 63px | 3.9375rem | 700 | 75.6px | normal | h3 |
| 52px | 3.25rem | 700 | 78px | normal | h2 |
| 45px | 2.8125rem | 700 | 54px | normal | p |
| 36px | 2.25rem | 700 | 54px | normal | h1, span |
| 32.4px | 2.025rem | 700 | 48.6px | normal | h2 |
| 31.5px | 1.9688rem | 500 | 37.8px | normal | p |
| 30px | 1.875rem | 700 | 45px | normal | div |
| 27px | 1.6875rem | 700 | 40.5px | normal | h2 |
| 24px | 1.5rem | 400 | 24px | normal | a, span, svg, path |
| 23.994px | 1.4996rem | 400 | 35.991px | normal | ul, li, a, p |
| 23.94px | 1.4963rem | 700 | 35.91px | normal | h2 |
| 21.6px | 1.35rem | 400 | 32.4px | normal | span |
| 18px | 1.125rem | 400 | 20.7px | normal | html, head, meta, link |
| 15px | 0.9375rem | 400 | 22.5px | normal | svg, path |

### Heading Scale

```css
h3 { font-size: 63px; font-weight: 700; line-height: 75.6px; }
h2 { font-size: 52px; font-weight: 700; line-height: 78px; }
h1 { font-size: 36px; font-weight: 700; line-height: 54px; }
h2 { font-size: 32.4px; font-weight: 700; line-height: 48.6px; }
h2 { font-size: 27px; font-weight: 700; line-height: 40.5px; }
h2 { font-size: 23.94px; font-weight: 700; line-height: 35.91px; }
```

### Body Text

```css
body { font-size: 18px; font-weight: 400; line-height: 20.7px; }
```

### Font Weights in Use

`400` (471x), `700` (31x), `500` (8x), `600` (2x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-2 | 2px | 0.125rem |
| spacing-18 | 18px | 1.125rem |
| spacing-30 | 30px | 1.875rem |
| spacing-36 | 36px | 2.25rem |
| spacing-40 | 40px | 2.5rem |
| spacing-43 | 43px | 2.6875rem |
| spacing-50 | 50px | 3.125rem |
| spacing-54 | 54px | 3.375rem |
| spacing-63 | 63px | 3.9375rem |
| spacing-67 | 67px | 4.1875rem |
| spacing-72 | 72px | 4.5rem |
| spacing-80 | 80px | 5rem |
| spacing-100 | 100px | 6.25rem |
| spacing-110 | 110px | 6.875rem |
| spacing-120 | 120px | 7.5rem |
| spacing-128 | 128px | 8rem |
| spacing-144 | 144px | 9rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| xs | 2px | 1 |
| md | 10px | 3 |
| full | 40px | 1 |
| full | 100px | 2 |

## Box Shadows

**sm** — blur: 5px
```css
box-shadow: rgb(128, 128, 128) 0px 0px 5px 0px;
```

**md** — blur: 8px
```css
box-shadow: rgb(27, 54, 98) 0px 3px 8px 0px;
```

**xl** — blur: 50px
```css
box-shadow: rgba(0, 0, 0, 0.184) 0px 0px 50px 20px;
```

**xl** — blur: 41px
```css
box-shadow: rgba(0, 0, 0, 0.12) 0px 22px 41px 0px;
```

**xl** — blur: 95px
```css
box-shadow: rgba(0, 0, 0, 0.15) 0px 14px 95px 0px;
```

## CSS Custom Properties

### Colors

```css
--wp-block-synced-color: #7a00df;
--wp-block-synced-color--rgb: 122,0,223;
--wp-bound-block-color: var(--wp-block-synced-color);
--wp-admin-theme-color: #007cba;
--wp-admin-theme-color--rgb: 0,124,186;
--wp-admin-theme-color-darker-10: #006ba1;
--wp-admin-theme-color-darker-10--rgb: 0,107,160.5;
--wp-admin-theme-color-darker-20: #005a87;
--wp-admin-theme-color-darker-20--rgb: 0,90,135;
--wp-admin-border-width-focus: 2px;
--wp--preset--color--black: #000000;
--wp--preset--color--cyan-bluish-gray: #abb8c3;
--wp--preset--color--white: #ffffff;
--wp--preset--color--pale-pink: #f78da7;
--wp--preset--color--vivid-red: #cf2e2e;
--wp--preset--color--luminous-vivid-orange: #ff6900;
--wp--preset--color--luminous-vivid-amber: #fcb900;
--wp--preset--color--light-green-cyan: #7bdcb5;
--wp--preset--color--vivid-green-cyan: #00d084;
--wp--preset--color--pale-cyan-blue: #8ed1fc;
--wp--preset--color--vivid-cyan-blue: #0693e3;
--wp--preset--color--vivid-purple: #9b51e0;
```

### Spacing

```css
--wp--preset--font-size--normal: 16px;
--wp--preset--font-size--huge: 42px;
--wp--preset--font-size--small: 13px;
--wp--preset--font-size--medium: 20px;
--wp--preset--font-size--large: 36px;
--wp--preset--font-size--x-large: 42px;
--wp--preset--spacing--20: 0.44rem;
--wp--preset--spacing--30: 0.67rem;
--wp--preset--spacing--40: 1rem;
--wp--preset--spacing--50: 1.5rem;
--wp--preset--spacing--60: 2.25rem;
--wp--preset--spacing--70: 3.38rem;
--wp--preset--spacing--80: 5.06rem;
--wp--style--global--content-size: 1760px;
```

### Shadows

```css
--wp--preset--shadow--natural: 6px 6px 9px rgba(0, 0, 0, 0.2);
--wp--preset--shadow--deep: 12px 12px 50px rgba(0, 0, 0, 0.4);
--wp--preset--shadow--sharp: 6px 6px 0px rgba(0, 0, 0, 0.2);
--wp--preset--shadow--outlined: 6px 6px 0px -3px rgb(255, 255, 255), 6px 6px rgb(0, 0, 0);
--wp--preset--shadow--crisp: 6px 6px 0px rgb(0, 0, 0);
```

### Other

```css
--wp-editor-canvas-background: #ddd;
--wp--preset--aspect-ratio--square: 1;
--wp--preset--aspect-ratio--4-3: 4/3;
--wp--preset--aspect-ratio--3-4: 3/4;
--wp--preset--aspect-ratio--3-2: 3/2;
--wp--preset--aspect-ratio--2-3: 2/3;
--wp--preset--aspect-ratio--16-9: 16/9;
--wp--preset--aspect-ratio--9-16: 9/16;
--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg,rgb(6,147,227) 0%,rgb(155,81,224) 100%);
--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%);
--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg,rgb(252,185,0) 0%,rgb(255,105,0) 100%);
--wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg,rgb(255,105,0) 0%,rgb(207,46,46) 100%);
--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg,rgb(238,238,238) 0%,rgb(169,184,195) 100%);
--wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%);
--wp--preset--gradient--blush-light-purple: linear-gradient(135deg,rgb(255,206,236) 0%,rgb(152,150,240) 100%);
--wp--preset--gradient--blush-bordeaux: linear-gradient(135deg,rgb(254,205,165) 0%,rgb(254,45,45) 50%,rgb(107,0,62) 100%);
--wp--preset--gradient--luminous-dusk: linear-gradient(135deg,rgb(255,203,112) 0%,rgb(199,81,192) 50%,rgb(65,88,208) 100%);
--wp--preset--gradient--pale-ocean: linear-gradient(135deg,rgb(255,245,203) 0%,rgb(182,227,212) 50%,rgb(51,167,181) 100%);
--wp--preset--gradient--electric-grass: linear-gradient(135deg,rgb(202,248,128) 0%,rgb(113,206,126) 100%);
--wp--preset--gradient--midnight: linear-gradient(135deg,rgb(2,3,129) 0%,rgb(40,116,252) 100%);
--yellowdeep: #ECD740;
--yellow: #ECD541;
--blue1: #1C3B7D;
--blue2: #233D7D;
--blue3: #223068;
--blue4: #1B3662;
--blue5: #2F4B86;
--grey1: #EBEBEB;
--width: 1760px;
--width2: 1520px;
```

### Dependencies

```css
--wp-bound-block-color: --wp-block-synced-color;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| xs | 320px | max-width |
| sm | 450px | min-width |
| sm | 480px | max-width |
| sm | 485px | min-width |
| sm | 499px | max-width |
| sm | 500px | min-width |
| sm | 525px | max-width |
| sm | 600px | min-width |
| sm | 640px | max-width |
| sm | 690px | max-width |
| md | 735px | min-width |
| md | 740px | max-width |
| md | 750px | max-width |
| md | 781px | max-width |
| md | 782px | min-width |
| md | 800px | max-width |
| md | 825px | min-width |
| 875px | 875px | min-width |
| 900px | 900px | min-width |
| lg | 960px | min-width |
| lg | 975px | max-width |
| lg | 1000px | min-width |
| lg | 1050px | min-width |
| lg | 1075px | min-width |
| 1099px | 1099px | max-width |
| 1100px | 1100px | min-width |
| 1140px | 1140px | min-width |
| 1150px | 1150px | min-width |
| 1200px | 1200px | min-width |
| xl | 1229px | max-width |
| xl | 1230px | min-width |
| xl | 1249px | max-width |
| xl | 1250px | min-width |
| xl | 1300px | min-width |
| 1399px | 1399px | max-width |
| 1400px | 1400px | min-width |
| 2xl | 1539px | max-width |
| 2xl | 1540px | min-width |
| 2xl | 1550px | max-width |
| 2xl | 1575px | min-width |
| 2xl | 1599px | max-width |
| 2xl | 1600px | min-width |
| 1700px | 1700px | min-width |
| 1780px | 1780px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`

**Durations:** `0.2s`, `0.5s`, `0.1s`, `0.3s`

### Common Transitions

```css
transition: all;
transition: 0.2s;
transition: 0.5s;
transition: transform 0.5s ease-in-out, -webkit-transform 0.5s ease-in-out;
transition: 0.5s ease-in;
transition: 0.1s ease-in;
transition: right 0.3s;
```

### Keyframe Animations

**sbi-sk-scaleout**
```css
@keyframes sbi-sk-scaleout {
  0% { transform: scale(0); }
  100% { transform: scale(1); opacity: 0; }
}
```

**sbi-sk-scaleout**
```css
@keyframes sbi-sk-scaleout {
  0% { transform: scale(0); }
  100% { transform: scale(1); opacity: 0; }
}
```

**fa-spin**
```css
@keyframes fa-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(359deg); }
}
```

**fa-spin**
```css
@keyframes fa-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(359deg); }
}
```

**show-content-image**
```css
@keyframes show-content-image {
  0% { visibility: hidden; }
  99% { visibility: hidden; }
  100% { visibility: visible; }
}
```

**turn-on-visibility**
```css
@keyframes turn-on-visibility {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**turn-off-visibility**
```css
@keyframes turn-off-visibility {
  0% { opacity: 1; visibility: visible; }
  99% { opacity: 0; visibility: visible; }
  100% { opacity: 0; visibility: hidden; }
}
```

**lightbox-zoom-in**
```css
@keyframes lightbox-zoom-in {
  0% { transform: translate(calc((-100vw + var(--wp--lightbox-scrollbar-width))/2 + var(--wp--lightbox-initial-left-position)),calc(-50vh + var(--wp--lightbox-initial-top-position))) scale(var(--wp--lightbox-scale)); }
  100% { transform: translate(-50%, -50%) scale(1); }
}
```

**lightbox-zoom-out**
```css
@keyframes lightbox-zoom-out {
  0% { transform: translate(-50%, -50%) scale(1); visibility: visible; }
  99% { visibility: visible; }
  100% { transform: translate(calc((-100vw + var(--wp--lightbox-scrollbar-width))/2 + var(--wp--lightbox-initial-left-position)),calc(-50vh + var(--wp--lightbox-initial-top-position))) scale(var(--wp--lightbox-scale)); visibility: hidden; }
}
```

**spin**
```css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (3 instances)

```css
.button {
  background-color: rgb(34, 48, 104);
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 400;
  padding-top: 10.8px;
  padding-right: 10.8px;
  border-radius: 4px;
}
```

### Cards (4 instances)

```css
.card {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 22px 41px 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Inputs (14 instances)

```css
.input {
  background-color: rgb(255, 255, 255);
  color: rgb(64, 64, 64);
  border-color: rgb(64, 64, 64);
  border-radius: 0px;
  font-size: 18px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (39 instances)

```css
.link {
  color: rgb(65, 105, 225);
  font-size: 18px;
  font-weight: 400;
}
```

### Navigation (11 instances)

```css
.navigatio {
  background-color: rgb(35, 61, 125);
  color: rgb(64, 64, 64);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 14px 95px 0px;
}
```

### Footer (16 instances)

```css
.foote {
  background-color: rgb(28, 59, 125);
  color: rgb(255, 255, 255);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 18px;
}
```

### Dropdowns (16 instances)

```css
.dropdown {
  background-color: rgb(255, 255, 255);
  border-radius: 0px;
  border-color: rgb(64, 64, 64);
  padding-top: 0px;
}
```

### Badges (1 instances)

```css
.badge {
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Switches (1 instances)

```css
.switche {
  border-radius: 3px;
  border-color: rgba(0, 0, 0, 0.8);
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(64, 64, 64);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(64, 64, 64);
  font-size: 18px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(64, 64, 64);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(64, 64, 64);
  font-size: 18px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(34, 48, 104);
  color: rgb(255, 255, 255);
  padding: 9px 63px 9px 63px;
  border-radius: 4px;
  border: 0px none rgb(255, 255, 255);
  font-size: 23.994px;
  font-weight: 700;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(51, 51, 51);
  color: rgb(255, 255, 255);
  padding: 7px 14px 7px 14px;
  border-radius: 4px;
  border: 0px none rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 400;
```

### Input — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(28, 59, 125);
  padding: 3px 3px 3px 3px;
  border-radius: 3px;
  border: 0px 0px 1px none none solid rgb(28, 59, 125) rgb(28, 59, 125) rgb(236, 213, 65);
  font-size: 18px;
  font-weight: 400;
```

### Input — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: rgb(28, 59, 125);
  padding: 3px 3px 3px 3px;
  border-radius: 3px;
  border: 0px 0px 1px none none solid rgb(28, 59, 125) rgb(28, 59, 125) rgb(236, 213, 65);
  font-size: 18px;
  font-weight: 400;
```

## Layout System

**1 grid containers** and **20 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1520px | 20px |
| 1760px | 0px |
| 100% | 0px |
| 50% | 0px |
| 570px | 0px |
| 620px | 0px |
| 959px | 0px |
| 1642px | 50px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 4-column | 1x |

### Grid Templates

```css
grid-template-columns: 302.5px 302.5px 302.5px 302.5px;
gap: 10px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 17x |
| row/wrap | 1x |
| row-reverse/nowrap | 1x |
| column-reverse/wrap | 1x |

**Gap values:** `10px`, `20px normal`, `36px`, `36px 5%`, `9px`, `normal 10px`, `normal 18px`, `normal 5%`, `normal 7%`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 8 passing, 0 failing color pairs

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#ffffff` | `#2f4b86` | 8.5:1 | AAA |
| `#ffffff` | `#233d7d` | 10.32:1 | AAA |
| `#ffffff` | `#223068` | 12.42:1 | AAA |

## Design System Score

**Overall: 92/100 (Grade: A)**

| Category | Score |
|----------|-------|
| Color Discipline | 92/100 |
| Typography Consistency | 90/100 |
| Spacing System | 100/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 100/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Consistent typography system, Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 214 !important rules — prefer specificity over overrides
- 84% of CSS is unused — consider purging
- 1695 duplicate CSS declarations

## Gradients

**2 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| linear | 90deg | 2 | brand |
| linear | 90deg | 2 | brand |

```css
background: linear-gradient(90deg, rgb(236, 215, 64) 50%, rgb(28, 59, 125) 50%);
background: linear-gradient(90deg, rgb(255, 255, 255) 80%, rgb(28, 59, 125) 80%);
```

## Z-Index Map

**5 unique z-index values** across 2 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| sticky | 50,50 | div.w.p.m.t.s.t.-.t.e.s.t.i.m.o.n.i.a.l. .t.e.s.t.i.m.o.n.i.a.l. .t.-.s.l.i.d.e. .p.o.s.t.-.4.3, div.w.p.m.t.s.t.-.t.e.s.t.i.m.o.n.i.a.l. .t.e.s.t.i.m.o.n.i.a.l. .t.-.s.l.i.d.e. .p.o.s.t.-.1.0.5 |
| base | -1,5 | div.w.p.m.t.s.t.-.t.e.s.t.i.m.o.n.i.a.l.-.i.m.a.g.e. .t.e.s.t.i.m.o.n.i.a.l.-.i.m.a.g.e, div.w.p.m.t.s.t.-.t.e.s.t.i.m.o.n.i.a.l.-.i.m.a.g.e. .t.e.s.t.i.m.o.n.i.a.l.-.i.m.a.g.e, div.w.p.m.t.s.t.-.t.e.s.t.i.m.o.n.i.a.l.-.i.m.a.g.e. .t.e.s.t.i.m.o.n.i.a.l.-.i.m.a.g.e |

## SVG Icons

**2 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xs | 1 |
| md | 1 |

**Icon colors:** `currentColor`, `rgb(0, 0, 0)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Raleway | self-hosted | 400, normal | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 21 | objectFit: fill, borderRadius: 0px, shape: square |
| general | 13 | objectFit: fill, borderRadius: 0px, shape: square |
| gallery | 3 | objectFit: fill, borderRadius: 0px, shape: square |

**Aspect ratios:** 1:1 (17x), 3:2 (8x), 3:4 (5x), 4:3 (3x), 2:3 (2x), 16:9 (1x), 5.1:1 (1x)

## Motion Language

**Feel:** smooth · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `100ms` | 100 |
| `sm` | `200ms` | 200 |
| `md` | `300ms` | 300 |
| `lg` | `500ms` | 500 |

### Easing Families

- **ease-in-out** (10 uses) — `ease`

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `sbi-sk-scaleout` | reveal | transform, opacity | 1 |
| `sbi-sk-scaleout` | reveal | transform, opacity | 1 |

## Component Anatomy

### button — 6 instances

**Slots:** label, icon

### input — 4 instances


## Brand Voice

**Tone:** friendly · **Pronoun:** third-person · **Headings:** Title Case (tight)

### Top CTA Verbs

- **view** (3)
- **property** (1)
- **as** (1)
- **load** (1)

### Button Copy Patterns

- "view all our services" (3×)
- "property maintenance simplified!

apt maintenance simplifies property upkeep with comprehensive construction, renovation, and maintenance services, making us yo" (1×)
- "as a non occupied property owner i have worked with bem and apt on 2 remodel occasions. i was kept informed on any major decisions as well as frequent updates o" (1×)
- "load more" (1×)

### Sample Headings

> APT Maintenance
> About APT Maintenance
> PROPERTY MAINTENANCE SIMPLIFIED!
> Property Maintenance Simplified!
> Property Maintenance Simplified!
> APT Maintenance
> GET IN TOUCH
> QUICK LINKS
> GET A FREE QUOTE

## Page Intent

**Type:** `landing` (confidence 0.31)
**Description:** APT Maintenance simplifies property upkeep with comprehensive construction, renovation, and maintenance services.

Alternates: blog-post (0.35)

## Section Roles

Reading order (top→bottom): nav → nav → content → nav → footer

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | nav | — | 0.4 |
| 1 | nav | — | 0.9 |
| 2 | content | APT Maintenance | 0.3 |
| 3 | nav | APT Maintenance | 0.4 |
| 4 | footer | GET IN TOUCH | 0.95 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.298 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 100px |
| backdrop-filter in use | no |
| Gradients | 2 |

## Imagery Style

**Label:** `photography` (confidence 0.221)
**Counts:** total 37, svg 4, icon 23, screenshot-like 0, photo-like 16
**Dominant aspect:** square-ish
**Radius profile on images:** square

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Raleway` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
