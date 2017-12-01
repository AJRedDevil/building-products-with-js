// npm packages
import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// our packages
import {getAllQuestions, answerQuestion} from '../../store/actions';
import Question from '../../components/question';
import {QuestionPropType} from '../../util';

const mapStateToProps = state => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = dispatch => ({
  fetchQuestions: _.once(() => dispatch(getAllQuestions())),
  doAnswer: payload => dispatch(answerQuestion(payload)),
});

const Home = ({fetchQuestions, doAnswer, questions}) => {
  fetchQuestions();

  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Brand</Link>
          </div>

          <ul className="nav navbar-nav">
            <li>
              <Link to="/"><b>Browse questions</b></Link>
            </li>
            <li>
              <Link to="/create">Create new questions</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div>
        {questions.map(question => (
          <Question key={question.id} question={question} onAnswer={doAnswer} />
        ))}
      </div>
    </div>
  );
};
Home.propTypes = {
  questions: PropTypes.arrayOf(QuestionPropType),
  fetchQuestions: PropTypes.func.isRequired,
  doAnswer: PropTypes.func.isRequired,
};
Home.defaultProps = {
  questions: [{
    answers: [],
    creationDate: '',
    expirationDate: '',
    id: '',
    owner: '',
    text: '',
  }],
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
