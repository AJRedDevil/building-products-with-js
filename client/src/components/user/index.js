// npm packages
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// our packages
import {MyPropType} from '../../util';
import {updateUser} from '../../store/actions';

const mapDispatchToProps = dispatch => ({
  updateUser: payload => dispatch(updateUser(payload)),
});

export const User = ({user, edit, updateUser}) => {
  let userInput;

  const saveUser = () => updateUser({
    ...user,
    login: userInput.value,
  });

  return (user ? (
    <div className="panel panel-default" key={user.id}>
      <div className="panel-heading">
        User: {edit ? (
          <input
            type="text"
            id="userInput"
            ref={(i) => { userInput = i; }}
            defaultValue={user.login}
          />
        ) : user.login }

        {edit && (
          <div className="pull-right">
            <button className="btn btn-default" onClick={saveUser}>
              Save
            </button>
          </div>
        )}
      </div>
      <div className="panel-body">
        Registration date: {moment(user.registrationDate).toString()}
      </div>
    </div>
  ) : null);
};
User.propTypes = {
  // eslint-disable-next-line react/no-typos
  user: MyPropType.UserPropType,
  edit: PropTypes.bool,
  updateUser: PropTypes.func.isRequired,
};
User.defaultProps = {
  user: MyPropType.UserDefaultProp,
  edit: false,
};

export default connect(null, mapDispatchToProps)(User);
