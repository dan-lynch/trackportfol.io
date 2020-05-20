import React, { lazy, Suspense } from 'react';
const Login = lazy(() => import('components/Login'));

type Props = {};

const Dashboard: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <h2>Login</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    </React.Fragment>
  );
};

export default Dashboard;
