import {logger} from './logger';

const asyncRequest = handler =>
  (req, res) =>
    handler(req, res).catch((e) => {
      logger.debug('error during request', e);
      res.status(400).send({error: e.toString()});
    });

export default asyncRequest;
