import { Router } from 'express'
import { readdirSync } from 'fs'
import { join, resolve } from 'path'

console.log(resolve())

export default (app) => {
  const router = Router()
  app.use('/api', router)

  const dir = join(resolve(), 'src', 'main', 'rotas')

  readdirSync(dir).map(async (file) => {
    if (file.endsWith('.js')) (await import(`../rotas/${file}`)).default(router)
  })
}
