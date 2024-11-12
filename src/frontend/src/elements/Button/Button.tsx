import React from 'react';

export interface IPingProps {
  label?: string;
  className?: string;
  [key: string]: unknown;
}

const Button: React.FC<IPingProps> = ({ label, className = '', ...props }) => (
  <button
    className={`py-2 w-5 h-5 bg-gray-300 text-white rounded-full flex items-center justify-center transition duration-100 ease-in-out hover:bg-gray-400 ${className}`}
    type="button"
    {...props}
  >
    {label}
  </button>
);

export default Button;
