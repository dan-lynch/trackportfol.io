import React from 'react';
import { Container } from '@material-ui/core';
import TopHeader from 'layout/Header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

type Props = {
  children: any;
};

const MainLayout: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TopHeader />
      <div className={classes.offset} />
      <Container>{props.children}</Container>
    </React.Fragment>
  );
};

export default MainLayout;
