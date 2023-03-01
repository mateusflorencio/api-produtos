
import supertest from 'supertest'

import app from '@/main/config/server.js'

describe('Main', () => {
  test('Deve retornar OK', () => {
    supertest(app)
      .get('/api/teste')
      .expect(200, 'OK')
  })

  test('Deve retornar OK', async () => {
    const server = app(5000)
    await supertest(server)
      .get('/api/teste')
      .expect(200, 'OK')
  })
})
