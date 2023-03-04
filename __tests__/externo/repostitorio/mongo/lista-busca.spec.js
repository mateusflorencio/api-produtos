import single from '@/externo/repositorio/mongo/single.js'
import produtos from '@/externo/repositorio/mongo/produtos.js'

describe('Repositório de Lista e Busca de Produtos', () => {
  let sut

  beforeAll(async () => {
    await single.connect('mongodb://root:secret@localhost:27017/admin')
    await single.produtos.insertMany([
      { nome: 'Produto 1', preco: 10, descricao: 'teste' },
      { nome: 'Produto 2', preco: 20, descricao: 'teste' },
      { nome: 'Produto 3', preco: 30, descricao: 'teste' },
      { nome: 'Produto 4', preco: 40, descricao: 'teste' }
    ])
  })

  beforeEach(() => {
    sut = produtos(single)
  })

  afterAll(async () => {
    await single.produtos.deleteMany({ nome: { $regex: /Produto/ } })
    await single.disconnect()
  })

  test('Deve retornar uma lista de produtos', async () => {
    const data = await sut.buscaComFiltro({ ord: 'nome', dir: 'asc', page: 1, limit: 10, field: 'descricao', search: 'teste' })
    expect(data).toHaveLength(4)
  })

  test('Deve retornar uma lista de produtos com paginação', async () => {
    const data = await sut.buscaComFiltro({ ord: 'nome', dir: 'asc', page: 2, limit: 2, field: 'descricao', search: 'teste' })
    expect(data).toHaveLength(2)
  })

  test('Deve retornar uma lista de produtos com paginação e filtro', async () => {
    const data = await sut.buscaComFiltro({ ord: 'nome', dir: 'asc', page: 1, limit: 2, field: 'nome', search: 'Produto 1' })
    expect(data).toHaveLength(1)
  })

  test('Deve retonar todos os produtos caso não seja informado o campo de busca', async () => {
    const data = await sut.buscaComFiltro({ ord: 'nome', dir: 'asc', page: 1, limit: 10 })
    expect(data).toHaveLength(4)
  })

  test('Deve retornar uma lista vazia', async () => {
    const data = await sut.buscaComFiltro({ ord: 'nome', dir: 'asc', page: 1, limit: 10, field: 'descricao', search: 'teste 2' })
    expect(data).toHaveLength(0)
  })
})