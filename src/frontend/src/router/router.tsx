import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../views/layout/Layout';
import Main from '../views/layout/components/Main/Main';
import Veil from '../views/layout/components/Veil/Veil';
import ShortInput from '../components/ShortInput/ShortInput';
import { initLoader } from '../loaders/init';
import Forgotten from '../components/Forgotten/Forgotten';
import Signin from '../components/Signin/Signin';
import Signup from '../components/Signup/Signup';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import NotFound from '../views/layout/components/NotFound/NotFound';
import ShortForm from '../components/ShortForm/ShortForm';
import { SHORT_MOCKS } from '../mocks/shorts.mocks';
import Verify from '../components/Verify/Verify';
import { mainLoader } from '../loaders/main';
import ROUTES from './routes';

export const VEIL_COMPONENTS = [
  {
    path: ROUTES.HOME,
    component: <ShortInput />,
    label: 'VEIL_SECTION.CUTTER_LINK',
  },
  {
    path: ROUTES.SIGNIN,
    component: <Signin />,
    label: 'VEIL_SECTION.SIGNIN_LINK',
  },
  {
    path: ROUTES.SIGNUP,
    component: <Signup />,
    label: 'VEIL_SECTION.SIGNUP_LINK',
  },
  {
    path: ROUTES.FORGOTTEN,
    component: <Forgotten />,
    label: 'VEIL_SECTION.FORGOTTEN_LINK',
  },
  {
    path: ROUTES.RESET_PASSWORD,
    component: <ResetPassword />,
  },
  {
    path: ROUTES.VERIFY,
    component: <Verify />,
  },
];

const ROUTER = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        element: <Veil />,
        loader: initLoader,
        children: VEIL_COMPONENTS.map(({ path, component }, key) => ({
          path,
          element: component,
          key,
        })),
      },
      {
        path: ROUTES.MAIN,
        element: <Main />,
        loader: mainLoader,
        children: [
          {
            path: '',
            element: <ShortForm short={SHORT_MOCKS[0]} />,
            /* loader: ({ request }) => {
              const url = new URL(request.url);
              const hasShortParam = url.searchParams.has('short');
              return hasShortParam ? {} : redirect(ROUTES.MAIN);
            }, */
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default ROUTER;
