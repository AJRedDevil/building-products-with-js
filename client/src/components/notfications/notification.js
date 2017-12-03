// npm packages
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// our packages
import {removeNotification} from '../../store/actions';
import {NotificationPropType, NotificationDefaultProp} from '../../util';

const mapDispatchToProps = dispatch => ({
  onRemoveNotificationClick: notificationId =>
    dispatch(removeNotification(notificationId)),
});

const Notification = ({onRemoveNotificationClick, notification}) => (
  <div className={`alert alert-dismissible alert-${notification.alertType}`} role="alert">
    <button
      type="button"
      className="close"
      data-dismiss="alert"
      ari-label="Close"
      onClick={() => onRemoveNotificationClick(notification.id)}
    >
      <span aria-hidden="true">&times;</span>
    </button>
    {notification.text}
  </div>
);
Notification.propTypes = {
  onRemoveNotificationClick: PropTypes.func.isRequired,
  notification: NotificationPropType,
};
Notification.defaultProps = {
  notification: NotificationDefaultProp,
};

export default connect(null, mapDispatchToProps)(Notification);
