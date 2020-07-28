import { gql } from '@apollo/client'

export const UPDATE_DISPLAY_NAME = gql`
  mutation updateDisplayName($newDisplayName: String!) {
    updateDisplayName(input: {newDisplayName: $newDisplayName}) {
      clientMutationId
      updatedDisplayName {
        success
        updatedDisplayName
      }
    }
  }
`
