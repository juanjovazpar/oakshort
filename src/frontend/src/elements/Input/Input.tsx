import React, { useState } from 'react';
import Shake from '../../animations/shake';
import FadeInOut from '../../animations/fadeinout';
import InputMessage from '../InputMessage/InputMessage';

export interface IInputProps {
  className?: string;
  error?: string;
  valid?: boolean;
  disabled?: boolean;
  loading?: boolean;
  validator?: (value: any) => boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}

const Input: React.FC<IInputProps> = ({
  className = '',
  error,
  disabled,
  children,
  loading,
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
            bg-white/30
            outline-none
            px-6
            py-5
            rounded-full
            text-3xl
            transition-all
            duration-300
            ease-in-out
            ${
              disabled
                ? 'cursor-not-allowed text-gray-400 border-gray-400'
                : loading
                  ? 'border-blue-500 animate-pulse'
                  : error
                    ? 'border-red-500'
                    : valid
                      ? 'border-blue-500'
                      : 'border-gray-500'
            }
            ${className}
          `}
          disabled={disabled || loading}
          onChange={onChangeValidator}
          {...restProps}
        />
        {children}
      </Shake>

      <FadeInOut isVisible={!!error}>
        {error && <InputMessage label={error} />}
      </FadeInOut>
    </>
  );
};

export default Input;
