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
import store from './store';

// our pages
import Home from './home';
import Other from './other';
import NotFound from './notfound';

const history = createBrowserHistory();

// render on page
ReactDOM.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/other" component={Other} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  ), document.getElementById('app'),
);
