import type { HttpContext } from '@adonisjs/core/http'
import CreatorProfile from '#models/creator_profile'

/**
 * Admin/CreatorsController
 * Gestion de la curation des profils créateurs par l'équipe RØDE.
 * Toutes ces routes sont protégées par middleware.auth() + middleware.admin()
 */
export default class CreatorsController {
  /**
   * PATCH /api/v1/admin/creators/:id/validate
   * Approuve un profil créateur (le fait passer de 'pending' à 'active').
   */
  async validate({ params, response }: HttpContext) {
    const profile = await CreatorProfile.findOrFail(params.id)

    if (profile.status === 'banned') {
      return response.badRequest({ message: 'Impossible de valider un profil banni.' })
    }

    profile.status = 'active'
    await profile.save()

    return response.ok({
      message: `Le profil "${profile.displayName}" est maintenant actif sur l'Annuaire RØDE.`,
      profile,
    })
  }

  /**
   * PATCH /api/v1/admin/creators/:id/ban
   * Bannit un profil créateur (le retire de l'Annuaire public).
   */
  async ban({ params, request, response }: HttpContext) {
    const profile = await CreatorProfile.findOrFail(params.id)
    const { reason } = request.only(['reason'])

    profile.status = 'banned'
    await profile.save()

    // TODO: Envoyer une notification email au créateur avec la raison du bannissement.
    console.log(`[Admin] Profil banni: ${profile.displayName} - Raison: ${reason}`)

    return response.ok({
      message: `Le profil "${profile.displayName}" a été banni de l'Annuaire.`,
    })
  }
}
