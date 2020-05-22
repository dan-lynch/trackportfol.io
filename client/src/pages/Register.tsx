import React, { lazy, Suspense } from 'react';
const ResgisterComponent = lazy(() => import('components/Register'));

type Props = {};

const Register: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <ResgisterComponent />
      </Suspense>
    </React.Fragment>
  );
};

export default Register;
