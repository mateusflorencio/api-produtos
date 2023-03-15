import NodeCache from 'node-cache'

export default (ttl = 0) => {
  const cache = new NodeCache({ stdTTL: ttl })
  return {
    get: (chave) => {
      return cache.get(chave)
    },
    set: (chave, valor) => {
      return cache.set(chave, valor)
    },
    del: (chave) => {
      return cache.del(chave)
    },
    flush: () => {
      return cache.flushAll()
    }
  }
}
