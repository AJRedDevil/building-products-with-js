// npm packages
import React from 'react';
import configureMockStore from 'redux-mock-store';
import {MemoryRouter} from 'react-router';

// our packages
import LoginPage, {Login} from '../index';
import {convertDateToISOString} from '../../../util';

// create mockstore
const mockStore = configureMockStore();

const user = {
  id: 0,
  login: 'test',
  registrationDate: convertDateToISOString(new Date(2017, 1, 1, 1, 1, 1)),
};

test('# Login page wrapper', () => {
  const store = mockStore({auth: {user}});
  const wrapper = shallow(<LoginPage store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Login page', () => {
  const newLogin = 'test';
  const newPassword = '123';
  const token = 'test';
  const navToHome = () => expect(true);
  const onLoginClick = ({login, password, remember}) => {
    expect(login).toBe(newLogin);
    expect(password).toBe(newPassword);
    expect(remember).toBeTruthy();
  };

  const component = (
    <Login
      token={token}
      navToHome={navToHome}
      onLoginClick={onLoginClick}
    />
  );
  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();


  // mount for testing
  const app = mount(<MemoryRouter initialEntries={[{pathname: '/', key: 'testKey'}]}>{component}</MemoryRouter>);
  // set new login, pass and remember
  app.find('#inputUsername').getDOMNode().value = newLogin;
  app.find('#inputPassword').getDOMNode().value = newPassword;
  app.find('#inputRemember').getDOMNode().checked = true;
  // click login button
  app.find('button').simulate('click');
});
