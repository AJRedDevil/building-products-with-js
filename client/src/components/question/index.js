// npm packages
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

// our packages
import {MyPropType} from '../../util';
import {deleteQuestion, updateQuestion} from '../../store/actions';

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  deleteQuestion: payload => dispatch(deleteQuestion(payload)),
  updateQuestion: payload => dispatch(updateQuestion(payload)),
});

export class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {editing: false};

    this.answerInput = null;
    this.questionInput = null;
  }

  handleAnswerClick = (e) => {
    e.preventDefault();
    this.props.onAnswer({question: this.props.question, answer: this.answerInput.value});
    this.answerInput.value = '';
    return false;
  }

  handleDeleteQuestionClick = (e) => {
    e.preventDefault();
    this.props.deleteQuestion(this.props.question);
    return false;
  }

  handleUpdateQuestionClick = (e) => {
    e.preventDefault();
    const newQuestion = _.omit(this.props.question, ['owner', 'answers']);
    newQuestion.text = this.questionInput.value;
    this.props.updateQuestion(newQuestion);
    this.setState({editing: !this.state.editing});
    return false;
  }

  toggleEdit = (e) => {
    e.preventDefault();
    this.setState({editing: !this.state.editing});
    return false;
  }

  render() {
    const {question, user} = this.props;
    const {editing} = this.state;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {user.id === question.owner.id && (
            <span>
              <button className="btn btn-link" id="deleteBtn" onClick={this.handleDeleteQuestionClick}>
                <span className="glyphicon glyphicon-trash" />
              </button>
              {editing ? '' : (
                <button className="btn btn-link" id="editBtn" onClick={this.toggleEdit}>
                  <span className="glyphicon glyphicon-pencil" />
                </button>
              )}
            </span>
          )}
          {editing ? (
            <span>
              <input
                type="text"
                id="questionInput"
                ref={(i) => { this.questionInput = i; }}
                defaultValue={question.text}
              />
              <button className="btn btn-link" id="updateBtn" onClick={this.handleUpdateQuestionClick}>
                <span className="glyphicon glyphicon-ok" />
              </button>
              <button className="btn btn-link" onClick={this.toggleEdit}>
                <span className="glyphicon glyphicon-remove" />
              </button>
            </span>
          ) : question.text}

          <div className="pull-right">
            <Link to={`/profile/${question.owner.id}`}>{question.owner.login}</Link>
          </div>
        </div>
        <div className="panel-body">
          {question.answers.length > 0 ? question.answers.map((answer, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <ul className="list-group" key={i}>
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
                ref={(i) => { this.answerInput = i; }}
              />
            </div>
            <button type="submit" id="answerBtn" className="btn btn-default" onClick={this.handleAnswerClick}>
              Answer
            </button>
          </form>
        </div>
      </div>
    );
  }
}
Question.propTypes = {
  deleteQuestion: PropTypes.func,
  // eslint-disable-next-line react/no-typos
  question: MyPropType.QuestionPropType,
  onAnswer: PropTypes.func,
  // eslint-disable-next-line react/no-typos
  user: MyPropType.UserPropType,
  updateQuestion: PropTypes.func,
};
Question.defaultProps = {
  deleteQuestion: MyPropType.EmptyFuncDefaultProp,
  question: MyPropType.QuestionDefaultProp,
  onAnswer: MyPropType.EmptyFuncDefaultProp,
  user: MyPropType.UserDefaultProp,
  updateQuestion: MyPropType.EmptyFuncDefaultProp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
