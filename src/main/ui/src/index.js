import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {store} from './store/store';
import {Provider} from 'react-redux';

let wsSourceUrl;

if (process.env.NODE_ENV !== 'development') {
    wsSourceUrl = `${window.location.protocol}//${window.location.host}/handler`;
} else if (process.env.NODE_ENV === 'development') {
    wsSourceUrl = `${window.location.protocol}//localhost:8080/handler`;
}


ReactDOM.render(
        <Provider store={store}>
            <App wsSourceUrl={wsSourceUrl}/>
        </Provider>,
    document.getElementById('root')
);


