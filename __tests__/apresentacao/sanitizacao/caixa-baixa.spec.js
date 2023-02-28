import caixaBaixa from '@/apresentacao/sanitizacao/caixa-baixa.js'

describe('CaixaBaixa', () => {
  test('Deve retornar o texto em caixa baixa', () => {
    const sut = caixaBaixa('campo')
    const resposta = sut({ campo: 'TEXTO' })

    expect(resposta).toEqual({ campo: 'texto' })
  })
})
