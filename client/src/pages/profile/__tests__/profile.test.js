// npm packages
import React from 'react';
import {MemoryRouter} from 'react-router';
import configureMockStore from 'redux-mock-store';

// our packages
import ProfilePage, {Profile} from '../index';

// create mockstore
const mockStore = configureMockStore();

const user = {
  id: 0,
  login: 'test',
};
const match = {
  isExact: true,
  params: {
    id: 0,
    login: 'test',
  },
  path: '/',
  url: 'http://localhost',
};

test('# Profile page wrapper', () => {
  const store = mockStore({auth: {user}, users: {user}});
  const wrapper = shallow(<ProfilePage match={match} store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Profie page', () => {
  const getUser = (u) => {
    expect(u).toEqual(user);
  };

  const component = (
    <Profile
      getUser={getUser}
      match={match}
      user={user}
      loadedUser={user}
    />
  );
  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();
});
