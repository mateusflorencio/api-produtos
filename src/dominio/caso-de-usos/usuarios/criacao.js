import i18n from '@/i18n/caso-de-uso.js'
import nivelUsuarioModelo from '@/dominio/modelos/nivel-usuario.js'

export default (encrypt, repositorio, cache) => async ({ email, senha, nome, nivelUsuario = nivelUsuarioModelo.cliente }) => {
  const jaExiste = await repositorio.buscar({ where: email })
  if (jaExiste) return { erros: i18n().criacao.usuarioJaExiste }
  const senhaCriptografada = await encrypt(senha)
  const criado = await repositorio.criar({ email, senha: senhaCriptografada, nome, nivel: nivelUsuarioModelo[nivelUsuario] })
  await cache.set(email, criado)
  if (criado instanceof Error) return { erros: criado.message }
  return { data: i18n().criacao.usuarioCriado }
}
