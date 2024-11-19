import { redirect } from 'react-router-dom';

export const protectedLoader = async ({ request }: { request: Request }) => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return redirect('/login');
  }

  return null;
};
