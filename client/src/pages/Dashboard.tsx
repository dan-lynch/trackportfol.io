import React, { lazy, Suspense } from 'react';
const DailyChart = lazy(() => import('components/DailyChart'));

type Props = {};

const Dashboard: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <h2>Dashboard</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <DailyChart />
      </Suspense>
    </React.Fragment>
  );
};

export default Dashboard;
