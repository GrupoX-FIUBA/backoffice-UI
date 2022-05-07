import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './context/authContext';
import './index.css';
import Router from './infrastructure/routes/Router'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

