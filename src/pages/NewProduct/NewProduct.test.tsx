import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NewProduct } from './NewProduct';

describe('<NewProduct />', () => {
  test('it should mount', () => {
    render(<NewProduct />);

    const newProduct = screen.getByTestId('NewProduct');

    expect(newProduct).toBeInTheDocument();
  });
});