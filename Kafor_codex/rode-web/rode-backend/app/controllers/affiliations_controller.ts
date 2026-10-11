import type { HttpContext } from '@adonisjs/core/http'
import CreatorProfile from '#models/creator_profile'

/**
 * AffiliationsController
 * Gère les liens d'affiliation du créateur connecté (Option A du modèle RØDE).
 * Le créateur peut sauvegarder son lien affilié externe ici.
 */
export default class AffiliationsController {
  /**
   * GET /api/v1/affiliations
   * Lit le lien d'affiliation actuel du créateur connecté.
   */
  async index({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const profile = await CreatorProfile.findByOrFail('user_id', user.id)

    return response.ok({
      affiliate_link: profile.affiliateLink,
      instructions: profile.affiliateLink
        ? 'Votre lien affilié est actif. Il sera affiché sur votre profil public.'
        : "Aucun lien affilié configuré. Ajoutez votre lien Asos, Amazon ou autre programme d'affiliation.",
    })
  }

  /**
   * POST /api/v1/affiliations
   * Enregistre ou met à jour le lien d'affiliation du créateur.
   */
  async store({ auth, request, response }: HttpContext) {
    const user = await auth.authenticate()

    // Seuls les membres Premium peuvent activer le module affiliation
    if (!user.isPremium) {
      return response.forbidden({
        message: "L'affiliation est réservée aux membres Premium.",
        upgrade_url: process.env.LEMON_SQUEEZY_CHECKOUT_URL,
      })
    }

    const { affiliateLink } = request.only(['affiliateLink'])

    // Validation basique de l'URL
    try {
      new URL(affiliateLink)
    } catch {
      return response.unprocessableEntity({ message: "L'URL fournie n'est pas valide." })
    }

    const profile = await CreatorProfile.findByOrFail('user_id', user.id)
    profile.affiliateLink = affiliateLink
    await profile.save()

    return response.ok({
      message: 'Lien affilié mis à jour avec succès.',
      affiliate_link: profile.affiliateLink,
    })
  }

  /**
   * DELETE /api/v1/affiliations/:id
   * Supprime le lien d'affiliation du créateur.
   */
  async destroy({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const profile = await CreatorProfile.findByOrFail('user_id', user.id)
    profile.affiliateLink = null
    await profile.save()

    return response.ok({ message: 'Lien affilié supprimé.' })
  }
}
