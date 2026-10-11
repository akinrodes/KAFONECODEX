import type { HttpContext } from '@adonisjs/core/http'
import Event from '#models/event'

/**
 * Admin/EventsController
 * Gestion des événements partenaires soumis par des organisateurs externes.
 * Toutes ces routes sont protégées par middleware.auth() + middleware.admin()
 */
export default class EventsController {
  /**
   * GET /api/v1/admin/events
   * Liste tous les événements (y compris ceux en attente de validation).
   */
  async index({ request, response }: HttpContext) {
    const { status, page = 1, limit = 30 } = request.qs()
    const query = Event.query().preload('organizer', (q) => q.select(['id', 'name', 'email']))

    if (status) {
      query.where('status', status)
    }

    const events = await query.orderBy('created_at', 'desc').paginate(page, limit)
    return response.ok(events)
  }

  /**
   * POST /api/v1/admin/events
   * Crée un événement officiel RØDE directement par un admin.
   */
  async store({ request, response, auth }: HttpContext) {
    const admin = await auth.authenticate()
    const data = request.only([
      'title', 'description', 'type', 'location', 'country',
      'eventDate', 'price', 'premiumPrice', 'capacity',
      'coverUrl', 'flyerUrl', 'sponsoringPack',
    ])

    const event = await Event.create({
      ...data,
      type: 'rode_official',
      status: 'approved', // Les événements admins sont auto-approuvés
      organizerId: admin.id,
    })

    return response.created(event)
  }

  /**
   * PATCH /api/v1/admin/events/:id/approve
   * Approuve un événement partenaire soumis (le rend visible sur le Hub).
   */
  async approve({ params, response }: HttpContext) {
    const event = await Event.findOrFail(params.id)
    event.status = 'approved'
    await event.save()

    // TODO: Envoyer un email de confirmation à l'organisateur.

    return response.ok({
      message: `L'événement "${event.title}" est maintenant visible sur le Hub RØDE.`,
      event,
    })
  }

  /**
   * DELETE /api/v1/admin/events/:id
   * Supprime un événement (refus ou annulation).
   */
  async destroy({ params, response }: HttpContext) {
    const event = await Event.findOrFail(params.id)
    await event.delete()
    return response.ok({ message: 'Événement supprimé.' })
  }
}
