import { gql } from '@apollo/client'

export const DELETE_HOLDING = gql`
  mutation deleteHolding($id: Int!) {
    deleteHoldingById(input: {id: $id}) {
      deletedHoldingId
      query {
        allHoldings {
          nodes {
            id
            userId
            instrumentByInstrumentId {
              code
              description
              lastUpdated
              latestPrice
            }
            amount
            createdAt
          }
        }
      }
    }
  }
`
