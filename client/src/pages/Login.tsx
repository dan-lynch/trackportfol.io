import React, { lazy, Suspense } from 'react';
const LoginComponent = lazy(() => import('components/Login'));

type Props = {};

const Login: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginComponent />
      </Suspense>
    </React.Fragment>
  );
};

export default Login;
