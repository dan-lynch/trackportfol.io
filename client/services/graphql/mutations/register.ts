import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation registerUser($email: String!, $password: String!, $username: String!) {
    registerUser(input: { email: $email, password: $password, username: $username }) {
      user {
        id
        username
        createdAt
      }
    }
  }
`;