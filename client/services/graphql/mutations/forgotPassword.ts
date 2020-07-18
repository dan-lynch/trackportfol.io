import { gql } from '@apollo/client'

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($emailInput: String!) {
    forgotPassword(input: { emailInput: $emailInput }) {
      boolean
    }
  }
`
