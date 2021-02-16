import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import{ Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';

//.env var dont work
// const myDomain = process.env.REACT_APP_AUTH0_DOMAIN; need to get API keys out of main
// const myClientId = process.env.REACT_APP_AUTH0_CLIENT_ID;


ReactDOM.render(

  
  <Auth0Provider
    domain = {'angelageorge.us.auth0.com'}
    clientId = {'yhC1e1aALnX47IHMCLq3vJTrueekAfnT'}
    redirectURi = {window.location.origin}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
