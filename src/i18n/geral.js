export default (idioma = 'pt-br') => {
  const traducoes = {
    'pt-br': {
      server: {
        listen: `Servidor rodando na porta`
      }
    }
  }
  return traducoes[idioma]
}
