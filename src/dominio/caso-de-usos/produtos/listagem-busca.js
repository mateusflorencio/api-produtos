export default (db) => async (query) => {
  const queryMontada = handleQuery(query)
  const out = await db.buscaComFiltro(queryMontada)
  if (out instanceof Error) return { erros: out.message }
  return { data: out }
}

const handleQuery = (query) => {
  const { ord, dir, page, limit, field, search } = query
  const out = {}
  out.ord = ord ? ord.toLowerCase() : 'nome'
  out.dir = dir ? dir.toLowerCase() : 'asc'
  out.page = page ? parseInt(page) : 1
  out.limit = limit ? parseInt(limit) : 10
  if (field && search) {
    out.field = field.toLowerCase()
    out.search = search.toLowerCase()
  }
  return out
}