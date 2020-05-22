import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { AppContext } from 'context/AppContext';
import { userService } from 'services/userService';
import gql from 'graphql-tag';
import { Container, Grid, Paper, Typography, Button, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const LOGIN_MUTATION = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`;

const useStyles = makeStyles(() => ({
  login: {
    minWidth: '5rem',
    minHeight: '5rem',
  },
  gridItem: {
    alignItems: 'center',
    justify: 'center',
    margin: '0 2rem',
  },
  register: {
    alignItems: 'flex-end',
    textAlign: 'end',
  },
  button: {
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
}));

type Props = {};

enum Status {
  Success,
  Failed,
  None,
}

const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.None);

  const history = useHistory();

  const classes = useStyles();

  async function onConfirm(data: any) {
    const { jwtToken } = data.authenticate;
    if (jwtToken) {
      setStatus(Status.Success);
      await userService.login(jwtToken);
      history.push('/dashboard');
    } else {
      onError('Login failed');
    }
  }

  async function onError(error: any) {
    setStatus(Status.Failed);
    console.error(error);
  }

  useEffect(() => {
    if (userService.loggedInUser) {
      history.push('/dashboard');
    }
  }, [history]);

  return (
    <AppContext.Consumer>
      {({ isLoggedIn, setIsLoggedIn }) => (
        <Container className={classes.login} maxWidth='sm'>
          <Paper>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.gridItem}>
                <Typography variant='h4'>Login</Typography>
              </Grid>
              {status === Status.Success && (
                <Grid item xs={12} className={classes.gridItem}>
                  <Alert severity='success'>You have logged in successfully, redirecting to dashboard...</Alert>
                </Grid>
              )}
              {status === Status.Failed && (
                <Grid item xs={12} className={classes.gridItem}>
                  <Alert severity='error'>Error! Login unsuccessful, please try again</Alert>
                </Grid>
              )}
              <Grid item xs={12} className={classes.gridItem}>
                <TextField
                  id='email'
                  name='email'
                  label='Email Address'
                  variant='outlined'
                  fullWidth
                  autoComplete='on'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <TextField
                  id='password'
                  name='password'
                  label='Choose Password'
                  variant='outlined'
                  fullWidth
                  value={password}
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Grid container>
                  <Grid item xs={6}>
                    <Mutation
                      mutation={LOGIN_MUTATION}
                      variables={{ email, password }}
                      onCompleted={(data: any) => onConfirm(data)}
                      onError={(error: any) => onError(error)}>
                      {(mutation: any) => (
                        <Button className={classes.button} variant='contained' color='primary' onClick={mutation}>
                          Login
                        </Button>
                      )}
                    </Mutation>
                  </Grid>
                  <Grid item className={classes.register} xs={6}>
                    <Button variant='outlined' onClick={() => history.push('/register')}>
                      Create Account
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}
    </AppContext.Consumer>
  );
};

export default Login;
