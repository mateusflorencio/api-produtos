export default (idioma = 'pt-br') => {
  const traducoes = {
    'pt-br': {
      validacao: {
        temCampo: 'Campo obrigatório',
        numeroPositivo: 'Número deve ser positivo'
      }
    }
  }
  return traducoes[idioma]
}
