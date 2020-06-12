import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoggedInHeader from 'components/LoggedInHeader';
import LoggedOutHeader from 'components/LoggedOutHeader';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: '1rem',
    justifyContent: 'center',
  },
}));

type Props = {
  children?: React.FC;
  title?: string;
  loggedIn: boolean;
};

export default function Layout(props: Props) {
  const classes = useStyles();
  const { children, loggedIn } = props;

  return (
    <React.Fragment>
      {loggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}
      <Container maxWidth='xl' className={classes.root}>
        {children}
      </Container>
    </React.Fragment>
  );
}
