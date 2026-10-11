import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Middleware Auth
 * Vérifie que la requête contient un token JWT valide.
 * Renvoie 401 Unauthorized si le token est absent ou expiré.
 */
export default class AuthMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    try {
      await auth.authenticate()
      return next()
    } catch {
      return response.unauthorized({
        message: 'Non autorisé. Veuillez vous connecter.',
        error: 'UNAUTHENTICATED',
      })
    }
  }
}
