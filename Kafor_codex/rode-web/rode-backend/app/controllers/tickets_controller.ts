import type { HttpContext } from '@adonisjs/core/http'
import Ticket from '#models/ticket'
import Event from '#models/event'
import { randomBytes } from 'node:crypto'

/**
 * TicketsController
 * Gère l'achat de billets pour les événements RØDE et partenaires.
 */
export default class TicketsController {
  /**
   * GET /api/v1/tickets
   * Liste tous les tickets de l'utilisateur connecté.
   */
  async index({ auth, response }: HttpContext) {
    const user = await auth.authenticate()

    const tickets = await Ticket.query()
      .where('user_id', user.id)
      .preload('event', (q) =>
        q.select(['id', 'title', 'event_date', 'location', 'cover_url'])
      )
      .orderBy('created_at', 'desc')

    return response.ok(tickets)
  }

  /**
   * POST /api/v1/events/:id/checkout
   * Démarre l'achat d'un billet pour un événement.
   * Calcule automatiquement le prix en fonction du plan de l'utilisateur.
   */
  async checkout({ auth, params, response }: HttpContext) {
    const user = await auth.authenticate()
    const event = await Event.findOrFail(params.id)

    if (event.status !== 'approved') {
      return response.badRequest({ message: "Cet événement n'est pas disponible." })
    }

    // Vérifier si l'utilisateur a déjà un ticket pour cet événement
    const alreadyBooked = await Ticket.query()
      .where('user_id', user.id)
      .where('event_id', event.id)
      .where('status', 'active')
      .first()

    if (alreadyBooked) {
      return response.conflict({ message: 'Vous avez déjà un ticket pour cet événement.' })
    }

    // Calcul du prix avec réduction Premium automatique
    let finalPrice = event.price
    if (user.isPremium && event.premiumPrice !== null) {
      finalPrice = event.premiumPrice
    }

    // Si l'événement est gratuit ou si l'utilisateur Élite a accès VIP gratuit aux RØDEXPARTY
    const isFreeForElite = user.isElite && event.type === 'rode_official' && event.price > 0
    if (finalPrice === 0 || isFreeForElite) {
      // Création directe du ticket sans passer par Lemon Squeezy
      const qrCode = randomBytes(16).toString('hex')
      const ticket = await Ticket.create({
        userId: user.id,
        eventId: event.id,
        qrCode,
        amountPaid: 0,
        status: 'active',
      })

      return response.created({
        message: 'Ticket créé gratuitement. Bon événement !',
        ticket,
        qr_code_url: `https://rode.io/qr/${qrCode}`,
      })
    }

    // Pour les tickets payants → rediriger vers Lemon Squeezy
    // TODO: Générer le lien de checkout Lemon Squeezy avec les métadonnées (user_id, event_id)
    const checkoutUrl = `${process.env.LEMON_SQUEEZY_CHECKOUT_URL}?checkout[custom][event_id]=${event.id}&checkout[custom][user_id]=${user.id}&checkout[email]=${user.email}`

    return response.ok({
      message: 'Redirigez vers Lemon Squeezy pour finaliser le paiement.',
      checkout_url: checkoutUrl,
      price: finalPrice,
    })
  }
}
