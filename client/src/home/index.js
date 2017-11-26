import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {helloWorldAction} from '../store/action';

const mapStateToProps = state => ({
  world: state.helloWorld.world,
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(helloWorldAction()),
});

const Home = ({onClick, world}) => (
  <div className="jumbotron">
    <h1>Hello, {world}!</h1>
    <button className="btn btn-default" onClick={onClick}>Click me!</button>
    <div>
      <Link to="/other">other</Link>
    </div>
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
