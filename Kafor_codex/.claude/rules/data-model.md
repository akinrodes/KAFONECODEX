# Modèle de données — Kafora

## Principe
Kafora stocke le **strict minimum**, comme un réseau social standard.
Pas de carte bancaire, pas de pièce d'identité, pas de numéro de téléphone, pas d'adresse postale.
Paiements 100% délégués à Stripe / LemonSqueezy.

## MVP (localStorage — client-side)
Toutes les données vivent dans le navigateur du créateur. Clés utilisées :

| Clé localStorage         | Contenu                                                         |
|--------------------------|-----------------------------------------------------------------|
| `kafora-user`            | `{ email, creatorId, firstName, lastName, plan, loggedAt }`    |
| `kafora-profil`          | `{ fn, ln, bio, city, country, discs[], photo, accentColor, layout, sectionOrder, portfolio[], experiences[], shop[], ig, tt, web, boutiqueName, boutiqueIntro, boutiqueSub }` |
| `kafora-partners`        | `{ [partnerId]: { name, clicks, rev, affId } }`                |
| `kafora-links`           | `[{ name, url, originalUrl, partner, partnerId, clicks, at }]` |
| `kafora-pass-id`         | Identifiant du pass événementiel                               |
| `kafora-attribution-{id}`| `{ creatorId, partnerId, expiry, at }` — cookie 30j visiteur  |
| `kafora-shop-clicks-{id}`| `{ [idx]: count }` — clics boutique par item                  |
| `kafora-theme`           | `'light'` ou absent (dark par défaut)                         |

## Schéma cible — Firebase / Firestore (v2)
Structure Firestore (NoSQL, documents imbriqués) :

```
Firestore
│
├── users/{uid}                         ← document par créateur
│     email         string              ← seule donnée personnelle obligatoire
│     displayName   string
│     plan          string              ← 'free' | 'boost' | 'verified' | 'brand'
│     verified      boolean
│     boosted       boolean
│     boostedUntil  timestamp
│     hasPressKit   boolean
│     isBrand       boolean
│     createdAt     timestamp
│
├── users/{uid}/profile/main            ← sous-collection profil public
│     bio           string
│     city          string
│     country       string
│     disciplines   array               ← ['Mode', 'Design']
│     photoUrl      string              ← URL externe (Firebase Storage ou Cloudinary)
│     accentColor   string
│     layout        string
│     sectionOrder  array
│     igHandle      string
│     website       string
│     boutiqueName  string
│     boutiqueIntro string
│     updatedAt     timestamp
│
└── users/{uid}/links/{slug}            ← sous-collection liens affiliés
      name          string
      slug          string              ← kafora.track/asos-wm9x2k
      originalUrl   string
      partnerId     string
      clicks        number
      updatedAt     timestamp
```

**Avantages Firebase** :
- Auth email/password + Google Sign-In inclus
- Firestore realtime : stats clics mises à jour en direct dans le dashboard
- Firebase Hosting : déploiement des pages statiques en 1 commande
- Free tier Spark : 1GB storage, 50k authentifications/mois, 20k écritures Firestore/jour
- Extension Antigravity disponible directement dans Claude Code

**Ce qu'on ne stocke JAMAIS :**
- Numéro de carte bancaire (Stripe s'en occupe)
- Pièce d'identité ou document officiel
- Adresse postale
- Numéro de téléphone
- Données de navigation des visiteurs (pas de cookies tiers)
- Données d'achat (gérées par les programmes affiliés partenaires)

## Politique de suppression
- Un créateur peut supprimer son compte → suppression en cascade de toutes ses données
- Données d'attribution visiteurs (kafora-attribution-*) : TTL 30 jours, auto-expiration
- Logs d'accès : non conservés

## Paiements
- Stripe Checkout : redirect externe, aucune donnée CB côté Kafora
- LemonSqueezy : alternative, gère la TVA automatiquement
- One-shot (Press Kit 9€, Vérifié 19€) : Stripe Payment Links
- Subscription (Boost 5€/mois, Accès Marque 99€/mois) : Stripe Billing
