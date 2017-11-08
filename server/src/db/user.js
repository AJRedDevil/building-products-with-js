import {thinky, r} from './thinky';

const User = thinky.createModel('User', {
  login: thinky.type.string().required(),
  password: thinky.type.string().required(),
  registrationDate: thinky.type.date().default(r.now()),
});

export default User;
