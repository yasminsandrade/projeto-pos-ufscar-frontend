import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditProduct } from './EditProduct';

describe('<EditProduct />', () => {
  test('it should mount', () => {
    render(<EditProduct />);

    const editProduct = screen.getByTestId('EditProduct');

    expect(editProduct).toBeInTheDocument();
  });
});