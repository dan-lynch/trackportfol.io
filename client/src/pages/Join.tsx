import React, { lazy, Suspense } from 'react';
const JoinComponent = lazy(() => import('components/Join'));

type Props = {};

const Join: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <JoinComponent />
      </Suspense>
    </React.Fragment>
  );
};

export default Join;
