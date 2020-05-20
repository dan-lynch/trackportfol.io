import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { userService } from 'services/userService';
import gql from 'graphql-tag';

const REGISTER_MUTATION = gql`
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

const LOGIN_MUTATION = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`;

type Props = {};

const Login: React.FC<Props> = () => {
  const [login, setLogin] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const history = useHistory();

  async function onConfirm(data: any) {
    if (login) {
      const { jwtToken } = data.authenticate;
      if (jwtToken) {
        await userService.login(jwtToken);
        history.push('/dashboard');
      } else {
        onError('Login failed');
      }
    } else {
      setLogin(true);
      setMessage('Account created successfully! You can now login.');
    }
  }

  async function onError(error: any) {
    console.error(error);
    if (login) {
      setMessage('Login failed!');
    } else {
      setMessage('Register failed!');
    }
  }

  useEffect(() => {
    if (userService.loggedInUser) {
      history.push('/dashboard');
    }
  }, [history]);

  return (
    <div>
      <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
      <h5>{message}</h5>
      <div className="flex flex-column">
        {!login && (
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="First name"
          />
        )}
        {!login && (
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last name" />
        )}
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email address" />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={login ? LOGIN_MUTATION : REGISTER_MUTATION}
          variables={{ firstName, lastName, email, password }}
          onCompleted={(data: any) => onConfirm(data)}
          onError={(error: any) => onError(error)}
        >
          {(mutation: any) => (
            <div className="pointer mr2 button" onClick={mutation}>
              {login ? 'login' : 'create account'}
            </div>
          )}
        </Mutation>
        <div className="pointer button" onClick={() => setLogin(!login)}>
          {login ? 'need to create an account?' : 'already have an account?'}
        </div>
      </div>
    </div>
  );
};

export default Login;
