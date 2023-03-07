import { jest } from '@jest/globals'
import i18n from '@/i18n/caso-de-uso.js'

import criacao from '@/dominio/caso-de-usos/usuarios/criacao.js'

describe('Caso de uso: Criar usuario', () => {
  let repositorio
  let encrypt
  let gerarToken
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
    gerarToken = jest.fn()
    sut = criacao(encrypt, repositorio, gerarToken)
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

    expect(repositorio.criar).toHaveBeenCalledWith({ email, senha: senhaCriptografada, nome, nivel: 4 })
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

    expect(repositorio.criar).toHaveBeenCalledWith({ email, senha: senhaCriptografada, nome, nivel: 1})
    expect(repositorio.criar).toHaveBeenCalledTimes(1)
  })

  it('Deve retornar erro se o repositorio retornar erro', async () => {
    const erro = new Error('erro')
    repositorio.buscar.mockResolvedValueOnce(false)
    repositorio.criar.mockResolvedValueOnce(erro)

    const out = await sut({})
    expect(out.erros).toEqual(erro.message)
    expect(gerarToken).not.toHaveBeenCalled()
  })

  it('Deve chamar o gerarToken com o id, email e nome', async () => {
    const id = 1
    const email = 'email'
    const nome = 'nome'
    repositorio.buscar.mockResolvedValueOnce(false)
    repositorio.criar.mockResolvedValueOnce({ id, email, nome })

    await sut({})

    expect(gerarToken).toHaveBeenCalledWith({ id, email, nome })
    expect(gerarToken).toHaveBeenCalledTimes(1)
  })

  it('Deve retornar o token', async () => {
    repositorio.buscar.mockResolvedValueOnce(false)
    repositorio.criar.mockResolvedValueOnce(mockUsuarioCriado)
    gerarToken.mockResolvedValueOnce('token')

    const res = await sut({})

    expect(res.data.token).toBeTruthy()
    expect(res.data.token).toEqual('token')
  })
})