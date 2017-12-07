// npm packages
import React from 'react';
import configureMockStore from 'redux-mock-store';

// our packages
import NotificationWrapper, {Notification} from '../notification';

// create mockstore
const mockStore = configureMockStore();

const notification = {
  id: 0,
  text: 'Test',
  alertType: 'info',
};

test('# NotificationWrapper', () => {
  const store = mockStore({});
  const wrapperEmptyNotification = shallow(<NotificationWrapper store={store} />);
  expect(wrapperEmptyNotification).toMatchSnapshot();

  const wrapperWithNotification = shallow(<NotificationWrapper notification={notification} store={store} />);
  expect(wrapperWithNotification).toMatchSnapshot();
});

test('# Notification', () => {
  const onClick = id => expect(id).toBe(notification.id);
  const component = <Notification onRemoveNotificationClick={onClick} />;
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();
  // test interaction
  const app = mount(component);
  const item = app.find('button');
  item.simulate('click');
});

