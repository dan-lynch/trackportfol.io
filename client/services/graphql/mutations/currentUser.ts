import { gql } from '@apollo/client'

export const CURRENT_USER = gql`
  mutation currentUser {
    currentUser(input: {}) {
      user {
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
  }
`
