export default (controlador) => async (req, res) => {
  const out = await controlador(req)
  res.status(out.statusCode).json(out.body)
}
