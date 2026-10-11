# Règles de style — Kafora

## HTML
- Indentation : 2 espaces (jamais de tabs)
- Attributs dans l'ordre : `id`, `class`, `href/src`, `data-*`, autres
- Sections délimitées par `<!-- ══ NOM ══════ -->` (au moins 3 `═` de chaque côté)
- Pas de commentaires pour du code évident (`<!-- bouton -->` inutile)
- Les styles one-off tolérés inline uniquement s'ils ne se répètent pas

## CSS
- Les styles globaux vont dans `rode.css`
- Les styles spécifiques à une page vont dans `<style>` en `<head>`
- Jamais de `!important` sauf cas exceptionnel documenté
- Ordre des propriétés dans un bloc : layout → box model → typography → visual → animation
- `clamp(min, preferred, max)` pour toute taille de police responsive
- Transitions spring : `cubic-bezier(0.34, 1.25, 0.64, 1)`
- Grain texture : SVG `feTurbulence` en `::before` avec `mix-blend-mode`

## JavaScript
- Vanilla uniquement — 0 dépendances externes
- `const` par défaut, `let` si réassigné, jamais `var`
- Fonctions nommées explicitement (`function goToCreator(i)` pas `function g(i)`)
- Commentaires `// ── Description ──` pour les sections de code
- `localStorage` pour toute persistance de préférence utilisateur
- `URLSearchParams` pour lire les paramètres d'URL

## Naming
- Classes CSS : `kebab-case` (`.pass-card-header`)
- IDs : `camelCase` (`#featName`)
- Variables JS : `camelCase` (`const creatorData`)
- Constantes : `UPPER_SNAKE` (`const CREATORS = {...}`)

## Couleurs — ne jamais hardcoder hors palette
| Token         | Valeur    |
|---------------|-----------|
| Deep Ink      | `#0A0A0A` |
| Parchment     | `#EAE2D4` |
| Parchment Alt | `#D8CEBA` |
| Golden Bronze | `#B08D57` |
| Warm Ash      | `#8C8478` |
