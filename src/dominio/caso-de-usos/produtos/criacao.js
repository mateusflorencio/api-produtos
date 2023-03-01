export default (repositorio) => async (produto) => {
  const out = await repositorio.criar(produto)
  if (out instanceof Error) return { erros: out.message }
  return { data: out }
}
