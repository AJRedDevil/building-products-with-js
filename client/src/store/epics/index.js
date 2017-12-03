import {login, register} from './auth';
import {helloWorld} from './helloworld';
import {getAllQuestions, answerQuestion, createQuestion} from './questions';
import {addNotification} from './notifications';

export default [
  // auth
  login,
  register,
  // helloworld
  helloWorld,
  // questions
  getAllQuestions,
  answerQuestion,
  createQuestion,
  // notifications
  addNotification,
];
