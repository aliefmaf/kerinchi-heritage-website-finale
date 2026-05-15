# 🏛️ Kerinchi Heritage Website

[![Framework](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Package Manager](https://img.shields.io/badge/pnpm-%E2%89%A59.0.0-orange?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-blue?style=flat-square&logo=vercel)](https://kerinchi-heritage-website.vercel.app)

An immersive, premium digital archive and exhibition space dedicated to preserving, celebrating, and exploring the rich cultural history, art, and traditions of the **Kerinchi (Kerinci)** heritage. Built with a dark editorial aesthetic, fluid animations, and smooth interactive elements to give traditional history a modern, interactive gallery feel.

🌐 **Live Demo:** [kerinchi-heritage-website.vercel.app](https://kerinchi-heritage-website.vercel.app)

---

## ✨ Features

* **🎨 Immersive Virtual Gallery:** A full-screen horizontal showcase of Kerinchi artifacts, historical photography, and traditional art.
* **✨ Dynamic Ambient Lighting:** Canvas-based smart color extraction that tints the background gradients seamlessly depending on the artifact or image in view.
* **🕹️ Advanced Interactions:** Heavy-drag gestures with momentum-based settling, trackpad/magic mouse compliance, and parallax card movements powered by Framer Motion.
* **⌨️ Full Accessibility:** Entirely navigable via keyboard inputs (Arrow keys, `A`/`D`, `Home`/`End`) with on-screen structural prompts.
* **💨 Fluid Motion & Sequencing:** High-performance timelines orchestrated through GSAP for text reveals and crossfading structural assets.
* **💎 Editorial UI Design:** Sleek modern dark mode featuring glassmorphic overlays, clean typography mixing elegant serif layouts with highly legible body tokens, and strict text-selection prevention on dynamic items.

---

## 🛠️ Tech Stack

* **Core Framework:** Next.js 15 (App Router) & React 19
* **Styling Engine:** Tailwind CSS v4 (with native CSS design tokens)
* **Animation Engines:** Framer Motion (for gesture-driven drags/physics) & GSAP (for scroll-triggered states)
* **Language Variant:** TypeScript
* **Package Management:** `pnpm`

---

## 📁 Project Structure

```text
├── app/
│   ├── page.tsx               # Main landing & gallery portal
│   ├── layout.tsx             # Global layout & custom font injection
│   └── globals.css            # Tailwind CSS v4 directives & design tokens
├── components/
│   ├── art-gallery-slider.tsx # Core responsive slider mechanics
│   ├── artwork-card.tsx       # Reusable asset presentation module
│   └── navigation-dots.tsx    # Dynamic active indicator system
├── hooks/
│   ├── use-slider-navigation.ts # Keyboard index state tracker
│   ├── use-slider-drag.ts       # Framer Motion drag dampening logic
│   ├── use-slider-wheel.ts      # Multi-directional scroll delta system
│   └── use-color-extraction.ts  # State controller for context lighting
├── lib/
│   ├── color-extractor.ts     # HTML5 Canvas pixel sampling logic
│   └── constants.ts           # Config variables (Thresholds, timing)
├── data/
│   └── artworks.ts            # Local JSON database for Kerinchi history & media
└── types/
    └── artwork.ts             # Strict TypeScript definitions
```

# Kerinchi Heritage Website

## Getting Started

### Prerequisites

Ensure you have **Node.js** installed (v18.x or later recommended) and **pnpm**:

```bash
npm install -g pnpm
```

### Installation & Local Setup

**Clone the Repository:**

```bash
git clone https://github.com/aliefmaf/kerinchi-heritage-website-finale.git
cd kerinchi-heritage-website-finale
```

**Install Dependencies:**

```bash
pnpm install
```

**Run the Development Server:**

```bash
pnpm dev
```

**View the Application:**

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🏗️ Production Build

To build the static application for production optimization:

```bash
pnpm build
pnpm start
```

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 🤝 Acknowledgments

- Designed to bridge the gap between historical heritage and cutting-edge web design.
- Built using interactive components inspired by sleek modern web portfolios.
Open http://localhost:3000 in your web browser.

🏗️ Production Build
To build the static application for production optimization:

Bash
pnpm build
pnpm start
📜 License
This project is open-source and available under the MIT License.

🤝 Acknowledgments
Designed to bridge the gap between historical heritage and cutting-edge web design.

Built using interactive components inspired by sleek modern web portfolios.
