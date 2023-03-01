export default (arrayBuilders) => (body) => {
  arrayBuilders.forEach((sanitizacao) => {
    const res = sanitizacao(body)
    body = { ...body, ...res }
  })
  return body
}
