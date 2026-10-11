# /project:new-version

Crée une nouvelle version du projet Kafora en copiant la version actuelle.

## Usage
```
/project:new-version
```

## Instructions
1. Lire `CLAUDE.md` pour connaître la version courante (`currentVersion`)
2. Incrémenter le numéro de patch (ex: `v1.0.12` → `v1.0.13`)
3. Copier le dossier de la version actuelle vers le nouveau numéro :
   ```bash
   cp -r v1.0.12 v1.0.13
   ```
4. Mettre à jour `currentVersion` dans `.claude/settings.json`
5. Confirmer à l'utilisateur : "Version v1.0.13 créée à partir de v1.0.12."

## Règle
Ne jamais modifier les fichiers d'une version antérieure. Tout changement se fait uniquement dans la nouvelle version.
