# 🏛️ Kerinchi Heritage Website

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-%E2%89%A59.0.0-orange?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-blue?style=flat-square&logo=vercel)](https://kerinchi-heritage-website.vercel.app)

A digital archive and exhibition space for the cultural history, art, and traditions of the **Kerinchi (Kerinci)** heritage — built with a dark editorial aesthetic, fluid animations, and smooth interactive elements.

🌐 **Live:** [kerinchi-heritage-website.vercel.app](https://kerinchi-heritage-website.vercel.app)

---

## Features

- **Virtual Gallery** — Full-screen horizontal showcase of Kerinchi artifacts, historical photography, and traditional art
- **Ambient Lighting** — Canvas-based color extraction that tints background gradients based on the artifact in view
- **Gesture Interactions** — Drag with momentum settling, trackpad support, and parallax card movement via Framer Motion
- **Keyboard Navigation** — Arrow keys, `A`/`D`, `Home`/`End` with on-screen prompts
- **Animations** — GSAP-orchestrated text reveals and crossfading transitions
- **Editorial UI** — Dark mode with glassmorphic overlays and mixed serif/sans-serif typography

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion, GSAP |
| Language | TypeScript |
| Package Manager | pnpm |

---

## Project Structure

```text
├── app/
│   ├── page.tsx               # Main landing & gallery portal
│   ├── layout.tsx             # Global layout & font injection
│   └── globals.css            # Tailwind v4 directives & design tokens
├── components/
│   ├── art-gallery-slider.tsx # Core slider mechanics
│   ├── artwork-card.tsx       # Asset presentation module
│   └── navigation-dots.tsx    # Active indicator system
├── hooks/
│   ├── use-slider-navigation.ts # Keyboard index state
│   ├── use-slider-drag.ts       # Drag dampening logic
│   ├── use-slider-wheel.ts      # Scroll delta handling
│   └── use-color-extraction.ts  # Ambient lighting state
├── lib/
│   ├── color-extractor.ts     # Canvas pixel sampling
│   └── constants.ts           # Thresholds and timing config
├── data/
│   └── artworks.ts            # Kerinchi history & media database
└── types/
    └── artwork.ts             # TypeScript definitions
```

---

## Getting Started

**Prerequisites:** Node.js v18+ and pnpm

```bash
npm install -g pnpm
```

**Clone and install:**

```bash
git clone https://github.com/aliefmaf/kerinchi-heritage-website-finale.git
cd kerinchi-heritage-website-finale
pnpm install
```

**Run locally:**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

```bash
pnpm build
pnpm start
```

---

## License

MIT
