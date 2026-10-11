/*
|--------------------------------------------------------------------------
| HTTP server entrypoint
|--------------------------------------------------------------------------
|
| The entrypoint for the HTTP server. You can create your own custom server
| or use the bundled server.
|
*/

import 'reflect-metadata'
import { Ignitor } from '@adonisjs/core'

const ignitor = new Ignitor(new URL('../', import.meta.url), {
  importer: (filePath) => import(filePath),
})

export default ignitor
  .httpServer()
  .start()
