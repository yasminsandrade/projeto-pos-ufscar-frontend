import { FC } from 'react';
import './ProductFilter.css';

interface ProductFilterProps {
  sendQuery: (query: string) => void;
}

export const ProductFilter: FC<ProductFilterProps> = ({ sendQuery }) => {
  function setQuery(data: string) {
    sendQuery(data);
  }

  return (
    <div data-testid="ProductFilter" className="product-filter">
      <input
        name="codigo"
        id="codigo"
        className="search-input"
        type="text"
        placeholder="Buscar produtos..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};