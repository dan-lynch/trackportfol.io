import { gql } from '@apollo/client'

export const DELETE_HOLDING = gql`
  mutation deleteHolding($userId: Int!, $instrumentId: Int!) {
    deleteHoldingByUserIdAndInstrumentId(input: { userId: $userId, instrumentId: $instrumentId }) {
      userByUserId {
        username
        id
        holdingsByUserId {
          nodes {
            amount
            instrumentByInstrumentId {
              id
              code
              description
              latestPrice
            }
          }
        }
      }
    }
  }
`
