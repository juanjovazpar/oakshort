import React from 'react';

export interface IInputMessageProps {
  label: string;
  className?: string;
  [key: string]: unknown;
}

const InputMessage: React.FC<IInputMessageProps> = ({
  label,
  className = '',
}) => <p className={`text-red-500 capitalize ${className}`}>{label}</p>;

export default InputMessage;
