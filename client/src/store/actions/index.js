import * as ActionTypes from '../actionTypes';

export const helloWorldAction = () => ({
  type: ActionTypes.HELLO_WORLD,
});

// auth

export const loginAction = payload => ({
  type: ActionTypes.DO_LOGIN,
  payload,
});

export const registerAction = payload => ({
  type: ActionTypes.DO_REGISTER,
  payload,
});

// questions

export const getAllQuestions = () => ({
  type: ActionTypes.GET_ALL_QUESTIONS,
});

export const answerQuestion = payload => ({
  type: ActionTypes.ANSWER_QUESTION,
  payload,
});

export const createQuestion = payload => ({
  type: ActionTypes.CREATE_QUESTION,
  payload,
});

// notifications

let nextNotificationID = 0;

/**
 * Add a notification to the store.
 * @param {String} text - text to display
 * @param {String} alertType - Bootstrap alert style: success | info | warning | danger
 */
export const addNotification = ({text, alertType}) => ({
  type: ActionTypes.ADD_NOTIFICATION,
  payload: {
    id: nextNotificationID++,
    text,
    alertType,
  },
});

/**
 * Remove a notification from the store.
 * @param {String} notificationId
 */
export const removeNotification = notificationId => ({
  type: ActionTypes.REMOVE_NOTIFICATION,
  payload: {notificationId},
});

// users

export const getUser = payload => ({
  type: ActionTypes.GET_USER,
  payload,
});

export const updateUser = payload => ({
  type: ActionTypes.UPDATE_USER,
  payload,
});
