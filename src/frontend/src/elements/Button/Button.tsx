import React from 'react';
import Loading from '../Loading/Loading';

interface IFormProps {
  loading?: boolean;
  [key: string]: unknown;
}

const Button: React.FC<IFormProps> = ({
  loading,
  className = '',
  ...props
}) => (
  <button
    disabled={loading}
    className={`
        absolute
        right-2.5
        inset-y-2
        aspect-square
      text-white
        px-6
        py-5
        rounded-full
        text-3xl
        font-thin
        capitalize
      hover:bg-gray-700
        transition-all
        duration-300
        ease-in-out
      bg-gray-600
        ${className}
      `}
    {...props}
  >
    {loading && <Loading />}
  </button>
);

export default Button;
