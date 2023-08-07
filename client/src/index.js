import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { loadUser, setAuth } from './redux/auth/auth-actions';
import store from './store';

// Проверяем наличие токена в localStorage
const token = localStorage.getItem('token');

if (token) {
  // Если пользователь есть в localStorage, устанавливаем его в store
  store.dispatch(loadUser());
  // И устанавливаем значение isAuthenticated в true
  store.dispatch(setAuth(true));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
