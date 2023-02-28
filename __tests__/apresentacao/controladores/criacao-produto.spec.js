import { jest } from '@jest/globals'

import criacaoProduto from '@/apresentacao/controladores/criacao-produto.js'

describe('CriacaoProduto', () => {
  const validacao = {
    validar: jest.fn(() => [])
  }
  const sanitizacao = {
    sanitizar: jest.fn()
  }
  const casoDeUsoCriacaoProduto = {
    executar: jest.fn()
  }
  const sut = criacaoProduto(validacao, sanitizacao, casoDeUsoCriacaoProduto)

  test('Deve retornar 400 se o produto for inválido', async () => {
    validacao.validar.mockReturnValueOnce(['produto inválido'])
    const resposta = await sut({})

    expect(resposta.statusCode).toBe(400)
    expect(resposta.body).toEqual(['produto inválido'])
  })

  test('Deve retonar 400 se o caso de uso retornar erros', async () => {
    casoDeUsoCriacaoProduto.executar.mockResolvedValueOnce({ erros: 'algum erro' })
    const resposta = await sut({})
    console.log(resposta)
    expect(resposta.body).toEqual('algum erro')
  })

  test('Deve retornar 201 se o produto for criado com sucesso', async () => {
    casoDeUsoCriacaoProduto.executar.mockResolvedValueOnce({ data: 'produto criado' })
    const resposta = await sut({})
    expect(resposta.statusCode).toBe(201)
    expect(resposta.body).toEqual('produto criado')
  })
})
