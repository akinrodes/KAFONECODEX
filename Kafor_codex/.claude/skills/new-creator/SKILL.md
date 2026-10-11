# Skill : Ajouter un créateur

Ce skill est invoqué automatiquement quand l'utilisateur demande d'ajouter un nouveau créateur à Kafora.

## Déclencheurs
- "ajoute un créateur"
- "nouveau créateur"
- "ajoute [Prénom Nom] comme créateur"

## Étapes

### 1. Collecter les informations
Demander si non fournies :
- Nom complet
- Discipline (Mode / Art / Musique / ...)
- Ville · Pays
- ID URL (ex: `amara`, `kofi`) — lowercase, sans accents
- Bio courte (2-3 phrases)
- Image de profil (chemin local ou URL)

### 2. Mettre à jour index.html
Dans le tableau `creators` du JS de la version courante :
```javascript
{ name: 'Prénom<br>Nom', discipline: 'Discipline · Ville', city: 'Pays', profile: 'profil.html?creator=id', label: '0X' },
```
Ajuster les labels (01, 02, 03...) et les indicateurs de slide.

### 3. Mettre à jour profil.html
Dans l'objet `CREATORS` :
```javascript
id: {
  title: 'Kafora — Prénom Nom',
  heroImg: 'chemin/vers/image.jpg',
  name: 'Prénom<br>Nom',
  discipline: 'Discipline · Ville · Pays',
  followers: 'X K',
  projects: 'X',
  bio: 'Bio du créateur...',
  tags: ['tag1', 'tag2', 'tag3'],
},
```

### 4. Vérifier
- Le lien "Voir le profil" pointe vers `profil.html?creator=id`
- Le profil s'affiche correctement avec les bonnes données
- Les indicateurs de slide sont cohérents

## Note
Si l'accueil est limité à 3 créateurs, ne pas en ajouter sans confirmation de l'utilisateur sur lequel remplacer ou si la limite doit être augmentée.
