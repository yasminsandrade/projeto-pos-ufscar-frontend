import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import axios from "axios";

import { Layout } from "./layout/Layout";
import { ProductList } from "./pages/ProductList/ProductList";
import { NewProduct } from "./pages/NewProduct/NewProduct";
import { EditProduct } from "./pages/EditProduct/EditProduct";
import { Product, RawProduct } from "./global";
import { NewProductBulk } from "./pages/NewProductBulk/NewProductBulk";

const API_URL = 'http://localhost:3001/api/product';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'products',
        element: <ProductList />,
        loader: async () => {
          try {
            const response = await axios.get(API_URL);
            return (response.data as Product[]).map(product => ({
              ...product,
              code: product.id,
              photo: product.pictureUrl,
            }));
          }
          catch (error) {
            console.log(error);
            alert(error);
          }
        },
        action: async ({ request }) => {
          const formData = await request.formData();
          const productId = formData.get('id') as string;
          try {
            return await axios.delete(API_URL + '/' + productId).then(function (response) {
              alert('Produto excluído com sucesso!');
            })
              .catch(function (error) {
                console.log(error);
                alert('Erro ao excluir produto. Verifique os dados e tente novamente.');
              });
          }
          catch (error) {
            console.log(error);
            alert(error);
          }
        },
      },
      {
        path: 'new-product',
        element: <NewProduct />,
        action: async ({ request }) => {
          const formData = await request.formData();
          try {
            const product: RawProduct = {
              name: formData.get('name') as string,
              description: formData.get('description') as string,
              price: parseFloat((formData.get('price') as string).replace('R$', '').replace(',', '.')),
              category: formData.get('category') as string,
              pictureUrl: formData.get('photo') as string,
            };
            return await axios.post(API_URL, product).then(function (response) {
              alert('Produto criado com sucesso!');
            })
              .catch(function (error) {
                console.log(error);
                alert('Erro ao criar produto. Verifique os dados e tente novamente.');
              });
          }
          catch (error) {
            console.log(error);
            alert(error);
          }
        },
      },
      {
        path: 'edit-product/:productId',
        element: <EditProduct />,
        loader: async ({ params }) => {
          const { productId } = params;
          try {
            const response = await axios.get(API_URL + '/' + productId);
            const product = response.data as Product;
            return {
              ...product,
              code: product.id,
              photo: product.pictureUrl,
            };
          }
          catch (error) {
            console.log(error);
            alert(error);
          }
        },
        action: async ({ request }) => {
          const formData = await request.formData();
          const productId = formData.get('id') as string;
          try {
            const product: Product = {
              id: Number(productId),
              name: formData.get('name') as string,
              description: formData.get('description') as string,
              price: parseFloat((formData.get('price') as string).replace('R$', '').replace(',', '.')),
              category: formData.get('category') as string,
              pictureUrl: formData.get('photo') as string,
            };
            return await axios.put(API_URL + '/' + product.id, product).then(function (response) {

              alert('Produto atualizado com sucesso!');
            })
              .catch(function (error) {
                console.log(error);
                alert('Erro ao atualizar produto. Verifique os dados e tente novamente.');
              });
          }
          catch (error) {
            console.log(error);
            alert(error);
          }
        },
      },
      {
        path: 'new-product-bulk',
        element: <NewProductBulk />,
        action: async ({ request }) => {
          const formData = await request.formData();
          try {
            const product: RawProduct = {
              name: formData.get('name') as string,
              description: formData.get('description') as string,
              price: parseFloat((formData.get('price') as string).replace('R$', '').replace(',', '.')),
              category: formData.get('category') as string,
              pictureUrl: formData.get('photo') as string,
            };
            return await axios.post(API_URL, product).then(function (response) {
              alert('Produto criado com sucesso!');
            })
              .catch(function (error) {
                console.log(error);
                alert('Erro ao criar produto. Verifique os dados e tente novamente.');
              });
          }
          catch (error) {
            console.log(error);
            alert(error);
          }
        },
      },
    ],
  }
]);

export function Routes() {
  return <RouterProvider router={router} />;
}