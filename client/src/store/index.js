// npm packages
import {applyMiddleware, createStore, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {createEpicMiddleware} from 'redux-observable';
import {createBrowserHistory} from 'history';

// our packages
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

// Creating a browser history
const history = createBrowserHistory();

// instantiate epic middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

// Middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// pick debug or dummy enhancer
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(
    epicMiddleware,
    middleware,
  )),
);

export default store;
