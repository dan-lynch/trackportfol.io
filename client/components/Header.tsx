import React from 'react';
import { useRouter } from 'next/router'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from 'context/AppContext';

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
  const classes = useStyles();

  return (
    <AppContext.Consumer>
      {({ isLoggedIn, setIsLoggedIn, userService }) => (
        <React.Fragment>
          <AppBar className={classes.header} position='static'>
            <Toolbar>
              <Typography variant='h6' className={classes.title}>
                trackportfol.io
              </Typography>
              <Button color='inherit' onClick={() => router.push('/')}>
                  Home
                </Button>
              {isLoggedIn && (
                <Button color='inherit' onClick={() => router.push('/dashboard')}>
                  Dashboard
                </Button>
              )}
              {isLoggedIn && (
                <Button
                  color='inherit'
                  onClick={() => userService.logout() && setIsLoggedIn(false) && router.push('/login')}>
                  Sign out
                </Button>
              )}
              {!isLoggedIn && (
                <Button color='inherit' onClick={() => router.push('/login')}>
                  Sign in
                </Button>
              )}
              {!isLoggedIn && (
                <Button color='inherit' onClick={() => router.push('/join')}>
                  Sign up
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </React.Fragment>
      )}
    </AppContext.Consumer>
  );
};
