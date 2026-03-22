# Design System — Park Bench Prints

## Product Context
- **What this is:** Interactive digital card experiences as a purchase funnel for physical printed cards
- **Who it's for:** People who love quirky, funny cards and want to send them to friends
- **Space/industry:** Independent print & paper studio, stationery, greeting cards
- **Project type:** Interactive marketing site with card experiences (static export, no backend)

## Design Principles
- **The payoff is merging the tech into physical reality.** Every digital interaction should make the physical card more desirable. The screen is not the destination — the printed card in someone's hands is. Technology serves the tangible.
- **Ease of a child's game.** Draggable elements (frog, flowers, future interactions) must feel instantly intuitive — no instructions needed, no frustration possible. Low thresholds, forgiving constraints, generous hit targets. If a five-year-old wouldn't figure it out in two seconds, simplify it.

## Aesthetic Direction
- **Direction:** Luxury/Refined with Playful undertones
- **Decoration level:** Intentional — subtle dot-grid textures, paper gradients, hand-drawn SVG illustrations
- **Mood:** Handcrafted warmth meets digital delight. The site should feel like opening a package from a beloved stationery shop — precious, personal, and a little bit funny. The paper-like textures and warm palette create the physical card metaphor; the spring-physics interactions are where the digital medium shines.
- **Reference sites:** Hammerpress (hammerpress.net), Risolve Studio (risolvestudio.com), Paperless Post (paperlesspost.com)

## Typography
- **Display/Hero:** Playfair Display — high-contrast transitional serif with editorial personality. Used for page titles, card headings, reveal text, and emotional moments ("Kikker in je bil!", "1 April", "Your link is ready!")
- **Body:** Inter — neutral geometric sans-serif. Invisible in the best way. Used for paragraphs, form descriptions, and informational text.
- **UI/Labels:** Inter 500 — with `letter-spacing: 0.1-0.15em` and `text-transform: uppercase` for buttons, navigation links, form labels, and status text.
- **Data/Tables:** Inter (tabular-nums) — for character counters, numeric display
- **Code:** System monospace (no code display in product)
- **Loading:** Google Fonts via `next/font/google` with `display: "swap"` for both Playfair Display and Inter
- **Scale:**
  - 8xl: 96px — Hero heading (Home page "Park Bench Prints")
  - 5xl: 48px — Page titles ("1 April", "Send this card")
  - 3xl: 30px — Reveal text ("Kikker in je bil!")
  - 2xl: 24px — Card interior headings
  - xl: 20px — Section headings ("Your link is ready!")
  - lg: 18px — Large body, subtitles
  - base: 16px — Body text
  - sm: 14px — Attribution, secondary text
  - xs: 12px — Labels, buttons, navigation (uppercase + tracked)

## Color
- **Approach:** Restrained — one warm accent against paper-like neutrals. Color is rare and meaningful.
- **Background:** `#FAFAF8` — warm off-white, the "page" everything sits on
- **Foreground:** `#1A1A1A` — near-black, warm enough to not feel harsh
- **Accent:** `#8B7355` — earthy warm tan/brown. Used for headings, interactive highlights, hover states. The single color that carries the brand.
- **Secondary:** `#E8E4DF` — light taupe for borders, dividers, subtle backgrounds
- **Card surfaces:**
  - Interior: `#FFF8F0` — cream/paper white, the "inside" of every card
  - Back: `#F5EDE3` — warm beige, visible when card rotates
- **Semantic:**
  - Success: `#5A8A5E` — muted forest green (link copied, action complete)
  - Warning: `#C4933F` — warm amber (character limit approaching)
  - Error: `#B5544E` — dusty rust (broken link, validation failure)
  - Info: `#5A7A9B` — slate blue (instructional hints)
- **Selection:** `::selection` uses accent (#8B7355) background with white text
- **Dark mode strategy:** Invert surfaces (bg → #1A1A18, fg → #E8E4DF), warm up accent (#B89A76), reduce saturation 10-20% on semantic colors. Card surfaces darken to #242220/#1E1C1A. Not yet implemented — define when needed.

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable — generous whitespace frames the interactive card experiences
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64)
- **Container:** `max-w-5xl` (1024px) with `px-6` (24px) horizontal padding
- **Section padding:** `pt-32 pb-20` (128px/80px) for full-page sections

## Layout
- **Approach:** Grid-disciplined — clean centered layouts that frame interactive cards as the hero
- **Grid:**
  - Mobile: 1 column
  - sm (640px): 2 columns for card catalog
  - md (768px): 2 columns for send form (form + preview)
  - lg (1024px): 3 columns for card catalog
- **Max content width:** 1024px (`max-w-5xl`) for page content, 500px for card width
- **Card dimensions:** Width `min(80vw, 500px)`, aspect ratio 5:7 (portrait)
- **Border radius:**
  - sm: 4px — alert badges, small elements
  - md: 8px — cards, input containers
  - lg: 12px — card previews, modal containers
  - full: 9999px — pills, toggles
  - Note: Buttons use `border-radius: 0` — sharp corners are intentional, they contrast with the soft card surfaces

## Motion
- **Approach:** Expressive — this is where we spend the innovation token. Motion IS the product.
- **Framework:** Framer Motion
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150-250ms) medium(250-400ms) long(400-700ms)
- **Springs:**
  - Card cover open/close: stiffness 40, damping 14
  - Frog drag snap-back: stiffness 300, damping 20
  - Frog launch: stiffness 120, damping 10, mass 0.8
- **Infinite animations:**
  - Frog idle bounce: `y: [0, -12, 0]`, 1.5s cycle — hints at drag direction
  - Frog launched wobble: `rotate: [0, -3, 3, -2, 0]`, 2.5s cycle
  - "Tap to open" pulse: `opacity: [0.3, 0.7, 0.3]`, 2s cycle
  - Drag hint pulse: `opacity: [0.15, 0.5, 0.15]`, 2s cycle
- **Page entrance:** Staggered fade-in with slide-up (opacity 0→1, y: 20→0), delays increment by 0.2s
- **Parallax:** Hero section uses `useScroll` for y-translation (0→30%) and opacity fade (1→0)
- **Reduced motion:** All springs → `{ duration: 0.01 }`. All infinite loops → disabled. Checked via `useReducedMotion()` from Framer Motion. Applied globally — no interaction requires motion to function.

## Texture & Decoration
- **Dot grid pattern:** `radial-gradient(circle, var(--foreground) 1px, transparent 1px)` at `24px 24px`, applied at `opacity: 0.03` on page backgrounds and card surfaces
- **Paper gradient:** `linear-gradient(from-[#FFF8F0] to-[#F5EDE3])` on card front cover
- **Divider lines:** `h-px` with accent color at 30% opacity, widths 48-80px
- **Card shadow:** `shadow-2xl` beneath card, plus a separate elliptical shadow element at 80% card width for grounding
- **Corner fold:** CardPreview items have a small triangle fold effect in bottom-right (secondary color)

## Interaction Patterns
- **Card open/close:** Click/tap toggles 3D rotation on Y-axis (0° → -160°). Keyboard: Enter/Space. ARIA: role="button", aria-label toggles between "Open card" / "Close card".
- **Frog drag:** Vertical drag only (`drag="y"`), elastic 0.15, constraints top: -180px bottom: 10px. Threshold: offset < -50px OR velocity < -300px/s. Cursor: grab → grabbing.
- **Form inputs:** Bottom-border only, transparent background, accent border on focus. Labels are uppercase, tracked, muted.
- **Buttons:** Primary (solid fg, hover → accent), Secondary (outlined), Ghost (text + bottom border). All uppercase, tracked, 13px.
- **Copy feedback:** AnimatePresence text swap ("Copy link" ↔ "Copied!") with scale/opacity transition, auto-reverts after 2s.
- **Touch targets:** Minimum 44px on interactive elements for mobile accessibility.

## i18n
- **Supported locales:** Dutch (nl, default), English (en)
- **Detection:** `navigator.language` → starts with "nl" = nl, else en
- **Implementation:** Simple key-value string map in `/lib/i18n.ts`, `t(key, locale)` function
- **Dutch-only elements:** "Kikker in je bil!" reveal text stays Dutch — it's the joke itself

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-21 | Initial design system created | Captured from existing codebase by /design-consultation based on product context + competitive research |
| 2026-03-21 | Keep Playfair Display + Inter | Strong pairing that works. Playfair is becoming common in AI sites but not yet overused in the print/stationery space specifically |
| 2026-03-21 | Restrained color with single accent | Print studios avoid loud palettes — the prints/cards should be the color, not the chrome |
| 2026-03-21 | Expressive motion as innovation token | Nobody else in print/stationery does spring-physics card interactions — this is the differentiator |
| 2026-03-21 | Sharp-cornered buttons | Intentional contrast with soft card surfaces — buttons are functional, cards are precious |
| 2026-03-22 | Added Design Principles section | Two core principles codified: "tech merging into physical reality" as product motto, and "ease of a child's game" as interaction standard for all draggable elements |
| 2026-03-21 | Added semantic colors | Success (#5A8A5E), Warning (#C4933F), Error (#B5544E), Info (#5A7A9B) — earthy tones that harmonize with the warm palette |
| 2026-03-21 | Dark mode defined but not implemented | Strategy documented for when it's needed — invert surfaces, warm up accent, reduce semantic saturation |
