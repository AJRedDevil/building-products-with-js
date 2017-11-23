import {applyMiddleware, createStore, combineReducers} from 'redux';
import {routerMiddleware, routerReducer as routing} from 'react-router-redux';
import {createBrowserHistory} from 'history';


// Creating a browser history
const history = createBrowserHistory();

// Middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

export const helloWorldAction = () => ({
  type: 'HELLO',
});

const helloWorldReducer = (state = {world: 'click me'}, action) => {
  switch (action.type) {
    case 'HELLO':
      return {
        world: 'World',
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  helloWorld: helloWorldReducer,
  routing,
});

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(middleware),
);

export default store;
