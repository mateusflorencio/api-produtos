import log from 'customLog'

process.on('unhandledRejection', (err) => {
  log.error('🛑 Rejeição não tratada', err)
})

process.on('uncaughtException', (err) => {
  log.error('🛑 Erro não tratado', err)
})
