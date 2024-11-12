import React from 'react';

export interface IRangeProps {
  className?: string;
  [key: string]: unknown;
}

const Range: React.FC<IRangeProps> = ({
  className = '',
  checked,
  ...props
}) => (
  <input
    type="range"
    className={`h-5 rounded-full appearance-none cursor-pointer bg-gray-300 dark:bg-orange-300 accent-orange-200 dark:accent-orange-300 ${className}`}
    {...props}
  />
);

export default Range;
