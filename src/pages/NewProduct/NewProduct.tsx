import { FC } from 'react';

import './NewProduct.css';
import { ProductForm } from '../../components/ProductForm/ProductForm';

export const NewProduct: FC = () => {
  return (
    <div>
      <ProductForm action='create' />
    </div>
  )
}
