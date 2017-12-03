// npm packages
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {createBrowserHistory} from 'history';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';

// our packages
import configureStore from './store';
import {PrivateRoute} from './util';

// our pages
import App from './app';
import Home from './pages/home';
import Create from './pages/create';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import NotFound from './pages/notfound';

const history = createBrowserHistory();
const store = configureStore(history);

// render on page
ReactDOM.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/create" component={Create} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/profile/:id" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </ConnectedRouter>
    </Provider>
  ), document.getElementById('app'),
);
