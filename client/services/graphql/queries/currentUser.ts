import { gql } from '@apollo/client'

export const CURRENT_USER = gql`
  query currentUser {
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
