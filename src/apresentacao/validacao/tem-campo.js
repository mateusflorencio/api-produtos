import traducao from '@/i18n/validacao.js'

export default (campo) => (body) => {
  if (!body[campo]) return { campo, mensagem: traducao().validacao.temCampo }
}
