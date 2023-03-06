import { jest } from '@jest/globals'
import adaptadorControlador from '@/apresentacao/controladores/controlador.js'

describe('Controlador', () => {
  test('Deve retornar 500 se o caso de uso retornar uma exceção', async () => {
    const log = { error: jest.fn() }
    const controlador = jest.fn().mockRejectedValueOnce(new Error('Erro interno do servidor'))
    const sut = adaptadorControlador(log)(controlador)

    const resposta = await sut({})

    expect(resposta.statusCode).toBe(500)
    expect(resposta.body).toEqual('Erro interno do servidor')
  })
})
