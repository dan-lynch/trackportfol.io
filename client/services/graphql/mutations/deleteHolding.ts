import { gql } from '@apollo/client'

export const DELETE_HOLDING = gql`
  mutation deleteHolding($id: Int!) {
    deleteHoldingById(input: { id: $id }) {
      userByUserId {
        username
        id
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
