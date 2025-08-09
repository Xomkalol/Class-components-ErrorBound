import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Popout from '../src/components/popout/popout';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/vitest';
import { store } from '../src/store/store';

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useOutletContext: () => ({
      pokemonUrl: 'pikachu',
      onClose: vi.fn(),
    }),
  };
});

const mockApi = {
  useGetPokemonByNameQuery: vi.fn(),
};

vi.mock('../createApi', () => ({
  useGetPokemonByNameQuery: mockApi.useGetPokemonByNameQuery,
}));

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
    mockApi.useGetPokemonByNameQuery.mockReturnValue({
      isLoading: true,
      isFetching: true,
      isError: false,
      data: undefined,
    });

    render(
      <Provider store={store}>
        {' '}
        <Popout />
      </Provider>
    );

    const loading = screen.getByText(/loading.../i);
    expect(loading).toBeInTheDocument();
    expect(loading.textContent?.toLowerCase()).toContain('loading...');
  });

  it('отображает данные покемона после загрузки', async () => {
    mockApi.useGetPokemonByNameQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: false,
      data: mockPokemonData,
    });

    await waitFor(() => {
      const name = screen.getByTestId('pokemon-name');
      const abilities = screen.getByTestId('pokemon-abilities');
      const forms = screen.getByTestId('pokemon-forms');
      const species = screen.getByTestId('pokemon-species');
      const image = screen.getByTestId('pokemon-image');
    });
  });
});
