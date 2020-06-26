import { gql } from '@apollo/client'

export const SUBSCRIBE_CURRENT_USER = gql`
  subscription subscribeCurrentUser {
    currentUser {
      id
      username
      darkTheme
      holdingsByUserId {
        nodes {
          instrumentByInstrumentId {
            id
            code
            description
            latestPrice
          }
          createdAt
          amount
        }
        totalCount
      }
    }
  }
`
