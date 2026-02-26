# Park Bench Prints

An interactive website for Park Bench Prints, a Haarlem-based print and paper studio.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** for scroll-driven animations and page transitions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

| Route      | Description                                          |
| ---------- | ---------------------------------------------------- |
| `/`        | Immersive landing page with animated scroll sections  |
| `/about`   | Company story, values, and studio information         |
| `/contact` | Contact form with studio address and hours            |

## Project Structure

```
app/
  layout.tsx          Root layout with fonts, nav, footer
  page.tsx            Landing page
  globals.css         Tailwind imports and custom styles
  about/page.tsx      About page
  contact/page.tsx    Contact page
components/
  Navbar.tsx          Fixed navigation with mobile menu
  Footer.tsx          Site footer
  Hero.tsx            Full-viewport animated hero
  Philosophy.tsx      Scroll-reveal text section
  Services.tsx        Service cards with staggered animation
  Marquee.tsx         Auto-scrolling keyword band
  CTA.tsx             Call-to-action section
  ContactForm.tsx     Validated contact form
  PageTransition.tsx  Framer Motion page wrapper
```

## Build

```bash
npm run build
npm start
```
