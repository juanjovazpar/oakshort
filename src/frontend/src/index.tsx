import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';
import './i18n';
import { AnimatePresence } from 'framer-motion';
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

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.key}>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route element={<Veil />} loader={initLoader}>
            {VEIL_COMPONENTS.map(({ path, component }, key) => (
              <Route
                key={key}
                path={path}
                element={<FadeIn>{component}</FadeIn>}
              ></Route>
            ))}
          </Route>
          <Route
            path={ROUTES.MAIN}
            element={<Main />}
            loader={shortsLoader}
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AnimatedRoutes />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
