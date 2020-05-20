import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { API_URL } from 'helpers/constants';
import { userService } from 'services/userService';
import 'index.css';

const httpLink = createHttpLink({
  uri: `${API_URL}`,
});

const authLink = setContext((_, { headers }) => {
  const currentUser = userService.loggedInUser;
  if (currentUser) {
    return {
      headers: {
        ...headers,
        authorization: currentUser ? `Bearer ${currentUser.authToken}` : '',
      },
    };
  } else {
    return {
      headers: {
        ...headers,
      },
    };
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
