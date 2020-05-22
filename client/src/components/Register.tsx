import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { userService } from 'services/userService';
import gql from 'graphql-tag';
import { Container, Grid, Paper, Typography, Button, TextField, Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles(() => ({
  register: {
    minWidth: '5rem',
    minHeight: '5rem',
  },
  gridItem: {
    alignItems: 'center',
    justify: 'center',
    margin: '0 2rem',
  },
  login: {
    alignItems: 'flex-end',
    textAlign: 'end',
  },
  button: {
    backgroundColor: 'black',
    '&:hover' : {
      backgroundColor: 'black'
    },
  },
}));

type Props = {};

enum Status {
  Success,
  Failed,
  None,
}

const Register: React.FC<Props> = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.None);

  const history = useHistory();
  const classes = useStyles();

  async function onConfirm(data: any) {
    setStatus(Status.Success);
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
    <Container className={classes.register} maxWidth='sm'>
      <Paper>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography variant='h4'>Create account</Typography>
          </Grid>
          {status === Status.Success && (
            <Grid item xs={12} className={classes.gridItem}>
              <Alert severity='success'>
                Account created successfully! You can now <Link href='/login'>Login</Link>
              </Alert>
            </Grid>
          )}
          {status === Status.Failed && (
            <Grid item xs={12} className={classes.gridItem}>
              <Alert severity='error'>Error! Account was not created, please try again</Alert>
            </Grid>
          )}
          <Grid item xs={12} className={classes.gridItem}>
            <TextField
              id='firstname'
              name='firstname'
              label='First Name'
              variant='outlined'
              fullWidth
              autoComplete='on'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <TextField
              id='lastname'
              name='lastname'
              label='Last Name'
              variant='outlined'
              fullWidth
              autoComplete='on'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
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
                  mutation={REGISTER_MUTATION}
                  variables={{ firstName, lastName, email, password }}
                  onCompleted={(data: any) => onConfirm(data)}
                  onError={(error: any) => onError(error)}>
                  {(mutation: any) => (
                    <Button className={classes.button} variant='contained' color='primary' onClick={mutation}>
                      Register
                    </Button>
                  )}
                </Mutation>
              </Grid>
              <Grid item className={classes.login} xs={6}>
                <Button variant='outlined' onClick={() => history.push('/login')}>
                  Go To Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Register;
