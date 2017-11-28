// npm packages
import {applyMiddleware, createStore, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {createEpicMiddleware} from 'redux-observable';

// our packages
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

// instantiate epic middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

// pick debug or dummy enhancer
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const configureStore = (browserHistory) => {
  const middleware = [
    epicMiddleware,
    routerMiddleware(browserHistory), // Middleware for intercepting and dispatching navigation actions
  ];

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );
};

export default configureStore;
