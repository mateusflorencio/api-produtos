import { badRequest, ok } from '@/apresentacao/http.js'

export default (validar, sanitizar, casoDeUsoAutenticarUsuario) => async (body) => {
  const erros = validar(body)
  if (erros?.length > 0) return badRequest(erros)
  const { email, senha } = sanitizar(body)
  const resultado = await casoDeUsoAutenticarUsuario({ email, senha })
  if (resultado?.erros) return badRequest(resultado.erros)
  return ok(resultado.data)
}
