import React, { FC } from 'react';
import { ProductForm } from '../../components/ProductForm/ProductForm';
import { useLoaderData } from 'react-router';
import { Product } from '../../global';


interface EditProductProps { }

export const EditProduct: FC<EditProductProps> = () => {
  const product = useLoaderData() as Product;

  return (
    <div>
      <ProductForm action='edit' product={product} />
    </div>
  );
};
