import React from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';
import './i18n';
import Layout from './views/layout/Layout';
import store from './store';
import Main from './views/layout/components/Main/Main';
import Veil from './views/layout/components/Veil/Veil';
import ShortInput from './components/ShortInput/ShortInput';
import { shortsLoader } from './loaders/shorts';
import { initLoader } from './loaders/init';
import Forgotten from './components/Forgotten/Forgotten';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ROUTES from './routes';
import NotFound from './views/layout/components/NotFound/NotFound';
import FadeIn from './animations/fadein';
import ShortForm from './components/ShortForm/ShortForm';
import { SHORT_MOCKS } from './mocks/shorts.mocks';

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
];

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        element: <Veil />,
        loader: initLoader,
        children: VEIL_COMPONENTS.map(({ path, component }, key) => ({
          path,
          element: <FadeIn>{component}</FadeIn>,
          key,
        })),
      },
      {
        path: ROUTES.MAIN,
        element: <Main />,
        loader: shortsLoader,
        children: [
          {
            path: '',
            element: <ShortForm short={SHORT_MOCKS[0]} />,
            loader: ({ request }) => {
              const url = new URL(request.url);
              const hasShortParam = url.searchParams.has('short');
              return hasShortParam ? {} : redirect(ROUTES.MAIN);
            },
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
