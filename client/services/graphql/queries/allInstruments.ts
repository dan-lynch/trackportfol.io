import { gql } from '@apollo/client'

export const ALL_INSTRUMENTS = gql`
  query allInstruments {
    allInstruments {
      nodes {
        code
        description
        id
      }
    }
  }
`
