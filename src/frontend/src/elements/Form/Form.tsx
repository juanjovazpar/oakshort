import React, { cloneElement, useState } from 'react';
import FadeInOut from '../../animations/fadeinout';
import InputMessage from '../../elements/InputMessage/InputMessage';
import { IResponseError } from '../../../../shared/interfaces/response.interface';

interface IFormProps {
  onSubmit: (data: any) => Promise<void>;
  children: any;
  className?: string;
  [key: string]: unknown;
}

const Form: React.FC<IFormProps> = ({
  onSubmit,
  children,
  className = '',
  ...props
}) => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [errorForm, setErrorForm] = useState<IResponseError>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    e.preventDefault();

    setLoading(true);
    setErrorMsg(undefined);

    try {
      await onSubmit(data);
    } catch (e: any) {
      setErrorForm(e.error);
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(undefined);
    setErrorForm({});
  };

  const enhanceChildren = (children: React.ReactNode): React.ReactNode =>
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const enhancedProps: Record<string, any> = {
          loading,
          error: errorForm?.[child.props.name],
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e);
            if (child.props.onChange) {
              child.props.onChange(e);
            }
          },
        };

        if (child.props.children) {
          enhancedProps.children = enhanceChildren(child.props.children);
        }

        return cloneElement(child, enhancedProps);
      }

      return child;
    });

  return (
    <form onSubmit={handleSubmit} className={className} {...props}>
      {enhanceChildren(children)}

      <FadeInOut isVisible={!!errorMsg}>
        {errorMsg && <InputMessage label={errorMsg} />}
      </FadeInOut>
    </form>
  );
};

export default Form;
