// npm packages
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

// our packages
import {isAuthenticated} from './checkAuth';

export const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: {from: props.location.pathname},
          }}
        />
      )
    )
    }
  />
);
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({pathname: PropTypes.string}),
};
PrivateRoute.defaultProps = {
  location: {pathname: ''},
};
