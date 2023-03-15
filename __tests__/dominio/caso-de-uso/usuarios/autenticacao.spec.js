import autenticacao from '@/dominio/caso-de-usos/usuarios/autenticacao.js'
import i18n from '@/i18n/caso-de-uso.js'
import { jest } from '@jest/globals'

describe('Autenticação', () => {
  let cache
  let repositorioUsuario
  let compareSenha
  let gerarToken
  let sut

  const input = {
    email: 'email',
    senha: 'senha'
  }

  beforeEach(() => {
    cache = {
      get: jest.fn()
    }
    repositorioUsuario = {
      buscar: jest.fn()
    }
    compareSenha = jest.fn()
    gerarToken = jest.fn()
    sut = autenticacao(cache, repositorioUsuario, compareSenha, gerarToken)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Deve retornar erro se o usuário não existir no cache e no repositorio', async () => {
    repositorioUsuario.buscar.mockReturnValueOnce(null)

    const resultado = await sut(input)

    expect(resultado).toEqual({ erro: i18n().autenticacao.dadosInvalidos })
  })

  it('Deve retornar erro se o usuário existir no cache e a senha estiver incorreta', async () => {
    cache.get.mockReturnValueOnce({ senha: input.senha })
    compareSenha.mockReturnValueOnce(false)

    const resultado = await sut(input)

    expect(resultado).toEqual({ erro: i18n().autenticacao.dadosInvalidos })
  })

  it('Deve retornar um token se o usuário existir no cache e a senha estiver correta', async () => {
    cache.get.mockReturnValueOnce({ senha: 'senha' })
    compareSenha.mockReturnValueOnce(true)
    gerarToken.mockReturnValueOnce('token')

    const resultado = await sut(input)

    expect(resultado).toEqual({ token: 'token' })
  })

  it('Deve retornar erro se o usuário existir no repositorio e a senha estiver incorreta', async () => {
    repositorioUsuario.buscar.mockReturnValueOnce({ senha: 'senha' })
    compareSenha.mockReturnValueOnce(false)

    const resultado = await sut(input)

    expect(resultado).toEqual({ erro: i18n().autenticacao.dadosInvalidos })
  })

  it('Deve retornar um token se o usuário existir no repositorio e a senha estiver correta', async () => {
    repositorioUsuario.buscar.mockReturnValueOnce({ senha: 'senha' })
    compareSenha.mockReturnValueOnce(true)
    gerarToken.mockReturnValueOnce('token')

    const resultado = await sut(input)

    expect(resultado).toEqual({ token: 'token' })
  })
})
