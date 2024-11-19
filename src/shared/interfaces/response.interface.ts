export interface IResponse {
  payload?: any;
  error?: string | IFormError;
  message: string;
}

export interface IFormError {
  [key: string]: string;
}
