import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tickets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('event_id').unsigned().references('id').inTable('events').onDelete('CASCADE')
      table.string('qr_code').unique().notNullable() // Code unique pour le QR code
      table.decimal('amount_paid', 10, 2).notNullable()
      table.enum('status', ['active', 'used', 'cancelled']).defaultTo('active')
      table.string('lemon_squeezy_order_id').nullable() // Référence de paiement
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
