# Changelog

All notable changes to Park Bench Prints will be documented in this file.

## [0.2.3.0] - 2026-04-01

### Changed
- Kikker in je Bil card now uses artist-illustrated assets: two boxer shorts cover variants (banana on lavender, duck on mint green) and a hand-drawn frog
- Card format changed from portrait (5:7) to square, matching the physical printed card
- Simplified interaction from drag-the-frog to open-to-reveal. The punchline is opening the card.
- Cover variant randomly selected on each visit, persisted in share URLs so sender and recipient see the same cover
- Personal messages now appear on the left half of the card interior

### Added
- Share links now preserve which cover variant the sender saw, so the recipient gets the same card

### Removed
- Drag-the-frog interaction replaced by open-to-reveal (the card itself delivers the joke)
- Placeholder programmer-art illustrations replaced by artist originals

## [0.2.2.0] - 2026-03-27

### Added
- Proportional flower sizing — scale ratios based on real-life proportions (snapdragon 1.4x, hydrangea 1.2x, peony 1.1x, tulip 0.9x)
- Bouquet reveal — market scene fades out, flowers re-center in full card with BouquetClosedSVG bow
- Flower count with i18n support (singular/plural in EN and NL)
- Screen reader bouquet-ready announcement via aria-live region
- Bouquet z-ordering — tall flowers render behind short ones for natural layering

### Changed
- Card renamed from "Bloemenmarkt" to "Flower Market" in card registry
- SVG scene uses `preserveAspectRatio="xMidYMax meet"` with explicit width/height for reliable fill
- Held flower centering uses Framer Motion `x`/`y` properties instead of CSS transform to avoid override conflict

### Fixed
- Held flower appearing offset from cursor (Framer Motion `animate` was overriding CSS `translate`)
- SVG market scene awning clipped by container (missing `width="100%"` and `height="100%"` attributes)
- Hardcoded English "added" in screen reader live region — now localized for NL
- Dead ternary in market scene exit animation simplified

## [0.2.1.0] - 2026-03-24

### Added
- Artist-drawn flower SVGs (red tulip, blue hydrangea, pink peony, yellow snapdragon) replacing hand-made stand-ins
- New landscape market scene layout (v3) with named bucket groups for event delegation
- Fan arrangement system — flowers arrange in a natural vertical bouquet with stems down, blooms overflowing above paper
- Bouquet state with tighter fan when "Make Bouquet" is pressed
- Click-to-pick and drag-to-place dual interaction model with floating flower cursor
- Close button (fixed position) so card can always be dismissed when open
- Header hides when card opens to maximize scene space
- Bucket hover highlights, focus outlines, and shimmer hint animations in CSS
- Market paper SVG as dedicated drop zone overlay

### Changed
- Card expands to landscape aspect ratio (1776:764) when opened, collapses to portrait when closed
- GatefoldShell now supports controlled open state, disableToggle, and cardStyle props
- Default locale switched from Dutch to English
- Flower sizing unified between held and placed states (h-52 placed, h-36 held)
- PaperArea rewritten as default export with predefined FAN_POSITIONS and BOUQUET_POSITIONS

### Fixed
- CSS bucket selectors updated to match v3 SVG IDs (red-tulips-bucket, etc.)
- Flowers no longer disappear on click/touch (removed click-to-remove from placed flowers)
- Pointer interaction uses drag threshold (16px) to distinguish click from drag
- Auto-dismiss safety net (15s timeout) prevents orphaned held flowers

## [0.2.0.0] - 2026-03-23

### Added
- Bloemenmarkt interactive gatefold card — double-door opening with 3D spring animation
- GatefoldShell reusable component for future gatefold-style cards
- Full illustrated market scene (cart, bike, chalkboard, flower buckets) as card interior
- Drag-and-drop flower placement onto bouquet wrapping paper (BouquetOpenSVG)
- Click-to-pick flowers as alternative to drag
- "Make Bouquet" action wraps flowers in BouquetClosedSVG
- Unlimited flower picks from any bucket (build a bouquet from a single flower type)
- Free positioning — flowers land wherever you drop them on the paper
- 9 flower varieties: tulips, snapdragons, peonies, daffodil
- Keyboard accessibility: Tab between flowers, Enter/Space to pick
- Screen reader support: aria-live announcements for flower placement
- Reduced motion support for all animations per WCAG
- Dutch (default) and English i18n for all card text

### Changed
- next.config.ts: environment-conditional basePath for dual GitHub Pages + Vercel deployment
- NEXT_PUBLIC_BASE_PATH env variable for client-side asset URL resolution

### Fixed
- Flower singular/plural grammar ("1 bloem" vs "2 bloemen")
- Tap hint and drag hint animations now respect useReducedMotion
