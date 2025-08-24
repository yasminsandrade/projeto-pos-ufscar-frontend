import React, { useRef } from 'react';
import { Button } from '../Button/Button';
import { RawProduct } from '../../global';

interface FileUploadProps {
  onFileSelect: (products: RawProduct[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  function handleFileChange (event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const headers = lines[0].split(',').map(h => h.trim());
        const rawProducts: RawProduct[] = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          const product: any = {};
          headers.forEach((header, idx) => {
            if (values[idx] !== undefined && values[idx] !== '') {
              product[header] = values[idx];
            }
          });
          return product as RawProduct;
        });
        const parsedProducts = rawProducts.filter(value => Object.keys(value).length !== 0);
        onFileSelect(parsedProducts);
      };
      reader.readAsText(file);
    } else if (file) {
      alert('Por favor, selecione um arquivo CSV.');
      event.target.value = '';
    }
  };


  return (
    <div data-testid="FileUpload">
      <Button type="button" onClick={handleButtonClick}>Enviar arquivo CSV</Button>
      <input
        type="file"
        accept=".csv,text/csv"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};