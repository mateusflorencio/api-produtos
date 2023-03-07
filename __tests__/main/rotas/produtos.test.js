import { jest } from '@jest/globals'

import supertest from 'supertest'
import app from '@/main/config/server.js'

import single from '@/externo/repositorio/mongo/single.js'

describe('Produtos Routes', () => {
  let server
  beforeAll(async () => {
    await single.connect()
    server = app()
  })

  afterAll(async () => {
    await single.disconnect()

  })

  beforeEach(async () => {
    jest.setTimeout(10000)
  })

  afterEach(async () => {
    await single.produtos.deleteMany()
  })

  describe('POST /produtos', () => {
    test('Deve retornar 201 ao criar um produto', async () => {
      const res = await supertest(server)
        .post('/api/produto')
        .set('Content-Type', 'application/json')
        .send({
          nome: 'Produto 1',
          preco: 10,
          descricao: 'Descrição 1'
        })
        .expect(201)

      expect(res.body).toHaveProperty('id')
    })

    test('Deve retornar 400 ao criar um produto com nome inválido', async () => {
      const res = await supertest(server)
        .post('/api/produto')
        .set('Content-Type', 'application/json')
        .send({
          nome: '',
          preco: 10,
          descricao: 'Descrição 1'
        })
        .expect(400)

      expect(res.body).toEqual([{ "campo": "nome", "mensagem": "Campo obrigatório" }])
    })

    test('Deve retornar 400 ao criar um produto com preço inválido', async () => {
      const res = await supertest(server)
        .post('/api/produto')
        .set('Content-Type', 'application/json')
        .send({
          nome: 'Produto 1',
          preco: -10,
          descricao: 'Descrição 1'
        })
        .expect(400)

      expect(res.body).toEqual([{ "campo": "preco", "mensagem": "Número deve ser positivo" }])
    })

    test('Deve retornar 400 ao criar um produto com descrição inválida', async () => {
      const res = await supertest(server)
        .post('/api/produto')
        .set('Content-Type', 'application/json')
        .send({
          nome: 'Produto 1',
          preco: 10,
          descricao: ''
        })
        .expect(400)

      expect(res.body).toEqual([{ "campo": "descricao", "mensagem": "Campo obrigatório" }])
    })

    test('Deve retornar 400 ao criar se nenhum campo for enviado', async () => {
      const res = await supertest(server)
        .post('/api/produto')
        .set('Content-Type', 'application/json')
        .send({})
        .expect(400)

      expect(res.body).toEqual([
        { "campo": "nome", "mensagem": "Campo obrigatório" },
        { "campo": "preco", "mensagem": "Campo obrigatório" },
        { "campo": "descricao", "mensagem": "Campo obrigatório" }
      ])
    })
  })
})
