# smart-pethorizon-ts 🐾

> A premium, highly interactive SaaS landing page and dashboard companion for modern pet care management. Built with **React 19**, **Vite**, **TypeScript**, **Framer Motion**, **GSAP**, and **Tailwind CSS**.

---

## 🎯 Project Overview

**Pet Horizon** is an all-in-one companion platform engineered to coordinate every element of your pet's life. From medical vaccine alerts and daily feeding timelines to household sharing, budget monitoring, and capturing memories in a beautifully stylized diary — Pet Horizon gives pet owners peace of mind in a unified, premium space.

This codebase has been fully upgraded to a strict **TypeScript** structure with a jaw-dropping, luxury **dark-glassmorphism SaaS design**, featuring customized neon accent glows and an interactive background canvas constellation system.

---

## 🚀 Key Features

*   **Interactive Slideshow Hero**: A highly smooth image slideshow crossfading in real-time, accompanied by powerful text overlays powered by GSAP.
*   **Constellation Canvas Particles**: Interactive mouse-chasing star and paw particles rendered natively in a highly efficient 2D HTML Canvas element.
*   **Detailed About Hub**: Beautiful frosted glass cards detailing core well-being pillars, secure family sharing permissions, and schedule coordination.
*   **Active Pet Slider**: An elegant, responsive feature slider to instantly scroll through system capabilities with touch, mouse clicks, or automatic timers.
*   **Transparent & Simple Pricing**: Flexible monthly/yearly subscriptions featuring interactive layout cards with responsive checkmarks, popular plan highlights, and automatic discount math.
*   **Breed-Based Insights**: Modular columns indicating system capabilities for breed-specific feed guidance and automatic alerts.
*   **Stepped Stepper Timeline**: A beautiful vertical interactive roadmap showing pet owners exactly how to register and start managing profiles in 5 easy steps.
*   **Premium Contact & Form**: Beautifully dark contact inputs and secure forms with custom glows, hover states, and smooth focus transitions.
*   **Modern Footer badging**: Rebuilt badging wraps to beautifully host Apple App Store, Google Play, and Android packages cleanly over a pitch-black background.

---

## 🛠️ Technology Stack

- **Core Library**: [React 19](https://react.dev)
- **Tooling/Bundler**: [Vite 8](https://vitejs.dev)
- **Language**: [TypeScript 5](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (Utility-first styling with theme variables)
- **Animations**:
  - [Framer Motion v12](https://www.framer.com/motion/) (Smooth gestures, entries, and slide crossfades)
  - [GSAP v3](https://gsap.com) (Power-packed text timelines and state entries)
- **Icons**: [Lucide React](https://lucide.dev)

---

## 📁 Repository Structure

```bash
PetHorizon/
├── public/                 # Static files (favicons, assets)
├── src/
│   ├── assets/             # Branding icons, Android/Apple badges, and logos
│   ├── components/         # Premium TypeScript components
│   │   ├── About.tsx       # About and pillars
│   │   ├── CTA.tsx         # Call to action card
│   │   ├── Contact.tsx     # Modern contact support form
│   │   ├── Features.tsx    # Scrollable platform features
│   │   ├── Footer.tsx      # Dark badges and quick navbar
│   │   ├── Hero.tsx        # GSAP typography and slideshow
│   │   ├── HowItWorks.tsx  # Timeline stepper guide
│   │   ├── Navbar.tsx      # Fixed dark-glassmorphism nav
│   │   ├── Pricing.tsx     # Yearly switch & transparent cards
│   │   ├── SmartFeatures.tsx # Adaptive profiles cards
│   │   └── WhyChoose.tsx   # Premium stats checklist
│   ├── App.tsx             # Root layout & interactive canvas constellation
│   ├── index.css           # Global theme variables & custom scrollbar
│   └── main.tsx            # React virtual DOM entry point
├── eslint.config.js        # Code linter config
├── tsconfig.json           # Compiler rules for TypeScript
├── tsconfig.node.json      # Node-specific compilation rules
├── vite.config.js          # Vite plugins and build settings
└── package.json            # Scripts, libraries, and devDependencies
```

---

## ⚙️ Installation & Setup

Ensure you have **Node.js** installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/aqib-mansoor/PetHorizon.git
cd PetHorizon
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
Runs the application in hot-reloading development mode:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 4. Build for production
Compiles a highly optimized production bundle to the `/dist` directory, free from any TypeScript errors:
```bash
npm run build
```

---

## 🎨 Design Tokens (Tailwind v4 Theme)

Custom themes defined inside `src/index.css` for a beautiful cohesive feel:
*   `primary`: `#10B981` (Vibrant Emerald Green)
*   `darkgreen`: `#064E3B` (Forest Accent)
*   `lightgreen`: `#D1FAE5` (Faded Green highlights)
*   `mint`: `#6EE7B7` (Neon Mint hover accents)
*   `warmgray`: `#F9FAFB`
*   `success`: `#059669`

---

## 👨‍💻 Developer Guide

- **TypeScript strictness**: All components enforce explicit parameters, preventing `any` variables and making sure React refs are strongly bound to standard DOM nodes.
- **GSAP timelining**: In `Hero.tsx`, we use `gsap.context` which handles cleanup automatically on component unmount, preventing animation memory leaks.
- **Framer Motion spring**: Carousel slides use physically modeled Spring transitions for super natural drag-and-swipe feel.
