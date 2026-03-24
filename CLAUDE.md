# Park Bench Prints — Project Guide

## Tech Stack
- Next.js 16 with static export (`output: "export"`) on GitHub Pages
- React 19, Tailwind CSS 4, Framer Motion
- basePath: "/parkbenchprints"
- No backend, no API routes — all personalization via URL hash encoding

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

## Key Patterns
- React Compiler strict lint: use `useSyncExternalStore` for browser APIs, lazy `useState` initializers instead of `useEffect` + `setState`
- All animations must respect `useReducedMotion` from Framer Motion
- i18n: EN (default) + NL via `t(key, locale)` from `/lib/i18n.ts`
- Card interactions use spring physics — stiffness/damping values are specified in DESIGN.md
