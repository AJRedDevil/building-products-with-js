// npm packages
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// our packages
import {MyPropType} from '../../util';
import {getUser} from '../../store/actions';
import Navbar from '../../components/navbar';
import User from '../../components/user';

const mapStateToProps = state => ({
  user: state.auth.user,
  loadedUser: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: payload => dispatch(getUser(payload)),
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.getUser(this.props.match.params);
  }

  render() {
    const {user, match, loadedUser} = this.props;
    return (
      <div>
        <Navbar user={user} current={`/profile/${match.params.id}`} />

        <User user={loadedUser} />
      </div>
    );
  }
}
Profile.propTypes = {
  // eslint-disable-next-line react/no-typos
  user: MyPropType.UserPropType.isRequired,
  // eslint-disable-next-line react/no-typos
  loadedUser: MyPropType.UserPropType,
  getUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
Profile.defaultProps = {
  loadedUser: MyPropType.UserDefaultProp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
