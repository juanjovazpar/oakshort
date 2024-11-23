import { isValidPassword, PASSWORD_RULES } from '../utils/password.util';

export const passwordValidator = (password: string): string | void => {
  if (!isValidPassword(password)) {
    return `This is not a valid password format. ${PASSWORD_RULES}`;
  }
};
