// our packages
import app from './app';
import logger from './util';

// start server
app.listen(8080, 'localhost', function() {
  const host = this.address().address;
  const {port} = this.address();
  logger.log(`Experts server is listening at http://${host}:${port}`);
});

// output all uncaught exceptions
process.on('uncaughtException', err => logger.error('uncaught exception:', err));
process.on('unhandledRejection', err => logger.error('uncaught exception:', err));
