import { gql } from '@apollo/client'

export const SUBSCRIBE_CURRENT_USER = gql`
  subscription subscribeCurrentUser {
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
