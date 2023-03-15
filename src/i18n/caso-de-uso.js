export default (idioma = 'pt-br') => {
  const traducoes = {
    'pt-br': {
      criacao: {
        usuarioJaExiste: 'Usuário já existe',
        usuarioCriado: 'Usuário criado'
      },
      autenticacao: {
        dadosInvalidos: 'Dados inválidos'
      }
    }
  }
  return traducoes[idioma]
}
