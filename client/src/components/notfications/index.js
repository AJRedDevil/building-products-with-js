// npm packages
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// our packages
import Notification from './notification';
import {MyPropType} from '../../util';
import transitions from './transitions.css';

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const Notifications = ({notifications}) => (
  <div>
    <ReactCSSTransitionGroup
      transitionName={transitions}
      transitionEnterTimeout={700}
      transitionLeaveTimeout={700}
    >
      {
        notifications.map(notification => (
          <Notification key={notification.id} notification={notification} />
        ))
      }
    </ReactCSSTransitionGroup>
  </div>
);
Notifications.propTypes = {
  notifications: PropTypes.arrayOf(MyPropType.NotificationPropType),
};
Notifications.defaultProps = {
  notifications: [MyPropType.NotificationDefaultProp],
};

export default connect(mapStateToProps)(Notifications);
