import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Main from '../src/components/main/main';
import { store } from '../src/store/store';
import { Provider } from 'react-redux';

afterEach(() => {
  cleanup();
});
interface MockRootState {
  counter: {
    pokemons: { name: string; url: string }[];
  };
}
vi.mock('react-redux', async () => {
  const actual =
    await vi.importActual<typeof import('react-redux')>('react-redux');

  const mockUseSelector = <T,>(selector: (state: any) => T): T => {
    const mockState = { counter: { pokemons: [] } };
    return selector(mockState);
  };

  const mockUseDispatch = () => vi.fn();

  return {
    ...actual,
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
    queryProp: '',
    pokemons: [] as { name: string; url: string }[],
    isLoading: false,
    currentOffset: 0,
    nextPageHandler: vi.fn(),
    prevPageHandler: vi.fn(),
  };

  render(
    <Provider store={store}>
      <Main {...defaultProps} {...props} />
    </Provider>
  );
};

describe('Main component', () => {
  it('отображает заголовок "Pokemons"', () => {
    renderWithRouter({ isLoading: false });

    const header = screen.getByText(/pokemons/i, { exact: false });
    expect(header).toBeTruthy();
  });
});
