import React, { lazy, Suspense } from 'react';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Layout from 'layout/MainLayout';
const LoginComponent = lazy(() => import('components/Login'));

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
  },
}));

type Props = {};

const Login: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Suspense fallback={<LinearProgress className={classes.fullWidth} />}>
        <LoginComponent />
      </Suspense>
    </Layout>
  );
};

export default Login;
