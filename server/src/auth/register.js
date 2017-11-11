// our packages
import {User} from '../db';
import {hash, asyncRequest} from '../util';

export const loginTaken = async(login) => {
  // check if login already taken
  const users = await User.filter({login}).run();
  return users.length > 0;
};

export default (app) => {
  app.post('/api/register', asyncRequest(async(req, res) => {
    // get user input
    const {login, password, passwordRepeat} = req.body;

    if (password !== passwordRepeat) {
      return res.status(400).send({error: 'Password do not match!'});
    }

    // hash password
    const hashedPassword = hash(password);

    // check if login already taken
    const exists = await loginTaken(login);
    if (exists) {
      return res.status(403).send({error: 'User already exists!'});
    }

    const user = new User({
      login,
      password: hashedPassword,
    });
    await user.save();

    return res.sendStatus(201);
  }));
};
