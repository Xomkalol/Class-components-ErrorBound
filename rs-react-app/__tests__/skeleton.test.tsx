import { expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/dom';
import '@testing-library/jest-dom/vitest';
import { it, describe } from 'vitest';
import SkeletonLoader from '../src/components/skeleton/skeleton';

describe('Skeleton component', () => {
  it('should render with default count (5)', () => {
    render(<SkeletonLoader />);

    const container = screen.getByTestId('skeleton-container');
    expect(container).toBeInTheDocument();

    const items = screen.getAllByTestId('skeleton-item');
    expect(items).toHaveLength(5);
  });
});
