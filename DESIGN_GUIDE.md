# DESIGN_GUIDE — mahtamun.design

Dark-first. No light mode. All components use CSS vars and Tailwind custom tokens.

---

## Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `bg` | `#0a0a0a` | Page background |
| `surface` | `#111111` | Card / panel background |
| `surface-2` | `#1a1a1a` | Input background, hover states |
| `border` | `#222222` | All borders |
| `muted` | `#555555` | Secondary text, placeholders |
| `accent` | `#00e676` | CTAs, highlights, active states |
| `accent-dark` | `#00bcd4` | Gradient end (text-gradient) |

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Heading | Syne | 700–800 | 3xl–8xl |
| Body | Onest | 300–500 | xs–lg |
| Labels / Code | JetBrains Mono | 400–500 | xs–sm |

## Spacing

- Section padding: `py-24` (96px)
- Container: `max-w-7xl mx-auto px-6`
- Card padding: `p-5` or `p-6`
- Gap between cards: `gap-4` or `gap-5`

## Border Radius

- Cards / modals: `rounded-2xl`
- Buttons: `rounded-full` (pill) or `rounded-xl`
- Inputs: `rounded-xl`
- Icons / badges: `rounded-xl` or `rounded-full`

## Components

### Button — Primary
```
bg-accent text-bg rounded-full px-7 py-3.5 font-onest font-medium hover:bg-accent/90
```

### Button — Ghost
```
border border-border rounded-full px-7 py-3.5 font-onest text-sm hover:border-accent hover:text-accent
```

### Card
```
rounded-2xl border border-border bg-surface p-5 hover:border-accent/30 transition-all
```

### Input
```
w-full rounded-xl border border-border bg-surface-2 px-4 py-3 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none
```

### Badge
```
rounded-full px-2.5 py-0.5 font-mono text-xs bg-accent/10 text-accent
```

## Animations

- Fade in: `animation: fadeIn 0.6s ease forwards`
- Slide up: `animation: slideUp 0.6s ease forwards`
- Float: `animation: float 4s ease-in-out infinite`
- Marquee: `animation: marquee 20s linear infinite`

## Text Gradient

```css
background: linear-gradient(135deg, #00e676, #00bcd4);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```
Use class: `text-gradient`

## Background Grid

```css
background-image: linear-gradient(#00e676 1px, transparent 1px),
  linear-gradient(90deg, #00e676 1px, transparent 1px);
background-size: 60px 60px;
opacity: 0.03;
```

## Glow Effect

- Full: `box-shadow: 0 0 40px rgba(0, 230, 118, 0.15)` → class `glow`
- Small: `box-shadow: 0 0 20px rgba(0, 230, 118, 0.1)` → class `glow-sm`

---

*Update this file whenever new UI components or tokens are introduced.*
