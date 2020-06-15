import { gql } from '@apollo/client'

export const UPDATE_USERNAME = gql`
  mutation updateUsername($newUsername: String!) {
    updateUsername(input: { newUsername: $newUsername }) {
      updatedUsername {
        success
        updatedUsername
      }
    }
  }
`
