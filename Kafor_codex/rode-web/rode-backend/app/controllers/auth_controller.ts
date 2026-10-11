import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import CreatorProfile from '#models/creator_profile'
import { createId } from '@paralleldrive/cuid2'

export default class AuthController {
  /**
   * POST /api/v1/auth/register
   * Inscription d'un nouveau créateur. Crée un compte User + un profil CreatorProfile vide.
   */
  async register({ request, response }: HttpContext) {
    const { name, email, password } = request.only(['name', 'email', 'password'])

    // Vérification si l'email existe déjà
    const existing = await User.findBy('email', email)
    if (existing) {
      return response.conflict({ message: 'Cet email est déjà utilisé.' })
    }

    // Création du User
    const user = await User.create({
      name,
      email,
      password, // AdonisJS hash automatiquement le mot de passe via le hook beforeSave
      role: 'user',
      plan: 'free',
    })

    // Création automatique du profil créateur vide (slug = nom-cuid unique)
    const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + createId().substring(0, 6)
    await CreatorProfile.create({
      userId: user.id,
      slug,
      displayName: name,
      status: 'pending',
    })

    return response.created({ message: 'Compte créé avec succès.', userId: user.id })
  }

  /**
   * POST /api/v1/auth/login
   * Connexion. Retourne un token JWT.
   */
  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('api').createToken(user)

    return response.ok({ token: token.value!.release() })
  }

  /**
   * POST /api/v1/auth/logout
   */
  async logout({ auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
    return response.ok({ message: 'Déconnecté avec succès.' })
  }

  /**
   * GET /api/v1/auth/me
   * Retourne le profil de l'utilisateur connecté.
   */
  async me({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    await user.load('profile')

    return response.ok({ user })
  }
}
