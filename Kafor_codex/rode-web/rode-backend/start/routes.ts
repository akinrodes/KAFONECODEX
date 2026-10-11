/*
|--------------------------------------------------------------------------
| Routes RØDE API
|--------------------------------------------------------------------------
|
| Structure des routes de l'API AdonisJS RØDE.
| Toutes les routes sont préfixées par /api/v1
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// == Health Check ==
router.get('/', async ({ response }) => {
  return response.json({ status: 'ok', app: 'RØDE API', version: '1.0.0' })
})

// -------------------------------------------------------
// Routes Publiques (Pas d'authentification requise)
// -------------------------------------------------------

// == Auth ==
router.post('/api/v1/auth/register', [() => import('#controllers/auth_controller'), 'register'])
router.post('/api/v1/auth/login', [() => import('#controllers/auth_controller'), 'login'])

// == Annuaire - Navigation Publique ==
// Liste tous les créateurs (avec filtres et pagination)
router.get('/api/v1/creators', [() => import('#controllers/creators_controller'), 'index'])
// Voir un profil public de créateur
router.get('/api/v1/creators/:slug', [() => import('#controllers/creators_controller'), 'show'])

// == Événements - Navigation Publique ==
// Lister les événements RØDE et partenaires
router.get('/api/v1/events', [() => import('#controllers/events_controller'), 'index'])
// Voir un événement spécifique
router.get('/api/v1/events/:id', [() => import('#controllers/events_controller'), 'show'])


// -------------------------------------------------------
// Routes Privées (Authentification requise - JWT)
// -------------------------------------------------------
router.group(() => {

  // == Auth ==
  router.post('/auth/logout', [() => import('#controllers/auth_controller'), 'logout'])
  router.get('/auth/me', [() => import('#controllers/auth_controller'), 'me'])

  // == Mon Profil Créateur (Dashboard) ==
  router.get('/profile', [() => import('#controllers/profile_controller'), 'show'])
  router.put('/profile', [() => import('#controllers/profile_controller'), 'update'])
  router.put('/profile/portfolio', [() => import('#controllers/profile_controller'), 'updatePortfolio'])

  // == Mes Abonnements (Lemon Squeezy) ==
  router.get('/subscription', [() => import('#controllers/subscriptions_controller'), 'show'])
  router.post('/subscription/portal', [() => import('#controllers/subscriptions_controller'), 'portal'])

  // == L'Affiliation (Les Liens) ==
  router.get('/affiliations', [() => import('#controllers/affiliations_controller'), 'index'])
  router.post('/affiliations', [() => import('#controllers/affiliations_controller'), 'store'])
  router.delete('/affiliations/:id', [() => import('#controllers/affiliations_controller'), 'destroy'])

  // == La Billetterie (Mes Tickets & Événements) ==
  router.get('/tickets', [() => import('#controllers/tickets_controller'), 'index'])
  router.post('/events/:id/checkout', [() => import('#controllers/tickets_controller'), 'checkout'])

}).prefix('/api/v1').use(middleware.auth())


// -------------------------------------------------------
// Routes Admin (Rôle Admin requis)
// -------------------------------------------------------
router.group(() => {

  // Valider / bannir un profil créateur
  router.patch('/creators/:id/validate', [() => import('#controllers/admin/creators_controller'), 'validate'])
  router.patch('/creators/:id/ban', [() => import('#controllers/admin/creators_controller'), 'ban'])

  // Gérer les événements partenaires
  router.get('/events', [() => import('#controllers/admin/events_controller'), 'index'])
  router.post('/events', [() => import('#controllers/admin/events_controller'), 'store'])
  router.patch('/events/:id/approve', [() => import('#controllers/admin/events_controller'), 'approve'])
  router.delete('/events/:id', [() => import('#controllers/admin/events_controller'), 'destroy'])

}).prefix('/api/v1/admin').use([middleware.auth(), middleware.admin()])


// -------------------------------------------------------
// Webhooks (Lemon Squeezy - SANS auth classique)
// -------------------------------------------------------
router.post('/webhooks/lemon-squeezy', [() => import('#controllers/webhooks_controller'), 'handleLemonSqueezy'])
