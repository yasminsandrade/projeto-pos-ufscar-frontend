import { FC } from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => (
  <button data-testid="Button"className={`${className} button`} {...props}>
    {children}
  </button>
);
