import mongoose from 'mongoose'
import env from '@/main/config/env.js'

const connect = async (url) => await mongoose.connect(env.databaseUrl || url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const disconnect = async () => await mongoose.disconnect()

connect().then(() => {
  console.log('Conectado ao Mongo')
})

const schema = new mongoose.Schema({
  preco: Number,
  nome: String,
  descricao: String
})

//ciar index

schema.index({ nome: 'text' })
schema.index({ descricao: 'text' })

// cria o model
const produtos = mongoose.model('Produto', schema)
export default {
  produtos,
  connect,
  disconnect
}


