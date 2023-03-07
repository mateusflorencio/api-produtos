import mongoose from 'mongoose'
import env from '@/main/config/env.js'
import log from 'customLog'

const connect = () => {
  mongoose.connect(env.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    log.info('MongoDB connected')
  }).catch((err) => {
    log.error(err)
  })
}

const disconnect = async () => await mongoose.disconnect()

const schema = new mongoose.Schema({
  preco: Number,
  nome: String,
  descricao: String
})

schema.index({ nome: 'text' })
schema.index({ descricao: 'text' })

const produtos = mongoose.model('Produto', schema)
export default {
  produtos,
  connect,
  disconnect
}
