import React from 'react';
import { shallow } from 'enzyme';
import ProtectedRouteComponent, { ProtectedRouteProps } from './ProtectedRoute';

const defaultProtectedRouteProps: ProtectedRouteProps = {
  authenticationPath: '/login',
};

const ProtectedApp = () => {
  return <div>Private page</div>;
};

describe('ProtectedRoute', () => {
  it('renders the ProtectedRoute component', () => {
    expect(ProtectedRouteComponent).toMatchSnapshot();
  });

  it('does not display the component when not logged in', () => {
    const result = shallow(
      <ProtectedRouteComponent path='/test' component={ProtectedApp} {...defaultProtectedRouteProps} />
    ).contains(<ProtectedApp />);
    expect(result).toBeFalsy();
  });

  it('does not display the component contents when not logged in', () => {
    const result = shallow(
      <ProtectedRouteComponent path='/test' component={ProtectedApp} {...defaultProtectedRouteProps} />
    ).contains('Private page');
    expect(result).toBeFalsy();
  });
});
