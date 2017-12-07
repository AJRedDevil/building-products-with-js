// npm packages
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// our packages
import Notification from './notification';
import {MyPropType} from '../../util';

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const Notifications = ({notifications}) => (
  <div>
    {
      notifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))
    }
  </div>
);
Notifications.propTypes = {
  notifications: PropTypes.arrayOf(MyPropType.NotificationPropType),
};
Notifications.defaultProps = {
  notifications: [MyPropType.NotificationDefaultProp],
};

export default connect(mapStateToProps)(Notifications);
