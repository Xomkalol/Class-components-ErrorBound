import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('react-redux', () => ({
  useSelector: () => ({ pokemons: [{ name: 'pikachu' }] }),
  useDispatch: () => vi.fn(),
}));

vi.mock('../../util/context', () => ({
  themeContext: { useContext: () => ({ theme: 'light' }) },
}));
vi.mock('../../util/createCSV', () => ({ default: vi.fn() }));
vi.mock('./flyout.css', () => ({}));

import FlyOut from '../src/components/flyout/flyout';

describe('flyout component', () => {
  it('should render flyout and buttons', () => {
    render(<FlyOut />);

    expect(screen.getByTestId('flyout')).toBeTruthy();
    expect(screen.getByTestId('unselect')).toBeTruthy();
    expect(screen.getByTestId('download')).toBeTruthy();
  });
});
