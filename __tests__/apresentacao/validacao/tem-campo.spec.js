import traducao from '@/i18n/validacao.js'
import temCampo from '@/apresentacao/validacao/tem-campo.js'

describe('TemCampo', () => {
  test('Deve retornar mensagem de erro se o campo não existir', () => {
    const sut = temCampo('campo')
    const resposta = sut({})
    expect(resposta).toEqual({ campo: 'campo', mensagem: traducao().validacao.temCampo })
  })

  test('Deve retornar null se o campo existir', () => {
    const sut = temCampo('campo')
    const resposta = sut({ campo: 'qualquer valor' })
    expect(resposta).toBeUndefined()
  })
})
