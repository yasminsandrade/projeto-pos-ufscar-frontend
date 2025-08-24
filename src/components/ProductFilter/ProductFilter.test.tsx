import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductFilter } from './ProductFilter';

describe('<ProductFilter />', () => {
  test('it should mount', () => {
    render(<ProductFilter sendQuery={jest.fn()} />);

    const productFilter = screen.getByTestId('ProductFilter');

    expect(productFilter).toBeInTheDocument();
  });
});