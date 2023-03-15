import i18n from '@/i18n/caso-de-uso.js'

export default (cache, repositorioUsuario, compareSenha, gerarToken) => async ({ email, senha }) => {
  const outChache = cache.get(email)
  if (outChache) {
    const senhaEstaCorreta = compareSenha(senha, outChache.senha)
    if (!senhaEstaCorreta) return { erro: i18n().autenticacao.dadosInvalidos }
    return { token: gerarToken(outChache) }
  }
  const usuario = await repositorioUsuario.buscar('email', email)
  if (!usuario) return { erro: i18n().autenticacao.dadosInvalidos }
  const senhaEstaCorreta = compareSenha(senha, usuario.senha)
  if (!senhaEstaCorreta) return { erro: i18n().autenticacao.dadosInvalidos }
  return { data: { token: gerarToken(usuario) } }
}
