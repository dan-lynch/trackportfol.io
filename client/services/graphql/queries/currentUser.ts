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
}
`
