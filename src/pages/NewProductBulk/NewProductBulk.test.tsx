import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NewProductBulk } from './NewProductBulk';

describe('<NewProductBulk />', () => {
  test('it should mount', () => {
    render(<NewProductBulk />);

    const newProductBulk = screen.getByTestId('NewProductBulk');

    expect(newProductBulk).toBeInTheDocument();
  });
});