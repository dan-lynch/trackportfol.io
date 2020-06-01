import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'typeface-roboto';
import App from './App';
import { userService } from 'services/userService';
import { API_URL } from 'helpers/constants';


const cache = new InMemoryCache();

const token = userService.isLoggedIn && userService.token ? `Bearer ${userService.token.authToken}` : null;

const client = new ApolloClient({
  cache,
  uri: API_URL,
  headers: token ? {
    authorization: token || '',
  } : {},
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
