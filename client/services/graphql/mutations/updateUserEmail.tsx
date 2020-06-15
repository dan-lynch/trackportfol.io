import { gql } from '@apollo/client'

export const UPDATE_USER_EMAIL = gql`
  mutation updateUserEmail($newEmail: String!) {
    updateUserEmail(input: { newEmail: $newEmail }) {
      updatedUserEmail {
        success
        updatedEmail
      }
    }
  }
`
