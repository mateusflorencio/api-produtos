import { ok, serverError } from '@/apresentacao/http'

export default (casoDeUsoBuscaFiltragemProdutos) => async ({ query: { ord, dir, page, limit, search } }) => {
  try {
    const res = await casoDeUsoBuscaFiltragemProdutos({ ord, dir, page, limit, search })
    return ok(res)
  } catch {
    return serverError()
  }
}