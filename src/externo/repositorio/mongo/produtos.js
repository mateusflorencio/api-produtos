export default (single) => ({
  criar: async (produto) => {
    const data = await single.produtos.create({ produto })
    return data
  },
  buscaComFiltro: async ({ ord, dir, page, limit, field, search }) => {
    const filtros = field && search ? { [field]: { $regex: search, $options: 'i' } } : {}
    const sort = { [ord]: dir === 'asc' ? 1 : -1 }
    const skip = (page - 1) * limit
    const fields = { _id: 0, __v: 0 }
    const data = await single.produtos.find(filtros, fields).sort(sort).skip(skip).limit(limit)
    return data
  }
})
