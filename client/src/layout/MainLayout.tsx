import React from 'react';
import { Container } from '@material-ui/core';
import TopHeader from 'layout/Header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '1rem',
    justifyContent: 'center',
  },
}));

type Props = {
  children: any;
};

const MainLayout: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TopHeader />
      <Container maxWidth="xl" className={classes.root}>{props.children}</Container>
    </React.Fragment>
  );
};

export default MainLayout;
