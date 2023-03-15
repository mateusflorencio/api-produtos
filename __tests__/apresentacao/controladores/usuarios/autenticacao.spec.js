import autenticacao from '@/apresentacao/controladores/usuarios/autenticacao.js'
import { jest } from '@jest/globals'

describe('Autenticação', () => {
  let sut
  let validar
  let sanitizar
  let casoDeUsoAutenticacaoUsuario

  const body = {
    email: 'email',
    senha: 'senha'
  }

  const res = {
    data: {
      any: 'any'
    }
  }

  beforeEach(() => {
    validar = jest.fn().mockReturnValue([])
    sanitizar = jest.fn().mockReturnValue(body)
    casoDeUsoAutenticacaoUsuario = jest.fn().mockResolvedValue(res)
    sut = autenticacao(validar, sanitizar, casoDeUsoAutenticacaoUsuario)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Deve retornar 400 caso algum campo não seja informado', async () => {
    body.email = null
    const erros = ['email é obrigatório']
    validar.mockReturnValueOnce(erros)

    const resposta = await sut(body)

    expect(resposta.statusCode).toBe(400)
    expect(resposta.body).toEqual(erros)
  })

  test('Deve sanitizar os dados recebidos', async () => {
    await sut(body)

    expect(sanitizar).toHaveBeenCalledWith(body)
  })

  test('Deve chamar o caso de uso de autenticação', async () => {
    await sut(body)

    expect(casoDeUsoAutenticacaoUsuario).toHaveBeenCalledWith(body)
  })

  test('Deve retornar 200 caso o caso de uso de autenticação seja bem sucedido', async () => {
    const resposta = await sut(body)

    expect(resposta.statusCode).toBe(200)
  })

  test('Deve retornar 400 caso a validacao retorne erros', async () => {
    const erros = ['email é obrigatório']
    validar.mockReturnValueOnce(erros)

    const resposta = await sut(body)

    expect(resposta.statusCode).toBe(400)
    expect(resposta.body).toEqual(erros)
  })

  test('Deve retornar 400 caso o caso de uso de autenticação retorne erros', async () => {
    const erros = 'Algum erro'
    casoDeUsoAutenticacaoUsuario.mockResolvedValueOnce({ erros })

    const resposta = await sut(body)

    expect(resposta.statusCode).toBe(400)
    expect(resposta.body).toEqual(erros)
  })
})



