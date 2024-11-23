import { IResponseError } from '../interfaces/response.interface';

export const requestErrorHandler = (error: any): IResponseError => {
  if (error.code === 11000) {
    const duplicatedProperties: string[] = Object.keys(error.keyValue);

    return duplicatedProperties.reduce(
      (acc: { [key: string]: string }, curr: string) => ({
        ...acc,
        [curr]: `Property '${curr}' must be unique in this collection.`,
      }),
      {}
    );
  }

  return error;
};
