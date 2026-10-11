# Design System — Kafora

## Identité visuelle
Kafora est une marque de luxe éditorial pour la diaspora africaine. Tout élément visuel doit refléter : **sobriété**, **élégance**, **culture**.

## Typographie
| Usage          | Font              | Weight | Size             |
|----------------|-------------------|--------|------------------|
| Headlines      | Barlow Condensed  | 900    | clamp(44px,8vw,130px) |
| Sous-titres    | Barlow Condensed  | 700    | 14–24px          |
| Navigation     | Barlow Condensed  | 300    | 11px, spacing 0.22em |
| Body text      | Barlow            | 300    | 14–16px, line-height 1.7 |
| Labels / tags  | Barlow Condensed  | 400    | 9–11px, spacing 0.30–0.40em, UPPERCASE |

## Palette
```
Deep Ink      #0A0A0A   — fond principal (dark)
Parchment     #EAE2D4   — fond principal (light) / texte (dark)
Parchment Alt #D8CEBA   — variante légèrement plus chaude
Golden Bronze #B08D57   — accent, liens actifs, CTA, highlights
Warm Ash      #8C8478   — texte secondaire, métadonnées
```

## Composants

### Pass Card (carte créateur)
- Fond : `#EDE5D3` (parchment chaud)
- Largeur : 280px
- Radius : 18px
- Photo : 340px de hauteur, `object-fit: cover`
- Header : `rgba(176,141,87,0.10)` avec border bottom
- Box shadow : triple couche (40px blur + 80px blur + 1px ring)
- Animation fan : `rotate(-14deg)` gauche, `0deg` centre, `rotate(14deg)` droite

### Navigation
- Position : fixed, top 0
- Fond : `transparent` → `rgba(10,10,10,0.92)` au scroll
- Logo : Barlow Condensed 900, 20px
- Liens : Barlow Condensed 300, 11px, letter-spacing 0.22em, UPPERCASE
- Actif/hover : couleur Bronze `#B08D57`

### Boutons
| Classe       | Fond       | Texte    | Border              |
|--------------|------------|----------|---------------------|
| `.btn-bronze`| `#B08D57`  | `#0A0A0A`| none                |
| `.btn-primary`| `#EAE2D4` | `#0A0A0A`| none                |
| `.btn-outline`| transparent| `#EAE2D4`| 1px `#EAE2D4`       |
| `.btn-ghost` | transparent| `rgba(234,226,212,0.60)`| 1px `rgba(234,226,212,0.20)` |

### Grain cinéma
```css
background-image: url("data:image/svg+xml,<svg ...><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' .../></svg>");
mix-blend-mode: screen;
opacity: 0.04;
```

## Espacement
- Section padding : `100px 48px` (desktop) → `72px 24px` (mobile)
- Gap grille : `24px` standard
- Breakpoint mobile : `768px`

## Effets spéciaux
- Gradient texte : `linear-gradient(135deg, #EAE2D4 0%, #B08D57 55%, #EAE2D4 100%)` + `-webkit-background-clip: text`
- Fond hero : radial gradients bronze subtils sur fond `#0A0A0A`
- Barcode CSS : `<b>` tags de hauteurs variables, 1–3px de large
