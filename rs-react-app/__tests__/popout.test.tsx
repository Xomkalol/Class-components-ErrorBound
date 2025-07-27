import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Popout from '../src/components/popout/Popout';
import { MemoryRouter, Route, Routes } from 'react-router';

const mockPokemonData = {
  name: 'pikachu',
  abilities: [
    { ability: { name: 'static', url: 'ability-url' } },
    { ability: { name: 'lightning-rod', url: 'ability-url' } },
  ],
  forms: [{ name: 'pikachu', url: 'form-url' }],
  species: { name: 'mouse' },
  sprites: { front_default: 'pikachu-image.png' },
};

function TestWrapper({
  pokemonUrl,
  onClose,
}: {
  pokemonUrl: string;
  onClose: () => void;
}) {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Popout />} handle={{ pokemonUrl, onClose }} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Popout Component', () => {
  const mockOnClose = vi.fn();
  const mockPokemonUrl = 'https://pokeapi.co/api/v2/pokemon/25/';

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData),
        })
      )
    );

    render(<TestWrapper pokemonUrl={mockPokemonUrl} onClose={mockOnClose} />);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    cleanup();
  });

  it('вызывает onClose при клике на оверлей', async () => {
    await screen.findByTestId('pokemon-name');
    fireEvent.click(screen.getByTestId('popout-overlay'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('вызывает onClose при клике на кнопку', async () => {
    await screen.findByTestId('pokemon-name');
    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
