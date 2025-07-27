import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorPage from '../src/components/errorPage/errorPage';
import { MemoryRouter } from 'react-router';

describe('ErrorPage', () => {
  it('отображает заголовок и сообщение об ошибке', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const title = screen.getByText(/oops! something went wrong/i);
    const message = screen.getByText(/encountered an error/i);

    expect(title.textContent).toContain('Oops');
    expect(message.textContent).toContain('encountered an error');
  });

  it('содержит ссылку "Back to Home" с правильной ссылкой', () => {
    const link = screen.getByTestId('back-home-link');
    expect(link.getAttribute('href')).toBe('/');
    expect(link.textContent).toMatch(/back to home/i);
  });
});
