import { LoaderFunction } from 'react-router-dom';
import { IShort } from '../../../shared/interfaces/short.interface';
import shortService from '../services/shorts.service';

export const shortsLoader: LoaderFunction = async (): Promise<IShort[]> => {
  const response = await shortService.getShorts();
  return [];
};
