# Changelog

All notable changes to Park Bench Prints will be documented in this file.

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
