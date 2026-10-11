# Skill : Revue design

Ce skill est invoqué automatiquement quand l'utilisateur demande une revue visuelle ou design du projet.

## Déclencheurs
- "revue design"
- "vérifie le design"
- "est-ce cohérent visuellement"
- "review the UI"

## Étapes

### 1. Lire les règles design
Consulter `.claude/rules/design-system.md` pour les standards.

### 2. Analyser chaque page de la version courante
Pour chaque fichier HTML dans `v1.0.X/` :

**Palette**
- [ ] Fond principal = #0A0A0A (dark) ou #EAE2D4 (light)
- [ ] Accent = #B08D57 uniquement (pas d'autres jaunes/oranges)
- [ ] Pas de couleurs hors palette

**Typographie**
- [ ] Barlow Condensed chargée
- [ ] Headlines en weight 900
- [ ] Labels en uppercase avec letter-spacing
- [ ] Body en weight 300, line-height 1.7

**Espacement**
- [ ] Sections avec padding cohérent (100px 48px desktop)
- [ ] Responsive mobile prévu

**Composants**
- [ ] Boutons respectent les 4 variantes définies
- [ ] Cards suivent le format Pass Card

### 3. Rapport
Produire un tableau :
| Page | Problème | Sévérité | Correction suggérée |
|------|----------|----------|---------------------|

Sévérités : 🔴 Critique | 🟡 Mineur | 🟢 Suggestion
