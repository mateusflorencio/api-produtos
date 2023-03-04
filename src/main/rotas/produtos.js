import adaptador from '@/main/adaptadores/express.js'
import criacao from '@/main/fabrica/apresentacao/controladores/produtos/criacao.js'
import listagemBusca from '@/main/fabrica/apresentacao/controladores/produtos/listagem-busca.js'

export default (router) => {
  router.post('/produto', adaptador(criacao()))
  router.get('/produto', adaptador(listagemBusca()))
}
