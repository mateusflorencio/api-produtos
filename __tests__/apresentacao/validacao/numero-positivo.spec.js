import traducao from '@/i18n/validacao.js'
import numeroPositivo from '@/apresentacao/validacao/numero-positivo.js'

describe('NumeroPositivo', () => {
  test('Deve retornar mensagem de erro se o campo for negativo', () => {
    const sut = numeroPositivo('campo')
    const resposta = sut({ campo: -1 })
    expect(resposta).toEqual({ campo: 'campo', mensagem: traducao().validacao.numeroPositivo })
  })

  test('Deve retornar null se o campo for positivo', () => {
    const sut = numeroPositivo('campo')
    const resposta = sut({ campo: 1 })
    expect(resposta).toBeUndefined()
  })
})
