import React from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menu: {
    width: 250,
  },
}));

export default function LoggedOutHeader() {
  const router = useRouter();
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            trackportfol.io
          </Typography>
            <Button color='inherit' onClick={() => router.push('/login')}>
              Sign in
            </Button>
            <Button color='inherit' onClick={() => router.push('/join')}>
              Sign up
            </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}