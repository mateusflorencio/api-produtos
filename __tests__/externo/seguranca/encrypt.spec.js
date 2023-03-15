import encrypt from '@/externo/seguranca/encrypt.js'

describe('encrypt', () => {
  it('deve retornar uma string', () => {
    const sut = encrypt()
    const res = sut('teste')
    expect(typeof res).toBe('string')
  })

  it('deve retornar uma string diferente da original', () => {
    const sut = encrypt()
    const res = sut('teste')
    expect(res).not.toBe('teste')
  })
})
