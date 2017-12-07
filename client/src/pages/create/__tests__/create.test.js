// npm packages
import React from 'react';
import configureMockStore from 'redux-mock-store';
import {MemoryRouter} from 'react-router';

// our packages
import CreatePage, {Create} from '../index';
import {convertDateToISOString} from '../../../util';

// create mockstore
const mockStore = configureMockStore();

const user = {
  id: 0,
  login: 'test',
  registrationDate: convertDateToISOString(new Date(2017, 1, 1, 1, 1, 1)),
};

test('# Create page wrapper', () => {
  const store = mockStore({auth: {user}});
  const wrapper = shallow(<CreatePage store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Create page', () => {
  const newText = 'newText';
  const newExpirationDate = new Date(2017, 1, 1, 1, 1, 1, 1);
  const doCreateQuestion = ({text, expirationDate}) => {
    expect(text).toBe(newText);
    expect(expirationDate).toBeNull();
  };

  const component = (
    <MemoryRouter
      initialEntries={[{pathname: '/', key: 'testKey'}]}
    >
      <Create
        user={user}
        doCreateQuestion={doCreateQuestion}
      />
    </MemoryRouter>
  );
  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // test user update
  const app = mount(component);
  // set new question text
  app.find('#questionText').getDOMNode().value = newText;
  // set new question expiration date
  // TODO: Date isn't set. Reason: unknown
  app.find('#expirationDate').getDOMNode().value = newExpirationDate;
  // click answer button
  app.find('button').simulate('click');
});
