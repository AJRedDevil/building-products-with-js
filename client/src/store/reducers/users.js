import * as ActionTypes from '../actionTypes';

const initalState = {user: null, status: 'inited'};

export const users = (state = initalState, action) => {
  switch (action.type) {
    // all users logic
    case ActionTypes.GET_USER:
      return {
        user: null,
        status: 'loading...',
      };
    case ActionTypes.GET_USER_SUCCESS:
      return {
        user: action.payload.user,
        status: 'done',
      };
    case ActionTypes.GET_USER_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };
    default:
      return state;
  }
};
