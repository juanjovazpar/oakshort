import React, { useState } from 'react';
import Shake from '../../animations/shake';
import FadeInOut from '../../animations/fadeinout';

export interface IInputProps {
  className?: string;
  error?: string;
  valid?: boolean;
  disabled?: boolean;
  validator?: (value: any) => boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}

const Input: React.FC<IInputProps> = ({
  className = '',
  error,
  disabled,
  children,
  validator,
  ...props
}) => {
  const { onChange, ...restProps } = props;
  const [valid, setValid] = useState(false);

  // Bypassing the `onChange` method, if defined, to execute the validator
  const onChangeValidator: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    validator && setValid(validator(e.target.value));
    props.onChange?.(e);
  };

  return (
    <>
      <Shake shaking={!!error} className="relative">
        <input
          className={`
          w-full
          border-2
          border-gray-${disabled ? '400' : '500'}
          bg-white/30
          outline-none
          px-6
          py-5
          rounded-full
          text-3xl
          transition-colors
          duration-300
          ease-in-out
          ${className}
          ${error && 'border-red-500'}
          ${valid && 'border-green-500'}
          ${disabled && 'cursor-not-allowed text-gray-400'}
        `}
          disabled={disabled}
          onChange={onChangeValidator}
          {...restProps}
        />
        {children}
      </Shake>
      <FadeInOut isVisible={!!error}>
        <p className="text-red-500 capitalize">{error}</p>
      </FadeInOut>
    </>
  );
};

export default Input;
