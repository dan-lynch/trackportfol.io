import { gql } from '@apollo/client'

export const SUBSCRIBE_CURRENT_USER = gql`
  subscription subscribeCurrentUser {
    currentUser {
      id
      username
      darkTheme
      holdingsByUserId {
        nodes {
          id
          amount
          createdAt
          instrumentId
          instrumentByInstrumentId {
            id
            code
            description
            latestPrice
          }
        }
        totalCount
      }
    }
  }
`
