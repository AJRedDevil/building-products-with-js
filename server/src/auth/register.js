// our packages
import {User} from '../db';
import {hash, asyncRequest} from '../util';

export default (app) => {
  app.post('/api/register', asyncRequest(async(req, res) => {
    // get user input
    const {login, password, passwordRepeat} = req.body;

    if (password !== passwordRepeat) {
      return res.status(400).send({error: 'Passowrd do not match!'});
    }

    const hashedPassword = hash(password);

    const user = new User({
      login,
      password: hashedPassword,
    });
    await user.save();

    return res.sendStatus(201);
  }));
};
