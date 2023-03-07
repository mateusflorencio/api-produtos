import { badRequest, created } from '@/apresentacao/http.js'

export default (validar, sanitizar, casoDeUsoCriacaoUsuario) => async (body) => {
  const erros = validar(body)
  if (erros?.length > 0) return badRequest(erros)
  const usuario = sanitizar(body)
  const resultado = await casoDeUsoCriacaoUsuario(usuario)
  if (resultado?.erros) return badRequest(resultado.erros)
  return created(resultado.data)
}
