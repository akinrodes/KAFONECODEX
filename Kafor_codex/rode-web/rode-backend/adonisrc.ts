import { defineConfig } from '@adonisjs/core/app'
import { targets } from '@adonisjs/core/logger'

console.log('--- LOADING ADONISRC ---')

export default defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Providers
  |--------------------------------------------------------------------------
  | Les providers chargent les services de l'application au démarrage.
  */
  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('@adonisjs/core/providers/hash_provider'),
    () => import('@adonisjs/lucid/database_provider'),
    () => import('@adonisjs/auth/auth_provider'),
  ],

  commands: [
    () => import('@adonisjs/core/commands'),
    () => import('@adonisjs/lucid/commands'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Aliases (Path Imports)
  |--------------------------------------------------------------------------
  | Ces alias permettent d'utiliser #controllers, #models, #middleware
  | partout dans le code sans chemins relatifs complexes.
  */
  aliases: {
    '#controllers': './app/controllers',
    '#middleware': './app/middleware',
    '#models': './app/models',
    '#config': './config',
  },

  /*
  |--------------------------------------------------------------------------
  | Fichiers à pré-charger au démarrage
  |--------------------------------------------------------------------------
  */
  preloads: [
    () => import('./start/kernel.js'),
    () => import('./start/routes.js'),
  ],

})
