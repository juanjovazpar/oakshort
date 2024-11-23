import { IResponseError } from '../interfaces/response.interface';
import { emailValidator } from './email.validator';
import { passwordValidator } from './password.validator';
import { URLValidator } from './url.validator';

const VALIDATORS: Record<string, (value: any) => string | void> = {
  email: emailValidator,
  password: passwordValidator,
  url: URLValidator,
};

export const validateBody = (form: { [key: string]: any }): void => {
  const keys: string[] = Object.keys(form);
  const errors: IResponseError = {};

  for (let key of keys) {
    const validator = VALIDATORS[key];
    if (validator) {
      const error = validator(form[key]);
      if (error) {
        errors[key] = error;
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    throw errors;
  }
};
