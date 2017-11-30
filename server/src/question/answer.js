// npm packages
import passport from 'passport';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/question/:id/answer', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    const {id} = req.params;
    // get user input
    const {answer} = req.body;

    // make sure text is not empty
    if (answer !== undefined && !answer.length) {
      return res.status(400).send({error: 'Answer should be not empty!'});
    }

    // get question
    const question = await Question.get(id);

    // check if question exists
    if (!question) {
      return res.status(400).send({error: 'Question not found!'});
    }

    // append new answer
    question.answers.push({answer, user: req.user.id});

    // try saving
    await question.save();

    // send created question back
    return res.send(question);
  }));
};
