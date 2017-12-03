// npm packages
import React from 'react';
import moment from 'moment';

// our packages
import {MyPropType} from '../../util';

const User = ({user}) => (user ? (
  <div className="panel panel-default" key={user.id}>
    <div className="panel-heading">User: {user.login}</div>
    <div className="panel-body">
      Registration date: {moment(user.registrationDate).toString()}
    </div>
  </div>
) : null);
User.propTypes = {
  // eslint-disable-next-line react/no-typos
  user: MyPropType.UserPropType,
};
User.defaultProps = {
  user: MyPropType.UserDefaultProp,
};

export default User;
