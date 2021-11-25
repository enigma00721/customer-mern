import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
// auth context provider
import { AuhtenticationProvider } from './AuthenticationProvider';
// snack notification provider
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  // <React.StrictMode>

    <AuhtenticationProvider>

      <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'top',horizontal: 'right'}}>

        <Router>

          <App />

        </Router>

      </SnackbarProvider>
      
    </AuhtenticationProvider>,

  // </React.StrictMode>,
  document.getElementById('root')
);

