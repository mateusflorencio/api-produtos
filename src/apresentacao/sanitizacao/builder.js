export default (campo) => {
  const sanitizacoes = []
  const builder = {
    limpar: () => {
      sanitizacoes.push((body) => body[campo].trim())
      return builder
    },
    removerCaracteresEspeciais: () => {
      sanitizacoes.push((body) => body[campo].replace(/[^a-zA-Z0-9 ]/g, ''))
      return builder
    },
    caixaBaixa: () => {
      sanitizacoes.push((body) => body[campo].toLowerCase())
      return builder
    },
    toFloat: () => {
      sanitizacoes.push((body) => parseFloat(body[campo]))
      return builder
    },
    build: () => {
      return (body) => {
        sanitizacoes.forEach((sanitizacao) => {
          body[campo] = sanitizacao(body)
        })
        return body
      }
    }
  }
  return builder
}
