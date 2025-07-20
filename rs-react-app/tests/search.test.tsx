import { expect } from 'vitest';
import React from 'react';
import Header from '../src/components/header/header';
import { render, screen } from '@testing-library/react';
import '@testing-library/dom';
import '@testing-library/jest-dom/vitest';
import { it, describe } from 'vitest';

describe('render search test', () => {
  it('render search', () => {
    const mockHandlesearch = () => {};
    render(<Header onSearch={mockHandlesearch} />);

    expect(screen.getByTestId('upper-container')).toBeInTheDocument();
  });
});
