import builder from '@/apresentacao/sanitizacao/builder.js'

describe('SanitizacaoBuilder', () => {


  it('Deve retornar uma funcao que executa uma sanitizacao', () => {
    const sanitizacao = builder('nome').limpar().build()

    const sanitizado = sanitizacao({ nome: '  Joao  ' })

    expect(sanitizado.nome).toBe('Joao')
  })

  it('Deve retornar uma funcao que executa duas sanitizacoes', () => {
    const sanitizacao = builder('nome').limpar().caixaBaixa().build()

    const sanitizado = sanitizacao({ nome: '  Joao  ' })

    expect(sanitizado.nome).toBe('joao')
  })

  it('Deve retornar uma funcao que executa tres sanitizacoes', () => {
    const sanitizacao = builder('nome').limpar().caixaBaixa().removerCaracteresEspeciais().build()

    const sanitizado = sanitizacao({ nome: '  Joao!  ' })

    expect(sanitizado.nome).toBe('joao')
  })
})
