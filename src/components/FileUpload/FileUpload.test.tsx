import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FileUpload } from './FileUpload';

describe('<FileUpload />', () => {
  test('it should mount', () => {
    render(<FileUpload onFileSelect={jest.fn()} />);

    const fileUpload = screen.getByTestId('FileUpload');

    expect(fileUpload).toBeInTheDocument();
  });
});