import { badRequest, ok, serverError } from '@/apresentacao/http'

export default (casoDeUsoBuscaFiltragemProdutos) => async ({ query }) => {
  try {
    const res = await casoDeUsoBuscaFiltragemProdutos(query)
    if (res.erros) return badRequest(res.erros)
    return ok(res.data)
  } catch {
    return serverError()
  }
}