import React from 'react';
import { shallow } from 'enzyme';

const App = () => {
  return <div>Testing Enzyme</div>
}
describe('App', () => {
  it("renders the test App", () => {
  const result = shallow(<App />).contains(<div>Testing Enzyme</div>);
  expect(result).toBeTruthy();
  })
});