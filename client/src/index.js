import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import {store} from './state/store/configStore';
import { tokenVerified } from './state/reducers/userReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const renderApp = async () => {
  const token = localStorage.getItem('token');
  if(token){
    const headers = {
      'Content-Type' : 'application/json',
      'Accepts' : 'application/json',
      'Authorization' : `Bearer ${token}`
    };
    const method = 'POST';
    const result = await fetch('http://localhost:8000/verifyToken',{
      headers,
      method
    }).then(res => res.json());
    if(result.success){
      store.dispatch(tokenVerified(result));
    }
  }
}
renderApp();