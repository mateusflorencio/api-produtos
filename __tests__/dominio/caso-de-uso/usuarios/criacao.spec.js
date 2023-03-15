import { jest } from '@jest/globals'
import i18n from '@/i18n/caso-de-uso.js'

import criacao from '@/dominio/caso-de-usos/usuarios/criacao.js'

describe('Caso de uso: Criar usuario', () => {
  let repositorio
  let encrypt
  let cache
  let sut

  const mockUsuarioCriado = {
    id: 1,
    email: 'email',
    nome: 'nome'
  }

  beforeEach(() => {
    repositorio = {
      buscar: jest.fn(),
      criar: jest.fn()
    }
    encrypt = jest.fn()
    cache = {
      set: jest.fn()
    }
    sut = criacao(encrypt, repositorio, cache)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })


  it('Deve chamar o buscar com o email', async () => {
    repositorio.criar.mockResolvedValueOnce(mockUsuarioCriado)
    const email = 'email'
    await sut({ email })
    expect(repositorio.buscar).toHaveBeenCalledWith({ where: email })
  })

  it('Deve retornar erro se o usuario ja existe', async () => {
    const email = 'email'
    repositorio.buscar.mockResolvedValueOnce(true)
    const { erros } = await sut({ email })
    expect(erros).toEqual(i18n().criacao.usuarioJaExiste)
    expect(repositorio.criar).not.toHaveBeenCalled()
    expect(encrypt).not.toHaveBeenCalled()
  })

  it('Deve chamar o encrypt com a senha', async () => {
    const senha = 'senha'
    repositorio.buscar.mockResolvedValueOnce(false)
    repositorio.criar.mockResolvedValueOnce(mockUsuarioCriado)

    await sut({ senha })

    expect(encrypt).toHaveBeenCalledWith(senha)
    expect(encrypt).toHaveBeenCalledTimes(1)
  })

  it('Deve chamar o repositorio com o email, senha criptografada e nome com nivel padrao', async () => {
    const email = 'email'
    const senha = 'senha'
    const nome = 'nome'
    const senhaCriptografada = 'senhaCriptografada'
    repositorio.buscar.mockResolvedValueOnce(false)
    repositorio.criar.mockResolvedValueOnce(mockUsuarioCriado)
    encrypt.mockResolvedValueOnce(senhaCriptografada)

    await sut({ email, senha, nome })

    expect(repositorio.criar).toHaveBeenCalledWith({ email, senha: senhaCriptografada, nome, nivel: 'cliente' })
    expect(repositorio.criar).toHaveBeenCalledTimes(1)
  })

  it('Deve chamar o repositorio com o email, senha criptografada e nome com nivel 1', async () => {
    const email = 'email'
    const senha = 'senha'
    const nome = 'nome'
    const senhaCriptografada = 'senhaCriptografada'
    repositorio.buscar.mockResolvedValueOnce(false)
    repositorio.criar.mockResolvedValueOnce(mockUsuarioCriado)
    encrypt.mockResolvedValueOnce(senhaCriptografada)

    await sut({ email, senha, nome, nivelUsuario: 'super' })

    expect(repositorio.criar).toHaveBeenCalledWith({ email, senha: senhaCriptografada, nome, nivel: 1 })
    expect(repositorio.criar).toHaveBeenCalledTimes(1)
  })

  it('Deve retornar erro se o repositorio retornar erro', async () => {
    const erro = new Error('erro')
    repositorio.buscar.mockResolvedValueOnce(false)
    repositorio.criar.mockResolvedValueOnce(erro)

    const out = await sut({})
    expect(out.erros).toEqual(erro.message)
  })

  it('Deve chamar o cache com o email e o usuario criado', async () => {
    repositorio.buscar.mockResolvedValueOnce(false)
    repositorio.criar.mockResolvedValueOnce(mockUsuarioCriado)

    const email = 'email'
    await sut({ email })
    expect(cache.set).toHaveBeenCalledWith(email, mockUsuarioCriado)
  })

  it('Deve retonar algo se tudo der certo', async () => {
    repositorio.buscar.mockResolvedValueOnce(false)
    repositorio.criar.mockResolvedValueOnce(mockUsuarioCriado)

    const out = await sut({})
    expect(out.data).toEqual(i18n().criacao.usuarioCriado)
  })
})
