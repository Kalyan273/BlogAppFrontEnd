import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Auth0Provider
    domain="dev-7koug4ccbn8cflje.us.auth0.com"
    clientId="VD3JI2mv0DGDgNDfj45Z3zsBkVKLsUIG"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,

)
