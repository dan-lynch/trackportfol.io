import React from 'react';
import { shallow } from 'enzyme';
import LoginComponent from './Login';

describe('Login', () => {
  it('renders the Login component', () => {
    expect(LoginComponent).toMatchSnapshot();
  });

  it('displays the Login title (Sign in)', () => {
    const result = shallow(<LoginComponent />).contains('Sign in');
    expect(result).toBeTruthy();
  });
});
