import { gql } from '@apollo/client'

export const CURRENT_USER = gql`
  query currentUser {
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
