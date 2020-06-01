import React from 'react';
import { shallow } from 'enzyme';
import JoinComponent from './Join';

describe('Join', () => {
  it('renders the Join component', () => {
    expect(JoinComponent).toMatchSnapshot();
  });

  it('displays the Join title (Create your account)', () => {
    const result = shallow(<JoinComponent />).contains('Create your account');
    expect(result).toBeTruthy();
  });
});
