import { isValidURL } from './../utils/url.utils';

export const URLValidator = (url: string): string | void => {
  if (!isValidURL(url)) {
    return 'This is not a valid url.';
  }
};
