# Kafora v1.0.32 — Cahier de tests manuel

> Ouvrir tous les fichiers depuis un serveur local (ex: `python -m http.server 8080` ou Live Server VS Code).  
> Navigateur : Chrome ou Edge recommandé (localStorage + modules ES6).  
> Réinitialiser le localStorage avant chaque section : DevTools → Application → Local Storage → Clear all.

---

## Statut global

| Section | Statut | Notes |
|---------|--------|-------|
| T01 Navigation & thème | ☐ | |
| T02 Authentification | ☐ | |
| T03 Dashboard — Profil | ☐ | |
| T04 Dashboard — Affiliation | ☐ | |
| T05 Dashboard — Press Kit | ☐ | |
| T06 Dashboard — Builder | ☐ | |
| T07 Dashboard — Pass événementiel | ☐ | |
| T08 Profil public | ☐ | |
| T09 Createurs.html | ☐ | |
| T10 Premium.html | ☐ | |
| T11 Marques.html | ☐ | |
| T12 Firebase / fallback | ☐ | |

---

## T01 — Navigation & thème sombre/clair

**Fichier :** `index.html` (et toutes les pages)

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 1.1 | Ouvrir `index.html` | Page s'affiche en thème sombre (#0A0A0A) | ☐ |
| 1.2 | Scroller vers le bas | Navbar devient `rgba(10,10,10,0.92)` opaque | ☐ |
| 1.3 | Cliquer sur le toggle thème (☀/🌙) | Page bascule en thème clair (fond #EAE2D4) | ☐ |
| 1.4 | Rafraîchir la page | Thème clair persisté (localStorage `kafora-theme`) | ☐ |
| 1.5 | Cliquer sur "MARQUES" dans la nav | Redirection vers `marques.html` | ☐ |
| 1.6 | Vérifier la présence du lien "Marques" sur `createurs.html`, `kafora.html`, `premium.html` | Lien présent dans toutes les navs | ☐ |
| 1.7 | Cliquer sur le logo "KAFORA" | Retour à `index.html` | ☐ |

---

## T02 — Authentification

**Fichiers :** `connexion.html`, `inscription.html`

### T02-A : Connexion avec compte démo

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 2.1 | Ouvrir `connexion.html` | Formulaire email + mot de passe affiché | ☐ |
| 2.2 | Entrer `amara@kafora.com` / `amara123` → Se connecter | Redirection vers `dashboard.html` | ☐ |
| 2.3 | Vérifier localStorage `kafora-user` | Contient `{ creatorId: "amara", plan: "premium", ... }` | ☐ |
| 2.4 | Ouvrir `connexion.html` → entrer `kofi@kafora.com` / `kofi123` | Redirection dashboard, creatorId = "kofi" | ☐ |
| 2.5 | Tester `lea@kafora.com` / `lea123` | Connexion OK, plan = "member" | ☐ |
| 2.6 | Tester `nia@kafora.com` / `nia123` | Connexion OK, plan = "premium" | ☐ |

### T02-B : Mauvais identifiants

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 2.7 | Email incorrect → Se connecter | Message d'erreur affiché (pas de crash) | ☐ |
| 2.8 | Mot de passe incorrect pour un démo → Se connecter | Message d'erreur "Identifiants invalides" ou similaire | ☐ |

### T02-C : Inscription

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 2.9 | Ouvrir `inscription.html` | Formulaire d'inscription visible | ☐ |
| 2.10 | Remplir prénom, nom, email unique, mot de passe → S'inscrire | Redirection vers `dashboard.html` | ☐ |
| 2.11 | Vérifier localStorage `kafora-user` | Données du nouveau compte présentes | ☐ |

### T02-D : Déconnexion

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 2.12 | Sur `dashboard.html` → cliquer Déconnexion | Retour à `connexion.html` ou `index.html` | ☐ |
| 2.13 | Vérifier localStorage | `kafora-user` supprimé | ☐ |

---

## T03 — Dashboard : Profil

**Fichier :** `dashboard.html` (onglet "Mon profil")  
**Prérequis :** Connecté en démo `amara@kafora.com`

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 3.1 | Ouvrir `dashboard.html` | Profil d'Amara Diallo pré-rempli (bio, ville, disciplines) | ☐ |
| 3.2 | Modifier la bio → cliquer "Enregistrer" | Toast de confirmation affiché | ☐ |
| 3.3 | Rafraîchir la page | Bio modifiée persistée (localStorage `kafora-profil`) | ☐ |
| 3.4 | Cliquer "Voir mon profil" | Ouvre `profil.html?creator=me` | ☐ |
| 3.5 | Sur `profil.html?creator=me` | Affiche le profil avec les données de localStorage | ☐ |
| 3.6 | Changer la photo de profil (URL externe) | Prévisualisation mise à jour dans le dashboard | ☐ |
| 3.7 | Ajouter une discipline (ex: "Sculpture") → Enregistrer | Discipline ajoutée et persistée | ☐ |

---

## T04 — Dashboard : Hub Affiliation

**Fichier :** `dashboard.html` (onglet "Affiliation")

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 4.1 | Naviguer vers l'onglet Affiliation | 5 partenaires affichés : ASOS, Sephora, Farfetch, Nike, Zara | ☐ |
| 4.2 | Stats globales | Clics totaux + revenus agrégés affichés (0 par défaut) | ☐ |
| 4.3 | Cliquer "Connecter" sur ASOS | Modal s'ouvre + ouverture URL programme d'affiliation dans nouvel onglet | ☐ |
| 4.4 | Dans la modal → entrer un affId (ex: `ASOS-TEST-123`) → Confirmer | Partenaire affiché comme "connecté" | ☐ |
| 4.5 | Vérifier localStorage `kafora-partners` | Contient l'entrée ASOS avec l'affId | ☐ |
| 4.6 | Cliquer "Copier le lien" sur un partenaire connecté | Lien copié dans le presse-papier | ☐ |
| 4.7 | Cliquer "Simuler clic" | Compteur de clics incrémenté de +1 | ☐ |
| 4.8 | Vérifier localStorage `kafora-links` | Lien affilié enregistré avec `clicks` mis à jour | ☐ |

---

## T05 — Dashboard : Press Kit

**Fichier :** `dashboard.html` (onglet ou section "Press Kit")

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 5.1 | Repérer le bouton "Générer mon Press Kit" | Bouton visible dans le dashboard | ☐ |
| 5.2 | Cliquer le bouton (sans `hasPressKit`) | Paywall ou redirection vers `premium.html` | ☐ |
| 5.3 | Dans localStorage → ajouter `hasPressKit: "true"` manuellement | — | ☐ |
| 5.4 | Cliquer "Générer mon Press Kit" avec `hasPressKit` | Génération PDF (jsPDF) OU ouverture `presskit_deck.html` | ☐ |
| 5.5 | Vérifier le contenu du PDF/deck | Nom du créateur, bio, disciplines, liens | ☐ |

---

## T06 — Dashboard : Espace Builder

**Fichier :** `dashboard.html` (onglet "Builder" ou "Personnaliser")

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 6.1 | Naviguer vers l'onglet Builder | 4 layouts affichés avec thumbnails | ☐ |
| 6.2 | Sélectionner layout "Magazine" | Sélection visuelle confirmée (highlight/check) | ☐ |
| 6.3 | Enregistrer | Layout sauvé dans localStorage `kafora-profil.layout` | ☐ |
| 6.4 | Choisir une couleur d'accent (ex: rose) | Prévisualisation couleur mise à jour | ☐ |
| 6.5 | Réordonner les sections avec flèches ↑↓ | Ordre modifié visuellement | ☐ |
| 6.6 | Enregistrer → Voir mon profil | `profil.html?creator=me` reflète le nouveau layout | ☐ |

---

## T07 — Dashboard : Pass événementiel

**Fichier :** `dashboard.html` (section "Pass")

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 7.1 | Trouver la section Pass événementiel | ID unique (barcode-style) affiché | ☐ |
| 7.2 | Rafraîchir la page | Même ID affiché (localStorage `kafora-pass-id`) | ☐ |
| 7.3 | Effacer `kafora-pass-id` du localStorage → Rafraîchir | Nouvel ID généré automatiquement | ☐ |

---

## T08 — Profil public

**Fichier :** `profil.html`

### T08-A : Profil créateur existant

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 8.1 | Ouvrir `profil.html?creator=amara` | Profil Amara Diallo affiché, hero personnalisé | ☐ |
| 8.2 | Badge vérifié | Check doré visible sur le nom | ☐ |
| 8.3 | Section Portfolio | Tuiles portfolio cliquables avec badge "Voir la pièce →" | ☐ |
| 8.4 | Cliquer une tuile portfolio | Attribution 30j enregistrée dans localStorage `kafora-attribution-amara` + ouverture URL affilié | ☐ |
| 8.5 | Vérifier localStorage `kafora-attribution-amara` | Contient `{ creatorId, partnerId, expiry, at }` avec expiry ~30j | ☐ |
| 8.6 | Section Boutique | Items boutique affichés avec liens réels | ☐ |
| 8.7 | Cliquer un item boutique | Ouverture URL externe (partenaire) | ☐ |
| 8.8 | Section "Créateurs similaires" | 4 cartes créateurs affichées (boostés en premier) | ☐ |
| 8.9 | Section Contacts (non connecté) | Email/DM masqués avec icône 🔒 | ☐ |

### T08-B : Profil "me" (connecté)

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 8.10 | Connecté en Amara → ouvrir `profil.html?creator=me` | Profil affiché avec données localStorage | ☐ |
| 8.11 | Contacts section | Contacts visibles (isMe = true) | ☐ |
| 8.12 | Ouvrir `profil.html?creator=kofi` | Profil Kofi affiché, thème différent | ☐ |
| 8.13 | Contacts de Kofi (connecté en Amara, sans plan Marque) | Contacts masqués 🔒 | ☐ |

### T08-C : Accès Marque débloque les contacts

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 8.14 | Ajouter `kaforaBrand: "true"` dans localStorage | — | ☐ |
| 8.15 | Rafraîchir `profil.html?creator=kofi` | Contacts de Kofi visibles | ☐ |

---

## T09 — Createurs.html

**Fichier :** `createurs.html`

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 9.1 | Ouvrir `createurs.html` | Grille de créateurs affichée | ☐ |
| 9.2 | Créateurs boostés | Amara, Kofi, Nia apparaissent en premier avec badge "★ En vedette" | ☐ |
| 9.3 | Badge vérifié | Check doré visible sur les cartes vérifiées | ☐ |
| 9.4 | Recherche "amara" | Seule la carte Amara Diallo affichée | ☐ |
| 9.5 | Vider la recherche | Toutes les cartes réapparaissent | ☐ |
| 9.6 | Filtre par discipline "Photographie" | Seule Nia Osei affichée | ☐ |
| 9.7 | Filtre par ville "Accra" | Seul Kofi Mensah affiché | ☐ |
| 9.8 | Cliquer sur une carte créateur | Redirection vers `profil.html?creator={id}` | ☐ |
| 9.9 | Connecté en Amara (boostée) → ouvrir `createurs.html` | Carte Amara en toute première position | ☐ |

---

## T10 — Premium.html

**Fichier :** `premium.html`

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 10.1 | Ouvrir `premium.html` | 4 plans visibles : Gratuit, Boost, Press Kit, Vérifié | ☐ |
| 10.2 | Section Accès Marque | Plan 99€/mois affiché avec CTA | ☐ |
| 10.3 | Cliquer "Activer le Boost" (plan Boost 5€) | `simulatePurchase()` → confirm dialog → `kaforaBoost: "true"` dans localStorage | ☐ |
| 10.4 | Cliquer "Obtenir le Badge" (plan Vérifié 19€) | `kaforaVerified: "true"` dans localStorage | ☐ |
| 10.5 | Cliquer "Générer" (Press Kit 9€) | `hasPressKit: "true"` dans localStorage | ☐ |
| 10.6 | Cliquer CTA Accès Marque | `kaforaBrand: "true"` dans localStorage OU redirect Stripe | ☐ |
| 10.7 | Retourner sur `createurs.html` après Boost | Badge "★ En vedette" sur la carte du créateur connecté | ☐ |

---

## T11 — Marques.html

**Fichier :** `marques.html`

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 11.1 | Ouvrir `marques.html` | Hero "Scoutez les créateurs de demain" visible | ☐ |
| 11.2 | Cards créateurs en aperçu | Infos de contact floutées avec overlay cadenas 🔒 | ☐ |
| 11.3 | Features grid | 3 features : Recherche avancée, Contact direct, Profils vérifiés | ☐ |
| 11.4 | CTA "Accéder — 99€/mois" | Redirection Stripe ou `simulatePurchase('brand', 99, 'Accès Marque')` | ☐ |
| 11.5 | Connecté avec `kaforaBrand: "true"` → rafraîchir | Dashboard marque OU contacts débloqués | ☐ |

---

## T12 — Firebase / fallback localStorage

**Fichier :** `kafora-db.js` (comportement observable dans toutes les pages)

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 12.1 | Ouvrir `dashboard.html` → attendre 600ms | Indicateur DB dans la sidebar : point vert "Firebase ✓" si Firebase configuré, sinon point orange "localStorage" | ☐ |
| 12.2 | Sans Firebase configuré (config placeholder) | Toutes les fonctionnalités marchent via localStorage (pas de crash) | ☐ |
| 12.3 | Enregistrer profil sans Firebase | Toast de confirmation affiché, données dans localStorage | ☐ |
| 12.4 | Ajouter un lien sans Firebase | Lien dans localStorage `kafora-links` | ☐ |
| 12.5 | Se déconnecter | `kafora-user` + données session effacés, Firebase session close (si actif) | ☐ |

---

## T13 — Pitch Deck

**Fichier :** `pitch_deck_mob.html`

| # | Action | Résultat attendu | ✓/✗ |
|---|--------|-----------------|-----|
| 13.1 | Ouvrir `pitch_deck_mob.html` | Slides 1920×1080 affichées, scalées au viewport | ☐ |
| 13.2 | Redimensionner la fenêtre | `scaleDeck()` ajuste le zoom sans déformer | ☐ |
| 13.3 | Navigation slides | Boutons prev/next fonctionnels | ☐ |

---

## Checklist finale avant livraison

| Item | ✓/✗ |
|------|-----|
| Aucun `console.error` au chargement des pages principales | ☐ |
| Aucun lien cassé dans la navigation | ☐ |
| Thème dark persisté par défaut sur toutes les pages | ☐ |
| Toutes les 4 comptes démo fonctionnels | ☐ |
| localStorage nettoyé proprement à la déconnexion | ☐ |
| Pas de données sensibles (CB, identité) dans le localStorage | ☐ |
| `rode.css` chargé sur toutes les pages | ☐ |
| Police Barlow Condensed chargée (Google Fonts CDN) | ☐ |

---

*Kafora v1.0.32 — Tests manuels — 2026-04-01*
