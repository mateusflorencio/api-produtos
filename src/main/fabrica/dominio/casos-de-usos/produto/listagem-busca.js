import listagemBusca from '@/dominio/caso-de-usos/produtos/listagem-busca.js'
import { repoMongo } from '@/main/fabrica/externo/repositorio/mongo/produto.js'

export default () => listagemBusca(repoMongo())
