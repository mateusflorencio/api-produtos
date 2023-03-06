import { badRequest, ok } from '@/apresentacao/http.js'

export default (casoDeUsoBuscaFiltragemProdutos) => async ({ query }) => {
  const res = await casoDeUsoBuscaFiltragemProdutos(query)
  if (res.erros) return badRequest(res.erros)
  return ok(res.data)
}
