export default (single) => ({
  criar: async (produto) => {
    const data = await single.produtos.create(produto)
    return map(data)
  },
  buscaComFiltro: async ({ ord, dir, page, limit, field, search }) => {
    const filtros = field && search ? { [field]: { $regex: search, $options: 'i' } } : {}
    const sort = { [ord]: dir === 'asc' ? 1 : -1 }
    const skip = (page - 1) * limit
    const fields = { __v: 0 }
    const data = await single.produtos.find(filtros, fields).sort(sort).skip(skip).limit(limit)
    return map(data)
  }
})

const map = (data) => {
  if (!data) return null
  if (Array.isArray(data)) return data.map(map)
  return {
    id: data._id,
    nome: data.nome,
    preco: data.preco,
    descricao: data.descricao
  }
}
