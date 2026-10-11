# Conventions de versioning — Kafora

## Format
`vMAJOR.MINOR.PATCH`

- **MAJOR** : refonte complète (identité, stack, architecture)
- **MINOR** : nouvelle fonctionnalité importante (nouvelle section, nouveau système)
- **PATCH** : ajout, correction, amélioration dans une feature existante

Actuellement : **v1.0.x** (phase 1, MVP)

## Règles
1. **Jamais modifier une version passée.** Les anciens dossiers sont en lecture seule.
2. Chaque version est **autonome** : elle contient tous ses fichiers HTML, son CSS, ses assets.
3. `rode.css` est copié dans chaque version (pas de lien relatif vers un dossier parent).
4. Le numéro de version courant est dans `.claude/settings.json` → `project.currentVersion`.

## Historique
| Version | Changement principal                                    |
|---------|---------------------------------------------------------|
| v1.0.0  | Structure initiale                                      |
| v1.0.3  | Galerie images, sections hero                           |
| v1.0.4  | Blend mode images, CSS masking                          |
| v1.0.5  | Images afro chic, object-fit fix                        |
| v1.0.6  | Galerie expandable (polaroid → grid)                    |
| v1.0.7  | "Créateurs de la semaine" panel gauche                  |
| v1.0.8  | Pass Cards design éditorial (Heron Preston inspired)    |
| v1.0.9  | Hero cinématique noir, fan cards, theme toggle dark/light |
| v1.0.10 | 3 créateurs, indicateurs 01/02/03, profil dynamique     |
| v1.0.11 | Page kafora.html "Notre ADN", tagline "Claim your kingdom" |
| v1.0.12 | Setup .claude/ professionnel, CLAUDE.md                 |
| v1.0.13 | Authentification : connexion.html, inscription.html, dashboard basique |
| v1.0.14 | Dashboard Priorité 1 : analytics, profil, affiliation, pass événementiel |
| v1.0.15 | Recherche & filtres fonctionnels sur createurs.html      |
| v1.0.16 | Dashboard : fix pass ID persistant + fix photo preview   |
| v1.0.17 | Profil : atmosphère visuelle par créateur, portfolio dynamique, boutique intégrée |
| v1.0.18 | Dashboard : bouton "Voir mon profil" + profil.html?creator=me depuis localStorage |
| v1.0.19 | Élargissement disciplines : 16 métiers créatifs, copy mise à jour sur toutes les pages |
| v1.0.20 | Profil : 4 layouts (éditorial/magazine/minimal/galerie) + réorganisation sections par drag & drop |
| v1.0.21 | Profil : bouton "Personnaliser ce profil" sur presets → charge dans localStorage + redirect ?creator=me |
| v1.0.22 | Profil : flèches ↑↓ pour réordonner les sections (remplace DnD) + thumbnails mise en page visuels avec accent couleur |
| v1.0.23 | Auth : comptes démo par créateur + Espace Builder dédié (layout, palette, ordre sections) séparé de Mon profil |
| v1.0.24 | (versions intermédiaires — voir dossiers)                                                                        |
| v1.0.27 | Hub Affiliation : 5 partenaires, stats agrégées, copie lien, simulation clic, modal améliorée, fix ovClicks       |
| v1.0.28 | Modèle éco : Press Kit PDF, Badge Vérifié, Boost, Accès Marque (99€), premium.html refonte, marques.html, Stripe  |
| v1.0.29 | Badge Boost "★ En vedette", contacts gatés, créateurs similaires, Press Kit async base64, simulatePurchase localStorage |
| v1.0.30 | Fusion v1.0.28+v1.0.29 + Supabase SDK (kafora-db.js) : auth, sync profil/liens, fallback localStorage, indicateur DB |
| v1.0.31 | Pitch deck 1920×1080 fixe + scaleDeck() responsive, rebranding RHODES, pitch_deck_mob_video.html |
| v1.0.32 | Fusion v1.0.30+v1.0.31 : Firebase (remplace Supabase), kafora-db.js, marques.html, nav Marques, tests 20/20 ✅ |
| v1.0.33 | presskit_deck.html 4 slides (Cover, Manifeste, Stats, Portfolio) + paywall Press Kit sur profil.html + dashboard pointe vers deck |
| v1.0.34 | Module Casting complet : casting.html (1571 talents), missions.html (board + publication), mission-detail.html (candidature), dashboard 5 nouveaux onglets (profil casting, candidatures, bookings, messages, portefeuille), inscription Face/Producteur, nav globale |
| v1.0.35 | Multi-devises : kafora-currency.js (FCFA / EUR / USD), sélecteur sur casting.html, missions.html, mission-detail.html, dashboard portefeuille |
| v1.0.36 | Stratégie paiement différenciée : FCFA = Mobile Money direct (MTN MoMo, Moov Flooz, Orange Money) + historique retraits ; EUR/USD = redirection Gumroad/LemonSqueezy/Ko-fi/Stripe avec message transparent + encaissement direct prévu |
| v1.0.37 | Devise bidirectionnelle : paiement suit la devise choisie (pas la localisation) — Béninois peut payer en EUR via Gumroad, Européen peut payer en FCFA via Mobile Money ; `budgetDevise` sur missions, note de paiement dynamique sur mission-detail |

## Workflow pour une nouvelle version
```
1. /project:new-version          → crée le dossier
2. Travailler dans v1.0.X/       → implémenter les changements
3. /project:review v1.0.X        → vérifier la cohérence
4. Mettre à jour ce fichier      → ajouter la ligne dans l'historique
```
