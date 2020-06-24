import { gql } from '@apollo/client'

export const CURRENT_USER_UPDATED = gql`
  subscription currentUserUpdated {
    currentUserUpdated {
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
      event
    }
  }
`
