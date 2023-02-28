export default (idioma = 'pt-br') => {
  const traducoes = {
    'pt-br': {
      validacao: {
        temCampo: 'Campo obrigatório'
      }
    }
  }
  return traducoes[idioma]
}
