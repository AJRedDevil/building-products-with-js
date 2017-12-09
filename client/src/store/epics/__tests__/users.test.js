import {Observable} from 'rxjs/Observable';
import {ActionsObservable} from 'redux-observable';

import * as ActionTypes from '../../actionTypes';
import {getUser, updateUser} from '../users';

let oldGet;
let oldPost;

beforeEach(() => {
  oldGet = Observable.ajax.get;
  oldPost = Observable.ajax.post;
});

afterEach(() => {
  Observable.ajax.get = oldGet;
  Observable.ajax.post = oldPost;
});

test('# users epic - getUser success', (done) => {
  const payload = {id: 0};
  const headers = {'x-access-token': undefined};
  const response = {user: 'test'};
  const input = {type: ActionTypes.GET_USER, payload, headers};
  const input$ = ActionsObservable.from([input]);

  const get = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.get = get;

  getUser(input$).subscribe((res) => {
    expect(get.mock.calls.length).toBe(1);
    expect(get.mock.calls[0][0]).toBe('http://localhost:8080/api/user/0');
    expect(get.mock.calls[0][1]).toEqual(headers);
    expect(res).toEqual({type: ActionTypes.GET_USER_SUCCESS, payload: {user: response}});
    done();
  });
});

test('# users epic - getUser error', (done) => {
  const input = {type: ActionTypes.GET_USER, payload: {}};
  const input$ = ActionsObservable.from([input]);

  getUser(input$).subscribe((res) => {
    expect(res.type).toEqual(ActionTypes.GET_USER_ERROR);
    expect(res.payload.error.message).toBe('ajax error 0');
    done();
  });
});

test('# users epic - updateUser success', (done) => {
  const payload = {id: 0, test: '123'};
  const headers = {'x-access-token': undefined};
  const response = {user: 'test'};
  const input = {type: ActionTypes.UPDATE_USER, payload, headers};
  const input$ = ActionsObservable.from([input]);

  const post = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.post = post;

  updateUser(input$).subscribe((res) => {
    expect(post.mock.calls.length).toBe(1);
    expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/user/0');
    expect(post.mock.calls[0][1]).toEqual(payload);
    expect(post.mock.calls[0][2]).toEqual(headers);
    expect(res).toEqual({type: ActionTypes.UPDATE_USER_SUCCESS, payload: {user: response}});
    done();
  });
});

test('# users epic - updateUser error', (done) => {
  const input = {type: ActionTypes.UPDATE_USER, payload: {}};
  const input$ = ActionsObservable.from([input]);

  updateUser(input$).subscribe((res) => {
    expect(res.type).toEqual(ActionTypes.UPDATE_USER_ERROR);
    expect(res.payload.error.message).toBe('ajax error 0');
    done();
  });
});
