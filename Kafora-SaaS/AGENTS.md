# Kafora — le SaaS déployé (guide pour Codex)

> Ce fichier est lu automatiquement par Codex. Il décrit **le SaaS Kafora tel qu'il est déployé au 2026-10-11**.
> Réponds au PO (ALAKIR) **en français**. Le dossier voisin `../Kafor_codex/` date de l'époque v1 (brochures, pitch decks, affiliation, plans payants) : **il ne décrit plus le produit actuel**, ne t'en sers pas comme référence.

## 1. Ce qu'est Kafora

Kafora est l'**infrastructure de confiance des créateurs de la diaspora africaine et des cultures qui la croisent** — toutes disciplines : mode, danse, photographie, vidéo, cinéma, musique, architecture, design, arts. La diversité culturelle est une force du projet.

Trois piliers :
- **Identité** — qui tu es : un profil éditorial (photo hébergée, bio, disciplines, ville, univers visuel).
- **Expériences** — ce que tu as fait : le *Creative Passport* (organisation, projet, rôle, année, lieu, liens médias).
- **Vérification** — ce qui a été confirmé, et par qui : une organisation (maison, studio, agence, collectif, institution) confirme ou refuse les expériences qui la citent.

Principe business, non négociable : **« Premium may sell presentation and tools. It must never sell truth. »** On pourra vendre des outils, jamais une vérification, un badge ou un rang.

## 2. Où il tourne

| | |
|---|---|
| Production | https://p01--kafora-core-api--wrc467v7s9mb.code.run (hébergé sur Northflank) |
| Backend | Rust · Axum · SQLx · PostgreSQL (Neon) — dépôt GitLab `akinrodes/kafora_core_api`, copie locale `/home/belion/Documents/KAF/kafora/Kafora_Core` |
| Frontend | HTML / CSS / JS **vanilla** — dépôt GitLab `akinrodes/kafora_core`, copie locale `/home/belion/Documents/KAF/kafora/v3.0.0`, servi par l'API (copie dans `Kafora_Core/apps/api/assets/site/`) |
| Versions en ligne | `Kafora_Core` e643100 · `v3.0.0` 82b2956 |
| Déploiement | un push sur `main` de `Kafora_Core` redéploie la production |

**Règle absolue : ne jamais pousser, déployer ni modifier ces dépôts sans l'accord explicite du PO.** Travaille dans ce dossier (`~/Documents/Codex/Kafora-SaaS/`) ; si le PO te demande de toucher au code, lis d'abord `/home/belion/Documents/KAF/kafora/AGENTS.md` et `Kafora_Core/AGENTS.md`.

## 3. Pages du site (frontend `v3.0.0/`)

| Page | Rôle |
|---|---|
| `index.html` | Accueil : héros avec **trois artistes** (cartes en éventail), manifeste, offre, public, globe « La diaspora en mouvement », « Claim your kingdom ». **Le PO veut garder cet accueil tel quel.** |
| `createurs.html` | Annuaire : cartes « Kafora Pass », recherche (nom, discipline, ville, bio), filtres, tri A-Z. Badge « ✓ Vérifié » uniquement si une organisation a vérifié une expérience. Aucun classement par popularité. |
| `profil.html?creator=<slug>` | Profil public : héros photo, chiffres **Expériences · Vérifiées · Depuis**, bio, Creative Passport (états : déclarée, en attente, vérifiée « par X · date », refusée, révoquée), vidéos/photos liées (Instagram, YouTube, Vimeo, TikTok, image). |
| `profil-marque.html?brand=<slug>` | Profil d'organisation (identité prouvée par domaine ou par un admin plateforme). |
| `inscription.html`, `connexion.html` | Compte : email + mot de passe (Argon2id, 10 caractères min.) ou OAuth GitHub / Google. Comptes de démonstration présentés sur la page de connexion. |
| `dashboard.html` | Espace créateur : profil, photo (upload hébergé, métadonnées GPS retirées), expériences + liens médias, demande de vérification, invitation d'une organisation absente (lien 14 jours, usage unique), mot de passe, suppression du compte (RGPD). |
| `dashboard-marque.html` | Espace organisation : catalogue (= l'annuaire réel), vérifications à traiter, compte et preuve d'identité. |
| `invitation.html` | Accepter une invitation à confirmer une expérience. |
| `presskit_deck.html` | Press kit généré depuis les données réelles ; seules les expériences vérifiées nomment leur vérificateur. |
| `kafora.html` | « Notre ADN ». |
| `globe.html` | Globe des créateurs. |

## 4. API (toutes sous `/api`)

Sessions serveur (cookie HttpOnly) + en-tête `X-CSRF-Token` sur toute mutation.
- Auth : inscription, connexion, déconnexion, `GET /api/auth/me`, OAuth GitHub/Google.
- Personnes : `GET /api/persons?q=&discipline=&location=`, `GET /api/persons/:slug`, `/press-kit`, `/photo`.
- Moi : `PATCH /api/me/profile`, `PUT|DELETE /api/me/photo`, `GET|POST /api/me/experiences`, `GET|PATCH|DELETE /api/me/experiences/:id`, demande et historique de vérification, invitations, `POST /api/me/password`, `DELETE /api/me`.
- Organisations : création, fiche, membres, demandes de vérification, décision (`verify` / `reject`), révocation, preuve d'identité par domaine.
- Liste complète et à jour : `Kafora_Core/README.md`, section « API ».

Données (PostgreSQL, migrations `0001` → `0013`) : `persons`, `accounts`, `sessions`, `organizations`, `organization_memberships`, `collaborations` (expériences, avec `media_urls`), `verifications` + `verification_events` (une vérification est **un historique, jamais un booléen**), `organization_invitations`, `person_photos`, `audit_records`.

## 5. Règles produit à ne jamais casser

- **Le serveur fait autorité.** Le navigateur ne décide jamais d'un badge, d'une vérification ou d'un plan ; `localStorage` = préférences d'interface.
- **Aucun chiffre inventé** : pas d'abonnés, de vues, d'écoutes, de « 300+ créateurs », de partenaires fictifs. Seuls des faits vérifiables (nombre d'expériences, d'expériences vérifiées, année de début).
- **Aucun classement** par popularité ; une ville = une ville.
- **Les médias d'expérience sont des liens** (https), jamais des copies. Seule la photo de profil est hébergée.
- **Retiré le 2026-09-24, à ne pas réintroduire** : casting/missions/portefeuille, affiliation/boutique, plans payants (Boost, Vérifié, Accès Marque), événements organisés par Kafora, galerie immersive, pubs, Firebase.
- **Ne jamais stocker** : carte bancaire, pièce d'identité, adresse postale, téléphone, données de navigation.
- Pas de React, Vue, Tailwind ni dépendance npm. Tout texte venant de l'API est échappé avant affichage.
- Sécurité : règles complètes dans `/home/belion/Documents/KAF/kafora/Kafora_Core/docs/SECURITE.md` (OWASP Top 10:2025, OWASP API Top 10:2023).

## 6. Identité visuelle actuelle

- **Typographie** : Barlow Condensed (900 titres, 300 navigation, étiquettes en capitales espacées) et Barlow 300 pour le texte.
- **Palette** : Deep Ink `#0A0A0A` · Parchment `#EAE2D4` / `#D8CEBA` · Golden Bronze `#B08D57` · Warm Ash `#8C8478`. Thème sombre par défaut, sections claires en Parchment.
- **Composants** : cartes « Kafora Pass » (fond `#EDE5D3`, rayon 18 px, en-tête bronze translucide, code-barres), boutons `.btn-bronze` / `.btn-outline`, grain cinéma, dégradé de titre Parchment → Bronze.
- Esprit : luxe éditorial, cinématique, afro chic avec une pointe punk.

## 7. Où en est la refonte du design (pour t'inspirer, pas pour copier)

Maquettes HTML (à ouvrir dans Firefox) dans `/home/belion/Documents/KAF/kafora/_bmad-output/planning-artifacts/ux-designs/ux-kafora-2026-09-25/.working/` :
- Le PO a aimé l'énergie de **A · Maison Noire**, **B · Zine Afro-Punk** (gardé comme **second style du SaaS**) et **C · Oasis**.
- Dans **G · Pressage** : retenus l'**écran Studio** (générateur de cover depuis les propres photos du créateur + **aperçu public façon écran de streaming**), la **carte d'Afrique en relief** et le **profil public**.
- **H · Or Noir 3D** a été rejetée : « fausse 3D », « pas assez Kafora », « trop sombre, tout pareil ».
- **I · Kafora 3D** (en attente d'avis) : site actuel + carte d'Afrique en vraie 3D (Three.js, altitudes réelles).
- Le PO consulte **uniquement sur Firefox**. Il aime : cover art musical/de peintre, disque d'or/platine (comme métaphore de la vérification, jamais de chiffres de ventes), vintage, clips afrobeats actuels, dandysme afro, royauté discrète, Afrique marocaine, bois / ivoire / noir / rouge / or.

## 8. Images d'inspiration : le Drive « darymotion », dossier `PourCodex`

Avant tout travail de design, **va chercher les images d'inspiration** dans le Google Drive **darymotion**, dossier **`PourCodex`** (≈ 47 fichiers, 17 Mo). Sur cette machine, le Drive est configuré dans rclone sous le nom `darymotion:` :

```bash
mkdir -p inspiration
rclone copy darymotion:PourCodex ./inspiration --progress
```

- Regarde **toutes** les images avant de proposer quoi que ce soit, et décris ce que tu en retiens (couleurs, cadrages, typographie, matières, ambiance).
- Ce sont des images de référence (souvent Pinterest) : **inspiration seulement**. Aucune ne va sur le site public sans que les droits soient réglés.
- N'utilise jamais une image générée par IA pour représenter un vrai créateur ; les créateurs n'apparaissent qu'avec leurs vraies photos.

## 9. Méthode attendue

- Le PO veut un développement propre : **parcours BMAD** pour les grosses fonctionnalités (spec → découpage en tickets → construction → revue), dossiers dans `/home/belion/Documents/KAF/kafora/_bmad-output/`.
- Une maquette = un fichier HTML autonome, vanilla, qui s'ouvre directement dans Firefox.
- Toujours dire clairement ce qui a été vérifié et ce qui ne l'a pas été.
