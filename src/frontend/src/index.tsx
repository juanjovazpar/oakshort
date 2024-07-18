import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './views/Layout';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
