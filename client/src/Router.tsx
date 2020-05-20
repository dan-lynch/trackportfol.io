import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import ProtectedRoute, { ProtectedRouteProps } from 'components/ProtectedRoute';

const defaultProtectedRouteProps: ProtectedRouteProps = {
  authenticationPath: '/login',
};

const Router = () => (
  <Switch>
    <ProtectedRoute path="/dashboard" component={Dashboard} {...defaultProtectedRouteProps} />
    <ProtectedRoute path="/stock/:stock" component={Dashboard} {...defaultProtectedRouteProps} />
    <Route path="/login" exact component={Login} />
    <Redirect to="/dashboard" />
  </Switch>
);

export default Router;
