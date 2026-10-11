# /project:review

Effectue une revue complète de la version courante du projet Kafora.

## Usage
```
/project:review
/project:review v1.0.12
```

## Instructions
Analyser tous les fichiers HTML de la version indiquée (ou `v1.0.12` par défaut) et produire un rapport structuré :

### 1. Cohérence visuelle
- Toutes les pages utilisent-elles la même palette (#0A0A0A, #EAE2D4, #B08D57, #8C8478) ?
- La police Barlow Condensed est-elle chargée partout ?
- Le thème sombre/clair fonctionne-t-il sur toutes les pages ?

### 2. Navigation
- Le lien "Notre ADN" (kafora.html) est-il présent dans tous les navbars ?
- Tous les liens entre pages sont-ils fonctionnels ?
- La page active est-elle correctement marquée (class="active") ?

### 3. Profils dynamiques
- `profil.html?creator=amara` → Amara Diallo
- `profil.html?creator=kofi` → Kofi Mensah
- `profil.html?creator=lea` → Léa Traoré

### 4. Performance & qualité
- Y a-t-il des CSS dupliqués entre pages ?
- Les images ont-elles des attributs `alt` ?
- Le responsive mobile est-il prévu (media queries) ?

### 5. Rapport final
Lister les problèmes trouvés par ordre de priorité (critique / mineur / suggestion).
