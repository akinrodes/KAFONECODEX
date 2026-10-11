# /project:new-page

Crée une nouvelle page HTML cohérente avec le design system Kafora.

## Usage
```
/project:new-page <nom> <titre> <description>
```

## Exemple
```
/project:new-page blog "Journal" "Articles éditoriaux sur la culture diaspora"
```

## Instructions
1. Copier la structure nav + footer depuis `createurs.html` (source de vérité pour le nav)
2. Ajouter le lien "Notre ADN" dans le nav de la nouvelle page
3. Appliquer la palette : fond #0A0A0A, texte #EAE2D4, accent #B08D57
4. Inclure `rode.css` en premier lien stylesheet
5. Charger Barlow Condensed via Google Fonts
6. Ajouter le lien vers la nouvelle page dans le nav de **toutes** les pages existantes
7. Ajouter le lien dans le footer de toutes les pages

## Structure minimale d'une page
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kafora — [Titre]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;700;900&family=Barlow:wght@300;400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="rode.css" />
  <style>/* styles spécifiques à cette page */</style>
</head>
<body>
  <!-- NAV -->
  <!-- CONTENU -->
  <!-- FOOTER -->
</body>
</html>
```
