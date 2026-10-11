import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class CreatorProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare slug: string // URL publique: /creators/raul-catalan

  @column()
  declare displayName: string

  @column()
  declare status: 'pending' | 'active' | 'banned'

  // --- Infos de base (Tier Gratuit) ---
  @column()
  declare discipline: string | null // Mode, Photographie, Musique...

  @column()
  declare country: string | null

  @column()
  declare city: string | null

  @column()
  declare externalLink: string | null // Instagram, Linktree...

  // --- Portfolio (Tier Premium) ---
  @column()
  declare bio: string | null

  @column()
  declare portfolioEmbeds: Array<{ type: 'youtube' | 'tiktok' | 'instagram'; url: string }> | null

  @column()
  declare experiences: Array<{ title: string; year: number; company?: string }> | null

  @column()
  declare ctaLinks: Array<{ label: string; url: string }> | null

  // --- Affiliation ---
  @column()
  declare affiliateLink: string | null // Lien affilié externe (Option A)

  // --- Visuels ---
  @column()
  declare avatarUrl: string | null

  @column()
  declare coverUrl: string | null

  // --- Personnalisation Premium (Design d'intérieur digital) ---
  @column()
  declare themeConfig: {
    primaryColor?: string
    backgroundColor?: string
    layoutStyle?: 'default' | 'centered' | 'minimal'
  } | null

  // === Relations ===
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
