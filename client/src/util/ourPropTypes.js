import PropTypes from 'prop-types';

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

const QuestionPropType = PropTypes.shape({
  answers: PropTypes.array,
  creationDate: PropTypes.string,
  expirationDate: PropTypes.string,
  id: PropTypes.string,
  owner: UserPropType,
  text: PropTypes.string,
});

const QuestionDefaultProp = {
  answers: [],
  creationDate: '',
  expirationDate: '',
  id: '',
  owner: UserDefaultProp,
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

const EmptyFuncDefaultProp = () => {}

export const MyPropType = {
  EmptyFuncDefaultProp,
  QuestionPropType,
  QuestionDefaultProp,
  NotificationPropType,
  NotificationDefaultProp,
  UserPropType,
  UserDefaultProp,
};
