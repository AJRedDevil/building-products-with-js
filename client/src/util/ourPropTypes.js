import PropTypes from 'prop-types';

export const QuestionPropType = PropTypes.shape({
  answers: PropTypes.array,
  creationDate: PropTypes.string,
  expirationDate: PropTypes.string,
  id: PropTypes.string,
  owner: PropTypes.string,
  text: PropTypes.string,
});

export const NotificationPropType = PropTypes.shape({
  id: PropTypes.number,
  alertType: PropTypes.string,
  text: PropTypes.string,
});

export const NotificationDefaultProp = {
  id: 0,
  alertType: '',
  text: '',
};
