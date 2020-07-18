import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation registerUser($email: String!, $password: String!, $username: String!) {
    registerUser(input: { email: $email, password: $password, username: $username }) {
      user {
        id
        username
        createdAt
      }
    }
  }
`
