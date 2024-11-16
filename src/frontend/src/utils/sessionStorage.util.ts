export const AUTH_TOKEN_KEY = 'authToken';

export const setItem = (key: string, value: any): void =>
  sessionStorage.setItem(key, value);

export const getItem = (key: string): any => sessionStorage.getItem(key);

export const getAuthToken = (): string | null =>
  sessionStorage.getItem(AUTH_TOKEN_KEY);

export const setAuthToken = (value: any): void =>
  sessionStorage.setItem(AUTH_TOKEN_KEY, value);
