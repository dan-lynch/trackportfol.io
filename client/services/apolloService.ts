
import { onError } from '@apollo/link-error'
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client'
import { API_URL } from 'helpers/constants'

global.fetch = require('node-fetch')

let globalApolloClient: any = null

function createIsomorphLink() {
  return new HttpLink({
    uri: "http://localhost:5433/graphql",
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

const link = ApolloLink.from([errorLink, createIsomorphLink()])

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