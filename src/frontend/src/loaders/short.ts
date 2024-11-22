import { LoaderFunction, redirect } from 'react-router-dom';
import shortService from '../services/shorts.service';
import { IShort } from '../../../shared/interfaces/short.interface';
import ROUTES from '../router/routes';

export const shortLoader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}): Promise<Response | IShort> => {
  const url = new URL(request.url);
  const hasShortParam = url.searchParams.has('short');
  const id = url.searchParams.get('short');
  let short;

  if (hasShortParam && id) {
    const response = await shortService.getShort(id);
    short = response?.data?.payload;
  }

  return short ? short : redirect(ROUTES.MAIN);
};
