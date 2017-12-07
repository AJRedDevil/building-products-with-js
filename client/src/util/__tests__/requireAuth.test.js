// npm packages
import React from 'react';

// our packages
import {PrivateRoute} from '../requireAuth';

test('# PrivateRoute', () => {
  const Test = () => <div />;
  const location = {pathname: 'jpt'};
  const wrapper = shallow(<PrivateRoute component={Test} location={location} />);
  expect(wrapper).toMatchSnapshot();

  localStorage.setItem('user.token', true);
  const wrapperHome = shallow(<PrivateRoute component={Test} />);
  expect(wrapperHome).toMatchSnapshot();
});
