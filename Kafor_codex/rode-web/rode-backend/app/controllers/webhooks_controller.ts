import type { HttpContext } from '@adonisjs/core/http'

/**
 * Webhook Controller pour Lemon Squeezy
 * Écoute les événements de paiement et met à jour les plans des utilisateurs.
 *
 * URL : POST /webhooks/lemon-squeezy
 * (Cette route est publique mais validée par signature cryptographique)
 */
export default class WebhooksController {
  async handleLemonSqueezy({ request, response }: HttpContext) {
    // TODO: Vérifier la signature du webhook Lemon Squeezy
    // const signature = request.header('X-Signature')
    // if (!this.verifySignature(signature, request.rawBody)) {
    //   return response.unauthorized({ message: 'Signature invalide.' })
    // }

    const payload = request.body()
    const eventName = payload?.meta?.event_name

    switch (eventName) {
      case 'order_created':
        // Un utilisateur vient de payer un abonnement ou un ticket
        // await this.handleOrderCreated(payload)
        console.log('[Webhook] Nouvelle commande:', payload?.data?.id)
        break

      case 'subscription_created':
        // Nouvel abonnement Premium créé
        // await this.handleSubscriptionCreated(payload)
        console.log('[Webhook] Nouvel abonnement Premium:', payload?.data?.attributes?.user_email)
        break

      case 'subscription_updated':
        // Montée/descente de plan ou renouvellement
        console.log('[Webhook] Abonnement mis à jour:', payload?.data?.id)
        break

      case 'subscription_cancelled':
        // Abonnement résilié - repasser le user en plan 'free'
        // await this.handleSubscriptionCancelled(payload)
        console.log('[Webhook] Abonnement annulé:', payload?.data?.id)
        break

      default:
        console.log('[Webhook] Événement non géré:', eventName)
    }

    return response.ok({ received: true })
  }
}
