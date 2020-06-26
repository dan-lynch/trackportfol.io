import { gql } from '@apollo/client'

export const SEARCH_INSTRUMENTS = gql`
  query searchInstruments($search: String!, $firstLetter: String!) {
    allInstruments(
      filter: { name: { includesInsensitive: $search }, or: { name: { startsWithInsensitive: $firstLetter } } }
      first: 10
    ) {
      nodes {
        code
        description
        id
      }
    }
  }
`
