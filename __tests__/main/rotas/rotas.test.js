
import supertest from 'supertest'

import app from '@/main/config/server.js'

describe('Main', () => {
  let server

  beforeAll(() => {
    server = app()
  })

  test('Deve retornar OK', () => {
    supertest(server)
      .get('/api/teste')
      .expect(200, 'OK')
  })

  test('Deve retornar OK', async () => {
    await supertest(server)
      .get('/api/teste')
      .expect(200, 'OK')
  })
})
