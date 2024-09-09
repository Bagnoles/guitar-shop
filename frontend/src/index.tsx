import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import App from './components/app/app';
import { store } from './store';
import { checkAuthStatus, fetchGuitars } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchGuitars());
store.dispatch(checkAuthStatus());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
