import { gql } from '@apollo/client'

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      createdAt
      firstName
      id
      lastName
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
`;