import {logger} from './logger';

const asyncRequest = handler =>
  (req, res) =>
    handler(req, res).catch(e => logger.error('error diring request', e));

export default asyncRequest;
