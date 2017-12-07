// npm packages
import React from 'react';

// our packages
import Footer from '../index';

test('# Footer', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper).toMatchSnapshot();
});
