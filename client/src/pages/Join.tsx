import React, { lazy, Suspense } from 'react';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Layout from 'layout/MainLayout';
const JoinComponent = lazy(() => import('components/Join'));

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
  },
}));

type Props = {};

const Join: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Suspense fallback={<LinearProgress className={classes.fullWidth} />}>
        <JoinComponent />
      </Suspense>
    </Layout>
  );
};

export default Join;
