import PropTypes from 'prop-types';

const QuestionPropType = PropTypes.shape({
  answers: PropTypes.array,
  creationDate: PropTypes.string,
  expirationDate: PropTypes.string,
  id: PropTypes.string,
  owner: PropTypes.string,
  text: PropTypes.string,
});

const QuestionDefaultProp = {
  answers: [],
  creationDate: '',
  expirationDate: '',
  id: '',
  owner: '',
  text: '',
};

const NotificationPropType = PropTypes.shape({
  id: PropTypes.number,
  alertType: PropTypes.string,
  text: PropTypes.string,
});

const NotificationDefaultProp = {
  id: 0,
  alertType: '',
  text: '',
};

const UserPropType = PropTypes.shape({
  id: PropTypes.String,
  login: PropTypes.String,
  registrationDate: PropTypes.string,
});

const UserDefaultProp = {
  id: '',
  login: '',
  registrationDate: '',
};

export const MyPropType = {
  QuestionPropType,
  QuestionDefaultProp,
  NotificationPropType,
  NotificationDefaultProp,
  UserPropType,
  UserDefaultProp,
};
