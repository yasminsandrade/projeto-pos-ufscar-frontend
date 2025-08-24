import { FC, useState } from 'react';
import { FileUpload } from '../../components/FileUpload/FileUpload';
import { RawProduct } from '../../global';
import { ProductTable } from '../../components/ProductTable/ProductTable';


interface NewProductBulkProps { }

export const NewProductBulk: FC<NewProductBulkProps> = () => {
  const [showUpload, setShowUpload] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [products, setProducts] = useState<RawProduct[]>([]);
  const onFileSelect = (selectedProducts: RawProduct[]) => {
    setShowUpload(false);
    setShowTable(true);
    setProducts(selectedProducts);
  };

  return (
    <>
      {showUpload && <FileUpload onFileSelect={onFileSelect} />}
      {showTable && <ProductTable products={products} />}
    </>
  );
};
