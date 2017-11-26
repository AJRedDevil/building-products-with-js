import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import reducers from './reducers';

export default combineReducers({
  ...reducers,
  routing,
});
