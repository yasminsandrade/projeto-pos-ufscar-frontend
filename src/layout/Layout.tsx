import { Outlet, useNavigate } from 'react-router';
import { Button } from '../components/Button/Button';
import './Layout.css';


export const Layout = () => {
  const navigate = useNavigate();

  const handleClickOption = (path: string) => {
    navigate(path);
  };

  return (
    <div className='layout'>
      <header className='layout-header'>
        <h2>Projeto E-commerce</h2>
      </header>
      <section className='layout-section'>
        <aside>
          <Button className='layout-button' onClick={() => handleClickOption('/products')}>Produtos</Button>
          <Button className='layout-button' onClick={() => handleClickOption('/new-product')}>Novo produto</Button>
          <Button className='layout-button' onClick={() => handleClickOption('/new-product-bulk')}>Novos produtos em massa</Button>
        </aside>
        <main><Outlet /></main>
      </section>
    </div>
  );
};
