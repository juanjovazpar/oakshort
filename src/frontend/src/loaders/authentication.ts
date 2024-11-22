import { LoaderFunction, LoaderFunctionArgs, redirect } from 'react-router-dom';
import * as browserStorage from '../utils/sessionStorage.util';
import ROUTES from '../router/routes';

export const isAuthenticatedGuard: LoaderFunction = async (
  args: LoaderFunctionArgs
): Promise<Response | null> => {
  const isAuthenticated = !!browserStorage.getAuthToken();

  if (!isAuthenticated) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
};
