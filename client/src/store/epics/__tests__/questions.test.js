// npm packages
import {Observable} from 'rxjs/Observable';
import {ActionsObservable} from 'redux-observable';
import {last} from 'lodash';

// our packages
import * as ActionTypes from '../../actionTypes';
import {getAllQuestions, answerQuestion, createQuestion, deleteQuestion, updateQuestion} from '../questions';

let oldDelete;
let oldGet;
let oldPost;

beforeEach(() => {
  oldDelete = Observable.ajax.delete;
  oldGet = Observable.ajax.get;
  oldPost = Observable.ajax.post;
});

afterEach(() => {
  Observable.ajax.delete = oldDelete;
  Observable.ajax.get = oldGet;
  Observable.ajax.post = oldPost;
});

test('# questions epic - getAllQuestions success', (done) => {
  const headers = {'x-access-token': undefined};
  const response = {user: 'test'};
  const input = {type: ActionTypes.GET_ALL_QUESTIONS, headers};
  const input$ = ActionsObservable.from([input]);

  const get = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.get = get;

  getAllQuestions(input$).subscribe((res) => {
    expect(get.mock.calls.length).toBe(1);
    expect(get.mock.calls[0][0]).toBe('http://localhost:8080/api/question');
    expect(get.mock.calls[0][1]).toEqual(headers);
    expect(res).toEqual({type: ActionTypes.GET_ALL_QUESTIONS_SUCCESS, payload: {questions: response}});
    done();
  });
});

test('# questions epic - getAllQuestions error', (done) => {
  const input = {type: ActionTypes.GET_ALL_QUESTIONS, payload: {}};
  const input$ = ActionsObservable.from([input]);

  let responseCount = 0;
  getAllQuestions(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(res.type).toEqual(ActionTypes.GET_ALL_QUESTIONS_ERROR);
      expect(res.payload.error.message).toBe('ajax error 0');
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {id: 0, text: '[get all questions] Error: ajax error 0', alertType: 'danger'},
      });
      done();
    }
  });
});


test('# questions epic - answerQuestion success', (done) => {
  const payload = {question: {id: 0}, answer: 'test'};
  const headers = {'x-access-token': undefined};
  const response = {answers: [{answer: 'first answer'}, {answer: 'last answer'}], text: 'phew question'};
  const input = {type: ActionTypes.ANSWER_QUESTION, payload};
  const input$ = ActionsObservable.from([input]);

  const post = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.post = post;

  let responseCount = 0;
  answerQuestion(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(post.mock.calls.length).toBe(1);
      expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/question/0/answer');
      expect(post.mock.calls[0][1]).toEqual({answer: payload.answer});
      expect(post.mock.calls[0][2]).toEqual(headers);
      expect(res.type).toBe(ActionTypes.ANSWER_QUESTION_SUCCESS);
      expect(res.payload).toEqual(response);
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {
          id: 1,
          text: `Answer: "${last(response.answers).answer}" added to question: "${response.text}"`,
          alertType: 'info',
        },
      });
      done();
    }
  });
});

test('# questions epic - answerQuestion error', (done) => {
  const input = {type: ActionTypes.ANSWER_QUESTION, payload: {question: {id: 0}, answer: 'test'}};
  const input$ = ActionsObservable.from([input]);

  let responseCount = 0;
  answerQuestion(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(res.type).toEqual(ActionTypes.ANSWER_QUESTION_ERROR);
      expect(res.payload.error.message).toBe('ajax error 0');
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {id: 2, text: '[answer question] Error: ajax error 0', alertType: 'danger'},
      });
      done();
    }
  });
});


test('# questions epic - createQuestion success', (done) => {
  const payload = {question: {id: 0}, answer: 'test'};
  const headers = {'x-access-token': undefined};
  const response = {question: {answers: [], text: 'phew question'}};
  const input = {type: ActionTypes.CREATE_QUESTION, payload};
  const input$ = ActionsObservable.from([input]);

  const post = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.post = post;

  let responseCount = 0;
  createQuestion(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(post.mock.calls.length).toBe(1);
      expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/question');
      expect(post.mock.calls[0][1]).toEqual(payload);
      expect(post.mock.calls[0][2]).toEqual(headers);
      expect(res.type).toBe(ActionTypes.CREATE_QUESTION_SUCCESS);
      expect(res.payload).toEqual(response);
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {
          id: 3,
          text: `Question with text "${response.text}" created`,
          alertType: 'info',
        },
      });
      done();
    }
  });
});

test('# questions epic - createQuestion error', (done) => {
  const input = {type: ActionTypes.CREATE_QUESTION, payload: {question: {id: 0}, answer: 'test'}};
  const input$ = ActionsObservable.from([input]);

  let responseCount = 0;
  createQuestion(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(res.type).toEqual(ActionTypes.CREATE_QUESTION_ERROR);
      expect(res.payload.error.message).toBe('ajax error 0');
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {id: 4, text: '[question create] Error: ajax error 0', alertType: 'danger'},
      });
      done();
    }
  });
});


test('# questions epic - deleteQuestion success', (done) => {
  const payload = {id: 0, text: 'test'};
  const headers = {'x-access-token': undefined};
  const response = {question: {answers: [], text: 'phew question'}};
  const input = {type: ActionTypes.DELETE_QUESTION, payload};
  const input$ = ActionsObservable.from([input]);

  const del = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.delete = del;

  let responseCount = 0;
  deleteQuestion(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(del.mock.calls.length).toBe(1);
      expect(del.mock.calls[0][0]).toBe('http://localhost:8080/api/question/0');
      expect(del.mock.calls[0][1]).toEqual(headers);
      expect(res.type).toBe(ActionTypes.DELETE_QUESTION_SUCCESS);
      expect(res.payload).toEqual(payload);
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {
          id: 5,
          text: `Question with text "${payload.text}" deleted`,
          alertType: 'info',
        },
      });
      done();
    }
  });
});

test('# questions epic - deleteQuestion error', (done) => {
  const input = {type: ActionTypes.DELETE_QUESTION, payload: {question: {id: 0}, answer: 'test'}};
  const input$ = ActionsObservable.from([input]);

  let responseCount = 0;
  deleteQuestion(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(res.type).toEqual(ActionTypes.DELETE_QUESTION_ERROR);
      expect(res.payload.error.message).toBe('ajax error 0');
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {id: 6, text: '[delete question] Error: ajax error 0', alertType: 'danger'},
      });
      done();
    }
  });
});


test('# questions epic - updateQuestion success', (done) => {
  const payload = {id: 0, text: 'test'};
  const headers = {'x-access-token': undefined};
  const response = {text: 'test'};
  const input = {type: ActionTypes.UPDATE_QUESTION, payload};
  const input$ = ActionsObservable.from([input]);

  const post = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.post = post;

  let responseCount = 0;
  updateQuestion(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(post.mock.calls.length).toBe(1);
      expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/question/0');
      expect(post.mock.calls[0][1]).toEqual(payload);
      expect(post.mock.calls[0][2]).toEqual(headers);
      expect(res.type).toBe(ActionTypes.UPDATE_QUESTION_SUCCESS);
      expect(res.payload).toEqual(response);
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {
          id: 7,
          text: `Question updated to "${payload.text}"`,
          alertType: 'info',
        },
      });
      done();
    }
  });
});

test('# questions epic - updateQuestion error', (done) => {
  const input = {type: ActionTypes.UPDATE_QUESTION, payload: {id: 0}};
  const input$ = ActionsObservable.from([input]);

  let responseCount = 0;
  updateQuestion(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(res.type).toEqual(ActionTypes.UPDATE_QUESTION_ERROR);
      expect(res.payload.error.message).toBe('ajax error 0');
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {id: 8, text: '[update question] Error: ajax error 0', alertType: 'danger'},
      });
      done();
    }
  });
});
