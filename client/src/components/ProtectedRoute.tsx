import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { userService } from 'services/userService';

export interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const authenticated = userService.loggedInUser;

  if (!authenticated) {
    const renderComponent = () => <Redirect to={{ pathname: props.authenticationPath }} />;
    return <Route {...props} component={renderComponent} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
