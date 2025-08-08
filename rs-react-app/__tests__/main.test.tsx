import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Main from '../src/components/main/main';

afterEach(() => {
  cleanup();
});
interface MockRootState {
  counter: {
    pokemons: { name: string; url: string }[];
  };
}
vi.mock('react-redux', () => {
  const mockUseSelector = <T,>(selector: (state: MockRootState) => T): T => {
    const mockState: MockRootState = { counter: { pokemons: [] } };
    return selector(mockState);
  };

  const mockUseDispatch = () => vi.fn();

  return {
    useSelector: mockUseSelector,
    useDispatch: mockUseDispatch,
  };
});
vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useParams: () => ({}),
    useSearchParams: () => [new URLSearchParams('offset=0')],
    useNavigate: () => vi.fn(),
  };
});

vi.mock('../flyout/flyout', () => ({
  default: () => <div data-testid="flyout" />,
}));
vi.mock('./checkbox', () => ({
  default: () => <div data-testid="checkbox" />,
}));
vi.mock('../skeleton/skeleton', () => ({
  default: () => <div data-testid="skeleton-item" />,
}));

const renderWithRouter = (props = {}) => {
  const defaultProps = {
    pokemons: [] as { name: string; url: string }[],
    isLoading: false,
    currentOffset: 0,
    nextPageHandler: vi.fn(),
    prevPageHandler: vi.fn(),
  };

  render(
    <MemoryRouter>
      <Main {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe('Main component', () => {
  it('отображает заголовок "Pokemons"', () => {
    renderWithRouter({ isLoading: false });

    const header = screen.getByText(/pokemons/i, { exact: false });
    expect(header).toBeTruthy();
  });
});
