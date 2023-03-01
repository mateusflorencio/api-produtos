import { jest } from '@jest/globals'

import criacao from '@/dominio/caso-de-usos/produtos/criacao'

describe('Caso de uso de criação', () => {
  const repositorio = { criar: jest.fn() }

  it('Deve retornar um erro quando o repositório retornar um erro', async () => {
    const casoDeUso = criacao(repositorio)
    repositorio.criar.mockResolvedValueOnce(new Error('Erro'))
    const resultado = await casoDeUso({ nome: 'Produto 1', preco: 10 })
    expect(resultado).toEqual({ erros: 'Erro' })
  })

  it('Deve retornar um produto quando o repositório retornar um produto', async () => {
    const casoDeUso = criacao(repositorio)
    repositorio.criar.mockResolvedValueOnce({ nome: 'Produto 1', preco: 10 })
    const resultado = await casoDeUso({ nome: 'Produto 1', preco: 10 })
    expect(resultado).toEqual({ data: { nome: 'Produto 1', preco: 10 } })
  })
})
