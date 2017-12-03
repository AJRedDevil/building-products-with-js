// npm packages
import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

// our packages
import {MyPropType} from '../../util';

const Question = ({question, onAnswer}) => {
  let answerInput;

  const handleClick = (e) => {
    e.preventDefault();
    onAnswer({question, answer: answerInput.value});
    answerInput.value = '';
    return false;
  };

  return (
    <div className="panel panel-default">
      <div className="panel-heading">{question.text}</div>
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
          <button type="submit" className="btn btn-default" onClick={handleClick}>
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
};
Question.defaultProps = {
  question: MyPropType.QuestionDefaultProp,
};

export default Question;
