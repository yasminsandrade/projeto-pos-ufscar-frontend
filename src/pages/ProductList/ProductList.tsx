import { FC, useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';

import './ProductList.css';
import { ProductFilter } from '../../components/ProductFilter/ProductFilter';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product } from '../../global';

interface ProductListProps { }

export const ProductList: FC<ProductListProps> = () => {
  const [query, setQuery] = useState<string>('');
  const [renderedProducts, setRenderedProducts] = useState<React.ReactNode[]>([]);
  const productList = useLoaderData() as Product[];


  function handleQueryInput(data: string) {
    setQuery(data);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let listedProducts = productList;
      if (query.length > 0) {
        listedProducts = productList.filter((product) => {
          return product.id.toString().includes(query.toLowerCase());
        });
      }
      if (listedProducts.length === 0 && query !== '') {
        setRenderedProducts([<p className="no-results">Nenhum produto encontrado.</p>]);
        return;
      }
      setRenderedProducts(listedProducts.map(product => <ProductCard key={`product-${product.id}`} product={product} />));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query, productList]);


  return (
    <div>
      <div className="product-filter-container">
        <ProductFilter sendQuery={handleQueryInput} />
      </div>
      <div className="product-list">{renderedProducts}</div>
    </div>
  )
}
