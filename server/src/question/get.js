// npm packages
import passport from 'passport';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.get('/api/question/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    // get requested question
    try {
      const question = await Question.get(req.params.id);
      // send created question back
      return res.send(question);
    } catch (e) {
      return res.status(400).send({error: e.toString()});
    }
  }));
};
