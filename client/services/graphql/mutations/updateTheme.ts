import { gql } from '@apollo/client'

export const UPDATE_THEME = gql`
  mutation updateTheme($userDarkTheme: Boolean!) {
    updateTheme(input: { userDarkTheme: $userDarkTheme }) {
      updatedTheme {
        success
      }
    }
  }
`
