import criacao from '@/apresentacao/controladores/produtos/criacao.js'
import compose from '@/apresentacao/validacao/compose.js'
import numeroPositivo from '@/apresentacao/validacao/numero-positivo.js'
import temCampo from '@/apresentacao/validacao/tem-campo.js'
import sanitizacaoBuilder from '@/apresentacao/sanitizacao/builder.js'
import sanitizacaoCompose from '@/apresentacao/sanitizacao/compose.js'
import casoDeUso from '@/main/fabrica/dominio/casos-de-usos/produto/criacao.js'

export default () => {
  const validacao = compose([
    ...['nome', 'preco', 'descricao'].map(temCampo),
    numeroPositivo('preco')
  ])

  const sanitizacao = sanitizacaoCompose([
    sanitizacaoBuilder('nome').caixaBaixa().limpar().build(),
    sanitizacaoBuilder('descricao').caixaBaixa().limpar().build(),
    sanitizacaoBuilder('preco').toFloat().build()
  ])

  return criacao(validacao, sanitizacao, casoDeUso())
}
