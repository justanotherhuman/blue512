import { shallow } from 'enzyme';
import React from 'react';
import NavBar from '../components/Navbar';

describe('Nav Bar component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<NavBar />);
  });
  test('it renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
