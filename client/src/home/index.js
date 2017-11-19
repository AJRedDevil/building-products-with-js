import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {world: 'world'};
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.state.world}!</h1>
        <Link to="/other">other</Link>
      </div>
    );
  }
}
