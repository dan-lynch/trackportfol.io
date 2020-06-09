import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from 'context/AppContext';
import { userService } from 'services/userService';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const router = useRouter()
  const classes = useStyles()
  const appContext = useContext(AppContext)

  const logout = () => {
    userService.logout()
    appContext.setIsLoggedIn(false)
    router.push('/login')
  };

  return (
    <React.Fragment>
      <AppBar className={classes.header} position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            trackportfol.io
          </Typography>
          <Button color='inherit' onClick={() => router.push('/')}>
              Home
            </Button>
          {appContext.isLoggedIn && (
            <Button color='inherit' onClick={() => router.push('/dashboard')}>
              Dashboard
            </Button>
          )}
          {appContext.isLoggedIn && (
            <Button
              color='inherit'
              onClick={logout}>
              Sign out
            </Button>
          )}
          {!appContext.isLoggedIn && (
            <Button color='inherit' onClick={() => router.push('/login')}>
              Sign in
            </Button>
          )}
          {!appContext.isLoggedIn && (
            <Button color='inherit' onClick={() => router.push('/join')}>
              Sign up
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
