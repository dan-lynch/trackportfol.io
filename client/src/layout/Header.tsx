import React from 'react';
import { useHistory } from 'react-router-dom';
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

type Props = {};

const Header: React.FC<Props> = (props) => {

  const classes = useStyles();

  const history = useHistory();

  return (
    <AppContext.Consumer>
      {({ isLoggedIn, setIsLoggedIn, userService }) => (
      <AppBar className={classes.header} position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            trackportfol.io
          </Typography>
          {isLoggedIn && (
            <Button color='inherit' onClick={() => history.push('/dashboard')}>
              Dashboard
            </Button>
          )}
          {isLoggedIn && (
            <Button color='inherit' onClick={() => userService.logout() && setIsLoggedIn(false) && history.push('/login')}>
              Sign out
            </Button>
          )}
          {!isLoggedIn && (
            <Button color='inherit' onClick={() => history.push('/login')}>
              Sign in
            </Button>
          )}
          {!isLoggedIn && (
            <Button color='inherit' onClick={() => history.push('/join')}>
              Sign up
            </Button>
          )}
        </Toolbar>
      </AppBar>
      )}
    </AppContext.Consumer>
  );
};

export default Header;
