import { gql } from '@apollo/client'

export const GET_USER_EMAIL = gql`
  query getUserEmail {
    getUserEmail {
      email
    }
  }
`
