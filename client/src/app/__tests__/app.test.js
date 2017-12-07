// npm packages
import React from 'react';

// our packages
import App from '../index';

test('# App', () => {
  const Test = () => <div />;
  const wrapper = shallow(<App><Test /></App>);
  expect(wrapper).toMatchSnapshot();
});
