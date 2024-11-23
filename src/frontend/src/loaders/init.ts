import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import shortService from '../services/shorts.service';
import { IShort } from '../../../shared/interfaces/short.interface';

export const initLoader: LoaderFunction = async (
  args: LoaderFunctionArgs
): Promise<{ shorts: IShort[] }> => {
  const response = await shortService.getShorts();
  console.log('INIT_LOADER', response.data.payload);
  return { shorts: [] };
};
