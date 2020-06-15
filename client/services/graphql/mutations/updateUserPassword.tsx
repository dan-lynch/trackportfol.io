import { gql } from '@apollo/client'

export const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword($oldPassword: String!, $newPassword: String!) {
    updateUserPassword(input: { oldPassword: $oldPassword, newPassword: $newPassword }) {
      updatedUserPassword {
        success
      }
    }
  }
`
