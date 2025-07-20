import { expect } from 'vitest';
import React from 'react';
import Header from '../src/components/header/header';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/dom';
import '@testing-library/jest-dom/vitest';
import { it, describe } from 'vitest';

describe('render search test', () => {
  it('render search container', () => {
    const mockHandlesearch = () => {};
    render(<Header onSearch={mockHandlesearch} />);

    expect(screen.getByTestId('upper-container')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });
});

describe('Search value update test', () => {
  it('should update value and user enter key', () => {
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const testValue = 'new value';
    fireEvent.change(input, { target: { value: testValue } });

    expect(input.value).toBe(testValue);
  });
});
