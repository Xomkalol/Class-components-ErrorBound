import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from '@testing-library/react';
import Main from '../src/components/main/main';
import ErrorBoundary from '../src/components/errorBoundary/errorBoundary';
import '@testing-library/jest-dom/vitest';

const mockPokemons = [
  { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
  { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
];

describe('Main Component', () => {
  const mockOnRetry = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    cleanup();
  });

  it('отображает скелетон и заголовки во время загрузки', () => {
    render(<Main pokemons={[]} isLoading={true} />);

    expect(screen.getByTestId('skeleton-container')).toBeInTheDocument();
    expect(screen.getByText('Pokemon Name')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.queryByText('View details')).not.toBeInTheDocument();
  });

  it('скрывает скелетон после задержки', async () => {
    const { rerender } = render(
      <Main pokemons={mockPokemons} isLoading={true} />
    );

    expect(screen.getByTestId('skeleton-container')).toBeInTheDocument();

    rerender(<Main pokemons={mockPokemons} isLoading={false} />);
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.queryByTestId('skeleton-container')).not.toBeInTheDocument();
  });

  it('отображает список покемонов после загрузки', async () => {
    render(<Main pokemons={mockPokemons} isLoading={false} />);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.getAllByText('View details')).toHaveLength(2);
  });

  it('отображает сообщение при отсутствии покемонов', async () => {
    render(<Main pokemons={[]} isLoading={false} />);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText(/No pokemons found/i)).toBeInTheDocument();
  });

  it('отображает ApiErrorBanner при ошибке', () => {
    const errorMsg = 'Network error';
    render(
      <Main
        pokemons={[]}
        isLoading={false}
        error={errorMsg}
        onRetry={mockOnRetry}
      />
    );

    expect(screen.getByText(errorMsg)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('вызывает onRetry при клике на кнопку', () => {
    render(
      <Main
        pokemons={[]}
        isLoading={false}
        error="Error"
        onRetry={mockOnRetry}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('открывает Popout при клике на "View details"', async () => {
    render(<Main pokemons={mockPokemons} isLoading={false} />);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    fireEvent.click(screen.getAllByText('View details')[0]);

    expect(
      screen.getByRole('button', { name: /закрыть/i })
    ).toBeInTheDocument();

    expect(screen.getByText('Abilities:')).toBeInTheDocument();
    expect(screen.getByText('Forms:')).toBeInTheDocument();
    expect(screen.getByText('Species:')).toBeInTheDocument();
  });

  it('генерирует ошибку при клике на тестовую кнопку', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Main pokemons={mockPokemons} isLoading={false} />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Simulate Error (Test)'));
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
