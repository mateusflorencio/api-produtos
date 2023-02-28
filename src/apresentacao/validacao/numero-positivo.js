import traducao from '@/i18n/validacao.js'

export default (campo) => (body) => body[campo] <= 0 ? { campo, mensagem: traducao().validacao.numeroPositivo } : undefined

