import gql from 'graphql-tag';

const loginMutation = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`;

const registerMutation = gql`
  mutation registerUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    registerUser(input: { email: $email, password: $password, firstName: $firstName, lastName: $lastName }) {
      user {
        id
        firstName
        lastName
        createdAt
      }
    }
  }
`;

const currentUser = gql`
  query currentUser {
    currentUser {
      createdAt
      firstName
      id
      lastName
      holdingsByUserId {
        nodes {
          instrumentByInstrumentId {
            code
            description
          }
          createdAt
          amount
        }
        totalCount
      }
    }
  }
`;

const allInstruments = gql`
  query allInstruments {
    allInstruments {
      nodes {
        code
        description
        id
      }
    }
  }
`;

export const apiService = {
  loginMutation,
  registerMutation,
  currentUser,
  allInstruments,
};
