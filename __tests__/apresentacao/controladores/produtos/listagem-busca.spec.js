import { jest } from '@jest/globals'

import listagemBusca from '@/apresentacao/controladores/produtos/listagem-busca.js'

describe('Controlador de listagem e busca de produtos', () => {
  let casoDeUso = jest.fn()
  let sut = listagemBusca(casoDeUso)

  test('Deve retornar 200 com os dados da busca', async () => {
    casoDeUso.mockResolvedValueOnce({ data: 'dados da busca' })
    const req = {
      query: {
        ord: 'nome',
        dir: 'asc',
        page: 1,
        limit: 10,
        search: 'teste'
      }
    }
    const out = await sut(req)
    expect(out.statusCode).toBe(200)
    expect(out.body).toEqual({ data: 'dados da busca' })
  })

  test('Deve retornar 500 se o caso de uso lançar uma exceção', async () => {
    casoDeUso.mockRejectedValueOnce(new Error('erro'))
    const req = {
      query: {
        ord: 'nome',
        dir: 'asc',
        page: 1,
        limit: 10,
        search: 'teste'
      }
    }
    const out = await sut(req)
    expect(out.statusCode).toBe(500)
    expect(out.body).toEqual('Erro interno do servidor')
  })
})