// npm packages
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// our packages
import Navbar from '../../components/navbar';
import {getAllQuestions, answerQuestion} from '../../store/actions';
// eslint-disable-next-line import/no-named-as-default
import Question from '../../components/question';
import {MyPropType} from '../../util';


const mapStateToProps = state => ({
  questions: state.questions.questions,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  fetchQuestions: _.once(() => dispatch(getAllQuestions())),
  doAnswer: payload => dispatch(answerQuestion(payload)),
});

export const Home = ({
  fetchQuestions, doAnswer, questions, user,
}) => {
  fetchQuestions();

  return (
    <div>
      <Navbar user={user} current="/" />

      <div>
        {questions.map(question => (
          <Question key={question.id} question={question} onAnswer={doAnswer} />
        ))}
      </div>
    </div>
  );
};
Home.propTypes = {
  questions: PropTypes.arrayOf(MyPropType.QuestionPropType),
  user: MyPropType.UserPropType,
  fetchQuestions: PropTypes.func.isRequired,
  doAnswer: PropTypes.func.isRequired,
};
Home.defaultProps = {
  questions: [MyPropType.QuestionDefaultProp],
  user: MyPropType.UserDefaultProp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
