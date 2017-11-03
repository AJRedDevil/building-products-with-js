// npm packages
import express from 'express';

// init app
const app = express();

// test method
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// catch all unhandler errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});

// start server
app.listen(8080, 'localhost', function() {
  const host = this.address().address;
  const {port} = this.address();
  console.log(`Shard listening at http://${host}:${port}`);
});

// output all uncaught exceptions
process.on('uncaughtException', err => console.error('uncaught exception:', err));
process.on('unhandledRejection', err => console.error('uncaught exception:', err));
