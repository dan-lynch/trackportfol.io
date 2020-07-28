import { gql } from '@apollo/client'

export const CREATE_HOLDING = gql`
  mutation createHolding($userId: String!, $instrumentId: Int!, $amount: BigFloat!) {
    createHolding(input: {holding: { userId: $userId, instrumentId: $instrumentId, amount: $amount }}) {
      holding {
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
