import { defineConfig } from '@adonisjs/core/app'

export const appKey = process.env.APP_KEY || 'verysecureappkeyverysecureappkey'

export const http = defineConfig({
  generateRequestId: true,
  allowMethodSpoofing: false,
  useAsyncLocalStorage: false,
  cookie: {
    domain: '',
    path: '/',
    maxAge: '2h',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
  trustProxy: () => true,
})
