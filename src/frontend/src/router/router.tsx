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
import Verify from '../components/Verify/Verify';
import { mainLoader } from '../loaders/main';
import ROUTES, { PARAMS } from './routes';
import { shortLoader } from '../loaders/short';
import ErrorPage from '../views/layout/components/ErrorPage/ErrorPage';

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
    errorElement: <ErrorPage />,
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
            path: `:${PARAMS.SHORT_ID}`,
            element: <ShortForm />,
            loader: shortLoader,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default ROUTER;
