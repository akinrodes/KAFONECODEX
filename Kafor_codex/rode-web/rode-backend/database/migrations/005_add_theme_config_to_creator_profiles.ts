import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'creator_profiles'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Stockage léger des préférences de design Premium
      // ex: { primaryColor: '#E50914', backgroundColor: '#0a0a0a', layoutStyle: 'centered' }
      table.json('theme_config').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('theme_config')
    })
  }
}
