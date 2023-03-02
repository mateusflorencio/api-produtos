import { jest, beforeEach } from '@jest/globals'

import produtos from '@/externo/repositorio/mongo/produtos.js'

describe('Repositório de produtos', () => {
  let single
  beforeEach(() => {
    single = { produtos: { create: jest.fn() } }
  })

  test('Deve criar um produto', async () => {
    const produto = { nome: 'Produto 1', preco: 10 }
    const id = 'id-1'
    single.produtos.create.mockResolvedValue({ id })
    const repositorio = produtos(single)
    const out = await repositorio.criar(produto)
    expect(out).toEqual({ id })
  })

  test('Deve retornar erro ao criar um produto', async () => {
    const produto = { nome: 'Produto 1', preco: 10 }
    const erro = new Error('Erro ao criar produto')
    single.produtos.create.mockResolvedValue(erro)
    const repositorio = produtos(single)
    const erroOut = await repositorio.criar(produto)
    expect(erroOut).toBe(erro)
  })

  test('Deve lançar erro ao criar um produto', async () => {
    const produto = { nome: 'Produto 1', preco: 10 }
    const erro = new Error('Erro ao criar produto')
    single.produtos.create.mockRejectedValue(erro)
    const repositorio = produtos(single)
    const promise = repositorio.criar(produto)
    await expect(promise).rejects.toThrow(erro)
  })
})
