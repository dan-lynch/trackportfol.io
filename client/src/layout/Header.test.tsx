import React from 'react';
import { mount } from 'enzyme';
import HeaderComponent from './Header';

describe('Header', () => {
  it('renders the Header component', () => {
    expect(HeaderComponent).toMatchSnapshot();
  });

  it('displays the trackportfol.io header', () => {
    const result = mount(<HeaderComponent />).contains('trackportfol.io');
    expect(result).toBeTruthy();
  });

  it('displays the trackportfol.io login link when not logged in', () => {
    const result = mount(<HeaderComponent />).contains('Sign in');
    expect(result).toBeTruthy();
  });
});
