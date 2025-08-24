import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router';

describe('<ProductCard />', () => {
  test('it should mount', () => {
    const mockProduct = {
      id: 1,
      name: 'Test Product',
      price: 10.0,
      description: 'A test product description',
      category: 'Test Category',
      pictureUrl: 'https://example.com/test-product.jpg',
    };

    const router = createMemoryRouter([
      {
        path: '/',
        element: <div>Parent Route<Outlet /></div>,
        children: [
          {
            path: 'product',
            element: <ProductCard product={mockProduct} />,
          },
        ],
      },
    ], {
      initialEntries: ['/product'],
    });

    render(<RouterProvider router={router} />);

    const productCard = screen.getByTestId('ProductCard');

    expect(productCard).toBeInTheDocument();
  });
});