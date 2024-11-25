import { LoaderFunction, redirect } from 'react-router-dom';
import shortService from '../services/shorts.service';
import { IShort } from '../../../shared/interfaces/short.interface';
import ROUTES, { PARAMS } from '../router/routes';

export const shortLoader: LoaderFunction = async ({
  params,
}): Promise<Response | IShort> => {
  const { [PARAMS.SHORT_ID]: short_id } = params;
  let short = null;

  if (short_id) {
    const response = await shortService.getShort(short_id);
    short = response?.data?.payload;
  }

  return short ? short : redirect(ROUTES.MAIN);
};
