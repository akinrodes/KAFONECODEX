import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description').nullable()
      table.enum('type', ['rode_official', 'partner']).defaultTo('partner')
      table.enum('status', ['pending', 'approved', 'cancelled']).defaultTo('pending')
      // Localisation & Date
      table.string('location').nullable()
      table.string('country').nullable()
      table.dateTime('event_date').nullable()
      // Tarification
      table.decimal('price', 10, 2).defaultTo(0) // 0 = gratuit
      table.decimal('premium_price', 10, 2).nullable() // Prix réduit pour membres Premium
      table.integer('capacity').nullable()
      // Visuel & Médias
      table.string('cover_url').nullable()
      table.string('flyer_url').nullable()
      // Sponsoring (Pack Hero Banner)
      table.enum('sponsoring_pack', ['none', 'standard', 'hero_banner', 'push']).defaultTo('none')
      // Créateur ou Orga qui a soumis l'événement
      table.integer('organizer_id').unsigned().references('id').inTable('users').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
