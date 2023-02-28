import { badRequest, created } from '@/apresentacao/http.js'

export default (validacao, sanitizacao, casoDeUsoCriacaoProduto) => async (body) => {
  const erros = validacao.validar(body)
  if (erros.length > 0) return badRequest(erros)
  const produto = sanitizacao.sanitizar(body)
  const resultado = await casoDeUsoCriacaoProduto.executar(produto)
  if (resultado.erros) return badRequest(resultado.erros)
  return created(resultado.data)
}
