export default (single) => ({
  criar: async (produto) => {
    const data = await single.produtos.create({
      data: produto
    })
    return data
  }
})
