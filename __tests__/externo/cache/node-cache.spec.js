import nodeCache from '@/externo/cache/node-cache.js'

describe('node-cache', () => {
  it('deve retornar undefined quando não houver valor', () => {
    const cache = nodeCache()
    const valor = cache.get('chave')
    expect(valor).toBeUndefined()
  })

  it('deve retornar o valor quando houver', () => {
    const cache = nodeCache()
    cache.set('chave', 'valor')
    const valor = cache.get('chave')
    expect(valor).toBe('valor')
  })

  it('deve deletar o valor', () => {
    const cache = nodeCache()
    cache.set('chave', 'valor')
    cache.del('chave')
    const valor = cache.get('chave')
    expect(valor).toBeUndefined()
  })

  it('deve limpar o cache', () => {
    const cache = nodeCache()
    cache.set('chave', 'valor')
    cache.flush()
    const valor = cache.get('chave')
    expect(valor).toBeUndefined()
  })
})
