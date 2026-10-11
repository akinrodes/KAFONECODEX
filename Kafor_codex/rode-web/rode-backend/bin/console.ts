/*
|--------------------------------------------------------------------------
| Console entrypoint
|--------------------------------------------------------------------------
|
| The entrypoint for the console commands.
|
*/

import 'reflect-metadata'
import { Ignitor } from '@adonisjs/core'

const ignitor = new Ignitor(new URL('../', import.meta.url), {
  importer: (filePath) => import(filePath),
})

export default ignitor
  .ace()
  .handle(process.argv.splice(2))
