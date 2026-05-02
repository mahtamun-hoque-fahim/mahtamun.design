# DESIGN GUIDE — mahtamun.design

> Last updated: 2025 · Stack: Next.js 15 · Tailwind CSS 3 · TypeScript

---

## Color System

| Token | Hex | Usage |
|-------|-----|-------|
| `--col-bg` | `#070707` | Page background |
| `--col-surface` | `#0E0E0E` | Card / section backgrounds |
| `--col-surface-2` | `#161616` | Nested cards, table rows |
| `--col-border` | `#222222` | Default borders, dividers |
| `--col-border-2` | `#333333` | Stronger borders, hover states |
| `--col-text` | `#F0EDE4` | Primary text (warm white) |
| `--col-text-2` | `#9B9B9B` | Secondary text / metadata |
| `--col-text-3` | `#555555` | Muted labels, timestamps |
| `--col-accent` | `#C8FF00` | Lime green accent — CTAs, highlights |
| `--col-accent-fg` | `#070707` | Text on accent background |
| `--col-accent-dim` | `rgba(200,255,0,0.07)` | Subtle accent tint for backgrounds |

---

## Typography

| Role | Font | Usage |
|------|------|-------|
| Display / Headings | Cormorant Garamond | All `h1`–`h5`, hero text, italic accents |
| Body / UI | Outfit | Body copy, labels, navigation |
| Monospace | JetBrains Mono | Code, slugs, timestamps, section labels |

### Scale (fluid via `clamp`)
- Hero H1: `clamp(3.2rem, 7vw, 6.5rem)` · weight 600 · lh 1.02
- Section H2: `clamp(2.5rem, 5vw, 4rem)` · weight 600
- Card H3: `1.5rem` · weight 600
- Body: `0.9375rem` (15px base) · lh 1.65
- Label: `0.7rem` · mono · uppercase · tracking 0.2em

---

## Spacing

- Section padding: `py-28` (7rem vertical)
- Container: max-width 1280px · `padding-inline: 2rem`
- Card padding: `p-7` or `p-8`
- Gap between grid items: `gap-5` (1.25rem)

---

## Component Styles

### Buttons
```
.btn-accent   — #C8FF00 bg / #070707 text / hover: translateY(-1px)
.btn-outline  — transparent / border var(--col-border-2) / hover: border text
.btn-ghost    — no background / color tx-2 / hover: color tx
```
All buttons: `border-radius: 2px` · `text-transform: uppercase` · `font-size: 0.82rem` · `letter-spacing: 0.06em`

### Cards / Surfaces
- `border-radius: 2px` (`.rounded-sm`)
- Border: `1px solid var(--col-border)`
- Hover state: background shifts to `var(--col-surface)` or `var(--col-surface-2)`

### Tags / Badges
- Base: `background: var(--col-surface-2)` · border · `font-size: 0.68rem`
- Accent variant: `background: var(--col-accent-dim)` · accent color text

### Section Labels
- Font: JetBrains Mono · `0.7rem` · `letter-spacing: 0.2em` · uppercase
- Color: `var(--col-accent)`
- Preceded by `32px` horizontal accent line

---

## Grid System

- 1-col mobile → 2-col tablet → 3-col desktop (work grid)
- Services / Process: `grid-cols-2` (desktop) with `gap-px` + accent background (creates bordered grid)
- Admin sidebar: fixed 240px · main content: `margin-left: 240px`

---

## Motion

- Page transitions: CSS class `.reveal` → `.reveal.visible` via IntersectionObserver
- Marquee: `animation: marquee 35s linear infinite`
- Hover lifts: `transform: translateY(-1px)` on buttons
- Image hover zoom: `scale(1.05)` with `duration-700`
- Cursor: custom dot + lagging ring (desktop only)

---

## Dark-First Principles

1. No pure black or pure white — use the warm-dark token palette
2. The grain overlay (`body::after`) adds subtle texture; never remove it
3. Selection color = `var(--col-accent)` with `var(--col-accent-fg)` text
4. Scrollbar: 3px wide · track matches bg · thumb is `var(--col-border-2)`
5. All surfaces maintain hierarchy: bg → surface → surface-2

---

## Admin UI

- Sidebar: 240px fixed left · `var(--col-surface)` bg · `1px solid var(--col-border)` right border
- Active nav item: `var(--col-surface-2)` bg · `2px solid var(--col-accent)` left border
- Form inputs: `.admin-input` class · focus = accent border
- Form labels: `.admin-label` class · mono · uppercase · `var(--col-text-2)`
