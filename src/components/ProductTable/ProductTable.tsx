import { FC, useState } from 'react';
import { RawProduct } from '../../global';
import { Button } from '../Button/Button';
import { useFetcher } from 'react-router';
import './ProductTable.css';


interface ProductTableProps {
  products: RawProduct[];
}

export const ProductTable: FC<ProductTableProps> = ({ products }) => {
  const fetcher = useFetcher();
  const [tableProducts, setTableProducts] = useState<RawProduct[]>(products);
  const [createdProducts, setCreatedProducts] = useState<RawProduct[]>([]);
  const handleCreate = (product: RawProduct) => {
    const confirmed = window.confirm('Tem certeza que deseja criar este produto?');
    if (!confirmed) {
      return;
    }
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('photo', product.pictureUrl);
    fetcher.submit(formData, { method: "post", action: "/new-product-bulk" }).then(() => {
      setTableProducts(tableProducts.filter(p => p !== product));
      setCreatedProducts([...createdProducts, product]);
    });

  };
  return (
    <>
      {tableProducts.length > 0 && (
        <>
          <h2>Produtos do Arquivo</h2>
          <table className='products-table'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>URL da Imagem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tableProducts.map((product, i) => (
                <tr key={i}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.pictureUrl}</td>
                  <td>
                    <Button type="button" onClick={() => handleCreate(product)}>Criar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {createdProducts.length > 0 && (
        <>
          <h2>Produtos Criados</h2>
          <table title='Produtos Criados' className='products-table'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>URL da Imagem</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {createdProducts.map((product, i) => (
                <tr key={i}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.pictureUrl}</td>
                  <td>Criado com sucesso</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
