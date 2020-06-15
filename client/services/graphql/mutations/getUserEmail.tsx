import { gql } from '@apollo/client'

export const GET_USER_EMAIL = gql`
  mutation getUserEmail {
    getUserEmail(input: {}) {
        userEmail {
          email
        }
      }
    }
`
