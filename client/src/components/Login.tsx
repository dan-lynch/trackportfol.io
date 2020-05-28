import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { AppContext } from 'context/AppContext';
import { userService } from 'services/userService';
import { Grid, Paper, Typography, Button, TextField, Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { apiService } from 'services/apiService';
import { gaService } from 'services/gaService';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: '32rem',
    padding: '0.5rem 0',
  },
  margin: {
    margin: '0 0.5rem',
  },
  end: {
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
  Registered,
  None,
}

const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.None);

  const history = useHistory();
  const classes = useStyles();
  const appContext = useContext(AppContext);

  async function onConfirm(data: any) {
    const loginResult = await userService.login(data.authenticate);
    if (loginResult) {
      appContext.setIsLoggedIn(true);
      gaService.loginSuccessEvent();
      history.push('/dashboard');
    } else {
      onError('Sign in failed');
    }
  }

  async function onError(error: any) {
    appContext.setIsLoggedIn(false);
    gaService.loginFailedEvent();
    setStatus(Status.Failed);
    console.info(error);
  }

  useEffect(() => {
    if (userService.isLoggedIn) {
      history.push('/dashboard');
    }
    if (appContext.signupEmail) {
      setEmail(appContext.signupEmail);
      setStatus(Status.Registered);
      appContext.setSignupEmail('');
    }
  }, [history, appContext]);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.margin}>
          <Typography variant='h5'>Sign in</Typography>
        </Grid>
        {status === Status.Failed && (
          <Grid item xs={12} className={classes.margin}>
            <Alert severity='error'>Error! Sign in unsuccessful, please try again</Alert>
          </Grid>
        )}
        {status === Status.Registered && (
          <Grid item xs={12} className={classes.margin}>
            <Alert severity='success'>Account created successfully! You can now sign in</Alert>
          </Grid>
        )}
        <Grid item xs={12} className={classes.margin}>
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
        <Grid item xs={12} className={classes.margin}>
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
        <Grid item xs={12} className={classes.margin}>
          <Mutation
            mutation={apiService.loginMutation}
            variables={{ email, password }}
            onCompleted={(data: any) => onConfirm(data)}
            onError={(error: any) => onError(error)}>
            {(mutation: any) => (
              <Button className={classes.button} variant='contained' fullWidth color='primary' onClick={mutation}>
                Log in
              </Button>
            )}
          </Mutation>
        </Grid>
        <Grid item xs={12} className={classes.margin}>
          <Typography variant='body1' align='center'>
            Don't have an account? <Link href='/join'>Sign up</Link>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
