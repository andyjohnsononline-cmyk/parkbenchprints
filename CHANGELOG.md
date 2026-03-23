# Changelog

All notable changes to Park Bench Prints will be documented in this file.

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
