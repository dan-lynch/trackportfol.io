import { gql } from '@apollo/client'

export const DELETE_HOLDING = gql`
  mutation deleteHoldingByUserIdAndInstrumentId($userId: Int!, $instrumentId: Int!) {
    deleteHoldingByUserIdAndInstrumentId(input: {userId: $userId, instrumentId: $instrumentId}) {
      query {
        currentUser {
          firstName
          lastName
          id
          holdingsByUserId {
            nodes {
              amount
              instrumentByInstrumentId {
                code
                description
                id
              }
            }
          }
        }
      }
    }
  }
`;