import { jest } from '@jest/globals'

import listagemBusca from '@/dominio/caso-de-usos/produtos/listagem-busca.js'

describe('Listagem e busca de produtos', () => {
  let buscaComFiltro = jest.fn()
  let sut = listagemBusca(buscaComFiltro)

  it('Deve retornar um erro se a busca falhar', async () => {
    buscaComFiltro.mockResolvedValueOnce(new Error('Erro de busca'))
    const out = await sut({})
    expect(out).toEqual({ erros: 'Erro de busca' })
  })

  it('Deve retornar os dados da busca', async () => {
    buscaComFiltro.mockResolvedValueOnce([{ id: 1, nome: 'Produto 1' }])
    const out = await sut({})
    expect(out).toEqual({ data: [{ id: 1, nome: 'Produto 1' }] })
  })

  it('Deve retornar os dados da busca com filtros', async () => {
    buscaComFiltro.mockResolvedValueOnce([{ id: 1, nome: 'Produto 1' }])
    const out = await sut({ ord: 'nome', dir: 'asc', page: 1, limit: 10, field: 'nome', search: 'Produto 1' })
    expect(out).toEqual({ data: [{ id: 1, nome: 'Produto 1' }] })
  })

  it('Deve chamar buscaComFiltro com os dados da busca com filtros padrão', async () => {
    buscaComFiltro.mockResolvedValueOnce([{ id: 1, nome: 'Produto 1' }])
    await sut({ ord: 'nome', field: 'nome', search: 'Produto 1' })
    expect(buscaComFiltro).toHaveBeenCalledWith({ ord: 'nome', dir: 'asc', page: 1, limit: 10, field: 'nome', search: 'produto 1' })
  })

  it('Deve chamar buscaComFiltro com os dados corretos se nao tiver field', async () => {
    buscaComFiltro.mockResolvedValueOnce([{ id: 1, nome: 'Produto 1' }])
    await sut({ ord: 'nome', dir: 'asc', page: 1, limit: 10, search: 'Produto 1' })
    expect(buscaComFiltro).toHaveBeenCalledWith({ ord: 'nome', dir: 'asc', page: 1, limit: 10 })
  })
})