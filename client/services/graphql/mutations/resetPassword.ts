import { gql } from '@apollo/client'

export const RESET_PASSWORD = gql`
  mutation resetPassword($token: UUID!, $newPassword: String!) {
    resetPassword(input: { token: $token, newPassword: $newPassword  }) {
      boolean
    }
  }
`
