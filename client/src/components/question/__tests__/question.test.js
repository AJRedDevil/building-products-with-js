// npm packages
import React from 'react';
import {MemoryRouter} from 'react-router';
import configureMockStore from 'redux-mock-store';

// our packages
import QuestionWrapper, {Question} from '../index';

// create mockstore
const mockStore = configureMockStore();

const user = {
  id: 0,
  login: 'test',
};
const question = {
  id: '0',
  owner: user,
  text: 'Question text',
  answers: [{
    answer: 'Test answer',
  }],
};

test('# QuestionWrapper', () => {
  const store = mockStore({auth: {user}});
  const wrapper = shallow(<QuestionWrapper question={question} store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Question', () => {
  const answer = 'Test answer';
  const updatedText = 'Updated text';
  const onAnswer = ({question: q, answer: a}) => {
    expect(q).toEqual(question);
    expect(a).toBe(answer);
  };
  const deleteQuestion = q => expect(q).toBe(question);
  const updateQuestion = ({text}) => expect(text).toBe(updatedText);
  const component = (
    <Question
      user={user}
      question={question}
      onAnswer={onAnswer}
      deleteQuestion={deleteQuestion}
      updateQuestion={updateQuestion}
    />
  );
  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // test interaction
  const app = mount(<MemoryRouter initialEntries={[{pathname: '/', key: 'testKey'}]}>{component}</MemoryRouter>);

  // test answer
  // set answer
  app.find('#answerInput').getDOMNode().value = answer;
  // click answer button
  app.find('#answerBtn').simulate('click');

  // test delete
  app.find('#deleteBtn').simulate('click');

  // test update
  // enable editing
  app.find('#editBtn').simulate('click');
  // change question text
  app.find('#questionInput').getDOMNode().value = updatedText;
  // trigger update
  app.find('#updateBtn').simulate('click');
});
