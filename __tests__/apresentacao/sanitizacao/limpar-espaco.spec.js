import limparEspacos from '@/apresentacao/sanitizacao/limpar-espacos.js'

describe('LimparEspacos', () => {
  test('Deve retornar o texto sem espaços', () => {
    const sut = limparEspacos('campo')
    const resposta = sut({ campo: '  texto  ' })

    expect(resposta).toEqual({ campo: 'texto' })
  })
})
