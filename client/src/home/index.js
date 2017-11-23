import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {helloWorldAction} from '../store';

const mapStateToProps = state => ({
  world: state.helloWorld.world,
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(helloWorldAction()),
});

const Home = ({onClick, world}) => (
  <div className="jumbotron">
    <h1>Hello, {world}!</h1>
    <button onClick={onClick}>Click me!</button>
    <Link to="/other">other</Link>
  </div>
);
Home.propTypes = {
  world: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
Home.defaultProps = {
  world: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
