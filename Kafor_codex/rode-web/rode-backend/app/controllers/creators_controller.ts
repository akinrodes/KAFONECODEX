import type { HttpContext } from '@adonisjs/core/http'
import CreatorProfile from '#models/creator_profile'

export default class CreatorsController {
  /**
   * GET /api/v1/creators
   * Retourne la liste paginée des créateurs approuvés.
   * Supporte les filtres: ?discipline=Mode&country=France&search=Raul
   */
  async index({ request, response }: HttpContext) {
    const { discipline, country, city, search, page = 1, limit = 20 } = request.qs()

    const query = CreatorProfile.query()
      .where('creator_profiles.status', 'active')
      .join('users', 'creator_profiles.user_id', '=', 'users.id')
      .select('creator_profiles.*')
      .preload('user', (userQuery) => {
        userQuery.select(['id', 'plan']) // On expose le plan pour le badge Premium
      })

    // Filtres dynamiques
    if (discipline) {
      query.where('discipline', discipline)
    }
    if (country) {
      query.where('country', country)
    }
    if (city) {
      query.where('city', city)
    }
    if (search) {
      query.where((builder) => {
        builder
          .whereILike('display_name', `%${search}%`)
          .orWhereILike('bio', `%${search}%`)
          .orWhereILike('discipline', `%${search}%`)
      })
    }

    // Les profils Premium Élite remontent en haut (boost algorithmique)
    query.orderByRaw(`
      CASE 
        WHEN users.plan = 'premium_elite' THEN 1
        WHEN users.plan = 'premium_standard' THEN 2
        ELSE 3
      END
    `)

    const creators = await query.paginate(page, limit)

    return response.ok(creators)
  }

  /**
   * GET /api/v1/creators/:slug
   * Retourne le profil complet d'un créateur spécifique.
   */
  async show({ params, response }: HttpContext) {
    const profile = await CreatorProfile.query()
      .where('slug', params.slug)
      .where('status', 'active')
      .preload('user', (userQuery) => {
        userQuery.select(['id', 'name', 'plan'])
      })
      .firstOrFail()

    return response.ok(profile)
  }
}
