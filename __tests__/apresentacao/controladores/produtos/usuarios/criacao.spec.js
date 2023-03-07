import { jest } from '@jest/globals'
import criacao from '@/apresentacao/controladores/usuarios/criacao.js'

describe('Controlador de criação de usuários', () => {
  let sut
  let validar
  let sanitizar
  let casoDeUsoCriacaoUsuario

  const body = {
    nome: 'nome',
    email: 'email',
    senha: 'senha'
  }

  beforeEach(() => {
    validar = jest.fn()
    sanitizar = jest.fn()
    casoDeUsoCriacaoUsuario = jest.fn()
    sut = criacao(validar, sanitizar, casoDeUsoCriacaoUsuario)
  })

  test('Deve retornar 400 se o nome não for informado', async () => {
    body.nome = null
    const erros = ['nome é obrigatório']
    validar.mockReturnValueOnce(erros)

    const resposta = await sut(body)

    expect(resposta.statusCode).toBe(400)
    expect(resposta.body).toEqual(erros)
  })

  test('Deve retornar 400 se o email não for informado', async () => {
    body.email = null
    const erros = ['email é obrigatório']
    validar.mockReturnValueOnce(erros)

    const resposta = await sut(body)

    expect(resposta.statusCode).toBe(400)
    expect(resposta.body).toEqual(erros)
  })

  test('Deve retornar 400 se a senha não for informada', async () => {
    body.senha = null
    const erros = ['senha é obrigatória']
    validar.mockReturnValueOnce(erros)

    const resposta = await sut(body)

    expect(resposta.statusCode).toBe(400)
    expect(resposta.body).toEqual(erros)
  })

  test('Deve retornar 400 se o nome for inválido', async () => {
    body.nome = 'nome inválido'
    const erros = ['nome inválido']
    validar.mockReturnValueOnce(erros)

    const resposta = await sut(body)

    expect(resposta.statusCode).toBe(400)
    expect(resposta.body).toEqual(erros)
  })

  test('Deve retornar 400 se o email for inválido', async () => {
    body.email = 'email inválido'
    const erros = ['email inválido']
    validar.mockReturnValueOnce(erros)

    const resposta = await sut(body)

    expect(resposta.statusCode).toBe(400)
    expect(resposta.body).toEqual(erros)
  })

  test('Deve retornar 400 se a senha for inválida', async () => {
    body.senha = 'senha inválida'
    const erros = ['senha inválida']
    validar.mockReturnValueOnce(erros)

    const resposta = await sut(body)

    expect(resposta.statusCode).toBe(400)
    expect(resposta.body).toEqual(erros)
  })

  test('Deve retonar o body sanitizado', async () => {
    const usuario = {
      nome: 'nome sanitizado',
      email: 'email sanitizado',
      senha: 'senha sanitizada'
    }
    sanitizar.mockReturnValueOnce(usuario)
    casoDeUsoCriacaoUsuario.mockReturnValueOnce({ data: '' })

    await sut(body)

    expect(sanitizar).toHaveBeenCalledWith(body)
    expect(sanitizar).toHaveBeenCalledTimes(1)
    expect(sanitizar).toHaveReturnedWith(usuario)
  })

  test('Deve chamar o caso de uso de criação de usuário apenas com os campos corretos', async () => {
    const usuario = {
      nome: 'nome sanitizado',
      email: 'email sanitizado',
      senha: 'senha sanitizada',
      campoInexistente: 'campoInexistente'
    }

    sanitizar.mockReturnValueOnce(usuario)
    casoDeUsoCriacaoUsuario.mockReturnValueOnce({ data: '' })

    await sut(body)

    expect(casoDeUsoCriacaoUsuario).toHaveBeenCalledWith({ nome: usuario.nome, email: usuario.email, senha: usuario.senha })
    expect(casoDeUsoCriacaoUsuario).toHaveBeenCalledTimes(1)
  })

  test('Deve chamar o caso de uso de criação de usuário', async () => {
    const usuario = {
      nome: 'nome sanitizado',
      email: 'email sanitizado',
      senha: 'senha sanitizada'
    }
    sanitizar.mockReturnValueOnce(usuario)
    casoDeUsoCriacaoUsuario.mockReturnValueOnce({ data: '' })

    await sut(body)

    expect(casoDeUsoCriacaoUsuario).toHaveBeenCalledWith(usuario)
    expect(casoDeUsoCriacaoUsuario).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar 400 se o caso de uso retornar erros', async () => {
    const erros = ['erro']
    sanitizar.mockReturnValueOnce(body)
    casoDeUsoCriacaoUsuario.mockReturnValueOnce({ erros: erros })

    const resposta = await sut(body)

    expect(resposta.statusCode).toBe(400)
    expect(resposta.body).toEqual(erros)
  })

  test('Deve retornar 201 se o caso de uso retornar dados', async () => {
    const dados = { id: 'id' }
    sanitizar.mockReturnValueOnce(body)
    casoDeUsoCriacaoUsuario.mockReturnValueOnce({ data: dados })

    const resposta = await sut(body)

    expect(resposta.statusCode).toBe(201)
    expect(resposta.body).toEqual(dados)
  })
})
