import * as React from 'react'
import { ApolloProvider } from '@apollo/client'
import { initApolloClient } from 'services/apolloService'

export function withApollo(PageComponent: any) {
  const WithApollo = ({ apolloStaticCache, ...pageProps }: any) => {
    const client = initApolloClient(apolloStaticCache)
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    WithApollo.displayName = `withApollo(${displayName})`
  }

  return WithApollo
}