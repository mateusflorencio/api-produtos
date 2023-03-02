import produtos from '@/externo/repositorio/mongo/produtos.js'
import single from './single.js'

export const repoCriacao = () => produtos(single())
