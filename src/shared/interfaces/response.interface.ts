export interface IResponse {
  payload?: any;
  error?: string | IResponseError;
  message: string;
}

export interface IResponseError {
  [key: string]: string;
}
