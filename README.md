# Park Bench Prints

Interactive digital card experiences for Park Bench Prints, a Haarlem-based print and paper studio. Each card is a playful, animated interaction that makes you want to hold the physical version.

## Tech Stack

- **Next.js 16** (App Router, static export)
- **TypeScript** + **React 19**
- **Tailwind CSS 4**
- **Framer Motion** for spring-physics card animations and drag interactions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/parkbenchprints](http://localhost:3000/parkbenchprints) in your browser.

## Cards

| Route | Card | Interaction |
|-------|------|-------------|
| `/cards/bloemenmarkt` | Bloemenmarkt (Flower Market) | Gatefold card — drag flowers from buckets onto wrapping paper, make a bouquet |
| `/cards/kikker-in-je-bil` | Kikker in je Bil (Frog in Your Pants) | Single-fold card — drag the frog to reveal the April Fools joke |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/cards` | Card catalog |
| `/cards/kikker-in-je-bil/send` | Personalize and share the kikker card |

## Design

See [DESIGN.md](DESIGN.md) for the full design system — typography, color palette, spacing, motion springs, and interaction patterns.

## Build

```bash
npm run build
```

Static export to `out/` — deployed to GitHub Pages at `/parkbenchprints` and Vercel preview at root.
