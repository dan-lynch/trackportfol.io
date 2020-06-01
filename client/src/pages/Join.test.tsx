import React from 'react';
import { shallow } from 'enzyme';
import JoinPage from './Join';
import JoinComponent from 'components/Join';

describe('Join', () => {
  it('renders the Join page', () => {
    expect(JoinPage).toMatchSnapshot();
  });

//   it('renders the Join component within the Join page', async () => {
//     const app = await shallow(<JoinPage />, { suspenseFallback: false });
//     expect(app.contains(<JoinComponent />)).toBeTruthy();
//   });
});
