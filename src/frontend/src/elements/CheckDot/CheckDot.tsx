import React from 'react';

export interface ICheckDotProps {
  className?: string;
  [key: string]: unknown;
}

const CheckDot: React.FC<ICheckDotProps> = ({
  className = '',
  checked,
  ...props
}) => (
  <input
    type="checkbox"
    className={`appearance-none cursor-pointer py-2 w-5 h-5 bg-gray-300 text-white rounded-full flex items-center justify-center transition duration-100 ease-in-out hover:bg-gray-400 ${checked && 'bg-orange-200 hover:bg-orange-300'} ${className}`}
    {...props}
  />
);

export default CheckDot;
