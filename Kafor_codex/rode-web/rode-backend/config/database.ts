import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: process.env.DB_CONNECTION || 'mysql',
  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST || 'rode-db',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'rode_user',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'rode_dev',
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
