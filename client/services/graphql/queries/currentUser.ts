import { gql } from '@apollo/client'

export const CURRENT_USER = gql`
query currentUser {
  currentUser {
    createdAt
    userId
    displayName
    email
    emailVerified
    phoneNumber
    prefersDarkTheme
    lastLoginAt
  }
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
`
