# ☕ Nexora Coffee

A premium, ethically sourced coffee brand landing page and storefront demo built with **SvelteKit 5**, **TypeScript**, and modern web standards. Designed for high conversion, beautiful aesthetics, and seamless user experience.

![Nexora Coffee](https://nexora-coffee.vercel.app/favicon.png?w=1200&q=80)

## ✨ Features

- 🚀 **Svelte 5 Runes**: Built with the latest `$state`, `$derived`, and `$effect` for ultra-reactive, boilerplate-free code.
- 📱 **Fully Responsive**: Mobile-first design with smooth accordion menus, sticky mobile CTAs, and touch-friendly interactions.
- 🔍 **Real-Time Search**: Instant, client-side product filtering with a beautiful dropdown UI.
- 🎨 **Premium UI/UX**: Glassmorphism, custom scroll animations, hover micro-interactions, and a cohesive coffee-themed design system.
- 🔔 **Toast Notifications**: Custom, non-intrusive feedback system for cart actions, wishlist, and form submissions.
- 🛒 **E-Commerce Ready**: Dynamic product detail pages, quantity selectors, wishlist toggles, and related product recommendations.
- 🔎 **SEO Optimized**: Dynamic meta tags, Open Graph support, JSON-LD structured data, auto-generated `sitemap.xml`, and `robots.txt`.
- ♿ **Accessible**: Semantic HTML, ARIA labels, keyboard navigation support, and reduced-motion preferences.

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (v2+) with Svelte 5 syntax
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Custom CSS Variables, CSS Grid/Flexbox, Smooth Transitions
- **Icons**: [Lucide Svelte](https://lucide.dev/) & [Font Awesome 6](https://fontawesome.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

## 📂 Project Structure

```text
nexora-coffee/
├── src/
│   ├── lib/
│   │   ├── components/       # Reusable UI components (Navbar, Footer, SEO, etc.)
│   │   ├── data.ts           # Centralized mock data (products, testimonials, links)
│   │   ├── stores/           # Svelte 5 state stores (cart, toast)
│   │   ├── types.ts          # TypeScript interfaces
│   │   └── utils.ts          # Helper functions (formatPrice, slugify, etc.)
│   ├── routes/
│   │   ├── +page.svelte      # Homepage
│   │   ├── +layout.svelte    # Root layout (includes Navbar/Footer)
│   │   ├── +error.svelte     # Custom 404/500 error page
│   │   ├── about/            # About Us page
│   │   └── products/
│   │       └── [slug]/       # Dynamic Product Detail Page
│   ├── app.css               # Global CSS variables and base styles
│   └── app.html              # Main HTML template
├── static/
│   └── favicon.png           # Site favicon
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

## 👨‍💻 Author

Crafted with ☕ & ❤️ by **Paras Dhiman** & **SoftwareLabs**.

- **Portfolio**: [paras367.github.io](https://paras367.github.io/)
- **Agency**: [softwarelabs.vercel.app](https://softwarelabs.vercel.app/)

## 📄 License

This project is proprietary. All rights reserved. Unauthorized copying, distribution, or deployment of this code for commercial purposes is strictly prohibited.

---
*Built for excellence. Brewed with purpose.*


