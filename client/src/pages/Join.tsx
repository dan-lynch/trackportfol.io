import React, { lazy, Suspense } from 'react';
import Layout from 'layout/MainLayout';
const JoinComponent = lazy(() => import('components/Join'));

type Props = {};

const Join: React.FC<Props> = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <JoinComponent />
      </Suspense>
    </Layout>
  );
};

export default Join;
