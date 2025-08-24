import { FC, useState } from 'react';
import { Form, useNavigate } from 'react-router';
import { Button } from '../Button/Button';
import './ProductForm.css';
import { Product } from '../../global';


interface ProductFormProps {
  product?: Product;
  action: 'create' | 'edit';
}

export const ProductForm: FC<ProductFormProps> = ({ product, action }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(product ? product.name : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [category, setCategory] = useState(product ? product.category : '');
  const [photo, setPhoto] = useState(product ? product.pictureUrl : '');
  const [price, setPrice] = useState(product ? product.price.toFixed(2).replace(".", ",") : '');

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/[^0-9]/g, '');
    const formattedPrice = 'R$' + (parseInt(input) / 100).toFixed(2);
    setPrice(formattedPrice.replace('.', ','));
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/products');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const confirmMsg = action === 'edit' ? 'salvar as alterações' : 'criar este produto';
    const confirmed = window.confirm('Tem certeza que deseja ' + confirmMsg + '?');
    if (!confirmed) {
      event.preventDefault();
      return;
    }
    if (action === 'create') resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategory('');
    setPhoto('');
    setPrice('');
  };

  return (
    <Form data-testid="ProductForm" onSubmit={handleSubmit} method='post' className='new-product-form' encType='multipart/form-data'>
      <input type='hidden' name='id' value={product ? product.id : ''} />
      <div className='form-group'>
        <label>Nome</label>
        <input name='name' type='text' value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className='form-group'>
        <label>Categoria</label>
        <input name='category' type='text' value={category} onChange={e => setCategory(e.target.value)} />
      </div>
      <div className='form-group'>
        <label>Preço</label>
        <input name='price' type='text' value={price} onChange={handlePriceChange} />
      </div>
      <div className='form-group'>
        <label>Foto</label>
        <input name='photo' type='url' value={photo} onChange={e => setPhoto(e.target.value)} />
      </div>
      <div className='form-group'>
        <label>Descrição</label>
        <textarea name='description' value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div className='form-actions'>
        <Button type='submit'>{action === 'create' ? 'Criar' : 'Salvar'}</Button>
        <Button className='danger-button' onClick={handleCancel}>Cancelar</Button>
      </div>
    </Form>
  );
}
