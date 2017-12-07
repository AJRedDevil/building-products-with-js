// npm packages
import React from 'react';
import configureMockStore from 'redux-mock-store';

// our packages
import UserWrapper, {User} from '../index';
import {convertDateToISOString} from '../../../util';

// create mockstore
const mockStore = configureMockStore();

const user = {
  id: 0,
  login: 'test',
  registrationDate: convertDateToISOString(new Date(2017, 1, 1, 1, 1, 1)),
};

test('# UserWrapper', () => {
  const store = mockStore();
  const wrapper = shallow(<UserWrapper user={user} store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# User', () => {
  const newLogin = 'newLogin';
  const updateUser = ({login}) => expect(login).toBe(newLogin);

  const component = (
    <User
      user={user}
      updateUser={updateUser}
      edit
    />
  );
  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // test user update
  const app = mount(component);
  // set new usernane
  app.find('#userInput').getDOMNode().value = newLogin;
  // click answer button
  app.find('button').simulate('click');
});
