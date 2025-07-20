import { afterEach, expect, vi } from 'vitest';
import React from 'react';
import Header from '../src/components/header/header';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/dom';
import '@testing-library/jest-dom/vitest';
import { it, describe, beforeEach } from 'vitest';

describe('Header component', () => {
  let mockHandleSearch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockHandleSearch = vi.fn();
    localStorage.clear();
    render(<Header onSearch={mockHandleSearch} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render search container', () => {
    expect(screen.getByTestId('upper-container')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('should update value when user types', () => {
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const testValue = 'new value';
    fireEvent.change(input, { target: { value: testValue } });
    expect(input.value).toBe(testValue);
  });

  it('should update localStorage when Enter is pressed', () => {
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const testValue = 'pikachu';
    fireEvent.change(input, { target: { value: testValue } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
    expect(localStorage.getItem('searchValue')).toBe(testValue);
  });

  it('should update localStorage when button is clicked', () => {
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const button = screen.getByTestId('search-button');
    const testValue = 'pikachu';

    fireEvent.change(input, { target: { value: testValue } });
    fireEvent.click(button);

    expect(localStorage.getItem('searchValue')).toBe(testValue);
  });

  it('should call onSearch with correct value', () => {
    const button = screen.getByTestId('search-button');
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const testValue = 'pikachu';

    fireEvent.change(input, { target: { value: testValue } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    fireEvent.click(button);

    expect(mockHandleSearch).toHaveBeenCalledWith(testValue);
    expect(mockHandleSearch).toHaveBeenCalledTimes(2);
  });

  it('should load saved value from localStorage on mount', () => {
    const savedValue = 'saved-pokemon';
    localStorage.setItem('searchValue', savedValue);

    cleanup();
    render(<Header onSearch={mockHandleSearch} />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    expect(input.value).toBe(savedValue);
    expect(mockHandleSearch).toHaveBeenCalledWith(savedValue);
  });
});
