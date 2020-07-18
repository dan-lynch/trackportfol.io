import { gql } from '@apollo/client'

export const UPDATE_HOLDING = gql`
  mutation updateHolding($id: Int!, $amount: BigFloat!) {
    updateHoldingById(
      input: { holdingPatch: { amount: $amount }, id: $id }
    ) {
      userByUserId {
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
        }
      }
    }
  }
`
