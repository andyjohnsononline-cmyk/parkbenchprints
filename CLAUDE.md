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

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
