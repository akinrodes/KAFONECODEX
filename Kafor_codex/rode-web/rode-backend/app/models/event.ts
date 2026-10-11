import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare type: 'rode_official' | 'partner'

  @column()
  declare status: 'pending' | 'approved' | 'cancelled'

  // Localisation & Date
  @column()
  declare location: string | null

  @column()
  declare country: string | null

  @column.dateTime()
  declare eventDate: DateTime | null

  // Tarification
  @column()
  declare price: number

  @column()
  declare premiumPrice: number | null

  @column()
  declare capacity: number | null

  // Visuels
  @column()
  declare coverUrl: string | null

  @column()
  declare flyerUrl: string | null

  // Sponsoring
  @column()
  declare sponsoringPack: 'none' | 'standard' | 'hero_banner' | 'push'

  @column()
  declare organizerId: number | null

  // === Relations ===
  @belongsTo(() => User, { foreignKey: 'organizerId' })
  declare organizer: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
