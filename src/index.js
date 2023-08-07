import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import "./styles/index.css";
import './styles/common.css';
import './styles/inputs.css';
import './styles/videoplayer.css';
import './styles/utils.css';

import { store } from './store/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
