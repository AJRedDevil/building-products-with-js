import * as ActionTypes from '../actionTypes';

const initalState = {world: 'waiting'};

export const helloWorld = (state = initalState, action) => {
  switch (action.type) {
    case ActionTypes.HELLO_WORLD:
      return {
        world: 'loading...',
      };
    case ActionTypes.HELLO_WORLD_END:
      return {
        world: action.payload.world,
      };
    default:
      return state;
  }
};
