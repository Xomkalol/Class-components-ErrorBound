import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiLink } from '../src/components/api/apiHandler';
import getFirstLoad from '../src/components/api/apiHandler';

describe('getFirstLoad', () => {
  const mockPokemons = [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  ];

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ results: mockPokemons }),
        })
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('успешно возвращает список покемонов', async () => {
    const result = await getFirstLoad();
    expect(result).toEqual(mockPokemons);
    expect(fetch).toHaveBeenCalledWith(`${apiLink}/pokemon`);
  });

  it('возвращает пустой массив при ошибке', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Network error')))
    );

    const result = await getFirstLoad();
    expect(result).toEqual([]);
  });

  it('логирует ошибку в консоль', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Test error')))
    );

    await getFirstLoad();
    expect(consoleSpy).toHaveBeenCalledWith('Ошибка:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});
