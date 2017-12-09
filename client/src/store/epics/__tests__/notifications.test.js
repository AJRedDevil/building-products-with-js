import {ActionsObservable} from 'redux-observable';

import * as ActionTypes from '../../actionTypes';
import {addNotification} from '../notifications';

// increase test timeout to 6s
// jest.setTimeout(6000);

test('# notifications epic', async() => {
  const payload = {id: 0, test: true};
  const input = {type: ActionTypes.ADD_NOTIFICATION, payload};
  const input$ = ActionsObservable.from([input]);

  await addNotification(input$).subscribe((res) => {
    expect(res).toEqual({
      type: 'REMOVE_NOTIFICATION',
      payload: {notificationId: 0},
    });
  });
});
