import winston from 'winston';

let level;
switch (process.env.NODE_ENV) {
  case 'testing':
    level = 'error';
    break;
  case 'production':
    level = 'info';
    break;
  default:
    level = 'debug';
    break;
}

export const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level,
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      label: 'experts-server',
    }),
  ],
});

// create stream for morgan
logger.stream = {
  write: message => logger.info(message),
};

export {logger as default};
