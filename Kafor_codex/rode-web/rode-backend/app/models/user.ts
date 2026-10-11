import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, beforeSave } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import hash from '@adonisjs/core/services/hash'
import CreatorProfile from './creator_profile.js'

export default class User extends BaseModel {
  /**
   * Provider de tokens JWT pour l'auth API.
   * Requis par AdonisJS auth pour générer les tokens.
   */
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'rode_',
    table: 'auth_access_tokens',
    type: 'auth_token',
  })
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null }) // Ne jamais renvoyer le mot de passe dans les réponses API
  declare password: string

  @column()
  declare role: 'user' | 'admin'

  @column()
  declare plan: 'free' | 'premium_standard' | 'premium_elite'

  @column()
  declare lemonSqueezyCustomerId: string | null

  // === Relations ===
  @hasOne(() => CreatorProfile)
  declare profile: HasOne<typeof CreatorProfile>

  // === Hooks ===
  /**
   * Hachage automatique du mot de passe avant chaque sauvegarde.
   * Fonctionne pour l'inscription ET le changement de mot de passe.
   */
  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // === Helpers ===
  get isPremium(): boolean {
    return this.plan === 'premium_standard' || this.plan === 'premium_elite'
  }

  get isElite(): boolean {
    return this.plan === 'premium_elite'
  }

  get isAdmin(): boolean {
    return this.role === 'admin'
  }
}
