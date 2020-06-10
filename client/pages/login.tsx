import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router'
import { Mutation } from '@apollo/react-components';
import Layout from 'components/Layout';
import Link from 'components/Link';
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Collapse,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../context/AppContext';
import { graphqlService } from '../services/graphql';
import { gaService } from '../services/gaService';
import { userService } from '../services/userService';
import { initApolloClient } from 'services/apolloService'
import { withApollo } from 'components/withApollo'

const useStyles = makeStyles(() => ({
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

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [failedMessage, setFailedMessage] = useState<boolean>(false);
  const [registeredMessage, setRegisteredMessage] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();
  const classes = useStyles();

  const appContext = useContext(AppContext);

  async function onConfirm(data: any) {
    const loginResult = await userService.login(data.authenticate);
    if (loginResult) {
      appContext.setIsLoggedIn(true);
      gaService.loginSuccessEvent();
      window.location.replace('/dashboard');
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (appContext.isLoggedIn) {
      window.location.replace('/dashboard');
    }
    if (appContext.signupEmail) {
      setEmail(appContext.signupEmail);
      setRegisteredMessage(true);
      appContext.setSignupEmail('');
    }
  }, [router, appContext]);

  return (
  <Layout title="Sign In | trackportfol.io">
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
          <FormControl fullWidth variant='outlined'>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <OutlinedInput
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.margin}>
          <Mutation
            mutation={graphqlService.LOGIN}
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
                aria-label='Sign in'
                variant='contained'
                fullWidth
                color='primary'
                onClick={() => {
                  setLoading(true);
                  mutation();
                }}>
                {loading ? <CircularProgress size={24} className={classes.loading} /> : 'Sign in'}
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
  </Layout>
  );
}

export async function getStaticProps() {
  const client = await initApolloClient({})
  return {
    unstable_revalidate: 300,
    props: {
      apolloStaticCache: client.cache.extract(),
    },
  }
}

export default withApollo(Login)