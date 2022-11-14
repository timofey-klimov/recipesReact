import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { VechaiProvider } from '@vechaiui/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <VechaiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VechaiProvider>
  </Provider>
);
