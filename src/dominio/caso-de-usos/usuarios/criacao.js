import i18n from '@/i18n/caso-de-uso.js'

export default (repositorio) => async ({ email, senha, nome }) => {
  const jaExiste = await repositorio.buscar({ where: email })
  if (jaExiste) return { erros: i18n().criacao.usuarioJaExiste }
  const out = await repositorio.criar({ email, senha, nome })
  if (out instanceof Error) return { erros: out.message }
  return { data: out }
}
