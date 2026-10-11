# CAHIER DES CHARGES TECHNIQUE : ANNUAIRE RØDE

Ce document sert de feuille de route technique initiale pour le développement de la plateforme "Annuaire RØDE" et de son écosystème d'affiliation.

---

## 1. VISION GLOBALE DE LA PLATEFORME
L'Annuaire RØDE est une web-application hybride fonctionnant à la fois comme un annuaire consultable publiquement et une plateforme SaaS (Portfolio/CV interactif) pour les créateurs inscrits. L'ambition visuelle est très élevée (design ultra épuré, très rapide, orienté mobile "Mobile Only" ou "Mobile First").

Il ne s'agit **PAS** d'un site de e-commerce qui héberge des produits, mais d'un routeur de trafic intelligent.

---

## 2. FONCTIONNALITÉS CLÉS PAR UTILISATEUR

### A. Côté Visiteur Publique (B2C & B2B)
*   **Recherche & Découverte :** Moteur de recherche avancé (Algolia ou Meilisearch) pour trouver des créateurs par "Discipline" (Mode, Art, Musique), "Localisation" (Paris, Cotonou, NYC) ou "Style".
*   **Consultation de Profil :** Affichage optimisé du "CV Interactif". Les vidéos externes (TikTok, IG Reels, YouTube) doivent être embed de manière très fluide et ne pas ralentir le site.
*   **Redirection fluide :** Boutons "Call To Action" dirigeant vers les boutiques externes (avec tracking d'affiliation invisible pour l'utilisateur).

### B. Côté Créateur (L'Espace Membre)
*   **Authentification :** Social Login (Connexion via Google, Instagram) et Email/Mot de passe.
*   **Onboarding :** Création de profil assistée. 
    *   Le créateur choisit entre le niveau "Gratuit" ou s'abonne au "Premium" (via Stripe).
*   **Dashboard Premium :**
    *   Outil de création de Portfolio (Drag & Drop simple de liens ou blocs de texte).
    *   Module "Expériences" (Ajout d'une ligne de CV type LinkedIn).
    *   Module "Affiliation" (Le créateur colle son lien affilié Asos, ou installe le plugin RØDE et synchronise son site externe).
    *   Analytics basique (Combien de vues sur mon profil ce mois-ci, de clics sortants).

### C. Côté Marques "Titans" (L'Espace Recruteur B2B)
*   **Accès Sécurisé :** Dashboard privé avec analytics de sourcing.
*   **Filtres "Data" :** Recherche ultra-granulaire sur les profils Premium (Ex: "Stylistes basés à Paris ayant de l'expérience en haute couture et un compte Instagram > 10k abonnés").

### D. Côté Administrateur (RØDE)
*   **Dashboard SuperAdmin :** Validation des profils (Curation), gestion des abonnements, bannissement.
*   **Gestion de l'Affiliation :** Suivi consolidé des commissions générées via les liens Option A (Asos) et Option B (Plugin Shopify).

---

## 3. LE NOYAU TECHNOLOGIQUE (TECH STACK RECOMMANDÉ)

Pour garantir la vélocité, le SEO et la scalabilité :

*   **Frontend (Le Visuel) :** 
    *   `Next.js` (React framework) : Indispensable pour le SEO (Server-Side Rendering) puisque chaque profil de créateur doit être indexable par Google.
    *   `TailwindCSS` : Pour l'intégration d'un design système sur mesure "Luxe/Minimaliste".
*   **Backend & Base de données :** 
    *   `Supabase` ou `Firebase` (PostgreSQL / NoSQL) : Pour gérer l'authentification et une base de données flexible capable de stocker des milliers de fiches créateurs avec des caractéristiques différentes.
*   **Paiement & Abonnements (Créateurs et Titans) :**
    *   `Stripe Billing` pour gérer les abonnements annuels de l'Annuaire (Profil Premium à 50€/100€).
*   **Moteur de Recherche Interne :**
    *   `Algolia` : La référence pour les barres de recherche "Typo-tolerance" instantanées.

---

## 4. ARCHITECTURE DU PLUGIN D'AFFILIATION "RØDE PAY" (Phase 2)

L'Option B (Le Plugin RØDE Shopify/WooCommerce) est un produit logiciel à part entière, développé après la version bêta de l'Annuaire.

### Le Modèle de Tracking
1.  Le visiteur clique sur le bouton "Acheter" du créateur sur l'Annuaire RØDE.
2.  L'Annuaire génère un identifiant de session unique (`ref_rode=xyz123`) passé discrètement dans l'URL.
3.  Le visiteur arrive sur le site Shopify du créateur. Le Plugin RØDE Shopify intercepte le `ref_rode` et le garde en mémoire (cookie/local storage).
4.  Si le visiteur achète un T-shirt, le Plugin RØDE "ping" l'API RØDE pour confirmer la vente et allouer la commission mathématique.

### Le Défi des Passerelles de Paiement Africaines
Pour que le visiteur basé en Afrique puisse payer via Mobile Money sur ce site Shopify européen :
*   Le Plugin RØDE devra agir comme une **Passerelle de Paiement Alternative** (au moment du checkout Shopify, une option "Payer via RØDE - Mobile Money" s'affiche).
*   En backend, RØDE sera connecté par API à un agrégateur de paiement panafricain (ex: `Flutterwave`, `Paystack` ou `FedaPay`).
*   *(Note Légale & Finance : Cela implique que RØDE collecte les fonds via Flutterwave, garde sa commission, puis reverse les fonds restants au créateur via virement bancaire ou Stripe Connect. C'est techniquement et légalement plus complexe, à prévoir pour la v2).*
