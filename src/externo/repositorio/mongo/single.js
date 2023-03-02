import mongoose from 'mongoose'
import env from '@/main/config/env.js'

const connect = async () => await mongoose.connect(env.databaseUrl, {
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
// cria o model
const produtos = mongoose.model('Produto', schema)
export default {
  produtos,
  connect,
  disconnect
}


