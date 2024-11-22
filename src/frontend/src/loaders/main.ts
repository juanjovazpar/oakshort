import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import { shortsLoader } from './shorts';
import { isAuthenticatedGuard } from './authentication';
import { IShort } from '../../../shared/interfaces/short.interface';

export const mainLoader: LoaderFunction = async (
  args: LoaderFunctionArgs
): Promise<{} | Response | IShort[] | null> => {
  const [redirected, shorts] = await Promise.all([
    isAuthenticatedGuard(args),
    shortsLoader(args) as IShort[],
  ]);

  if (redirected) {
    return redirected;
  }

  return shorts;
};
