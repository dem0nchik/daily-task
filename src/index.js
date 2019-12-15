import React from 'react';
import './styles/main.scss'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store'


setTimeout(() => document.querySelectorAll('body > div')[1].style.display = 'none', 100);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
