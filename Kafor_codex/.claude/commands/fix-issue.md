# /project:fix-issue

Corrige un bug ou un problème spécifique dans la version courante.

## Usage
```
/project:fix-issue <description du problème>
```

## Exemples
```
/project:fix-issue le lien "Voir le profil" pointe toujours sur Amara Diallo
/project:fix-issue les cartes sont trop larges en mode étendu
/project:fix-issue le thème clair ne s'applique pas sur profil.html
```

## Instructions
1. Lire le fichier concerné avant toute modification
2. Identifier la cause racine du bug (ne pas corriger les symptômes)
3. Appliquer le correctif minimal — ne pas refactorer le code environnant
4. Vérifier que le fix ne casse pas d'autres pages (chercher les sélecteurs CSS partagés)
5. Résumer le changement effectué en 1-2 phrases

## Règle
Travailler uniquement dans la version courante. Si le fix nécessite des changements majeurs, proposer de créer une nouvelle version avec `/project:new-version`.
