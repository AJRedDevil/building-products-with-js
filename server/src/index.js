// our packages
import app from './app';

// start server
app.listen(8080, 'localhost', function() {
  const host = this.address().address;
  const {port} = this.address();
  console.log(`Shard listening at http://${host}:${port}`);
});

// output all uncaught exceptions
process.on('uncaughtException', err => console.error('uncaught exception:', err));
process.on('unhandledRejection', err => console.error('uncaught exception:', err));
