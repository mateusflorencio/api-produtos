import { jest } from '@jest/globals';

import compose from '@/apresentacao/sanitizacao/compose.js';

describe('Sanitizacao - Compose', () => {
  test('Deve chamar sanitizacao com o body correto', () => {
    const sanitizacaoSpy = jest.fn();
    const sanitizacao = jest.fn().mockReturnValue(sanitizacaoSpy);
    const body = { qualquer: 'qualquer' };
    const sut = compose([sanitizacao]);
    sut(body);
    expect(sanitizacao).toHaveBeenCalledWith(body);
  });

  test('Deve retornar o body com os campos corretos', () => {
    const sanitizacao = jest.fn().mockReturnValue({ qualquer: 'qualquer' })
    const body = { qualquer: 'qualquer' }
    const sut = compose([sanitizacao])
    const resultado = sut(body)
    expect(resultado).toEqual({ qualquer: 'qualquer' })
  })

  test('Deve chamar todas as sanitizacoes', () => {
    const sanitizacaoSpy = jest.fn()
    const sanitizacao = jest.fn().mockReturnValue(sanitizacaoSpy)
    const body = { qualquer: 'qualquer' }
    const sut = compose([sanitizacao, sanitizacao])
    sut(body)
    expect(sanitizacao).toHaveBeenCalledTimes(2)
  })

  test('Deve retornar o body com todos os campos passados corretos', () => {
    const sanitizacao = jest.fn().mockReturnValue({ qualquer: 'QUALQUER' })
    const body = { qualquer: 'qualquer', outro: 'outro' }
    const sut = compose([sanitizacao])
    const resultado = sut(body)
    expect(resultado).toEqual({ qualquer: 'QUALQUER', outro: 'outro' })
  })
})
