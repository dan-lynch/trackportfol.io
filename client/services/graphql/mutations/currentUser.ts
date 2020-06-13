import { gql } from '@apollo/client'

export const CURRENT_USER = gql`
  mutation currentUser($clientMutationId: String!) {
    currentUser(input: {clientMutationId: $clientMutationId}) {
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
`;