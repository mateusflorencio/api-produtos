import { jest } from '@jest/globals'

import criacaoProduto from '@/apresentacao/controladores/produtos/criacao.js'

describe('CriacaoProduto', () => {
  const validar = jest.fn(() => [])
  const sanitizar = jest.fn()
  const casoDeUsoCriacaoProduto = jest.fn()
  const sut = criacaoProduto(validar, sanitizar, casoDeUsoCriacaoProduto)

  test('Deve retornar 400 se o produto for inválido', async () => {
    validar.mockReturnValueOnce(['produto inválido'])
    const resposta = await sut({})

    expect(resposta.statusCode).toBe(400)
    expect(resposta.body).toEqual(['produto inválido'])
  })

  test('Deve retonar 400 se o caso de uso retornar erros', async () => {
    casoDeUsoCriacaoProduto.mockResolvedValueOnce({ erros: 'algum erro' })
    const resposta = await sut({})
    expect(resposta.body).toEqual('algum erro')
  })

  test('Deve retornar 201 se o produto for criado com sucesso', async () => {
    casoDeUsoCriacaoProduto.mockResolvedValueOnce({ data: 'produto criado' })
    const resposta = await sut({})
    expect(resposta.statusCode).toBe(201)
    expect(resposta.body).toEqual('produto criado')
  })
})
