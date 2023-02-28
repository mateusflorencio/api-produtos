export default (validacoes) => (body) => {
  const erros = validacoes.map((validacao) => validacao(body)).filter((erro) => erro)
  return erros.length ? erros : undefined
}
