import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { AppContext } from 'context/AppContext';
import { userService } from 'services/userService';
import { Grid, Paper, Typography, Button, TextField, Link, CircularProgress, Collapse } from '@material-ui/core';
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
  loading: {
    color: 'white',
  },
  collapse: {
    width: '100%',
    margin: '0px 1rem',
  },
}));

type Props = {};

const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [failedMessage, setFailedMessage] = useState<boolean>(false);
  const [registeredMessage, setRegisteredMessage] = useState<boolean>(false);

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
    setFailedMessage(true);
    console.info(error);
  }

  useEffect(() => {
    if (userService.isLoggedIn) {
      history.push('/dashboard');
    }
    if (appContext.signupEmail) {
      setEmail(appContext.signupEmail);
      setRegisteredMessage(true);
      appContext.setSignupEmail('');
    }
  }, [history, appContext]);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.margin}>
          <Typography variant='h5'>Sign in</Typography>
        </Grid>
        <Collapse in={failedMessage} className={classes.collapse}>
          <Grid item xs={12} className={classes.margin}>
            <Alert severity='error' onClose={() => setFailedMessage(false)}>
              Sign in unsuccessful, please try again
            </Alert>
          </Grid>
        </Collapse>
        <Collapse in={registeredMessage} className={classes.collapse}>
          <Grid item xs={12} className={classes.margin}>
            <Alert severity='success' onClose={() => setRegisteredMessage(false)}>
              Account created successfully! You can now sign in
            </Alert>
          </Grid>
        </Collapse>
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
            onCompleted={(data: any) => {
              setLoading(false);
              onConfirm(data);
            }}
            onError={(error: any) => {
              setLoading(false);
              onError(error);
            }}>
            {(mutation: any) => (
              <Button
                className={classes.button}
                variant='contained'
                fullWidth
                color='primary'
                onClick={() => {
                  setLoading(true);
                  mutation();
                }}>
                {loading ? <CircularProgress size={24} className={classes.loading} /> : 'Log in'}
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
