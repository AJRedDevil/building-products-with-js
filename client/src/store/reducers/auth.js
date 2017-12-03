// our packages
import * as ActionTypes from '../actionTypes';

const storedUser = localStorage.getItem('user.data');
// parse user from stored string
let user;
try {
  user = JSON.parse(storedUser);
} catch (e) {
  /* eslint-disable no-console */
  console.error('Error parsing user data', e);
  /* eslint-enable no-console */
}


const initalState = {
  token: localStorage.getItem('user.token'),
  user,
};

export const auth = (state = initalState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_SUCCESS:
      return {
        redirectToLogin: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('user.token', action.payload.token);
      localStorage.setItem('user.data', JSON.stringify(action.payload.user));
      return {
        ...action.payload,
      };
    case ActionTypes.LOGIN_ERROR:
    case ActionTypes.REGISTER_ERROR:
    // TODO: probably necessary in the future
      return state;
    default:
      return state;
  }
};
