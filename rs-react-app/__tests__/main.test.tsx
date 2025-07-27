import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from '../src/components/main/main';
import { MemoryRouter } from 'react-router';

const navigateMock = vi.fn();

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ pokemonId: undefined }),
    useSearchParams: () => [new URLSearchParams('offset=0')],
  };
});

describe('Main component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const defaultProps = {
    pokemons: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ],
    isLoading: false,
    currentOffset: 0,
    nextPageHandler: vi.fn(),
    prevPageHandler: vi.fn(),
  };

  it('показывает скелетоны при isLoading === true', () => {
    render(
      <MemoryRouter>
        <Main {...defaultProps} isLoading={true} />
      </MemoryRouter>
    );

    expect(screen.getByText(/pokemons/i)).toBeTruthy();
  });
});
