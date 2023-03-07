import criacao from '@/dominio/caso-de-usos/produtos/criacao.js'
import { repoMongo } from '@/main/fabrica/externo/repositorio/mongo/produto.js'

export default () => criacao(repoMongo())
