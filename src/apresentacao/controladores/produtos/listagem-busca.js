import { badRequest, ok, serverError } from '@/apresentacao/http'

export default (casoDeUsoBuscaFiltragemProdutos) => async ({ query: { ord, dir, page, limit, search } }) => {
  try {
    const res = await casoDeUsoBuscaFiltragemProdutos({ ord, dir, page, limit, search })
    if (res.erros) return badRequest(res.erros)
    return ok(res.data)
  } catch {
    return serverError()
  }
}