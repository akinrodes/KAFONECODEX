# RØDE – Plateforme Digitale (Monorepo)

Structure Docker complète pour la plateforme RØDE Directory.

---

## STRUCTURE DU PROJET

```
rode-web/
├── docker-compose.yml          # Orchestration de tous les services
├── .gitignore
├── rode-frontend/              # 🟩 Interface Nuxt.js (Le Hub)
│   ├── Dockerfile.dev
│   ├── nuxt.config.ts
│   ├── app.vue
│   └── package.json
└── rode-backend/               # 🟦 API AdonisJS (La Logique Métier)
    ├── Dockerfile.dev
    └── .env.example            # Template des variables d'environnement
```

---

## DÉMARRAGE RAPIDE (Développement)

### 1. Prérequis
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et en cours d'exécution.
*   Git

### 2. Configuration de l'Environnement Backend

```bash
# Copier le template des variables et remplir les valeurs
cp rode-backend/.env.example rode-backend/.env
```

> Ouvrir `rode-backend/.env` et remplir au minimum le champ `APP_KEY` (une chaîne aléatoire de 32+ caractères).

### 3. Lancer tous les services

```bash
# Depuis le dossier rode-web/
docker compose up --build
```

### 4. Accéder aux services

| Service | URL | Description |
| :--- | :--- | :--- |
| **Hub RØDE (Nuxt)** | http://localhost:3000 | L'interface utilisateur |
| **API AdonisJS** | http://localhost:3333 | Le backend & API REST |
| **Adminer (DB GUI)** | http://localhost:8080 | Interface graphique MySQL |

---

## VARIABLES D'ENVIRONNEMENT (Backend)

Se référer au fichier `rode-backend/.env.example` pour la liste complète.

| Variable | Description |
| :--- | :--- |
| `APP_KEY` | Clé secrète de l'application (obligatoire) |
| `DB_*` | Identifiants de la base de données locale |
| `LEMON_SQUEEZY_API_KEY` | Clé API pour les paiements/abonnements |
| `RESEND_API_KEY` | Clé API pour l'envoi d'emails |
