import { defineConfig, targets } from '@adonisjs/core/logger'

export default defineConfig({
  default: 'app',
  loggers: {
    app: {
      enabled: true,
      name: 'rode-backend',
    },
  },
})
