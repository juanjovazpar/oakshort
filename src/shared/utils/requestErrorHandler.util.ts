import { IResponseError } from '../interfaces/response.interface';

export const requestErrorHandler = (error: any): IResponseError => {
  console.log('REQUEST_ERROR_HANDLER', error);
  if (error.code === 11000) {
    const duplicatedProperties: string[] = Object.keys(error.keyValue);

    return duplicatedProperties.reduce(
      (acc: { [key: string]: string }, curr: string) => ({
        ...acc,
        [curr]: `Property '${curr}' must be unique in this collection.`,
      }),
      {}
    );
  } else if (error.name === 'ValidationError') {
    // TODO: Improve validation errors from Mongoose
    const errors: IResponseError = {};
    const errorMessages: string[] = Object.keys(error.errors);

    errorMessages.forEach((errorMessage: string) => {
      const errorMessageObject: IResponseError = error.errors[errorMessage];
      errors[errorMessage] = errorMessageObject.message;
    });

    return errors;
  }

  return error;
};
