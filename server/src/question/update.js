// npm packages
import passport from 'passport';
import moment from 'moment';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/question/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    const {id} = req.params;
    // get user input
    const {text, expirationDate} = req.body;

    // make sure text is not empty
    if (text !== undefined && !text.length) {
      return res.status(400).send({error: 'Text should be not empty!'});
    }

    // validate date
    if (expirationDate && !moment(expirationDate, moment.ISO_8601).isValid()) {
      return res.status(400).send({error: 'Date should be valid ISO Date!'});
    }

    // get question
    const question = await Question.get(id);

    // check if question exists
    if (!question) {
      return res.status(400).send({error: 'Question not found!'});
    }

    // check if user is the owner
    if (req.user.id !== question.owner) {
      return res.status(403).send({error: 'Not enough rights to change the question!'});
    }

    // check if data is actually changed
    const textChanged = text && question.texxt !== text;
    const exDateChanged = expirationDate && !moment(expirationDate).isSame(question.expirationDate);
    // if not - just send OK
    if (!textChanged && !exDateChanged) {
      return res.send(question);
    }

    if (text) {
      question.text = text;
    }
    if (expirationDate) {
      question.expirationDate = moment(expirationDate).toDate();
    }

    await question.save();

    // send created question back
    return res.send(question);
  }));
};
