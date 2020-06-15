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
              code
              description
              id
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
