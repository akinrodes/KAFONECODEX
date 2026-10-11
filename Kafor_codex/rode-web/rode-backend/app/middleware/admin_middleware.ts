import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Middleware Admin
 * À placer APRÈS le middleware Auth.
 * Vérifie que l'utilisateur authentifié a le rôle 'admin'.
 * Renvoie 403 Forbidden si ce n'est pas le cas.
 */
export default class AdminMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    const user = auth.getUserOrFail()

    if (user.role !== 'admin') {
      return response.forbidden({
        message: 'Accès interdit. Zone réservée aux administrateurs RØDE.',
        error: 'FORBIDDEN',
      })
    }

    return next()
  }
}
