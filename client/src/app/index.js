// npm packages
import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

// our packages
import Home from '../home';
import Other from '../other';
import NotFound from '../notfound';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/other" component={Other} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
