import React, { lazy, Suspense } from 'react';
const DashboardComponent = lazy(() => import('components/Dashboard'));

type Props = {};

const Dashboard: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardComponent />
      </Suspense>
    </React.Fragment>
  );
};

export default Dashboard;
