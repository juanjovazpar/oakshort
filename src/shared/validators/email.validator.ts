import { isValidEmail } from '../utils/email.util';

export const emailValidator = (email: string): string | void => {
  if (!isValidEmail(email)) {
    return 'This is not a valid email.';
  }
};
