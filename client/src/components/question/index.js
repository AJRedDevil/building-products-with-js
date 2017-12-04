// npm packages
import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

// our packages
import {MyPropType} from '../../util';
import {deleteQuestion} from '../../store/actions';

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  deleteQuestion: payload => dispatch(deleteQuestion(payload)),
});

const Question = ({
  question, onAnswer, user, deleteQuestion,
}) => {
  let answerInput;

  const handleAnswerClick = (e) => {
    e.preventDefault();
    onAnswer({question, answer: answerInput.value});
    answerInput.value = '';
    return false;
  };

  // eslint-disable-next-line no-redeclare
  const handleDeleteQuestionClick = (e) => {
    e.preventDefault();
    deleteQuestion(question);
    return false;
  };

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {user.id === question.owner.id && (
          <span>
            <button className="btn btn-link" onClick={handleDeleteQuestionClick}>
              <span className="glyphicon glyphicon-trash" />
            </button>
          </span>
        )}
        {question.text}

        <div className="pull-right">
          <Link to={`/profile/${question.owner.id}`}>{question.owner.login}</Link>
        </div>
      </div>
      <div className="panel-body">
        {question.answers.length > 0 ? question.answers.map(answer => (
          <ul className="list-group" key={uuid.v4()}>
            <li className="list-group-item">{answer.answer}</li>
          </ul>
          )) : 'No answers yet'}
      </div>
      <div className="panel-footer">
        <form className="form-horizontal">
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="answerInput"
              placeholder="Enter your answer..."
              ref={(i) => { answerInput = i; }}
            />
          </div>
          <button type="submit" className="btn btn-default" onClick={handleAnswerClick}>
            Answer
          </button>
        </form>
      </div>
    </div>
  );
};
Question.propTypes = {
  question: MyPropType.QuestionPropType,
  onAnswer: PropTypes.func.isRequired,
  user: MyPropType.UserPropType,
  deleteQuestion: PropTypes.func.isRequired,
};
Question.defaultProps = {
  question: MyPropType.QuestionDefaultProp,
  user: MyPropType.UserDefaultProp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
