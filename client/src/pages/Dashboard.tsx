import React, { lazy, Suspense } from 'react';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Layout from 'layout/MainLayout';
const DashboardComponent = lazy(() => import('components/Dashboard'));

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
  },
}));

type Props = {};

const Dashboard: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Suspense fallback={<LinearProgress className={classes.fullWidth} />}>
        <DashboardComponent />
      </Suspense>
    </Layout>
  );
};

export default Dashboard;
