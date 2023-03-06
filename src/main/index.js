import '@/main/config/env.js'
import '@/main/config/grafullshutdown.js'
import app from '@/main/config/server.js'
import single from '@/externo/repositorio/mongo/single.js'

single.connect()
app()
