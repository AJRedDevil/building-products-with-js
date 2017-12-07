// npm packages
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';

// our packages
import {MyPropType} from '../../util';
import {removeNotification} from '../../store/actions';
import './transitions.css';

const Fade = ({children, ...props}) => (
  <CSSTransition
    {...props}
    timeout={700}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);
Fade.propTypes = {
  children: PropTypes.element.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onRemoveNotificationClick: notificationId =>
    dispatch(removeNotification(notificationId)),
});

const Notification = ({onRemoveNotificationClick, notification}) => (
  <Fade in>
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
  </Fade>
);
Notification.propTypes = {
  onRemoveNotificationClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-typos
  notification: MyPropType.NotificationPropType,
};
Notification.defaultProps = {
  notification: MyPropType.NotificationDefaultProp,
};

export default connect(null, mapDispatchToProps)(Notification);
