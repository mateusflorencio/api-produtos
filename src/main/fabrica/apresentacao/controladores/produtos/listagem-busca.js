import listagemBusca from '@/apresentacao/controladores/produtos/listagem-busca.js'
import casoDeUsoListaBusca from '@/main/fabrica/dominio/casos-de-usos/produto/listagem-busca.js'

export default () => listagemBusca(casoDeUsoListaBusca())