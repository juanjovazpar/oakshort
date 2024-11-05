import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';
import './i18n';

import Layout from './views/layout/Layout';
import store from './store';
import Dashboard from './components/Dashboard/Dashboard';
import Main from './views/layout/components/Main/Main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<Dashboard />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Dashboard />} />
              <Route path="/register" element={<Dashboard />} />
              <Route path="/forgotten" element={<Dashboard />} />
            </Route>

            <Route element={<Main />}>
              <Route path="/hi" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
