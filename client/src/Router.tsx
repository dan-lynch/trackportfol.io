import React from 'react';
import { Router as ReactRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from 'pages/Login';
import Join from 'pages/Join';
import Dashboard from 'pages/Dashboard';
import ProtectedRoute, { ProtectedRouteProps } from 'components/ProtectedRoute';
import ReactGA from 'react-ga';

const defaultProtectedRouteProps: ProtectedRouteProps = {
  authenticationPath: '/login',
};

const history = createBrowserHistory();

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const Router = () => (
  <ReactRouter history={history}>
    <Switch>
      <ProtectedRoute path='/dashboard' component={Dashboard} {...defaultProtectedRouteProps} />
      <ProtectedRoute path='/stock/:stock' component={Dashboard} {...defaultProtectedRouteProps} />
      <Route path='/login' component={Login} />
      <Route path='/join' component={Join} />
      <Redirect to='/dashboard' />
    </Switch>
  </ReactRouter>
);

export default Router;
