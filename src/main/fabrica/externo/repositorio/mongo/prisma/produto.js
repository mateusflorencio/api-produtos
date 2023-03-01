import produtos from '@/externo/repositorio/mongo/prisma/produtos.js'
import single from './single.js'

export const repoCriacao = () => produtos(single())
