import { gql } from '@apollo/client'

export const SUBSCRIBE_ALL_HOLDINGS = gql`
  subscription subscribeAllHoldings {
    allHoldings {
      nodes {
        id
        userId
        instrumentByInstrumentId {
          code
          description
          lastUpdated
          latestPrice
        }
        amount
        createdAt
      }
    }
  }
`