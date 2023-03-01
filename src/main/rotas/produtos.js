import adaptador from '@/main/adaptadores/express.js'
import criacao from '@/main/fabrica/apresentacao/controladores/produtos/criacao.js'

export default (router) => {
  router.post('/produto', adaptador(criacao()))
}
