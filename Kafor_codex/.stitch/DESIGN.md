# Design System: RØDE — Annuaire
**Visual Reference:** PORT-PHOTOGRAPHY editorial UI (surrealist, cinematic, print-culture)

---

## 1. Visual Theme & Atmosphere

The RØDE interface is an **editorial-cinematic experience** — a digital magazine that treats the browser as a printed page come to life. The aesthetic draws from high-fashion print culture (Dazed & Confused, i-D, AnOther Magazine): sparse UI chrome, oversized typography colliding with full-bleed photography, and a warm, analog film quality to every surface.

The mood is **contemplative and immersive**. White space is not emptiness — it is breath. The image is the design; the UI is merely its frame. Layout density is low but typographic scale is extreme, creating tension between silence and impact.

Interactions are slow and deliberate: cinematic fades, minimal hover feedback, no aggressive animations. The user should feel like they are turning the pages of a luxury magazine, not scrolling a feed.

---

## 2. Color Palette & Roles

| Descriptive Name | Hex | Functional Role |
|---|---|---|
| **Warm Parchment** | `#EAE2D4` | Primary background — the "paper" of the page |
| **Aged Cream** | `#F5F0E8` | Card surfaces, modal overlays, secondary backgrounds |
| **Deep Ink Black** | `#0A0A0A` | All primary text, hero headlines, nav items |
| **Warm Ash Grey** | `#8C8478` | Secondary text, captions, metadata, placeholder labels |
| **Golden Bronze** | `#B08D57` | Accent — premium highlight, hover states, active indicators, borders on featured elements |
| **Film Dust** | `#D6CCBC` | Dividers, subtle borders, inactive slide indicators |
| **Pure Void** | `#FFFFFF` | Used sparingly — text on dark photo overlays only |

> The palette is deliberately warm and analog. Avoid cool greys or pure whites — all neutrals lean toward sand, stone, and aged paper.

---

## 3. Typography Rules

### Headline / Hero
- **Family:** Ultra-condensed grotesque — Neue Haas Grotesk Display, Bebas Neue, or Barlow Condensed ExtraBold
- **Weight:** Black (900) — maximum visual mass
- **Scale:** Extreme — 10vw to 14vw on desktop, fills roughly 40% of viewport width
- **Case:** Mixed case (not all-caps) for a more editorial, human feel
- **Tracking:** Tight (-0.02em) — condensed letterforms feel compressed, urgent
- **Color:** Deep Ink Black (`#0A0A0A`) over light surfaces; Pure Void (`#FFFFFF`) over dark photography

### Navigation
- **Family:** Same grotesque family, or a neutral sans (Inter, DM Sans)
- **Weight:** Light (300) or Regular (400)
- **Scale:** Very small — 11–13px
- **Case:** Small caps or uppercase with wide tracking (+0.15em to +0.25em)
- **Style:** Transparent background, floats over hero imagery — feels invisible

### Body / Captions / Metadata
- **Family:** Elegant serif (Freight Text, Portrait, or GT Sectra) for editorial depth, OR a light sans-serif
- **Weight:** Light (300) — never competes with the headline
- **Scale:** 12–14px — deliberately small to emphasize the scale contrast
- **Line height:** Generous (1.6–1.8) — breathable, print-like

### Pill / Tag Labels
- **Style:** Small uppercase, wide tracking, bordered pill shape
- **Background:** Transparent with `1px solid #B08D57` (Golden Bronze border)
- **Text:** `#B08D57` — the only place the accent color appears in type

---

## 4. Component Stylings

### Buttons (CTA)
- **Shape:** Sharp, squared-off edges (`border-radius: 0`) — no softness, pure editorial geometry
- **Primary:** Deep Ink Black (`#0A0A0A`) fill, Pure Void (`#FFFFFF`) text, no shadow
- **Secondary / Ghost:** Transparent fill, `1px solid #0A0A0A` border, Deep Ink Black text
- **Hover:** Slow invert transition (300ms ease) — background flips, no scale or lift effects
- **Typography:** Uppercase, wide tracking (+0.12em), Regular weight, 12–13px

### Cards / Creator Profile Tiles
- **Corner Roundness:** Absolutely sharp — `border-radius: 0`. The grid is a contact sheet, not a card deck.
- **Background:** Aged Cream (`#F5F0E8`) or transparent
- **Shadow:** None — completely flat. Depth comes from image contrast, not elevation
- **Border:** Optional 1px Film Dust (`#D6CCBC`) separator between tiles
- **Image ratio:** 3:4 portrait (fashion/editorial standard)

### Navigation Bar
- **Background:** Fully transparent over hero, transitions to Warm Parchment (`#EAE2D4`) on scroll
- **Layout:** Logo far left — centered nav links — utility icons far right (cart, menu)
- **Vertical Social Rail:** Right edge, links rotated 90° clockwise, 11px uppercase, Warm Ash Grey (`#8C8478`)

### Slide / Carousel Indicators
- **Style:** Minimal numeric counters (`02 03 04`) — not dots
- **Active:** Deep Ink Black (`#0A0A0A`)
- **Inactive:** Film Dust (`#D6CCBC`)
- **Position:** Bottom center, absolute over hero

### Tag / Badge (e.g., "Print Available", "Premium", "New")
- **Shape:** Pill — `border-radius: 999px`
- **Style:** 1px Golden Bronze (`#B08D57`) border, transparent fill, Golden Bronze text
- **Size:** Compact — 10–11px uppercase

### Search & Utility Icons
- **Style:** Thin stroke (1–1.5px), minimal linework — not filled icons
- **Color:** Deep Ink Black (`#0A0A0A`)
- **Position:** Corners — never disrupting the visual center

---

## 5. Layout Principles

### The Full-Bleed Foundation
Every hero and featured section uses **100vw × 100vh full-bleed imagery**. The photograph is the layout. Typography and UI elements are positioned over it with absolute or fixed positioning — they do not push content; they inhabit space.

### Grid Philosophy: The Contact Sheet
When showing multiple creators or items, the grid mimics a **photographer's contact sheet** — edge-to-edge tiles with zero gap or 1px Film Dust gaps. No padding between images. The effect is dense, archival, intentional.

### Whitespace: The Editorial Pause
Outside of the grid and hero, whitespace is **generous and structural**. Section padding: 80–120px vertical. The eye should rest between moments of intensity. Margins are wide; content columns are narrow (max 680px for text blocks).

### Typographic Scale Contrast
The defining layout principle is **extreme scale juxtaposition**: a 12px caption directly beneath a 140px headline. Small things are very small. Large things are enormous. Nothing lives in the middle range.

### Vertical Social Rail
A persistent vertical element on the right edge — social links rotated 90° — acts as a **magazine spine**, reinforcing the print metaphor throughout the experience.

### Scroll Direction & Depth
- Primary navigation: **vertical scroll**, slow and weighted
- Hero carousels: **horizontal**, triggered by slide indicators or swipe
- Transitions: **opacity fades only** — no slides, no bounces, no spring physics

### Mobile Adaptation
- Hero headline scales to 16vw–20vw on mobile — still dominant
- Vertical social rail collapses to footer icons
- Contact-sheet grid collapses to 2 columns (portrait tiles)
- Nav collapses to hamburger, menu opens as full-screen overlay in Warm Parchment
