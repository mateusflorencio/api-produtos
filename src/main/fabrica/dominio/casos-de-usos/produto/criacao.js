import criacao from '@/dominio/caso-de-usos/produtos/criacao.js'
import { repoCriacao } from '@/main/fabrica/externo/repositorio/mongo/prisma/produto.js'

export default () => criacao(repoCriacao())
