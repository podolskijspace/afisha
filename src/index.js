import './base-styles/common.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import store from './store'
import App from './components/app/App';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);