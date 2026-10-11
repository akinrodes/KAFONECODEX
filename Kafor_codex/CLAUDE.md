# Kafora — Claude Instructions

## Projet
Kafora est une plateforme SaaS de directory de créateurs de la diaspora africaine — toutes disciplines créatives : mode, danse, photographie, vidéo, cinéma, musique, architecture, design d'intérieur, sculpture, objets d'art, modèles, entreprises créatives, et plus. Positionnement : luxe éditorial, audience internationale, partenariats grandes maisons (LVMH, Kering).

## Modèle économique
Kafora repose sur un modèle **freemium asymétrique** : les créateurs sont le catalogue, les marques sont les clients principaux.

### Plans créateurs
| Plan | Prix | Ce qu'il inclut |
|---|---|---|
| Gratuit | 0€ | Profil public, 1 lien affilié, boutique 3 items |
| Boost | 5€/mois ou one-shot | Top des résultats, badge "En vedette", homepage |
| Press Kit | 9€ one-shot | Export PDF du profil en 1 clic (jsPDF, client-side) |
| Vérifié | 19€/an | Badge check doré, accès aux filtres marques |

### Plan marques (B2B — revenus principaux)
| Plan | Prix | Ce qu'il inclut |
|---|---|---|
| Accès Marque | 99€/mois | Contacts créateurs, filtres avancés, briefs directs |

### Paiements
- Outil : **Stripe** (principal) ou **LemonSqueezy** (alternatif, zéro TVA à gérer)
- Pas de carte bancaire stockée côté Kafora — tout délégué à Stripe
- One-shot payable via Stripe Payment Links (pas d'abonnement forcé)

### Stratégie devises (v1.0.36–37)
Le **paiement suit la devise choisie**, pas la localisation géographique.

| Devise | Méthode d'encaissement | Statut |
|--------|------------------------|--------|
| FCFA (XOF) | Mobile Money direct — MTN MoMo, Moov Flooz, Orange Money | ✅ Actif au lancement |
| EUR | Redirection Gumroad / LemonSqueezy / Ko-fi / Stripe | ⏳ Encaissement direct prévu (post-lancement) |
| USD | Redirection Gumroad / LemonSqueezy / Ko-fi / Stripe | ⏳ Encaissement direct prévu (post-lancement) |

**Règle** : un Béninois peut choisir de payer en EUR via Gumroad ; un Européen peut choisir de payer en FCFA via Mobile Money. La note de paiement sur `mission-detail.html` s'adapte dynamiquement à `mission.budgetDevise`.

**Raison du différé EUR/USD** : trop de réglementations à gérer au lancement. Une fois les bénéfices suffisants, encaissement direct sur plateforme.

## Stockage des données — principe minimal
Kafora stocke le **strict minimum**, exactement comme un réseau social :

```
users        : id | email | password_hash | display_name | plan | verified | boosted_until
profiles     : creator_id | bio | city | country | disciplines | photo_url | accent_color | layout | section_order
affiliates   : creator_id | partner_id | aff_id | clicks | revenue
links        : id | creator_id | name | slug | original_url | partner_id | clicks
casting      : creator_id | cat | niche | tarif(XOF) | dispo | mensuration | langues | album[]
missions     : id | titre | description | type | budget(XOF) | budgetDevise | ville | date | producteur
candidatures : id | missionId | nom | contact | msg | profil | statut | at
portefeuille : solde(XOF) | historique[{ type, montant, devise, at, statut }]
```

**Ce qu'on ne stocke JAMAIS** : numéro de carte, pièce d'identité, adresse postale, numéro de téléphone, données de navigation visiteurs.
**RGPD** : données minimales, consentement explicite à l'inscription, suppression sur demande en 1 clic.
**MVP** : tout tourne en localStorage (client-side) jusqu'à ce qu'une backend soit nécessaire. La structure ci-dessus est le schéma cible (Firebase Firestore, free tier Spark).

## Stack technique
- Vanilla HTML / CSS / JS — aucun framework
- Police principale : Barlow Condensed (Google Fonts), 900 headlines, 300 body
- Palette officielle :
  - Deep Ink : #0A0A0A
  - Parchment : #EAE2D4 / #D8CEBA
  - Golden Bronze : #B08D57
  - Warm Ash : #8C8478
- CDN autorisés (client-side uniquement) : jsPDF (press kit), GSAP (animations portfolio)
- Paiements : Stripe Checkout / LemonSqueezy Payment Links (redirect externe, rien stocké)
- Firebase : auth email/password + Firestore (kafora-db.js) — clés à configurer dans le fichier
- Multi-devises : `kafora-currency.js` (XOF base, EUR = 1/655.957, USD = 1/600) — toujours stocker en XOF, convertir à l'affichage

## Structure des versions
Chaque version vit dans son propre dossier `v1.0.X/`. Ne jamais modifier une version passée — toujours créer une nouvelle version.

```
RAP/
├── CLAUDE.md              ← ce fichier
├── .claude/               ← config Claude Code
└── v1.0.37/               ← version courante
    ├── index.html         ← page d'accueil
    ├── createurs.html     ← directory (créateurs boostés en tête)
    ├── casting.html       ← directory talents casting (1571+), filtres, tarifs multi-devises
    ├── missions.html      ← board missions producteurs, publication, filtres, budget multi-devises
    ├── mission-detail.html← détail mission + formulaire candidature + note paiement dynamique
    ├── evenements.html
    ├── kafora.html        ← page "Notre ADN"
    ├── profil.html        ← profil dynamique (?creator=amara), paywall Press Kit
    ├── titans.html
    ├── premium.html       ← pricing Freemium / Boost / Press Kit / Vérifié / Marque
    ├── marques.html       ← landing + dashboard accès marque
    ├── presskit_deck.html ← deck 4 slides (Cover, Manifeste, Stats, Portfolio)
    ├── connexion.html
    ├── inscription.html   ← 4 rôles : Créateur, Face/Talent, Producteur, Marque
    ├── dashboard.html     ← dashboard créateur (10+ onglets dont casting, portefeuille)
    ├── kafora-currency.js ← utilitaire devises partagé (FCFA/EUR/USD)
    ├── kafora-db.js       ← Firebase SDK (auth + Firestore, fallback localStorage)
    └── rode.css           ← base CSS partagée
```

## Conventions de code

### HTML
- Indentation 2 espaces
- Sections commentées avec `<!-- ══ NOM ══ -->`
- CSS inline uniquement pour les ajustements one-off (ex: `font-size` sur un titre unique)
- Tout style réutilisable → dans le `<style>` du fichier ou dans `rode.css`

### CSS
- Variables CSS préférées pour les couleurs répétées
- `clamp()` pour les tailles de police responsive
- Transitions : `cubic-bezier(0.34, 1.25, 0.64, 1)` pour les animations spring
- Grain cinéma via SVG `feTurbulence` dans `::before` pseudo-éléments

### JS
- Vanilla uniquement, aucune dépendance externe (sauf CDN déclarés ci-dessus)
- `localStorage` pour la persistance (MVP) — schéma cible documenté dans ce fichier
- `URLSearchParams` pour les pages dynamiques (`profil.html?creator=amara`)
- Stripe/LemonSqueezy : redirect vers Payment Link externe (window.location.href)

## Thème sombre / clair
- Thème par défaut : **sombre** (#0A0A0A)
- Basculement via classe `.light-theme` sur `body`
- Persistance : `localStorage.getItem('kafora-theme')`

## Créateurs actuels
| ID    | Nom          | Discipline              | Ville          | Plan      |
|-------|--------------|-------------------------|----------------|-----------|
| amara | Amara Diallo | Mode · Paris            | France         | Premium ✓ |
| kofi  | Kofi Mensah  | Art Contemporain · Accra| Ghana          | Premium ✓ |
| lea   | Léa Traoré   | Musique · Dakar         | Sénégal        | Membre    |
| nia   | Nia Osei     | Photographie · Londres  | Royaume-Uni    | Premium ✓ |

## Fonctionnalités clés

### Profil & Discovery
- **Profil public** : hero, portfolio cliquable (liens affiliés), boutique, expériences
- **Liens affiliés** : `kafora.track/` redirect + attribution 30 jours (localStorage côté visiteur)
- **Press Kit Deck** : 4 slides (Cover, Manifeste, Stats, Portfolio) — `presskit_deck.html?creator=ID`
- **Badge Vérifié** : flag `verified: true` en localStorage/DB, check doré sur les cartes
- **Boost** : flag `boosted: true`, créateurs boostés triés en premier sur createurs.html
- **Accès Marque** : plan B2B 99€/mois, déblocage contacts et filtres avancés
- **Espace Builder** : layout, palette, ordre des sections (dashboard créateur)
- **Hub Affiliation** : 5 partenaires (ASOS, Sephora, Farfetch, Nike, Zara), stats live

### Module Casting (v1.0.34+)
- **casting.html** : directory 1571+ talents, filtres (ville / catégorie / niche / disponibilité), tarif multi-devises
- **missions.html** : board missions producteurs, filtres sidebar, publication modale avec budget en FCFA/EUR/USD
- **mission-detail.html** : détail complet + formulaire candidature + note de paiement dynamique selon devise
- **Dashboard casting** (5 onglets) : Profil Casting, Candidatures (tabs par statut), Bookings, Messages, Portefeuille

### Dashboard créateur (10+ onglets)
- Accueil, Profil, Affiliation, Pass Événementiel, Press Kit, Boost
- Casting : Profil Casting, Candidatures, Bookings, Messages, Portefeuille

### Portefeuille & Paiements
- Solde affiché en devise choisie (base XOF)
- XOF → formulaire Mobile Money direct (MTN MoMo, Moov Flooz, Orange Money)
- EUR/USD → cartes plateforme externe (Gumroad, LemonSqueezy, Ko-fi, Stripe) + message transparent
- Historique retraits avec statut (en_attente / validé / refusé)

### Amélioration à prévoir
- [ ] Connecter les vraies APIs Mobile Money (MTN MoMo API, Orange Money API)
- [ ] Configurer les vraies clés Firebase dans `kafora-db.js`
- [ ] Remplacer les images locales (`file:///E:/AfroPunk/...`) par des URLs Cloudinary publiques
- [ ] Déployer sur Firebase Hosting (`firebase deploy`)
- [ ] Ajouter encaissement direct EUR/USD une fois les bénéfices suffisants
- [ ] Système de messagerie réelle entre talents et producteurs (Firestore realtime)
- [ ] Notifications candidatures (email ou push)

## Ce qu'il ne faut pas faire
- Ne pas utiliser React, Vue, ou tout autre framework
- Ne pas installer de dépendances npm
- Ne pas modifier les versions passées (v1.0.X précédentes)
- Ne pas ajouter de commentaires évidents dans le code
- Ne pas créer de fichiers README sauf demande explicite
- Ne pas stocker de données sensibles (CB, pièces d'identité, coordonnées postales)
