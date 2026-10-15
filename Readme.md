# Yiga Groups — Web Estate
**From Innovation to Impact.**  
Version 1.0 · Built to the Yiga Groups Brand & Design System

## Overview
This repository contains the complete web estate for **Yiga Groups** — a pan-African group of eight independent companies (wings) united under one brand and one long-term ambition. Each wing is a self-contained static website that shares a common design system while expressing its own industry identity through a carefully assigned accent colour.

The three flagship sites (`Yiga Groups`, `Yiga Holdings`, `CTInc Groups`) were pre-existing. The eight wing sites and the shared design system were built to the v1.0 Brand Document in a single release.

## Repository Structure

Yiga Groups company/
│
├── shared/                   ← Design system shared by all 8 wing sites
│   ├── tokens.css            ← All CSS custom properties (palette, type, spacing, motion)
│   ├── components.css        ← All component styles (nav, hero, cards, stats, footer…)
│   └── base.js               ← Shared JS (nav scroll, mobile drawer, reveal, count-up, form)
│
├── Yiga Groups/              ← Flagship group site (pre-existing, do not modify)
├── Yiga Holdings/            ← Holdings corporate site (pre-existing, do not modify)
├── CTInc Groups/             ← Legacy brand site (pre-existing, do not modify)
│
├── Life changers/            ← Wing 01 — Community & Education
├── CT Net Lines/             ← Wing 02 — Internet & Connectivity  ← NEW folder
├── CT Laps/                  ← Wing 03 — Software & Technology (CT Labs)
├── CT Builders/              ← Wing 04 — Real Estate & Construction
├── CT Farmers/               ← Wing 05 — Agriculture & Food Production
├── CT FX/                    ← Wing 06 — Forex Education (FXCT)
├── Crypto CT/                ← Wing 07 — Web3 & Digital Asset Education
├── CT Vibes/                 ← Wing 08 — Music, Media & Culture
│
└── LOgos/                    ← Brand assets and logo files
```

Each wing folder contains exactly three files:

| File | Purpose |
|------|---------|
| `index.html` | Full accessible, semantic single-page site |
| `styles.css` | Wing accent overrides + wing-specific component styles |
| `script.js` | Wing-specific JS (shared behaviour lives in `../shared/base.js`) |

---

## Wing Directory

| # | Wing | Folder | Accent (light) | Accent (dark) | Industry |
|---|------|--------|---------------|--------------|----------|
| 01 | Life Changers | `Life changers/` | `#16A34A` Green | `#4ADE80` | Community · Education |
| 02 | CT Net Lines | `CT Net Lines/` | `#0B3D91` Royal | `#93C5FD` | Internet · Connectivity |
| 03 | CT Labs | `CT Laps/` | `#2563EB` Blue | `#60A5FA` | Software · Technology |
| 04 | CT Builders | `CT Builders/` | `#166534` Forest | `#86EFAC` | Real Estate · Construction |
| 05 | CT Farmers | `CT Farmers/` | `#4D7C0F` Leaf | `#A3E635` | Agriculture · Food |
| 06 | FXCT | `CT FX/` | `#0369A1` Steel | `#38BDF8` | Forex Education |
| 07 | Crypto CT | `Crypto CT/` | `#4338CA` Indigo | `#818CF8` | Web3 Education |
| 08 | CT Vibes | `CT Vibes/` | `#071A33`* Navy | `#F5B301` Gold | Music · Media · Culture |

> \* CT Vibes uses Navy as the light-surface accent (Sun Gold fails WCAG contrast on white/mist) and Gold exclusively on dark backgrounds.

---

## Shared Design System

All wing sites load the shared files before their own styles:

```html
<link rel="stylesheet" href="../shared/tokens.css">
<link rel="stylesheet" href="../shared/components.css">
<link rel="stylesheet" href="styles.css">
…
<script src="../shared/base.js" defer></script>
<script src="script.js" defer></script>
```

### Core Palette

| Token | Hex | Role |
|-------|-----|------|
| `--navy` | `#071A33` | Primary dark surface, hero backgrounds, footer |
| `--royal` | `#0B3D91` | Stats bar background |
| `--blue` | `#2563EB` | `--interactive` — buttons, links, focus ring |
| `--green` | `#16A34A` | Life Changers accent baseline |
| `--mist` | `#F5F7FA` | Alternate light surface |
| `--ink` | `#0F172A` | Default body text |

### Typography

| Role | Family |
|------|--------|
| Display / Headings | **Fraunces** (optical size, italic for emphasis) |
| Body / UI / Mono | **Inter** |

> Space Grotesk is **retired** from v1.0. It must not be added to any wing site.

### Key Tokens

```css
/* Motion */
--ease-glide:  cubic-bezier(.22, .68, .16, 1);  /* brand easing */
--dur-normal:  240ms;

/* Layout */
--wrap:        1200px;    /* max content width */
--gutter:      clamp(1.5rem, 5vw, 4.5rem);
--section-y:   clamp(4.5rem, 4vw + 3.5rem, 8rem);
--nav-height:  72px;

/* Wing accent (overridden per wing) */
--accent:          /* kickers, icons, stat numerals on light surfaces */
--accent-on-dark:  /* kickers, stat numerals on dark surfaces (hero, stats, footer) */

/* Interactive (NEVER overridden — Electric Blue on every wing) */
--interactive:       #2563EB;
--interactive-hover: #1D4ED8;
```

### Section Surface Order

Every wing page follows this sequence:

| Section | Background class | Colour |
|---------|-----------------|--------|
| Hero | `.yg-hero` | Navy `#071A33` |
| About | `.yg-section--mist` | Mist `#F5F7FA` |
| Services | `.yg-section--white` | White `#FFFFFF` |
| Stats | `.yg-stats` | Royal `#0B3D91` |
| Unique section | varies by wing | — |
| Contact | `.yg-section--mist` | Mist `#F5F7FA` |
| Footer | `.yg-footer` | Navy `#071A33` |

### Shared JS Features (`base.js`)

| Feature | How it works |
|---------|-------------|
| Nav scroll | Adds `.is-scrolled` on `<nav>` past 24 px; triggers glassmorphism |
| Mobile drawer | Toggle with `data-yg-menu-toggle`, closed by overlay click or `Escape` |
| Scroll reveal | `IntersectionObserver` on `[data-reveal]` → adds `.is-revealed` |
| Count-up | `IntersectionObserver` on `[data-count]`, ease-out cubic, 800 ms |
| Contact form | `[data-yg-form]` submit → 800 ms delay → success message |
| Footer year | `[data-year]` → `new Date().getFullYear()` |

---

## Wing-Specific Features

### Life Changers (`Life changers/`)
- **Unique section:** Community stories — 3 testimonial cards with initials avatar, location, and italic Fraunces quote.
- **Hero visual:** Concentric green rings with 5 floating animated dots.

### CT Net Lines (`CT Net Lines/`)
- **Unique section:** Interactive coverage checker — enter a city to get live availability status. Includes city coverage cards for Yaoundé, Douala, and Bamenda.
- **Hero visual:** SVG network diagram — hexagonal nodes, backbone lines, pulsing wave animation.
- **Script.js:** Coverage checker logic (Yaoundé · Douala = available; Bamenda · Bafoussam = coming soon).

### CT Labs (`CT Laps/`)
- **Unique section:** Products showcase — Wings OS, FarmTrack, BuildLog, PayBridge. Each card has accent top bar and tech tag pills.
- **Hero visual:** Dark code-editor window with syntax-highlighted code and blinking cursor.

### CT Builders (`CT Builders/`)
- **Unique section:** Current projects — Greenfield Estate (65%), Hilltop Residences (30%), Northgate Commercial (10%). Each card has status badge and animated progress bar.
- **Hero visual:** Architectural SVG blueprint — building silhouettes, grid lines, sun arc; labelled "Artist's impression".
- **Script.js:** Progress bar animation on scroll-into-view.

### CT Farmers (`CT Farmers/`)
- **Unique section:** Produce grid — 8 crops with emoji icons and availability badges (In season / Year-round / Seasonal).
- **Hero visual:** Layered CSS landscape — sky gradient, sun, three hill layers, crop row lines.

### FXCT (`CT FX/`) ⚠️ Compliance
- **Compliance notice** appears on every page: top banner + repeated above the contact form + in the footer.
- **Unique section:** Three learning path cards (Foundations / Technical Analysis / Live Practice), each including the line *"This is education. No real money is used or required."*
- **Hero visual:** Dark chart window with 10-candle SVG candlestick chart (green/red bars) and blue moving-average line. Labelled "Educational chart — not real market data".

### Crypto CT (`Crypto CT/`) ⚠️ Compliance
- **Compliance notice** appears on every page: top banner + repeated above the contact form.
- **Unique section:** Glossary — 3 key definitions (Blockchain · Wallet · Volatility) in italic Fraunces display type.
- **Hero visual:** SVG hexagonal blockchain grid — active/inactive hex fill states, connector lines, intersection dots.

### CT Vibes (`CT Vibes/`)
- **Unique section:** Featured content — "The Afrobeats Report" (podcast), "Roots & Routes" (documentary), "CT Vibes Live" (events), on a Navy background. Includes artist/creator CTA band.
- **Hero visual:** Animated CSS equalizer — 16 bars, alternating Gold / Gold-faded, each with unique bounce duration and delay. Full `prefers-reduced-motion` compliance.
- **Accent rule:** Sun Gold (`#F5B301`) only on dark surfaces. Navy (`#071A33`) used as `--accent` on light surfaces for WCAG compliance.

---

## Compliance Notices (FXCT & Crypto CT)

Both wings carry mandatory risk disclosures on every page. These notices must not be removed or hidden. The required text:

**FXCT:**
> Trading carries a high risk of loss and is not suitable for everyone. This is education, not financial advice.

**Crypto CT:**
> Digital assets are volatile and you can lose everything you put in. This is education, not financial advice.

---

## Accessibility Baseline (WCAG 2.2 AA)

- Every page has a **skip link** as the first focusable element (`<a class="yg-skip-link" href="#main">`)
- One `<h1>` per page; headings are in logical order
- All interactive elements have a minimum **44 × 44 px** touch target
- Focus ring: 2 px solid `--focus-ring`, 3 px offset
- `aria-expanded` on mobile menu toggle; `aria-modal="true"` on drawer
- `aria-current="page"` on active nav link
- All SVG icons have `aria-hidden="true"` or descriptive `aria-label`
- `prefers-reduced-motion`: all animations and transitions disabled system-wide via tokens + per-component overrides
- All stat count-up numbers carry a descriptive `aria-label` with the final value

---

## How to Open

The sites are static HTML — no build step required.

**Option 1 — File browser:** Open any `index.html` directly in a browser. Note that relative paths (e.g. `../shared/tokens.css`) require that you open from the project directory, not a flat file.

**Option 2 — Local dev server (recommended):**

```bash
# From the project root
npx -y serve .
# Then open http://localhost:3000/[Wing folder]/
```

Or with Python:
```bash
python3 -m http.server 8080
# Then open http://localhost:8080/[Wing folder]/
```

---

## Brand Rules Summary

1. **Fonts:** Fraunces (display) + Inter (body/UI) only. No Space Grotesk.
2. **Buttons / links / focus:** Always `--interactive` (Electric Blue `#2563EB`). Never the wing accent.
3. **Wing accent:** Used only on kickers, icon backgrounds, card accent bars, stat numerals, section dividers.
4. **Section order:** Hero Navy → About Mist → Services White → Stats Royal → Unique → Contact Mist → Footer Navy.
5. **Max content width:** 1200 px (`--wrap`).
6. **Spacing:** 4 px base grid via `--space-*` tokens.
7. **Motion easing:** `cubic-bezier(.22, .68, .16, 1)` (`--ease-glide`).
8. **Compliance wings:** FXCT and Crypto CT must show risk notices on every page.
9. **CT Vibes gold:** `#F5B301` on dark only. Use Navy as `--accent` on light surfaces.
10. **Existing sites:** `Yiga Groups/`, `Yiga Holdings/`, `CTInc Groups/` — do not modify.

---

## Project History

| Date | Event |
|------|-------|
| 2017 | Yiga Groups founded by Besong Yiga James |
| 2017–2024 | Wings launched independently; web properties grew wing by wing |
| 2025 | Brand & Design System v1.0 authored |
| Oct 2026 | All 8 wing sites built to v1.0 spec in a single release; shared system created |

---

*Yiga Groups · From Innovation to Impact · yigagroups.com*
