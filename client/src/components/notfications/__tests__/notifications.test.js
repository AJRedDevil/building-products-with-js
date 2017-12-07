// npm packages
import React from 'react';
import configureMockStore from 'redux-mock-store';

// our packages
import Notifications from '../index';

// create mockstore
const mockStore = configureMockStore();

test('# Notifications', () => {
  const store = mockStore({});
  const wrapper = shallow(<Notifications store={store} />);
  expect(wrapper).toMatchSnapshot();
});
