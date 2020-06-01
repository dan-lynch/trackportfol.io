import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import 'typeface-roboto';
import App from './App';
import { API_URL, TOKEN } from 'helpers/constants';

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN) || null;
  const authorization = token ? `Bearer ${JSON.parse(token).authToken}` : null;
  return token
    ? {
        headers: {
          ...headers,
          authorization,
        },
      }
    : {
        headers: {
          ...headers,
        },
      };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
