import express from 'express'
import cors from 'cors'

import geral from '@/i18n/geral.js'
import env from './env.js'
import configRotas from './rotas.js'

const app = express()

app.use(cors())
app.use(express.json())
configRotas(app)

export default (port) => {
  app.listen(port || env.port, () => console.info(geral().server.listen, port || env.port))
  return app
}
