import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client'
import { onError } from '@apollo/link-error'
import { setContext } from '@apollo/link-context'
import { API_URL } from 'helpers/constants'
import { userService } from 'services/userService'

global.fetch = require('node-fetch')

let globalApolloClient: any = null

function createIsomorphLink() {
  return new HttpLink({
    uri: API_URL,
  })
}

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map((err) => {
      console.warn(err.message)
    })
  }
  if (networkError) {
    console.warn(networkError)
  }
})

const authLink = setContext((_, { headers }) => {
  const token = userService.token
  const authorization = token ? `Bearer ${token}` : null
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
      }
})

const link = ApolloLink.from([errorLink, authLink, createIsomorphLink()])

export function createApolloClient(initialState = {}) {
  const ssrMode = typeof window === 'undefined'
  const cache = new InMemoryCache().restore(initialState)

  return new ApolloClient({
    ssrMode,
    link,
    cache,
  })
}

export function initApolloClient(initialState = {}) {
  if (typeof window === 'undefined') {
    return createApolloClient(initialState)
  }

  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState)
  }

  return globalApolloClient
}
