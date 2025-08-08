import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Popout from '../src/components/popout/popout';

// 👇 Мокаем useOutletContext
vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useOutletContext: () => ({
      pokemonUrl: 'https://pokeapi.co/api/v2/pokemon/pikachu',
      onClose: vi.fn(),
    }),
  };
});

const mockPokemonData = {
  name: 'pikachu',
  abilities: [
    { ability: { name: 'static', url: '' }, is_hidden: false, slot: 1 },
    { ability: { name: 'lightning-rod', url: '' }, is_hidden: true, slot: 3 },
  ],
  forms: [{ name: 'pikachu', url: '' }],
  species: { name: 'pikachu-species', url: '' },
  sprites: { front_default: 'https://example.com/pikachu.png' },
};

describe('Popout', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('отображает "Loading..." при загрузке', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    );

    render(<Popout />);

    const loading = screen.getByText(/loading/i);
    expect(loading?.textContent?.toLowerCase()).toContain('loading');
  });

  it('отображает данные покемона после загрузки', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData),
        })
      )
    );

    render(<Popout />);

    await waitFor(() => {
      const name = screen.getByTestId('pokemon-name');
      const abilities = screen.getByTestId('pokemon-abilities');
      const forms = screen.getByTestId('pokemon-forms');
      const species = screen.getByTestId('pokemon-species');
      const image = screen.getByTestId('pokemon-image');

      expect(name.textContent).toBe('pikachu');
      expect(abilities.textContent).toContain('static');
      expect(abilities.textContent).toContain('lightning-rod');
      expect(forms.textContent).toContain('pikachu');
      expect(species.textContent).toContain('pikachu-species');
      expect(image.getAttribute('src')).toBe('https://example.com/pikachu.png');
    });
  });
});
