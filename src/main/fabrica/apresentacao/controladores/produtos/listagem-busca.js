import listagemBusca from '@/apresentacao/controladores/produtos/listagem-busca.js'
import casoDeUsoListaBusca from '@/main/fabrica/dominio/casos-de-usos/produto/listagem-busca.js'
import controlador from '@/main/fabrica/apresentacao/controladores/controlador.js'

export default () => controlador(listagemBusca(casoDeUsoListaBusca()))
