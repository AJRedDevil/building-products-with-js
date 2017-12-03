// npm packages
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// our packages
import Notification from './notification';
import {NotificationPropType, NotificationDefaultProp} from '../../util';

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
  notifications: PropTypes.arrayOf(NotificationPropType),
};
Notifications.defaultProps = {
  notifications: [NotificationDefaultProp],
};

export default connect(mapStateToProps)(Notifications);
