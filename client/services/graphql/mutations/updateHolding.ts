import { gql } from '@apollo/client'

export const UPDATE_HOLDING = gql`
  mutation updateHolding($id: Int!, $amount: BigFloat!) {
    updateHoldingById(input: {holdingPatch: {amount: $amount}, id: $id}) {
      holding {
        amount
        id
      }
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
