import { jest } from '@jest/globals'

import listagemBusca from '@/apresentacao/controladores/produtos/listagem-busca.js'

describe('Controlador de listagem e busca de produtos', () => {
  let casoDeUso = jest.fn()
  let sut = listagemBusca(casoDeUso)
  const req = {
    query: {
      ord: 'nome',
      dir: 'asc',
      page: 1,
      limit: 10,
      search: 'teste',
      field: 'nome'
    }
  }

  test('Deve retornar 200 com os dados da busca', async () => {
    casoDeUso.mockResolvedValueOnce({ data: 'dados da busca' })

    const out = await sut(req)
    
    expect(out.statusCode).toBe(200)
    expect(out.body).toEqual('dados da busca')
  })

  test('Deve retornar 400 se o caso de uso retornar erros', async () => {
    casoDeUso.mockResolvedValueOnce({ erros: 'erros da busca' })

    const out = await sut(req)

    expect(out.statusCode).toBe(400)
    expect(out.body).toEqual('erros da busca')
  })

  test('Deve retornar 500 se o caso de uso lançar uma exceção', async () => {
    casoDeUso.mockRejectedValueOnce(new Error('erro'))

    const out = await sut(req)

    expect(out.statusCode).toBe(500)
    expect(out.body).toEqual('Erro interno do servidor')
  })
})