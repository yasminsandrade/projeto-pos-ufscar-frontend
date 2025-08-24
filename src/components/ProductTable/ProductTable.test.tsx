import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductTable } from './ProductTable';

describe('<ProductTable />', () => {
  test('it should mount', () => {
    render(<ProductTable products={[]} />);

    const productTable = screen.getByTestId('ProductTable');

    expect(productTable).toBeInTheDocument();
  });
});