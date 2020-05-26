import React, { lazy, Suspense } from 'react';
import Layout from 'layout/MainLayout';
const DashboardComponent = lazy(() => import('components/Dashboard'));

type Props = {};

const Dashboard: React.FC<Props> = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardComponent />
      </Suspense>
    </Layout>
  );
};

export default Dashboard;
