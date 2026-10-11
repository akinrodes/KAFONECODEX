import type { HttpContext } from '@adonisjs/core/http'
import Event from '#models/event'

export default class EventsController {
  /**
   * GET /api/v1/events
   * Liste les événements approuvés avec filtres et pagination.
   * Les événements avec pack "hero_banner" ou "push" apparaissent en premier.
   */
  async index({ request, response }: HttpContext) {
    const { type, country, page = 1, limit = 20 } = request.qs()

    const query = Event.query()
      .where('status', 'approved')
      .preload('organizer', (q) => q.select(['id', 'name']))

    if (type) {
      query.where('type', type) // 'rode_official' ou 'partner'
    }
    if (country) {
      query.where('country', country)
    }

    // Boost algorithmique : les événements sponsorisés d'abord (type Netflix)
    query.orderByRaw(`
      CASE
        WHEN sponsoring_pack = 'push'        THEN 1
        WHEN sponsoring_pack = 'hero_banner' THEN 2
        WHEN sponsoring_pack = 'standard'    THEN 3
        ELSE 4
      END
    `).orderBy('event_date', 'asc')

    const events = await query.paginate(page, limit)
    return response.ok(events)
  }

  /**
   * GET /api/v1/events/:id
   * Détail complet d'un événement.
   */
  async show({ params, response }: HttpContext) {
    const event = await Event.query()
      .where('id', params.id)
      .where('status', 'approved')
      .preload('organizer', (q) => q.select(['id', 'name']))
      .firstOrFail()

    return response.ok(event)
  }
}
