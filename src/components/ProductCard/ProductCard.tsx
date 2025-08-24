import { FC } from 'react';

import './ProductCard.css';
import { Product } from '../../global';
import { Button } from '../Button/Button';
import {
  useNavigate,
  useFetcher,
} from 'react-router';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/edit-product/${product.id}`);
  };
  
  const fetcher = useFetcher();
  const deleteProduct = () => {
    const confirmed = window.confirm('Tem certeza que deseja excluir este produto?');
    if (!confirmed) {
      return;
    }
    const formData = new FormData();
    formData.append("id", product.id.toString());
    fetcher.submit(formData, { method: "delete", action: "/products" });
  };

  return (
    <div className="product-card" data-testid="ProductCard">
      <div className="img-container">
        <img src={product.pictureUrl} alt={product.name} />
      </div>
      <div className="card-content">
        <div className="product-details">
          <div className="product-title">
            <div className="truncate-title">({product.id}) {product.name}</div>
          </div>
          <p className="product-info">{product.category}</p>
          <p className="product-info">
            R${product.price.toFixed(2).replace(".", ",")}
          </p>
        </div>
        <div className="card-actions">
          <Button onClick={handleEditClick}>Editar</Button>
          <Button onClick={deleteProduct} className="danger-button" type="submit">Excluir</Button>
        </div>
      </div>
    </div>
  );
};
