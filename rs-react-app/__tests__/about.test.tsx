import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../src/components/about/about';
import { MemoryRouter } from 'react-router';

describe('About', () => {
  it('рендерит заголовки', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(
      /welcome to about page!/i
    );
    expect(screen.getByRole('heading', { level: 2 }).textContent).toMatch(
      /my name is anatoly/i
    );
  });

  it('содержит внешнюю ссылку на rs.school с изображением', () => {
    const rsLink = screen.getByRole('link', { name: /rss scope/i });
    expect(rsLink.getAttribute('href')).toBe('https://rs.school/');

    const img = screen.getByAltText(/rss scope/i);
    expect(img).toBeTruthy();
  });

  it('содержит ссылку "GO HOME" с правильным href', () => {
    const goHomeLink = screen.getByRole('link', { name: /go home/i });
    expect(goHomeLink.getAttribute('href')).toBe('/');
  });
});
