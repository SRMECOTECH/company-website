<<<<<<< HEAD
# SRM ECO TECH — Vite + React + Plain CSS

A **lean** version of the SRM ECO TECH marketing site: pure HTML + CSS + JS feel, built on Vite + React + react-router. No Tailwind, no Next.js, no Framer Motion — just a single CSS file with design tokens, hand-rolled keyframes, and IntersectionObserver-driven scroll reveals.

The mail backend (Nodemailer over SMTP) is a tiny Express server in `server/` — runs separately.

## What's in here

```
srm-ecotech-vite/
├── index.html                  Vite entry
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── images/clients/         CCI · Kar Parivartan · KGN · Soutrika
├── src/
│   ├── main.jsx                React + react-router-dom
│   ├── App.jsx                 Routes, page transitions
│   ├── styles/index.css        ALL the CSS — tokens, components, animations
│   ├── components/
│   │   ├── Header.jsx  Footer.jsx  Logo.jsx  ThemeToggle.jsx
│   │   ├── Reveal.jsx          Scroll-reveal (IntersectionObserver)
│   │   ├── Counter.jsx         Animated counter (rAF)
│   │   ├── ScrollProgress.jsx  Top bar that fills as you scroll
│   │   ├── CursorGlow.jsx      Soft glow that follows the mouse
│   │   ├── MarqueeLogos.jsx    Infinite client-logo scroll
│   │   ├── CTABanner.jsx       Reusable call-to-action band
│   │   ├── NewsletterInline.jsx Newsletter form
│   │   ├── Hero.jsx + HeroOrbit.jsx  Hero with orbiting nodes
│   │   ├── ProductCard.jsx + ProductModal.jsx
│   │   ├── TechStackTabs.jsx
│   │   ├── ContactForm.jsx
│   │   └── Icon.jsx            Lucide icon wrapper
│   ├── pages/                  Home About Services Products Projects Epr Contact
│   ├── data/                   products.js services.js projects.js clients.js
│   └── lib/api.js              API base URL (points to server)
└── server/                     Express + Nodemailer (separate Node app)
    ├── package.json
    ├── server.js               /api/contact + /api/newsletter/*
    ├── .env.example
    └── subscribers.json        File-based mailing list (gitignored)
```

## Animations baked in (no Framer Motion)

| Animation | How |
|---|---|
| Hero word stagger | CSS `@keyframes word-in` + per-word `animationDelay` |
| Gradient text flow | CSS `@keyframes flow` on the headline |
| Orbiting nodes | CSS `@keyframes spin` on the ring + per-node `float` |
| Pulse rings on orbit core | Stacked `::before`/`::after` with `@keyframes pulse-ring` |
| Floating aurora orbs | `@keyframes drift` with blurred radial gradients |
| Scroll reveal (fade-up / left / right / zoom) | `IntersectionObserver` toggles `.in` class |
| Staggered grids | `.stagger.in > *:nth-child(n)` transition delays |
| Counter rise | `requestAnimationFrame` with easeOutQuart |
| Marquee logos | `@keyframes marquee` translateX with pause-on-hover |
| Spotlight card | `mousemove` sets `--mx`/`--my` → radial-gradient overlay |
| Modal scale-in | `@keyframes scale-in` |
| Tab underline | `@keyframes tab-in` |
| Button sheen | `::after` translateX 100% on hover |
| Theme toggle icon | CSS rotation + scale transition between sun/moon |
| Top scroll-progress bar | width % updated on scroll |
| Cursor glow | rAF smoothing follows pointer (skipped on touch) |
| Page entrance | `@keyframes page-in` on route change |
| Mobile menu slide | translateY with per-link cascading delays |
| SVG dotted-line pulse on diagram | SMIL `<animate stroke-dashoffset>` |

Everything respects `prefers-reduced-motion`.

## Quick start

```bash
# 1. Frontend
cd srm-ecotech-vite
npm install
npm run dev          # http://localhost:5173

# 2. Mail server (separate terminal, separate install)
cd server
npm install
cp .env.example .env
# edit .env with your SMTP creds + ADMIN_KEY
npm run dev          # http://localhost:8787
```

The frontend posts to `http://localhost:8787` by default. To change it, create `srm-ecotech-vite/.env.local`:

```
VITE_API_BASE=https://api.your-domain.com
```

## SMTP quick refs

**Gmail (App Password):**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@srmecotech.com
SMTP_PASS=<16-char app password>
```
Generate one at <https://myaccount.google.com/apppasswords> (requires 2FA).

**Brevo (300 free/day):**
```
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
```

**SendGrid:**
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=<your-sendgrid-key>
```

## Newsletter broadcast

```bash
# Test send only to yourself
curl -X POST http://localhost:8787/api/newsletter/send \
  -H "Content-Type: application/json" \
  -H "x-admin-key: $ADMIN_KEY" \
  -d '{
    "subject": "Hello",
    "html": "<h1>Hi</h1><p>A test mail</p>",
    "test": true,
    "testTo": "you@example.com"
  }'

# Real broadcast (BCC, batched 30 at a time)
curl -X POST http://localhost:8787/api/newsletter/send \
  -H "Content-Type: application/json" \
  -H "x-admin-key: $ADMIN_KEY" \
  -d '{
    "subject": "April update from SRM ECO TECH",
    "html": "<h1>Hi friends</h1><p>Here is what we shipped this month...</p>"
  }'

# List all subscribers
curl http://localhost:8787/api/newsletter/send -H "x-admin-key: $ADMIN_KEY"
```

The HTML you pass in `html` is automatically wrapped in our branded email shell — you only author the inner content.

## Production build

```bash
npm run build     # outputs dist/
npm run preview   # serve the build at http://localhost:5174
```

Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, your own nginx). Deploy `server/` to a Node host (Railway, Render, EC2) and update `VITE_API_BASE` to point to it.

## Where to edit content

| What | Where |
|---|---|
| Products (neXgen Suite) | `src/data/products.js` |
| Services | `src/data/services.js` |
| Case studies | `src/data/projects.js` |
| Client logos | drop files in `public/images/clients/` and reference in `src/data/clients.js` |
| Testimonials | `src/data/clients.js` |
| Brand colors | `src/styles/index.css` — `:root` and `[data-theme="dark"]` blocks |
| Email branding | `server/server.js` — `shell()` function |

Built with care · © SRM ECO TECH PVT LTD
=======
# company-website
>>>>>>> dc0572e8c8e83d0c6bc6453920cc436f43a82196
