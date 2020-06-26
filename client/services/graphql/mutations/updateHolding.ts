import { gql } from '@apollo/client'

export const UPDATE_HOLDING = gql`
  mutation updateHolding($userId: Int!, $instrumentId: Int!, $amount: BigFloat!) {
    updateHoldingByUserIdAndInstrumentId(
      input: { holdingPatch: { amount: $amount }, userId: $userId, instrumentId: $instrumentId }
    ) {
      userByUserId {
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
