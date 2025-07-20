import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import searchPokemon from '../src/components/header/headerHandler';
import { apiLink } from '../src/components/api/apiHandler';

const mockPokemonData = {
  id: 25,
  name: 'pikachu',
  abilities: [{ ability: { name: 'static', url: 'ability-url' } }],
  sprites: { front_default: 'pikachu-image.png' },
};

describe('searchPokemon', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('успешно возвращает данные покемона', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPokemonData),
    } as Response);

    const result = await searchPokemon('pikachu');

    expect(result).toEqual(mockPokemonData);
    expect(mockFetch).toHaveBeenCalledWith(`${apiLink}/pokemon/pikachu/`);
  });

  it('обрабатывает регистр и пробелы в имени', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPokemonData),
    } as Response);

    await searchPokemon(' PiKaChU ');

    expect(mockFetch).toHaveBeenCalledWith(`${apiLink}/pokemon/pikachu/`);
  });

  it('возвращает null при ошибке 404', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    const result = await searchPokemon('unknown');

    expect(result).toBeNull();
  });

  it('возвращает null при ошибке сети', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await searchPokemon('pikachu');

    expect(result).toBeNull();
  });

  it('логирует ошибку в консоль', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockRejectedValueOnce(new Error('Test error'));

    await searchPokemon('pikachu');

    expect(consoleSpy).toHaveBeenCalledWith('Ошибка:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});
