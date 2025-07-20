import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ApiErrorBanner from '../src/components/api/apiErrorBanner';
import '@testing-library/dom';
import '@testing-library/jest-dom/vitest';

describe('ApiErrorBanner', () => {
  afterEach(() => {
    cleanup();
  });

  it('отображает переданное сообщение об ошибке', () => {
    const errorMessage = 'Connection failed';
    render(<ApiErrorBanner error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('не показывает кнопку Retry без пропса onRetry', () => {
    render(<ApiErrorBanner error="Error" />);
    expect(screen.queryByText(/retry/i)).not.toBeInTheDocument();
  });

  describe('с пропсом onRetry', () => {
    it('отображает кнопку Retry', () => {
      render(<ApiErrorBanner error="Error" onRetry={vi.fn()} />);
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    });

    it('вызывает onRetry при клике', () => {
      const mockRetry = vi.fn();
      render(<ApiErrorBanner error="Error" onRetry={mockRetry} />);

      const retryButton = screen.getByRole('button', { name: 'Retry' });
      fireEvent.click(retryButton);

      expect(mockRetry).toHaveBeenCalledTimes(1);
    });
  });
});
