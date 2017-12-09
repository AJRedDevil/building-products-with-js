// npm packages
import {Observable} from 'rxjs/Observable';

// our packages
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {loginErrorToMessage, registerErrorToMessage} from '../../util';

// ASCII diagram for Rx streams (see: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
//
// Success login:
// --(DO_LOGIN|)
//        switchMap(credentials => ajax)
// -------------(token|)
//        mergeMap
// -------------(LOGIN_SUCCESS with token|)
// -------------(ADD_NOTIFICATION with login success|)
//
// Failed login:
// --(DO_LOGIN|)
//         switchMap(credentials => ajax)
// -------------(X|)
//         catch
// -------------(LOGIN_ERROR, ADD_NOTIFICATION with login error|)

export const login = action$ => action$
  .ofType(ActionTypes.DO_LOGIN)
  .switchMap(({payload}) => Observable
    .ajax.post('http://localhost:8080/api/login', payload)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: response,
      },
      Actions.addNotification({
        text: 'Login success',
        alertType: 'info',
      }),
    ))
    .catch(err => Observable.merge(Observable.of(
      {
        type: ActionTypes.LOGIN_ERROR,
        payload: {
          error: err,
        },
      },
      Actions.addNotification({
        text: loginErrorToMessage(err),
        alertType: 'danger',
      }),
    ))));

// Similar to login
export const register = action$ => action$
  .ofType(ActionTypes.DO_REGISTER)
  .switchMap(({payload}) => Observable
    .ajax.post('http://localhost:8080/api/register', payload)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: ActionTypes.REGISTER_SUCCESS,
        payload: response,
      },
      Actions.addNotification({
        text: 'Register success',
        alertType: 'info',
      }),
    ))
    .catch(err => Observable.merge(Observable.of(
      {
        type: ActionTypes.REGISTER_ERROR,
        payload: {
          error: err,
        },
      },
      Actions.addNotification({
        text: registerErrorToMessage(err),
        alertType: 'danger',
      }),
    ))));
