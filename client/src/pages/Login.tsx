import React, { lazy, Suspense } from 'react';
import Layout from 'layout/MainLayout';
const LoginComponent = lazy(() => import('components/Login'));

type Props = {};

const Login: React.FC<Props> = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginComponent />
      </Suspense>
    </Layout>
  );
};

export default Login;
