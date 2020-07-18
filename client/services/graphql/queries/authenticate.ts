import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
  query authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password)
  }
`
