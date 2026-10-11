import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'creator_profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('slug').unique().notNullable() // URL publique ex: /creators/raul-catalan
      table.string('display_name').notNullable()
      table.enum('status', ['pending', 'active', 'banned']).defaultTo('pending')
      // Infos de base (Tier Gratuit)
      table.string('discipline').nullable() // Mode, Photographie, Musique...
      table.string('country').nullable()
      table.string('city').nullable()
      table.string('external_link').nullable() // Instagram, Linktree...
      // Infos Portfolio (Tier Premium)
      table.text('bio').nullable()
      table.json('portfolio_embeds').nullable() // [{type: 'youtube', url: '...'}]
      table.json('experiences').nullable() // [{title: 'Défilé Paris', year: 2024}]
      table.json('cta_links').nullable() // [{label: 'Ma boutique', url: '...'}]
      // Affiliation
      table.string('affiliate_link').nullable() // Lien d'affiliation externe (Option A)
      // SEO
      table.string('avatar_url').nullable()
      table.string('cover_url').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
