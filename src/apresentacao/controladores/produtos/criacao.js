import { badRequest, created, serverError } from '@/apresentacao/http.js'

export default (validar, sanitizar, casoDeUsoCriacaoProduto) => async (body) => {
  try {
    const erros = validar(body)
    if (erros.length > 0) return badRequest(erros)
    const produto = sanitizar(body)
    const resultado = await casoDeUsoCriacaoProduto(produto)
    if (resultado.erros) return badRequest(resultado.erros)
    return created(resultado.data)
  } catch {
    return serverError()
  }
}
