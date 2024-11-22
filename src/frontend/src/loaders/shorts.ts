import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import { IShort } from '../../../shared/interfaces/short.interface';
import shortService from '../services/shorts.service';

export const shortsLoader: LoaderFunction = async (
  args: LoaderFunctionArgs
): Promise<IShort[] | null> => {
  const response = await shortService.getShorts();
  return response.data.payload;
};
