import { gql } from '@apollo/client'

export const VALIDATE_USER= gql`
  mutation validateUser($token: String!) {
    validateUser(input: { token: $token }) {
      validUser {
        success
      }
    }
  }
`
