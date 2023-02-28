export default (campo) => (body) => {
  const valor = body[campo]
  body[campo] = valor.trim()
  return body
}
