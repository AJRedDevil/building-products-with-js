import * as ActionTypes from '../actionTypes';

const initalState = {questions: [], status: 'inited'};

export const questions = (state = initalState, action) => {
  switch (action.type) {
    // all questions logic
    case ActionTypes.GET_ALL_QUESTIONS:
      return {
        questions: [],
        status: 'loading...',
      };
    case ActionTypes.GET_ALL_QUESTIONS_SUCCESS:
      return {
        questions: action.payload.questions,
        status: 'done',
      };
    case ActionTypes.ANSWER_QUESTION_ERROR:
    case ActionTypes.GET_ALL_QUESTIONS_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };
    // answer questions logic
    case ActionTypes.ANSWER_QUESTION_SUCCESS: {
      const updatedQuestion = action.payload;
      const index = state.questions.findIndex(q => q.id === updatedQuestion.id);
      state.questions[index] = updatedQuestion;
      return state;
    }
    default:
      return state;
  }
};
