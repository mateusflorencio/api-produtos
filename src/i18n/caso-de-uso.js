export default (idioma = 'pt-br') => {
  const traducoes = {
    'pt-br': {
      criacao: {
        usuarioJaExiste: 'Usuário já existe'
      }
    }
  }
  return traducoes[idioma]
}
