import compose from '@/apresentacao/validacao/compose.js'

describe('Compose', () => {
  test('Deve retornar null se todas as validações passarem', () => {
    const sut = compose([
      (body) => undefined,
      (body) => undefined
    ])

    const resposta = sut({})

    expect(resposta).toBeUndefined()
  })

  test('Deve retornar os erros se alguma validação falhar', () => {
    const sut = compose([
      (body) => undefined,
      (body) => 'Erro 1',
      (body) => 'Erro 2'
    ])

    const resposta = sut({})

    expect(resposta).toEqual(['Erro 1', 'Erro 2'])
  })
})
