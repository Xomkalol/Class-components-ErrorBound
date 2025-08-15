import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Checkbox from '../src/components/main/checkbox';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';

describe('flyout component', () => {
  const mockPokemon = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  it('should render flyout and buttons', () => {
    render(
      <Provider store={store}>
        <Checkbox pokemon={mockPokemon}></Checkbox>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeTruthy();
  });
});
