/*
|--------------------------------------------------------------------------
| Kernel — Middleware de l'application RØDE
|--------------------------------------------------------------------------
| 
| Ce fichier définit le pipeline des middlewares globaux et nommés.
| Les middlewares nommés (ex: middleware.auth()) sont utilisés dans routes.ts
|
*/

import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

// ===================================================
// Middlewares globaux (s'appliquent à TOUTES les routes)
// ===================================================
server.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
])

// ===================================================
// Middlewares de routeur (s'appliquent aux groupes de routes)
// ===================================================
export const middleware = router.named({
  // Vérif du token JWT - bloque les requêtes sans token valide
  auth: () => import('#middleware/auth_middleware'),
  // Vérif du rôle 'admin' - bloque si l'utilisateur n'est pas admin
  admin: () => import('#middleware/admin_middleware'),
})
