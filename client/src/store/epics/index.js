import {login, register} from './auth';
import {helloWorld} from './helloworld';
import {getAllQuestions, answerQuestion, createQuestion, deleteQuestion, updateQuestion} from './questions';
import {addNotification} from './notifications';
import {getUser, updateUser} from './users';

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
  deleteQuestion,
  updateQuestion,
  // notifications
  addNotification,
  // user
  getUser,
  updateUser,
];
