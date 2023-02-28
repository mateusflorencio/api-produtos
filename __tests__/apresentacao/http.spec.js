import { badRequest, created, forbidden, noContent, notFound, ok, serverError, unauthorized } from '@/apresentacao/http.js'

describe('Controlador HTTP', () => {
  test('Deve retornar 200 quando o statusCode for 200', () => {
    const resultado = ok({ nome: 'Produto 1', preco: 10 })
    expect(resultado).toEqual({
      statusCode: 200,
      body: { nome: 'Produto 1', preco: 10 }
    })
  })

  test('Deve retornar 400 quando o statusCode for 400', () => {
    const resultado = badRequest(['Erro de validação'])
    expect(resultado).toEqual({
      statusCode: 400,
      body: ['Erro de validação']
    })
  })

  test('Deve retornar 500 quando o statusCode for 500', () => {
    const resultado = serverError(['Erro interno'])
    expect(resultado).toEqual({
      statusCode: 500,
      body: ['Erro interno']
    })
  })

  test('Deve retornar 404 quando o statusCode for 404', () => {
    const resultado = notFound(['Erro de validação'])
    expect(resultado).toEqual({
      statusCode: 404,
      body: ['Erro de validação']
    })
  })

  test('Deve retornar 401 quando o statusCode for 401', () => {
    const resultado = unauthorized(['Erro de validação'])
    expect(resultado).toEqual({
      statusCode: 401,
      body: ['Erro de validação']
    })
  })

  test('Deve retornar 403 quando o statusCode for 403', () => {
    const resultado = forbidden(['Erro de validação'])
    expect(resultado).toEqual({
      statusCode: 403,
      body: ['Erro de validação']
    })
  })

  test('Deve retornar 204 quando o statusCode for 204', () => {
    const resultado = noContent()
    expect(resultado).toEqual({
      statusCode: 204
    })
  })

  test('Deve retornar 201 quando o statusCode for 201', () => {
    const resultado = created({ nome: 'Produto 1', preco: 10 })
    expect(resultado).toEqual({
      statusCode: 201,
      body: { nome: 'Produto 1', preco: 10 }
    })
  })
})
