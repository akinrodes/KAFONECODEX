# CAHIER DES CHARGES TECHNIQUE : ANNUAIRE RØDE

Ce document sert de feuille de route technique initiale pour le développement de la plateforme "Annuaire RØDE" et de son écosystème d'affiliation.

---

## 1. VISION GLOBALE DE LA PLATEFORME
L'Annuaire RØDE est une web-application hybride fonctionnant à la fois comme un annuaire consultable publiquement et une plateforme SaaS (Portfolio/CV interactif) pour les créateurs inscrits. L'ambition visuelle est très élevée (design ultra épuré, très rapide, orienté mobile "Mobile Only" ou "Mobile First").

Il ne s'agit **PAS** d'un site de e-commerce qui héberge des produits, mais d'un routeur de trafic intelligent.

---

## 2. FONCTIONNALITÉS CLÉS PAR UTILISATEUR

### A. Côté Visiteur Publique (B2C & B2B)
*   **La Page d'Accueil ("Le Hub RØDE") :** L'interface principale doit s'inspirer de **Netflix** (Dark mode, très visuelle, immersive).
    *   *Carrousels de mise en avant :* "Créateurs de la Semaine", "Nouvelles Collections", "Les Stylistes à Paris".
    *   *Ambiance sonore (Optionnelle) :* Possibilité d'avoir une musique de fond/ambiance activable sur le Hub principal pour l'immersion.
*   **Recherche & Découverte :** Moteur de recherche avancé (Algolia ou Meilisearch) pour trouver des créateurs par "Discipline" (Mode, Art, Musique), "Localisation" (Paris, Cotonou, NYC) ou "Style".
*   **Consultation de Profil :** Affichage optimisé du "CV Interactif". Les vidéos externes (TikTok, IG Reels, YouTube) doivent être embed de manière très fluide et ne pas ralentir le site.
*   **Redirection fluide :** Boutons "Call To Action" dirigeant vers les boutiques externes (avec tracking d'affiliation invisible pour l'utilisateur).

### B. Le Système d'Événements (La Billetterie Intégrée)
RØDE agit comme un hub événementiel global qui centralise l'accès à la culture.
*   **Les Événements Officiels RØDE :** Billetterie pour *RØDEXAFRICAPARADE* et les soirées *RØDEXPARTY*. Les membres Premium bénéficient automatiquement de leurs réductions au checkout.
*   **Les Événements Partenaires (Culture & Nightlife) :** 
    *   RØDE permet à des organisations externes (Musées, Galeries d'art, Boîtes de Nuit, Festivals) de référencer leurs événements sur le Hub RØDE.
    *   *Avantage Utilisateur :* Ces partenaires proposent des réductions ou des entrées gratuites spécifiques aux membres ayant un compte RØDE.
    *   *Monétisation B2B (Sponsoring) :* Les organisateurs d'événements peuvent acheter des espaces publicitaires sur le Hub RØDE pour y être mis en avant visuellement.

### C. Côté Créateur (L'Espace Membre)
*   **Authentification :** Social Login (Connexion via Google, Instagram) et Email/Mot de passe.
*   **Onboarding :** Création de profil assistée. 
    *   Le créateur choisit entre le niveau "Gratuit" ou s'abonne au "Premium" (via Lemon Squeezy).
*   **Dashboard Premium :**
    *   Outil de création de Portfolio (Drag & Drop simple de liens ou blocs de texte).
    *   Module "Expériences" (Ajout d'une ligne de CV type LinkedIn).
    *   Module "Affiliation" (Le créateur colle son lien affilié externe, ou synchronise le futur plugin RØDE).
    *   Analytics basique (Combien de vues sur mon profil ce mois-ci, de clics sortants).
    *   *Pass Événementiel :* Génération d'un QR Code Membre donnant accès aux événements Partenaires (musées, clubs) avec réduction.

### C. Côté Marques "Titans" (L'Espace Recruteur B2B)
*   **Accès Sécurisé :** Dashboard privé avec analytics de sourcing.
*   **Filtres "Data" :** Recherche ultra-granulaire sur les profils Premium (Ex: "Stylistes basés à Paris ayant de l'expérience en haute couture et un compte Instagram > 10k abonnés").

### D. Côté Administrateur (RØDE)
*   **Dashboard SuperAdmin :** Validation des profils (Curation), gestion des abonnements, bannissement.
*   **Gestion de l'Affiliation :** Suivi consolidé des commissions générées via les liens Option A (Asos) et Option B (Plugin Shopify).

---

## 3. LE NOYAU TECHNOLOGIQUE (TECH STACK)

Pour garantir une scalabilité maximale, une sécurité robuste et des performances de très haut niveau, l'architecture est découplée (Frontend séparé du Backend) :

*   **Frontend (L'Interface Visuelle de l'Annuaire) :** 
    *   `Nuxt.js` : Le framework Vue.js de référence. Il offre un Server-Side Rendering (SSR) exceptionnel pour garantir un SEO parfait (les profils créateurs seront parfaitement indexés sur Google) et une vitesse d'affichage instantanée.
    *   `Nuxt UI` : Une bibliothèque de composants premium et hautement personnalisable intégrée à Nuxt, parfaite pour créer un "Design System" propre et qualitatif (fonds sombres, composants minimalistes).
*   **Backend (Le Moteur Fonctionnel et l'API) :** 
    *   `AdonisJS` : Framework Backend Node.js extrêmement robuste, architecturé comme Laravel (MVC). Idéal pour gérer une logique métier complexe (Auth, Gestion avancée des affiliations, API sécurisée pour communiquer avec le plugin Shopify futur).
*   **Base de Données (Stockage) :**
    *   `PlanetScale` : Une base de données MySQL "Serverless" taillée pour l'hyper-croissance. Elle permet de gérer des pics extrêmes de trafic (ex: lors de l'annonce d'un lancement publicitaire) sans jamais s'effondrer.
*   **Monétisation & Abonnements :**
    *   `Lemon Squeezy` : Moins complexe que Stripe à intégrer, il agit comme un "Merchant of Record" (il gère automatiquement les taxes mondiales, la TVA, etc.). C'est l'outil parfait pour vendre des abonnements SaaS digitaux à des créateurs répartis dans le monde entier sans se soucier de la comptabilité fiscale locale.

---

## 4. ARCHITECTURE DU PLUGIN D'AFFILIATION "RØDE PAY" (Phase 2)

L'Option B (Le Plugin RØDE Shopify/WooCommerce) est un produit logiciel à part entière, développé après la version bêta de l'Annuaire.

### Le Modèle de Tracking
1.  Le visiteur clique sur le bouton "Acheter" du créateur sur l'Annuaire RØDE (Frontend Nuxt).
2.  L'Annuaire génère un identifiant de session unique (`ref_rode=xyz123`) passé discrètement dans l'URL.
3.  Le visiteur arrive sur le site Shopify du créateur. Le Plugin RØDE Shopify intercepte le `ref_rode` et le garde en mémoire (cookie).
4.  Si le visiteur achète un T-shirt, le Plugin RØDE "ping" l'API robuste de RØDE (Backend AdonisJS) pour confirmer la vente et allouer la commission financière.

### Le Défi des Passerelles de Paiement Africaines
Pour que le visiteur basé en Afrique puisse payer via Mobile Money sur ce site Shopify européen :
*   Le Plugin RØDE devra agir comme une **Passerelle de Paiement Alternative** (au moment du checkout Shopify, une option "Payer via RØDE - Mobile Money" s'affiche).
*   En backend (AdonisJS), RØDE sera connecté par API à un agrégateur de paiement panafricain (ex: `Flutterwave`, `Paystack` ou `FedaPay`).
*   *(Note Légale & Finance : Cela implique que RØDE collecte les fonds via Flutterwave, garde sa commission, puis reverse les fonds restants au créateur)*.
