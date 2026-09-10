# YIGA GROUPS

A responsive, single-page marketing website for **YIGA GROUPS**, a diversified African business group founded by Besong Yiga James in 2017.

The page presents the group's eight business wings, its philosophy, founder, culture, and a contact area.

## Project structure

```text
.
├── index.html   # Page content, semantic structure, and inline SVG artwork
├── styles.css   # Design tokens, layout, animation, and responsive styles
└── script.js    # Navigation, accordion, scroll effects, counters, and canvas animation
```

## Features

- Responsive desktop and mobile layouts
- Fixed header that changes appearance after scrolling
- Mobile navigation menu
- Expandable directory for the eight business wings
- Scroll-reveal transitions and animated statistics
- Animated canvas visualization of eight wings orbiting one core
- Animated culture equalizer bars
- Respect for the user's `prefers-reduced-motion` setting
- Accessible controls and live status messaging for the contact form

## Business wings

1. Life Changers — community, education, and empowerment
2. CT Net Lines — connectivity and telecommunications
3. CT Labs — software, technology, and innovation
4. CT Builders — real estate, construction, and development
5. CT Farmers — agriculture and food production
6. FXCT — forex education and trading
7. Crypto CT — Web3 and digital-asset education
8. CT Vibes — entertainment, music, media, and culture

## Run locally

No build process or package installation is required. Open `index.html` in a modern browser.

For a local development server, from this folder run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## External resources

The site loads the following font families from Google Fonts:

- Fraunces
- Space Grotesk
- Inter

All other visual assets are embedded directly in the source as SVG or generated with CSS/canvas.

## Contact form

The contact form is currently a client-side demonstration. It validates required fields and displays a confirmation message, but it does **not** send or store submissions. Connect it to a form provider, email service, or backend endpoint before using it in production.

## Customization

- Update page copy, email address, and wing descriptions in `index.html`.
- Adjust colors, fonts, spacing, and breakpoints through the CSS variables at the top of `styles.css`.
- Change interaction behavior, animations, and form integration in `script.js`.
