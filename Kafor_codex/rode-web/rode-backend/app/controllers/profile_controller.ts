import type { HttpContext } from '@adonisjs/core/http'
import CreatorProfile from '#models/creator_profile'

export default class ProfileController {
  /**
   * GET /api/v1/profile
   * Retourne le dashboard complet du créateur connecté.
   */
  async show({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const profile = await CreatorProfile.query()
      .where('user_id', user.id)
      .preload('user')
      .firstOrFail()

    return response.ok({ profile, plan: user.plan })
  }

  /**
   * PUT /api/v1/profile
   * Met à jour les informations de base du profil (bio, localisation, lien externe).
   */
  async update({ auth, request, response }: HttpContext) {
    const user = await auth.authenticate()
    const profile = await CreatorProfile.findByOrFail('user_id', user.id)

    const data = request.only(['displayName', 'bio', 'discipline', 'country', 'city', 'externalLink', 'avatarUrl', 'coverUrl', 'affiliateLink'])
    profile.merge(data)
    await profile.save()

    return response.ok(profile)
  }

  /**
   * PUT /api/v1/profile/portfolio
   * Met à jour le portfolio (embeds, expériences, CTA) - Réservé aux membres Premium.
   */
  async updatePortfolio({ auth, request, response }: HttpContext) {
    const user = await auth.authenticate()

    // Vérification du plan Premium
    if (!user.isPremium) {
      return response.forbidden({
        message: 'Cette fonctionnalité est réservée aux membres Premium.',
        upgrade_url: `${process.env.LEMON_SQUEEZY_CHECKOUT_URL}`,
      })
    }

    const profile = await CreatorProfile.findByOrFail('user_id', user.id)
    const { portfolioEmbeds, experiences, ctaLinks } = request.only(['portfolioEmbeds', 'experiences', 'ctaLinks'])

    profile.merge({ portfolioEmbeds, experiences, ctaLinks })
    await profile.save()

    return response.ok(profile)
  }
}
