import { IShort } from '../../../shared/interfaces/short.interface';
import shortService from '../services/shorts.service';

export const shortsLoader = async (): Promise<IShort[]> => {
  const response = await shortService.getShorts();
  return response?.data?.payload;
};
