/*
|--------------------------------------------------------------------------
| Ace command line
|--------------------------------------------------------------------------
|
| The ace command line is used to run ace commands
|
*/

import 'reflect-metadata'
import { Ignitor } from '@adonisjs/core'

const ignitor = new Ignitor(new URL('./', import.meta.url), {
  importer: (filePath) => import(filePath),
})

await ignitor.ace().handle(process.argv.splice(2))
