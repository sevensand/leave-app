import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { store } from './components/_helpers/store.js';
import style from './assets/scss/style.scss';

import "bootstrap";

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);


if(module.hot) {
    module.hot.accept();
}
