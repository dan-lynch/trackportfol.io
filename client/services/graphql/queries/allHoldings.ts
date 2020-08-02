import { gql } from '@apollo/client'

export const ALL_HOLDINGS = gql`
  query allHoldings {
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